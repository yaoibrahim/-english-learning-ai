
export type Question = {
  id: number
  lessonId: number
  word: string
  translation: string
  options: string[]
  example?: string
  exampleTranslation?: string
  explanation?: string
}

export const questions: Question[] = [
  {
    id: 1,
    lessonId: 1,
    word: 'Hello',
    translation: 'Bonjour',
    options: ['Bonsoir', 'Bonjour', 'Merci', 'Au revoir'],
    example: 'Hello, how are you?',
    exampleTranslation: 'Bonjour, comment vas-tu ?',
    explanation:
      'Hello est une salutation utilisée pour dire bonjour, à différents moments de la journée.',
  },
  {
    id: 2,
    lessonId: 1,
    word: 'Thank you',
    translation: 'Merci',
    options: ['Merci', 'Bonjour', 'Maison', 'Pardon'],
    example: 'Thank you for your help.',
    exampleTranslation: 'Merci pour ton aide.',
    explanation:
      'Thank you permet de remercier quelqu’un. On peut aussi dire Thanks dans un contexte informel.',
  },
  {
    id: 3,
    lessonId: 1,
    word: 'Goodbye',
    translation: 'Au revoir',
    options: ['Bonjour', 'Merci', 'Au revoir', 'Oui'],
    example: 'Goodbye, see you tomorrow!',
    exampleTranslation: 'Au revoir, à demain !',
    explanation:
      'Goodbye est utilisé lorsqu’on quitte quelqu’un. Bye est une version plus informelle.',
  },
  {
    id: 4,
    lessonId: 1,
    word: 'Please',
    translation: "S'il vous plaît",
    options: ['Non', 'Oui', "S'il vous plaît", 'Bonsoir'],
    example: 'Can you help me, please?',
    exampleTranslation: "Peux-tu m'aider, s'il te plaît ?",
    explanation:
      'Please permet de rendre une demande plus polie. On peut le placer au début ou à la fin de certaines demandes.',
  },
  {
    id: 5,
    lessonId: 1,
    word: 'Yes',
    translation: 'Oui',
    options: ['Non', 'Oui', 'Merci', 'Bonjour'],
    example: 'Yes, I understand.',
    exampleTranslation: 'Oui, je comprends.',
    explanation:
      'Yes sert à répondre positivement à une question. Son contraire est No.',
  },
  
{
  id: 6,
  lessonId: 2,
  word: 'I',
  translation: 'Je',
  options: ['Tu', 'Je', 'Il', 'Nous'],
  example: 'I am a student.',
  exampleTranslation: 'Je suis étudiant.',
  explanation:
    'I est le pronom personnel sujet qui signifie Je. En anglais, I s’écrit toujours avec une majuscule.',
},
{
  id: 7,
  lessonId: 2,
  word: 'You',
  translation: 'Tu / Vous',
  options: ['Nous', 'Ils', 'Tu / Vous', 'Elle'],
  example: 'You are my friend.',
  exampleTranslation: 'Tu es mon ami.',
  explanation:
    'You signifie Tu ou Vous. En anglais, le même pronom est utilisé pour le singulier et le pluriel.',
},
{
  id: 8,
  lessonId: 2,
  word: 'He',
  translation: 'Il',
  options: ['Elle', 'Je', 'Il', 'Ils'],
  example: 'He is happy.',
  exampleTranslation: 'Il est heureux.',
  explanation:
    'He est un pronom sujet utilisé pour parler d’une personne de genre masculin.',
},
{
  id: 9,
  lessonId: 2,
  word: 'She',
  translation: 'Elle',
  options: ['Elle', 'Nous', 'Tu', 'Ils'],
  example: 'She is a teacher.',
  exampleTranslation: 'Elle est enseignante.',
  explanation:
    'She est un pronom sujet utilisé pour parler d’une personne de genre féminin.',
},
{
  id: 10,
  lessonId: 2,
  word: 'We',
  translation: 'Nous',
  options: ['Vous', 'Nous', 'Ils', 'Je'],
  example: 'We are learning English.',
  exampleTranslation: 'Nous apprenons l’anglais.',
  explanation:
    'We signifie Nous. Il permet de parler d’un groupe qui inclut la personne qui s’exprime.',
},
{
  id: 11,
  lessonId: 2,
  word: 'They',
  translation: 'Ils / Elles',
  options: ['Je', 'Tu', 'Nous', 'Ils / Elles'],
  example: 'They are at school.',
  exampleTranslation: 'Ils sont à l’école.',
  explanation:
    'They signifie Ils ou Elles. Il s’utilise pour parler de plusieurs personnes ou choses.',
},

{
  id: 12,
  lessonId: 3,
  word: 'I am',
  translation: 'Je suis',
  options: ['Je suis', 'Tu es', 'Il est', 'Nous sommes'],
  example: 'I am a student.',
  exampleTranslation: 'Je suis étudiant.',
  explanation:
    'Avec le pronom I, le verbe TO BE se conjugue AM. On dit toujours I am.',
},
{
  id: 13,
  lessonId: 3,
  word: 'You are',
  translation: 'Tu es / Vous êtes',
  options: [
    'Je suis',
    'Il est',
    'Tu es / Vous êtes',
    'Ils sont',
  ],
  example: 'You are very kind.',
  exampleTranslation: 'Tu es très gentil.',
  explanation:
    'Avec YOU, le verbe TO BE devient ARE. Cela fonctionne au singulier et au pluriel.',
},
{
  id: 14,
  lessonId: 3,
  word: 'He is',
  translation: 'Il est',
  options: ['Elle est', 'Il est', 'Nous sommes', 'Je suis'],
  example: 'He is a doctor.',
  exampleTranslation: 'Il est médecin.',
  explanation:
    'Avec HE, SHE et IT, le verbe TO BE se conjugue IS.',
},
{
  id: 15,
  lessonId: 3,
  word: 'She is',
  translation: 'Elle est',
  options: ['Elle est', 'Tu es', 'Ils sont', 'Nous sommes'],
  example: 'She is at home.',
  exampleTranslation: 'Elle est à la maison.',
  explanation:
    'SHE IS signifie Elle est. On peut aussi utiliser la contraction SHE’S.',
},
{
  id: 16,
  lessonId: 3,
  word: 'We are',
  translation: 'Nous sommes',
  options: ['Ils sont', 'Nous sommes', 'Je suis', 'Il est'],
  example: 'We are ready.',
  exampleTranslation: 'Nous sommes prêts.',
  explanation:
    'Avec WE, on utilise ARE. La contraction de WE ARE est WE’RE.',
},
{
  id: 17,
  lessonId: 3,
  word: 'They are',
  translation: 'Ils / Elles sont',
  options: [
    'Vous êtes',
    'Je suis',
    'Ils / Elles sont',
    'Elle est',
  ],
  example: 'They are students.',
  exampleTranslation: 'Ils sont étudiants.',
  explanation:
    'Avec THEY, on utilise ARE. La contraction de THEY ARE est THEY’RE.',
},
{
  id: 18,
  lessonId: 3,
  word: 'I am not',
  translation: 'Je ne suis pas',
  options: [
    'Je ne suis pas',
    'Je suis',
    'Tu n’es pas',
    'Nous ne sommes pas',
  ],
  example: 'I am not tired.',
  exampleTranslation: 'Je ne suis pas fatigué.',
  explanation:
    'Pour construire une phrase négative avec TO BE, on ajoute NOT après AM, IS ou ARE.',
},
{
  id: 19,
  lessonId: 3,
  word: 'Are you ready?',
  translation: 'Es-tu prêt ?',
  options: [
    'Tu es prêt.',
    'Es-tu prêt ?',
    'Je suis prêt.',
    'Il est prêt.',
  ],
  example: 'Are you ready for the lesson?',
  exampleTranslation: 'Es-tu prêt pour la leçon ?',
  explanation:
    'Pour poser une question avec TO BE, on place AM, IS ou ARE avant le sujet.',
},

{
  id: 20,
  lessonId: 4,
  word: 'I have',
  translation: "J'ai",
  options: ["J'ai", 'Je suis', 'Tu as', 'Nous avons'],
  example: 'I have a computer.',
  exampleTranslation: "J'ai un ordinateur.",
  explanation:
    'Avec I, on utilise HAVE. Le verbe TO HAVE signifie avoir.',
},
{
  id: 21,
  lessonId: 4,
  word: 'You have',
  translation: 'Tu as / Vous avez',
  options: [
    'Ils ont',
    'Tu as / Vous avez',
    'Elle a',
    "J'ai",
  ],
  example: 'You have a book.',
  exampleTranslation: 'Tu as un livre.',
  explanation:
    'Avec YOU, on utilise HAVE au singulier comme au pluriel.',
},
{
  id: 22,
  lessonId: 4,
  word: 'He has',
  translation: 'Il a',
  options: ['Il est', 'Elle a', 'Il a', 'Nous avons'],
  example: 'He has a car.',
  exampleTranslation: 'Il a une voiture.',
  explanation:
    'Avec HE, SHE et IT, HAVE devient HAS à la forme affirmative.',
},
{
  id: 23,
  lessonId: 4,
  word: 'She has',
  translation: 'Elle a',
  options: ['Elle a', 'Tu as', 'Ils ont', 'Je suis'],
  example: 'She has a dog.',
  exampleTranslation: 'Elle a un chien.',
  explanation:
    'Avec SHE, on utilise HAS à la forme affirmative.',
},
{
  id: 24,
  lessonId: 4,
  word: 'We have',
  translation: 'Nous avons',
  options: [
    'Nous sommes',
    'Ils ont',
    'Nous avons',
    'Vous êtes',
  ],
  example: 'We have two lessons today.',
  exampleTranslation: "Nous avons deux leçons aujourd'hui.",
  explanation:
    'Avec WE, on utilise HAVE.',
},
{
  id: 25,
  lessonId: 4,
  word: 'They have',
  translation: 'Ils / Elles ont',
  options: [
    'Ils / Elles ont',
    'Ils sont',
    'Nous avons',
    'Tu as',
  ],
  example: 'They have three children.',
  exampleTranslation: 'Ils ont trois enfants.',
  explanation:
    'Avec THEY, on utilise HAVE.',
},
{
  id: 26,
  lessonId: 4,
  word: "I don't have",
  translation: "Je n'ai pas",
  options: [
    "Je n'ai pas",
    "J'ai",
    'Je ne suis pas',
    "Il n'a pas",
  ],
  example: "I don't have a bicycle.",
  exampleTranslation: "Je n'ai pas de vélo.",
  explanation:
    "Pour former la négation avec I, YOU, WE et THEY, on utilise DON'T HAVE.",
},
{
  id: 27,
  lessonId: 4,
  word: "He doesn't have",
  translation: "Il n'a pas",
  options: [
    'Il a',
    "Il n'a pas",
    "Je n'ai pas",
    'Elle est',
  ],
  example: "He doesn't have a phone.",
  exampleTranslation: "Il n'a pas de téléphone.",
  explanation:
    "Avec HE, SHE et IT, on utilise DOESN'T HAVE. Après DOESN'T, le verbe reste HAVE, jamais HAS.",
},
{
  id: 28,
  lessonId: 4,
  word: 'Do you have a car?',
  translation: 'As-tu une voiture ?',
  options: [
    'Tu as une voiture.',
    'As-tu une voiture ?',
    'Es-tu dans une voiture ?',
    "Je n'ai pas de voiture.",
  ],
  example: 'Do you have a car?',
  exampleTranslation: 'As-tu une voiture ?',
  explanation:
    'Pour poser une question avec YOU, on utilise DO + YOU + HAVE.',
},
{
  id: 29,
  lessonId: 4,
  word: 'Does she have a book?',
  translation: 'A-t-elle un livre ?',
  options: [
    'Elle a un livre.',
    'A-t-elle un livre ?',
    "Elle n'a pas de livre.",
    'Est-elle enseignante ?',
  ],
  example: 'Does she have a book?',
  exampleTranslation: 'A-t-elle un livre ?',
  explanation:
    'Avec HE, SHE et IT, on utilise DOES + sujet + HAVE. On ne dit pas DOES SHE HAS.',
},

{
  id: 30,
  lessonId: 5,
  word: 'I work',
  translation: 'Je travaille',
  options: [
    'Je travaille',
    'Je mange',
    'Je parle',
    'Je dors',
  ],
  example: 'I work every day.',
  exampleTranslation: 'Je travaille tous les jours.',
  explanation:
    'Avec I, YOU, WE et THEY, le verbe reste à sa forme de base au présent simple.',
},
{
  id: 31,
  lessonId: 5,
  word: 'She works',
  translation: 'Elle travaille',
  options: [
    'Elle travaille',
    'Elle travaillait',
    'Elle va travailler',
    'Elle mange',
  ],
  example: 'She works in a hospital.',
  exampleTranslation: 'Elle travaille dans un hôpital.',
  explanation:
    'Avec HE, SHE et IT, on ajoute généralement -S au verbe au présent simple.',
},
{
  id: 32,
  lessonId: 5,
  word: 'We eat',
  translation: 'Nous mangeons',
  options: [
    'Nous buvons',
    'Nous mangeons',
    'Nous dormons',
    'Nous parlons',
  ],
  example: 'We eat breakfast at seven.',
  exampleTranslation: 'Nous prenons le petit-déjeuner à sept heures.',
  explanation:
    'EAT signifie manger. Avec WE, le verbe ne prend pas de -S.',
},
{
  id: 33,
  lessonId: 5,
  word: 'He speaks',
  translation: 'Il parle',
  options: [
    'Il écoute',
    'Il parle',
    'Il travaille',
    'Il écrit',
  ],
  example: 'He speaks French.',
  exampleTranslation: 'Il parle français.',
  explanation:
    'Avec HE, le verbe SPEAK devient SPEAKS.',
},
{
  id: 34,
  lessonId: 5,
  word: 'They go',
  translation: 'Ils vont',
  options: [
    'Ils viennent',
    'Ils font',
    'Ils vont',
    'Ils ont',
  ],
  example: 'They go to school.',
  exampleTranslation: "Ils vont à l'école.",
  explanation:
    'GO signifie aller. Avec THEY, on utilise GO, sans -S.',
},
{
  id: 35,
  lessonId: 5,
  word: 'She goes',
  translation: 'Elle va',
  options: [
    'Elle va',
    'Elle fait',
    'Elle vient',
    'Elle parle',
  ],
  example: 'She goes to work by bus.',
  exampleTranslation: 'Elle va au travail en bus.',
  explanation:
    'Avec SHE, GO devient GOES. Certains verbes terminés par -O prennent -ES.',
},
{
  id: 36,
  lessonId: 5,
  word: 'I do',
  translation: 'Je fais',
  options: [
    'Je vais',
    'Je suis',
    'Je fais',
    "J'ai",
  ],
  example: 'I do my homework.',
  exampleTranslation: 'Je fais mes devoirs.',
  explanation:
    'DO peut signifier faire. Il sert aussi d’auxiliaire pour former des questions et des négations.',
},
{
  id: 37,
  lessonId: 5,
  word: "He doesn't work",
  translation: 'Il ne travaille pas',
  options: [
    'Il travaille',
    'Il ne travaille pas',
    'Il ne travaillait pas',
    'Il ne parle pas',
  ],
  example: "He doesn't work on Sundays.",
  exampleTranslation: 'Il ne travaille pas le dimanche.',
  explanation:
    "Avec HE, SHE et IT, on utilise DOESN'T + verbe à la forme de base, sans -S.",
},
{
  id: 38,
  lessonId: 5,
  word: 'Do you speak English?',
  translation: 'Parles-tu anglais ?',
  options: [
    'Tu parles anglais.',
    'Parles-tu anglais ?',
    'Tu apprends anglais.',
    'Parlais-tu anglais ?',
  ],
  example: 'Do you speak English?',
  exampleTranslation: 'Parles-tu anglais ?',
  explanation:
    'Pour poser une question au présent simple avec YOU, on utilise DO + sujet + verbe.',
},
{
  id: 39,
  lessonId: 5,
  word: 'Does she work here?',
  translation: 'Travaille-t-elle ici ?',
  options: [
    'Elle travaille ici.',
    'Travaille-t-elle ici ?',
    'Elle ne travaille pas ici.',
    'Travaillait-elle ici ?',
  ],
  example: 'Does she work here?',
  exampleTranslation: 'Travaille-t-elle ici ?',
  explanation:
    'Avec HE, SHE et IT, on utilise DOES + sujet + verbe à la forme de base. On ne dit pas DOES SHE WORKS.',
},

{
  id: 40,
  lessonId: 6,
  word: 'What is your name?',
  translation: "Comment t'appelles-tu ?",
  options: [
    "Comment t'appelles-tu ?",
    'Comment vas-tu ?',
    'Où habites-tu ?',
    'Quel âge as-tu ?',
  ],
  example: 'Hello! What is your name?',
  exampleTranslation: "Bonjour ! Comment t'appelles-tu ?",
  explanation:
    'WHAT signifie QUOI ou QUEL selon le contexte. WHAT IS YOUR NAME permet de demander le prénom ou le nom.',
},
{
  id: 41,
  lessonId: 6,
  word: 'My name is Ibrahim.',
  translation: "Je m'appelle Ibrahim.",
  options: [
    "Je m'appelle Ibrahim.",
    'Je suis étudiant.',
    "J'habite à Paris.",
    'Je vais bien.',
  ],
  example: 'My name is Ibrahim. Nice to meet you!',
  exampleTranslation:
    "Je m'appelle Ibrahim. Ravi de te rencontrer !",
  explanation:
    'MY signifie MON ou MA. MY NAME IS est une manière courante de se présenter.',
},
{
  id: 42,
  lessonId: 6,
  word: 'How are you?',
  translation: 'Comment vas-tu ?',
  options: [
    'Qui es-tu ?',
    'Comment vas-tu ?',
    'Où vas-tu ?',
    'Que fais-tu ?',
  ],
  example: 'Hello, how are you today?',
  exampleTranslation: "Bonjour, comment vas-tu aujourd'hui ?",
  explanation:
    'HOW ARE YOU est une formule courante pour demander à quelqu’un comment il va.',
},
{
  id: 43,
  lessonId: 6,
  word: 'I am fine, thank you.',
  translation: 'Je vais bien, merci.',
  options: [
    'Je suis fatigué.',
    'Je vais bien, merci.',
    'Je suis désolé.',
    'Je suis étudiant.',
  ],
  example: 'I am fine, thank you. And you?',
  exampleTranslation: 'Je vais bien, merci. Et toi ?',
  explanation:
    'I AM FINE est une réponse courante à HOW ARE YOU. On peut également répondre I AM GOOD.',
},
{
  id: 44,
  lessonId: 6,
  word: 'Where are you from?',
  translation: "D'où viens-tu ?",
  options: [
    'Où habites-tu ?',
    "D'où viens-tu ?",
    'Où travailles-tu ?',
    'Où vas-tu ?',
  ],
  example: 'Where are you from? I am from France.',
  exampleTranslation:
    "D'où viens-tu ? Je viens de France.",
  explanation:
    'WHERE signifie OÙ. WHERE ARE YOU FROM permet de demander l’origine d’une personne.',
},
{
  id: 45,
  lessonId: 6,
  word: 'I am from France.',
  translation: 'Je viens de France.',
  options: [
    "J'habite en France.",
    'Je viens de France.',
    'Je travaille en France.',
    'Je vais en France.',
  ],
  example: 'I am from France, but I live in London.',
  exampleTranslation:
    "Je viens de France, mais j'habite à Londres.",
  explanation:
    'I AM FROM indique une origine. Cela ne signifie pas nécessairement que la personne y habite actuellement.',
},
{
  id: 46,
  lessonId: 6,
  word: 'Where do you live?',
  translation: 'Où habites-tu ?',
  options: [
    'Où travailles-tu ?',
    'Où habites-tu ?',
    "D'où viens-tu ?",
    'Où étudies-tu ?',
  ],
  example: 'Where do you live?',
  exampleTranslation: 'Où habites-tu ?',
  explanation:
    'LIVE signifie HABITER ou VIVRE. DO est utilisé pour construire cette question au présent simple.',
},
{
  id: 47,
  lessonId: 6,
  word: 'I live in Paris.',
  translation: "J'habite à Paris.",
  options: [
    'Je travaille à Paris.',
    'Je viens de Paris.',
    "J'habite à Paris.",
    'Je vais à Paris.',
  ],
  example: 'I live in Paris with my family.',
  exampleTranslation:
    "J'habite à Paris avec ma famille.",
  explanation:
    'I LIVE IN permet de dire où l’on habite, notamment dans une ville ou un pays.',
},
{
  id: 48,
  lessonId: 6,
  word: 'Nice to meet you.',
  translation: 'Ravi de te rencontrer.',
  options: [
    'À demain.',
    'Ravi de te rencontrer.',
    'Bonne nuit.',
    'Merci beaucoup.',
  ],
  example: 'Hello, my name is Sarah. Nice to meet you!',
  exampleTranslation:
    "Bonjour, je m'appelle Sarah. Ravie de te rencontrer !",
  explanation:
    'NICE TO MEET YOU est une expression utilisée lorsqu’on rencontre quelqu’un pour la première fois.',
},
{
  id: 49,
  lessonId: 6,
  word: 'See you tomorrow!',
  translation: 'À demain !',
  options: [
    'À bientôt !',
    'À demain !',
    'Bonjour !',
    'Bonne nuit !',
  ],
  example: 'Goodbye, see you tomorrow!',
  exampleTranslation: 'Au revoir, à demain !',
  explanation:
    'SEE YOU TOMORROW signifie À DEMAIN. TOMORROW veut dire DEMAIN.',
},

]
