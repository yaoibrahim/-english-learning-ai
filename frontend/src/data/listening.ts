
export type ListeningDifficulty = 'easy' | 'medium' | 'hard'

export type ListeningQuestion = {
  id: number
  difficulty: ListeningDifficulty
  english: string
  french: string
  options: string[]
}

export const listeningQuestions: ListeningQuestion[] = [
  {
    id: 1,
    difficulty: 'easy',
    english: 'Hello, how are you?',
    french: 'Bonjour, comment vas-tu ?',
    options: [
      'Bonjour, comment vas-tu ?',
      'Bonsoir, à demain.',
      'Quel âge as-tu ?',
      'Où habites-tu ?',
    ],
  },
  {
    id: 2,
    difficulty: 'easy',
    english: 'My name is Sarah.',
    french: 'Je m’appelle Sarah.',
    options: [
      'Je suis fatiguée.',
      'Je m’appelle Sarah.',
      'Sarah est ma sœur.',
      'Je suis à la maison.',
    ],
  },
  {
    id: 3,
    difficulty: 'easy',
    english: 'I have two brothers.',
    french: 'J’ai deux frères.',
    options: [
      'J’ai trois sœurs.',
      'Je suis avec mes amis.',
      'J’ai deux frères.',
      'Mes frères sont grands.',
    ],
  },
  {
    id: 4,
    difficulty: 'easy',
    english: 'The sky is blue.',
    french: 'Le ciel est bleu.',
    options: [
      'La mer est verte.',
      'Le ciel est bleu.',
      'Le soleil est jaune.',
      'La voiture est bleue.',
    ],
  },
  {
    id: 5,
    difficulty: 'easy',
    english: 'Today is Monday.',
    french: 'Aujourd’hui, c’est lundi.',
    options: [
      'Demain, c’est mardi.',
      'Hier, c’était dimanche.',
      'Aujourd’hui, c’est lundi.',
      'Nous sommes en janvier.',
    ],
  },
  {
    id: 6,
    difficulty: 'easy',
    english: 'I like apples.',
    french: 'J’aime les pommes.',
    options: [
      'Je mange du pain.',
      'Je déteste les fruits.',
      'J’aime les pommes.',
      'Je bois du lait.',
    ],
  },
  {
    id: 7,
    difficulty: 'easy',
    english: 'She is my mother.',
    french: 'C’est ma mère.',
    options: [
      'C’est ma sœur.',
      'C’est ma mère.',
      'C’est mon amie.',
      'C’est ma grand-mère.',
    ],
  },
  {
    id: 8,
    difficulty: 'easy',
    english: 'I am happy.',
    french: 'Je suis heureux.',
    options: [
      'Je suis triste.',
      'Je suis en retard.',
      'Je suis heureux.',
      'Je suis malade.',
    ],
  },
  {
    id: 9,
    difficulty: 'easy',
    english: 'The book is on the table.',
    french: 'Le livre est sur la table.',
    options: [
      'Le livre est sous la chaise.',
      'Le livre est sur la table.',
      'Le sac est sur le lit.',
      'Le cahier est dans le sac.',
    ],
  },
  {
    id: 10,
    difficulty: 'easy',
    english: 'Good night, see you tomorrow.',
    french: 'Bonne nuit, à demain.',
    options: [
      'Bonjour, à bientôt.',
      'Bonne nuit, à demain.',
      'Bonsoir, à lundi.',
      'Merci et au revoir.',
    ],
  },
  {
    id: 11,
    difficulty: 'medium',
    english: 'I usually wake up at seven o’clock.',
    french: 'Je me réveille généralement à sept heures.',
    options: [
      'Je me couche toujours à sept heures.',
      'Je me réveille généralement à sept heures.',
      'Je travaille jusqu’à sept heures.',
      'Je prends le bus à sept heures.',
    ],
  },
  {
    id: 12,
    difficulty: 'medium',
    english: 'She goes to work by train.',
    french: 'Elle va au travail en train.',
    options: [
      'Elle rentre du travail à pied.',
      'Elle va à l’école en voiture.',
      'Elle va au travail en train.',
      'Elle travaille dans un train.',
    ],
  },
  {
    id: 13,
    difficulty: 'medium',
    english: 'We are studying English together.',
    french: 'Nous étudions l’anglais ensemble.',
    options: [
      'Nous parlons français à la maison.',
      'Nous étudions l’anglais ensemble.',
      'Nous travaillons demain.',
      'Nous avons terminé notre cours.',
    ],
  },
  {
    id: 14,
    difficulty: 'medium',
    english: 'There is a supermarket near my house.',
    french: 'Il y a un supermarché près de chez moi.',
    options: [
      'Il y a un supermarché près de chez moi.',
      'Ma maison est derrière l’école.',
      'Le supermarché est fermé aujourd’hui.',
      'Je travaille dans un supermarché.',
    ],
  },
  {
    id: 15,
    difficulty: 'medium',
    english: 'I cannot find my keys.',
    french: 'Je ne trouve pas mes clés.',
    options: [
      'Je dois fermer la porte.',
      'J’ai oublié mon téléphone.',
      'Je ne trouve pas mes clés.',
      'Je cherche mon portefeuille.',
    ],
  },
  {
    id: 16,
    difficulty: 'medium',
    english: 'They are playing football in the park.',
    french: 'Ils jouent au football dans le parc.',
    options: [
      'Ils regardent un match à la télévision.',
      'Ils jouent au football dans le parc.',
      'Ils courent près du stade.',
      'Ils vont au parc demain.',
    ],
  },
  {
    id: 17,
    difficulty: 'medium',
    english: 'Could you help me, please?',
    french: 'Pourriez-vous m’aider, s’il vous plaît ?',
    options: [
      'Pouvez-vous attendre dehors ?',
      'Pourriez-vous m’aider, s’il vous plaît ?',
      'Voulez-vous venir demain ?',
      'Puis-je vous appeler ?',
    ],
  },
  {
    id: 18,
    difficulty: 'medium',
    english: 'My sister is younger than me.',
    french: 'Ma sœur est plus jeune que moi.',
    options: [
      'Ma sœur est plus grande que moi.',
      'Ma sœur est plus jeune que moi.',
      'Ma sœur travaille avec moi.',
      'Ma sœur habite loin de moi.',
    ],
  },
  {
    id: 19,
    difficulty: 'medium',
    english: 'We visited our grandparents last weekend.',
    french: 'Nous avons rendu visite à nos grands-parents le week-end dernier.',
    options: [
      'Nous visiterons nos grands-parents demain.',
      'Nous avons rendu visite à nos grands-parents le week-end dernier.',
      'Nous avons téléphoné à nos parents hier.',
      'Nous avons passé le week-end à la maison.',
    ],
  },
  {
    id: 20,
    difficulty: 'medium',
    english: 'The meeting starts in ten minutes.',
    french: 'La réunion commence dans dix minutes.',
    options: [
      'La réunion a duré dix minutes.',
      'La réunion commence dans dix minutes.',
      'La réunion s’est terminée à dix heures.',
      'La réunion est reportée à demain.',
    ],
  },
  {
    id: 21,
    difficulty: 'hard',
    english: 'If I had more free time, I would learn another language.',
    french: 'Si j’avais plus de temps libre, j’apprendrais une autre langue.',
    options: [
      'Si j’avais plus de temps libre, j’apprendrais une autre langue.',
      'Quand j’aurai du temps libre, j’enseignerai une langue.',
      'J’ai appris une langue pendant mes vacances.',
      'Je dois apprendre une langue pour mon travail.',
    ],
  },
  {
    id: 22,
    difficulty: 'hard',
    english: 'Although it was raining, we decided to go for a walk.',
    french: 'Même s’il pleuvait, nous avons décidé d’aller nous promener.',
    options: [
      'Nous sommes rentrés parce qu’il pleuvait.',
      'Même s’il pleuvait, nous avons décidé d’aller nous promener.',
      'Nous attendrons la fin de la pluie.',
      'Nous avons annulé notre promenade.',
    ],
  },
  {
    id: 23,
    difficulty: 'hard',
    english: 'She has been working on this project since January.',
    french: 'Elle travaille sur ce projet depuis janvier.',
    options: [
      'Elle a terminé ce projet en janvier.',
      'Elle commencera ce projet en janvier.',
      'Elle travaille sur ce projet depuis janvier.',
      'Elle a quitté ce projet le mois dernier.',
    ],
  },
  {
    id: 24,
    difficulty: 'hard',
    english: 'By the time we arrived, the movie had already started.',
    french: 'Quand nous sommes arrivés, le film avait déjà commencé.',
    options: [
      'Le film a commencé après notre arrivée.',
      'Quand nous sommes arrivés, le film avait déjà commencé.',
      'Nous sommes arrivés avant l’ouverture du cinéma.',
      'Nous avons raté la fin du film.',
    ],
  },
  {
    id: 25,
    difficulty: 'hard',
    english: 'You should have told me about the problem earlier.',
    french: 'Tu aurais dû me parler du problème plus tôt.',
    options: [
      'Tu dois résoudre ce problème demain.',
      'Tu aurais dû me parler du problème plus tôt.',
      'Tu m’as expliqué le problème à temps.',
      'Tu devrais oublier ce problème.',
    ],
  },
  {
    id: 26,
    difficulty: 'hard',
    english: 'Despite being tired, he managed to finish his work.',
    french: 'Malgré sa fatigue, il a réussi à terminer son travail.',
    options: [
      'Il a abandonné son travail parce qu’il était fatigué.',
      'Malgré sa fatigue, il a réussi à terminer son travail.',
      'Il terminera son travail après s’être reposé.',
      'Il a demandé à quelqu’un de terminer son travail.',
    ],
  },
  {
    id: 27,
    difficulty: 'hard',
    english: 'I wish I had paid more attention during the lesson.',
    french: 'J’aurais aimé être plus attentif pendant le cours.',
    options: [
      'Je suis toujours attentif pendant les cours.',
      'J’aurais aimé être plus attentif pendant le cours.',
      'Je souhaite assister au prochain cours.',
      'Je préfère étudier seul.',
    ],
  },
  {
    id: 28,
    difficulty: 'hard',
    english: 'The report must be submitted before the end of the week.',
    french: 'Le rapport doit être remis avant la fin de la semaine.',
    options: [
      'Le rapport sera rédigé la semaine prochaine.',
      'Le rapport doit être remis avant la fin de la semaine.',
      'Le rapport a été envoyé hier.',
      'Le rapport doit être corrigé chaque semaine.',
    ],
  },
  {
    id: 29,
    difficulty: 'hard',
    english: 'Neither of the two solutions seems particularly effective.',
    french: 'Aucune des deux solutions ne semble particulièrement efficace.',
    options: [
      'Les deux solutions sont aussi efficaces.',
      'Aucune des deux solutions ne semble particulièrement efficace.',
      'La première solution est meilleure que la seconde.',
      'Nous avons trouvé une solution efficace.',
    ],
  },
  {
    id: 30,
    difficulty: 'hard',
    english: 'Unless you practice regularly, it will be difficult to improve.',
    french: 'À moins de pratiquer régulièrement, il sera difficile de progresser.',
    options: [
      'Tu progresseras même sans pratiquer.',
      'Il est impossible d’apprendre une langue.',
      'À moins de pratiquer régulièrement, il sera difficile de progresser.',
      'Il faut arrêter de pratiquer pour mieux apprendre.',
    ],
  },
]

export const listeningDifficulties = [
  { id: 'easy', label: 'Facile', description: 'Phrases courtes — A0/A1' },
  { id: 'medium', label: 'Moyen', description: 'Vie quotidienne — A2/B1' },
  { id: 'hard', label: 'Difficile', description: 'Phrases complexes — B2+' },
] as const
