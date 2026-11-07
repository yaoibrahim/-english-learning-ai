export type ReadingDifficulty = 'easy' | 'medium' | 'hard'

export type ReadingQuestion = {
  id: number
  question: string
  options: [string, string, string, string]
  correctIndex: 0 | 1 | 2 | 3
  explanation: string
}

export type ReadingPassage = {
  id: number
  difficulty: ReadingDifficulty
  level: string
  title: string
  text: string
  vocabulary: { english: string; french: string }[]
  questions: ReadingQuestion[]
}

export const readingDifficulties: {
  id: ReadingDifficulty
  label: string
  description: string
}[] = [
  { id: 'easy', label: 'Facile', description: 'Textes courts — A0/A1' },
  { id: 'medium', label: 'Moyen', description: 'Vie quotidienne — A2/B1' },
  { id: 'hard', label: 'Difficile', description: 'Idées et nuances — B2+' },
]

export const readingPassages: ReadingPassage[] = [
  {
    id: 1,
    difficulty: 'easy',
    level: 'A0/A1',
    title: 'My morning',
    text: `My name is Tom. I am nineteen years old and I live in Paris.

Every morning, I wake up at seven o'clock. I eat bread and a banana for breakfast. I go to school by bus.

In the evening, I study English for thirty minutes.`,
    vocabulary: [
      { english: 'wake up', french: 'se réveiller' },
      { english: 'breakfast', french: 'petit-déjeuner' },
      { english: 'evening', french: 'soir' },
    ],
    questions: [
      { id: 1, question: 'Quel âge a Tom ?', options: ['16 ans', '19 ans', '20 ans', '21 ans'], correctIndex: 1, explanation: 'Tom dit : « I am nineteen years old. »' },
      { id: 2, question: 'Dans quelle ville habite-t-il ?', options: ['London', 'Lyon', 'Paris', 'Berlin'], correctIndex: 2, explanation: 'Le texte précise : « I live in Paris. »' },
      { id: 3, question: 'À quelle heure se réveille-t-il ?', options: ['6 h', '7 h', '8 h', '9 h'], correctIndex: 1, explanation: '« I wake up at seven o’clock » signifie qu’il se réveille à 7 h.' },
      { id: 4, question: 'Comment va-t-il à l’école ?', options: ['À pied', 'À vélo', 'En train', 'En bus'], correctIndex: 3, explanation: '« I go to school by bus » = je vais à l’école en bus.' },
      { id: 5, question: 'Combien de temps étudie-t-il l’anglais le soir ?', options: ['10 minutes', '15 minutes', '30 minutes', '1 heure'], correctIndex: 2, explanation: '« Thirty minutes » signifie 30 minutes.' },
    ],
  },
  {
    id: 2,
    difficulty: 'easy',
    level: 'A0/A1',
    title: 'Emma’s weekend',
    text: `Emma has a small dog called Max.

On Saturday, she goes to the park with Max. Her brother plays football while she reads a book.

On Sunday, Emma visits her grandmother. They make a chocolate cake together. Emma goes home at six in the evening.`,
    vocabulary: [
      { english: 'weekend', french: 'week-end' },
      { english: 'grandmother', french: 'grand-mère' },
      { english: 'together', french: 'ensemble' },
    ],
    questions: [
      { id: 6, question: 'Comment s’appelle le chien d’Emma ?', options: ['Tom', 'Max', 'Jack', 'Ben'], correctIndex: 1, explanation: '« A small dog called Max » : son chien s’appelle Max.' },
      { id: 7, question: 'Quel jour Emma va-t-elle au parc ?', options: ['Lundi', 'Vendredi', 'Samedi', 'Dimanche'], correctIndex: 2, explanation: '« On Saturday, she goes to the park » = le samedi.' },
      { id: 8, question: 'Que fait son frère au parc ?', options: ['Il lit', 'Il court', 'Il joue au football', 'Il dort'], correctIndex: 2, explanation: '« Her brother plays football » = son frère joue au football.' },
      { id: 9, question: 'Que prépare Emma avec sa grand-mère ?', options: ['Une salade', 'Une pizza', 'Une soupe', 'Un gâteau au chocolat'], correctIndex: 3, explanation: '« They make a chocolate cake together » = elles font un gâteau au chocolat.' },
      { id: 10, question: 'À quelle heure Emma rentre-t-elle ?', options: ['16 h', '17 h', '18 h', '20 h'], correctIndex: 2, explanation: '« At six in the evening » signifie 18 h.' },
    ],
  },
  {
    id: 3,
    difficulty: 'medium',
    level: 'A2/B1',
    title: 'A first day at work',
    text: `Chloé has started a new job in IT support in Lyon. She usually works from nine in the morning until five in the afternoon.

On her first Monday, her train was delayed by twenty minutes. She arrived at the office at 9:10. Her supervisor, Eva, welcomed her and explained how to use the ticketing system.

Later that day, Chloé helped an employee fix a printer problem. She also learned how the company creates daily backups. Although she felt nervous at first, she enjoyed her first day.`,
    vocabulary: [
      { english: 'delayed', french: 'en retard' },
      { english: 'supervisor', french: 'responsable / superviseur' },
      { english: 'backup', french: 'sauvegarde' },
    ],
    questions: [
      { id: 11, question: 'Dans quel domaine Chloé travaille-t-elle ?', options: ['La restauration', 'Le support informatique', 'La santé', 'Le commerce'], correctIndex: 1, explanation: '« A new job in IT support » désigne un poste de support informatique.' },
      { id: 12, question: 'Pourquoi est-elle arrivée en retard ?', options: ['Elle s’est réveillée tard', 'Elle a oublié l’adresse', 'Son train a été retardé', 'Elle a raté un bus'], correctIndex: 2, explanation: '« Her train was delayed by twenty minutes » indique un retard du train.' },
      { id: 13, question: 'À quelle heure Chloé est-elle arrivée ?', options: ['8 h 50', '9 h', '9 h 10', '9 h 20'], correctIndex: 2, explanation: 'Le texte indique précisément : « She arrived ... at 9:10. »' },
      { id: 14, question: 'Qui lui a expliqué le système de tickets ?', options: ['Eva', 'Tom', 'Le directeur commercial', 'Un client'], correctIndex: 0, explanation: 'Eva, sa responsable, lui explique le système de tickets.' },
      { id: 15, question: 'Quel problème a-t-elle aidé à résoudre ?', options: ['Un écran cassé', 'Une panne de réseau', 'Un problème d’imprimante', 'Un mot de passe oublié'], correctIndex: 2, explanation: '« Fix a printer problem » signifie résoudre un problème d’imprimante.' },
    ],
  },
  {
    id: 4,
    difficulty: 'medium',
    level: 'A2/B1',
    title: 'Small changes, better habits',
    text: `Daniel used to skip breakfast and drink sugary drinks during the day. He often felt tired after lunch.

Last month, he joined a walking group that meets three evenings a week. He also started preparing simple meals every Sunday so that he would have healthier lunches at work.

After four weeks, Daniel noticed that he had more energy in the afternoon. However, he still goes to bed too late, so improving his sleep is his next goal.`,
    vocabulary: [
      { english: 'used to', french: 'avait l’habitude de' },
      { english: 'healthier', french: 'plus sain' },
      { english: 'however', french: 'cependant' },
    ],
    questions: [
      { id: 16, question: 'Comment Daniel se sentait-il après le déjeuner ?', options: ['En colère', 'Fatigué', 'Très motivé', 'Malade'], correctIndex: 1, explanation: '« He often felt tired after lunch » = il était souvent fatigué.' },
      { id: 17, question: 'Combien de fois par semaine marche-t-il avec son groupe ?', options: ['Une fois', 'Deux fois', 'Trois fois', 'Tous les jours'], correctIndex: 2, explanation: 'Le groupe se réunit « three evenings a week ».' },
      { id: 18, question: 'Quand prépare-t-il ses repas ?', options: ['Le lundi', 'Le mercredi', 'Le vendredi', 'Le dimanche'], correctIndex: 3, explanation: '« Every Sunday » = chaque dimanche.' },
      { id: 19, question: 'Quel changement constate-t-il après quatre semaines ?', options: ['Il a plus d’énergie', 'Il court un marathon', 'Il dort toujours mieux', 'Il change de travail'], correctIndex: 0, explanation: 'Daniel remarque « more energy in the afternoon ».' },
      { id: 20, question: 'Quel objectif doit-il encore améliorer ?', options: ['Son alimentation', 'Son sommeil', 'Sa marche', 'Ses horaires de travail'], correctIndex: 1, explanation: 'Il se couche encore trop tard : le sommeil reste son objectif.' },
    ],
  },
  {
    id: 5,
    difficulty: 'hard',
    level: 'B2+',
    title: 'The hybrid work experiment',
    text: `A technology company introduced a six-month experiment in hybrid working. Employees spent three days at home and two days in the office each week.

In a survey, 72 percent of employees reported that they could focus more effectively on individual tasks at home. Nevertheless, managers observed two drawbacks: newcomers received less informal guidance, and teams had fewer spontaneous conversations that could lead to new ideas.

Instead of requiring everyone to return to the office five days a week, the company decided to schedule mentoring sessions and collaborative workshops on office days. Its leadership concluded that flexibility was valuable, but needed deliberate coordination.`,
    vocabulary: [
      { english: 'nevertheless', french: 'néanmoins / cependant' },
      { english: 'drawback', french: 'inconvénient' },
      { english: 'mentoring', french: 'accompagnement / mentorat' },
    ],
    questions: [
      { id: 21, question: 'Combien de temps a duré l’expérimentation ?', options: ['Un mois', 'Trois mois', 'Six mois', 'Un an'], correctIndex: 2, explanation: 'Le texte parle d’une « six-month experiment ».' },
      { id: 22, question: 'Combien de jours les salariés travaillaient-ils depuis chez eux ?', options: ['Un', 'Deux', 'Trois', 'Cinq'], correctIndex: 2, explanation: 'Ils travaillaient « three days at home » chaque semaine.' },
      { id: 23, question: 'Que signifie le résultat de 72 % ?', options: ['72 % souhaitaient démissionner', '72 % déclaraient mieux se concentrer chez eux sur les tâches individuelles', '72 % refusaient les réunions', '72 % préféraient travailler la nuit'], correctIndex: 1, explanation: 'Le chiffre concerne la concentration sur les tâches individuelles à domicile.' },
      { id: 24, question: 'Quel problème les responsables ont-ils observé ?', options: ['Les bureaux étaient trop chers', 'Les nouveaux arrivants étaient moins accompagnés informellement', 'Les ventes avaient doublé', 'Le matériel était inutilisable'], correctIndex: 1, explanation: '« Newcomers received less informal guidance » décrit un accompagnement informel insuffisant.' },
      { id: 25, question: 'Quelle décision l’entreprise a-t-elle prise ?', options: ['Supprimer tous les jours au bureau', 'Imposer cinq jours au bureau', 'Organiser du mentorat et des ateliers les jours au bureau', 'Abandonner le travail en équipe'], correctIndex: 2, explanation: 'Elle a privilégié des séances de mentorat et des ateliers collectifs sur site.' },
    ],
  },
  {
    id: 6,
    difficulty: 'hard',
    level: 'B2+',
    title: 'Rethinking city transport',
    text: `A city launched a one-year transport pilot designed to reduce car traffic in its centre. The plan introduced protected cycle lanes and free buses on weekends.

At the end of the first year, monitoring showed a modest decrease in air pollution. Some shop owners were concerned that restrictions on cars would make deliveries more difficult. However, the number of visits to shops had remained broadly stable.

The transport department warned that stable visits did not prove the pilot had no commercial effects, because seasonal and economic factors might also influence the figures. It therefore proposed extending the pilot for another year while testing designated delivery hours and collecting more detailed data.`,
    vocabulary: [
      { english: 'pilot', french: 'expérimentation' },
      { english: 'broadly stable', french: 'globalement stable' },
      { english: 'therefore', french: 'par conséquent' },
    ],
    questions: [
      { id: 26, question: 'Quel était l’objectif principal du projet ?', options: ['Construire un aéroport', 'Réduire la circulation automobile au centre-ville', 'Augmenter le nombre de parkings', 'Supprimer tous les commerces'], correctIndex: 1, explanation: 'Le projet visait à « reduce car traffic in its centre ».' },
      { id: 27, question: 'Quelle mesure a été mise en place ?', options: ['Métro gratuit tous les jours', 'Vélos interdits', 'Bus gratuits le week-end', 'Stationnement gratuit partout'], correctIndex: 2, explanation: 'Le dispositif comprenait des « free buses on weekends ».' },
      { id: 28, question: 'Qu’ont montré les mesures environnementales ?', options: ['Une forte hausse de la pollution', 'Une baisse modérée de la pollution', 'Aucun relevé disponible', 'Une suppression totale de la pollution'], correctIndex: 1, explanation: '« A modest decrease in air pollution » = une diminution modérée.' },
      { id: 29, question: 'Pourquoi les chiffres de fréquentation ne suffisent-ils pas à tirer une conclusion définitive ?', options: ['Ils ne couvrent que les touristes', 'Des facteurs saisonniers et économiques peuvent aussi les influencer', 'Ils ont été perdus', 'Les commerces étaient tous fermés'], correctIndex: 1, explanation: 'Le texte souligne le rôle possible de facteurs saisonniers et économiques.' },
      { id: 30, question: 'Quelle est la prochaine étape proposée ?', options: ['Arrêter immédiatement le projet', 'Interdire toute livraison', 'Prolonger un an, tester des horaires de livraison et mieux mesurer les effets', 'Remplacer les bus par des voitures'], correctIndex: 2, explanation: 'La ville propose une prolongation, des horaires de livraison et des données plus précises.' },
    ],
  },
]
