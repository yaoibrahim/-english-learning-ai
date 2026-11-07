// Thèmes accessibles librement : aucun cadenas, aucun prérequis.
export type LibraryEntry = { en: string; fr: string; example: string }
export type GrammarTopic = { id: string; title: string; intro: string; rule: string; level: string; entries: LibraryEntry[] }
export type ConfusionGroup = { id: string; title: string; entries: LibraryEntry[] }
export type PhrasalEntry = LibraryEntry & { id: string; level: string }
export const grammarTopics: GrammarTopic[] = [
  {
    "id": "spelling",
    "title": "Orthographe — Spelling",
    "intro": "Lire et écrire les mots sans confondre sons et lettres.",
    "rule": "La terminaison -y devient souvent -ies au pluriel après une consonne ; -e disparaît parfois avant -ing. Attention aux lettres muettes.",
    "level": "A0",
    "entries": [
      {
        "en": "spelling",
        "fr": "épellation",
        "example": "How do you spell your name?"
      },
      {
        "en": "letter",
        "fr": "lettre",
        "example": "The first letter is A."
      },
      {
        "en": "word",
        "fr": "mot",
        "example": "This word is important."
      },
      {
        "en": "sentence",
        "fr": "phrase",
        "example": "Write a complete sentence."
      },
      {
        "en": "capital letter",
        "fr": "majuscule",
        "example": "Start with a capital letter."
      },
      {
        "en": "lowercase",
        "fr": "minuscule",
        "example": "Use lowercase letters."
      },
      {
        "en": "punctuation",
        "fr": "ponctuation",
        "example": "Check the punctuation."
      },
      {
        "en": "silent letter",
        "fr": "lettre muette",
        "example": "The k in know is silent."
      },
      {
        "en": "double consonant",
        "fr": "consonne doublée",
        "example": "Stop becomes stopping."
      },
      {
        "en": "-ing ending",
        "fr": "terminaison en -ing",
        "example": "Write becomes writing."
      },
      {
        "en": "plural -ies",
        "fr": "pluriel en -ies",
        "example": "City becomes cities."
      },
      {
        "en": "homophone",
        "fr": "homophone",
        "example": "See and sea sound the same."
      }
    ]
  },
  {
    "id": "pronouns",
    "title": "Pronouns — Pronoms",
    "intro": "Tous les principaux types de pronoms : sujets, compléments, possessifs, réfléchis, démonstratifs et relatifs.",
    "rule": "Sujet avant le verbe (I work), complément après le verbe (She sees me). My est un déterminant, mine un pronom possessif.",
    "level": "A0",
    "entries": [
      {
        "en": "I",
        "fr": "je",
        "example": "I am learning."
      },
      {
        "en": "you",
        "fr": "tu / vous",
        "example": "You are ready."
      },
      {
        "en": "he",
        "fr": "il",
        "example": "He works here."
      },
      {
        "en": "she",
        "fr": "elle",
        "example": "She is kind."
      },
      {
        "en": "it",
        "fr": "il / elle (chose / animal)",
        "example": "It is cold."
      },
      {
        "en": "we",
        "fr": "nous",
        "example": "We study together."
      },
      {
        "en": "they",
        "fr": "ils / elles",
        "example": "They are students."
      },
      {
        "en": "me",
        "fr": "me / moi",
        "example": "Help me, please."
      },
      {
        "en": "him",
        "fr": "le / lui",
        "example": "I know him."
      },
      {
        "en": "her",
        "fr": "la / lui",
        "example": "I saw her."
      },
      {
        "en": "us",
        "fr": "nous",
        "example": "Call us tomorrow."
      },
      {
        "en": "them",
        "fr": "les / leur",
        "example": "I know them."
      },
      {
        "en": "my",
        "fr": "mon / ma / mes",
        "example": "My house is here."
      },
      {
        "en": "your",
        "fr": "ton / ta / tes / votre",
        "example": "Your phone is ringing."
      },
      {
        "en": "his",
        "fr": "son / sa / ses (à lui)",
        "example": "His car is blue."
      },
      {
        "en": "her (determiner)",
        "fr": "son / sa / ses (à elle)",
        "example": "Her sister is here."
      },
      {
        "en": "its",
        "fr": "son / sa (chose)",
        "example": "The cat drinks its milk."
      },
      {
        "en": "our",
        "fr": "notre / nos",
        "example": "Our teacher is patient."
      },
      {
        "en": "their",
        "fr": "leur / leurs",
        "example": "Their dog is friendly."
      },
      {
        "en": "mine",
        "fr": "le mien / la mienne",
        "example": "This book is mine."
      },
      {
        "en": "yours",
        "fr": "le tien / le vôtre",
        "example": "This is yours."
      },
      {
        "en": "his (possessive)",
        "fr": "le sien (à lui)",
        "example": "The jacket is his."
      },
      {
        "en": "hers",
        "fr": "le sien (à elle)",
        "example": "That notebook is hers."
      },
      {
        "en": "ours",
        "fr": "le nôtre",
        "example": "This classroom is ours."
      },
      {
        "en": "theirs",
        "fr": "le leur",
        "example": "The house is theirs."
      },
      {
        "en": "myself",
        "fr": "moi-même",
        "example": "I made it myself."
      },
      {
        "en": "yourself",
        "fr": "toi-même / vous-même",
        "example": "Help yourself."
      },
      {
        "en": "himself",
        "fr": "lui-même",
        "example": "He did it himself."
      },
      {
        "en": "herself",
        "fr": "elle-même",
        "example": "She taught herself."
      },
      {
        "en": "itself",
        "fr": "lui-même (chose)",
        "example": "The door opens by itself."
      },
      {
        "en": "ourselves",
        "fr": "nous-mêmes",
        "example": "We built it ourselves."
      },
      {
        "en": "yourselves",
        "fr": "vous-mêmes",
        "example": "Enjoy yourselves."
      },
      {
        "en": "themselves",
        "fr": "eux-mêmes",
        "example": "They introduced themselves."
      },
      {
        "en": "this",
        "fr": "ceci / celui-ci",
        "example": "This is interesting."
      },
      {
        "en": "that",
        "fr": "cela / celui-là",
        "example": "That is amazing."
      },
      {
        "en": "these",
        "fr": "ceux-ci",
        "example": "These are mine."
      },
      {
        "en": "those",
        "fr": "ceux-là",
        "example": "Those are yours."
      },
      {
        "en": "someone",
        "fr": "quelqu'un",
        "example": "Someone is calling."
      },
      {
        "en": "anyone",
        "fr": "quelqu'un / n'importe qui",
        "example": "Can anyone help?"
      },
      {
        "en": "everyone",
        "fr": "tout le monde",
        "example": "Everyone is welcome."
      },
      {
        "en": "nobody",
        "fr": "personne",
        "example": "Nobody knows."
      },
      {
        "en": "something",
        "fr": "quelque chose",
        "example": "Something happened."
      },
      {
        "en": "nothing",
        "fr": "rien",
        "example": "Nothing changed."
      },
      {
        "en": "who",
        "fr": "qui",
        "example": "Who is there?"
      },
      {
        "en": "which",
        "fr": "lequel / laquelle",
        "example": "Which is yours?"
      },
      {
        "en": "whose",
        "fr": "à qui",
        "example": "Whose is this?"
      }
    ]
  },
  {
    "id": "articles",
    "title": "Articles — Articles",
    "intro": "Choisir a, an, the ou aucun article.",
    "rule": "A/An = indéfini singulier ; An avant un son vocalique (an hour), a avant un son consonantique (a university). The = défini. Certains pluriels et noms indénombrables sont sans article.",
    "level": "A0",
    "entries": [
      {
        "en": "a",
        "fr": "un / une (son consonantique)",
        "example": "a book"
      },
      {
        "en": "an",
        "fr": "un / une (son vocalique)",
        "example": "an apple"
      },
      {
        "en": "the",
        "fr": "le / la / les",
        "example": "the teacher"
      },
      {
        "en": "no article",
        "fr": "sans article",
        "example": "I like coffee."
      },
      {
        "en": "an hour",
        "fr": "une heure",
        "example": "It takes an hour."
      },
      {
        "en": "a university",
        "fr": "une université",
        "example": "She studies at a university."
      },
      {
        "en": "the sun",
        "fr": "le soleil",
        "example": "The sun is bright."
      },
      {
        "en": "a few",
        "fr": "quelques (dénombrable)",
        "example": "I have a few books."
      },
      {
        "en": "some",
        "fr": "du / de la / des",
        "example": "I need some water."
      },
      {
        "en": "any",
        "fr": "du / de la / des (question/négation)",
        "example": "Do you have any questions?"
      }
    ]
  },
  {
    "id": "nouns",
    "title": "Nouns — Noms",
    "intro": "Reconnaître les noms, leur nombre et leurs catégories.",
    "rule": "Dénombrable : one book / two books. Indénombrable : water (pas a water dans le sens général). Les noms propres prennent une majuscule.",
    "level": "A0",
    "entries": [
      {
        "en": "book",
        "fr": "livre",
        "example": "I read a book."
      },
      {
        "en": "student",
        "fr": "étudiant(e)",
        "example": "She is a student."
      },
      {
        "en": "city",
        "fr": "ville",
        "example": "This city is big."
      },
      {
        "en": "country",
        "fr": "pays",
        "example": "France is a country."
      },
      {
        "en": "child",
        "fr": "enfant",
        "example": "The child is smiling."
      },
      {
        "en": "children",
        "fr": "enfants",
        "example": "The children play."
      },
      {
        "en": "person",
        "fr": "personne",
        "example": "One person is here."
      },
      {
        "en": "people",
        "fr": "gens / personnes",
        "example": "Many people are waiting."
      },
      {
        "en": "water",
        "fr": "eau (indénombrable)",
        "example": "Water is important."
      },
      {
        "en": "information",
        "fr": "information (indénombrable)",
        "example": "This information is useful."
      },
      {
        "en": "advice",
        "fr": "conseil (indénombrable)",
        "example": "I need some advice."
      },
      {
        "en": "homework",
        "fr": "devoirs (indénombrable)",
        "example": "My homework is difficult."
      }
    ]
  },
  {
    "id": "adjectives",
    "title": "Adjectives — Adjectifs",
    "intro": "Décrire une personne, un objet ou une situation.",
    "rule": "L'adjectif anglais est généralement placé avant le nom et reste invariable : a big house / two big houses.",
    "level": "A0",
    "entries": [
      {
        "en": "big",
        "fr": "grand",
        "example": "a big house"
      },
      {
        "en": "small",
        "fr": "petit",
        "example": "a small room"
      },
      {
        "en": "beautiful",
        "fr": "beau / belle",
        "example": "a beautiful city"
      },
      {
        "en": "happy",
        "fr": "heureux",
        "example": "I am happy."
      },
      {
        "en": "sad",
        "fr": "triste",
        "example": "She is sad."
      },
      {
        "en": "interesting",
        "fr": "intéressant",
        "example": "an interesting book"
      },
      {
        "en": "difficult",
        "fr": "difficile",
        "example": "a difficult task"
      },
      {
        "en": "easy",
        "fr": "facile",
        "example": "an easy question"
      },
      {
        "en": "fast",
        "fr": "rapide",
        "example": "a fast car"
      },
      {
        "en": "slow",
        "fr": "lent",
        "example": "a slow train"
      },
      {
        "en": "important",
        "fr": "important",
        "example": "an important lesson"
      },
      {
        "en": "available",
        "fr": "disponible",
        "example": "The service is available."
      },
      {
        "en": "secure",
        "fr": "sécurisé",
        "example": "a secure connection"
      }
    ]
  },
  {
    "id": "adverbs",
    "title": "Adverbs — Adverbes",
    "intro": "Décrire comment, quand ou à quelle fréquence une action a lieu.",
    "rule": "Beaucoup d'adverbes de manière finissent en -ly ; la place dépend du type : always avant le verbe principal, usually après be.",
    "level": "A0",
    "entries": [
      {
        "en": "quickly",
        "fr": "rapidement",
        "example": "She runs quickly."
      },
      {
        "en": "slowly",
        "fr": "lentement",
        "example": "Please speak slowly."
      },
      {
        "en": "carefully",
        "fr": "soigneusement",
        "example": "Read carefully."
      },
      {
        "en": "well",
        "fr": "bien",
        "example": "He sings well."
      },
      {
        "en": "badly",
        "fr": "mal",
        "example": "It ended badly."
      },
      {
        "en": "always",
        "fr": "toujours",
        "example": "I always study."
      },
      {
        "en": "usually",
        "fr": "d'habitude",
        "example": "We usually walk."
      },
      {
        "en": "often",
        "fr": "souvent",
        "example": "She often reads."
      },
      {
        "en": "sometimes",
        "fr": "parfois",
        "example": "I sometimes cook."
      },
      {
        "en": "rarely",
        "fr": "rarement",
        "example": "He rarely drives."
      },
      {
        "en": "never",
        "fr": "jamais",
        "example": "They never smoke."
      },
      {
        "en": "already",
        "fr": "déjà",
        "example": "I have already finished."
      },
      {
        "en": "still",
        "fr": "encore",
        "example": "She is still working."
      },
      {
        "en": "almost",
        "fr": "presque",
        "example": "We are almost ready."
      },
      {
        "en": "very",
        "fr": "très",
        "example": "This is very good."
      },
      {
        "en": "too",
        "fr": "trop",
        "example": "It is too expensive."
      }
    ]
  },
  {
    "id": "prepositions",
    "title": "Prepositions — Prépositions",
    "intro": "Situer dans l’espace, dans le temps et dans une relation.",
    "rule": "In = dans / mois / année ; on = sur / jours ; at = heure précise / lieu ponctuel. Les prépositions ne se traduisent pas toujours mot à mot.",
    "level": "A0",
    "entries": [
      {
        "en": "in",
        "fr": "dans / en",
        "example": "I live in Paris."
      },
      {
        "en": "on",
        "fr": "sur / le (jour)",
        "example": "The book is on the table."
      },
      {
        "en": "at",
        "fr": "à (heure / lieu précis)",
        "example": "We meet at seven."
      },
      {
        "en": "under",
        "fr": "sous",
        "example": "The bag is under the chair."
      },
      {
        "en": "over",
        "fr": "au-dessus",
        "example": "The plane is over the city."
      },
      {
        "en": "between",
        "fr": "entre deux",
        "example": "The shop is between two banks."
      },
      {
        "en": "among",
        "fr": "parmi",
        "example": "She is among friends."
      },
      {
        "en": "behind",
        "fr": "derrière",
        "example": "The car is behind the house."
      },
      {
        "en": "in front of",
        "fr": "devant",
        "example": "Wait in front of the station."
      },
      {
        "en": "next to",
        "fr": "à côté de",
        "example": "The school is next to the park."
      },
      {
        "en": "before",
        "fr": "avant",
        "example": "Call me before lunch."
      },
      {
        "en": "after",
        "fr": "après",
        "example": "Come after work."
      },
      {
        "en": "during",
        "fr": "pendant",
        "example": "I slept during the trip."
      },
      {
        "en": "since",
        "fr": "depuis (point de départ)",
        "example": "I have lived here since 2020."
      },
      {
        "en": "for",
        "fr": "depuis / pendant (durée)",
        "example": "I have waited for an hour."
      },
      {
        "en": "through",
        "fr": "à travers",
        "example": "Walk through the door."
      },
      {
        "en": "across",
        "fr": "de l'autre côté",
        "example": "Walk across the street."
      },
      {
        "en": "without",
        "fr": "sans",
        "example": "Coffee without sugar."
      }
    ]
  },
  {
    "id": "conjunctions",
    "title": "Conjunctions — Conjonctions",
    "intro": "Relier des mots, phrases et propositions.",
    "rule": "And ajoute, but oppose, because donne une cause, although introduit une concession. Les subordonnées ont leur propre structure.",
    "level": "A0",
    "entries": [
      {
        "en": "and",
        "fr": "et",
        "example": "I work and study."
      },
      {
        "en": "but",
        "fr": "mais",
        "example": "It is small but useful."
      },
      {
        "en": "or",
        "fr": "ou",
        "example": "Tea or coffee?"
      },
      {
        "en": "because",
        "fr": "parce que",
        "example": "I stayed because I was tired."
      },
      {
        "en": "so",
        "fr": "donc",
        "example": "It was late, so I left."
      },
      {
        "en": "although",
        "fr": "bien que",
        "example": "Although tired, she continued."
      },
      {
        "en": "while",
        "fr": "pendant que / alors que",
        "example": "I read while he cooked."
      },
      {
        "en": "if",
        "fr": "si",
        "example": "If it rains, I will stay."
      },
      {
        "en": "unless",
        "fr": "à moins que",
        "example": "I will come unless it rains."
      },
      {
        "en": "since",
        "fr": "puisque",
        "example": "Since you are here, let's start."
      },
      {
        "en": "however",
        "fr": "cependant",
        "example": "However, it was difficult."
      },
      {
        "en": "therefore",
        "fr": "par conséquent",
        "example": "Therefore, we changed plans."
      }
    ]
  },
  {
    "id": "modals",
    "title": "Modal verbs — Verbes modaux",
    "intro": "Exprimer capacité, obligation, conseil, possibilité et permission.",
    "rule": "Un modal est suivi de la base verbale sans to : She can swim, pas She can swims. Mustn't exprime l'interdiction, don't have to l'absence d'obligation.",
    "level": "A0",
    "entries": [
      {
        "en": "can",
        "fr": "pouvoir / savoir",
        "example": "I can swim."
      },
      {
        "en": "could",
        "fr": "pourrait / pouvait",
        "example": "Could you help?"
      },
      {
        "en": "may",
        "fr": "pouvoir (permission / possibilité)",
        "example": "You may leave."
      },
      {
        "en": "might",
        "fr": "pourrait (possibilité)",
        "example": "It might rain."
      },
      {
        "en": "must",
        "fr": "devoir (obligation)",
        "example": "You must stop."
      },
      {
        "en": "must not",
        "fr": "ne doit pas (interdiction)",
        "example": "You must not enter."
      },
      {
        "en": "should",
        "fr": "devrait (conseil)",
        "example": "You should rest."
      },
      {
        "en": "ought to",
        "fr": "devrait",
        "example": "You ought to try."
      },
      {
        "en": "will",
        "fr": "futur / volonté",
        "example": "I will call."
      },
      {
        "en": "would",
        "fr": "voudrait / conditionnel",
        "example": "I would help."
      },
      {
        "en": "have to",
        "fr": "devoir (nécessité)",
        "example": "I have to work."
      },
      {
        "en": "don't have to",
        "fr": "ne pas être obligé",
        "example": "You don't have to come."
      }
    ]
  },
  {
    "id": "questions",
    "title": "Question words — Mots interrogatifs",
    "intro": "Former des questions et demander une information.",
    "rule": "Who = personne ; what = chose ; when = temps ; where = lieu ; why = raison ; how = manière ; whose = possession.",
    "level": "A0",
    "entries": [
      {
        "en": "who",
        "fr": "qui",
        "example": "Who are you?"
      },
      {
        "en": "what",
        "fr": "quoi / quel",
        "example": "What is this?"
      },
      {
        "en": "when",
        "fr": "quand",
        "example": "When do we start?"
      },
      {
        "en": "where",
        "fr": "où",
        "example": "Where do you live?"
      },
      {
        "en": "why",
        "fr": "pourquoi",
        "example": "Why are you here?"
      },
      {
        "en": "how",
        "fr": "comment",
        "example": "How are you?"
      },
      {
        "en": "which",
        "fr": "lequel",
        "example": "Which book do you want?"
      },
      {
        "en": "whose",
        "fr": "à qui",
        "example": "Whose bag is this?"
      },
      {
        "en": "how many",
        "fr": "combien (dénombrable)",
        "example": "How many books?"
      },
      {
        "en": "how much",
        "fr": "combien (indénombrable)",
        "example": "How much water?"
      },
      {
        "en": "how often",
        "fr": "à quelle fréquence",
        "example": "How often do you practice?"
      },
      {
        "en": "how long",
        "fr": "combien de temps",
        "example": "How long does it take?"
      },
      {
        "en": "how far",
        "fr": "à quelle distance",
        "example": "How far is the station?"
      }
    ]
  },
  {
    "id": "comparison",
    "title": "Comparatives & Superlatives",
    "intro": "Comparer des personnes ou des choses.",
    "rule": "Adjectif court : taller / the tallest ; long : more interesting / the most interesting. Irréguliers : good → better → best ; bad → worse → worst.",
    "level": "A0",
    "entries": [
      {
        "en": "taller",
        "fr": "plus grand",
        "example": "Paul is taller than Tom."
      },
      {
        "en": "the tallest",
        "fr": "le plus grand",
        "example": "She is the tallest."
      },
      {
        "en": "smaller",
        "fr": "plus petit",
        "example": "This house is smaller."
      },
      {
        "en": "the smallest",
        "fr": "le plus petit",
        "example": "It is the smallest."
      },
      {
        "en": "more interesting",
        "fr": "plus intéressant",
        "example": "This book is more interesting."
      },
      {
        "en": "the most interesting",
        "fr": "le plus intéressant",
        "example": "It is the most interesting."
      },
      {
        "en": "better",
        "fr": "meilleur",
        "example": "This version is better."
      },
      {
        "en": "the best",
        "fr": "le meilleur",
        "example": "This is the best."
      },
      {
        "en": "worse",
        "fr": "pire",
        "example": "Today is worse."
      },
      {
        "en": "the worst",
        "fr": "le pire",
        "example": "That was the worst day."
      },
      {
        "en": "less expensive",
        "fr": "moins cher",
        "example": "This option is less expensive."
      },
      {
        "en": "as ... as",
        "fr": "aussi ... que",
        "example": "She is as tall as I am."
      }
    ]
  },
  {
    "id": "negation",
    "title": "Negation — Négation",
    "intro": "Former des phrases négatives selon le temps et le verbe.",
    "rule": "Présent simple : do/does not + base ; passé simple : did not + base ; être : am/is/are not ; futur : will not + base.",
    "level": "A0",
    "entries": [
      {
        "en": "do not",
        "fr": "ne ... pas (présent)",
        "example": "I do not know."
      },
      {
        "en": "does not",
        "fr": "ne ... pas (3e pers.)",
        "example": "She does not like coffee."
      },
      {
        "en": "did not",
        "fr": "ne ... pas (passé)",
        "example": "They did not come."
      },
      {
        "en": "am not",
        "fr": "ne suis pas",
        "example": "I am not late."
      },
      {
        "en": "is not",
        "fr": "n'est pas",
        "example": "He is not ready."
      },
      {
        "en": "are not",
        "fr": "ne sont pas",
        "example": "We are not tired."
      },
      {
        "en": "cannot",
        "fr": "ne peut pas",
        "example": "She cannot swim."
      },
      {
        "en": "will not",
        "fr": "ne ... pas (futur)",
        "example": "I will not forget."
      },
      {
        "en": "never",
        "fr": "ne ... jamais",
        "example": "I never smoke."
      },
      {
        "en": "no longer",
        "fr": "ne ... plus",
        "example": "He no longer works here."
      },
      {
        "en": "neither ... nor",
        "fr": "ni ... ni",
        "example": "Neither Tom nor Anna came."
      }
    ]
  },
  {
    "id": "plural",
    "title": "Singular & Plural",
    "intro": "Passer du singulier au pluriel, y compris irréguliers.",
    "rule": "Noms courants : book/books ; consonne+y → -ies ; irréguliers : child/children, man/men, mouse/mice.",
    "level": "A0",
    "entries": [
      {
        "en": "book / books",
        "fr": "livre / livres",
        "example": "Two books."
      },
      {
        "en": "city / cities",
        "fr": "ville / villes",
        "example": "Three cities."
      },
      {
        "en": "baby / babies",
        "fr": "bébé / bébés",
        "example": "Two babies."
      },
      {
        "en": "box / boxes",
        "fr": "boîte / boîtes",
        "example": "Three boxes."
      },
      {
        "en": "child / children",
        "fr": "enfant / enfants",
        "example": "Many children."
      },
      {
        "en": "man / men",
        "fr": "homme / hommes",
        "example": "Two men."
      },
      {
        "en": "woman / women",
        "fr": "femme / femmes",
        "example": "Three women."
      },
      {
        "en": "person / people",
        "fr": "personne / gens",
        "example": "Five people."
      },
      {
        "en": "mouse / mice",
        "fr": "souris / souris (pluriel)",
        "example": "Two mice."
      },
      {
        "en": "foot / feet",
        "fr": "pied / pieds",
        "example": "Two feet."
      },
      {
        "en": "tooth / teeth",
        "fr": "dent / dents",
        "example": "My teeth are white."
      },
      {
        "en": "sheep / sheep",
        "fr": "mouton / moutons",
        "example": "Two sheep."
      }
    ]
  },
  {
    "id": "possessives",
    "title": "Possessives — Possessifs",
    "intro": "Exprimer la possession avec my, mine, de et apostrophe s.",
    "rule": "My + nom : my bag ; mine seul : the bag is mine. John's book = le livre de John ; pluriel régulier : my parents' house.",
    "level": "A0",
    "entries": [
      {
        "en": "my",
        "fr": "mon / ma / mes",
        "example": "my name"
      },
      {
        "en": "your",
        "fr": "ton / ta / votre",
        "example": "your car"
      },
      {
        "en": "his",
        "fr": "son / sa (à lui)",
        "example": "his bike"
      },
      {
        "en": "her",
        "fr": "son / sa (à elle)",
        "example": "her house"
      },
      {
        "en": "its",
        "fr": "son / sa (chose)",
        "example": "its color"
      },
      {
        "en": "our",
        "fr": "notre / nos",
        "example": "our team"
      },
      {
        "en": "their",
        "fr": "leur / leurs",
        "example": "their children"
      },
      {
        "en": "mine",
        "fr": "le mien",
        "example": "This is mine."
      },
      {
        "en": "yours",
        "fr": "le tien",
        "example": "This is yours."
      },
      {
        "en": "ours",
        "fr": "le nôtre",
        "example": "That is ours."
      },
      {
        "en": "theirs",
        "fr": "le leur",
        "example": "Those are theirs."
      },
      {
        "en": "John's book",
        "fr": "le livre de John",
        "example": "John's book is here."
      },
      {
        "en": "my parents' house",
        "fr": "la maison de mes parents",
        "example": "My parents' house is big."
      }
    ]
  },
  {
    "id": "relatives",
    "title": "Relative clauses — Propositions relatives",
    "intro": "Ajouter une précision sur un nom.",
    "rule": "Who pour une personne, which pour une chose, that pour personne/chose. Whose indique la possession. En relative définissante, le pronom objet peut parfois être omis.",
    "level": "B1",
    "entries": [
      {
        "en": "who",
        "fr": "qui (personne)",
        "example": "The woman who called is kind."
      },
      {
        "en": "which",
        "fr": "qui / que (chose)",
        "example": "The book which I bought is new."
      },
      {
        "en": "that",
        "fr": "qui / que",
        "example": "The car that I saw was red."
      },
      {
        "en": "whose",
        "fr": "dont / de qui",
        "example": "The man whose car broke down left."
      },
      {
        "en": "where",
        "fr": "où (lieu)",
        "example": "The place where I live is quiet."
      },
      {
        "en": "when",
        "fr": "où / quand (temps)",
        "example": "The day when we met was sunny."
      },
      {
        "en": "defining clause",
        "fr": "relative déterminative",
        "example": "The student who studies wins."
      },
      {
        "en": "non-defining clause",
        "fr": "relative explicative",
        "example": "Paris, which is in France, is beautiful."
      }
    ]
  },
  {
    "id": "conditionals",
    "title": "Conditionals — Conditionnels",
    "intro": "Parler de vérités générales, possibilités, hypothèses et regrets.",
    "rule": "Zero: If + présent, présent. First: If + présent, will. Second: If + passé, would. Third: If + past perfect, would have + participe passé.",
    "level": "B1",
    "entries": [
      {
        "en": "zero conditional",
        "fr": "vérité générale",
        "example": "If you heat ice, it melts."
      },
      {
        "en": "first conditional",
        "fr": "futur possible",
        "example": "If it rains, I will stay."
      },
      {
        "en": "second conditional",
        "fr": "hypothèse présente",
        "example": "If I had time, I would travel."
      },
      {
        "en": "third conditional",
        "fr": "regret passé",
        "example": "If I had studied, I would have passed."
      },
      {
        "en": "unless",
        "fr": "à moins que",
        "example": "Unless you call, I will leave."
      },
      {
        "en": "if I were",
        "fr": "si j'étais",
        "example": "If I were you, I would wait."
      },
      {
        "en": "provided that",
        "fr": "à condition que",
        "example": "You can go provided that you finish."
      },
      {
        "en": "as long as",
        "fr": "tant que",
        "example": "You can stay as long as you like."
      },
      {
        "en": "mixed conditional",
        "fr": "conditionnel mixte",
        "example": "If I had slept, I would be fine now."
      }
    ]
  },
  {
    "id": "passive",
    "title": "Passive voice — Voix passive",
    "intro": "Mettre l'accent sur l'action ou le résultat.",
    "rule": "Be conjugué + participe passé. The report is written. The report was written. The report will be written.",
    "level": "B2",
    "entries": [
      {
        "en": "is made",
        "fr": "est fabriqué",
        "example": "The product is made here."
      },
      {
        "en": "was built",
        "fr": "a été construit",
        "example": "The bridge was built in 1990."
      },
      {
        "en": "were sent",
        "fr": "ont été envoyés",
        "example": "The files were sent yesterday."
      },
      {
        "en": "will be delivered",
        "fr": "sera livré",
        "example": "The package will be delivered."
      },
      {
        "en": "has been repaired",
        "fr": "a été réparé",
        "example": "The computer has been repaired."
      },
      {
        "en": "is being tested",
        "fr": "est en cours de test",
        "example": "The software is being tested."
      },
      {
        "en": "must be checked",
        "fr": "doit être vérifié",
        "example": "The password must be checked."
      },
      {
        "en": "by",
        "fr": "par (agent)",
        "example": "The book was written by her."
      }
    ]
  },
  {
    "id": "reported",
    "title": "Reported speech — Discours indirect",
    "intro": "Rapporter ce que quelqu’un a dit.",
    "rule": "Après said au passé, le temps recule souvent d'un cran : am → was, will → would. Les mots de temps et lieux peuvent changer selon le contexte.",
    "level": "B2",
    "entries": [
      {
        "en": "said (that)",
        "fr": "a dit que",
        "example": "She said that she was tired."
      },
      {
        "en": "told me (that)",
        "fr": "m'a dit que",
        "example": "He told me that he was leaving."
      },
      {
        "en": "asked if",
        "fr": "a demandé si",
        "example": "She asked if I was ready."
      },
      {
        "en": "asked where",
        "fr": "a demandé où",
        "example": "He asked where I lived."
      },
      {
        "en": "would",
        "fr": "ferait (futur rapporté)",
        "example": "She said she would come."
      },
      {
        "en": "had been",
        "fr": "avait été",
        "example": "He said he had been there."
      },
      {
        "en": "the next day",
        "fr": "le lendemain",
        "example": "She said she would leave the next day."
      },
      {
        "en": "the previous day",
        "fr": "la veille",
        "example": "He said he had called the previous day."
      },
      {
        "en": "reported question",
        "fr": "question rapportée",
        "example": "She asked what I wanted."
      }
    ]
  }
]
export const confusionGroups: ConfusionGroup[] = [
  {
    "id": "conf-1",
    "title": "that / than",
    "entries": [
      {
        "en": "that",
        "fr": "que / ce / cette",
        "example": "That is my bag."
      },
      {
        "en": "than",
        "fr": "que (comparaison)",
        "example": "She is taller than me."
      }
    ]
  },
  {
    "id": "conf-2",
    "title": "there / their / they're",
    "entries": [
      {
        "en": "there",
        "fr": "là-bas / il y a",
        "example": "There is a problem."
      },
      {
        "en": "their",
        "fr": "leur / leurs",
        "example": "Their house is big."
      },
      {
        "en": "they're",
        "fr": "ils / elles sont",
        "example": "They're here."
      }
    ]
  },
  {
    "id": "conf-3",
    "title": "your / you're",
    "entries": [
      {
        "en": "your",
        "fr": "ton / ta / votre",
        "example": "Your book is here."
      },
      {
        "en": "you're",
        "fr": "tu es / vous êtes",
        "example": "You're ready."
      }
    ]
  },
  {
    "id": "conf-4",
    "title": "then / than",
    "entries": [
      {
        "en": "then",
        "fr": "ensuite / alors",
        "example": "First read, then answer."
      },
      {
        "en": "than",
        "fr": "que (comparaison)",
        "example": "He is older than me."
      }
    ]
  },
  {
    "id": "conf-5",
    "title": "to / too / two",
    "entries": [
      {
        "en": "to",
        "fr": "à / pour / infinitif",
        "example": "I want to learn."
      },
      {
        "en": "too",
        "fr": "aussi / trop",
        "example": "Me too!"
      },
      {
        "en": "two",
        "fr": "deux",
        "example": "I have two books."
      }
    ]
  },
  {
    "id": "conf-6",
    "title": "its / it's",
    "entries": [
      {
        "en": "its",
        "fr": "son / sa (possessif)",
        "example": "The cat drinks its milk."
      },
      {
        "en": "it's",
        "fr": "c'est / il est",
        "example": "It's raining."
      }
    ]
  },
  {
    "id": "conf-7",
    "title": "affect / effect",
    "entries": [
      {
        "en": "affect",
        "fr": "affecter / influencer (verbe)",
        "example": "Sleep can affect health."
      },
      {
        "en": "effect",
        "fr": "effet (nom)",
        "example": "The effect is clear."
      }
    ]
  },
  {
    "id": "conf-8",
    "title": "lose / loose",
    "entries": [
      {
        "en": "lose",
        "fr": "perdre",
        "example": "Don't lose your keys."
      },
      {
        "en": "loose",
        "fr": "ample / desserré",
        "example": "This shirt is loose."
      }
    ]
  },
  {
    "id": "conf-9",
    "title": "accept / except",
    "entries": [
      {
        "en": "accept",
        "fr": "accepter",
        "example": "I accept your offer."
      },
      {
        "en": "except",
        "fr": "sauf",
        "example": "Everyone came except Tom."
      }
    ]
  },
  {
    "id": "conf-10",
    "title": "advice / advise",
    "entries": [
      {
        "en": "advice",
        "fr": "conseil (nom)",
        "example": "I need advice."
      },
      {
        "en": "advise",
        "fr": "conseiller (verbe)",
        "example": "I advise you to rest."
      }
    ]
  },
  {
    "id": "conf-11",
    "title": "though / tough / through / throughout / thorough",
    "entries": [
      {
        "en": "though",
        "fr": "bien que / pourtant",
        "example": "Though tired, I worked."
      },
      {
        "en": "tough",
        "fr": "dur / difficile",
        "example": "This exam is tough."
      },
      {
        "en": "through",
        "fr": "à travers",
        "example": "Walk through the park."
      },
      {
        "en": "throughout",
        "fr": "tout au long de",
        "example": "It rained throughout the day."
      },
      {
        "en": "thorough",
        "fr": "approfondi / minutieux",
        "example": "A thorough review."
      }
    ]
  },
  {
    "id": "conf-12",
    "title": "where / were / we're",
    "entries": [
      {
        "en": "where",
        "fr": "où",
        "example": "Where are you?"
      },
      {
        "en": "were",
        "fr": "étions / étaient",
        "example": "They were happy."
      },
      {
        "en": "we're",
        "fr": "nous sommes",
        "example": "We're ready."
      }
    ]
  },
  {
    "id": "conf-13",
    "title": "weather / whether",
    "entries": [
      {
        "en": "weather",
        "fr": "météo / temps",
        "example": "The weather is good."
      },
      {
        "en": "whether",
        "fr": "si / que... ou non",
        "example": "I wonder whether she knows."
      }
    ]
  },
  {
    "id": "conf-14",
    "title": "hear / here",
    "entries": [
      {
        "en": "hear",
        "fr": "entendre",
        "example": "Can you hear me?"
      },
      {
        "en": "here",
        "fr": "ici",
        "example": "Come here."
      }
    ]
  },
  {
    "id": "conf-15",
    "title": "know / no",
    "entries": [
      {
        "en": "know",
        "fr": "savoir",
        "example": "I know the answer."
      },
      {
        "en": "no",
        "fr": "non / aucun",
        "example": "No, thank you."
      }
    ]
  },
  {
    "id": "conf-16",
    "title": "see / sea",
    "entries": [
      {
        "en": "see",
        "fr": "voir",
        "example": "I can see you."
      },
      {
        "en": "sea",
        "fr": "mer",
        "example": "The sea is calm."
      }
    ]
  },
  {
    "id": "conf-17",
    "title": "right / write",
    "entries": [
      {
        "en": "right",
        "fr": "correct / droite",
        "example": "You are right."
      },
      {
        "en": "write",
        "fr": "écrire",
        "example": "Write your name."
      }
    ]
  },
  {
    "id": "conf-18",
    "title": "buy / by / bye",
    "entries": [
      {
        "en": "buy",
        "fr": "acheter",
        "example": "I want to buy bread."
      },
      {
        "en": "by",
        "fr": "par / près de",
        "example": "The book is by her."
      },
      {
        "en": "bye",
        "fr": "au revoir",
        "example": "Bye, see you soon."
      }
    ]
  },
  {
    "id": "conf-19",
    "title": "bear / bare",
    "entries": [
      {
        "en": "bear",
        "fr": "ours / supporter",
        "example": "I cannot bear the noise."
      },
      {
        "en": "bare",
        "fr": "nu / découvert",
        "example": "The walls are bare."
      }
    ]
  },
  {
    "id": "conf-20",
    "title": "principal / principle",
    "entries": [
      {
        "en": "principal",
        "fr": "principal / directeur",
        "example": "The principal spoke."
      },
      {
        "en": "principle",
        "fr": "principe",
        "example": "It is an important principle."
      }
    ]
  },
  {
    "id": "conf-21",
    "title": "quiet / quite",
    "entries": [
      {
        "en": "quiet",
        "fr": "silencieux",
        "example": "Be quiet."
      },
      {
        "en": "quite",
        "fr": "assez / tout à fait",
        "example": "It is quite easy."
      }
    ]
  },
  {
    "id": "conf-22",
    "title": "desert / dessert",
    "entries": [
      {
        "en": "desert",
        "fr": "désert / abandonner",
        "example": "The desert is dry."
      },
      {
        "en": "dessert",
        "fr": "dessert",
        "example": "I like dessert."
      }
    ]
  }
]
export const phrasalVerbs: PhrasalEntry[] = [
  {
    "id": "pv-1",
    "en": "get up",
    "fr": "se lever",
    "example": "I get up at seven.",
    "level": "A0"
  },
  {
    "id": "pv-2",
    "en": "wake up",
    "fr": "se réveiller",
    "example": "I wake up early.",
    "level": "A0"
  },
  {
    "id": "pv-3",
    "en": "give up",
    "fr": "abandonner",
    "example": "Never give up.",
    "level": "A0"
  },
  {
    "id": "pv-4",
    "en": "look for",
    "fr": "chercher",
    "example": "I'm looking for my keys.",
    "level": "A0"
  },
  {
    "id": "pv-5",
    "en": "look after",
    "fr": "s'occuper de",
    "example": "She looks after her brother.",
    "level": "A0"
  },
  {
    "id": "pv-6",
    "en": "find out",
    "fr": "découvrir",
    "example": "Let's find out the answer.",
    "level": "A1"
  },
  {
    "id": "pv-7",
    "en": "turn on",
    "fr": "allumer",
    "example": "Turn on the light.",
    "level": "A1"
  },
  {
    "id": "pv-8",
    "en": "turn off",
    "fr": "éteindre",
    "example": "Turn off the computer.",
    "level": "A1"
  },
  {
    "id": "pv-9",
    "en": "pick up",
    "fr": "ramasser / venir chercher",
    "example": "Pick up the phone.",
    "level": "A1"
  },
  {
    "id": "pv-10",
    "en": "take off",
    "fr": "décoller / enlever",
    "example": "The plane takes off.",
    "level": "A1"
  },
  {
    "id": "pv-11",
    "en": "put on",
    "fr": "mettre (vêtement)",
    "example": "Put on your coat.",
    "level": "A2"
  },
  {
    "id": "pv-12",
    "en": "come back",
    "fr": "revenir",
    "example": "Come back soon.",
    "level": "A2"
  },
  {
    "id": "pv-13",
    "en": "go out",
    "fr": "sortir",
    "example": "We go out on Friday.",
    "level": "A2"
  },
  {
    "id": "pv-14",
    "en": "put off",
    "fr": "reporter",
    "example": "Don't put off your work.",
    "level": "A2"
  },
  {
    "id": "pv-15",
    "en": "run out of",
    "fr": "ne plus avoir de",
    "example": "We ran out of milk.",
    "level": "A2"
  },
  {
    "id": "pv-16",
    "en": "get along with",
    "fr": "bien s'entendre avec",
    "example": "I get along with her.",
    "level": "B1"
  },
  {
    "id": "pv-17",
    "en": "bring up",
    "fr": "évoquer / élever",
    "example": "She brought up the topic.",
    "level": "B1"
  },
  {
    "id": "pv-18",
    "en": "carry on",
    "fr": "continuer",
    "example": "Carry on working.",
    "level": "B1"
  },
  {
    "id": "pv-19",
    "en": "give back",
    "fr": "rendre",
    "example": "Give back my book.",
    "level": "B1"
  },
  {
    "id": "pv-20",
    "en": "set up",
    "fr": "installer / créer",
    "example": "Set up the server.",
    "level": "B1"
  },
  {
    "id": "pv-21",
    "en": "log in",
    "fr": "se connecter",
    "example": "Log in to your account.",
    "level": "B2"
  },
  {
    "id": "pv-22",
    "en": "log out",
    "fr": "se déconnecter",
    "example": "Log out when finished.",
    "level": "B2"
  },
  {
    "id": "pv-23",
    "en": "back up",
    "fr": "sauvegarder",
    "example": "Back up your files.",
    "level": "B2"
  },
  {
    "id": "pv-24",
    "en": "shut down",
    "fr": "éteindre / arrêter",
    "example": "Shut down the computer.",
    "level": "B2"
  },
  {
    "id": "pv-25",
    "en": "break down",
    "fr": "tomber en panne",
    "example": "The car broke down.",
    "level": "B2"
  },
  {
    "id": "pv-26",
    "en": "check in",
    "fr": "s'enregistrer",
    "example": "Check in at the hotel.",
    "level": "C1"
  },
  {
    "id": "pv-27",
    "en": "check out",
    "fr": "quitter / vérifier",
    "example": "Check out this lesson.",
    "level": "C1"
  },
  {
    "id": "pv-28",
    "en": "look up",
    "fr": "chercher (information)",
    "example": "Look up the word.",
    "level": "C1"
  },
  {
    "id": "pv-29",
    "en": "look forward to",
    "fr": "attendre avec impatience",
    "example": "I look forward to meeting you.",
    "level": "C1"
  },
  {
    "id": "pv-30",
    "en": "work out",
    "fr": "faire du sport / trouver une solution",
    "example": "We worked out a solution.",
    "level": "C1"
  },
  {
    "id": "pv-31",
    "en": "figure out",
    "fr": "comprendre / résoudre",
    "example": "Figure out the problem.",
    "level": "C2"
  },
  {
    "id": "pv-32",
    "en": "go on",
    "fr": "continuer",
    "example": "Please go on.",
    "level": "C2"
  },
  {
    "id": "pv-33",
    "en": "get over",
    "fr": "surmonter",
    "example": "Get over the problem.",
    "level": "C2"
  },
  {
    "id": "pv-34",
    "en": "get back",
    "fr": "revenir",
    "example": "Get back to work.",
    "level": "C2"
  },
  {
    "id": "pv-35",
    "en": "hang on",
    "fr": "attendre",
    "example": "Hang on a moment.",
    "level": "C2"
  },
  {
    "id": "pv-36",
    "en": "take care of",
    "fr": "prendre soin de",
    "example": "Take care of yourself.",
    "level": "C2"
  }
]
