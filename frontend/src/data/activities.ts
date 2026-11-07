
export const ALPHABET_ACTIVITY_ID = 1000
export const ALPHABET_ACTIVITY_XP = 20

export const NUMBERS_ACTIVITY_ID = 1001
export const NUMBERS_ACTIVITY_XP = 20

export const COLORS_ACTIVITY_ID = 1002
export const COLORS_ACTIVITY_XP = 20

export const CALENDAR_ACTIVITY_ID = 1003
export const CALENDAR_ACTIVITY_XP = 30

export const FAMILY_ACTIVITY_ID = 1004
export const FAMILY_ACTIVITY_XP = 30

export const LISTENING_ACTIVITY_ID = 1005
export const LISTENING_ACTIVITY_XP = 30

export const SPEAKING_ACTIVITY_ID = 1006
export const SPEAKING_ACTIVITY_XP = 30

export const WRITING_ACTIVITY_ID = 1007
export const WRITING_ACTIVITY_XP = 30

export const READING_ACTIVITY_ID = 1008
export const READING_ACTIVITY_XP = 30


export const REVIEW_ACTIVITY_ID = 1009
export const REVIEW_ACTIVITY_XP = 15

export type ExtraActivity = {
  id: number
  title: string
  path: string
  level: 'A0'
  xp: number
  icon: string
}

export const extraActivities: ExtraActivity[] = [
  {
    id: ALPHABET_ACTIVITY_ID,
    title: 'Alphabet anglais',
    path: '/alphabet',
    level: 'A0',
    xp: ALPHABET_ACTIVITY_XP,
    icon: '🔤',
  },
  {
    id: NUMBERS_ACTIVITY_ID,
    title: 'Nombres anglais',
    path: '/numbers',
    level: 'A0',
    xp: NUMBERS_ACTIVITY_XP,
    icon: '🔢',
  },
  {
    id: COLORS_ACTIVITY_ID,
    title: 'Couleurs anglaises',
    path: '/colors',
    level: 'A0',
    xp: COLORS_ACTIVITY_XP,
    icon: '🎨',
  },
  {
    id: CALENDAR_ACTIVITY_ID,
    title: 'Jours et mois',
    path: '/calendar',
    level: 'A0',
    xp: CALENDAR_ACTIVITY_XP,
    icon: '📅',
  },
  {
    id: FAMILY_ACTIVITY_ID,
    title: 'La famille',
    path: '/family',
    level: 'A0',
    xp: FAMILY_ACTIVITY_XP,
    icon: '👨‍👩‍👧‍👦',
  },
  {
    id: LISTENING_ACTIVITY_ID,
    title: 'Listening — Compréhension orale',
    path: '/listening',
    level: 'A0',
    xp: LISTENING_ACTIVITY_XP,
    icon: '🎧',
  },
  {
  id: SPEAKING_ACTIVITY_ID,
  title: 'Speaking — Expression orale',
  path: '/speaking',
  level: 'A0',
  xp: SPEAKING_ACTIVITY_XP,
  icon: '🎤',
  },
  {
  id: WRITING_ACTIVITY_ID,
  title: 'Writing — Expression écrite',
  path: '/writing',
  level: 'A0',
  xp: WRITING_ACTIVITY_XP,
  icon: '✍️',
  },
  {
  id: READING_ACTIVITY_ID,
  title: 'Reading — Compréhension écrite',
  path: '/reading',
  level: 'A0',
  xp: READING_ACTIVITY_XP,
  icon: '📖',
  },
  {
    id: REVIEW_ACTIVITY_ID,
    title: 'Révisions intelligentes',
    path: '/reviews',
    level: 'A0',
    xp: REVIEW_ACTIVITY_XP,
    icon: '🧠',
   },


]
