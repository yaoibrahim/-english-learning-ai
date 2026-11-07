// TP 27.17 — Parcours A1 à C2.
// Les niveaux sont indicatifs : ces quiz ne certifient pas le CECRL.
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
export type CEFRSkill = 'vocabulaire' | 'grammaire' | 'compréhension' | 'communication'

export type CEFRQuestion = {
  id: string
  prompt: string
  options: [string, string, string, string]
  correctIndex: number
  explanation: string
}

export type CEFRUnit = {
  id: string
  level: CEFRLevel
  title: string
  skill: CEFRSkill
  description: string
  xp: number
  lessonId: number
  questions: CEFRQuestion[]
}

export const cefrLevels: { id: CEFRLevel; label: string; description: string }[] = [
  {
    "id": "A1",
    "label": "Débutant",
    "description": "Comprendre et utiliser des expressions très courantes."
  },
  {
    "id": "A2",
    "label": "Élémentaire",
    "description": "Parler du quotidien, du passé et de projets simples."
  },
  {
    "id": "B1",
    "label": "Intermédiaire",
    "description": "Raconter, expliquer et exprimer son opinion."
  },
  {
    "id": "B2",
    "label": "Intermédiaire avancé",
    "description": "Argumenter et comprendre des formulations complexes."
  },
  {
    "id": "C1",
    "label": "Avancé",
    "description": "Nuancer, reformuler et organiser des idées élaborées."
  },
  {
    "id": "C2",
    "label": "Maîtrise",
    "description": "Interpréter des nuances fines et choisir un style précis."
  }
]

export const cefrUnits: CEFRUnit[] = [
  {
    "id": "a1-1",
    "level": "A1",
    "title": "Se présenter",
    "skill": "vocabulaire",
    "description": "Salutations, âge, pays et identité.",
    "xp": 40,
    "lessonId": 4001,
    "questions": [
      {
        "id": "a1-1-q1",
        "prompt": "Comment dit-on « Je m’appelle Emma » ?",
        "options": [
          "My name is Emma.",
          "My old is Emma.",
          "I name Emma.",
          "I called is Emma."
        ],
        "correctIndex": 0,
        "explanation": "My name is + prénom sert à se présenter."
      },
      {
        "id": "a1-1-q2",
        "prompt": "Complète : “I ___ from France.”",
        "options": [
          "is",
          "am",
          "are",
          "be"
        ],
        "correctIndex": 1,
        "explanation": "Avec I, on utilise am."
      },
      {
        "id": "a1-1-q3",
        "prompt": "Que signifie “Nice to meet you” ?",
        "options": [
          "Bonne nuit",
          "À demain",
          "Enchanté de te rencontrer",
          "Je suis fatigué"
        ],
        "correctIndex": 2,
        "explanation": "Nice to meet you est une formule de présentation."
      },
      {
        "id": "a1-1-q4",
        "prompt": "Complète : “She ___ twenty years old.”",
        "options": [
          "am",
          "are",
          "have",
          "is"
        ],
        "correctIndex": 3,
        "explanation": "Avec she, on utilise is pour dire son âge."
      },
      {
        "id": "a1-1-q5",
        "prompt": "Quelle question demande ton prénom ?",
        "options": [
          "Where are you?",
          "What is your name?",
          "How old is he?",
          "What time is it?"
        ],
        "correctIndex": 1,
        "explanation": "What is your name? = Comment t’appelles-tu ?"
      }
    ]
  },
  {
    "id": "a1-2",
    "level": "A1",
    "title": "Au quotidien",
    "skill": "grammaire",
    "description": "Présent simple, objets et habitudes.",
    "xp": 40,
    "lessonId": 4002,
    "questions": [
      {
        "id": "a1-2-q1",
        "prompt": "Complète : “He ___ coffee every morning.”",
        "options": [
          "drink",
          "drinks",
          "drinking",
          "drank"
        ],
        "correctIndex": 1,
        "explanation": "Au présent simple, on ajoute souvent -s à la 3e personne."
      },
      {
        "id": "a1-2-q2",
        "prompt": "“I go to school by bus” signifie :",
        "options": [
          "Je vais à l’école en bus",
          "Je rentre à pied",
          "Je travaille en bus",
          "Je prends le train"
        ],
        "correctIndex": 0,
        "explanation": "Go to school = aller à l’école ; by bus = en bus."
      },
      {
        "id": "a1-2-q3",
        "prompt": "Choisis le pluriel de “child”.",
        "options": [
          "childs",
          "childes",
          "childrens",
          "children"
        ],
        "correctIndex": 3,
        "explanation": "Children est le pluriel irrégulier de child."
      },
      {
        "id": "a1-2-q4",
        "prompt": "Complète : “There ___ two books on the table.”",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "correctIndex": 1,
        "explanation": "There are s’emploie pour un pluriel."
      },
      {
        "id": "a1-2-q5",
        "prompt": "Quel mot signifie « souvent » ?",
        "options": [
          "never",
          "yesterday",
          "often",
          "tomorrow"
        ],
        "correctIndex": 2,
        "explanation": "Often = souvent ; never = jamais."
      }
    ]
  },
  {
    "id": "a1-3",
    "level": "A1",
    "title": "Poser des questions",
    "skill": "communication",
    "description": "Questions simples et réponses courtes.",
    "xp": 40,
    "lessonId": 4003,
    "questions": [
      {
        "id": "a1-3-q1",
        "prompt": "Complète : “___ you speak English?”",
        "options": [
          "Does",
          "Do",
          "Is",
          "Are"
        ],
        "correctIndex": 1,
        "explanation": "Do introduit une question au présent simple avec you."
      },
      {
        "id": "a1-3-q2",
        "prompt": "Réponds à “How old are you?”",
        "options": [
          "I am twenty.",
          "I live in Paris.",
          "It is blue.",
          "I have a dog."
        ],
        "correctIndex": 0,
        "explanation": "How old are you? demande l’âge."
      },
      {
        "id": "a1-3-q3",
        "prompt": "Complète : “Where ___ she live?”",
        "options": [
          "do",
          "is",
          "does",
          "are"
        ],
        "correctIndex": 2,
        "explanation": "Does est utilisé avec he/she/it."
      },
      {
        "id": "a1-3-q4",
        "prompt": "Quelle question demande l’heure ?",
        "options": [
          "Where is it?",
          "What day is it?",
          "How much is it?",
          "What time is it?"
        ],
        "correctIndex": 3,
        "explanation": "What time is it? = Quelle heure est-il ?"
      },
      {
        "id": "a1-3-q5",
        "prompt": "Complète : “___ is your favorite color?”",
        "options": [
          "What",
          "Who",
          "When",
          "Why"
        ],
        "correctIndex": 0,
        "explanation": "What permet de demander une information."
      }
    ]
  },
  {
    "id": "a2-1",
    "level": "A2",
    "title": "Voyager et se déplacer",
    "skill": "vocabulaire",
    "description": "Transport, directions et demandes polies.",
    "xp": 45,
    "lessonId": 4004,
    "questions": [
      {
        "id": "a2-1-q1",
        "prompt": "Que signifie “a one-way ticket” ?",
        "options": [
          "Un billet aller-retour",
          "Un billet aller simple",
          "Une carte bancaire",
          "Une amende"
        ],
        "correctIndex": 1,
        "explanation": "One-way = aller simple ; return ticket = aller-retour."
      },
      {
        "id": "a2-1-q2",
        "prompt": "Complète : “Could you tell me ___ the station is?”",
        "options": [
          "who",
          "when",
          "where",
          "why"
        ],
        "correctIndex": 2,
        "explanation": "Where sert à demander un lieu."
      },
      {
        "id": "a2-1-q3",
        "prompt": "“The train is delayed” signifie :",
        "options": [
          "Le train est en retard",
          "Le train est annulé",
          "Le train est vide",
          "Le train est arrivé"
        ],
        "correctIndex": 0,
        "explanation": "Delayed signifie retardé."
      },
      {
        "id": "a2-1-q4",
        "prompt": "Quelle demande est la plus polie ?",
        "options": [
          "Give me water.",
          "Water now.",
          "You give water.",
          "Could I have some water, please?"
        ],
        "correctIndex": 3,
        "explanation": "Could I have ... please? est une demande polie."
      },
      {
        "id": "a2-1-q5",
        "prompt": "Complète : “Turn left ___ the traffic lights.”",
        "options": [
          "on",
          "at",
          "with",
          "for"
        ],
        "correctIndex": 1,
        "explanation": "On dit at the traffic lights = au feu de circulation."
      }
    ]
  },
  {
    "id": "a2-2",
    "level": "A2",
    "title": "Parler du passé",
    "skill": "grammaire",
    "description": "Prétérit régulier et irrégulier.",
    "xp": 45,
    "lessonId": 4005,
    "questions": [
      {
        "id": "a2-2-q1",
        "prompt": "Complète : “Yesterday, I ___ to the cinema.”",
        "options": [
          "go",
          "going",
          "went",
          "gone"
        ],
        "correctIndex": 2,
        "explanation": "Went est le passé de go."
      },
      {
        "id": "a2-2-q2",
        "prompt": "Quel est le passé de “buy” ?",
        "options": [
          "bought",
          "buyed",
          "buying",
          "buys"
        ],
        "correctIndex": 0,
        "explanation": "Buy est irrégulier : buy, bought, bought."
      },
      {
        "id": "a2-2-q3",
        "prompt": "Complète : “She ___ not call me last night.”",
        "options": [
          "does",
          "did",
          "is",
          "was"
        ],
        "correctIndex": 1,
        "explanation": "Négation du prétérit : did not + base verbale."
      },
      {
        "id": "a2-2-q4",
        "prompt": "Complète : “We ___ dinner at seven yesterday.”",
        "options": [
          "have",
          "has",
          "having",
          "had"
        ],
        "correctIndex": 3,
        "explanation": "Had est le passé de have."
      },
      {
        "id": "a2-2-q5",
        "prompt": "Quelle phrase est au passé ?",
        "options": [
          "I am working.",
          "I work every day.",
          "I worked yesterday.",
          "I will work tomorrow."
        ],
        "correctIndex": 2,
        "explanation": "Worked indique un événement passé."
      }
    ]
  },
  {
    "id": "a2-3",
    "level": "A2",
    "title": "Faire des projets",
    "skill": "communication",
    "description": "Futur proche, invitations et comparaisons.",
    "xp": 45,
    "lessonId": 4006,
    "questions": [
      {
        "id": "a2-3-q1",
        "prompt": "Complète : “I am going ___ visit London.”",
        "options": [
          "to",
          "for",
          "at",
          "by"
        ],
        "correctIndex": 0,
        "explanation": "Be going to + verbe exprime une intention."
      },
      {
        "id": "a2-3-q2",
        "prompt": "“Would you like to join us?” est :",
        "options": [
          "Une interdiction",
          "Une invitation",
          "Un reproche",
          "Une comparaison"
        ],
        "correctIndex": 1,
        "explanation": "Would you like to ...? permet d’inviter poliment."
      },
      {
        "id": "a2-3-q3",
        "prompt": "Complète : “This book is ___ than that one.”",
        "options": [
          "interesting",
          "most interesting",
          "more interesting",
          "interestinger"
        ],
        "correctIndex": 2,
        "explanation": "Adjectif long : more + adjectif + than."
      },
      {
        "id": "a2-3-q4",
        "prompt": "Quel mot signifie « la semaine prochaine » ?",
        "options": [
          "last week",
          "every week",
          "this week",
          "next week"
        ],
        "correctIndex": 3,
        "explanation": "Next week = la semaine prochaine."
      },
      {
        "id": "a2-3-q5",
        "prompt": "Complète : “If it rains, we ___ at home.”",
        "options": [
          "stayed",
          "will stay",
          "staying",
          "have stay"
        ],
        "correctIndex": 1,
        "explanation": "Condition réelle : if + présent, will + verbe."
      }
    ]
  },
  {
    "id": "b1-1",
    "level": "B1",
    "title": "Exprimer son opinion",
    "skill": "communication",
    "description": "Accord, désaccord et justification.",
    "xp": 50,
    "lessonId": 4007,
    "questions": [
      {
        "id": "b1-1-q1",
        "prompt": "Que signifie “In my opinion” ?",
        "options": [
          "À mon avis",
          "En revanche",
          "En résumé",
          "Par exemple"
        ],
        "correctIndex": 0,
        "explanation": "In my opinion introduit un avis personnel."
      },
      {
        "id": "b1-1-q2",
        "prompt": "Complète : “I agree ___ you.”",
        "options": [
          "to",
          "for",
          "with",
          "at"
        ],
        "correctIndex": 2,
        "explanation": "On dit agree with somebody."
      },
      {
        "id": "b1-1-q3",
        "prompt": "Quel connecteur présente une opposition ?",
        "options": [
          "because",
          "however",
          "therefore",
          "for example"
        ],
        "correctIndex": 1,
        "explanation": "However = cependant, toutefois."
      },
      {
        "id": "b1-1-q4",
        "prompt": "“I see your point, but…” permet de :",
        "options": [
          "Changer de sujet",
          "Poser une question",
          "Donner un ordre",
          "Exprimer un désaccord nuancé"
        ],
        "correctIndex": 3,
        "explanation": "Cette formule reconnaît l’argument d’autrui avant une objection."
      },
      {
        "id": "b1-1-q5",
        "prompt": "Complète : “I prefer tea ___ coffee.”",
        "options": [
          "to",
          "than",
          "from",
          "by"
        ],
        "correctIndex": 0,
        "explanation": "Prefer X to Y est la construction habituelle."
      }
    ]
  },
  {
    "id": "b1-2",
    "level": "B1",
    "title": "Raconter un événement",
    "skill": "grammaire",
    "description": "Past continuous, present perfect et chronologie.",
    "xp": 50,
    "lessonId": 4008,
    "questions": [
      {
        "id": "b1-2-q1",
        "prompt": "Complète : “I was cooking when the phone ___.”",
        "options": [
          "ring",
          "rung",
          "rang",
          "rings"
        ],
        "correctIndex": 2,
        "explanation": "Rang est le passé de ring."
      },
      {
        "id": "b1-2-q2",
        "prompt": "Complète : “She has ___ finished her work.”",
        "options": [
          "yet",
          "already",
          "tomorrow",
          "nowadays"
        ],
        "correctIndex": 1,
        "explanation": "Already s’emploie souvent au present perfect affirmatif."
      },
      {
        "id": "b1-2-q3",
        "prompt": "“While I was reading, he was sleeping” décrit :",
        "options": [
          "Deux actions parallèles",
          "Une promesse",
          "Une habitude future",
          "Un ordre"
        ],
        "correctIndex": 0,
        "explanation": "While marque ici deux actions simultanées dans le passé."
      },
      {
        "id": "b1-2-q4",
        "prompt": "Complète : “Have you ___ been to Ireland?”",
        "options": [
          "never",
          "still",
          "tomorrow",
          "ever"
        ],
        "correctIndex": 3,
        "explanation": "Ever s’utilise pour une expérience à un moment de la vie."
      },
      {
        "id": "b1-2-q5",
        "prompt": "“Since 2022” indique :",
        "options": [
          "Une durée de deux heures",
          "Une hypothèse",
          "Un point de départ dans le temps",
          "Une répétition quotidienne"
        ],
        "correctIndex": 2,
        "explanation": "Since introduit le début d’une période."
      }
    ]
  },
  {
    "id": "b1-3",
    "level": "B1",
    "title": "Dans un environnement professionnel",
    "skill": "compréhension",
    "description": "Consignes, courriels et problèmes courants.",
    "xp": 50,
    "lessonId": 4009,
    "questions": [
      {
        "id": "b1-3-q1",
        "prompt": "Dans “Please find attached the report”, attached signifie :",
        "options": [
          "Révisé",
          "En pièce jointe",
          "Annulé",
          "Urgent"
        ],
        "correctIndex": 1,
        "explanation": "Attached = joint au courriel."
      },
      {
        "id": "b1-3-q2",
        "prompt": "“The deadline has been extended” signifie :",
        "options": [
          "L’échéance a été repoussée",
          "Le dossier a disparu",
          "Le projet est terminé",
          "La réunion est annulée"
        ],
        "correctIndex": 0,
        "explanation": "Extended ici signifie prolongé/repoussé."
      },
      {
        "id": "b1-3-q3",
        "prompt": "Complète : “Could you ___ me an update?”",
        "options": [
          "sends",
          "sending",
          "sent",
          "send"
        ],
        "correctIndex": 3,
        "explanation": "Après could, on utilise la base verbale send."
      },
      {
        "id": "b1-3-q4",
        "prompt": "Que faut-il faire si quelqu’un dit “Please confirm receipt” ?",
        "options": [
          "Modifier le document",
          "Supprimer le courriel",
          "Confirmer la réception",
          "Envoyer une facture"
        ],
        "correctIndex": 2,
        "explanation": "Confirm receipt = accuser réception."
      },
      {
        "id": "b1-3-q5",
        "prompt": "“We need to sort this out” signifie :",
        "options": [
          "Nous devons imprimer ceci",
          "Nous devons résoudre ce problème",
          "Nous devons partir",
          "Nous devons archiver ceci"
        ],
        "correctIndex": 1,
        "explanation": "Sort something out = régler un problème."
      }
    ]
  },
  {
    "id": "b2-1",
    "level": "B2",
    "title": "Argumenter avec nuance",
    "skill": "communication",
    "description": "Objections, concessions et conséquences.",
    "xp": 60,
    "lessonId": 4010,
    "questions": [
      {
        "id": "b2-1-q1",
        "prompt": "“On the one hand ... on the other hand” sert à :",
        "options": [
          "Donner une date",
          "Énumérer des personnes",
          "Comparer deux aspects",
          "Faire une promesse"
        ],
        "correctIndex": 2,
        "explanation": "Cette structure oppose deux points de vue."
      },
      {
        "id": "b2-1-q2",
        "prompt": "Complète : “___ the cost, the project was approved.”",
        "options": [
          "Despite",
          "Although",
          "Because",
          "Since"
        ],
        "correctIndex": 0,
        "explanation": "Despite se construit avec un nom ou groupe nominal."
      },
      {
        "id": "b2-1-q3",
        "prompt": "“Nevertheless” signifie :",
        "options": [
          "Par conséquent",
          "Par ailleurs",
          "En effet",
          "Néanmoins"
        ],
        "correctIndex": 3,
        "explanation": "Nevertheless introduit une concession."
      },
      {
        "id": "b2-1-q4",
        "prompt": "Quel connecteur exprime une conséquence ?",
        "options": [
          "although",
          "therefore",
          "unless",
          "whereas"
        ],
        "correctIndex": 1,
        "explanation": "Therefore = par conséquent."
      },
      {
        "id": "b2-1-q5",
        "prompt": "Complète : “The idea is promising; ___, it needs testing.”",
        "options": [
          "so",
          "because",
          "however",
          "unless"
        ],
        "correctIndex": 2,
        "explanation": "However signale ici une réserve."
      }
    ]
  },
  {
    "id": "b2-2",
    "level": "B2",
    "title": "Hypothèses et regrets",
    "skill": "grammaire",
    "description": "Conditionnels, modaux et formes perfectives.",
    "xp": 60,
    "lessonId": 4011,
    "questions": [
      {
        "id": "b2-2-q1",
        "prompt": "Complète : “If I had known, I ___ earlier.”",
        "options": [
          "will leave",
          "would leave",
          "would have left",
          "left"
        ],
        "correctIndex": 2,
        "explanation": "Third conditional : if + past perfect, would have + participe passé."
      },
      {
        "id": "b2-2-q2",
        "prompt": "“She must have forgotten” exprime :",
        "options": [
          "Une déduction sur le passé",
          "Une obligation future",
          "Une permission",
          "Un souhait"
        ],
        "correctIndex": 0,
        "explanation": "Must have + participe passé marque une forte déduction passée."
      },
      {
        "id": "b2-2-q3",
        "prompt": "Complète : “I wish I ___ more time.”",
        "options": [
          "have",
          "will have",
          "am having",
          "had"
        ],
        "correctIndex": 3,
        "explanation": "Wish + past simple exprime un souhait irréel au présent."
      },
      {
        "id": "b2-2-q4",
        "prompt": "“You needn’t have bought it” signifie :",
        "options": [
          "Tu devais l’acheter",
          "Tu l’as acheté mais ce n’était pas nécessaire",
          "Tu ne l’as pas acheté",
          "Tu l’achèteras plus tard"
        ],
        "correctIndex": 1,
        "explanation": "Needn’t have + participe passé indique une action faite inutilement."
      },
      {
        "id": "b2-2-q5",
        "prompt": "Complète : “Had he studied, he ___ passed.”",
        "options": [
          "would have",
          "would",
          "will have",
          "had"
        ],
        "correctIndex": 0,
        "explanation": "Inversion conditionnelle : Had he studied, he would have passed."
      }
    ]
  },
  {
    "id": "b2-3",
    "level": "B2",
    "title": "Comprendre le registre",
    "skill": "compréhension",
    "description": "Ton, implicite et reformulation.",
    "xp": 60,
    "lessonId": 4012,
    "questions": [
      {
        "id": "b2-3-q1",
        "prompt": "“I’d appreciate it if you could reply” est :",
        "options": [
          "Très familier",
          "Agressif",
          "Poli et professionnel",
          "Une invitation à déjeuner"
        ],
        "correctIndex": 2,
        "explanation": "Cette expression formule une requête indirecte et polie."
      },
      {
        "id": "b2-3-q2",
        "prompt": "“The proposal is not without merit” signifie :",
        "options": [
          "Elle a certains mérites",
          "Elle est inutile",
          "Elle est illégale",
          "Elle est terminée"
        ],
        "correctIndex": 0,
        "explanation": "Not without merit est une litote nuancée et positive."
      },
      {
        "id": "b2-3-q3",
        "prompt": "“We might need to revisit the plan” suggère :",
        "options": [
          "Le plan est final",
          "Le plan est interdit",
          "Le plan est parfait",
          "Le plan pourrait nécessiter une révision"
        ],
        "correctIndex": 3,
        "explanation": "Might et revisit atténuent une recommandation de changement."
      },
      {
        "id": "b2-3-q4",
        "prompt": "“The results fell short of expectations” signifie :",
        "options": [
          "Ils ont été excellents",
          "Ils ont déçu les attentes",
          "Ils sont impossibles à mesurer",
          "Ils ont été publiés"
        ],
        "correctIndex": 1,
        "explanation": "Fall short of = ne pas atteindre."
      },
      {
        "id": "b2-3-q5",
        "prompt": "“To clarify” est utilisé pour :",
        "options": [
          "Conclure un débat",
          "Formuler un reproche",
          "Préciser une idée",
          "Changer de sujet"
        ],
        "correctIndex": 2,
        "explanation": "To clarify introduit une explication plus précise."
      }
    ]
  },
  {
    "id": "c1-1",
    "level": "C1",
    "title": "Reformuler avec précision",
    "skill": "communication",
    "description": "Synthèse, reformulation et style.",
    "xp": 70,
    "lessonId": 4013,
    "questions": [
      {
        "id": "c1-1-q1",
        "prompt": "“In other words” introduit :",
        "options": [
          "Une reformulation",
          "Une opposition",
          "Une menace",
          "Une condition"
        ],
        "correctIndex": 0,
        "explanation": "In other words reformule une idée."
      },
      {
        "id": "c1-1-q2",
        "prompt": "“A compelling argument” est un argument :",
        "options": [
          "Incompréhensible",
          "Convaincant",
          "Ancien",
          "Inutile"
        ],
        "correctIndex": 1,
        "explanation": "Compelling = convaincant, persuasif."
      },
      {
        "id": "c1-1-q3",
        "prompt": "Choisis la reformulation de “The measure was ineffective”.",
        "options": [
          "The measure was popular.",
          "The measure was expensive.",
          "The measure was unnecessary.",
          "The measure did not achieve its intended result."
        ],
        "correctIndex": 3,
        "explanation": "Ineffective signifie qui n’obtient pas le résultat visé."
      },
      {
        "id": "c1-1-q4",
        "prompt": "“The findings underscore the need for change” signifie :",
        "options": [
          "Les résultats minimisent le changement",
          "Les résultats excluent un changement",
          "Les résultats soulignent la nécessité d’un changement",
          "Les résultats sont contradictoires"
        ],
        "correctIndex": 2,
        "explanation": "Underscore = souligner, mettre en évidence."
      },
      {
        "id": "c1-1-q5",
        "prompt": "“Broadly speaking” annonce :",
        "options": [
          "Une généralisation",
          "Un exemple isolé",
          "Une négation",
          "Une instruction"
        ],
        "correctIndex": 0,
        "explanation": "Broadly speaking = globalement, dans les grandes lignes."
      }
    ]
  },
  {
    "id": "c1-2",
    "level": "C1",
    "title": "Comprendre les nuances",
    "skill": "vocabulaire",
    "description": "Connotations, degrés de certitude et évaluations.",
    "xp": 70,
    "lessonId": 4014,
    "questions": [
      {
        "id": "c1-2-q1",
        "prompt": "“Plausible” signifie :",
        "options": [
          "Certain",
          "Plausible / crédible",
          "Imminent",
          "Faux"
        ],
        "correctIndex": 1,
        "explanation": "Plausible indique qu’une chose semble raisonnablement possible."
      },
      {
        "id": "c1-2-q2",
        "prompt": "“A contentious issue” est un sujet :",
        "options": [
          "Facile",
          "Sans importance",
          "Très ancien",
          "Controversé"
        ],
        "correctIndex": 3,
        "explanation": "Contentious = qui suscite des désaccords."
      },
      {
        "id": "c1-2-q3",
        "prompt": "“The evidence is inconclusive” signifie :",
        "options": [
          "Les preuves ne permettent pas de conclure",
          "Les preuves sont falsifiées",
          "Les preuves sont définitives",
          "Les preuves ont disparu"
        ],
        "correctIndex": 0,
        "explanation": "Inconclusive = non concluant."
      },
      {
        "id": "c1-2-q4",
        "prompt": "“To mitigate a risk” signifie :",
        "options": [
          "Créer un risque",
          "Ignorer un risque",
          "Réduire les effets d’un risque",
          "Élargir un risque"
        ],
        "correctIndex": 2,
        "explanation": "Mitigate = atténuer."
      },
      {
        "id": "c1-2-q5",
        "prompt": "“He was reluctant to agree” signifie :",
        "options": [
          "Il a accepté immédiatement",
          "Il hésitait à accepter",
          "Il a refusé officiellement",
          "Il a oublié de répondre"
        ],
        "correctIndex": 1,
        "explanation": "Reluctant indique une réticence."
      }
    ]
  },
  {
    "id": "c1-3",
    "level": "C1",
    "title": "Structurer un raisonnement",
    "skill": "grammaire",
    "description": "Inversion, concession et cohésion.",
    "xp": 70,
    "lessonId": 4015,
    "questions": [
      {
        "id": "c1-3-q1",
        "prompt": "Complète : “Rarely ___ such a clear explanation.”",
        "options": [
          "I have heard",
          "have I heard",
          "I heard have",
          "heard I have"
        ],
        "correctIndex": 1,
        "explanation": "Après un adverbe négatif en tête de phrase, inversion auxiliaire-sujet."
      },
      {
        "id": "c1-3-q2",
        "prompt": "“Notwithstanding the delays, we proceeded” signifie :",
        "options": [
          "Malgré les retards, nous avons continué",
          "À cause des retards, nous avons renoncé",
          "Sans retard, nous avons commencé",
          "Après les retards, nous sommes partis"
        ],
        "correctIndex": 0,
        "explanation": "Notwithstanding = malgré."
      },
      {
        "id": "c1-3-q3",
        "prompt": "Complète : “No sooner had she arrived ___ it started raining.”",
        "options": [
          "when",
          "that",
          "while",
          "than"
        ],
        "correctIndex": 3,
        "explanation": "No sooner ... than est une construction figée."
      },
      {
        "id": "c1-3-q4",
        "prompt": "“Provided that” introduit :",
        "options": [
          "Une conséquence",
          "Un exemple",
          "Une condition",
          "Une opposition"
        ],
        "correctIndex": 2,
        "explanation": "Provided that = à condition que."
      },
      {
        "id": "c1-3-q5",
        "prompt": "“What matters most is reliability” met en valeur :",
        "options": [
          "Un résultat passé",
          "Un élément central",
          "Une supposition",
          "Une comparaison"
        ],
        "correctIndex": 1,
        "explanation": "La construction clivée focalise un élément important."
      }
    ]
  },
  {
    "id": "c2-1",
    "level": "C2",
    "title": "Idiomes et précision lexicale",
    "skill": "vocabulaire",
    "description": "Expressions idiomatiques et emplois raffinés.",
    "xp": 80,
    "lessonId": 4016,
    "questions": [
      {
        "id": "c2-1-q1",
        "prompt": "“To draw a fine distinction” signifie :",
        "options": [
          "Faire une distinction subtile",
          "Dessiner un schéma",
          "Prendre une décision rapide",
          "Éviter une question"
        ],
        "correctIndex": 0,
        "explanation": "Fine distinction = distinction très nuancée."
      },
      {
        "id": "c2-1-q2",
        "prompt": "“To take something with a pinch of salt” signifie :",
        "options": [
          "L’approuver sans réserve",
          "Le vérifier immédiatement",
          "Le considérer avec scepticisme",
          "Le rendre plus clair"
        ],
        "correctIndex": 2,
        "explanation": "L’expression invite à la prudence face à une information."
      },
      {
        "id": "c2-1-q3",
        "prompt": "“A moot point” désigne souvent :",
        "options": [
          "Une évidence",
          "Un point discutable ou sans portée pratique",
          "Une faute de frappe",
          "Un point obligatoire"
        ],
        "correctIndex": 1,
        "explanation": "Moot a des nuances selon les variétés d’anglais et le contexte."
      },
      {
        "id": "c2-1-q4",
        "prompt": "“To be at odds with” signifie :",
        "options": [
          "Être en avance sur",
          "Être dépendant de",
          "Être proche de",
          "Être en désaccord avec"
        ],
        "correctIndex": 3,
        "explanation": "At odds with = en contradiction ou désaccord avec."
      },
      {
        "id": "c2-1-q5",
        "prompt": "“To lend credence to” signifie :",
        "options": [
          "Renforcer la crédibilité de",
          "Nier l’existence de",
          "Accélérer le traitement de",
          "Élargir la portée de"
        ],
        "correctIndex": 0,
        "explanation": "Lend credence to = rendre une hypothèse plus crédible."
      }
    ]
  },
  {
    "id": "c2-2",
    "level": "C2",
    "title": "Inférences et implicite",
    "skill": "compréhension",
    "description": "Lire entre les lignes et distinguer faits et jugements.",
    "xp": 80,
    "lessonId": 4017,
    "questions": [
      {
        "id": "c2-2-q1",
        "prompt": "“The findings are suggestive rather than conclusive” indique :",
        "options": [
          "Une preuve irréfutable",
          "Une erreur certaine",
          "Une piste intéressante mais non définitive",
          "Une contradiction logique"
        ],
        "correctIndex": 2,
        "explanation": "Suggestive marque une indication sans preuve définitive."
      },
      {
        "id": "c2-2-q2",
        "prompt": "“He stopped short of endorsing the plan” signifie :",
        "options": [
          "Il a approuvé le plan",
          "Il n’est pas allé jusqu’à l’approuver",
          "Il a préparé le plan",
          "Il a expliqué chaque étape"
        ],
        "correctIndex": 1,
        "explanation": "Stop short of = ne pas aller jusqu’à."
      },
      {
        "id": "c2-2-q3",
        "prompt": "“Her praise was faint, at best” suggère :",
        "options": [
          "Un enthousiasme total",
          "Une neutralité sans réserve",
          "Une colère ouverte",
          "Un compliment très limité"
        ],
        "correctIndex": 3,
        "explanation": "Faint praise = compliment tiède."
      },
      {
        "id": "c2-2-q4",
        "prompt": "“It remains to be seen whether the reform will work” exprime :",
        "options": [
          "Une incertitude quant au résultat",
          "Une certitude de succès",
          "Une certitude d’échec",
          "Un résultat déjà observé"
        ],
        "correctIndex": 0,
        "explanation": "Remains to be seen évite de conclure prématurément."
      },
      {
        "id": "c2-2-q5",
        "prompt": "“That claim is difficult to reconcile with the data” suggère :",
        "options": [
          "Les données sont insuffisantes pour lire",
          "La prétention est sûrement vraie",
          "Une incohérence entre affirmation et données",
          "Les données ont disparu"
        ],
        "correctIndex": 2,
        "explanation": "Reconcile = rendre compatibles deux éléments."
      }
    ]
  },
  {
    "id": "c2-3",
    "level": "C2",
    "title": "Registre et style",
    "skill": "communication",
    "description": "Adapter le ton et la précision au contexte.",
    "xp": 80,
    "lessonId": 4018,
    "questions": [
      {
        "id": "c2-3-q1",
        "prompt": "Quelle formulation est la plus diplomatique ?",
        "options": [
          "Your idea is nonsense.",
          "I wonder whether we might consider an alternative.",
          "You are completely wrong.",
          "This will never work."
        ],
        "correctIndex": 1,
        "explanation": "La formulation interrogative atténuée est diplomatique."
      },
      {
        "id": "c2-3-q2",
        "prompt": "“A rather sweeping statement” est une affirmation :",
        "options": [
          "Très précise",
          "Fondée sur un échantillon",
          "Strictement juridique",
          "Trop générale"
        ],
        "correctIndex": 3,
        "explanation": "Sweeping statement = généralisation excessive."
      },
      {
        "id": "c2-3-q3",
        "prompt": "“To couch criticism in diplomatic terms” signifie :",
        "options": [
          "Formuler une critique avec tact",
          "Retirer une critique",
          "Publier une critique anonyme",
          "Justifier une critique technique"
        ],
        "correctIndex": 0,
        "explanation": "Couch in ... terms = formuler en certains termes."
      },
      {
        "id": "c2-3-q4",
        "prompt": "Quelle phrase exprime la plus forte certitude ?",
        "options": [
          "It may be true.",
          "It could be true.",
          "It is beyond doubt.",
          "It might be true."
        ],
        "correctIndex": 2,
        "explanation": "Beyond doubt signifie incontestable selon le locuteur."
      },
      {
        "id": "c2-3-q5",
        "prompt": "“The wording is deliberately ambiguous” signifie :",
        "options": [
          "Le mot est mal orthographié",
          "La formulation est volontairement équivoque",
          "Le message est incomplet par erreur",
          "La formulation est trop longue"
        ],
        "correctIndex": 1,
        "explanation": "Deliberately ambiguous marque une ambiguïté intentionnelle."
      }
    ]
  }
]

export function getCEFRUnit(id: string): CEFRUnit | undefined {
  return cefrUnits.find(unit => unit.id === id)
}
