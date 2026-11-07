
export type SpeakingDifficulty = 'easy' | 'medium' | 'hard'

export type SpeakingQuestion = {
  id: number
  difficulty: SpeakingDifficulty
  english: string
  french: string
}

export const speakingQuestions: SpeakingQuestion[] = [
  { id: 1, difficulty: 'easy', english: 'Hello', french: 'Bonjour' },
  { id: 2, difficulty: 'easy', english: 'Good morning', french: 'Bonjour (le matin)' },
  { id: 3, difficulty: 'easy', english: 'How are you?', french: 'Comment vas-tu ?' },
  { id: 4, difficulty: 'easy', english: 'My name is Sarah', french: 'Je m’appelle Sarah' },
  { id: 5, difficulty: 'easy', english: 'I am happy', french: 'Je suis heureux' },
  { id: 6, difficulty: 'easy', english: 'Thank you very much', french: 'Merci beaucoup' },
  { id: 7, difficulty: 'easy', english: 'I like English', french: 'J’aime l’anglais' },
  { id: 8, difficulty: 'easy', english: 'See you tomorrow', french: 'À demain' },
  { id: 9, difficulty: 'easy', english: 'I have two brothers', french: 'J’ai deux frères' },
  { id: 10, difficulty: 'easy', english: 'The sky is blue', french: 'Le ciel est bleu' },

  { id: 11, difficulty: 'medium', english: 'I wake up at seven every morning', french: 'Je me réveille à sept heures chaque matin' },
  { id: 12, difficulty: 'medium', english: 'She works in a big company', french: 'Elle travaille dans une grande entreprise' },
  { id: 13, difficulty: 'medium', english: 'We are learning English together', french: 'Nous apprenons l’anglais ensemble' },
  { id: 14, difficulty: 'medium', english: 'Could you help me please?', french: 'Pourriez-vous m’aider, s’il vous plaît ?' },
  { id: 15, difficulty: 'medium', english: 'I would like a glass of water', french: 'Je voudrais un verre d’eau' },
  { id: 16, difficulty: 'medium', english: 'My sister lives in London', french: 'Ma sœur habite à Londres' },
  { id: 17, difficulty: 'medium', english: 'I usually take the train to work', french: 'Je prends généralement le train pour aller au travail' },
  { id: 18, difficulty: 'medium', english: 'What are you doing this weekend?', french: 'Que fais-tu ce week-end ?' },
  { id: 19, difficulty: 'medium', english: 'I forgot my keys at home', french: 'J’ai oublié mes clés à la maison' },
  { id: 20, difficulty: 'medium', english: 'The meeting starts in ten minutes', french: 'La réunion commence dans dix minutes' },

  { id: 21, difficulty: 'hard', english: 'I have been studying English for several years', french: 'J’étudie l’anglais depuis plusieurs années' },
  { id: 22, difficulty: 'hard', english: 'Although it was raining, we went for a walk', french: 'Même s’il pleuvait, nous sommes allés nous promener' },
  { id: 23, difficulty: 'hard', english: 'If I had more time, I would travel more often', french: 'Si j’avais plus de temps, je voyagerais plus souvent' },
  { id: 24, difficulty: 'hard', english: 'She has already finished her homework', french: 'Elle a déjà terminé ses devoirs' },
  { id: 25, difficulty: 'hard', english: 'I wish I could speak English more fluently', french: 'J’aimerais pouvoir parler anglais plus couramment' },
  { id: 26, difficulty: 'hard', english: 'The project must be completed before Friday', french: 'Le projet doit être terminé avant vendredi' },
  { id: 27, difficulty: 'hard', english: 'We should have left earlier to avoid traffic', french: 'Nous aurions dû partir plus tôt pour éviter les embouteillages' },
  { id: 28, difficulty: 'hard', english: 'He managed to solve the problem on his own', french: 'Il a réussi à résoudre le problème tout seul' },
  { id: 29, difficulty: 'hard', english: 'Learning a new language requires regular practice', french: 'Apprendre une nouvelle langue demande une pratique régulière' },
  { id: 30, difficulty: 'hard', english: 'I am looking forward to hearing from you', french: 'J’attends votre réponse avec impatience' },
]

export const speakingDifficulties = [
  { id: 'easy', label: 'Facile', description: 'Mots et phrases courtes — A0/A1' },
  { id: 'medium', label: 'Moyen', description: 'Conversations quotidiennes — A2/B1' },
  { id: 'hard', label: 'Difficile', description: 'Phrases complexes — B2+' },
] as const
