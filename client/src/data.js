// Dharma Decision — shared data + metadata
// Scenario content lives in backend/data/*.json (single source of truth shared
// with the Flask API) and is bundled into the client at build time.

import chaptersData from '../../backend/data/chapters.json'
import modernData from '../../backend/data/modern.json'

export const CHAPTERS = chaptersData.chapters
export const PLAYABLE_CHAPTERS = CHAPTERS.filter((c) => c.status === 'playable')
export const MODERN = modernData.scenarios

export const ATTRS = [
  {
    key: 'fairness',
    label: 'Fairness',
    icon: 'scale',
    color: '#d3a94f',
    blurb: 'Impartiality — giving every stakeholder their due.',
  },
  {
    key: 'compassion',
    label: 'Compassion',
    icon: 'lotus',
    color: '#d08663',
    blurb: 'Care for everyone your decision touches, especially the voiceless.',
  },
  {
    key: 'responsibility',
    label: 'Responsibility',
    icon: 'shield',
    color: '#7d9bd6',
    blurb: 'Owning your role, its burden, and its bill.',
  },
  {
    key: 'integrity',
    label: 'Integrity',
    icon: 'flame',
    color: '#cdb47e',
    blurb: 'Keeping your actions aligned with truth and conscience.',
  },
  {
    key: 'strategy',
    label: 'Strategy',
    icon: 'bow',
    color: '#a08cd0',
    blurb: 'Skillful means — effectiveness under constraint.',
  },
  {
    key: 'awareness',
    label: 'Consequence Awareness',
    icon: 'eye',
    color: '#6fbfae',
    blurb: 'Seeing the second and third ripple of every act.',
  },
]

export const ATTR_MAP = Object.fromEntries(ATTRS.map((a) => [a.key, a]))

export const ACHIEVEMENTS = [
  {
    id: 'first_decision',
    title: 'First Steps',
    icon: 'compass',
    desc: 'Make your first real decision.',
    check: (s) => s.history.length >= 1,
  },
  {
    id: 'balanced_mind',
    title: 'Balanced Mind',
    icon: 'scale',
    desc: 'Hold all six attributes at 60 or above at the same time.',
    check: (s) => ATTRS.every((a) => (s.attributes[a.key] ?? 0) >= 60),
  },
  {
    id: 'strategic_thinker',
    title: 'Strategic Thinker',
    icon: 'bow',
    desc: 'Raise Strategy to 80 or higher.',
    check: (s) => s.attributes.strategy >= 80,
  },
  {
    id: 'compassionate_leader',
    title: 'Compassionate Leader',
    icon: 'lotus',
    desc: 'Raise Compassion to 85 or higher.',
    check: (s) => s.attributes.compassion >= 85,
  },
  {
    id: 'duty_bound',
    title: 'Duty Bound',
    icon: 'scroll',
    desc: "Complete Arjuna's chapter.",
    check: (s) => s.chapters?.arjuna?.status === 'completed',
  },
  {
    id: 'dharma_seeker',
    title: 'Dharma Seeker',
    icon: 'star',
    desc: 'Complete 10 different scenarios across any mode.',
    check: (s) => new Set(s.history.map((h) => h.scenarioId)).size >= 10,
  },
]

export const CHARACTERS = {
  arjuna: {
    id: 'arjuna',
    name: 'Arjuna',
    title: 'The Warrior of Gandiva',
    epithet: 'Savyasachi · Partha · Dhananjaya',
    role: 'Hero of the Pandavas',
    bio: 'A warrior caught between duty, affection and consequence.',
    color: '#d3a94f',
    sigil: 'bow',
    avatarHue: 'amber',
  },
  krishna: {
    id: 'krishna',
    name: 'Krishna',
    title: 'The Divine Charioteer',
    epithet: 'Vasudeva · Keshava · Yogeshwara',
    role: 'Guide & Counselor',
    bio: 'The eternal counselor who stands unarmed between two worlds.',
    color: '#6fbfae',
    sigil: 'lotus',
    avatarHue: 'cyan',
  },
  bhishma: {
    id: 'bhishma',
    name: 'Bhishma',
    title: 'Grandfather of Kurukshetra',
    epithet: 'Devavrata · The Great Vow',
    role: 'Supreme Commander of the Kauravas',
    bio: 'Bound by an unbreakable vow to an unraveling throne.',
    color: '#cdb47e',
    sigil: 'shield',
    avatarHue: 'gold',
  },
  drona: {
    id: 'drona',
    name: 'Drona',
    title: 'The Master of Arms',
    epithet: 'Acharya · Teacher of Princes',
    role: 'General of the Royal Army',
    bio: 'Gratitude and debt chained his bow to Hastinapura.',
    color: '#a08cd0',
    sigil: 'flame',
    avatarHue: 'purple',
  },
  yudhishthira: {
    id: 'yudhishthira',
    name: 'Yudhishthira',
    title: 'The King of Dharma',
    epithet: 'Dharmaraja · Ajatashatru',
    role: 'Eldest of the Pandavas',
    bio: 'Whose devotion to truth must now endure the furnace of war.',
    color: '#7d9bd6',
    sigil: 'scale',
    avatarHue: 'blue',
  },
  karna: {
    id: 'karna',
    name: 'Karna',
    title: 'The Son of Surya',
    epithet: 'Radheya · Angaraja',
    role: 'Greatest Rival of Arjuna',
    bio: 'Unshakable loyalty to the hand that gave him honor.',
    color: '#d08663',
    sigil: 'crown',
    avatarHue: 'orange',
  },
  draupadi: {
    id: 'draupadi',
    name: 'Draupadi',
    title: 'Born of Sacred Fire',
    epithet: 'Yajnaseni · Panchali',
    role: 'Empress of the Pandavas',
    bio: 'Whose unanswered cry echoes across every arrow loosed on this field.',
    color: '#d07a5a',
    sigil: 'spark',
    avatarHue: 'crimson',
  },
  abhimanyu: {
    id: 'abhimanyu',
    name: 'Abhimanyu',
    title: "The Lion's Son",
    epithet: 'Heir of the Gandiva',
    role: 'Young Prodigy of the Pandavas',
    bio: 'He who knew how to enter the labyrinth, but not how to return.',
    color: '#857e69',
    sigil: 'compass',
    avatarHue: 'silver',
  },
}

export const INITIAL_RELATIONSHIPS = {
  krishna: 75,
  bhishma: 65,
  drona: 60,
  yudhishthira: 70,
  karna: 45,
  draupadi: 65,
}

export const JOURNEY_WAYPOINTS = [
  {
    id: 'hastinapura',
    title: 'Hastinapura',
    subtitle: 'The Imperial Throne of the Kurus',
    summary: 'The ancient capital where treaties crumbled and royal oaths were tested.',
    status: 'past',
    icon: 'crown',
  },
  {
    id: 'indraprastha',
    title: 'Indraprastha',
    subtitle: 'The Jewel of Khandavaprastha',
    summary: 'The wonder city carved from wilderness, won and lost in a single day.',
    status: 'past',
    icon: 'briefcase',
  },
  {
    id: 'dice_hall',
    title: 'The Dice Hall',
    subtitle: 'The Unraveling of Royal Honor',
    summary: 'Where silence in the face of outrage made war inevitable.',
    status: 'past',
    icon: 'spark',
  },
  {
    id: 'exile',
    title: 'The Twelve-Year Exile',
    subtitle: 'Wilderness & Disguise',
    summary: 'Years of contemplation, austerity, and martial preparation in remote forests.',
    status: 'past',
    icon: 'flame',
  },
  {
    id: 'kurukshetra',
    title: 'Kurukshetra',
    subtitle: 'The Field of Clashing Hosts',
    summary: 'Day One: the armies stand arrayed. The dialogue of the Bhagavad Gita unfolds.',
    status: 'active',
    icon: 'bow',
  },
  {
    id: 'final_choice',
    title: 'The Final Choice',
    subtitle: 'The Measure of a Conscience',
    summary: 'How will history record the archer when the dust of eighteen days settles?',
    status: 'future',
    icon: 'scale',
  },
]

