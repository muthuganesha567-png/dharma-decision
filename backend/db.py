"""
SQLite persistence layer for Dharma Decision.

Tables
------
saves     : one row per player session (state snapshot as JSON)
decisions : append-only decision log for analytics / future AI training

The DB file lives next to this module (backend/dharma.db). A connection is
opened per request, which keeps Flask's threaded mode safe.
"""

import json
import os
import sqlite3
from datetime import datetime, timezone

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "dharma.db")


def get_conn():
    conn = sqlite3.connect(DB_PATH, timeout=10)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with get_conn() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS saves (
                session_id TEXT PRIMARY KEY,
                state      TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS decisions (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id  TEXT NOT NULL,
                scenario_id TEXT NOT NULL,
                mode        TEXT,
                choice_id   TEXT,
                free_text   TEXT,
                deltas      TEXT,
                score_after INTEGER,
                created_at  TEXT NOT NULL
            )
            """
        )
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_decisions_scenario ON decisions(scenario_id)"
        )


def _now():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


# ------------------------------------------------------------------- saves

def save_state(session_id: str, state: dict):
    payload = json.dumps(state, ensure_ascii=False)
    with get_conn() as conn:
        conn.execute(
            """
            INSERT INTO saves (session_id, state, updated_at)
            VALUES (?, ?, ?)
            ON CONFLICT(session_id) DO UPDATE SET
                state = excluded.state,
                updated_at = excluded.updated_at
            """,
            (session_id, payload, _now()),
        )


def load_state(session_id: str):
    with get_conn() as conn:
        row = conn.execute(
            "SELECT state FROM saves WHERE session_id = ?", (session_id,)
        ).fetchone()
    return json.loads(row["state"]) if row else None


def delete_state(session_id: str):
    with get_conn() as conn:
        conn.execute("DELETE FROM saves WHERE session_id = ?", (session_id,))
        conn.execute("DELETE FROM decisions WHERE session_id = ?", (session_id,))


# --------------------------------------------------------------- decisions

def log_decision(session_id, scenario_id, mode, choice_id, free_text, deltas, score_after):
    with get_conn() as conn:
        conn.execute(
            """
            INSERT INTO decisions
                (session_id, scenario_id, mode, choice_id, free_text, deltas, score_after, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                session_id,
                scenario_id,
                mode,
                choice_id,
                free_text,
                json.dumps(deltas, ensure_ascii=False) if deltas else None,
                score_after,
                _now(),
            ),
        )


def aggregate_stats():
    with get_conn() as conn:
        total = conn.execute("SELECT COUNT(*) AS n FROM decisions").fetchone()["n"]
        by_scenario = [
            dict(r)
            for r in conn.execute(
                """
                SELECT scenario_id,
                       COUNT(*)                AS decisions,
                       ROUND(AVG(score_after)) AS avg_score
                FROM decisions
                GROUP BY scenario_id
                ORDER BY decisions DESC
                LIMIT 25
                """
            ).fetchall()
        ]
        by_choice = [
            dict(r)
            for r in conn.execute(
                """
                SELECT scenario_id, choice_id, COUNT(*) AS picked
                FROM decisions
                WHERE choice_id IS NOT NULL
                GROUP BY scenario_id, choice_id
                ORDER BY picked DESC
                LIMIT 50
                """
            ).fetchall()
        ]
        free_text_count = conn.execute(
            "SELECT COUNT(*) AS n FROM decisions WHERE free_text IS NOT NULL AND free_text != ''"
        ).fetchone()["n"]
        players = conn.execute(
            "SELECT COUNT(DISTINCT session_id) AS n FROM decisions"
        ).fetchone()["n"]
    return {
        "totalDecisions": total,
        "players": players,
        "freeTextDecisions": free_text_count,
        "byScenario": by_scenario,
        "byChoice": by_choice,
    }
