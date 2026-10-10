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

  // --- Modern Dilemmas — 8 Distinct Scenarios ---
  mod_empty_seat: {
    sky: 'city_night', terrain: 'campus_ground', lighting: 'desk_lamp',
    features: ['college_building', 'laptop_glow', 'empty_chair', 'window_lights'],
    particles: null, particleIntensity: 0,
  },
  mod_purchased_essay: {
    sky: 'interior_modern', terrain: 'library_floor', lighting: 'fluorescent',
    features: ['bookshelves', 'study_desks', 'exam_papers', 'clock'],
    particles: null, particleIntensity: 0,
  },
  mod_viral_jest: {
    sky: 'city_night', terrain: 'corridor_floor', lighting: 'streetlamp',
    features: ['lockers', 'students_bg', 'phone_glow', 'notice_board'],
    particles: null, particleIntensity: 0,
  },
  mod_missed_milestone: {
    sky: 'city_night', terrain: 'office_floor', lighting: 'office_warm',
    features: ['conference_table', 'whiteboard', 'chairs', 'window_city'],
    particles: null, particleIntensity: 0,
  },
  mod_inflated_invoice: {
    sky: 'interior_modern', terrain: 'office_floor', lighting: 'office_warm',
    features: ['conference_table', 'whiteboard', 'chairs', 'window_city'],
    particles: null, particleIntensity: 0,
  },
  mod_confession_call: {
    sky: 'sunset', terrain: 'campus_ground', lighting: 'sunset_deep',
    features: ['college_building', 'phone_glow', 'window_lights'],
    particles: null, particleIntensity: 0,
  },
  mod_storm_call: {
    sky: 'overcast', terrain: 'campus_ground', lighting: 'overcast',
    features: ['college_building', 'window_lights'],
    particles: 'mist', particleIntensity: 0.3,
  },
  mod_senior_tradition: {
    sky: 'interior_modern', terrain: 'corridor_floor', lighting: 'streetlamp',
    features: ['lockers', 'students_bg', 'doorways'],
    particles: null, particleIntensity: 0,
  },
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
  // MODERN DILEMMA SCENES (8 DISTINCT SCENARIOS)
  // ============================================

  mod_teamwork_intro: {
    id: 'mod_teamwork_intro',
    location: 'Campus Study Hall · Midnight',
    backdrop: 'mod_empty_seat',
    backgroundImage: '/assets/scenes/modern-empty-seat.jpg',
    characters: [],
    camera: { startZoom: 1.0, endZoom: 1.06, panX: 0, panY: -2, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The deadline is tomorrow at noon. Your four-person project is assembled — except for the crucial analysis section.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Your teammate messaged an hour ago from a train; her father was hospitalized. She did not ask for credit — she just explained why she went silent.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Her name is on the cover page. Her section is blank. The submission portal is counting down.',
      },
    ],
    ambience: ['night_city', 'keyboard_soft'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 800 },
  },

  mod_integrity_intro: {
    id: 'mod_integrity_intro',
    location: 'University Library · Late Evening',
    backdrop: 'mod_purchased_essay',
    backgroundImage: '/assets/scenes/modern-purchased-essay.jpg',
    characters: [],
    camera: { startZoom: 1.0, endZoom: 1.05, panX: 2, panY: -1, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Your closest friend confessed that he bought his final term paper online from an anonymous service.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'He was drowning in four deadlines and a part-time job. The professor suspects nothing.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The course is graded on a strict curve. Your grade, and everyone else\'s, will rise or fall with his submission.',
      },
    ],
    ambience: ['library_quiet', 'clock_tick'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 800 },
  },

  mod_social_intro: {
    id: 'mod_social_intro',
    location: 'Campus Courtyard · Afternoon',
    backdrop: 'mod_viral_jest',
    backgroundImage: '/assets/scenes/modern-viral-jest.jpg',
    characters: [],
    camera: { startZoom: 1.0, endZoom: 1.06, panX: -1, panY: -1, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'A meme mocking a quiet classmate\'s stutter is spreading through student group chats at lightning speed.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The creator is popular, witty, and someone who once stood up for you when you needed support.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The quiet classmate sits alone across the courtyard, unaware of the storm. Someone pings you: "Your turn."',
      },
    ],
    ambience: ['crowd_murmur', 'phone_chime'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 800 },
  },

  mod_leadership_intro: {
    id: 'mod_leadership_intro',
    location: 'Glass Conference Room · 9:00 AM',
    backdrop: 'mod_missed_milestone',
    backgroundImage: '/assets/scenes/modern-missed-milestone.jpg',
    characters: [],
    camera: { startZoom: 1.0, endZoom: 1.05, panX: 1, panY: -1, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The client demo is scheduled for noon. The core feature is incomplete and failing tests.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The root cause was your scheduling error three weeks ago. Nobody on the team knows the fault was yours.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Your junior Priya is already drafting a slide blaming the API team. The sponsor will ask for an explanation.',
      },
    ],
    ambience: ['office_ambient', 'keyboard_soft'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 800 },
  },

  mod_workplace_intro: {
    id: 'mod_workplace_intro',
    location: 'Corporate Finance Office · Dusk',
    backdrop: 'mod_inflated_invoice',
    backgroundImage: '/assets/scenes/modern-inflated-invoice.jpg',
    characters: [],
    camera: { startZoom: 1.0, endZoom: 1.05, panX: 0, panY: -1, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Three months into your first job, you uncover systematic padding in client billing: unworked hours, phantom licenses.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Your manager approved every single line — the same mentor who hired you and championed your recent raise.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The compliance hotline reports to a department your manager lunches with every Friday. The ledger rests on your desk.',
      },
    ],
    ambience: ['office_ambient', 'clock_tick'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 800 },
  },

  mod_friendship_intro: {
    id: 'mod_friendship_intro',
    location: 'Campus Terrace · Sunset',
    backdrop: 'mod_confession_call',
    backgroundImage: '/assets/scenes/modern-confession-call.jpg',
    characters: [],
    camera: { startZoom: 1.0, endZoom: 1.07, panX: -1, panY: -2, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Your best friend failed the career-defining exam his parents sacrificed everything for. He lied and told them he passed.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'He confessed the truth to you in tears. Now, his mother is calling your phone, voice bright with relief and celebration.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The public results post next week. Her joyful, trusting voice waits on the line.',
      },
    ],
    ambience: ['wind_soft', 'phone_chime'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 800 },
  },

  mod_crisis_intro: {
    id: 'mod_crisis_intro',
    location: 'Festival Grounds · 8:00 PM',
    backdrop: 'mod_storm_call',
    backgroundImage: '/assets/scenes/modern-storm-call.jpg',
    characters: [],
    camera: { startZoom: 1.0, endZoom: 1.06, panX: 0, panY: -2, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'You are student coordinator for the annual cultural festival. Three hundred tickets sold; doors open tomorrow morning.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The meteorological radar just upgraded a severe monsoon storm to a certainty with dangerous wind gusts for open-air stages.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The committee is deadlocked: financial collapse from refunds versus catastrophic safety liabilities on the open field.',
      },
    ],
    ambience: ['wind', 'storm_distant'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 800 },
  },

  mod_college_intro: {
    id: 'mod_college_intro',
    location: 'Hostel Corridor · 11:00 PM',
    backdrop: 'mod_senior_tradition',
    backgroundImage: '/assets/scenes/modern-senior-tradition.jpg',
    characters: [],
    camera: { startZoom: 1.0, endZoom: 1.05, panX: 0, panY: -1, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'It is late night in the dormitory. Seniors are forcing first-year students through an intimidating "welcome tradition".',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'One quiet student from the library is trembling in humiliation, unable to push back against the crowd.',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The seniors running the corridor include your project partner and floor-mate. The hallway is watching.',
      },
    ],
    ambience: ['crowd_murmur', 'clock_tick'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 800 },
  },

  mod_generic_intro: {
    id: 'mod_generic_intro',
    location: 'The Modern World',
    backdrop: 'mod_senior_tradition',
    backgroundImage: '/assets/scenes/modern-senior-tradition.jpg',
    characters: [],
    camera: { startZoom: 1.0, endZoom: 1.04, panX: 0, panY: -1, duration: 5000 },
    dialogue: [],
    ambience: ['crowd_murmur'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },
  // ============================================
  // KARNA CHAPTER SCENES
  // ============================================

  karna_opening_1: {
    id: 'karna_opening_1',
    location: 'Banks of the Yamuna · Night of Destiny',
    backdrop: 'counsel_night',
    characters: [
      { id: 'krishna', position: 'right', emotion: 'calm', scale: 0.95 },
      { id: 'karna', position: 'center-left', emotion: 'solemn', scale: 1.05 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.1, panX: 0, panY: -2, duration: 9000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The sacred river Yamuna flows silently under a blanket of starlight.',
      },
      {
        speaker: 'Krishna', characterId: 'krishna', emotion: 'wise',
        text: '"Radheya, you walk in the shadow of an untruth. You are not a charioteer\'s son."',
      },
      {
        speaker: 'Krishna', characterId: 'krishna', emotion: 'calm',
        text: '"You are Kunti\'s firstborn. Surya\'s radiant seed. The rightful emperor of Aryavarta."',
      },
    ],
    ambience: ['night_insects', 'wind_soft'],
    sfx: [{ trigger: 'enter', sound: 'counsel' }],
    transition: { in: 'fade', out: 'crossfade', duration: 1000 },
  },

  karna_opening_2: {
    id: 'karna_opening_2',
    location: 'Aboard the Chariot · Midnight',
    backdrop: 'counsel_night',
    characters: [
      { id: 'karna', position: 'center', emotion: 'defiant', scale: 1.1 },
      { id: 'krishna', position: 'right', emotion: 'calm', scale: 0.9 },
    ],
    camera: { startZoom: 1.05, endZoom: 1.18, panX: -4, panY: -3, duration: 8000 },
    dialogue: [
      {
        speaker: 'Karna', characterId: 'karna', emotion: 'solemn',
        text: '"When the world mocked my birth, Duryodhana stood alone and gave me honor."',
      },
      {
        speaker: 'Karna', characterId: 'karna', emotion: 'defiant',
        text: '"Shall I desert him now on the eve of his doom for a crown of gold?"',
      },
    ],
    ambience: ['wind_soft', 'silence'],
    sfx: [{ trigger: 'enter', sound: 'drum' }],
    transition: { in: 'crossfade', out: 'crossfade', duration: 800 },
  },

  karna_opening_3: {
    id: 'karna_opening_3',
    location: 'The Solitary Shore · The Vow',
    backdrop: 'counsel_night',
    characters: [
      { id: 'karna', position: 'center', emotion: 'resolute', scale: 1.15 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.15, panX: 0, panY: -2, duration: 7000 },
    dialogue: [
      {
        speaker: 'Karna', characterId: 'karna', emotion: 'resolute',
        text: '"Let the world know Karna not by the womb that abandoned him, but by the loyalty he kept."',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The son of Surya turns his chariot toward Kurukshetra, choosing death with honor over life with compromise.',
      },
    ],
    ambience: ['wind', 'distant_army'],
    sfx: [{ trigger: 'enter', sound: 'conch' }],
    transition: { in: 'crossfade', out: 'fade', duration: 900 },
  },

  karna_1_intro: {
    id: 'karna_1_intro',
    location: 'Yamuna Riverbank · The Midnight Offer',
    backdrop: 'counsel_night',
    characters: [
      { id: 'karna', position: 'center-left', emotion: 'solemn', scale: 1.0 },
      { id: 'krishna', position: 'right', emotion: 'calm', scale: 0.95 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.08, panX: 0, panY: -2, duration: 6000 },
    dialogue: [
      {
        speaker: 'Krishna', characterId: 'krishna', emotion: 'calm',
        text: '"The choice is yours, Karna: rule the earth with the Pandavas, or die on the sands of Kurukshetra."',
      },
    ],
    ambience: ['night_insects', 'wind_soft'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  karna_2a_intro: {
    id: 'karna_2a_intro',
    location: 'Ganges Shore · Mother and Son',
    backdrop: 'battlefield_dawn',
    characters: [
      { id: 'karna', position: 'center-left', emotion: 'calm', scale: 1.05 },
      { id: 'draupadi', position: 'right', emotion: 'solemn', scale: 0.9 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.1, panX: 3, panY: -1, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Queen Kunti approaches the radiant warrior at dawn, pleading for the lives of her five sons.',
      },
    ],
    ambience: ['wind_soft'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  karna_2b_intro: {
    id: 'karna_2b_intro',
    location: 'Kaurava Camp · The Beggar God',
    backdrop: 'war_council_tent',
    characters: [
      { id: 'karna', position: 'center', emotion: 'resolute', scale: 1.1 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.06, panX: 0, panY: -2, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Indra in disguise asks for the impenetrable golden armor grown upon Karna\'s flesh since birth.',
      },
    ],
    ambience: ['distant_fires'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  karna_2c_intro: {
    id: 'karna_2c_intro',
    location: 'Kaurava War Pavilion · Supreme Command',
    backdrop: 'war_council_tent',
    characters: [
      { id: 'karna', position: 'center', emotion: 'defiant', scale: 1.1 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.08, panX: -2, panY: -1, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Duryodhana crowns Karna supreme commander of the army, while King Salya mocks his charioteer lineage.',
      },
    ],
    ambience: ['distant_army', 'fire_crackle'],
    sfx: [{ trigger: 'enter', sound: 'drum' }],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  karna_3a_intro: {
    id: 'karna_3a_intro',
    location: 'Kurukshetra · The 17th Day',
    backdrop: 'battlefield_aftermath',
    characters: [
      { id: 'karna', position: 'center-left', emotion: 'defiant', scale: 1.1 },
      { id: 'arjuna', position: 'right', emotion: 'resolute', scale: 1.0 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.15, panX: 0, panY: -3, duration: 7000 },
    dialogue: [
      {
        speaker: 'Karna', characterId: 'karna', emotion: 'defiant',
        text: '"The wheel is trapped in the mud, Partha! Hold your arrow while I lift it!"',
      },
    ],
    ambience: ['wind', 'distant_army'],
    sfx: [{ trigger: 'enter', sound: 'drum' }],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  karna_3b_intro: {
    id: 'karna_3b_intro',
    location: '14th Night of Kurukshetra',
    backdrop: 'counsel_night',
    characters: [
      { id: 'karna', position: 'center', emotion: 'resolute', scale: 1.1 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.08, panX: 0, panY: -2, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Ghatotkacha wreaks havoc in the dark. Duryodhana begs Karna to use his single celestial spear.',
      },
    ],
    ambience: ['distant_fires', 'wind'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  karna_4a_intro: {
    id: 'karna_4a_intro',
    location: 'Kurukshetra · Sunset of the 17th Day',
    backdrop: 'aftermath_sunset',
    characters: [
      { id: 'karna', position: 'center', emotion: 'solemn', scale: 1.1 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.1, panX: 0, panY: -2, duration: 7000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Lying wounded in the dust, the final test of generosity arrives before the sun sets.',
      },
    ],
    ambience: ['wind_soft', 'silence'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  karna_ending: {
    id: 'karna_ending',
    location: 'The Solar Realm · Beyond Mortality',
    backdrop: 'aftermath_sunset',
    characters: [
      { id: 'karna', position: 'center', emotion: 'calm', scale: 1.05 },
    ],
    camera: { startZoom: 1.05, endZoom: 0.95, panX: 0, panY: 2, duration: 12000 },
    dialogue: [],
    ambience: ['wind_soft'],
    sfx: [],
    transition: { in: 'fade', out: 'fade', duration: 1200 },
  },

  // ============================================
  // KRISHNA CHAPTER SCENES
  // ============================================

  krishna_opening_1: {
    id: 'krishna_opening_1',
    location: 'Gates of Hastinapura · Dawn',
    backdrop: 'hastinapura_court',
    characters: [
      { id: 'krishna', position: 'center', emotion: 'calm', scale: 1.05 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.12, panX: 0, panY: -2, duration: 9000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Krishna enters the imperial city of Hastinapura unarmed as the ambassador of peace.',
      },
      {
        speaker: 'Krishna', characterId: 'krishna', emotion: 'wise',
        text: '"I come seeking peace, but preparing the world for the restoration of Dharma."',
      },
    ],
    ambience: ['crowd_murmur', 'wind_soft'],
    sfx: [{ trigger: 'enter', sound: 'conch' }],
    transition: { in: 'fade', out: 'crossfade', duration: 1000 },
  },

  krishna_opening_2: {
    id: 'krishna_opening_2',
    location: 'The Royal Sabha of the Kurus',
    backdrop: 'hastinapura_court',
    characters: [
      { id: 'krishna', position: 'center', emotion: 'wise', scale: 1.1 },
      { id: 'bhishma', position: 'left', emotion: 'solemn', scale: 0.85 },
      { id: 'drona', position: 'right', emotion: 'solemn', scale: 0.85 },
    ],
    camera: { startZoom: 1.05, endZoom: 1.15, panX: 0, panY: -3, duration: 8000 },
    dialogue: [
      {
        speaker: 'Krishna', characterId: 'krishna', emotion: 'calm',
        text: '"Give the Pandavas only five villages, O King, and let the feud end in peace."',
      },
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Duryodhana laughs in arrogance, refusing even a needlepoint of land.',
      },
    ],
    ambience: ['crowd_murmur'],
    sfx: [{ trigger: 'enter', sound: 'counsel' }],
    transition: { in: 'crossfade', out: 'crossfade', duration: 800 },
  },

  krishna_opening_3: {
    id: 'krishna_opening_3',
    location: 'The Assembly of Kurus · Cosmic Warning',
    backdrop: 'peace_envoy',
    characters: [
      { id: 'krishna', position: 'center', emotion: 'resolute', scale: 1.2 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.2, panX: 0, panY: -4, duration: 8000 },
    dialogue: [
      {
        speaker: 'Krishna', characterId: 'krishna', emotion: 'wise',
        text: '"When power scorns justice, war becomes the tragic surgery of history."',
      },
    ],
    ambience: ['distant_army', 'wind'],
    sfx: [{ trigger: 'enter', sound: 'drum' }],
    transition: { in: 'crossfade', out: 'fade', duration: 1000 },
  },

  krishna_1_intro: {
    id: 'krishna_1_intro',
    location: 'Court of Hastinapura',
    backdrop: 'hastinapura_court',
    characters: [
      { id: 'krishna', position: 'center', emotion: 'wise', scale: 1.05 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.06, panX: 0, panY: -2, duration: 6000 },
    dialogue: [
      {
        speaker: 'Krishna', characterId: 'krishna', emotion: 'wise',
        text: '"Let every elder witness that we offered peace until the last breath."',
      },
    ],
    ambience: ['crowd_murmur'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  krishna_2a_intro: {
    id: 'krishna_2a_intro',
    location: 'Kurukshetra · The Third Dawn',
    backdrop: 'battlefield_dawn',
    characters: [
      { id: 'krishna', position: 'center', emotion: 'resolute', scale: 1.1 },
      { id: 'arjuna', position: 'left', emotion: 'conflicted', scale: 0.95 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.15, panX: 0, panY: -2, duration: 6000 },
    dialogue: [
      {
        speaker: 'Krishna', characterId: 'krishna', emotion: 'resolute',
        text: '"If you will not strike Bhishma, Partha, I shall break my own vow and do it myself!"',
      },
    ],
    ambience: ['wind', 'distant_army'],
    sfx: [{ trigger: 'enter', sound: 'drum' }],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  krishna_2b_intro: {
    id: 'krishna_2b_intro',
    location: 'Kurukshetra · 14th Dusk',
    backdrop: 'battlefield_dusk',
    characters: [
      { id: 'krishna', position: 'center-right', emotion: 'calm', scale: 1.05 },
      { id: 'arjuna', position: 'left', emotion: 'resolute', scale: 1.0 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.1, panX: 2, panY: -2, duration: 6000 },
    dialogue: [
      {
        speaker: 'Krishna', characterId: 'krishna', emotion: 'calm',
        text: '"The sun sinks low, Arjuna. Jayadratha hides behind a wall of chariots."',
      },
    ],
    ambience: ['distant_fires', 'wind'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  krishna_3a_intro: {
    id: 'krishna_3a_intro',
    location: 'Kurukshetra · 15th Day',
    backdrop: 'war_council_tent',
    characters: [
      { id: 'krishna', position: 'right', emotion: 'wise', scale: 1.0 },
      { id: 'yudhishthira', position: 'center-left', emotion: 'solemn', scale: 1.0 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.08, panX: -2, panY: -2, duration: 6000 },
    dialogue: [
      {
        speaker: 'Krishna', characterId: 'krishna', emotion: 'wise',
        text: '"When catastrophe threatens total ruin, higher duty supersedes rigid convention."',
      },
    ],
    ambience: ['wind_soft', 'distant_army'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  krishna_3b_intro: {
    id: 'krishna_3b_intro',
    location: 'Lake Samantapanchaka · The Final Duel',
    backdrop: 'battlefield_aftermath',
    characters: [
      { id: 'krishna', position: 'center', emotion: 'calm', scale: 1.05 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.1, panX: 0, panY: -2, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The heavy maces crash as the final feud of Kurukshetra reaches its climax.',
      },
    ],
    ambience: ['wind', 'distant_fires'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  krishna_4a_intro: {
    id: 'krishna_4a_intro',
    location: 'The Field of the Dead · Stri Parva',
    backdrop: 'aftermath_sunset',
    characters: [
      { id: 'krishna', position: 'center', emotion: 'calm', scale: 1.05 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.12, panX: 0, panY: -2, duration: 7000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Queen Gandhari confronts the Counselor with the sorrow of a mother who lost one hundred sons.',
      },
    ],
    ambience: ['wind_soft', 'silence'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  krishna_ending: {
    id: 'krishna_ending',
    location: 'The Cosmic Sphere of Yogeshwara',
    backdrop: 'counsel_night',
    characters: [
      { id: 'krishna', position: 'center', emotion: 'calm', scale: 1.05 },
    ],
    camera: { startZoom: 1.05, endZoom: 0.95, panX: 0, panY: 2, duration: 12000 },
    dialogue: [],
    ambience: ['wind_soft'],
    sfx: [],
    transition: { in: 'fade', out: 'fade', duration: 1200 },
  },

  // ============================================
  // YUDHISHTHIRA CHAPTER SCENES
  // ============================================

  yud_opening_1: {
    id: 'yud_opening_1',
    location: 'Dwaita Forest · The Enchanted Pool',
    backdrop: 'counsel_night',
    characters: [
      { id: 'yudhishthira', position: 'center', emotion: 'anguished', scale: 1.05 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.1, panX: 0, panY: -2, duration: 8000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Deep in the wilderness, King Yudhishthira finds his four mighty brothers lying lifeless on the banks of a crystal pool.',
      },
      {
        speaker: 'Yudhishthira', characterId: 'yudhishthira', emotion: 'anguished',
        text: '"Bhima! Arjuna! Who could fell the unvanquished heroes of the world?"',
      },
    ],
    ambience: ['night_insects', 'wind_soft'],
    sfx: [{ trigger: 'enter', sound: 'drum' }],
    transition: { in: 'fade', out: 'crossfade', duration: 1000 },
  },

  yud_opening_2: {
    id: 'yud_opening_2',
    location: 'The Waters of the Yaksha',
    backdrop: 'counsel_night',
    characters: [
      { id: 'yudhishthira', position: 'center', emotion: 'solemn', scale: 1.1 },
    ],
    camera: { startZoom: 1.05, endZoom: 1.15, panX: 0, panY: -3, duration: 8000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'A crane-like voice booms from the sky: "I am the lord of this water. Answer my questions or perish."',
      },
      {
        speaker: 'Yudhishthira', characterId: 'yudhishthira', emotion: 'calm',
        text: '"Ask, O Lord of the lake. I shall answer with all the truth in my heart."',
      },
    ],
    ambience: ['night_insects'],
    sfx: [{ trigger: 'enter', sound: 'counsel' }],
    transition: { in: 'crossfade', out: 'crossfade', duration: 800 },
  },

  yud_opening_3: {
    id: 'yud_opening_3',
    location: 'The Test of Justice',
    backdrop: 'counsel_night',
    characters: [
      { id: 'yudhishthira', position: 'center', emotion: 'calm', scale: 1.1 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.15, panX: 0, panY: -2, duration: 7000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Through every riddle of life and death, the King of Dharma proves that justice is higher than survival.',
      },
    ],
    ambience: ['wind_soft'],
    sfx: [{ trigger: 'enter', sound: 'conch' }],
    transition: { in: 'crossfade', out: 'fade', duration: 900 },
  },

  yud_1_intro: {
    id: 'yud_1_intro',
    location: 'The Enchanted Pool',
    backdrop: 'counsel_night',
    characters: [
      { id: 'yudhishthira', position: 'center', emotion: 'calm', scale: 1.05 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.06, panX: 0, panY: -2, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The Yaksha grants life to only one brother. Yudhishthira must choose.',
      },
    ],
    ambience: ['night_insects', 'wind_soft'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  yud_2a_intro: {
    id: 'yud_2a_intro',
    location: 'Kurukshetra · 15th Day',
    backdrop: 'battlefield_dawn',
    characters: [
      { id: 'yudhishthira', position: 'center-left', emotion: 'solemn', scale: 1.05 },
      { id: 'krishna', position: 'right', emotion: 'calm', scale: 0.95 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.1, panX: 0, panY: -2, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Drona demands the truth of his son\'s death from the king who has never spoken a lie.',
      },
    ],
    ambience: ['wind', 'distant_army'],
    sfx: [{ trigger: 'enter', sound: 'drum' }],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  yud_2b_intro: {
    id: 'yud_2b_intro',
    location: 'Court of Virata · Year of Disguise',
    backdrop: 'hastinapura_court',
    characters: [
      { id: 'yudhishthira', position: 'center', emotion: 'calm', scale: 1.05 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.06, panX: 0, panY: -2, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Draupadi is insulted in open court. Yudhishthira must balance immediate anger with the solemn vow of exile.',
      },
    ],
    ambience: ['crowd_murmur'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  yud_3a_intro: {
    id: 'yud_3a_intro',
    location: 'Kurukshetra · The Sinking Chariot',
    backdrop: 'battlefield_aftermath',
    characters: [
      { id: 'yudhishthira', position: 'center', emotion: 'solemn', scale: 1.05 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.1, panX: 0, panY: -3, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The king\'s chariot descends to the earth, touching the dust of mortal imperfection.',
      },
    ],
    ambience: ['wind', 'distant_fires'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  yud_4a_intro: {
    id: 'yud_4a_intro',
    location: 'Summit of Mount Meru',
    backdrop: 'battlefield_dawn_wide',
    characters: [
      { id: 'yudhishthira', position: 'center', emotion: 'calm', scale: 1.05 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.12, panX: 0, panY: -2, duration: 7000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Indra offers heaven on condition of abandoning a faithful companion.',
      },
    ],
    ambience: ['wind_soft'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  yud_ending: {
    id: 'yud_ending',
    location: 'The Gates of Swarga',
    backdrop: 'battlefield_dawn_wide',
    characters: [
      { id: 'yudhishthira', position: 'center', emotion: 'calm', scale: 1.05 },
    ],
    camera: { startZoom: 1.05, endZoom: 0.95, panX: 0, panY: 2, duration: 12000 },
    dialogue: [],
    ambience: ['wind_soft'],
    sfx: [],
    transition: { in: 'fade', out: 'fade', duration: 1200 },
  },

  // ============================================
  // ABHIMANYU CHAPTER SCENES
  // ============================================

  abhi_opening_1: {
    id: 'abhi_opening_1',
    location: 'Kurukshetra · 13th Dawn',
    backdrop: 'battlefield_dawn_wide',
    characters: [
      { id: 'abhimanyu', position: 'center', emotion: 'resolute', scale: 1.1 },
      { id: 'yudhishthira', position: 'right', emotion: 'solemn', scale: 0.9 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.12, panX: 0, panY: -2, duration: 9000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Drona arrays the impregnable Chakravyuha wheel. Arjuna has been drawn miles away.',
      },
      {
        speaker: 'Yudhishthira', characterId: 'yudhishthira', emotion: 'solemn',
        text: '"Abhimanyu, you alone know the secret of the wheel. Save our army from annihilation."',
      },
    ],
    ambience: ['wind', 'distant_army', 'horses'],
    sfx: [{ trigger: 'enter', sound: 'drum' }],
    transition: { in: 'fade', out: 'crossfade', duration: 1000 },
  },

  abhi_opening_2: {
    id: 'abhi_opening_2',
    location: 'Before the Spinning Labyrinth',
    backdrop: 'between_armies_close',
    characters: [
      { id: 'abhimanyu', position: 'center', emotion: 'valiant', scale: 1.15 },
    ],
    camera: { startZoom: 1.05, endZoom: 1.18, panX: 4, panY: -2, duration: 8000 },
    dialogue: [
      {
        speaker: 'Abhimanyu', characterId: 'abhimanyu', emotion: 'valiant',
        text: '"I was taught how to enter the labyrinth in my mother\'s womb."',
      },
      {
        speaker: 'Abhimanyu', characterId: 'abhimanyu', emotion: 'resolute',
        text: '"How to exit? That was never taught. Today, courage alone must be my compass."',
      },
    ],
    ambience: ['wind', 'chariot_wheels'],
    sfx: [{ trigger: 'enter', sound: 'conch' }],
    transition: { in: 'crossfade', out: 'crossfade', duration: 800 },
  },

  abhi_opening_3: {
    id: 'abhi_opening_3',
    location: 'The Charge of the Young Lion',
    backdrop: 'between_armies',
    characters: [
      { id: 'abhimanyu', position: 'center', emotion: 'brave', scale: 1.2 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.2, panX: 0, panY: -4, duration: 8000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The sixteen-year-old prince plunges into the revolving formation like lightning through a dark cloud.',
      },
    ],
    ambience: ['distant_army', 'wind'],
    sfx: [{ trigger: 'enter', sound: 'drum' }],
    transition: { in: 'crossfade', out: 'fade', duration: 900 },
  },

  abhi_1_intro: {
    id: 'abhi_1_intro',
    location: 'Apex of the Chakravyuha',
    backdrop: 'between_armies_close',
    characters: [
      { id: 'abhimanyu', position: 'center', emotion: 'valiant', scale: 1.1 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.08, panX: 0, panY: -2, duration: 6000 },
    dialogue: [
      {
        speaker: 'Abhimanyu', characterId: 'abhimanyu', emotion: 'valiant',
        text: '"Sumitra, urge the horses straight at the gate! Today Aryavarta sees the power of Arjuna\'s blood!"',
      },
    ],
    ambience: ['wind', 'chariot_wheels'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  abhi_2a_intro: {
    id: 'abhi_2a_intro',
    location: '5th Tier · The Sealed Gateway',
    backdrop: 'battlefield_dawn',
    characters: [
      { id: 'abhimanyu', position: 'center', emotion: 'defiant', scale: 1.15 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.12, panX: 0, panY: -2, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'Jayadratha seals the breach. Six veteran Maharathis encircle the lone prince.',
      },
    ],
    ambience: ['distant_army', 'wind'],
    sfx: [{ trigger: 'enter', sound: 'drum' }],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  abhi_2b_intro: {
    id: 'abhi_2b_intro',
    location: '7th Circle · The Broken Bow',
    backdrop: 'battlefield_dusk',
    characters: [
      { id: 'abhimanyu', position: 'center', emotion: 'brave', scale: 1.15 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.1, panX: 0, panY: -2, duration: 6000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'His bow severed from behind, Abhimanyu stands dismounted upon the bloody earth.',
      },
    ],
    ambience: ['distant_fires', 'wind'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  abhi_3a_intro: {
    id: 'abhi_3a_intro',
    location: 'Heart of the Labyrinth · The Chariot Wheel',
    backdrop: 'battlefield_aftermath',
    characters: [
      { id: 'abhimanyu', position: 'center', emotion: 'resolute', scale: 1.2 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.15, panX: 0, panY: -3, duration: 7000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'With a heavy wooden chariot wheel as his weapon, the young lion holds the armies of an empire at bay.',
      },
    ],
    ambience: ['wind', 'silence'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  abhi_4a_intro: {
    id: 'abhi_4a_intro',
    location: 'Sunset of the 13th Day',
    backdrop: 'aftermath_sunset',
    characters: [
      { id: 'abhimanyu', position: 'center', emotion: 'calm', scale: 1.1 },
    ],
    camera: { startZoom: 1.0, endZoom: 1.1, panX: 0, panY: -2, duration: 7000 },
    dialogue: [
      {
        speaker: 'Narrator', characterId: null, emotion: null,
        text: 'The sun sinks as the celestial devas shower blossoms on the hero whose name outshines death.',
      },
    ],
    ambience: ['wind_soft'],
    sfx: [],
    transition: { in: 'fade', out: 'crossfade', duration: 700 },
  },

  abhi_ending: {
    id: 'abhi_ending',
    location: 'The Celestial Hall of Varchas',
    backdrop: 'aftermath_sunset',
    characters: [
      { id: 'abhimanyu', position: 'center', emotion: 'calm', scale: 1.05 },
    ],
    camera: { startZoom: 1.05, endZoom: 0.95, panX: 0, panY: 2, duration: 12000 },
    dialogue: [],
    ambience: ['wind_soft'],
    sfx: [],
    transition: { in: 'fade', out: 'fade', duration: 1200 },
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

export const KARNA_OPENING_SEQUENCE = [
  'karna_opening_1',
  'karna_opening_2',
  'karna_opening_3',
]

export const KRISHNA_OPENING_SEQUENCE = [
  'krishna_opening_1',
  'krishna_opening_2',
  'krishna_opening_3',
]

export const YUDHISHTHIRA_OPENING_SEQUENCE = [
  'yud_opening_1',
  'yud_opening_2',
  'yud_opening_3',
]

export const ABHIMANYU_OPENING_SEQUENCE = [
  'abhi_opening_1',
  'abhi_opening_2',
  'abhi_opening_3',
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
