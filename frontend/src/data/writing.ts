
export type WritingDifficulty = 'easy' | 'medium' | 'hard'

export type WritingQuestion = {
  id: number
  difficulty: WritingDifficulty
  french: string
  english: string
  acceptedAnswers?: string[]
  hint: string
}

export const writingQuestions: WritingQuestion[] = [
  // FACILE — A0/A1
  { id: 1, difficulty: 'easy', french: 'Bonjour.', english: 'Hello.', hint: 'Une salutation simple.' },
  { id: 2, difficulty: 'easy', french: 'Je suis heureux.', english: 'I am happy.', acceptedAnswers: ["I'm happy."], hint: 'I + am + adjectif.' },
  { id: 3, difficulty: 'easy', french: 'J’aime les pommes.', english: 'I like apples.', hint: 'I + like + nom.' },
  { id: 4, difficulty: 'easy', french: 'Je m’appelle Sarah.', english: 'My name is Sarah.', acceptedAnswers: ["I'm Sarah.", "I am Sarah."], hint: 'My name is...' },
  { id: 5, difficulty: 'easy', french: 'Le ciel est bleu.', english: 'The sky is blue.', hint: 'The sky...' },
  { id: 6, difficulty: 'easy', french: 'J’ai deux frères.', english: 'I have two brothers.', hint: 'I have...' },
  { id: 7, difficulty: 'easy', french: 'Merci beaucoup.', english: 'Thank you very much.', acceptedAnswers: ['Thanks a lot.'], hint: 'Thank you...' },
  { id: 8, difficulty: 'easy', french: 'Elle est ma sœur.', english: 'She is my sister.', acceptedAnswers: ["She's my sister."], hint: 'She is...' },
  { id: 9, difficulty: 'easy', french: 'Nous sommes étudiants.', english: 'We are students.', acceptedAnswers: ["We're students."], hint: 'We are...' },
  { id: 10, difficulty: 'easy', french: 'À demain.', english: 'See you tomorrow.', hint: 'See you...' },

  // MOYEN — A2/B1
  { id: 11, difficulty: 'medium', french: 'Je travaille tous les jours.', english: 'I work every day.', hint: 'I work...' },
  { id: 12, difficulty: 'medium', french: 'Elle va à l’école en bus.', english: 'She goes to school by bus.', hint: 'She goes...' },
  { id: 13, difficulty: 'medium', french: 'Nous apprenons l’anglais ensemble.', english: 'We are learning English together.', acceptedAnswers: ['We learn English together.'], hint: 'We are learning...' },
  { id: 14, difficulty: 'medium', french: 'Je voudrais un verre d’eau.', english: 'I would like a glass of water.', acceptedAnswers: ["I'd like a glass of water."], hint: 'I would like...' },
  { id: 15, difficulty: 'medium', french: 'Il pleut aujourd’hui.', english: 'It is raining today.', acceptedAnswers: ["It's raining today."], hint: 'It is raining...' },
  { id: 16, difficulty: 'medium', french: 'J’ai oublié mes clés.', english: 'I forgot my keys.', acceptedAnswers: ["I've forgotten my keys.", 'I have forgotten my keys.'], hint: 'I forgot...' },
  { id: 17, difficulty: 'medium', french: 'Peux-tu m’aider ?', english: 'Can you help me?', hint: 'Can you...' },
  { id: 18, difficulty: 'medium', french: 'Ils jouent au football.', english: 'They are playing football.', acceptedAnswers: ['They play football.'], hint: 'They are playing...' },
  { id: 19, difficulty: 'medium', french: 'Ma sœur habite à Londres.', english: 'My sister lives in London.', hint: 'My sister lives...' },
  { id: 20, difficulty: 'medium', french: 'La réunion commence à neuf heures.', english: 'The meeting starts at nine.', acceptedAnswers: ['The meeting starts at nine o’clock.'], hint: 'The meeting starts...' },

  // DIFFICILE — B2+
  { id: 21, difficulty: 'hard', french: 'J’étudie l’anglais depuis trois ans.', english: 'I have been studying English for three years.', hint: 'Present perfect continuous.' },
  { id: 22, difficulty: 'hard', french: 'Si j’avais plus de temps, je voyagerais davantage.', english: 'If I had more time, I would travel more.', hint: 'If + past, would...' },
  { id: 23, difficulty: 'hard', french: 'Même s’il pleuvait, nous sommes sortis.', english: 'Although it was raining, we went out.', hint: 'Although...' },
  { id: 24, difficulty: 'hard', french: 'Elle a déjà terminé ses devoirs.', english: 'She has already finished her homework.', hint: 'Present perfect.' },
  { id: 25, difficulty: 'hard', french: 'J’aurais dû partir plus tôt.', english: 'I should have left earlier.', hint: 'Should have + participe passé.' },
  { id: 26, difficulty: 'hard', french: 'Le rapport doit être envoyé demain.', english: 'The report must be sent tomorrow.', hint: 'Voix passive : must be...' },
  { id: 27, difficulty: 'hard', french: 'J’aimerais parler anglais couramment.', english: 'I would like to speak English fluently.', acceptedAnswers: ["I'd like to speak English fluently."], hint: 'Would like to...' },
  { id: 28, difficulty: 'hard', french: 'Il a réussi à résoudre le problème.', english: 'He managed to solve the problem.', hint: 'Managed to...' },
  { id: 29, difficulty: 'hard', french: 'Apprendre une langue demande de la patience.', english: 'Learning a language requires patience.', hint: 'Learning a language...' },
  { id: 30, difficulty: 'hard', french: 'J’attends votre réponse avec impatience.', english: 'I look forward to hearing from you.', hint: 'I look forward to...' },
]

export const writingDifficulties = [
  { id: 'easy', label: 'Facile', description: 'Phrases simples — A0/A1' },
  { id: 'medium', label: 'Moyen', description: 'Vie quotidienne — A2/B1' },
  { id: 'hard', label: 'Difficile', description: 'Grammaire avancée — B2+' },
] as const
