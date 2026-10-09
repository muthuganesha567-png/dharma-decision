// ============================================================
// DHARMA DECISION — Cinematic Scene Data
// Every narrative beat has a unique visual composition.
// ============================================================

// ---------- BACKDROP LAYER PRESETS ----------
// Each key maps to a set of SVG layers rendered by SceneBackdrop.
export const BACKDROP_PRESETS = {
  // --- Epic scenes ---
  battlefield_dawn: {
    sky: 'dawn', terrain: 'kurukshetra', lighting: 'dawn_gold',
    features: ['armies_distant', 'flags_left', 'flags_right', 'elephants', 'chariot_center'],
    particles: 'dust', particleIntensity: 0.4,
  },
  battlefield_dawn_wide: {
    sky: 'dawn', terrain: 'kurukshetra', lighting: 'dawn_gold',
    features: ['armies_distant', 'flags_left', 'flags_right', 'elephants'],
    particles: 'dust', particleIntensity: 0.3,
  },
  between_armies_close: {
    sky: 'dawn', terrain: 'kurukshetra', lighting: 'dawn_gold',
    features: ['soldiers_close_left', 'soldiers_close_right', 'chariot_center', 'horses_moving'],
    particles: 'dust', particleIntensity: 0.6,
  },
  chariot_interior: {
    sky: 'dawn', terrain: 'kurukshetra_blur', lighting: 'dawn_warm',
    features: ['chariot_rail', 'reins', 'banner_hanuman'],
    particles: 'dust', particleIntensity: 0.2,
  },
  arjuna_pov_generals: {
    sky: 'dawn', terrain: 'kurukshetra', lighting: 'dawn_gold',
    features: ['bhishma_banner', 'drona_banner', 'kaurava_formation', 'faces_distant'],
    particles: 'dust', particleIntensity: 0.3,
  },
  chariot_sorrow: {
    sky: 'dawn_late', terrain: 'kurukshetra', lighting: 'dawn_warm',
    features: ['chariot_still', 'bow_lowered', 'silent_armies'],
    particles: 'dust', particleIntensity: 0.15,
  },
  battlefield_dusk: {
    sky: 'dusk', terrain: 'kurukshetra', lighting: 'dusk_crimson',
    features: ['distant_fires', 'broken_chariots', 'drona_formation'],
    particles: 'embers', particleIntensity: 0.5,
  },
  counsel_night: {
    sky: 'night', terrain: 'camp', lighting: 'firelight',
    features: ['hanuman_banner', 'tent_canopy', 'oil_lamp', 'stars'],
    particles: 'fireflies', particleIntensity: 0.3,
  },
  hastinapura_court: {
    sky: 'interior', terrain: 'marble_floor', lighting: 'torch_warm',
    features: ['pillars', 'throne', 'braziers', 'arches', 'courtiers_silhouette'],
    particles: null, particleIntensity: 0,
  },
  war_council_tent: {
    sky: 'night', terrain: 'tent_floor', lighting: 'firelight',
    features: ['tent_roof', 'tent_drapes', 'map_table', 'oil_chandelier', 'torches'],
    particles: 'embers', particleIntensity: 0.2,
  },
  tenth_dawn: {
    sky: 'dawn_pale', terrain: 'kurukshetra', lighting: 'pale_gold',
    features: ['shikhandi_column', 'bhishma_banner_far', 'pandava_ranks', 'morning_mist'],
    particles: 'mist', particleIntensity: 0.5,
  },
  aftermath_sunset: {
    sky: 'sunset', terrain: 'kurukshetra_scarred', lighting: 'sunset_deep',
    features: ['arrows_in_ground', 'broken_flags', 'single_chariot'],
    particles: 'embers', particleIntensity: 0.3,
  },
  arrow_bed: {
    sky: 'dawn_pale', terrain: 'kurukshetra', lighting: 'pale_gold',
    features: ['bhishma_arrow_bed', 'gathered_warriors'],
    particles: 'mist', particleIntensity: 0.2,
  },
  arjuna_resolve: {
    sky: 'dawn', terrain: 'kurukshetra', lighting: 'dawn_gold',
    features: ['chariot_center', 'bow_raised', 'army_behind'],
    particles: 'dust', particleIntensity: 0.4,
  },
  arjuna_despair: {
    sky: 'dawn_late', terrain: 'kurukshetra', lighting: 'overcast',
    features: ['chariot_still', 'bow_dropped', 'army_watching'],
    particles: 'dust', particleIntensity: 0.1,
  },
  peace_envoy: {
    sky: 'interior', terrain: 'marble_floor', lighting: 'torch_warm',
    features: ['pillars', 'throne_duryodhana', 'golden_chair', 'elders_seated'],
    particles: null, particleIntensity: 0,
  },

  // --- Modern scenes ---
  campus_night: {
    sky: 'city_night', terrain: 'campus_ground', lighting: 'streetlamp',
    features: ['college_building', 'laptop_glow', 'empty_chair', 'window_lights'],
    particles: null, particleIntensity: 0,
  },
  library_tense: {
    sky: 'interior_modern', terrain: 'library_floor', lighting: 'fluorescent',
    features: ['bookshelves', 'study_desks', 'exam_papers', 'clock'],
    particles: null, particleIntensity: 0,
  },
  college_corridor: {
    sky: 'interior_modern', terrain: 'corridor_floor', lighting: 'fluorescent',
    features: ['lockers', 'students_bg', 'notice_board', 'doorways'],
    particles: null, particleIntensity: 0,
  },
  office_meeting: {
    sky: 'interior_modern', terrain: 'office_floor', lighting: 'office_warm',
    features: ['conference_table', 'whiteboard', 'chairs', 'window_city'],
    particles: null, particleIntensity: 0,
  },
  dorm_room: {
    sky: 'city_night', terrain: 'room_floor', lighting: 'desk_lamp',
    features: ['bed', 'desk', 'phone_glow', 'posters'],
    particles: null, particleIntensity: 0,
  },
  exam_hall: {
    sky: 'interior_modern', terrain: 'hall_floor', lighting: 'fluorescent',
    features: ['rows_desks', 'clock', 'invigilator', 'students_heads'],
    particles: null, particleIntensity: 0,
  },
}

// ---------- SCENE DEFINITIONS ----------

export const SCENES = {
  // ============================================
  // ARJUNA CHAPTER — OPENING SEQUENCE (4 beats)
  // ============================================

  arj_opening_1: {
    id: 'arj_opening_1',
    location: 'Kurukshetra Plain · Dawn of Day One',
    backdrop: 'battlefield_dawn_wide',
    characters: [
      { id: 'krishna', position: 'right', emotion: 'calm', scale: 0.9 },
      { id: 'arjuna', position: 'center-left', emotion: 'resolute', scale: 1.0 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.12, panX: 0, panY: -3, duration: 10000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Two colossal hosts stand arrayed across the sacred plain of Kurukshetra.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Banners crack in the morning wind. A hundred thousand conches wait silent in a hundred thousand hands.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The countdown to destiny has ended.',
      },
    ],
    ambience: ['wind', 'distant_army', 'horses'],
    sfx: [{ trigger: 'enter', sound: 'conch' }],
    transition: { in: 'fade', out: 'crossfade', duration: 1000 },
  },

  arj_opening_2: {
    id: 'arj_opening_2',
    location: 'Aboard the Golden Chariot',
    backdrop: 'between_armies_close',
    characters: [
      { id: 'arjuna', position: 'center', emotion: 'resolute', scale: 1.1 },
      { id: 'krishna', position: 'right', emotion: 'calm', scale: 0.9 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.05, panX: 8, panY: 0, duration: 8000 },
    dialogue: [
      {
        speaker: 'Arjuna', characterId: 'arjuna', emotion: 'resolute',
        text: '"Draw my chariot between the two hosts, O Infallible One."',
      },
      {
        speaker: 'Arjuna', characterId: 'arjuna', emotion: 'resolute',
        text: '"Let me look upon those who stand gathered, eager for battle."',
      },
    ],
    ambience: ['wind', 'chariot_wheels', 'horses'],
    sfx: [{ trigger: 'enter', sound: 'drum' }],
    transition: { in: 'crossfade', out: 'crossfade', duration: 800 },
  },

  arj_opening_3: {
    id: 'arj_opening_3',
    location: 'Between the Two Hosts',
    backdrop: 'arjuna_pov_generals',
    characters: [
      { id: 'bhishma', position: 'left', emotion: 'solemn', scale: 0.85 },
      { id: 'drona', position: 'center-left', emotion: 'stern', scale: 0.85 },
      { id: 'krishna', position: 'right', emotion: 'calm', scale: 0.9 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.2, panX: -5, panY: -2, duration: 9000 },
    dialogue: [
      {
        speaker: 'Krishna', characterId: 'krishna', emotion: 'calm',
        text: '"Look upon those who stand before you, Partha."',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Across the field: Grandfather Bhishma, who carried him upon his knee.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'His teacher Drona, who shaped his archery. Uncles, cousins, nephews, and friends — on both sides of war.',
      },
    ],
    ambience: ['wind', 'distant_army'],
    sfx: [{ trigger: 'enter', sound: 'counsel' }],
    transition: { in: 'crossfade', out: 'crossfade', duration: 800 },
  },

  arj_opening_4: {
    id: 'arj_opening_4',
    location: 'Between the Hosts · In Sorrow',
    backdrop: 'chariot_sorrow',
    characters: [
      { id: 'arjuna', position: 'center', emotion: 'sorrowful', scale: 1.15 },
      { id: 'krishna', position: 'right', emotion: 'compassionate', scale: 0.85 },
    ],
    camera: { startZoom: 1.05, endZoom: 1.25, panX: 0, panY: -5, duration: 10000 },
    dialogue: [
      {
        speaker: 'Arjuna', characterId: 'arjuna', emotion: 'sorrowful',
        text: '"My limbs fail me, Krishna. My mouth is parched."',
      },
      {
        speaker: 'Arjuna', characterId: 'arjuna', emotion: 'sorrowful',
        text: '"The Gandiva bow slips from my trembling fingers."',
      },
      {
        speaker: 'Arjuna', characterId: 'arjuna', emotion: 'distressed',
        text: '"What throne, what royal sovereignty is worth an ocean of their blood?"',
      },
    ],
    ambience: ['wind_soft', 'silence'],
    sfx: [{ trigger: 'enter', sound: 'drum' }, { trigger: 'line_2', sound: 'bow_lower' }],
    transition: { in: 'crossfade', out: 'fade', duration: 1000 },
  },

  // ============================================
  // ARJUNA CHAPTER — DECISION 1 (arj_1) INTROS
  // ============================================

  arj_1_intro: {
    id: 'arj_1_intro',
    location: 'Between the Hosts',
    backdrop: 'chariot_sorrow',
    characters: [
      { id: 'arjuna', position: 'center-left', emotion: 'conflicted', scale: 1.0 },
      { id: 'krishna', position: 'right', emotion: 'solemn', scale: 0.95 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.08, panX: 0, panY: -2, duration: 7000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The chariot stands still. Behind Arjuna, seven divisions wait for their general.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Ahead of him, everything he loves and everything he owes is arranged in battle formation.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Whatever happens in the next breath will decide what kind of man fights this war.',
      },
    ],
    ambience: ['wind_soft', 'distant_army'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 800 },
  },

  // Consequence scenes for arj_1 choices
  arj_1_conseq_A: {
    id: 'arj_1_conseq_A',
    location: 'Kurukshetra · The Bow is Raised',
    backdrop: 'arjuna_resolve',
    characters: [
      { id: 'arjuna', position: 'center', emotion: 'determined', scale: 1.15 },
      { id: 'krishna', position: 'right', emotion: 'calm', scale: 0.85 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.15, panX: -3, panY: -4, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Arjuna lifts the Gandiva. His hands are steady; his heart is not.',
      },
      {
        speaker: 'Krishna', characterId: 'krishna', emotion: 'calm',
        text: '"A kshatriya who shrinks from righteous battle invites dishonor. Lift the Gandiva, Partha."',
      },
    ],
    ambience: ['wind', 'distant_army', 'armor'],
    sfx: [{ trigger: 'enter', sound: 'bow_raise' }],
    transition: { in: 'crossfade', out: 'fade', duration: 800 },
  },

  arj_1_conseq_B: {
    id: 'arj_1_conseq_B',
    location: 'Kurukshetra · The Bow Falls Silent',
    backdrop: 'arjuna_despair',
    characters: [
      { id: 'arjuna', position: 'center', emotion: 'sorrowful', scale: 1.15 },
      { id: 'krishna', position: 'right', emotion: 'compassionate', scale: 0.85 },
    ],
    camera: { startZoom: 1.1, endZoom: 1.0, panX: 3, panY: 0, duration: 7000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The Gandiva slips from Arjuna\'s fingers. The army watches its greatest archer sit down in sorrow.',
      },
      {
        speaker: 'Krishna', characterId: 'krishna', emotion: 'compassionate',
        text: '"Your grief honors the bond of kin, Arjuna. But who will bear the fate of the thousands who relied upon your shield?"',
      },
    ],
    ambience: ['wind_soft', 'silence'],
    sfx: [{ trigger: 'enter', sound: 'bow_lower' }],
    transition: { in: 'crossfade', out: 'fade', duration: 1000 },
  },

  arj_1_conseq_C: {
    id: 'arj_1_conseq_C',
    location: 'Kurukshetra · Between Surrender and Slaughter',
    backdrop: 'chariot_sorrow',
    characters: [
      { id: 'arjuna', position: 'center', emotion: 'reflective', scale: 1.1 },
      { id: 'krishna', position: 'right', emotion: 'thoughtful', scale: 0.9 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.06, panX: 0, panY: -2, duration: 7000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Arjuna keeps his seat on the chariot but not his grip on war. A thin space opens between surrender and slaughter.',
      },
      {
        speaker: 'Krishna', characterId: 'krishna', emotion: 'calm',
        text: '"Peace is holy when it holds truth. But when peace is offered to an unyielding tyrant, prepare for what follows."',
      },
    ],
    ambience: ['wind_soft', 'distant_army'],
    sfx: [],
    transition: { in: 'crossfade', out: 'fade', duration: 800 },
  },

  arj_1_conseq_D: {
    id: 'arj_1_conseq_D',
    location: 'Kurukshetra · The Student Asks',
    backdrop: 'chariot_interior',
    characters: [
      { id: 'arjuna', position: 'left', emotion: 'humble', scale: 1.0 },
      { id: 'krishna', position: 'center-right', emotion: 'teaching', scale: 1.1 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.12, panX: 5, panY: -3, duration: 7000 },
    dialogue: [
      {
        speaker: 'Arjuna', characterId: 'arjuna', emotion: 'humble',
        text: '"My limbs fail me, Krishna. My mouth is dry. Teach me what is right."',
      },
      {
        speaker: 'Krishna', characterId: 'krishna', emotion: 'teaching',
        text: '"You have asked the question that opens the heart. I shall reveal the secret of action and detachment."',
      },
    ],
    ambience: ['wind_soft'],
    sfx: [{ trigger: 'enter', sound: 'counsel' }],
    transition: { in: 'crossfade', out: 'fade', duration: 800 },
  },

  // ============================================
  // ARJUNA CHAPTER — DECISION 2a (arj_2a)
  // ============================================

  arj_2a_intro: {
    id: 'arj_2a_intro',
    location: 'Kurukshetra · Dusk of Day Three',
    backdrop: 'battlefield_dusk',
    characters: [
      { id: 'drona', position: 'left', emotion: 'stern', scale: 1.0 },
      { id: 'arjuna', position: 'right', emotion: 'conflicted', scale: 1.0 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.1, panX: -5, panY: -2, duration: 8000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Three days into the war. Drona\'s battle-square grinds forward like a millstone.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'That night Arjuna remembers a small boy\'s hands being guided onto a bow string, again and again.',
      },
      {
        speaker: 'Arjuna', characterId: 'arjuna', emotion: 'conflicted',
        text: '"Everything I am, someone across the field made."',
      },
    ],
    ambience: ['wind', 'distant_fires', 'armor'],
    sfx: [{ trigger: 'enter', sound: 'drum' }],
    transition: { in: 'fade', out: 'crossfade', duration: 900 },
  },

  arj_2a_conseq_A: {
    id: 'arj_2a_conseq_A',
    location: 'Kurukshetra · The Duel',
    backdrop: 'battlefield_dusk',
    characters: [
      { id: 'drona', position: 'left', emotion: 'proud', scale: 1.0 },
      { id: 'arjuna', position: 'right', emotion: 'determined', scale: 1.05 },
    ],
    camera: { startZoom: 1.05, endZoom: 1.2, panX: 0, panY: -3, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Bow answers bow in a duel that stops both armies to watch.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Drona smiles even as he presses his student — the boy has become an archer worth killing.',
      },
    ],
    ambience: ['wind', 'armor', 'distant_army'],
    sfx: [{ trigger: 'enter', sound: 'arrow_fly' }],
    transition: { in: 'crossfade', out: 'fade', duration: 700 },
  },

  arj_2a_conseq_B: {
    id: 'arj_2a_conseq_B',
    location: 'Kurukshetra · Mercy by Design',
    backdrop: 'battlefield_dusk',
    characters: [
      { id: 'arjuna', position: 'center', emotion: 'compassionate', scale: 1.05 },
      { id: 'drona', position: 'left', emotion: 'calm', scale: 0.9 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.08, panX: -3, panY: 0, duration: 7000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Arjuna\'s arrows take wheels and bows, never throats. Drona withdraws each evening intact.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The war grows longer, and the longer war develops an appetite of its own.',
      },
    ],
    ambience: ['wind', 'distant_fires'],
    sfx: [],
    transition: { in: 'crossfade', out: 'fade', duration: 800 },
  },

  arj_2a_conseq_C: {
    id: 'arj_2a_conseq_C',
    location: 'Kurukshetra · The Storm That Avoids',
    backdrop: 'battlefield_dusk',
    characters: [
      { id: 'arjuna', position: 'right', emotion: 'strategic', scale: 1.0 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.05, panX: 6, panY: 0, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Arjuna becomes a storm that never meets Drona\'s chariot.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Dhrishtadyumna notices what the finest archer will not look at — and files it away.',
      },
    ],
    ambience: ['wind', 'distant_army'],
    sfx: [],
    transition: { in: 'crossfade', out: 'fade', duration: 800 },
  },

  arj_2a_conseq_D: {
    id: 'arj_2a_conseq_D',
    location: 'Between the Lines · Under White Banner',
    backdrop: 'between_armies_close',
    characters: [
      { id: 'arjuna', position: 'left', emotion: 'humble', scale: 1.0 },
      { id: 'drona', position: 'right', emotion: 'sorrowful', scale: 1.0 },
    ],
    camera: { startZoom: 1.05, endZoom: 1.15, panX: 3, panY: -2, duration: 7000 },
    dialogue: [
      {
        speaker: 'Drona', characterId: 'drona', emotion: 'sorrowful',
        text: '"I serve because I was fed when I was starving. A man\'s honor is chained to the table that fed him."',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Nothing changes on the field. Something is understood.',
      },
    ],
    ambience: ['wind_soft'],
    sfx: [],
    transition: { in: 'crossfade', out: 'fade', duration: 800 },
  },

  // ============================================
  // ARJUNA CHAPTER — DECISION 2b (arj_2b)
  // ============================================

  arj_2b_intro: {
    id: 'arj_2b_intro',
    location: 'Beneath the Banner · One Night, Eighteen Chapters Long',
    backdrop: 'counsel_night',
    characters: [
      { id: 'krishna', position: 'center-right', emotion: 'teaching', scale: 1.1 },
      { id: 'arjuna', position: 'left', emotion: 'listening', scale: 0.95 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.12, panX: 4, panY: -3, duration: 9000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Beneath the banner of Hanuman, the counsel unfolds through the watches of the night.',
      },
      {
        speaker: 'Krishna', characterId: 'krishna', emotion: 'teaching',
        text: '"Fear, grief, pride, the hunger to be thought good — which of them should be allowed to steer?"',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'By the last watch, one question remains. It is Arjuna\'s alone.',
      },
    ],
    ambience: ['night_insects', 'fire_crackle'],
    sfx: [{ trigger: 'enter', sound: 'counsel' }],
    transition: { in: 'fade', out: 'crossfade', duration: 1000 },
  },

  arj_2b_conseq_A: {
    id: 'arj_2b_conseq_A',
    location: 'Before Dawn · The Road Goes Where Roads Go',
    backdrop: 'battlefield_dawn',
    characters: [
      { id: 'arjuna', position: 'center', emotion: 'determined', scale: 1.1 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.08, panX: 0, panY: -4, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Arjuna rises before dawn and takes up the Gandiva with steady hands.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Something in him stays bent over its grief — but the army gets its archer back.',
      },
    ],
    ambience: ['wind', 'distant_army'],
    sfx: [{ trigger: 'enter', sound: 'drum' }],
    transition: { in: 'crossfade', out: 'fade', duration: 700 },
  },

  arj_2b_conseq_B: {
    id: 'arj_2b_conseq_B',
    location: 'The Counsel Ends · A Surgeon\'s Vow',
    backdrop: 'counsel_night',
    characters: [
      { id: 'arjuna', position: 'center', emotion: 'compassionate', scale: 1.05 },
      { id: 'krishna', position: 'right', emotion: 'calm', scale: 0.9 },
    ],
    camera: { startZoom: 1.05, endZoom: 1.1, panX: -2, panY: -2, duration: 7000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Arjuna chooses to see every man on that field as somebody\'s son.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'He will fight from now on the way a surgeon cuts — as little, as precisely, as possible.',
      },
    ],
    ambience: ['fire_crackle', 'wind_soft'],
    sfx: [],
    transition: { in: 'crossfade', out: 'fade', duration: 800 },
  },

  arj_2b_conseq_C: {
    id: 'arj_2b_conseq_C',
    location: 'The Counsel Ends · Weighing the Ruins',
    backdrop: 'counsel_night',
    characters: [
      { id: 'arjuna', position: 'center', emotion: 'resolute', scale: 1.05 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.08, panX: 0, panY: -3, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Arjuna stops asking which choice is clean and starts asking which price he is willing to pay in full.',
      },
    ],
    ambience: ['fire_crackle'],
    sfx: [],
    transition: { in: 'crossfade', out: 'fade', duration: 800 },
  },

  arj_2b_conseq_D: {
    id: 'arj_2b_conseq_D',
    location: 'The Counsel Continues · Dawn Approaches',
    backdrop: 'counsel_night',
    characters: [
      { id: 'arjuna', position: 'center', emotion: 'conflicted', scale: 1.0 },
      { id: 'krishna', position: 'right', emotion: 'solemn', scale: 0.9 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.05, panX: 0, panY: 0, duration: 7000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Arjuna asks for one more night. But armies do not pause for clarity.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'At dawn, others make the choices he deferred.',
      },
    ],
    ambience: ['night_insects', 'wind_soft'],
    sfx: [],
    transition: { in: 'crossfade', out: 'fade', duration: 800 },
  },

  // ============================================
  // ARJUNA CHAPTER — DECISION 2c (arj_2c)
  // ============================================

  arj_2c_intro: {
    id: 'arj_2c_intro',
    location: 'The Marble Court of Hastinapura',
    backdrop: 'peace_envoy',
    characters: [
      { id: 'arjuna', position: 'center', emotion: 'resolute', scale: 1.0 },
      { id: 'bhishma', position: 'left', emotion: 'sorrowful', scale: 0.85 },
      { id: 'karna', position: 'right', emotion: 'stern', scale: 0.85 },
    ],
    camera: { startZoom: 0.95, endZoom: 1.08, panX: 0, panY: -3, duration: 9000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Under a white banner, Arjuna crosses the plain to Hastinapura — and walks in unarmed, asking for peace.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Bhishma sits rigid with grief. Drona will not meet his student\'s eye. Karna watches from the seat of the sun, saying nothing.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: '"Not one village," says Duryodhana. "Not land the size of a needle\'s point."',
      },
    ],
    ambience: ['crowd_murmur', 'torch_crackle'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 1000 },
  },

  arj_2c_conseq_A: {
    id: 'arj_2c_conseq_A',
    location: 'Hastinapura · Terms Set Down Like Arrows',
    backdrop: 'hastinapura_court',
    characters: [
      { id: 'arjuna', position: 'center', emotion: 'determined', scale: 1.05 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.06, panX: 0, panY: -2, duration: 5000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'No speeches, no wrath — just terms, set down like arrows on a rack.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Duryodhana refuses. When war comes, no one can say the Pandavas hid their intent.',
      },
    ],
    ambience: ['crowd_murmur'],
    sfx: [],
    transition: { in: 'crossfade', out: 'fade', duration: 800 },
  },

  arj_2c_conseq_B: {
    id: 'arj_2c_conseq_B',
    location: 'Hastinapura · Five Villages',
    backdrop: 'hastinapura_court',
    characters: [
      { id: 'arjuna', position: 'center', emotion: 'humble', scale: 1.0 },
      { id: 'bhishma', position: 'left', emotion: 'sorrowful', scale: 0.9 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.08, panX: -3, panY: -2, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Gasps run around the hall. Bhishma closes his eyes as if in prayer.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'It is Duryodhana who refuses — he will not let the Pandavas have the moral field along with the villages.',
      },
    ],
    ambience: ['crowd_murmur', 'silence'],
    sfx: [],
    transition: { in: 'crossfade', out: 'fade', duration: 800 },
  },

  arj_2c_conseq_C: {
    id: 'arj_2c_conseq_C',
    location: 'Hastinapura · Addressing the Elders',
    backdrop: 'hastinapura_court',
    characters: [
      { id: 'arjuna', position: 'center-right', emotion: 'strategic', scale: 1.0 },
      { id: 'bhishma', position: 'left', emotion: 'sorrowful', scale: 0.95 },
      { id: 'drona', position: 'center-left', emotion: 'conflicted', scale: 0.9 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.1, panX: -5, panY: -2, duration: 7000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Arjuna speaks past the throne to the men who hold it up.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Bhishma shakes his head in sorrow. No elder moves — but the seeds of doubt are watered.',
      },
    ],
    ambience: ['crowd_murmur'],
    sfx: [],
    transition: { in: 'crossfade', out: 'fade', duration: 800 },
  },

  arj_2c_conseq_D: {
    id: 'arj_2c_conseq_D',
    location: 'Hastinapura · Eyes Open',
    backdrop: 'hastinapura_court',
    characters: [
      { id: 'arjuna', position: 'right', emotion: 'strategic', scale: 1.0 },
      { id: 'karna', position: 'left', emotion: 'stern', scale: 0.9 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.06, panX: 4, panY: 0, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'While others perform honor, Arjuna watches: which brother Duryodhana consults first, where Karna\'s eyes go.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'He walks out knowing exactly what this war will cost both sides. Knowledge is heavier than it looks.',
      },
    ],
    ambience: ['crowd_murmur'],
    sfx: [],
    transition: { in: 'crossfade', out: 'fade', duration: 800 },
  },

  // ============================================
  // ARJUNA CHAPTER — DECISION 3 (arj_3)
  // ============================================

  arj_3_intro: {
    id: 'arj_3_intro',
    location: 'War Council Tent · The Ninth Night',
    backdrop: 'war_council_tent',
    characters: [
      { id: 'yudhishthira', position: 'center', emotion: 'solemn', scale: 1.05 },
      { id: 'arjuna', position: 'right', emotion: 'conflicted', scale: 0.95 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.1, panX: 0, panY: -3, duration: 8000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The ninth night of the war. The Pandava camp is torch-lit and quiet with grief.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: '"If Drona believes his son is dead, he will drop his bow," says Dhrishtadyumna.',
      },
      {
        speaker: 'Yudhishthira', characterId: 'yudhishthira', emotion: 'solemn',
        text: '"It will work. And it will be remembered."',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'They ask for Arjuna\'s voice.',
      },
    ],
    ambience: ['fire_crackle', 'night_insects', 'distant_camp'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 900 },
  },

  arj_3_conseq_A: {
    id: 'arj_3_conseq_A',
    location: 'The Ninth Night · Cold Arithmetic',
    backdrop: 'war_council_tent',
    characters: [
      { id: 'arjuna', position: 'center', emotion: 'resolute', scale: 1.0 },
      { id: 'yudhishthira', position: 'left', emotion: 'solemn', scale: 0.9 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.06, panX: 0, panY: -2, duration: 5000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'An elephant dies under an honest-sounding name. An old teacher hears the worst words a father can hear.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'It works. The histories record that it works — and record, in the same breath, exactly how.',
      },
    ],
    ambience: ['fire_crackle', 'silence'],
    sfx: [],
    transition: { in: 'crossfade', out: 'fade', duration: 800 },
  },

  arj_3_conseq_B: {
    id: 'arj_3_conseq_B',
    location: 'The Ninth Night · Clean Steel',
    backdrop: 'war_council_tent',
    characters: [
      { id: 'arjuna', position: 'center', emotion: 'determined', scale: 1.05 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.08, panX: 0, panY: -3, duration: 5000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Arjuna says no — loudly enough that the council must find another road.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The war grows longer and crueler. But no verse will need explaining.',
      },
    ],
    ambience: ['fire_crackle'],
    sfx: [],
    transition: { in: 'crossfade', out: 'fade', duration: 800 },
  },

  arj_3_conseq_C: {
    id: 'arj_3_conseq_C',
    location: 'The Ninth Night · Guard the Fall',
    backdrop: 'war_council_tent',
    characters: [
      { id: 'arjuna', position: 'center', emotion: 'compassionate', scale: 1.0 },
      { id: 'yudhishthira', position: 'left', emotion: 'conflicted', scale: 0.9 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.06, panX: -2, panY: -2, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The council accepts the condition in uneasy silence.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Neither a clean lie nor a clean fight: a third thing, owned by everyone who built it.',
      },
    ],
    ambience: ['fire_crackle', 'night_insects'],
    sfx: [],
    transition: { in: 'crossfade', out: 'fade', duration: 800 },
  },

  arj_3_conseq_D: {
    id: 'arj_3_conseq_D',
    location: 'The Ninth Night · Another\'s Conscience',
    backdrop: 'war_council_tent',
    characters: [
      { id: 'yudhishthira', position: 'center', emotion: 'solemn', scale: 1.05 },
      { id: 'arjuna', position: 'right', emotion: 'conflicted', scale: 0.9 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.06, panX: -3, panY: -2, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Arjuna bows out. The burden settles fully on his eldest brother.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The strategy proceeds. Something between the brothers does not.',
      },
    ],
    ambience: ['fire_crackle', 'silence'],
    sfx: [],
    transition: { in: 'crossfade', out: 'fade', duration: 800 },
  },

  // ============================================
  // ARJUNA CHAPTER — DECISION 4 (arj_4)
  // ============================================

  arj_4_intro: {
    id: 'arj_4_intro',
    location: 'Kurukshetra · The Tenth Dawn',
    backdrop: 'tenth_dawn',
    characters: [
      { id: 'arjuna', position: 'center', emotion: 'resolute', scale: 1.05 },
      { id: 'bhishma', position: 'left', emotion: 'solemn', scale: 0.8, dimmed: true },
    ],
    camera: { startZoom: 0.95, endZoom: 1.15, panX: 0, panY: -5, duration: 10000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Ten nights of war. Bhishma\'s bow sweeps the field like a scythe each dawn.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The plan is simple and terrible: Shikhandi rides in front. The vow empties Bhishma\'s bow.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Arjuna looks at the white banner of the grandfather who once held him as a child.',
      },
    ],
    ambience: ['wind', 'distant_army', 'horses'],
    sfx: [{ trigger: 'enter', sound: 'conch' }],
    transition: { in: 'fade', out: 'crossfade', duration: 1000 },
  },

  arj_4_conseq_A: {
    id: 'arj_4_conseq_A',
    location: 'The Tenth Dawn · The Shield Plan',
    backdrop: 'tenth_dawn',
    characters: [
      { id: 'arjuna', position: 'center', emotion: 'sorrowful', scale: 1.1 },
      { id: 'bhishma', position: 'left', emotion: 'accepting', scale: 0.9 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.15, panX: -3, panY: -4, duration: 7000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Bhishma\'s bow lowers — and Arjuna, weeping behind his quiver, brings down the grandsire onto a bed of arrows.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The war turns that day. The bards will argue about the shield for three thousand years.',
      },
    ],
    ambience: ['wind', 'silence'],
    sfx: [{ trigger: 'enter', sound: 'arrow_fly' }],
    transition: { in: 'crossfade', out: 'fade', duration: 1000 },
  },

  arj_4_conseq_B: {
    id: 'arj_4_conseq_B',
    location: 'The Tenth Dawn · Face to Face',
    backdrop: 'tenth_dawn',
    characters: [
      { id: 'arjuna', position: 'center-right', emotion: 'determined', scale: 1.1 },
      { id: 'bhishma', position: 'left', emotion: 'proud', scale: 1.0 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.2, panX: -5, panY: -3, duration: 8000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Arjuna circles past Shikhandi into Bhishma\'s direct line. The hardest fight of the war.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The old man nods once, almost proudly, before the final shafts fly.',
      },
    ],
    ambience: ['wind', 'armor', 'distant_army'],
    sfx: [{ trigger: 'enter', sound: 'drum' }],
    transition: { in: 'crossfade', out: 'fade', duration: 900 },
  },

  arj_4_conseq_C: {
    id: 'arj_4_conseq_C',
    location: 'The Tenth Dawn · Beside, Not Behind',
    backdrop: 'tenth_dawn',
    characters: [
      { id: 'arjuna', position: 'center', emotion: 'resolute', scale: 1.05 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.1, panX: 0, panY: -3, duration: 7000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'They ride abreast — two warriors, one cause. The plan works. No one in it was used.',
      },
    ],
    ambience: ['wind', 'horses'],
    sfx: [{ trigger: 'enter', sound: 'drum' }],
    transition: { in: 'crossfade', out: 'fade', duration: 800 },
  },

  arj_4_conseq_D: {
    id: 'arj_4_conseq_D',
    location: 'The Tenth Dawn · Open the Gate',
    backdrop: 'tenth_dawn',
    characters: [
      { id: 'arjuna', position: 'center-right', emotion: 'compassionate', scale: 1.0 },
      { id: 'bhishma', position: 'left', emotion: 'sorrowful', scale: 1.0 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.12, panX: -4, panY: -2, duration: 8000 },
    dialogue: [
      {
        speaker: 'Bhishma', characterId: 'bhishma', emotion: 'sorrowful',
        text: '"I am tied to the throne\'s fate, child. Loose your arrows."',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'He chooses his chain. Arjuna finally shoots.',
      },
    ],
    ambience: ['wind', 'silence'],
    sfx: [{ trigger: 'line_1', sound: 'arrow_fly' }],
    transition: { in: 'crossfade', out: 'fade', duration: 1000 },
  },

  // ============================================
  // ARJUNA CHAPTER — ENDING
  // ============================================

  arj_ending: {
    id: 'arj_ending',
    location: 'Kurukshetra · After the Tenth Dawn',
    backdrop: 'aftermath_sunset',
    characters: [
      { id: 'arjuna', position: 'center', emotion: 'reflective', scale: 1.0 },
    ],
    camera: { startZoom: 1.05, endZoom: 0.95, panX: 0, panY: 2, duration: 12000 },
    dialogue: [],
    ambience: ['wind_soft', 'distant_fires'],
    sfx: [],
    transition: { in: 'fade', out: 'fade', duration: 1200 },
  },

  // ============================================
  // MODERN DILEMMA SCENES
  // ============================================

  mod_teamwork_intro: {
    id: 'mod_teamwork_intro',
    location: 'Campus · Late Night',
    backdrop: 'campus_night',
    characters: [],
    camera: { startZoom: 1.0, endZoom: 1.06, panX: 0, panY: -2, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The deadline is tomorrow at noon. Your four-person project is finally assembled — except for one thing.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'A teammate\'s father was hospitalized. She has been on a train since dawn.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Her name is on the cover page. Her section is not in the document.',
      },
    ],
    ambience: ['night_city', 'keyboard_soft'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 800 },
  },

  mod_integrity_intro: {
    id: 'mod_integrity_intro',
    location: 'University Library · Evening',
    backdrop: 'library_tense',
    characters: [],
    camera: { startZoom: 1.0, endZoom: 1.05, panX: 2, panY: -1, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Your closest friend bought his final term paper online. The course is graded on a curve.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'He was drowning in four deadlines and a part-time job. He took the exit ramp.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Your grade rises or falls with his, and with everyone else\'s.',
      },
    ],
    ambience: ['library_quiet', 'clock_tick'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 800 },
  },

  mod_generic_intro: {
    id: 'mod_generic_intro',
    location: 'The Modern World',
    backdrop: 'college_corridor',
    characters: [],
    camera: { startZoom: 1.0, endZoom: 1.04, panX: 0, panY: -1, duration: 5000 },
    dialogue: [],
    ambience: ['crowd_murmur'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },
}

// ---------- HELPERS ----------

/** Look up a scene definition by ID. Returns null if not found. */
export function getScene(sceneId) {
  return SCENES[sceneId] || null
}

/** Get the opening scene sequence IDs for the Arjuna chapter. */
export const ARJUNA_OPENING_SEQUENCE = [
  'arj_opening_1',
  'arj_opening_2',
  'arj_opening_3',
  'arj_opening_4',
]

/** Map decision node + choice to a consequence scene ID. */
export function getConsequenceSceneId(nodeId, choiceId) {
  const key = `${nodeId.replace('arj_', 'arj_')}_conseq_${choiceId}`
  return SCENES[key] ? key : null
}

/** Map decision node to its intro scene ID. */
export function getIntroSceneId(nodeId) {
  const key = `${nodeId}_intro`
  return SCENES[key] ? key : null
}

/** Map modern scenario to its intro scene ID. */
export function getModernSceneId(scenarioId) {
  const key = `${scenarioId}_intro`
  return SCENES[key] ? key : 'mod_generic_intro'
}
