/** TP 27.19 bis — Cours progressifs, personnalisables et révisions en spirale. */
export type CourseLevel = 'A0' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
export type CourseFocus = 'orthographe' | 'grammaire' | 'pronoms' | 'adjectifs' | 'verbes' | 'temps' | 'prononciation' | 'vocabulaire' | 'speaking' | 'listening' | 'reading' | 'writing' | 'common-confusions' | 'phrasal-verbs' | 'english-for-work' | 'practice'
export type CourseLesson = { category: string; title: string; explanation: string; english: string; french: string }
export type WordPair = { english: string; french: string }
export type CourseExercise = {
  id: string
  kind: 'choice' | 'fill' | 'translate' | 'listen' | 'reading'
  prompt: string
  answer: string
  explanation: string
  options?: string[]
  context?: string
  audio?: string
}
export type CourseUnit = {
  id: string; level: CourseLevel; index: number; title: string; focus: CourseFocus[];
  xp: number; lessonId: number; description: string;
  lessons: CourseLesson[]; vocabulary: WordPair[]; revisitedVocabulary: WordPair[];
  speakingPrompt: string; readingText: string; exercises: CourseExercise[]
}
export const courseLevels: { id: CourseLevel; title: string }[] = [
  {
    "id": "A0",
    "title": "Premiers mots"
  },
  {
    "id": "A1",
    "title": "Débutant"
  },
  {
    "id": "A2",
    "title": "Élémentaire"
  },
  {
    "id": "B1",
    "title": "Intermédiaire"
  },
  {
    "id": "B2",
    "title": "Intermédiaire avancé"
  },
  {
    "id": "C1",
    "title": "Avancé"
  },
  {
    "id": "C2",
    "title": "Maîtrise"
  }
]

export const courseCategories: { id: CourseFocus; icon: string; title: string }[] = [
  {
    "id": "orthographe",
    "icon": "🔤",
    "title": "Orthographe & spelling"
  },
  {
    "id": "grammaire",
    "icon": "📗",
    "title": "Grammar — Grammaire"
  },
  {
    "id": "pronoms",
    "icon": "👤",
    "title": "Pronouns — Tous les pronoms"
  },
  {
    "id": "adjectifs",
    "icon": "🎨",
    "title": "Adjectifs & adverbes"
  },
  {
    "id": "verbes",
    "icon": "🔁",
    "title": "Verbs — Verbes"
  },
  {
    "id": "temps",
    "icon": "⏱️",
    "title": "Tenses — Présent, passé, futur"
  },
  {
    "id": "prononciation",
    "icon": "🗣️",
    "title": "Pronunciation — Prononciation"
  },
  {
    "id": "vocabulaire",
    "icon": "🧠",
    "title": "Vocabulary — Vocabulaire"
  },
  {
    "id": "speaking",
    "icon": "🎤",
    "title": "Speaking — Expression orale"
  },
  {
    "id": "listening",
    "icon": "🎧",
    "title": "Listening — Compréhension orale"
  },
  {
    "id": "reading",
    "icon": "📖",
    "title": "Reading — Compréhension écrite"
  },
  {
    "id": "writing",
    "icon": "✍️",
    "title": "Writing — Expression écrite"
  },
  {
    "id": "common-confusions",
    "icon": "🔀",
    "title": "Common confusions — Mots confondus"
  },
  {
    "id": "phrasal-verbs",
    "icon": "🧩",
    "title": "Phrasal verbs"
  },
  {
    "id": "english-for-work",
    "icon": "💼",
    "title": "English for work / IT"
  },
  {
    "id": "practice",
    "icon": "🎯",
    "title": "Practice — Exercices"
  }
]

export const courseUnits: CourseUnit[] = [
  {
    "id": "a0-1",
    "level": "A0",
    "index": 0,
    "title": "Hello ! Se présenter et épeler",
    "focus": [
      "orthographe",
      "grammaire",
      "pronoms",
      "prononciation",
      "speaking"
    ],
    "xp": 20,
    "lessonId": 6100,
    "description": "I signifie je, you signifie tu/vous, he signifie il, she signifie elle. Avec I on dit am ; avec you/we/they on dit are ; avec he/she/it on dit is.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Pronoms sujets et verbe be",
        "explanation": "I signifie je, you signifie tu/vous, he signifie il, she signifie elle. Avec I on dit am ; avec you/we/they on dit are ; avec he/she/it on dit is.",
        "english": "I am Lina.",
        "french": "Je suis Lina."
      },
      {
        "category": "Notion complémentaire",
        "title": "Alphabet et spelling",
        "explanation": "Pour demander l’orthographe d’un mot : How do you spell it? On peut répondre en disant chaque lettre.",
        "english": "How do you spell your name?",
        "french": "Comment épelles-tu ton prénom ?"
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "En anglais, chaque lettre possède un nom. Épelle lentement les prénoms et distingue les sons /iː/ et /ɪ/.",
        "english": "I am Lina.",
        "french": "Je suis Lina."
      }
    ],
    "vocabulary": [
      {
        "english": "hello",
        "french": "bonjour"
      },
      {
        "english": "name",
        "french": "prénom"
      },
      {
        "english": "student",
        "french": "étudiant"
      },
      {
        "english": "spell",
        "french": "épeler"
      }
    ],
    "revisitedVocabulary": [],
    "speakingPrompt": "I am Lina.",
    "readingText": "Hello! My name is Lina. I am a student. I live in Paris.",
    "exercises": [
      {
        "id": "a0-1-q1",
        "kind": "choice",
        "prompt": "Complète : “I ___ a student.”",
        "answer": "am",
        "explanation": "I signifie je, you signifie tu/vous, he signifie il, she signifie elle. Avec I on dit am ; avec you/we/they on dit are ; avec he/she/it on dit is.",
        "options": [
          "am",
          "are",
          "is",
          "be"
        ]
      },
      {
        "id": "a0-1-q2",
        "kind": "fill",
        "prompt": "I ___ Lina.",
        "answer": "am",
        "explanation": "Forme attendue : « am ». I signifie je, you signifie tu/vous, he signifie il, she signifie elle. Avec I on dit am ; avec you/we/they on dit are ; avec he/she/it on dit is."
      },
      {
        "id": "a0-1-q3",
        "kind": "translate",
        "prompt": "Je suis Lina.",
        "answer": "I am Lina.",
        "explanation": "Traduction modèle : I am Lina."
      },
      {
        "id": "a0-1-q4",
        "kind": "reading",
        "prompt": "Quel est le prénom de la personne ?",
        "answer": "Lina",
        "explanation": "Relis le passage : Hello! My name is Lina. I am a student. I live in Paris.",
        "options": [
          "Lina",
          "Paris",
          "Student",
          "Hello"
        ],
        "context": "Hello! My name is Lina. I am a student. I live in Paris."
      },
      {
        "id": "a0-1-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Je suis Lina.",
        "explanation": "La phrase entendue signifie : Je suis Lina.",
        "options": [
          "Je suis Lina.",
          "Je vous écris au sujet de la réunion.",
          "Allume l’ordinateur, s’il te plaît.",
          "Elle a dit qu’elle était fatiguée."
        ],
        "audio": "I am Lina."
      }
    ]
  },
  {
    "id": "a0-2",
    "level": "A0",
    "index": 1,
    "title": "Pronoms, articles et objets",
    "focus": [
      "grammaire",
      "pronoms",
      "vocabulaire",
      "orthographe"
    ],
    "xp": 20,
    "lessonId": 6101,
    "description": "a précède en général un son consonne ; an précède un son voyelle ; the désigne quelque chose de précis. Exemple : an apple, a book, the door.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Articles a, an, the",
        "explanation": "a précède en général un son consonne ; an précède un son voyelle ; the désigne quelque chose de précis. Exemple : an apple, a book, the door.",
        "english": "This is an apple.",
        "french": "C’est une pomme."
      },
      {
        "category": "Notion complémentaire",
        "title": "Démonstratifs",
        "explanation": "This et that désignent un élément proche ou éloigné. These et those s’emploient au pluriel.",
        "english": "These are books.",
        "french": "Ce sont des livres."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "La prononciation de a/an dépend du SON initial : an hour mais a university. Écoute les exemples à haute voix.",
        "english": "This is an apple.",
        "french": "C’est une pomme."
      }
    ],
    "vocabulary": [
      {
        "english": "apple",
        "french": "pomme"
      },
      {
        "english": "book",
        "french": "livre"
      },
      {
        "english": "door",
        "french": "porte"
      },
      {
        "english": "table",
        "french": "table"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "hello",
        "french": "bonjour"
      },
      {
        "english": "name",
        "french": "prénom"
      }
    ],
    "speakingPrompt": "This is an apple.",
    "readingText": "This is an apple. The apple is red. The book is on the table.",
    "exercises": [
      {
        "id": "a0-2-q1",
        "kind": "choice",
        "prompt": "Choisis l’article correct : “___ orange.”",
        "answer": "An",
        "explanation": "a précède en général un son consonne ; an précède un son voyelle ; the désigne quelque chose de précis. Exemple : an apple, a book, the door.",
        "options": [
          "An",
          "A",
          "Thee",
          "Is"
        ]
      },
      {
        "id": "a0-2-q2",
        "kind": "fill",
        "prompt": "This is ___ apple.",
        "answer": "an",
        "explanation": "Forme attendue : « an ». a précède en général un son consonne ; an précède un son voyelle ; the désigne quelque chose de précis. Exemple : an apple, a book, the door."
      },
      {
        "id": "a0-2-q3",
        "kind": "translate",
        "prompt": "C’est une pomme.",
        "answer": "This is an apple.",
        "explanation": "Traduction modèle : This is an apple."
      },
      {
        "id": "a0-2-q4",
        "kind": "reading",
        "prompt": "Quelle est la couleur de la pomme ?",
        "answer": "Rouge",
        "explanation": "Relis le passage : This is an apple. The apple is red. The book is on the table.",
        "options": [
          "Rouge",
          "Bleue",
          "Verte",
          "Jaune"
        ],
        "context": "This is an apple. The apple is red. The book is on the table."
      },
      {
        "id": "a0-2-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "C’est une pomme.",
        "explanation": "La phrase entendue signifie : C’est une pomme.",
        "options": [
          "Hier, j’ai rendu visite à mon ami.",
          "J’ai visité Londres deux fois.",
          "Si j’avais le temps, je voyagerais.",
          "C’est une pomme."
        ],
        "audio": "This is an apple."
      }
    ]
  },
  {
    "id": "a0-3",
    "level": "A0",
    "index": 2,
    "title": "Noms, pluriels et adjectifs",
    "focus": [
      "grammaire",
      "adjectifs",
      "orthographe",
      "vocabulaire"
    ],
    "xp": 20,
    "lessonId": 6102,
    "description": "La plupart des noms prennent -s au pluriel. Certains changent : child → children, person → people, man → men.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Pluriel des noms",
        "explanation": "La plupart des noms prennent -s au pluriel. Certains changent : child → children, person → people, man → men.",
        "english": "Two small cats are here.",
        "french": "Deux petits chats sont ici."
      },
      {
        "category": "Notion complémentaire",
        "title": "Accord et adjectifs",
        "explanation": "On dit two red cars, jamais two reds cars. Le nom devient pluriel, pas l’adjectif.",
        "english": "These are beautiful houses.",
        "french": "Ce sont de belles maisons."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "L’adjectif est généralement placé avant le nom : a small cat, et ne prend pas de -s au pluriel.",
        "english": "Two small cats are here.",
        "french": "Deux petits chats sont ici."
      }
    ],
    "vocabulary": [
      {
        "english": "cat",
        "french": "chat"
      },
      {
        "english": "small",
        "french": "petit"
      },
      {
        "english": "big",
        "french": "grand"
      },
      {
        "english": "children",
        "french": "enfants"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "apple",
        "french": "pomme"
      },
      {
        "english": "book",
        "french": "livre"
      }
    ],
    "speakingPrompt": "Two small cats are here.",
    "readingText": "Maya has two cats. One cat is black and the other is white.",
    "exercises": [
      {
        "id": "a0-3-q1",
        "kind": "choice",
        "prompt": "Quel pluriel est correct ?",
        "answer": "children",
        "explanation": "La plupart des noms prennent -s au pluriel. Certains changent : child → children, person → people, man → men.",
        "options": [
          "children",
          "childs",
          "childes",
          "child"
        ]
      },
      {
        "id": "a0-3-q2",
        "kind": "fill",
        "prompt": "Two ___ are here.",
        "answer": "cats",
        "explanation": "Forme attendue : « cats ». La plupart des noms prennent -s au pluriel. Certains changent : child → children, person → people, man → men."
      },
      {
        "id": "a0-3-q3",
        "kind": "translate",
        "prompt": "Deux petits chats sont ici.",
        "answer": "Two small cats are here.",
        "explanation": "Traduction modèle : Two small cats are here."
      },
      {
        "id": "a0-3-q4",
        "kind": "reading",
        "prompt": "Combien de chats Maya possède-t-elle ?",
        "answer": "Deux",
        "explanation": "Relis le passage : Maya has two cats. One cat is black and the other is white.",
        "options": [
          "Deux",
          "Un",
          "Trois",
          "Quatre"
        ],
        "context": "Maya has two cats. One cat is black and the other is white."
      },
      {
        "id": "a0-3-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Deux petits chats sont ici.",
        "explanation": "La phrase entendue signifie : Deux petits chats sont ici.",
        "options": [
          "Je lisais quand elle a appelé.",
          "Tu devrais vérifier les journaux.",
          "Deux petits chats sont ici.",
          "Je vais voyager demain."
        ],
        "audio": "Two small cats are here."
      }
    ]
  },
  {
    "id": "a0-4",
    "level": "A0",
    "index": 3,
    "title": "Présent simple et habitudes",
    "focus": [
      "temps",
      "grammaire",
      "verbes",
      "vocabulaire"
    ],
    "xp": 20,
    "lessonId": 6103,
    "description": "On l’utilise pour les habitudes et les faits. Avec he/she/it on ajoute généralement -s au verbe affirmatif : she works.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Present Simple",
        "explanation": "On l’utilise pour les habitudes et les faits. Avec he/she/it on ajoute généralement -s au verbe affirmatif : she works.",
        "english": "I work every day.",
        "french": "Je travaille tous les jours."
      },
      {
        "category": "Notion complémentaire",
        "title": "Négation au présent",
        "explanation": "Avec I/you/we/they : do not (don’t). Avec he/she/it : does not (doesn’t) et verbe sans -s.",
        "english": "She does not drink tea.",
        "french": "Elle ne boit pas de thé."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "En anglais, l’accent tonique peut changer le rythme de la phrase. Insiste sur les mots importants : I WORK every DAY.",
        "english": "I work every day.",
        "french": "Je travaille tous les jours."
      }
    ],
    "vocabulary": [
      {
        "english": "work",
        "french": "travailler"
      },
      {
        "english": "eat",
        "french": "manger"
      },
      {
        "english": "drink",
        "french": "boire"
      },
      {
        "english": "every day",
        "french": "tous les jours"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "cat",
        "french": "chat"
      },
      {
        "english": "small",
        "french": "petit"
      }
    ],
    "speakingPrompt": "I work every day.",
    "readingText": "Every morning, Ben drinks water and walks to school. He studies English after school.",
    "exercises": [
      {
        "id": "a0-4-q1",
        "kind": "choice",
        "prompt": "Complète : “She ___ English.”",
        "answer": "studies",
        "explanation": "On l’utilise pour les habitudes et les faits. Avec he/she/it on ajoute généralement -s au verbe affirmatif : she works.",
        "options": [
          "studies",
          "study",
          "studying",
          "studied"
        ]
      },
      {
        "id": "a0-4-q2",
        "kind": "fill",
        "prompt": "I ___ every day.",
        "answer": "work",
        "explanation": "Forme attendue : « work ». On l’utilise pour les habitudes et les faits. Avec he/she/it on ajoute généralement -s au verbe affirmatif : she works."
      },
      {
        "id": "a0-4-q3",
        "kind": "translate",
        "prompt": "Je travaille tous les jours.",
        "answer": "I work every day.",
        "explanation": "Traduction modèle : I work every day."
      },
      {
        "id": "a0-4-q4",
        "kind": "reading",
        "prompt": "Que boit Ben le matin ?",
        "answer": "De l’eau",
        "explanation": "Relis le passage : Every morning, Ben drinks water and walks to school. He studies English after school.",
        "options": [
          "De l’eau",
          "Du lait",
          "Du café",
          "Du thé"
        ],
        "context": "Every morning, Ben drinks water and walks to school. He studies English after school."
      },
      {
        "id": "a0-4-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Je travaille tous les jours.",
        "explanation": "La phrase entendue signifie : Je travaille tous les jours.",
        "options": [
          "Nous devons examiner l’incident.",
          "Je travaille tous les jours.",
          "Je lis un livre en ce moment.",
          "Si j’étudie, je réussirai."
        ],
        "audio": "I work every day."
      }
    ]
  },
  {
    "id": "a0-5",
    "level": "A0",
    "index": 4,
    "title": "Famille, possessifs et questions",
    "focus": [
      "pronoms",
      "grammaire",
      "vocabulaire",
      "speaking"
    ],
    "xp": 20,
    "lessonId": 6104,
    "description": "My signifie mon/ma/mes ; your signifie ton/ta/tes ; his signifie son/sa (à lui) ; her signifie son/sa (à elle).",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Possessifs my, your, his, her",
        "explanation": "My signifie mon/ma/mes ; your signifie ton/ta/tes ; his signifie son/sa (à lui) ; her signifie son/sa (à elle).",
        "english": "This is my sister.",
        "french": "C’est ma sœur."
      },
      {
        "category": "Notion complémentaire",
        "title": "Questions courtes",
        "explanation": "What = quoi/quel ; who = qui ; where = où ; when = quand ; why = pourquoi ; how = comment.",
        "english": "Where is your brother?",
        "french": "Où est ton frère ?"
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "Les mots interrogatifs commencent souvent par /w/ : what, where, when, why. “Who” se prononce avec un son /h/.",
        "english": "This is my sister.",
        "french": "C’est ma sœur."
      }
    ],
    "vocabulary": [
      {
        "english": "mother",
        "french": "mère"
      },
      {
        "english": "father",
        "french": "père"
      },
      {
        "english": "sister",
        "french": "sœur"
      },
      {
        "english": "brother",
        "french": "frère"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "work",
        "french": "travailler"
      },
      {
        "english": "eat",
        "french": "manger"
      }
    ],
    "speakingPrompt": "This is my sister.",
    "readingText": "Anna lives with her mother, father and brother. Her sister lives in London.",
    "exercises": [
      {
        "id": "a0-5-q1",
        "kind": "choice",
        "prompt": "Quelle question signifie « Qui » ?",
        "answer": "Who",
        "explanation": "My signifie mon/ma/mes ; your signifie ton/ta/tes ; his signifie son/sa (à lui) ; her signifie son/sa (à elle).",
        "options": [
          "Who",
          "Where",
          "When",
          "Why"
        ]
      },
      {
        "id": "a0-5-q2",
        "kind": "fill",
        "prompt": "This is ___ sister.",
        "answer": "my",
        "explanation": "Forme attendue : « my ». My signifie mon/ma/mes ; your signifie ton/ta/tes ; his signifie son/sa (à lui) ; her signifie son/sa (à elle)."
      },
      {
        "id": "a0-5-q3",
        "kind": "translate",
        "prompt": "C’est ma sœur.",
        "answer": "This is my sister.",
        "explanation": "Traduction modèle : This is my sister."
      },
      {
        "id": "a0-5-q4",
        "kind": "reading",
        "prompt": "Où habite la sœur d’Anna ?",
        "answer": "À Londres",
        "explanation": "Relis le passage : Anna lives with her mother, father and brother. Her sister lives in London.",
        "options": [
          "À Londres",
          "À Paris",
          "À Rome",
          "À Madrid"
        ],
        "context": "Anna lives with her mother, father and brother. Her sister lives in London."
      },
      {
        "id": "a0-5-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "C’est ma sœur.",
        "explanation": "La phrase entendue signifie : C’est ma sœur.",
        "options": [
          "C’est ma sœur.",
          "Ce livre est meilleur que celui-là.",
          "La femme qui a appelé est ma professeure.",
          "Si j’avais su, j’aurais aidé."
        ],
        "audio": "This is my sister."
      }
    ]
  },
  {
    "id": "a1-1",
    "level": "A1",
    "index": 5,
    "title": "Questions, négation et pronoms objets",
    "focus": [
      "grammaire",
      "pronoms",
      "temps",
      "speaking"
    ],
    "xp": 25,
    "lessonId": 6105,
    "description": "Avec les verbes ordinaires, on utilise do ou does : Do you work? Does she live here? Après does, pas de -s au verbe.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Questions au présent",
        "explanation": "Avec les verbes ordinaires, on utilise do ou does : Do you work? Does she live here? Après does, pas de -s au verbe.",
        "english": "Do you like coffee?",
        "french": "Aimes-tu le café ?"
      },
      {
        "category": "Notion complémentaire",
        "title": "Pronoms objets",
        "explanation": "Me, you, him, her, it, us et them se placent après un verbe ou une préposition : Call me. I know her.",
        "english": "Please help me.",
        "french": "Aide-moi, s’il te plaît."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "Pour une question oui/non, la voix peut monter en fin de phrase : Do you LIKE coffee?",
        "english": "Do you like coffee?",
        "french": "Aimes-tu le café ?"
      }
    ],
    "vocabulary": [
      {
        "english": "ask",
        "french": "demander"
      },
      {
        "english": "answer",
        "french": "répondre"
      },
      {
        "english": "coffee",
        "french": "café"
      },
      {
        "english": "tea",
        "french": "thé"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "mother",
        "french": "mère"
      },
      {
        "english": "father",
        "french": "père"
      },
      {
        "english": "hello",
        "french": "bonjour"
      },
      {
        "english": "name",
        "french": "prénom"
      }
    ],
    "speakingPrompt": "Do you like coffee?",
    "readingText": "Sam likes tea but not coffee. His friend Eva prefers coffee. They meet every Friday.",
    "exercises": [
      {
        "id": "a1-1-q1",
        "kind": "choice",
        "prompt": "Complète : “___ she work here?”",
        "answer": "Does",
        "explanation": "Avec les verbes ordinaires, on utilise do ou does : Do you work? Does she live here? Après does, pas de -s au verbe.",
        "options": [
          "Does",
          "Do",
          "Is",
          "Have"
        ]
      },
      {
        "id": "a1-1-q2",
        "kind": "fill",
        "prompt": "___ you like coffee?",
        "answer": "Do",
        "explanation": "Forme attendue : « Do ». Avec les verbes ordinaires, on utilise do ou does : Do you work? Does she live here? Après does, pas de -s au verbe."
      },
      {
        "id": "a1-1-q3",
        "kind": "translate",
        "prompt": "Aimes-tu le café ?",
        "answer": "Do you like coffee?",
        "explanation": "Traduction modèle : Do you like coffee?"
      },
      {
        "id": "a1-1-q4",
        "kind": "reading",
        "prompt": "Que préfère Eva ?",
        "answer": "Le café",
        "explanation": "Relis le passage : Sam likes tea but not coffee. His friend Eva prefers coffee. They meet every Friday.",
        "options": [
          "Le café",
          "Le thé",
          "Le lait",
          "Le jus"
        ],
        "context": "Sam likes tea but not coffee. His friend Eva prefers coffee. They meet every Friday."
      },
      {
        "id": "a1-1-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Aimes-tu le café ?",
        "explanation": "La phrase entendue signifie : Aimes-tu le café ?",
        "options": [
          "Allume l’ordinateur, s’il te plaît.",
          "Pourriez-vous m’envoyer le rapport ?",
          "L’ingénieur dont l’ordinateur est tombé en panne a appelé le support.",
          "Aimes-tu le café ?"
        ],
        "audio": "Do you like coffee?"
      }
    ]
  },
  {
    "id": "a1-2",
    "level": "A1",
    "index": 6,
    "title": "Adjectifs, adverbes et émotions",
    "focus": [
      "adjectifs",
      "grammaire",
      "vocabulaire",
      "orthographe"
    ],
    "xp": 25,
    "lessonId": 6106,
    "description": "Un adjectif décrit un nom (a careful driver). Un adverbe décrit souvent une action (drive carefully). Beaucoup d’adverbes se terminent en -ly.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Adjectives vs adverbs",
        "explanation": "Un adjectif décrit un nom (a careful driver). Un adverbe décrit souvent une action (drive carefully). Beaucoup d’adverbes se terminent en -ly.",
        "english": "She speaks slowly.",
        "french": "Elle parle lentement."
      },
      {
        "category": "Notion complémentaire",
        "title": "Comparaison de forme",
        "explanation": "Good est un adjectif ; well est souvent un adverbe : a good answer / she speaks well.",
        "english": "He works well.",
        "french": "Il travaille bien."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "Attention aux consonnes finales : slow et slowly n’ont pas le même rythme. Écoute et répète sans avaler les syllabes.",
        "english": "She speaks slowly.",
        "french": "Elle parle lentement."
      }
    ],
    "vocabulary": [
      {
        "english": "happy",
        "french": "heureux"
      },
      {
        "english": "slowly",
        "french": "lentement"
      },
      {
        "english": "careful",
        "french": "prudent"
      },
      {
        "english": "quickly",
        "french": "rapidement"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "ask",
        "french": "demander"
      },
      {
        "english": "answer",
        "french": "répondre"
      },
      {
        "english": "apple",
        "french": "pomme"
      },
      {
        "english": "book",
        "french": "livre"
      }
    ],
    "speakingPrompt": "She speaks slowly.",
    "readingText": "Leo is nervous before his test. He reads carefully and answers slowly. He feels happy afterwards.",
    "exercises": [
      {
        "id": "a1-2-q1",
        "kind": "choice",
        "prompt": "Quel mot est un adverbe ?",
        "answer": "quickly",
        "explanation": "Un adjectif décrit un nom (a careful driver). Un adverbe décrit souvent une action (drive carefully). Beaucoup d’adverbes se terminent en -ly.",
        "options": [
          "quickly",
          "beautiful",
          "blue",
          "tall"
        ]
      },
      {
        "id": "a1-2-q2",
        "kind": "fill",
        "prompt": "She speaks ___.",
        "answer": "slowly",
        "explanation": "Forme attendue : « slowly ». Un adjectif décrit un nom (a careful driver). Un adverbe décrit souvent une action (drive carefully). Beaucoup d’adverbes se terminent en -ly."
      },
      {
        "id": "a1-2-q3",
        "kind": "translate",
        "prompt": "Elle parle lentement.",
        "answer": "She speaks slowly.",
        "explanation": "Traduction modèle : She speaks slowly."
      },
      {
        "id": "a1-2-q4",
        "kind": "reading",
        "prompt": "Comment Leo répond-il ?",
        "answer": "Lentement",
        "explanation": "Relis le passage : Leo is nervous before his test. He reads carefully and answers slowly. He feels happy afterwards.",
        "options": [
          "Lentement",
          "Rapidement",
          "En criant",
          "Jamais"
        ],
        "context": "Leo is nervous before his test. He reads carefully and answers slowly. He feels happy afterwards."
      },
      {
        "id": "a1-2-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Elle parle lentement.",
        "explanation": "La phrase entendue signifie : Elle parle lentement.",
        "options": [
          "Le serveur a été mis à jour hier.",
          "Jamais je n’ai vu un tel résultat.",
          "Elle parle lentement.",
          "J’ai visité Londres deux fois."
        ],
        "audio": "She speaks slowly."
      }
    ]
  },
  {
    "id": "a1-3",
    "level": "A1",
    "index": 7,
    "title": "Prépositions et description de la maison",
    "focus": [
      "grammaire",
      "vocabulaire",
      "prononciation",
      "reading"
    ],
    "xp": 25,
    "lessonId": 6107,
    "description": "In = dans ; on = sur ; under = sous ; next to = à côté de. Les prépositions précisent une position ou une relation.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "In, on, under, next to",
        "explanation": "In = dans ; on = sur ; under = sous ; next to = à côté de. Les prépositions précisent une position ou une relation.",
        "english": "The keys are on the table.",
        "french": "Les clés sont sur la table."
      },
      {
        "category": "Notion complémentaire",
        "title": "There is / there are",
        "explanation": "There is s’emploie avec un singulier ; there are avec un pluriel.",
        "english": "There are two windows.",
        "french": "Il y a deux fenêtres."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "Écoute les petits mots at, in, on : ils sont souvent prononcés rapidement dans une phrase.",
        "english": "The keys are on the table.",
        "french": "Les clés sont sur la table."
      }
    ],
    "vocabulary": [
      {
        "english": "keys",
        "french": "clés"
      },
      {
        "english": "kitchen",
        "french": "cuisine"
      },
      {
        "english": "bedroom",
        "french": "chambre"
      },
      {
        "english": "window",
        "french": "fenêtre"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "happy",
        "french": "heureux"
      },
      {
        "english": "slowly",
        "french": "lentement"
      },
      {
        "english": "cat",
        "french": "chat"
      },
      {
        "english": "small",
        "french": "petit"
      }
    ],
    "speakingPrompt": "The keys are on the table.",
    "readingText": "In her bedroom, Mia has a desk next to the window. Her keys are on the desk.",
    "exercises": [
      {
        "id": "a1-3-q1",
        "kind": "choice",
        "prompt": "Complète : “The cat is ___ the chair.” pour « sous »",
        "answer": "under",
        "explanation": "In = dans ; on = sur ; under = sous ; next to = à côté de. Les prépositions précisent une position ou une relation.",
        "options": [
          "under",
          "on",
          "in",
          "at"
        ]
      },
      {
        "id": "a1-3-q2",
        "kind": "fill",
        "prompt": "The keys are ___ the table.",
        "answer": "on",
        "explanation": "Forme attendue : « on ». In = dans ; on = sur ; under = sous ; next to = à côté de. Les prépositions précisent une position ou une relation."
      },
      {
        "id": "a1-3-q3",
        "kind": "translate",
        "prompt": "Les clés sont sur la table.",
        "answer": "The keys are on the table.",
        "explanation": "Traduction modèle : The keys are on the table."
      },
      {
        "id": "a1-3-q4",
        "kind": "reading",
        "prompt": "Où sont les clés de Mia ?",
        "answer": "Sur le bureau",
        "explanation": "Relis le passage : In her bedroom, Mia has a desk next to the window. Her keys are on the desk.",
        "options": [
          "Sur le bureau",
          "Sous le lit",
          "Dans la cuisine",
          "Dans le jardin"
        ],
        "context": "In her bedroom, Mia has a desk next to the window. Her keys are on the desk."
      },
      {
        "id": "a1-3-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Les clés sont sur la table.",
        "explanation": "La phrase entendue signifie : Les clés sont sur la table.",
        "options": [
          "Bien que ce soit cher, c’est fiable.",
          "Les clés sont sur la table.",
          "Je lisais quand elle a appelé.",
          "Elle a dit qu’elle était fatiguée."
        ],
        "audio": "The keys are on the table."
      }
    ]
  },
  {
    "id": "a1-4",
    "level": "A1",
    "index": 8,
    "title": "Nourriture, quantités et pluriels",
    "focus": [
      "grammaire",
      "vocabulaire",
      "orthographe",
      "common-confusions"
    ],
    "xp": 25,
    "lessonId": 6108,
    "description": "Apple est dénombrable : two apples. Water est indénombrable : some water (pas two waters pour deux quantités ordinaires).",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Countable vs uncountable",
        "explanation": "Apple est dénombrable : two apples. Water est indénombrable : some water (pas two waters pour deux quantités ordinaires).",
        "english": "I would like some water.",
        "french": "Je voudrais de l’eau."
      },
      {
        "category": "Notion complémentaire",
        "title": "How much / how many",
        "explanation": "How many + pluriel dénombrable ; how much + indénombrable.",
        "english": "How many apples do you need?",
        "french": "De combien de pommes as-tu besoin ?"
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "Attention à l’orthographe des pluriels -s/-es : bus → buses, box → boxes ; baby → babies.",
        "english": "I would like some water.",
        "french": "Je voudrais de l’eau."
      }
    ],
    "vocabulary": [
      {
        "english": "water",
        "french": "eau"
      },
      {
        "english": "bread",
        "french": "pain"
      },
      {
        "english": "rice",
        "french": "riz"
      },
      {
        "english": "apples",
        "french": "pommes"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "keys",
        "french": "clés"
      },
      {
        "english": "kitchen",
        "french": "cuisine"
      },
      {
        "english": "work",
        "french": "travailler"
      },
      {
        "english": "eat",
        "french": "manger"
      }
    ],
    "speakingPrompt": "I would like some water.",
    "readingText": "At the café, Tom orders bread and water. His friend buys two apples and some rice.",
    "exercises": [
      {
        "id": "a1-4-q1",
        "kind": "choice",
        "prompt": "Choisis l’expression correcte :",
        "answer": "some rice",
        "explanation": "Apple est dénombrable : two apples. Water est indénombrable : some water (pas two waters pour deux quantités ordinaires).",
        "options": [
          "some rice",
          "two rices",
          "many rice",
          "a rice"
        ]
      },
      {
        "id": "a1-4-q2",
        "kind": "fill",
        "prompt": "I would like ___ water.",
        "answer": "some",
        "explanation": "Forme attendue : « some ». Apple est dénombrable : two apples. Water est indénombrable : some water (pas two waters pour deux quantités ordinaires)."
      },
      {
        "id": "a1-4-q3",
        "kind": "translate",
        "prompt": "Je voudrais de l’eau.",
        "answer": "I would like some water.",
        "explanation": "Traduction modèle : I would like some water."
      },
      {
        "id": "a1-4-q4",
        "kind": "reading",
        "prompt": "Combien de pommes l’ami achète-t-il ?",
        "answer": "Deux",
        "explanation": "Relis le passage : At the café, Tom orders bread and water. His friend buys two apples and some rice.",
        "options": [
          "Deux",
          "Une",
          "Trois",
          "Quatre"
        ],
        "context": "At the café, Tom orders bread and water. His friend buys two apples and some rice."
      },
      {
        "id": "a1-4-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Je voudrais de l’eau.",
        "explanation": "La phrase entendue signifie : Je voudrais de l’eau.",
        "options": [
          "Je voudrais de l’eau.",
          "Si j’étudie, je réussirai.",
          "Si j’avais le temps, je voyagerais.",
          "Nous devons effectuer un examen."
        ],
        "audio": "I would like some water."
      }
    ]
  },
  {
    "id": "a1-5",
    "level": "A1",
    "index": 9,
    "title": "Présentation et email simple",
    "focus": [
      "writing",
      "english-for-work",
      "speaking",
      "vocabulaire"
    ],
    "xp": 25,
    "lessonId": 6109,
    "description": "Un email commence souvent par Hi/Hello et se termine par Best regards/Kind regards selon le contexte. Utilise des phrases simples.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Email court",
        "explanation": "Un email commence souvent par Hi/Hello et se termine par Best regards/Kind regards selon le contexte. Utilise des phrases simples.",
        "english": "I am writing about the meeting.",
        "french": "Je vous écris au sujet de la réunion."
      },
      {
        "category": "Notion complémentaire",
        "title": "Parler de ses études",
        "explanation": "Formule : I study + matière ; I work in + domaine. Ces phrases pourront être reprises dans les unités professionnelles.",
        "english": "I study cybersecurity.",
        "french": "J’étudie la cybersécurité."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "Pour les présentations, marque une courte pause après Hello, everyone. L’intonation aide à être compris.",
        "english": "I am writing about the meeting.",
        "french": "Je vous écris au sujet de la réunion."
      }
    ],
    "vocabulary": [
      {
        "english": "meeting",
        "french": "réunion"
      },
      {
        "english": "email",
        "french": "courriel"
      },
      {
        "english": "tomorrow",
        "french": "demain"
      },
      {
        "english": "regards",
        "french": "salutations"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "water",
        "french": "eau"
      },
      {
        "english": "bread",
        "french": "pain"
      },
      {
        "english": "mother",
        "french": "mère"
      },
      {
        "english": "father",
        "french": "père"
      }
    ],
    "speakingPrompt": "I am writing about the meeting.",
    "readingText": "Hello, my name is Sara. I work in IT. Our team has a meeting on Tuesday. I will send an email.",
    "exercises": [
      {
        "id": "a1-5-q1",
        "kind": "choice",
        "prompt": "Quelle formule est appropriée pour commencer un email simple ?",
        "answer": "Hello Alex,",
        "explanation": "Un email commence souvent par Hi/Hello et se termine par Best regards/Kind regards selon le contexte. Utilise des phrases simples.",
        "options": [
          "Hello Alex,",
          "Goodbye Alex,",
          "Never Alex,",
          "End Alex,"
        ]
      },
      {
        "id": "a1-5-q2",
        "kind": "fill",
        "prompt": "I am ___ about the meeting.",
        "answer": "writing",
        "explanation": "Forme attendue : « writing ». Un email commence souvent par Hi/Hello et se termine par Best regards/Kind regards selon le contexte. Utilise des phrases simples."
      },
      {
        "id": "a1-5-q3",
        "kind": "translate",
        "prompt": "Je vous écris au sujet de la réunion.",
        "answer": "I am writing about the meeting.",
        "explanation": "Traduction modèle : I am writing about the meeting."
      },
      {
        "id": "a1-5-q4",
        "kind": "reading",
        "prompt": "Quel jour a lieu la réunion ?",
        "answer": "Mardi",
        "explanation": "Relis le passage : Hello, my name is Sara. I work in IT. Our team has a meeting on Tuesday. I will send an email.",
        "options": [
          "Mardi",
          "Lundi",
          "Vendredi",
          "Dimanche"
        ],
        "context": "Hello, my name is Sara. I work in IT. Our team has a meeting on Tuesday. I will send an email."
      },
      {
        "id": "a1-5-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Je vous écris au sujet de la réunion.",
        "explanation": "La phrase entendue signifie : Je vous écris au sujet de la réunion.",
        "options": [
          "La femme qui a appelé est ma professeure.",
          "Tu devrais vérifier les journaux.",
          "Nous vous serions reconnaissants de votre aide.",
          "Je vous écris au sujet de la réunion."
        ],
        "audio": "I am writing about the meeting."
      }
    ]
  },
  {
    "id": "a2-1",
    "level": "A2",
    "index": 10,
    "title": "Past Simple : verbes réguliers et irréguliers",
    "focus": [
      "temps",
      "verbes",
      "orthographe",
      "prononciation"
    ],
    "xp": 30,
    "lessonId": 6110,
    "description": "Pour une action terminée dans le passé, ajoute -ed aux verbes réguliers (work → worked). Les irréguliers changent : go → went, buy → bought.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Past Simple",
        "explanation": "Pour une action terminée dans le passé, ajoute -ed aux verbes réguliers (work → worked). Les irréguliers changent : go → went, buy → bought.",
        "english": "Yesterday, I visited my friend.",
        "french": "Hier, j’ai rendu visite à mon ami."
      },
      {
        "category": "Notion complémentaire",
        "title": "Questions au passé",
        "explanation": "Avec did : Did you go? Pour une négation : I did not go. Le verbe revient à sa forme de base.",
        "english": "Did you study yesterday?",
        "french": "As-tu étudié hier ?"
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "-ed se prononce /t/ dans worked, /d/ dans played et /ɪd/ dans wanted. Le son varie, l’orthographe reste -ed.",
        "english": "Yesterday, I visited my friend.",
        "french": "Hier, j’ai rendu visite à mon ami."
      }
    ],
    "vocabulary": [
      {
        "english": "yesterday",
        "french": "hier"
      },
      {
        "english": "visited",
        "french": "a rendu visite"
      },
      {
        "english": "went",
        "french": "est allé"
      },
      {
        "english": "bought",
        "french": "a acheté"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "meeting",
        "french": "réunion"
      },
      {
        "english": "email",
        "french": "courriel"
      },
      {
        "english": "ask",
        "french": "demander"
      },
      {
        "english": "answer",
        "french": "répondre"
      }
    ],
    "speakingPrompt": "Yesterday, I visited my friend.",
    "readingText": "Yesterday, Nina visited her friend. They went to a bookshop and bought a dictionary.",
    "exercises": [
      {
        "id": "a2-1-q1",
        "kind": "choice",
        "prompt": "Quel passé simple de go est correct ?",
        "answer": "went",
        "explanation": "Pour une action terminée dans le passé, ajoute -ed aux verbes réguliers (work → worked). Les irréguliers changent : go → went, buy → bought.",
        "options": [
          "went",
          "goed",
          "gone",
          "going"
        ]
      },
      {
        "id": "a2-1-q2",
        "kind": "fill",
        "prompt": "Yesterday, I ___ my friend.",
        "answer": "visited",
        "explanation": "Forme attendue : « visited ». Pour une action terminée dans le passé, ajoute -ed aux verbes réguliers (work → worked). Les irréguliers changent : go → went, buy → bought."
      },
      {
        "id": "a2-1-q3",
        "kind": "translate",
        "prompt": "Hier, j’ai rendu visite à mon ami.",
        "answer": "Yesterday, I visited my friend.",
        "explanation": "Traduction modèle : Yesterday, I visited my friend."
      },
      {
        "id": "a2-1-q4",
        "kind": "reading",
        "prompt": "Qu’ont-elles acheté ?",
        "answer": "Un dictionnaire",
        "explanation": "Relis le passage : Yesterday, Nina visited her friend. They went to a bookshop and bought a dictionary.",
        "options": [
          "Un dictionnaire",
          "Un ordinateur",
          "Une voiture",
          "Un téléphone"
        ],
        "context": "Yesterday, Nina visited her friend. They went to a bookshop and bought a dictionary."
      },
      {
        "id": "a2-1-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Hier, j’ai rendu visite à mon ami.",
        "explanation": "La phrase entendue signifie : Hier, j’ai rendu visite à mon ami.",
        "options": [
          "Nous devons examiner l’incident.",
          "Je veux comprendre les détails.",
          "Hier, j’ai rendu visite à mon ami.",
          "Pourriez-vous m’envoyer le rapport ?"
        ],
        "audio": "Yesterday, I visited my friend."
      }
    ]
  },
  {
    "id": "a2-2",
    "level": "A2",
    "index": 11,
    "title": "Futur : will et going to",
    "focus": [
      "temps",
      "verbes",
      "grammaire",
      "speaking"
    ],
    "xp": 30,
    "lessonId": 6111,
    "description": "Will exprime souvent une décision immédiate, une promesse ou une prédiction ; going to un projet déjà envisagé ou un indice visible.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Will vs be going to",
        "explanation": "Will exprime souvent une décision immédiate, une promesse ou une prédiction ; going to un projet déjà envisagé ou un indice visible.",
        "english": "I am going to travel tomorrow.",
        "french": "Je vais voyager demain."
      },
      {
        "category": "Notion complémentaire",
        "title": "Futur négatif",
        "explanation": "Will not se contracte en won’t : I won’t forget. Going to garde be : She isn’t going to leave.",
        "english": "I will not be late.",
        "french": "Je ne serai pas en retard."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "À l’oral, going to est parfois réduit en gonna dans un registre informel. À l’écrit scolaire, utilise going to.",
        "english": "I am going to travel tomorrow.",
        "french": "Je vais voyager demain."
      }
    ],
    "vocabulary": [
      {
        "english": "tomorrow",
        "french": "demain"
      },
      {
        "english": "travel",
        "french": "voyager"
      },
      {
        "english": "plan",
        "french": "projet"
      },
      {
        "english": "flight",
        "french": "vol"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "yesterday",
        "french": "hier"
      },
      {
        "english": "visited",
        "french": "a rendu visite"
      },
      {
        "english": "happy",
        "french": "heureux"
      },
      {
        "english": "slowly",
        "french": "lentement"
      }
    ],
    "speakingPrompt": "I am going to travel tomorrow.",
    "readingText": "Alex has booked a train ticket. Tomorrow, he is going to visit his aunt in Lyon.",
    "exercises": [
      {
        "id": "a2-2-q1",
        "kind": "choice",
        "prompt": "Choisis le futur simple correct :",
        "answer": "I will call you.",
        "explanation": "Will exprime souvent une décision immédiate, une promesse ou une prédiction ; going to un projet déjà envisagé ou un indice visible.",
        "options": [
          "I will call you.",
          "I will calling you.",
          "I wills call you.",
          "I called will you."
        ]
      },
      {
        "id": "a2-2-q2",
        "kind": "fill",
        "prompt": "I am ___ to travel tomorrow.",
        "answer": "going",
        "explanation": "Forme attendue : « going ». Will exprime souvent une décision immédiate, une promesse ou une prédiction ; going to un projet déjà envisagé ou un indice visible."
      },
      {
        "id": "a2-2-q3",
        "kind": "translate",
        "prompt": "Je vais voyager demain.",
        "answer": "I am going to travel tomorrow.",
        "explanation": "Traduction modèle : I am going to travel tomorrow."
      },
      {
        "id": "a2-2-q4",
        "kind": "reading",
        "prompt": "Quel transport Alex a-t-il réservé ?",
        "answer": "Le train",
        "explanation": "Relis le passage : Alex has booked a train ticket. Tomorrow, he is going to visit his aunt in Lyon.",
        "options": [
          "Le train",
          "L’avion",
          "Le bus",
          "Le vélo"
        ],
        "context": "Alex has booked a train ticket. Tomorrow, he is going to visit his aunt in Lyon."
      },
      {
        "id": "a2-2-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Je vais voyager demain.",
        "explanation": "La phrase entendue signifie : Je vais voyager demain.",
        "options": [
          "Les éléments indiquent une amélioration possible.",
          "Je vais voyager demain.",
          "Le serveur a été mis à jour hier.",
          "Si j’avais su, j’aurais aidé."
        ],
        "audio": "I am going to travel tomorrow."
      }
    ]
  },
  {
    "id": "a2-3",
    "level": "A2",
    "index": 12,
    "title": "Present Continuous et activités du moment",
    "focus": [
      "temps",
      "grammaire",
      "prononciation",
      "common-confusions"
    ],
    "xp": 30,
    "lessonId": 6112,
    "description": "Be + verbe-ing décrit souvent une action en cours : She is studying now. À distinguer du présent simple pour les habitudes.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Present Continuous",
        "explanation": "Be + verbe-ing décrit souvent une action en cours : She is studying now. À distinguer du présent simple pour les habitudes.",
        "english": "I am reading a book now.",
        "french": "Je lis un livre en ce moment."
      },
      {
        "category": "Notion complémentaire",
        "title": "Present Simple vs Continuous",
        "explanation": "“I work every day” exprime une habitude ; “I am working now” une action en cours.",
        "english": "She works on Mondays.",
        "french": "Elle travaille le lundi."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "Les contractions I’m, you’re, she’s sont courantes à l’oral. Compare “she’s reading” et “she reads”.",
        "english": "I am reading a book now.",
        "french": "Je lis un livre en ce moment."
      }
    ],
    "vocabulary": [
      {
        "english": "now",
        "french": "maintenant"
      },
      {
        "english": "reading",
        "french": "en train de lire"
      },
      {
        "english": "running",
        "french": "en train de courir"
      },
      {
        "english": "working",
        "french": "en train de travailler"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "tomorrow",
        "french": "demain"
      },
      {
        "english": "travel",
        "french": "voyager"
      },
      {
        "english": "keys",
        "french": "clés"
      },
      {
        "english": "kitchen",
        "french": "cuisine"
      }
    ],
    "speakingPrompt": "I am reading a book now.",
    "readingText": "It is raining now. Ben is sitting by the window and reading a novel. He usually runs on Saturdays.",
    "exercises": [
      {
        "id": "a2-3-q1",
        "kind": "choice",
        "prompt": "Complète : “They are ___ now.”",
        "answer": "working",
        "explanation": "Be + verbe-ing décrit souvent une action en cours : She is studying now. À distinguer du présent simple pour les habitudes.",
        "options": [
          "working",
          "work",
          "works",
          "worked"
        ]
      },
      {
        "id": "a2-3-q2",
        "kind": "fill",
        "prompt": "I am ___ a book now.",
        "answer": "reading",
        "explanation": "Forme attendue : « reading ». Be + verbe-ing décrit souvent une action en cours : She is studying now. À distinguer du présent simple pour les habitudes."
      },
      {
        "id": "a2-3-q3",
        "kind": "translate",
        "prompt": "Je lis un livre en ce moment.",
        "answer": "I am reading a book now.",
        "explanation": "Traduction modèle : I am reading a book now."
      },
      {
        "id": "a2-3-q4",
        "kind": "reading",
        "prompt": "Que fait Ben maintenant ?",
        "answer": "Il lit un roman",
        "explanation": "Relis le passage : It is raining now. Ben is sitting by the window and reading a novel. He usually runs on Saturdays.",
        "options": [
          "Il lit un roman",
          "Il court",
          "Il cuisine",
          "Il nage"
        ],
        "context": "It is raining now. Ben is sitting by the window and reading a novel. He usually runs on Saturdays."
      },
      {
        "id": "a2-3-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Je lis un livre en ce moment.",
        "explanation": "La phrase entendue signifie : Je lis un livre en ce moment.",
        "options": [
          "Je lis un livre en ce moment.",
          "Elle a dit qu’elle était fatiguée.",
          "L’ingénieur dont l’ordinateur est tombé en panne a appelé le support.",
          "Nous évaluons l’impact et communiquerons des mises à jour."
        ],
        "audio": "I am reading a book now."
      }
    ]
  },
  {
    "id": "a2-4",
    "level": "A2",
    "index": 13,
    "title": "Comparatifs, superlatifs et confusions",
    "focus": [
      "adjectifs",
      "grammaire",
      "common-confusions",
      "orthographe"
    ],
    "xp": 30,
    "lessonId": 6113,
    "description": "Small → smaller → the smallest ; beautiful → more beautiful → the most beautiful. Irréguliers : good → better → the best.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Comparatives & superlatives",
        "explanation": "Small → smaller → the smallest ; beautiful → more beautiful → the most beautiful. Irréguliers : good → better → the best.",
        "english": "This book is better than that one.",
        "french": "Ce livre est meilleur que celui-là."
      },
      {
        "category": "Notion complémentaire",
        "title": "Your / you’re",
        "explanation": "Your indique la possession ; you’re signifie you are. Leur prononciation est identique mais leur fonction diffère.",
        "english": "You’re my friend.",
        "french": "Tu es mon ami."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "Ne confonds pas then (ensuite) et than (que dans une comparaison). Plus tard, nous reverrons cette paire.",
        "english": "This book is better than that one.",
        "french": "Ce livre est meilleur que celui-là."
      }
    ],
    "vocabulary": [
      {
        "english": "better",
        "french": "meilleur"
      },
      {
        "english": "worse",
        "french": "pire"
      },
      {
        "english": "than",
        "french": "que"
      },
      {
        "english": "most",
        "french": "le plus"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "now",
        "french": "maintenant"
      },
      {
        "english": "reading",
        "french": "en train de lire"
      },
      {
        "english": "water",
        "french": "eau"
      },
      {
        "english": "bread",
        "french": "pain"
      }
    ],
    "speakingPrompt": "This book is better than that one.",
    "readingText": "Tom has two bikes. The blue bike is faster than the red bike, but the red one is cheaper.",
    "exercises": [
      {
        "id": "a2-4-q1",
        "kind": "choice",
        "prompt": "Complète : “She is ___ than me.”",
        "answer": "taller",
        "explanation": "Small → smaller → the smallest ; beautiful → more beautiful → the most beautiful. Irréguliers : good → better → the best.",
        "options": [
          "taller",
          "tallest",
          "more tall",
          "most tall"
        ]
      },
      {
        "id": "a2-4-q2",
        "kind": "fill",
        "prompt": "This book is better ___ that one.",
        "answer": "than",
        "explanation": "Forme attendue : « than ». Small → smaller → the smallest ; beautiful → more beautiful → the most beautiful. Irréguliers : good → better → the best."
      },
      {
        "id": "a2-4-q3",
        "kind": "translate",
        "prompt": "Ce livre est meilleur que celui-là.",
        "answer": "This book is better than that one.",
        "explanation": "Traduction modèle : This book is better than that one."
      },
      {
        "id": "a2-4-q4",
        "kind": "reading",
        "prompt": "Quel vélo est le plus rapide ?",
        "answer": "Le bleu",
        "explanation": "Relis le passage : Tom has two bikes. The blue bike is faster than the red bike, but the red one is cheaper.",
        "options": [
          "Le bleu",
          "Le rouge",
          "Les deux",
          "Aucun"
        ],
        "context": "Tom has two bikes. The blue bike is faster than the red bike, but the red one is cheaper."
      },
      {
        "id": "a2-4-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Ce livre est meilleur que celui-là.",
        "explanation": "La phrase entendue signifie : Ce livre est meilleur que celui-là.",
        "options": [
          "Si j’avais le temps, je voyagerais.",
          "Jamais je n’ai vu un tel résultat.",
          "Le problème a été résolu, mais la surveillance continue.",
          "Ce livre est meilleur que celui-là."
        ],
        "audio": "This book is better than that one."
      }
    ]
  },
  {
    "id": "a2-5",
    "level": "A2",
    "index": 14,
    "title": "Phrasal verbs et demandes polies",
    "focus": [
      "phrasal-verbs",
      "speaking",
      "vocabulaire",
      "english-for-work"
    ],
    "xp": 30,
    "lessonId": 6114,
    "description": "Look for = chercher ; turn on = allumer ; turn off = éteindre ; pick up = ramasser/récupérer. Le sens n’est pas toujours déductible du verbe seul.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Phrasal verbs fréquents",
        "explanation": "Look for = chercher ; turn on = allumer ; turn off = éteindre ; pick up = ramasser/récupérer. Le sens n’est pas toujours déductible du verbe seul.",
        "english": "Please turn on the computer.",
        "french": "Allume l’ordinateur, s’il te plaît."
      },
      {
        "category": "Notion complémentaire",
        "title": "Demandes polies",
        "explanation": "Could you + verbe est souvent plus poli que can you + verbe.",
        "english": "Could you help me, please?",
        "french": "Pourriez-vous m’aider, s’il vous plaît ?"
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "L’accent porte souvent sur la particule des phrasal verbs : turn ON, turn OFF.",
        "english": "Please turn on the computer.",
        "french": "Allume l’ordinateur, s’il te plaît."
      }
    ],
    "vocabulary": [
      {
        "english": "turn on",
        "french": "allumer"
      },
      {
        "english": "turn off",
        "french": "éteindre"
      },
      {
        "english": "look for",
        "french": "chercher"
      },
      {
        "english": "pick up",
        "french": "récupérer"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "better",
        "french": "meilleur"
      },
      {
        "english": "worse",
        "french": "pire"
      },
      {
        "english": "meeting",
        "french": "réunion"
      },
      {
        "english": "email",
        "french": "courriel"
      }
    ],
    "speakingPrompt": "Please turn on the computer.",
    "readingText": "Ana is looking for her phone. She turns on the light and finds it under the desk.",
    "exercises": [
      {
        "id": "a2-5-q1",
        "kind": "choice",
        "prompt": "Que signifie “look after” ?",
        "answer": "Prendre soin de",
        "explanation": "Look for = chercher ; turn on = allumer ; turn off = éteindre ; pick up = ramasser/récupérer. Le sens n’est pas toujours déductible du verbe seul.",
        "options": [
          "Prendre soin de",
          "Chercher",
          "Regarder vers le haut",
          "Éteindre"
        ]
      },
      {
        "id": "a2-5-q2",
        "kind": "fill",
        "prompt": "Please turn ___ the computer.",
        "answer": "on",
        "explanation": "Forme attendue : « on ». Look for = chercher ; turn on = allumer ; turn off = éteindre ; pick up = ramasser/récupérer. Le sens n’est pas toujours déductible du verbe seul."
      },
      {
        "id": "a2-5-q3",
        "kind": "translate",
        "prompt": "Allume l’ordinateur, s’il te plaît.",
        "answer": "Please turn on the computer.",
        "explanation": "Traduction modèle : Please turn on the computer."
      },
      {
        "id": "a2-5-q4",
        "kind": "reading",
        "prompt": "Que cherche Ana ?",
        "answer": "Son téléphone",
        "explanation": "Relis le passage : Ana is looking for her phone. She turns on the light and finds it under the desk.",
        "options": [
          "Son téléphone",
          "Son sac",
          "Ses clés",
          "Son livre"
        ],
        "context": "Ana is looking for her phone. She turns on the light and finds it under the desk."
      },
      {
        "id": "a2-5-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Allume l’ordinateur, s’il te plaît.",
        "explanation": "La phrase entendue signifie : Allume l’ordinateur, s’il te plaît.",
        "options": [
          "Bien que ce soit cher, c’est fiable.",
          "Je suis Lina.",
          "Allume l’ordinateur, s’il te plaît.",
          "Tu devrais vérifier les journaux."
        ],
        "audio": "Please turn on the computer."
      }
    ]
  },
  {
    "id": "b1-1",
    "level": "B1",
    "index": 15,
    "title": "Present Perfect et expérience",
    "focus": [
      "temps",
      "grammaire",
      "verbes",
      "speaking"
    ],
    "xp": 35,
    "lessonId": 6115,
    "description": "Have/has + participe passé relie une expérience passée au présent : I have visited London. Past Simple situe souvent une action datée : I visited Lond…",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Present Perfect",
        "explanation": "Have/has + participe passé relie une expérience passée au présent : I have visited London. Past Simple situe souvent une action datée : I visited London in 2020.",
        "english": "I have visited London twice.",
        "french": "J’ai visité Londres deux fois."
      },
      {
        "category": "Notion complémentaire",
        "title": "Since / for",
        "explanation": "Since indique un point de départ (since 2020) ; for une durée (for three years).",
        "english": "I have worked here for two years.",
        "french": "Je travaille ici depuis deux ans."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "Les contractions I’ve et she’s sont courantes ; regarde le contexte pour distinguer she is et she has.",
        "english": "I have visited London twice.",
        "french": "J’ai visité Londres deux fois."
      }
    ],
    "vocabulary": [
      {
        "english": "already",
        "french": "déjà"
      },
      {
        "english": "yet",
        "french": "encore/pas encore"
      },
      {
        "english": "ever",
        "french": "déjà (question)"
      },
      {
        "english": "since",
        "french": "depuis"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "turn on",
        "french": "allumer"
      },
      {
        "english": "turn off",
        "french": "éteindre"
      },
      {
        "english": "yesterday",
        "french": "hier"
      },
      {
        "english": "visited",
        "french": "a rendu visite"
      }
    ],
    "speakingPrompt": "I have visited London twice.",
    "readingText": "Emma has visited London twice, but she has never been to Dublin. Last year, she went to Edinburgh.",
    "exercises": [
      {
        "id": "b1-1-q1",
        "kind": "choice",
        "prompt": "Complète : “She ___ finished.”",
        "answer": "has",
        "explanation": "Have/has + participe passé relie une expérience passée au présent : I have visited London. Past Simple situe souvent une action datée : I visited London in 2020.",
        "options": [
          "has",
          "have",
          "is",
          "did"
        ]
      },
      {
        "id": "b1-1-q2",
        "kind": "fill",
        "prompt": "I have ___ London twice.",
        "answer": "visited",
        "explanation": "Forme attendue : « visited ». Have/has + participe passé relie une expérience passée au présent : I have visited London. Past Simple situe souvent une action datée : I visited London in 2020."
      },
      {
        "id": "b1-1-q3",
        "kind": "translate",
        "prompt": "J’ai visité Londres deux fois.",
        "answer": "I have visited London twice.",
        "explanation": "Traduction modèle : I have visited London twice."
      },
      {
        "id": "b1-1-q4",
        "kind": "reading",
        "prompt": "Dans quelle ville Emma n’est-elle jamais allée ?",
        "answer": "Dublin",
        "explanation": "Relis le passage : Emma has visited London twice, but she has never been to Dublin. Last year, she went to Edinburgh.",
        "options": [
          "Dublin",
          "Londres",
          "Édimbourg",
          "Paris"
        ],
        "context": "Emma has visited London twice, but she has never been to Dublin. Last year, she went to Edinburgh."
      },
      {
        "id": "b1-1-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "J’ai visité Londres deux fois.",
        "explanation": "La phrase entendue signifie : J’ai visité Londres deux fois.",
        "options": [
          "C’est une pomme.",
          "J’ai visité Londres deux fois.",
          "Nous devons examiner l’incident.",
          "Nous devons effectuer un examen."
        ],
        "audio": "I have visited London twice."
      }
    ]
  },
  {
    "id": "b1-2",
    "level": "B1",
    "index": 16,
    "title": "Past Continuous et raconter une histoire",
    "focus": [
      "temps",
      "verbes",
      "reading",
      "writing"
    ],
    "xp": 35,
    "lessonId": 6116,
    "description": "Was/were + verbe-ing décrit une action en cours à un moment du passé : I was cooking when he called.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Past Continuous",
        "explanation": "Was/were + verbe-ing décrit une action en cours à un moment du passé : I was cooking when he called.",
        "english": "I was reading when she called.",
        "french": "Je lisais quand elle a appelé."
      },
      {
        "category": "Notion complémentaire",
        "title": "While / when",
        "explanation": "While introduit volontiers une action longue ; when introduit souvent un événement ponctuel.",
        "english": "While I was cooking, the phone rang.",
        "french": "Pendant que je cuisinais, le téléphone a sonné."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "Dans un récit, l’intonation peut mettre en valeur une rupture : I WAS reading when she CALLED.",
        "english": "I was reading when she called.",
        "french": "Je lisais quand elle a appelé."
      }
    ],
    "vocabulary": [
      {
        "english": "while",
        "french": "pendant que"
      },
      {
        "english": "when",
        "french": "quand"
      },
      {
        "english": "suddenly",
        "french": "soudain"
      },
      {
        "english": "called",
        "french": "a appelé"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "already",
        "french": "déjà"
      },
      {
        "english": "yet",
        "french": "encore/pas encore"
      },
      {
        "english": "tomorrow",
        "french": "demain"
      },
      {
        "english": "travel",
        "french": "voyager"
      }
    ],
    "speakingPrompt": "I was reading when she called.",
    "readingText": "It was raining when Nora left the office. She was carrying an umbrella, but she forgot her keys.",
    "exercises": [
      {
        "id": "b1-2-q1",
        "kind": "choice",
        "prompt": "Complète : “They ___ sleeping when I arrived.”",
        "answer": "were",
        "explanation": "Was/were + verbe-ing décrit une action en cours à un moment du passé : I was cooking when he called.",
        "options": [
          "were",
          "was",
          "are",
          "have"
        ]
      },
      {
        "id": "b1-2-q2",
        "kind": "fill",
        "prompt": "I was ___ when she called.",
        "answer": "reading",
        "explanation": "Forme attendue : « reading ». Was/were + verbe-ing décrit une action en cours à un moment du passé : I was cooking when he called."
      },
      {
        "id": "b1-2-q3",
        "kind": "translate",
        "prompt": "Je lisais quand elle a appelé.",
        "answer": "I was reading when she called.",
        "explanation": "Traduction modèle : I was reading when she called."
      },
      {
        "id": "b1-2-q4",
        "kind": "reading",
        "prompt": "Qu’a oublié Nora ?",
        "answer": "Ses clés",
        "explanation": "Relis le passage : It was raining when Nora left the office. She was carrying an umbrella, but she forgot her keys.",
        "options": [
          "Ses clés",
          "Son téléphone",
          "Son parapluie",
          "Son badge"
        ],
        "context": "It was raining when Nora left the office. She was carrying an umbrella, but she forgot her keys."
      },
      {
        "id": "b1-2-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Je lisais quand elle a appelé.",
        "explanation": "La phrase entendue signifie : Je lisais quand elle a appelé.",
        "options": [
          "Je lisais quand elle a appelé.",
          "Si j’avais su, j’aurais aidé.",
          "Nous vous serions reconnaissants de votre aide.",
          "Deux petits chats sont ici."
        ],
        "audio": "I was reading when she called."
      }
    ]
  },
  {
    "id": "b1-3",
    "level": "B1",
    "index": 17,
    "title": "First conditional, suggestions et projets",
    "focus": [
      "grammaire",
      "temps",
      "speaking",
      "english-for-work"
    ],
    "xp": 35,
    "lessonId": 6117,
    "description": "If + présent simple, will + base verbale : If it rains, we will stay home. Il sert à parler d’une possibilité réelle dans l’avenir.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "First conditional",
        "explanation": "If + présent simple, will + base verbale : If it rains, we will stay home. Il sert à parler d’une possibilité réelle dans l’avenir.",
        "english": "If I study, I will pass.",
        "french": "Si j’étudie, je réussirai."
      },
      {
        "category": "Notion complémentaire",
        "title": "Suggestions",
        "explanation": "We could…, Why don’t we…?, Let’s… sont trois façons de proposer une action.",
        "english": "Let’s review the lesson.",
        "french": "Révisons la leçon."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "Dans une proposition if, évite “if it will rain” pour exprimer une condition ordinaire.",
        "english": "If I study, I will pass.",
        "french": "Si j’étudie, je réussirai."
      }
    ],
    "vocabulary": [
      {
        "english": "if",
        "french": "si"
      },
      {
        "english": "unless",
        "french": "à moins que"
      },
      {
        "english": "pass",
        "french": "réussir"
      },
      {
        "english": "prepare",
        "french": "préparer"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "while",
        "french": "pendant que"
      },
      {
        "english": "when",
        "french": "quand"
      },
      {
        "english": "now",
        "french": "maintenant"
      },
      {
        "english": "reading",
        "french": "en train de lire"
      }
    ],
    "speakingPrompt": "If I study, I will pass.",
    "readingText": "The team has a presentation tomorrow. If everyone prepares, the meeting will go well.",
    "exercises": [
      {
        "id": "b1-3-q1",
        "kind": "choice",
        "prompt": "Quelle phrase est correcte ?",
        "answer": "If it rains, I will stay home.",
        "explanation": "If + présent simple, will + base verbale : If it rains, we will stay home. Il sert à parler d’une possibilité réelle dans l’avenir.",
        "options": [
          "If it rains, I will stay home.",
          "If it will rain, I stay home.",
          "If rains, will I home.",
          "If it rain, I staying."
        ]
      },
      {
        "id": "b1-3-q2",
        "kind": "fill",
        "prompt": "If I study, I ___ pass.",
        "answer": "will",
        "explanation": "Forme attendue : « will ». If + présent simple, will + base verbale : If it rains, we will stay home. Il sert à parler d’une possibilité réelle dans l’avenir."
      },
      {
        "id": "b1-3-q3",
        "kind": "translate",
        "prompt": "Si j’étudie, je réussirai.",
        "answer": "If I study, I will pass.",
        "explanation": "Traduction modèle : If I study, I will pass."
      },
      {
        "id": "b1-3-q4",
        "kind": "reading",
        "prompt": "Que doit faire l’équipe pour que la réunion se passe bien ?",
        "answer": "Se préparer",
        "explanation": "Relis le passage : The team has a presentation tomorrow. If everyone prepares, the meeting will go well.",
        "options": [
          "Se préparer",
          "Annuler",
          "Partir",
          "Attendre"
        ],
        "context": "The team has a presentation tomorrow. If everyone prepares, the meeting will go well."
      },
      {
        "id": "b1-3-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Si j’étudie, je réussirai.",
        "explanation": "La phrase entendue signifie : Si j’étudie, je réussirai.",
        "options": [
          "L’ingénieur dont l’ordinateur est tombé en panne a appelé le support.",
          "Je veux comprendre les détails.",
          "Je travaille tous les jours.",
          "Si j’étudie, je réussirai."
        ],
        "audio": "If I study, I will pass."
      }
    ]
  },
  {
    "id": "b1-4",
    "level": "B1",
    "index": 18,
    "title": "Pronoms relatifs et description",
    "focus": [
      "pronoms",
      "grammaire",
      "adjectifs",
      "reading"
    ],
    "xp": 35,
    "lessonId": 6118,
    "description": "Who renvoie généralement à une personne ; which à une chose ; that peut remplacer who/which dans beaucoup de relatives définissantes.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Relative clauses",
        "explanation": "Who renvoie généralement à une personne ; which à une chose ; that peut remplacer who/which dans beaucoup de relatives définissantes.",
        "english": "The woman who called is my teacher.",
        "french": "La femme qui a appelé est ma professeure."
      },
      {
        "category": "Notion complémentaire",
        "title": "Autres pronoms",
        "explanation": "Mine, yours, hers sont possessifs autonomes ; myself, yourself, ourselves sont réfléchis.",
        "english": "This notebook is mine.",
        "french": "Ce cahier est le mien."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "Une proposition relative apporte une précision. Fais une légère pause à l’oral seulement si la structure l’exige.",
        "english": "The woman who called is my teacher.",
        "french": "La femme qui a appelé est ma professeure."
      }
    ],
    "vocabulary": [
      {
        "english": "who",
        "french": "qui (personne)"
      },
      {
        "english": "which",
        "french": "qui/que (chose)"
      },
      {
        "english": "whose",
        "french": "dont/à qui"
      },
      {
        "english": "that",
        "french": "qui/que"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "if",
        "french": "si"
      },
      {
        "english": "unless",
        "french": "à moins que"
      },
      {
        "english": "better",
        "french": "meilleur"
      },
      {
        "english": "worse",
        "french": "pire"
      }
    ],
    "speakingPrompt": "The woman who called is my teacher.",
    "readingText": "Leo has a friend who works in a hospital. She uses a laptop that belongs to the hospital.",
    "exercises": [
      {
        "id": "b1-4-q1",
        "kind": "choice",
        "prompt": "Complète : “The person ___ helped me is kind.”",
        "answer": "who",
        "explanation": "Who renvoie généralement à une personne ; which à une chose ; that peut remplacer who/which dans beaucoup de relatives définissantes.",
        "options": [
          "who",
          "where",
          "when",
          "whose"
        ]
      },
      {
        "id": "b1-4-q2",
        "kind": "fill",
        "prompt": "The woman ___ called is my teacher.",
        "answer": "who",
        "explanation": "Forme attendue : « who ». Who renvoie généralement à une personne ; which à une chose ; that peut remplacer who/which dans beaucoup de relatives définissantes."
      },
      {
        "id": "b1-4-q3",
        "kind": "translate",
        "prompt": "La femme qui a appelé est ma professeure.",
        "answer": "The woman who called is my teacher.",
        "explanation": "Traduction modèle : The woman who called is my teacher."
      },
      {
        "id": "b1-4-q4",
        "kind": "reading",
        "prompt": "Où travaille l’amie de Leo ?",
        "answer": "Dans un hôpital",
        "explanation": "Relis le passage : Leo has a friend who works in a hospital. She uses a laptop that belongs to the hospital.",
        "options": [
          "Dans un hôpital",
          "Dans une école",
          "Dans une banque",
          "Dans un magasin"
        ],
        "context": "Leo has a friend who works in a hospital. She uses a laptop that belongs to the hospital."
      },
      {
        "id": "b1-4-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "La femme qui a appelé est ma professeure.",
        "explanation": "La phrase entendue signifie : La femme qui a appelé est ma professeure.",
        "options": [
          "Les éléments indiquent une amélioration possible.",
          "C’est ma sœur.",
          "La femme qui a appelé est ma professeure.",
          "Jamais je n’ai vu un tel résultat."
        ],
        "audio": "The woman who called is my teacher."
      }
    ]
  },
  {
    "id": "b1-5",
    "level": "B1",
    "index": 19,
    "title": "Emails professionnels et présentations",
    "focus": [
      "english-for-work",
      "writing",
      "speaking",
      "vocabulaire"
    ],
    "xp": 35,
    "lessonId": 6119,
    "description": "Indique ton objet, formule une demande claire et termine poliment. Could you please…? est utile pour demander une action.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Email professionnel",
        "explanation": "Indique ton objet, formule une demande claire et termine poliment. Could you please…? est utile pour demander une action.",
        "english": "Could you send me the report?",
        "french": "Pourriez-vous m’envoyer le rapport ?"
      },
      {
        "category": "Notion complémentaire",
        "title": "Telephone English",
        "explanation": "Pour vérifier une information au téléphone : Could you repeat that, please? Pour fixer un rendez-vous : Are you available on Friday?",
        "english": "Are you available tomorrow?",
        "french": "Êtes-vous disponible demain ?"
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "Dans une présentation, signale les étapes : First…, Next…, Finally… pour guider l’auditeur.",
        "english": "Could you send me the report?",
        "french": "Pourriez-vous m’envoyer le rapport ?"
      }
    ],
    "vocabulary": [
      {
        "english": "deadline",
        "french": "date limite"
      },
      {
        "english": "report",
        "french": "rapport"
      },
      {
        "english": "attachment",
        "french": "pièce jointe"
      },
      {
        "english": "agenda",
        "french": "ordre du jour"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "who",
        "french": "qui (personne)"
      },
      {
        "english": "which",
        "french": "qui/que (chose)"
      },
      {
        "english": "turn on",
        "french": "allumer"
      },
      {
        "english": "turn off",
        "french": "éteindre"
      }
    ],
    "speakingPrompt": "Could you send me the report?",
    "readingText": "At work, Alice prepares the agenda for Friday’s meeting. She sends the report and asks her manager for feedback.",
    "exercises": [
      {
        "id": "b1-5-q1",
        "kind": "choice",
        "prompt": "Quelle formule est la plus polie ?",
        "answer": "Could you please send the file?",
        "explanation": "Indique ton objet, formule une demande claire et termine poliment. Could you please…? est utile pour demander une action.",
        "options": [
          "Could you please send the file?",
          "Send file now!",
          "You must send me now.",
          "Give file!"
        ]
      },
      {
        "id": "b1-5-q2",
        "kind": "fill",
        "prompt": "Could you ___ me the report?",
        "answer": "send",
        "explanation": "Forme attendue : « send ». Indique ton objet, formule une demande claire et termine poliment. Could you please…? est utile pour demander une action."
      },
      {
        "id": "b1-5-q3",
        "kind": "translate",
        "prompt": "Pourriez-vous m’envoyer le rapport ?",
        "answer": "Could you send me the report?",
        "explanation": "Traduction modèle : Could you send me the report?"
      },
      {
        "id": "b1-5-q4",
        "kind": "reading",
        "prompt": "Quel document Alice prépare-t-elle pour la réunion ?",
        "answer": "L’ordre du jour",
        "explanation": "Relis le passage : At work, Alice prepares the agenda for Friday’s meeting. She sends the report and asks her manager for feedback.",
        "options": [
          "L’ordre du jour",
          "Un contrat",
          "Une facture",
          "Un ticket"
        ],
        "context": "At work, Alice prepares the agenda for Friday’s meeting. She sends the report and asks her manager for feedback."
      },
      {
        "id": "b1-5-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Pourriez-vous m’envoyer le rapport ?",
        "explanation": "La phrase entendue signifie : Pourriez-vous m’envoyer le rapport ?",
        "options": [
          "Aimes-tu le café ?",
          "Pourriez-vous m’envoyer le rapport ?",
          "Bien que ce soit cher, c’est fiable.",
          "Nous évaluons l’impact et communiquerons des mises à jour."
        ],
        "audio": "Could you send me the report?"
      }
    ]
  },
  {
    "id": "b2-1",
    "level": "B2",
    "index": 20,
    "title": "Passive voice : décrire un processus",
    "focus": [
      "grammaire",
      "temps",
      "english-for-work",
      "writing"
    ],
    "xp": 40,
    "lessonId": 6120,
    "description": "Be + participe passé met l’accent sur l’action ou le résultat : The server was updated. L’agent peut être ajouté avec by.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Voix passive",
        "explanation": "Be + participe passé met l’accent sur l’action ou le résultat : The server was updated. L’agent peut être ajouté avec by.",
        "english": "The server was updated yesterday.",
        "french": "Le serveur a été mis à jour hier."
      },
      {
        "category": "Notion complémentaire",
        "title": "Present passive",
        "explanation": "Pour une action habituelle : is/are + participe passé.",
        "english": "Logs are collected every day.",
        "french": "Les journaux sont collectés tous les jours."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "À l’oral technique, la voix passive sert à décrire les changements de manière neutre.",
        "english": "The server was updated yesterday.",
        "french": "Le serveur a été mis à jour hier."
      }
    ],
    "vocabulary": [
      {
        "english": "server",
        "french": "serveur"
      },
      {
        "english": "updated",
        "french": "mis à jour"
      },
      {
        "english": "deployed",
        "french": "déployé"
      },
      {
        "english": "tested",
        "french": "testé"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "deadline",
        "french": "date limite"
      },
      {
        "english": "report",
        "french": "rapport"
      },
      {
        "english": "already",
        "french": "déjà"
      },
      {
        "english": "yet",
        "french": "encore/pas encore"
      }
    ],
    "speakingPrompt": "The server was updated yesterday.",
    "readingText": "The application was deployed on Monday. It was tested on Tuesday and released on Wednesday.",
    "exercises": [
      {
        "id": "b2-1-q1",
        "kind": "choice",
        "prompt": "Choisis une forme passive correcte :",
        "answer": "The file was uploaded.",
        "explanation": "Be + participe passé met l’accent sur l’action ou le résultat : The server was updated. L’agent peut être ajouté avec by.",
        "options": [
          "The file was uploaded.",
          "The file uploaded was.",
          "The file is upload yesterday.",
          "The file was upload."
        ]
      },
      {
        "id": "b2-1-q2",
        "kind": "fill",
        "prompt": "The server was ___ yesterday.",
        "answer": "updated",
        "explanation": "Forme attendue : « updated ». Be + participe passé met l’accent sur l’action ou le résultat : The server was updated. L’agent peut être ajouté avec by."
      },
      {
        "id": "b2-1-q3",
        "kind": "translate",
        "prompt": "Le serveur a été mis à jour hier.",
        "answer": "The server was updated yesterday.",
        "explanation": "Traduction modèle : The server was updated yesterday."
      },
      {
        "id": "b2-1-q4",
        "kind": "reading",
        "prompt": "Quel jour l’application a-t-elle été testée ?",
        "answer": "Mardi",
        "explanation": "Relis le passage : The application was deployed on Monday. It was tested on Tuesday and released on Wednesday.",
        "options": [
          "Mardi",
          "Lundi",
          "Mercredi",
          "Jeudi"
        ],
        "context": "The application was deployed on Monday. It was tested on Tuesday and released on Wednesday."
      },
      {
        "id": "b2-1-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Le serveur a été mis à jour hier.",
        "explanation": "La phrase entendue signifie : Le serveur a été mis à jour hier.",
        "options": [
          "Le serveur a été mis à jour hier.",
          "Nous devons effectuer un examen.",
          "Le problème a été résolu, mais la surveillance continue.",
          "Elle parle lentement."
        ],
        "audio": "The server was updated yesterday."
      }
    ]
  },
  {
    "id": "b2-2",
    "level": "B2",
    "index": 21,
    "title": "Reported speech et discours indirect",
    "focus": [
      "grammaire",
      "temps",
      "pronoms",
      "common-confusions"
    ],
    "xp": 40,
    "lessonId": 6121,
    "description": "Après said au passé, on recule souvent le temps : “I am tired” → She said she was tired. Les pronoms et repères temporels peuvent changer.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Reported speech",
        "explanation": "Après said au passé, on recule souvent le temps : “I am tired” → She said she was tired. Les pronoms et repères temporels peuvent changer.",
        "english": "She said she was tired.",
        "french": "Elle a dit qu’elle était fatiguée."
      },
      {
        "category": "Notion complémentaire",
        "title": "Say vs tell",
        "explanation": "Say peut être utilisé sans personne après ; tell demande souvent un destinataire : tell me, tell her.",
        "english": "She told me the truth.",
        "french": "Elle m’a dit la vérité."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "En discours indirect, on raconte l’information sans répéter les paroles exactes.",
        "english": "She said she was tired.",
        "french": "Elle a dit qu’elle était fatiguée."
      }
    ],
    "vocabulary": [
      {
        "english": "said",
        "french": "a dit"
      },
      {
        "english": "told",
        "french": "a dit à"
      },
      {
        "english": "reported",
        "french": "a rapporté"
      },
      {
        "english": "explained",
        "french": "a expliqué"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "server",
        "french": "serveur"
      },
      {
        "english": "updated",
        "french": "mis à jour"
      },
      {
        "english": "while",
        "french": "pendant que"
      },
      {
        "english": "when",
        "french": "quand"
      }
    ],
    "speakingPrompt": "She said she was tired.",
    "readingText": "David said he was busy and could not join the meeting. Later, he sent an email with his notes.",
    "exercises": [
      {
        "id": "b2-2-q1",
        "kind": "choice",
        "prompt": "Complète : “He said he ___ busy.”",
        "answer": "was",
        "explanation": "Après said au passé, on recule souvent le temps : “I am tired” → She said she was tired. Les pronoms et repères temporels peuvent changer.",
        "options": [
          "was",
          "is",
          "were",
          "be"
        ]
      },
      {
        "id": "b2-2-q2",
        "kind": "fill",
        "prompt": "She said she ___ tired.",
        "answer": "was",
        "explanation": "Forme attendue : « was ». Après said au passé, on recule souvent le temps : “I am tired” → She said she was tired. Les pronoms et repères temporels peuvent changer."
      },
      {
        "id": "b2-2-q3",
        "kind": "translate",
        "prompt": "Elle a dit qu’elle était fatiguée.",
        "answer": "She said she was tired.",
        "explanation": "Traduction modèle : She said she was tired."
      },
      {
        "id": "b2-2-q4",
        "kind": "reading",
        "prompt": "Pourquoi David n’a-t-il pas assisté à la réunion ?",
        "answer": "Il était occupé",
        "explanation": "Relis le passage : David said he was busy and could not join the meeting. Later, he sent an email with his notes.",
        "options": [
          "Il était occupé",
          "Il était malade",
          "Il voyageait",
          "Il avait oublié"
        ],
        "context": "David said he was busy and could not join the meeting. Later, he sent an email with his notes."
      },
      {
        "id": "b2-2-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Elle a dit qu’elle était fatiguée.",
        "explanation": "La phrase entendue signifie : Elle a dit qu’elle était fatiguée.",
        "options": [
          "Nous vous serions reconnaissants de votre aide.",
          "Je suis Lina.",
          "Les clés sont sur la table.",
          "Elle a dit qu’elle était fatiguée."
        ],
        "audio": "She said she was tired."
      }
    ]
  },
  {
    "id": "b2-3",
    "level": "B2",
    "index": 22,
    "title": "Second conditional et hypothèses",
    "focus": [
      "grammaire",
      "temps",
      "speaking",
      "writing"
    ],
    "xp": 40,
    "lessonId": 6122,
    "description": "If + prétérit, would + base verbale décrit une situation imaginaire ou peu probable : If I had time, I would travel.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Second conditional",
        "explanation": "If + prétérit, would + base verbale décrit une situation imaginaire ou peu probable : If I had time, I would travel.",
        "english": "If I had time, I would travel.",
        "french": "Si j’avais le temps, je voyagerais."
      },
      {
        "category": "Notion complémentaire",
        "title": "Conditional 0/1/2",
        "explanation": "Zero : vérité générale (If you heat ice, it melts) ; first : possibilité réelle ; second : hypothèse.",
        "english": "If water freezes, it becomes ice.",
        "french": "Si l’eau gèle, elle devient de la glace."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "À l’oral, would se contracte souvent en ’d : I’d travel. Repère le contexte pour éviter de confondre avec had.",
        "english": "If I had time, I would travel.",
        "french": "Si j’avais le temps, je voyagerais."
      }
    ],
    "vocabulary": [
      {
        "english": "would",
        "french": "conditionnel"
      },
      {
        "english": "could",
        "french": "pourrait"
      },
      {
        "english": "possible",
        "french": "possible"
      },
      {
        "english": "imaginary",
        "french": "imaginaire"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "said",
        "french": "a dit"
      },
      {
        "english": "told",
        "french": "a dit à"
      },
      {
        "english": "if",
        "french": "si"
      },
      {
        "english": "unless",
        "french": "à moins que"
      }
    ],
    "speakingPrompt": "If I had time, I would travel.",
    "readingText": "Maya loves mountains. If she had more free time, she would hike every weekend. For now, she works on Saturdays.",
    "exercises": [
      {
        "id": "b2-3-q1",
        "kind": "choice",
        "prompt": "Complète : “If I were rich, I ___ travel.”",
        "answer": "would",
        "explanation": "If + prétérit, would + base verbale décrit une situation imaginaire ou peu probable : If I had time, I would travel.",
        "options": [
          "would",
          "will",
          "am",
          "do"
        ]
      },
      {
        "id": "b2-3-q2",
        "kind": "fill",
        "prompt": "If I had time, I ___ travel.",
        "answer": "would",
        "explanation": "Forme attendue : « would ». If + prétérit, would + base verbale décrit une situation imaginaire ou peu probable : If I had time, I would travel."
      },
      {
        "id": "b2-3-q3",
        "kind": "translate",
        "prompt": "Si j’avais le temps, je voyagerais.",
        "answer": "If I had time, I would travel.",
        "explanation": "Traduction modèle : If I had time, I would travel."
      },
      {
        "id": "b2-3-q4",
        "kind": "reading",
        "prompt": "Pourquoi Maya ne marche-t-elle pas tous les week-ends ?",
        "answer": "Elle travaille le samedi",
        "explanation": "Relis le passage : Maya loves mountains. If she had more free time, she would hike every weekend. For now, she works on Saturdays.",
        "options": [
          "Elle travaille le samedi",
          "Elle déteste les montagnes",
          "Elle est malade",
          "Elle voyage toujours"
        ],
        "context": "Maya loves mountains. If she had more free time, she would hike every weekend. For now, she works on Saturdays."
      },
      {
        "id": "b2-3-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Si j’avais le temps, je voyagerais.",
        "explanation": "La phrase entendue signifie : Si j’avais le temps, je voyagerais.",
        "options": [
          "C’est une pomme.",
          "Je voudrais de l’eau.",
          "Si j’avais le temps, je voyagerais.",
          "Je veux comprendre les détails."
        ],
        "audio": "If I had time, I would travel."
      }
    ]
  },
  {
    "id": "b2-4",
    "level": "B2",
    "index": 23,
    "title": "Modal verbs et conseils nuancés",
    "focus": [
      "grammaire",
      "adjectifs",
      "speaking",
      "common-confusions"
    ],
    "xp": 40,
    "lessonId": 6123,
    "description": "Must exprime une obligation forte ou une déduction ; might une possibilité ; should un conseil. Le sens dépend du contexte.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Must, might, should",
        "explanation": "Must exprime une obligation forte ou une déduction ; might une possibilité ; should un conseil. Le sens dépend du contexte.",
        "english": "You should check the logs.",
        "french": "Tu devrais vérifier les journaux."
      },
      {
        "category": "Notion complémentaire",
        "title": "Confusions affect/effect",
        "explanation": "Affect est souvent un verbe (influencer) ; effect un nom (effet).",
        "english": "This change may affect performance.",
        "french": "Ce changement peut influencer les performances."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "Dans une recommandation, should est généralement moins direct que must. L’intonation peut renforcer ou atténuer un conseil.",
        "english": "You should check the logs.",
        "french": "Tu devrais vérifier les journaux."
      }
    ],
    "vocabulary": [
      {
        "english": "must",
        "french": "doit"
      },
      {
        "english": "should",
        "french": "devrait"
      },
      {
        "english": "might",
        "french": "pourrait"
      },
      {
        "english": "logs",
        "french": "journaux"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "would",
        "french": "conditionnel"
      },
      {
        "english": "could",
        "french": "pourrait"
      },
      {
        "english": "who",
        "french": "qui (personne)"
      },
      {
        "english": "which",
        "french": "qui/que (chose)"
      }
    ],
    "speakingPrompt": "You should check the logs.",
    "readingText": "The website is slow. The engineer thinks the database might be overloaded. She suggests checking the logs first.",
    "exercises": [
      {
        "id": "b2-4-q1",
        "kind": "choice",
        "prompt": "Quel modal exprime une possibilité incertaine ?",
        "answer": "might",
        "explanation": "Must exprime une obligation forte ou une déduction ; might une possibilité ; should un conseil. Le sens dépend du contexte.",
        "options": [
          "might",
          "must",
          "cannot",
          "had"
        ]
      },
      {
        "id": "b2-4-q2",
        "kind": "fill",
        "prompt": "You ___ check the logs.",
        "answer": "should",
        "explanation": "Forme attendue : « should ». Must exprime une obligation forte ou une déduction ; might une possibilité ; should un conseil. Le sens dépend du contexte."
      },
      {
        "id": "b2-4-q3",
        "kind": "translate",
        "prompt": "Tu devrais vérifier les journaux.",
        "answer": "You should check the logs.",
        "explanation": "Traduction modèle : You should check the logs."
      },
      {
        "id": "b2-4-q4",
        "kind": "reading",
        "prompt": "Quelle vérification est conseillée en premier ?",
        "answer": "Les journaux",
        "explanation": "Relis le passage : The website is slow. The engineer thinks the database might be overloaded. She suggests checking the logs first.",
        "options": [
          "Les journaux",
          "L’imprimante",
          "La météo",
          "Le clavier"
        ],
        "context": "The website is slow. The engineer thinks the database might be overloaded. She suggests checking the logs first."
      },
      {
        "id": "b2-4-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Tu devrais vérifier les journaux.",
        "explanation": "La phrase entendue signifie : Tu devrais vérifier les journaux.",
        "options": [
          "Je vous écris au sujet de la réunion.",
          "Tu devrais vérifier les journaux.",
          "Les éléments indiquent une amélioration possible.",
          "Deux petits chats sont ici."
        ],
        "audio": "You should check the logs."
      }
    ]
  },
  {
    "id": "b2-5",
    "level": "B2",
    "index": 24,
    "title": "IT English : réunions et incidents",
    "focus": [
      "english-for-work",
      "vocabulaire",
      "reading",
      "phrasal-verbs"
    ],
    "xp": 40,
    "lessonId": 6124,
    "description": "Incident, outage, backup, deploy, rollback et root cause sont fréquents dans l’informatique. Une communication d’incident doit rester factuelle.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Anglais technique",
        "explanation": "Incident, outage, backup, deploy, rollback et root cause sont fréquents dans l’informatique. Une communication d’incident doit rester factuelle.",
        "english": "We need to investigate the incident.",
        "french": "Nous devons examiner l’incident."
      },
      {
        "category": "Notion complémentaire",
        "title": "En réunion",
        "explanation": "Pour demander une clarification : Could you clarify the root cause? Pour exprimer un désaccord poli : I see your point, however…",
        "english": "We are investigating the issue.",
        "french": "Nous examinons le problème."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "Distingue les sons de ship et sheep : une voyelle courte vs une voyelle longue, utiles pour la clarté à l’oral.",
        "english": "We need to investigate the incident.",
        "french": "Nous devons examiner l’incident."
      }
    ],
    "vocabulary": [
      {
        "english": "incident",
        "french": "incident"
      },
      {
        "english": "backup",
        "french": "sauvegarde"
      },
      {
        "english": "outage",
        "french": "panne"
      },
      {
        "english": "rollback",
        "french": "retour arrière"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "must",
        "french": "doit"
      },
      {
        "english": "should",
        "french": "devrait"
      },
      {
        "english": "deadline",
        "french": "date limite"
      },
      {
        "english": "report",
        "french": "rapport"
      }
    ],
    "speakingPrompt": "We need to investigate the incident.",
    "readingText": "At 9 a.m., the monitoring tool detected an outage. The team restored a backup and started an investigation.",
    "exercises": [
      {
        "id": "b2-5-q1",
        "kind": "choice",
        "prompt": "Que signifie “find out” ?",
        "answer": "Découvrir",
        "explanation": "Incident, outage, backup, deploy, rollback et root cause sont fréquents dans l’informatique. Une communication d’incident doit rester factuelle.",
        "options": [
          "Découvrir",
          "Sortir",
          "Monter",
          "Éteindre"
        ]
      },
      {
        "id": "b2-5-q2",
        "kind": "fill",
        "prompt": "We need to ___ the incident.",
        "answer": "investigate",
        "explanation": "Forme attendue : « investigate ». Incident, outage, backup, deploy, rollback et root cause sont fréquents dans l’informatique. Une communication d’incident doit rester factuelle."
      },
      {
        "id": "b2-5-q3",
        "kind": "translate",
        "prompt": "Nous devons examiner l’incident.",
        "answer": "We need to investigate the incident.",
        "explanation": "Traduction modèle : We need to investigate the incident."
      },
      {
        "id": "b2-5-q4",
        "kind": "reading",
        "prompt": "Que détecte l’outil de supervision ?",
        "answer": "Une panne",
        "explanation": "Relis le passage : At 9 a.m., the monitoring tool detected an outage. The team restored a backup and started an investigation.",
        "options": [
          "Une panne",
          "Une promotion",
          "Un entretien",
          "Une mise à jour"
        ],
        "context": "At 9 a.m., the monitoring tool detected an outage. The team restored a backup and started an investigation."
      },
      {
        "id": "b2-5-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Nous devons examiner l’incident.",
        "explanation": "La phrase entendue signifie : Nous devons examiner l’incident.",
        "options": [
          "Nous devons examiner l’incident.",
          "Nous évaluons l’impact et communiquerons des mises à jour.",
          "Je travaille tous les jours.",
          "Hier, j’ai rendu visite à mon ami."
        ],
        "audio": "We need to investigate the incident."
      }
    ]
  },
  {
    "id": "c1-1",
    "level": "C1",
    "index": 25,
    "title": "Third conditional et regrets",
    "focus": [
      "grammaire",
      "temps",
      "writing",
      "verbes"
    ],
    "xp": 45,
    "lessonId": 6125,
    "description": "If + past perfect, would have + participe passé parle d’un passé imaginaire : If I had known, I would have helped.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Third conditional",
        "explanation": "If + past perfect, would have + participe passé parle d’un passé imaginaire : If I had known, I would have helped.",
        "english": "If I had known, I would have helped.",
        "french": "Si j’avais su, j’aurais aidé."
      },
      {
        "category": "Notion complémentaire",
        "title": "Mixed conditionals",
        "explanation": "Ils relient un passé imaginaire à une conséquence présente : If I had studied, I would know more now.",
        "english": "If I had trained, I would be ready now.",
        "french": "Si je m’étais entraîné, je serais prêt maintenant."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "À l’oral, would have peut être réduit ; à l’écrit, conserve sa forme correcte, surtout dans un contexte professionnel.",
        "english": "If I had known, I would have helped.",
        "french": "Si j’avais su, j’aurais aidé."
      }
    ],
    "vocabulary": [
      {
        "english": "regret",
        "french": "regret"
      },
      {
        "english": "mistake",
        "french": "erreur"
      },
      {
        "english": "realize",
        "french": "se rendre compte"
      },
      {
        "english": "prevent",
        "french": "éviter"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "incident",
        "french": "incident"
      },
      {
        "english": "backup",
        "french": "sauvegarde"
      },
      {
        "english": "server",
        "french": "serveur"
      },
      {
        "english": "updated",
        "french": "mis à jour"
      }
    ],
    "speakingPrompt": "If I had known, I would have helped.",
    "readingText": "The release failed because the tests were skipped. If the team had run them, it might have spotted the problem.",
    "exercises": [
      {
        "id": "c1-1-q1",
        "kind": "choice",
        "prompt": "Complète : “If she had called, I ___ have answered.”",
        "answer": "would",
        "explanation": "If + past perfect, would have + participe passé parle d’un passé imaginaire : If I had known, I would have helped.",
        "options": [
          "would",
          "will",
          "do",
          "am"
        ]
      },
      {
        "id": "c1-1-q2",
        "kind": "fill",
        "prompt": "If I had known, I would have ___.",
        "answer": "helped",
        "explanation": "Forme attendue : « helped ». If + past perfect, would have + participe passé parle d’un passé imaginaire : If I had known, I would have helped."
      },
      {
        "id": "c1-1-q3",
        "kind": "translate",
        "prompt": "Si j’avais su, j’aurais aidé.",
        "answer": "If I had known, I would have helped.",
        "explanation": "Traduction modèle : If I had known, I would have helped."
      },
      {
        "id": "c1-1-q4",
        "kind": "reading",
        "prompt": "Pourquoi la mise en production a-t-elle échoué ?",
        "answer": "Les tests ont été sautés",
        "explanation": "Relis le passage : The release failed because the tests were skipped. If the team had run them, it might have spotted the problem.",
        "options": [
          "Les tests ont été sautés",
          "La réunion a été annulée",
          "Le réseau était rapide",
          "Le client était absent"
        ],
        "context": "The release failed because the tests were skipped. If the team had run them, it might have spotted the problem."
      },
      {
        "id": "c1-1-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Si j’avais su, j’aurais aidé.",
        "explanation": "La phrase entendue signifie : Si j’avais su, j’aurais aidé.",
        "options": [
          "Le problème a été résolu, mais la surveillance continue.",
          "C’est ma sœur.",
          "Je vais voyager demain.",
          "Si j’avais su, j’aurais aidé."
        ],
        "audio": "If I had known, I would have helped."
      }
    ]
  },
  {
    "id": "c1-2",
    "level": "C1",
    "index": 26,
    "title": "Relatives complexes et précision",
    "focus": [
      "grammaire",
      "pronoms",
      "writing",
      "reading"
    ],
    "xp": 45,
    "lessonId": 6126,
    "description": "Whose exprime la possession ; whereby signifie « par lequel » dans un registre formel ; des relatives non définissantes ajoutent une information secon…",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Relative clauses avancées",
        "explanation": "Whose exprime la possession ; whereby signifie « par lequel » dans un registre formel ; des relatives non définissantes ajoutent une information secondaire.",
        "english": "The engineer whose laptop broke called support.",
        "french": "L’ingénieur dont l’ordinateur est tombé en panne a appelé le support."
      },
      {
        "category": "Notion complémentaire",
        "title": "Connecteurs avancés",
        "explanation": "Whereas marque un contraste ; nevertheless introduit une concession ; therefore marque une conséquence.",
        "english": "The plan is expensive; nevertheless, it is useful.",
        "french": "Le projet coûte cher ; néanmoins, il est utile."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "Une relative non définissante est généralement encadrée de virgules à l’écrit et de pauses à l’oral.",
        "english": "The engineer whose laptop broke called support.",
        "french": "L’ingénieur dont l’ordinateur est tombé en panne a appelé le support."
      }
    ],
    "vocabulary": [
      {
        "english": "whose",
        "french": "dont"
      },
      {
        "english": "whereby",
        "french": "par lequel"
      },
      {
        "english": "whereas",
        "french": "alors que"
      },
      {
        "english": "nevertheless",
        "french": "néanmoins"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "regret",
        "french": "regret"
      },
      {
        "english": "mistake",
        "french": "erreur"
      },
      {
        "english": "said",
        "french": "a dit"
      },
      {
        "english": "told",
        "french": "a dit à"
      }
    ],
    "speakingPrompt": "The engineer whose laptop broke called support.",
    "readingText": "Our security team, which operates worldwide, published new guidelines. The policy applies to all employees.",
    "exercises": [
      {
        "id": "c1-2-q1",
        "kind": "choice",
        "prompt": "Quel relatif exprime ici la possession ? “The manager ___ team won.”",
        "answer": "whose",
        "explanation": "Whose exprime la possession ; whereby signifie « par lequel » dans un registre formel ; des relatives non définissantes ajoutent une information secondaire.",
        "options": [
          "whose",
          "who",
          "where",
          "when"
        ]
      },
      {
        "id": "c1-2-q2",
        "kind": "fill",
        "prompt": "The engineer ___ laptop broke called support.",
        "answer": "whose",
        "explanation": "Forme attendue : « whose ». Whose exprime la possession ; whereby signifie « par lequel » dans un registre formel ; des relatives non définissantes ajoutent une information secondaire."
      },
      {
        "id": "c1-2-q3",
        "kind": "translate",
        "prompt": "L’ingénieur dont l’ordinateur est tombé en panne a appelé le support.",
        "answer": "The engineer whose laptop broke called support.",
        "explanation": "Traduction modèle : The engineer whose laptop broke called support."
      },
      {
        "id": "c1-2-q4",
        "kind": "reading",
        "prompt": "À qui s’applique la politique ?",
        "answer": "À tous les employés",
        "explanation": "Relis le passage : Our security team, which operates worldwide, published new guidelines. The policy applies to all employees.",
        "options": [
          "À tous les employés",
          "Aux seuls directeurs",
          "Aux seuls stagiaires",
          "Aux visiteurs"
        ],
        "context": "Our security team, which operates worldwide, published new guidelines. The policy applies to all employees."
      },
      {
        "id": "c1-2-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "L’ingénieur dont l’ordinateur est tombé en panne a appelé le support.",
        "explanation": "La phrase entendue signifie : L’ingénieur dont l’ordinateur est tombé en panne a appelé le support.",
        "options": [
          "Aimes-tu le café ?",
          "Je lis un livre en ce moment.",
          "L’ingénieur dont l’ordinateur est tombé en panne a appelé le support.",
          "Je suis Lina."
        ],
        "audio": "The engineer whose laptop broke called support."
      }
    ]
  },
  {
    "id": "c1-3",
    "level": "C1",
    "index": 27,
    "title": "Inversion et emphase en anglais",
    "focus": [
      "grammaire",
      "orthographe",
      "writing",
      "prononciation"
    ],
    "xp": 45,
    "lessonId": 6127,
    "description": "Dans un registre formel : Never have I seen… ; Rarely do we… L’auxiliaire précède le sujet.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Inversion après un adverbe négatif",
        "explanation": "Dans un registre formel : Never have I seen… ; Rarely do we… L’auxiliaire précède le sujet.",
        "english": "Never have I seen such a result.",
        "french": "Jamais je n’ai vu un tel résultat."
      },
      {
        "category": "Notion complémentaire",
        "title": "Emphase avec do",
        "explanation": "Dans une affirmation, do peut renforcer le propos : I do understand your concern.",
        "english": "I do appreciate your help.",
        "french": "J’apprécie vraiment ton aide."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "Lors d’une présentation, l’emphase modifie la place de l’accent : NEVER have I seen such a result.",
        "english": "Never have I seen such a result.",
        "french": "Jamais je n’ai vu un tel résultat."
      }
    ],
    "vocabulary": [
      {
        "english": "rarely",
        "french": "rarement"
      },
      {
        "english": "hardly",
        "french": "à peine"
      },
      {
        "english": "never",
        "french": "jamais"
      },
      {
        "english": "seldom",
        "french": "rarement"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "whose",
        "french": "dont"
      },
      {
        "english": "whereby",
        "french": "par lequel"
      },
      {
        "english": "would",
        "french": "conditionnel"
      },
      {
        "english": "could",
        "french": "pourrait"
      }
    ],
    "speakingPrompt": "Never have I seen such a result.",
    "readingText": "The company rarely changes its security policy. However, after a major incident, the board approved a review.",
    "exercises": [
      {
        "id": "c1-3-q1",
        "kind": "choice",
        "prompt": "Choisis l’inversion correcte :",
        "answer": "Rarely do we see this.",
        "explanation": "Dans un registre formel : Never have I seen… ; Rarely do we… L’auxiliaire précède le sujet.",
        "options": [
          "Rarely do we see this.",
          "Rarely we do see this.",
          "Rarely does we see this.",
          "Rarely we see do this."
        ]
      },
      {
        "id": "c1-3-q2",
        "kind": "fill",
        "prompt": "Never ___ I seen such a result.",
        "answer": "have",
        "explanation": "Forme attendue : « have ». Dans un registre formel : Never have I seen… ; Rarely do we… L’auxiliaire précède le sujet."
      },
      {
        "id": "c1-3-q3",
        "kind": "translate",
        "prompt": "Jamais je n’ai vu un tel résultat.",
        "answer": "Never have I seen such a result.",
        "explanation": "Traduction modèle : Never have I seen such a result."
      },
      {
        "id": "c1-3-q4",
        "kind": "reading",
        "prompt": "Pourquoi la direction a-t-elle approuvé une révision ?",
        "answer": "À cause d’un incident majeur",
        "explanation": "Relis le passage : The company rarely changes its security policy. However, after a major incident, the board approved a review.",
        "options": [
          "À cause d’un incident majeur",
          "À cause des vacances",
          "Pour acheter des chaises",
          "Pour changer de logo"
        ],
        "context": "The company rarely changes its security policy. However, after a major incident, the board approved a review."
      },
      {
        "id": "c1-3-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Jamais je n’ai vu un tel résultat.",
        "explanation": "La phrase entendue signifie : Jamais je n’ai vu un tel résultat.",
        "options": [
          "Ce livre est meilleur que celui-là.",
          "Jamais je n’ai vu un tel résultat.",
          "C’est une pomme.",
          "Elle parle lentement."
        ],
        "audio": "Never have I seen such a result."
      }
    ]
  },
  {
    "id": "c1-4",
    "level": "C1",
    "index": 28,
    "title": "Connecteurs, nuance et argumentation",
    "focus": [
      "grammaire",
      "writing",
      "adjectifs",
      "english-for-work"
    ],
    "xp": 45,
    "lessonId": 6128,
    "description": "Although, even though, despite et however n’ont pas les mêmes constructions : despite + nom/verbe-ing ; although + proposition.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Concession et nuance",
        "explanation": "Although, even though, despite et however n’ont pas les mêmes constructions : despite + nom/verbe-ing ; although + proposition.",
        "english": "Although it is expensive, it is reliable.",
        "french": "Bien que ce soit cher, c’est fiable."
      },
      {
        "category": "Notion complémentaire",
        "title": "Condition de nuance",
        "explanation": "Les modaux may, might et could permettent d’éviter des affirmations trop catégoriques.",
        "english": "This change may reduce risk.",
        "french": "Ce changement pourrait réduire le risque."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "L’intonation aide à distinguer une concession d’une objection. Garde un ton calme dans un débat professionnel.",
        "english": "Although it is expensive, it is reliable.",
        "french": "Bien que ce soit cher, c’est fiable."
      }
    ],
    "vocabulary": [
      {
        "english": "although",
        "french": "bien que"
      },
      {
        "english": "despite",
        "french": "malgré"
      },
      {
        "english": "however",
        "french": "cependant"
      },
      {
        "english": "reliable",
        "french": "fiable"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "rarely",
        "french": "rarement"
      },
      {
        "english": "hardly",
        "french": "à peine"
      },
      {
        "english": "must",
        "french": "doit"
      },
      {
        "english": "should",
        "french": "devrait"
      }
    ],
    "speakingPrompt": "Although it is expensive, it is reliable.",
    "readingText": "The new platform is expensive. Nevertheless, the team chose it because its security controls are strong.",
    "exercises": [
      {
        "id": "c1-4-q1",
        "kind": "choice",
        "prompt": "Quelle construction est correcte ?",
        "answer": "Despite the rain, we left.",
        "explanation": "Although, even though, despite et however n’ont pas les mêmes constructions : despite + nom/verbe-ing ; although + proposition.",
        "options": [
          "Despite the rain, we left.",
          "Despite it was rain, we left.",
          "Although of the rain, we left.",
          "However the rain, we left."
        ]
      },
      {
        "id": "c1-4-q2",
        "kind": "fill",
        "prompt": "___ it is expensive, it is reliable.",
        "answer": "Although",
        "explanation": "Forme attendue : « Although ». Although, even though, despite et however n’ont pas les mêmes constructions : despite + nom/verbe-ing ; although + proposition."
      },
      {
        "id": "c1-4-q3",
        "kind": "translate",
        "prompt": "Bien que ce soit cher, c’est fiable.",
        "answer": "Although it is expensive, it is reliable.",
        "explanation": "Traduction modèle : Although it is expensive, it is reliable."
      },
      {
        "id": "c1-4-q4",
        "kind": "reading",
        "prompt": "Pourquoi l’équipe choisit-elle cette plateforme ?",
        "answer": "Pour ses contrôles de sécurité",
        "explanation": "Relis le passage : The new platform is expensive. Nevertheless, the team chose it because its security controls are strong.",
        "options": [
          "Pour ses contrôles de sécurité",
          "Pour sa couleur",
          "Pour son prix très faible",
          "Pour son logo"
        ],
        "context": "The new platform is expensive. Nevertheless, the team chose it because its security controls are strong."
      },
      {
        "id": "c1-4-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Bien que ce soit cher, c’est fiable.",
        "explanation": "La phrase entendue signifie : Bien que ce soit cher, c’est fiable.",
        "options": [
          "Bien que ce soit cher, c’est fiable.",
          "Deux petits chats sont ici.",
          "Les clés sont sur la table.",
          "Allume l’ordinateur, s’il te plaît."
        ],
        "audio": "Although it is expensive, it is reliable."
      }
    ]
  },
  {
    "id": "c1-5",
    "level": "C1",
    "index": 29,
    "title": "Phrasal verbs avancés et idiomes",
    "focus": [
      "phrasal-verbs",
      "vocabulaire",
      "common-confusions",
      "reading"
    ],
    "xp": 45,
    "lessonId": 6129,
    "description": "Carry out = réaliser ; put off = reporter ; come up with = trouver une idée ; look into = examiner. Certains sont séparables.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Phrasal verbs avancés",
        "explanation": "Carry out = réaliser ; put off = reporter ; come up with = trouver une idée ; look into = examiner. Certains sont séparables.",
        "english": "We need to carry out a review.",
        "french": "Nous devons effectuer un examen."
      },
      {
        "category": "Notion complémentaire",
        "title": "Idiomes",
        "explanation": "“On the same page” signifie être d’accord sur une compréhension partagée, pas être sur une page réelle.",
        "english": "We are on the same page.",
        "french": "Nous sommes d’accord sur l’essentiel."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "Dans les expressions idiomatiques, le rythme global compte davantage que chaque mot isolé.",
        "english": "We need to carry out a review.",
        "french": "Nous devons effectuer un examen."
      }
    ],
    "vocabulary": [
      {
        "english": "carry out",
        "french": "effectuer"
      },
      {
        "english": "put off",
        "french": "reporter"
      },
      {
        "english": "look into",
        "french": "examiner"
      },
      {
        "english": "come up with",
        "french": "imaginer"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "although",
        "french": "bien que"
      },
      {
        "english": "despite",
        "french": "malgré"
      },
      {
        "english": "incident",
        "french": "incident"
      },
      {
        "english": "backup",
        "french": "sauvegarde"
      }
    ],
    "speakingPrompt": "We need to carry out a review.",
    "readingText": "The team put off its launch by one week. Meanwhile, it carried out a full security review.",
    "exercises": [
      {
        "id": "c1-5-q1",
        "kind": "choice",
        "prompt": "Que signifie “look into an issue” ?",
        "answer": "Examiner un problème",
        "explanation": "Carry out = réaliser ; put off = reporter ; come up with = trouver une idée ; look into = examiner. Certains sont séparables.",
        "options": [
          "Examiner un problème",
          "Ignorer un problème",
          "Supprimer une équipe",
          "Acheter un objet"
        ]
      },
      {
        "id": "c1-5-q2",
        "kind": "fill",
        "prompt": "We need to carry ___ a review.",
        "answer": "out",
        "explanation": "Forme attendue : « out ». Carry out = réaliser ; put off = reporter ; come up with = trouver une idée ; look into = examiner. Certains sont séparables."
      },
      {
        "id": "c1-5-q3",
        "kind": "translate",
        "prompt": "Nous devons effectuer un examen.",
        "answer": "We need to carry out a review.",
        "explanation": "Traduction modèle : We need to carry out a review."
      },
      {
        "id": "c1-5-q4",
        "kind": "reading",
        "prompt": "De combien de temps le lancement a-t-il été repoussé ?",
        "answer": "D’une semaine",
        "explanation": "Relis le passage : The team put off its launch by one week. Meanwhile, it carried out a full security review.",
        "options": [
          "D’une semaine",
          "D’un mois",
          "D’un jour",
          "D’un an"
        ],
        "context": "The team put off its launch by one week. Meanwhile, it carried out a full security review."
      },
      {
        "id": "c1-5-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Nous devons effectuer un examen.",
        "explanation": "La phrase entendue signifie : Nous devons effectuer un examen.",
        "options": [
          "Je travaille tous les jours.",
          "Je voudrais de l’eau.",
          "J’ai visité Londres deux fois.",
          "Nous devons effectuer un examen."
        ],
        "audio": "We need to carry out a review."
      }
    ]
  },
  {
    "id": "c2-1",
    "level": "C2",
    "index": 30,
    "title": "Registre, synonymes et sens implicite",
    "focus": [
      "vocabulaire",
      "common-confusions",
      "writing",
      "grammaire"
    ],
    "xp": 50,
    "lessonId": 6130,
    "description": "Une même idée change selon le contexte : “help” est courant ; “assist” plus formel ; “facilitate” indique souvent qu’on rend une action plus facile.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Registre et précision",
        "explanation": "Une même idée change selon le contexte : “help” est courant ; “assist” plus formel ; “facilitate” indique souvent qu’on rend une action plus facile.",
        "english": "We would appreciate your assistance.",
        "french": "Nous vous serions reconnaissants de votre aide."
      },
      {
        "category": "Notion complémentaire",
        "title": "Faux amis et nuance",
        "explanation": "Actual signifie réel, et non actuel (current). Eventually signifie finalement, et non éventuellement (possibly).",
        "english": "The actual cost was higher.",
        "french": "Le coût réel était plus élevé."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "La politesse britannique peut utiliser des formulations indirectes. Le sens dépend du contexte, pas des seuls mots.",
        "english": "We would appreciate your assistance.",
        "french": "Nous vous serions reconnaissants de votre aide."
      }
    ],
    "vocabulary": [
      {
        "english": "assist",
        "french": "aider"
      },
      {
        "english": "facilitate",
        "french": "faciliter"
      },
      {
        "english": "subtle",
        "french": "subtil"
      },
      {
        "english": "implication",
        "french": "sous-entendu"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "carry out",
        "french": "effectuer"
      },
      {
        "english": "put off",
        "french": "reporter"
      },
      {
        "english": "regret",
        "french": "regret"
      },
      {
        "english": "mistake",
        "french": "erreur"
      }
    ],
    "speakingPrompt": "We would appreciate your assistance.",
    "readingText": "The director described the proposal as “interesting” but requested significant revisions before approval.",
    "exercises": [
      {
        "id": "c2-1-q1",
        "kind": "choice",
        "prompt": "Quelle formule convient le mieux à un email très formel ?",
        "answer": "We would appreciate your assistance.",
        "explanation": "Une même idée change selon le contexte : “help” est courant ; “assist” plus formel ; “facilitate” indique souvent qu’on rend une action plus facile.",
        "options": [
          "We would appreciate your assistance.",
          "Help us now!",
          "Give a hand, mate!",
          "Do it, okay?"
        ]
      },
      {
        "id": "c2-1-q2",
        "kind": "fill",
        "prompt": "We would appreciate your ___.",
        "answer": "assistance",
        "explanation": "Forme attendue : « assistance ». Une même idée change selon le contexte : “help” est courant ; “assist” plus formel ; “facilitate” indique souvent qu’on rend une action plus facile."
      },
      {
        "id": "c2-1-q3",
        "kind": "translate",
        "prompt": "Nous vous serions reconnaissants de votre aide.",
        "answer": "We would appreciate your assistance.",
        "explanation": "Traduction modèle : We would appreciate your assistance."
      },
      {
        "id": "c2-1-q4",
        "kind": "reading",
        "prompt": "Quelle est l’attitude du directeur ?",
        "answer": "Il demande des modifications avant validation",
        "explanation": "Relis le passage : The director described the proposal as “interesting” but requested significant revisions before approval.",
        "options": [
          "Il demande des modifications avant validation",
          "Il accepte sans changement",
          "Il annule le projet",
          "Il ne l’a pas lu"
        ],
        "context": "The director described the proposal as “interesting” but requested significant revisions before approval."
      },
      {
        "id": "c2-1-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Nous vous serions reconnaissants de votre aide.",
        "explanation": "La phrase entendue signifie : Nous vous serions reconnaissants de votre aide.",
        "options": [
          "Je vous écris au sujet de la réunion.",
          "Je lisais quand elle a appelé.",
          "Nous vous serions reconnaissants de votre aide.",
          "C’est ma sœur."
        ],
        "audio": "We would appreciate your assistance."
      }
    ]
  },
  {
    "id": "c2-2",
    "level": "C2",
    "index": 31,
    "title": "Écoute fine : accents, liaison et intonation",
    "focus": [
      "prononciation",
      "listening",
      "speaking",
      "vocabulaire"
    ],
    "xp": 50,
    "lessonId": 6131,
    "description": "À vitesse naturelle, les mots se lient : “want to” peut sonner comme “wanna” à l’oral familier. Il faut reconnaître ces formes sans les écrire dans un…",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Connected speech",
        "explanation": "À vitesse naturelle, les mots se lient : “want to” peut sonner comme “wanna” à l’oral familier. Il faut reconnaître ces formes sans les écrire dans un document formel.",
        "english": "I want to understand the details.",
        "french": "Je veux comprendre les détails."
      },
      {
        "category": "Notion complémentaire",
        "title": "Accentuation de phrase",
        "explanation": "Les mots porteurs d’information sont souvent accentués, les petits mots grammaticaux sont réduits.",
        "english": "I really need the final report.",
        "french": "J’ai vraiment besoin du rapport final."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "Les voyelles anglaises varient entre accents britanniques et américains. Travaille la compréhension de plusieurs locuteurs, sans supposer un accent unique.",
        "english": "I want to understand the details.",
        "french": "Je veux comprendre les détails."
      }
    ],
    "vocabulary": [
      {
        "english": "stress",
        "french": "accentuation"
      },
      {
        "english": "intonation",
        "french": "intonation"
      },
      {
        "english": "linking",
        "french": "liaison"
      },
      {
        "english": "accent",
        "french": "accent"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "assist",
        "french": "aider"
      },
      {
        "english": "facilitate",
        "french": "faciliter"
      },
      {
        "english": "whose",
        "french": "dont"
      },
      {
        "english": "whereby",
        "french": "par lequel"
      }
    ],
    "speakingPrompt": "I want to understand the details.",
    "readingText": "During the conference, two speakers explained the same idea in different accents. The audience understood both after a short discussion.",
    "exercises": [
      {
        "id": "c2-2-q1",
        "kind": "choice",
        "prompt": "Quelle phrase est écrite correctement dans un email professionnel ?",
        "answer": "I want to discuss the plan.",
        "explanation": "À vitesse naturelle, les mots se lient : “want to” peut sonner comme “wanna” à l’oral familier. Il faut reconnaître ces formes sans les écrire dans un document formel.",
        "options": [
          "I want to discuss the plan.",
          "I wanna discuss the plan.",
          "I want discuss plan.",
          "I wanting to discuss plan."
        ]
      },
      {
        "id": "c2-2-q2",
        "kind": "fill",
        "prompt": "I want to ___ the details.",
        "answer": "understand",
        "explanation": "Forme attendue : « understand ». À vitesse naturelle, les mots se lient : “want to” peut sonner comme “wanna” à l’oral familier. Il faut reconnaître ces formes sans les écrire dans un document formel."
      },
      {
        "id": "c2-2-q3",
        "kind": "translate",
        "prompt": "Je veux comprendre les détails.",
        "answer": "I want to understand the details.",
        "explanation": "Traduction modèle : I want to understand the details."
      },
      {
        "id": "c2-2-q4",
        "kind": "reading",
        "prompt": "Qu’est-ce qui différait entre les deux intervenants ?",
        "answer": "Leur accent",
        "explanation": "Relis le passage : During the conference, two speakers explained the same idea in different accents. The audience understood both after a short discussion.",
        "options": [
          "Leur accent",
          "Leur sujet",
          "Leur profession",
          "Leur langue"
        ],
        "context": "During the conference, two speakers explained the same idea in different accents. The audience understood both after a short discussion."
      },
      {
        "id": "c2-2-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Je veux comprendre les détails.",
        "explanation": "La phrase entendue signifie : Je veux comprendre les détails.",
        "options": [
          "Si j’étudie, je réussirai.",
          "Je veux comprendre les détails.",
          "Aimes-tu le café ?",
          "Hier, j’ai rendu visite à mon ami."
        ],
        "audio": "I want to understand the details."
      }
    ]
  },
  {
    "id": "c2-3",
    "level": "C2",
    "index": 32,
    "title": "Lecture critique et preuves",
    "focus": [
      "reading",
      "writing",
      "english-for-work",
      "grammaire"
    ],
    "xp": 50,
    "lessonId": 6132,
    "description": "Distingue fait, hypothèse, opinion et preuve. “The data suggest” est plus prudent que “The data prove”. Cherche les limites de l’argument.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Lire de manière critique",
        "explanation": "Distingue fait, hypothèse, opinion et preuve. “The data suggest” est plus prudent que “The data prove”. Cherche les limites de l’argument.",
        "english": "The evidence suggests a possible improvement.",
        "french": "Les éléments indiquent une amélioration possible."
      },
      {
        "category": "Notion complémentaire",
        "title": "Citation et synthèse",
        "explanation": "Reformule fidèlement, sans changer le niveau de certitude de la source.",
        "english": "According to the report, the risk may increase.",
        "french": "Selon le rapport, le risque pourrait augmenter."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "L’intonation de “possibly”, “apparently” ou “allegedly” signale une réserve qu’il faut entendre.",
        "english": "The evidence suggests a possible improvement.",
        "french": "Les éléments indiquent une amélioration possible."
      }
    ],
    "vocabulary": [
      {
        "english": "evidence",
        "french": "preuve/éléments"
      },
      {
        "english": "claim",
        "french": "affirmation"
      },
      {
        "english": "bias",
        "french": "biais"
      },
      {
        "english": "source",
        "french": "source"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "stress",
        "french": "accentuation"
      },
      {
        "english": "intonation",
        "french": "intonation"
      },
      {
        "english": "rarely",
        "french": "rarement"
      },
      {
        "english": "hardly",
        "french": "à peine"
      }
    ],
    "speakingPrompt": "The evidence suggests a possible improvement.",
    "readingText": "A report claims that a new tool reduces response time. However, the study covers only twelve users and has no control group.",
    "exercises": [
      {
        "id": "c2-3-q1",
        "kind": "choice",
        "prompt": "Quelle formule est la plus prudente ?",
        "answer": "The results may indicate a trend.",
        "explanation": "Distingue fait, hypothèse, opinion et preuve. “The data suggest” est plus prudent que “The data prove”. Cherche les limites de l’argument.",
        "options": [
          "The results may indicate a trend.",
          "The results prove everything.",
          "It is impossible to question this.",
          "Everyone knows the result."
        ]
      },
      {
        "id": "c2-3-q2",
        "kind": "fill",
        "prompt": "The evidence ___ a possible improvement.",
        "answer": "suggests",
        "explanation": "Forme attendue : « suggests ». Distingue fait, hypothèse, opinion et preuve. “The data suggest” est plus prudent que “The data prove”. Cherche les limites de l’argument."
      },
      {
        "id": "c2-3-q3",
        "kind": "translate",
        "prompt": "Les éléments indiquent une amélioration possible.",
        "answer": "The evidence suggests a possible improvement.",
        "explanation": "Traduction modèle : The evidence suggests a possible improvement."
      },
      {
        "id": "c2-3-q4",
        "kind": "reading",
        "prompt": "Quelle est une limite importante de l’étude ?",
        "answer": "Un petit échantillon sans groupe témoin",
        "explanation": "Relis le passage : A report claims that a new tool reduces response time. However, the study covers only twelve users and has no control group.",
        "options": [
          "Un petit échantillon sans groupe témoin",
          "Une étude menée sur mille personnes",
          "Trois groupes témoins",
          "Une année de suivi"
        ],
        "context": "A report claims that a new tool reduces response time. However, the study covers only twelve users and has no control group."
      },
      {
        "id": "c2-3-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Les éléments indiquent une amélioration possible.",
        "explanation": "La phrase entendue signifie : Les éléments indiquent une amélioration possible.",
        "options": [
          "Les éléments indiquent une amélioration possible.",
          "Elle parle lentement.",
          "Je vais voyager demain.",
          "La femme qui a appelé est ma professeure."
        ],
        "audio": "The evidence suggests a possible improvement."
      }
    ]
  },
  {
    "id": "c2-4",
    "level": "C2",
    "index": 33,
    "title": "Leadership technique et négociation",
    "focus": [
      "english-for-work",
      "speaking",
      "writing",
      "phrasal-verbs"
    ],
    "xp": 50,
    "lessonId": 6133,
    "description": "Annonce les faits établis, l’impact connu, les actions en cours et la prochaine mise à jour. Évite les promesses non vérifiées.",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Communication de crise",
        "explanation": "Annonce les faits établis, l’impact connu, les actions en cours et la prochaine mise à jour. Évite les promesses non vérifiées.",
        "english": "We are assessing the impact and will provide updates.",
        "french": "Nous évaluons l’impact et communiquerons des mises à jour."
      },
      {
        "category": "Notion complémentaire",
        "title": "Reformulation",
        "explanation": "“If I understand correctly…” permet de vérifier une décision sans interrompre la collaboration.",
        "english": "If I understand correctly, we need a rollback.",
        "french": "Si je comprends bien, nous devons revenir en arrière."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "En négociation, une intonation posée et une reformulation précise facilitent la compréhension mutuelle.",
        "english": "We are assessing the impact and will provide updates.",
        "french": "Nous évaluons l’impact et communiquerons des mises à jour."
      }
    ],
    "vocabulary": [
      {
        "english": "stakeholder",
        "french": "partie prenante"
      },
      {
        "english": "mitigation",
        "french": "atténuation"
      },
      {
        "english": "impact",
        "french": "impact"
      },
      {
        "english": "update",
        "french": "mise à jour"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "evidence",
        "french": "preuve/éléments"
      },
      {
        "english": "claim",
        "french": "affirmation"
      },
      {
        "english": "although",
        "french": "bien que"
      },
      {
        "english": "despite",
        "french": "malgré"
      }
    ],
    "speakingPrompt": "We are assessing the impact and will provide updates.",
    "readingText": "After an outage, the team informed stakeholders, described the known impact and scheduled an update for 3 p.m.",
    "exercises": [
      {
        "id": "c2-4-q1",
        "kind": "choice",
        "prompt": "Quelle phrase est la plus responsable pendant un incident ?",
        "answer": "We are investigating and will update you at 3 p.m.",
        "explanation": "Annonce les faits établis, l’impact connu, les actions en cours et la prochaine mise à jour. Évite les promesses non vérifiées.",
        "options": [
          "We are investigating and will update you at 3 p.m.",
          "Everything is fixed for sure!",
          "We have no idea, goodbye.",
          "There is never any risk."
        ]
      },
      {
        "id": "c2-4-q2",
        "kind": "fill",
        "prompt": "We are ___ the impact.",
        "answer": "assessing",
        "explanation": "Forme attendue : « assessing ». Annonce les faits établis, l’impact connu, les actions en cours et la prochaine mise à jour. Évite les promesses non vérifiées."
      },
      {
        "id": "c2-4-q3",
        "kind": "translate",
        "prompt": "Nous évaluons l’impact et communiquerons des mises à jour.",
        "answer": "We are assessing the impact and will provide updates.",
        "explanation": "Traduction modèle : We are assessing the impact and will provide updates."
      },
      {
        "id": "c2-4-q4",
        "kind": "reading",
        "prompt": "À quelle heure une mise à jour est-elle prévue ?",
        "answer": "15 h",
        "explanation": "Relis le passage : After an outage, the team informed stakeholders, described the known impact and scheduled an update for 3 p.m.",
        "options": [
          "15 h",
          "12 h",
          "9 h",
          "18 h"
        ],
        "context": "After an outage, the team informed stakeholders, described the known impact and scheduled an update for 3 p.m."
      },
      {
        "id": "c2-4-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Nous évaluons l’impact et communiquerons des mises à jour.",
        "explanation": "La phrase entendue signifie : Nous évaluons l’impact et communiquerons des mises à jour.",
        "options": [
          "Les clés sont sur la table.",
          "Je lis un livre en ce moment.",
          "Pourriez-vous m’envoyer le rapport ?",
          "Nous évaluons l’impact et communiquerons des mises à jour."
        ],
        "audio": "We are assessing the impact and will provide updates."
      }
    ]
  },
  {
    "id": "c2-5",
    "level": "C2",
    "index": 34,
    "title": "Synthèse : rapport, présentation et révision",
    "focus": [
      "writing",
      "speaking",
      "reading",
      "practice",
      "temps"
    ],
    "xp": 50,
    "lessonId": 6134,
    "description": "Une synthèse distingue constat, cause probable, impact, décision et étapes suivantes. Elle combine les temps, la voix passive et un vocabulaire précis…",
    "lessons": [
      {
        "category": "Grammaire / temps",
        "title": "Synthèse avancée",
        "explanation": "Une synthèse distingue constat, cause probable, impact, décision et étapes suivantes. Elle combine les temps, la voix passive et un vocabulaire précis.",
        "english": "The issue was resolved, but monitoring continues.",
        "french": "Le problème a été résolu, mais la surveillance continue."
      },
      {
        "category": "Notion complémentaire",
        "title": "Révision finale",
        "explanation": "Réutilise pronoms, articles, temps, conditionnels, relatives, modaux, passif, discours indirect et connecteurs dans de nouveaux contextes.",
        "english": "If the tests had passed, we would have deployed earlier.",
        "french": "Si les tests avaient réussi, nous aurions déployé plus tôt."
      },
      {
        "category": "Prononciation",
        "title": "Écouter, répéter et articuler",
        "explanation": "Dans une présentation finale, alterne rythme et pauses : annonce la conclusion, puis les prochaines étapes.",
        "english": "The issue was resolved, but monitoring continues.",
        "french": "Le problème a été résolu, mais la surveillance continue."
      }
    ],
    "vocabulary": [
      {
        "english": "summary",
        "french": "synthèse"
      },
      {
        "english": "resolution",
        "french": "résolution"
      },
      {
        "english": "monitoring",
        "french": "surveillance"
      },
      {
        "english": "follow-up",
        "french": "suivi"
      }
    ],
    "revisitedVocabulary": [
      {
        "english": "stakeholder",
        "french": "partie prenante"
      },
      {
        "english": "mitigation",
        "french": "atténuation"
      },
      {
        "english": "carry out",
        "french": "effectuer"
      },
      {
        "english": "put off",
        "french": "reporter"
      }
    ],
    "speakingPrompt": "The issue was resolved, but monitoring continues.",
    "readingText": "The incident report states that the service was restored at noon. Monitoring will continue for 24 hours before the team closes the ticket.",
    "exercises": [
      {
        "id": "c2-5-q1",
        "kind": "choice",
        "prompt": "Quelle synthèse respecte le mieux le texte ?",
        "answer": "The service was restored and is still monitored.",
        "explanation": "Une synthèse distingue constat, cause probable, impact, décision et étapes suivantes. Elle combine les temps, la voix passive et un vocabulaire précis.",
        "options": [
          "The service was restored and is still monitored.",
          "No one restored the service.",
          "Monitoring stopped before noon.",
          "The service was never unavailable."
        ]
      },
      {
        "id": "c2-5-q2",
        "kind": "fill",
        "prompt": "The issue was ___, but monitoring continues.",
        "answer": "resolved",
        "explanation": "Forme attendue : « resolved ». Une synthèse distingue constat, cause probable, impact, décision et étapes suivantes. Elle combine les temps, la voix passive et un vocabulaire précis."
      },
      {
        "id": "c2-5-q3",
        "kind": "translate",
        "prompt": "Le problème a été résolu, mais la surveillance continue.",
        "answer": "The issue was resolved, but monitoring continues.",
        "explanation": "Traduction modèle : The issue was resolved, but monitoring continues."
      },
      {
        "id": "c2-5-q4",
        "kind": "reading",
        "prompt": "Que se passe-t-il après le rétablissement du service ?",
        "answer": "La surveillance continue pendant 24 heures",
        "explanation": "Relis le passage : The incident report states that the service was restored at noon. Monitoring will continue for 24 hours before the team closes the ticket.",
        "options": [
          "La surveillance continue pendant 24 heures",
          "Le ticket est clos immédiatement",
          "Le serveur est vendu",
          "Une réunion est annulée"
        ],
        "context": "The incident report states that the service was restored at noon. Monitoring will continue for 24 hours before the team closes the ticket."
      },
      {
        "id": "c2-5-q5",
        "kind": "listen",
        "prompt": "Écoute la phrase et choisis sa traduction en français.",
        "answer": "Le problème a été résolu, mais la surveillance continue.",
        "explanation": "La phrase entendue signifie : Le problème a été résolu, mais la surveillance continue.",
        "options": [
          "Ce livre est meilleur que celui-là.",
          "Le serveur a été mis à jour hier.",
          "Le problème a été résolu, mais la surveillance continue.",
          "Je voudrais de l’eau."
        ],
        "audio": "The issue was resolved, but monitoring continues."
      }
    ]
  }
]

/** À chaque nouvelle unité, quelques questions déjà vues reviennent.
 * Les révisions sont sélectionnées dans l'unité précédente et dans celle
 * située cinq unités auparavant, même si le thème a changé.
 */
export function getCourseExercises(unitId: string): CourseExercise[] {
  const index = courseUnits.findIndex(unit => unit.id === unitId)
  if (index < 0) return []
  const current = courseUnits[index]
  const reviewed: CourseExercise[] = []
  if (index > 0) {
    reviewed.push(courseUnits[index - 1].exercises[0])
  }
  if (index >= 5) {
    reviewed.push(courseUnits[index - 5].exercises[2])
  } else if (index >= 2) {
    reviewed.push(courseUnits[index - 2].exercises[2])
  }
  return [...current.exercises, ...reviewed]
}

export function getCourseUnit(id: string) {
  return courseUnits.find(unit => unit.id === id)
}
