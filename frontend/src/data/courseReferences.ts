/** Fiches synthétiques complémentaires. Elles ne remplacent pas les unités guidées. */
import type { CourseFocus } from './courses'
export type CourseReferenceTopic = { title: string; explanation: string; english: string; french: string }
export const courseReferences: Record<CourseFocus, CourseReferenceTopic[]> = {
  "grammaire": [
    {
      "title": "Articles",
      "explanation": "a/an = indéfini et the = défini ; tiens compte du son initial.",
      "english": "An apple is on the table.",
      "french": "Une pomme est sur la table."
    },
    {
      "title": "Nouns",
      "explanation": "Les noms désignent personnes, lieux, objets ou idées ; certains sont indénombrables.",
      "english": "This information is useful.",
      "french": "Cette information est utile."
    },
    {
      "title": "Adjectives",
      "explanation": "L'adjectif précède souvent le nom et ne s'accorde pas au pluriel.",
      "english": "Two beautiful houses.",
      "french": "Deux belles maisons."
    },
    {
      "title": "Adverbs",
      "explanation": "L'adverbe précise le verbe ou un autre mot ; souvent en -ly.",
      "english": "She speaks clearly.",
      "french": "Elle parle clairement."
    },
    {
      "title": "Prepositions",
      "explanation": "In, on, at, under, to marquent lieux, temps et relations.",
      "english": "We meet at nine.",
      "french": "Nous nous voyons à neuf heures."
    },
    {
      "title": "Conjunctions",
      "explanation": "And, but, because, although, while relient des idées.",
      "english": "I stayed because I was tired.",
      "french": "Je suis resté parce que j'étais fatigué."
    },
    {
      "title": "Verbs",
      "explanation": "Les verbes expriment action, état, temps et aspect.",
      "english": "She works every day.",
      "french": "Elle travaille chaque jour."
    },
    {
      "title": "Question words",
      "explanation": "Who, what, where, when, why, how interrogent l'identité, le lieu, le temps ou la manière.",
      "english": "Why are you late?",
      "french": "Pourquoi es-tu en retard ?"
    },
    {
      "title": "Comparatives & Superlatives",
      "explanation": "Better than et the best comparent deux ou plusieurs éléments.",
      "english": "This plan is better.",
      "french": "Ce plan est meilleur."
    },
    {
      "title": "Negation",
      "explanation": "Do not/does not au présent ; did not au passé ; not après un auxiliaire.",
      "english": "She does not work here.",
      "french": "Elle ne travaille pas ici."
    },
    {
      "title": "Singular & Plural",
      "explanation": "Pluriels réguliers en -s/-es et irréguliers : child/children.",
      "english": "The children are here.",
      "french": "Les enfants sont ici."
    },
    {
      "title": "Possessives",
      "explanation": "My/your/her devant un nom ; mine/yours/hers sans nom.",
      "english": "This is my book.",
      "french": "C'est mon livre."
    },
    {
      "title": "Relative clauses",
      "explanation": "Who, which, that, whose précisent un nom.",
      "english": "The person who called is here.",
      "french": "La personne qui a appelé est ici."
    },
    {
      "title": "Conditionals",
      "explanation": "Zero = vérité ; first = réel futur ; second = hypothèse ; third = passé irréel.",
      "english": "If I study, I will pass.",
      "french": "Si j'étudie, je réussirai."
    },
    {
      "title": "Passive voice",
      "explanation": "Be + participe passé fait porter l'accent sur l'action.",
      "english": "The code was reviewed.",
      "french": "Le code a été relu."
    },
    {
      "title": "Reported speech",
      "explanation": "Dans le discours indirect les temps et pronoms changent souvent.",
      "english": "She said she was ready.",
      "french": "Elle a dit qu'elle était prête."
    }
  ],
  "pronoms": [
    {
      "title": "Subject pronouns",
      "explanation": "I, you, he, she, it, we, they sont sujets.",
      "english": "They work here.",
      "french": "Ils travaillent ici."
    },
    {
      "title": "Object pronouns",
      "explanation": "Me, you, him, her, it, us, them complètent un verbe.",
      "english": "Please call me.",
      "french": "Appelle-moi s'il te plaît."
    },
    {
      "title": "Possessive determiners",
      "explanation": "My, your, his, her, its, our, their accompagnent un nom.",
      "english": "This is our house.",
      "french": "C'est notre maison."
    },
    {
      "title": "Possessive pronouns",
      "explanation": "Mine, yours, his, hers, ours, theirs remplacent le nom.",
      "english": "The bag is mine.",
      "french": "Le sac est à moi."
    },
    {
      "title": "Reflexive pronouns",
      "explanation": "Myself, yourself, himself, herself, itself, ourselves, yourselves, themselves.",
      "english": "She taught herself.",
      "french": "Elle a appris toute seule."
    },
    {
      "title": "Demonstrative pronouns",
      "explanation": "This/that au singulier ; these/those au pluriel.",
      "english": "These are my keys.",
      "french": "Ce sont mes clés."
    },
    {
      "title": "Relative pronouns",
      "explanation": "Who pour les personnes, which pour les choses, whose pour la possession.",
      "english": "The woman whose car broke down called.",
      "french": "La femme dont la voiture est tombée en panne a appelé."
    },
    {
      "title": "Indefinite pronouns",
      "explanation": "Someone, anyone, nobody, everybody, something.",
      "english": "Everyone is ready.",
      "french": "Tout le monde est prêt."
    },
    {
      "title": "Interrogative pronouns",
      "explanation": "Who, whom (formel), whose, which, what.",
      "english": "Whose is this?",
      "french": "À qui est-ce ?"
    },
    {
      "title": "Reciprocal pronouns",
      "explanation": "Each other et one another expriment une relation réciproque.",
      "english": "They help each other.",
      "french": "Ils s'entraident."
    }
  ],
  "temps": [
    {
      "title": "Present Simple",
      "explanation": "Habitude ou vérité ; -s à la 3e personne.",
      "english": "She works in IT.",
      "french": "Elle travaille dans l'informatique."
    },
    {
      "title": "Present Continuous",
      "explanation": "Be + -ing pour une action en cours.",
      "english": "She is working now.",
      "french": "Elle travaille en ce moment."
    },
    {
      "title": "Past Simple",
      "explanation": "Action terminée dans le passé ; régulier -ed ou irrégulier.",
      "english": "She worked yesterday.",
      "french": "Elle a travaillé hier."
    },
    {
      "title": "Past Continuous",
      "explanation": "Was/were + -ing pour une action en cours dans le passé.",
      "english": "She was reading.",
      "french": "Elle lisait."
    },
    {
      "title": "Present Perfect",
      "explanation": "Have/has + participe passé relie passé et présent.",
      "english": "She has finished.",
      "french": "Elle a terminé."
    },
    {
      "title": "Present Perfect Continuous",
      "explanation": "Have/has been + -ing insiste sur la durée.",
      "english": "I have been studying for hours.",
      "french": "J'étudie depuis des heures."
    },
    {
      "title": "Past Perfect",
      "explanation": "Had + participe passé : antériorité dans le passé.",
      "english": "He had left before noon.",
      "french": "Il était parti avant midi."
    },
    {
      "title": "Future Simple",
      "explanation": "Will + base verbale : décision, promesse ou prédiction.",
      "english": "I will call you.",
      "french": "Je t'appellerai."
    },
    {
      "title": "Be going to",
      "explanation": "Be going to + verbe : intention ou prédiction fondée sur un indice.",
      "english": "I am going to travel.",
      "french": "Je vais voyager."
    },
    {
      "title": "Future Continuous",
      "explanation": "Will be + -ing décrit une action en cours à un moment futur.",
      "english": "I will be working at eight.",
      "french": "Je serai en train de travailler à huit heures."
    },
    {
      "title": "Future Perfect",
      "explanation": "Will have + participe passé : action achevée avant un moment futur.",
      "english": "I will have finished by Friday.",
      "french": "J'aurai terminé d'ici vendredi."
    },
    {
      "title": "Past Perfect Continuous",
      "explanation": "Had been + -ing insiste sur une durée antérieure à un événement passé.",
      "english": "She had been waiting for an hour.",
      "french": "Elle attendait depuis une heure."
    }
  ],
  "verbes": [
    {
      "title": "Be",
      "explanation": "I am, you are, he/she/it is ; passé was/were.",
      "english": "We are students.",
      "french": "Nous sommes étudiants."
    },
    {
      "title": "Have",
      "explanation": "Avoir ou auxiliaire du present perfect.",
      "english": "I have a laptop.",
      "french": "J'ai un ordinateur portable."
    },
    {
      "title": "Do",
      "explanation": "Verbe « faire » ou auxiliaire des questions/négations.",
      "english": "Do you study English?",
      "french": "Étudies-tu l'anglais ?"
    },
    {
      "title": "Regular verbs",
      "explanation": "Past simple avec -ed : work/worked.",
      "english": "I worked yesterday.",
      "french": "J'ai travaillé hier."
    },
    {
      "title": "Irregular verbs",
      "explanation": "go/went/gone ; see/saw/seen ; buy/bought/bought.",
      "english": "I went home.",
      "french": "Je suis rentré chez moi."
    },
    {
      "title": "Modal verbs",
      "explanation": "Can, could, should, must, might sont suivis d'une base verbale.",
      "english": "You should rest.",
      "french": "Tu devrais te reposer."
    },
    {
      "title": "Infinitive & gerund",
      "explanation": "To learn et learning peuvent jouer différents rôles.",
      "english": "I enjoy learning.",
      "french": "J'aime apprendre."
    },
    {
      "title": "Phrasal verbs",
      "explanation": "Un verbe et une particule forment une nouvelle signification.",
      "english": "Turn off the light.",
      "french": "Éteins la lumière."
    },
    {
      "title": "Imperative",
      "explanation": "Base verbale pour donner une instruction ; please pour adoucir.",
      "english": "Please open the file.",
      "french": "Ouvre le fichier, s'il te plaît."
    },
    {
      "title": "Verb patterns",
      "explanation": "Want to do, enjoy doing, make someone do : la construction dépend du verbe.",
      "english": "I want to learn.",
      "french": "Je veux apprendre."
    }
  ],
  "adjectifs": [
    {
      "title": "Position des adjectifs",
      "explanation": "Adjectif avant le nom ou après be ; pas d'accord en -s.",
      "english": "A large house.",
      "french": "Une grande maison."
    },
    {
      "title": "Comparatif court",
      "explanation": "-er + than ; big devient bigger.",
      "english": "This bag is bigger.",
      "french": "Ce sac est plus grand."
    },
    {
      "title": "Comparatif long",
      "explanation": "More + adjectif + than pour beaucoup d'adjectifs longs.",
      "english": "More interesting than before.",
      "french": "Plus intéressant qu'avant."
    },
    {
      "title": "Superlatif",
      "explanation": "The -est ou the most ; irréguliers good/better/best.",
      "english": "This is the best option.",
      "french": "C'est la meilleure option."
    },
    {
      "title": "Ordre d'adjectifs",
      "explanation": "Opinion, taille, âge, couleur... sont souvent placés dans cet ordre.",
      "english": "A beautiful small blue bag.",
      "french": "Un joli petit sac bleu."
    },
    {
      "title": "Adjectif vs adverbe",
      "explanation": "Careful qualifie une personne ; carefully précise une action.",
      "english": "She reads carefully.",
      "french": "Elle lit avec attention."
    }
  ],
  "orthographe": [
    {
      "title": "Alphabet & spelling",
      "explanation": "Prononce les lettres et demande How do you spell it?",
      "english": "B-O-O-K spells book.",
      "french": "B-O-O-K forme le mot book."
    },
    {
      "title": "Majuscules",
      "explanation": "I, noms propres, jours et mois prennent une majuscule en anglais.",
      "english": "I work on Monday.",
      "french": "Je travaille lundi."
    },
    {
      "title": "Plural -s/-es/-ies",
      "explanation": "Cat/cats, box/boxes, baby/babies ; exceptions irrégulières.",
      "english": "Two babies are sleeping.",
      "french": "Deux bébés dorment."
    },
    {
      "title": "Past -ed",
      "explanation": "Work/worked ; study/studied ; stop/stopped.",
      "english": "She stopped working.",
      "french": "Elle a arrêté de travailler."
    },
    {
      "title": "Verbes -ing",
      "explanation": "Make/making ; run/running ; see/seeing.",
      "english": "He is running.",
      "french": "Il court."
    },
    {
      "title": "Silent letters",
      "explanation": "La lettre k de know et b de comb ne se prononcent pas.",
      "english": "I know the answer.",
      "french": "Je connais la réponse."
    },
    {
      "title": "Homophones",
      "explanation": "Right/write ou hear/here se prononcent pareil mais s'écrivent différemment.",
      "english": "Write the right answer.",
      "french": "Écris la bonne réponse."
    },
    {
      "title": "Contractions",
      "explanation": "I'm = I am ; they're = they are ; it's = it is/it has.",
      "english": "I'm ready.",
      "french": "Je suis prêt."
    },
    {
      "title": "Ponctuation",
      "explanation": "Apostrophe pour contractions/possessifs, point et question mark en fin de phrase.",
      "english": "Where's Tom's bag?",
      "french": "Où est le sac de Tom ?"
    }
  ],
  "prononciation": [
    {
      "title": "Alphabet & spelling",
      "explanation": "Noms des lettres anglaises parfois différents du français.",
      "english": "How do you spell your name?",
      "french": "Comment épelles-tu ton prénom ?"
    },
    {
      "title": "Vowel sounds",
      "explanation": "L'anglais comporte plusieurs voyelles absentes du français ; compare ship et sheep.",
      "english": "A ship is not a sheep.",
      "french": "Un bateau n'est pas un mouton."
    },
    {
      "title": "Consonant sounds",
      "explanation": "Le th demande souvent la langue près des dents ; think et this diffèrent.",
      "english": "Think about this.",
      "french": "Réfléchis à ceci."
    },
    {
      "title": "Short & long vowels",
      "explanation": "Une différence de durée/qualité peut changer le sens : sit/seat.",
      "english": "Please sit on this seat.",
      "french": "Assieds-toi sur ce siège."
    },
    {
      "title": "Word stress",
      "explanation": "Les syllabes accentuées guident la compréhension des mots longs.",
      "english": "I study information security.",
      "french": "J'étudie la sécurité informatique."
    },
    {
      "title": "Sentence stress",
      "explanation": "Accentue les mots porteurs d'information plutôt que chaque mot.",
      "english": "I really need that file.",
      "french": "J'ai vraiment besoin de ce fichier."
    },
    {
      "title": "Intonation",
      "explanation": "L'intonation permet notamment de marquer certaines questions et l'attitude.",
      "english": "Are you ready?",
      "french": "Es-tu prêt ?"
    },
    {
      "title": "Silent letters",
      "explanation": "Know, write, doubt possèdent des lettres non prononcées.",
      "english": "I know what to write.",
      "french": "Je sais quoi écrire."
    },
    {
      "title": "Connected speech",
      "explanation": "À vitesse naturelle, sons et mots se lient ; écoute les groupes de sens.",
      "english": "Do you want to go?",
      "french": "Veux-tu partir ?"
    },
    {
      "title": "British vs American",
      "explanation": "Les accents changent certains sons et parfois le vocabulaire ; les deux sont corrects.",
      "english": "I take the lift.",
      "french": "Je prends l'ascenseur."
    }
  ],
  "vocabulaire": [
    {
      "title": "Everyday vocabulary",
      "explanation": "Hello, please, thanks sont utiles tous les jours.",
      "english": "Thank you for your help.",
      "french": "Merci pour ton aide."
    },
    {
      "title": "Family",
      "explanation": "Mother, father, sister, brother, cousin.",
      "english": "My cousin lives in London.",
      "french": "Mon cousin habite à Londres."
    },
    {
      "title": "Food & drinks",
      "explanation": "Bread, water, rice, vegetables, coffee.",
      "english": "I would like some water.",
      "french": "Je voudrais de l'eau."
    },
    {
      "title": "Work",
      "explanation": "Company, colleague, manager, shift, task.",
      "english": "My manager is in a meeting.",
      "french": "Mon responsable est en réunion."
    },
    {
      "title": "School & university",
      "explanation": "Lesson, class, exam, degree, assignment.",
      "english": "I have an exam tomorrow.",
      "french": "J'ai un examen demain."
    },
    {
      "title": "Travel",
      "explanation": "Ticket, passport, station, departure, arrival.",
      "english": "The train leaves at nine.",
      "french": "Le train part à neuf heures."
    },
    {
      "title": "House",
      "explanation": "Kitchen, bedroom, window, door, furniture.",
      "english": "The window is open.",
      "french": "La fenêtre est ouverte."
    },
    {
      "title": "Clothes",
      "explanation": "Shirt, jacket, shoes, coat, trousers.",
      "english": "I need a new jacket.",
      "french": "J'ai besoin d'une nouvelle veste."
    },
    {
      "title": "Body",
      "explanation": "Head, hand, arm, leg, shoulder.",
      "english": "My left hand hurts.",
      "french": "J'ai mal à la main gauche."
    },
    {
      "title": "Health",
      "explanation": "Doctor, appointment, medicine, pain, rest.",
      "english": "I have a doctor's appointment.",
      "french": "J'ai rendez-vous chez le médecin."
    },
    {
      "title": "Technology",
      "explanation": "Laptop, screen, keyboard, software, update.",
      "english": "My laptop needs an update.",
      "french": "Mon ordinateur a besoin d'une mise à jour."
    },
    {
      "title": "IT & Cybersecurity",
      "explanation": "Firewall, vulnerability, patch, incident, logs.",
      "english": "The firewall blocked the request.",
      "french": "Le pare-feu a bloqué la requête."
    },
    {
      "title": "Money & finance",
      "explanation": "Price, budget, salary, expense, invoice.",
      "english": "The invoice is ready.",
      "french": "La facture est prête."
    },
    {
      "title": "Shopping",
      "explanation": "Receipt, discount, size, cash, card.",
      "english": "Can I pay by card?",
      "french": "Puis-je payer par carte ?"
    },
    {
      "title": "Sports",
      "explanation": "Team, match, player, training, score.",
      "english": "Our team won the match.",
      "french": "Notre équipe a gagné le match."
    },
    {
      "title": "Weather",
      "explanation": "Sunny, cloudy, rainy, windy, forecast.",
      "english": "It will be rainy tomorrow.",
      "french": "Il pleuvra demain."
    },
    {
      "title": "Feelings & emotions",
      "explanation": "Happy, worried, excited, calm, disappointed.",
      "english": "I feel excited today.",
      "french": "Je suis enthousiaste aujourd'hui."
    }
  ],
  "speaking": [
    {
      "title": "Introducing yourself",
      "explanation": "Nom, origine, rôle et centre d'intérêt dans des phrases simples.",
      "english": "My name is Lina.",
      "french": "Je m'appelle Lina."
    },
    {
      "title": "Talking about family",
      "explanation": "Dire qui est qui et décrire les liens.",
      "english": "My sister studies English.",
      "french": "Ma sœur étudie l'anglais."
    },
    {
      "title": "Talking about studies",
      "explanation": "Expliquer ses études et objectifs.",
      "english": "I study computer science.",
      "french": "J'étudie l'informatique."
    },
    {
      "title": "Talking about your job",
      "explanation": "Décrire ton poste et tes tâches.",
      "english": "I work in IT support.",
      "french": "Je travaille dans le support informatique."
    },
    {
      "title": "Asking questions",
      "explanation": "What, when, where, who, why, how et auxiliaires.",
      "english": "Where do you work?",
      "french": "Où travailles-tu ?"
    },
    {
      "title": "Giving opinions",
      "explanation": "I think, In my view, I believe.",
      "english": "I think this is useful.",
      "french": "Je pense que c'est utile."
    },
    {
      "title": "Agreeing / disagreeing",
      "explanation": "I agree, I see your point, however.",
      "english": "I see your point, but I disagree.",
      "french": "Je comprends ton point de vue, mais je ne suis pas d'accord."
    },
    {
      "title": "Making requests",
      "explanation": "Can you, Could you please, Would you mind.",
      "english": "Could you repeat that?",
      "french": "Pourriez-vous répéter ?"
    },
    {
      "title": "Making suggestions",
      "explanation": "We could, Let's, Why don't we.",
      "english": "Let's start now.",
      "french": "Commençons maintenant."
    },
    {
      "title": "Making appointments",
      "explanation": "Confirmer date, heure et disponibilité.",
      "english": "Are you free on Thursday?",
      "french": "Es-tu disponible jeudi ?"
    },
    {
      "title": "Telephone conversations",
      "explanation": "Se présenter, demander un correspondant, faire répéter.",
      "english": "May I speak to Alex?",
      "french": "Puis-je parler à Alex ?"
    },
    {
      "title": "Job interviews",
      "explanation": "Se présenter, raconter un projet et expliquer son rôle.",
      "english": "I automated a deployment.",
      "french": "J'ai automatisé un déploiement."
    },
    {
      "title": "Presentations",
      "explanation": "Introduction, plan, transitions, conclusion, questions.",
      "english": "First, I will explain the problem.",
      "french": "D'abord, j'expliquerai le problème."
    }
  ],
  "listening": [
    {
      "title": "Beginner conversations",
      "explanation": "Identifier salutations, prénoms, nombres et actions simples.",
      "english": "Hello, how are you?",
      "french": "Bonjour, comment vas-tu ?"
    },
    {
      "title": "Everyday conversations",
      "explanation": "Repérer le lieu, le temps et les intentions.",
      "english": "What time does the train leave?",
      "french": "À quelle heure le train part-il ?"
    },
    {
      "title": "Slow English",
      "explanation": "Réécouter lentement pour segmenter les mots.",
      "english": "Please speak slowly.",
      "french": "Parlez lentement, s'il vous plaît."
    },
    {
      "title": "Normal-speed English",
      "explanation": "Chercher le sens général avant les détails.",
      "english": "I will see you after the meeting.",
      "french": "Je te verrai après la réunion."
    },
    {
      "title": "Different accents",
      "explanation": "S'habituer à des prononciations de plusieurs régions.",
      "english": "Could you say that again?",
      "french": "Pourriez-vous redire cela ?"
    },
    {
      "title": "British English",
      "explanation": "Écouter les variantes de sons et de mots britanniques.",
      "english": "I take the lift.",
      "french": "Je prends l'ascenseur."
    },
    {
      "title": "American English",
      "explanation": "Écouter les variantes de sons et de mots américains.",
      "english": "I take the elevator.",
      "french": "Je prends l'ascenseur."
    },
    {
      "title": "Listening exercises",
      "explanation": "Écouter, répondre, vérifier puis réécouter.",
      "english": "Listen and choose the answer.",
      "french": "Écoute et choisis la réponse."
    }
  ],
  "reading": [
    {
      "title": "Short texts",
      "explanation": "Trouver sujet, acteur, action et lieu dans quelques phrases.",
      "english": "The train arrives at six.",
      "french": "Le train arrive à six heures."
    },
    {
      "title": "Stories",
      "explanation": "Repérer le début, la chronologie et la conclusion.",
      "english": "Then she opened the door.",
      "french": "Puis elle ouvrit la porte."
    },
    {
      "title": "News",
      "explanation": "Vérifier date, source, faits et niveau de certitude.",
      "english": "The report states that sales increased.",
      "french": "Le rapport indique que les ventes ont augmenté."
    },
    {
      "title": "Emails",
      "explanation": "Identifier objet, demande, échéance et formule de politesse.",
      "english": "Please reply by Friday.",
      "french": "Merci de répondre avant vendredi."
    },
    {
      "title": "Messages",
      "explanation": "Comprendre abréviations et contexte, distinguer formel et informel.",
      "english": "See you soon!",
      "french": "À bientôt !"
    },
    {
      "title": "Articles",
      "explanation": "Suivre la thèse, les arguments et les exemples.",
      "english": "However, the results are limited.",
      "french": "Cependant, les résultats sont limités."
    },
    {
      "title": "Technical texts",
      "explanation": "Repérer consignes, étapes, avertissements et conditions.",
      "english": "Restart the service after the update.",
      "french": "Redémarre le service après la mise à jour."
    },
    {
      "title": "Reading comprehension",
      "explanation": "Justifier une réponse à partir d'une phrase du texte.",
      "english": "According to the text, the server failed.",
      "french": "D'après le texte, le serveur est tombé en panne."
    }
  ],
  "writing": [
    {
      "title": "Messages",
      "explanation": "Écrire des informations claires en phrases courtes.",
      "english": "I am on my way.",
      "french": "Je suis en route."
    },
    {
      "title": "Emails",
      "explanation": "Salutation, objet, message et conclusion.",
      "english": "I am writing about our meeting.",
      "french": "Je vous écris au sujet de notre réunion."
    },
    {
      "title": "Formal emails",
      "explanation": "Formule polie et demande précise ; éviter les contractions familières.",
      "english": "Could you please confirm receipt?",
      "french": "Pourriez-vous confirmer la réception ?"
    },
    {
      "title": "Informal emails",
      "explanation": "Ton amical, phrases simples et expressions courantes.",
      "english": "Thanks for your message!",
      "french": "Merci pour ton message !"
    },
    {
      "title": "Professional communication",
      "explanation": "Préciser action, responsable, délai et prochaines étapes.",
      "english": "The report will be ready by Friday.",
      "french": "Le rapport sera prêt d'ici vendredi."
    },
    {
      "title": "Reports",
      "explanation": "Contexte, faits, analyse, conclusion et recommandation.",
      "english": "The data suggest an improvement.",
      "french": "Les données indiquent une amélioration."
    }
  ],
  "common-confusions": [
    {
      "title": "That / Than",
      "explanation": "That = ce/cela/que ; than = que dans une comparaison.",
      "english": "This is better than that.",
      "french": "C'est mieux que cela."
    },
    {
      "title": "There / Their / They're",
      "explanation": "There = là/il y a ; their = leur ; they're = they are.",
      "english": "Their bags are over there.",
      "french": "Leurs sacs sont là-bas."
    },
    {
      "title": "Your / You're",
      "explanation": "Your = ton/ta ; you're = tu es.",
      "english": "You're using your laptop.",
      "french": "Tu utilises ton ordinateur."
    },
    {
      "title": "Then / Than",
      "explanation": "Then = ensuite ; than = comparatif.",
      "english": "We will eat, then leave.",
      "french": "Nous mangerons puis partirons."
    },
    {
      "title": "To / Too / Two",
      "explanation": "To = à/vers ; too = aussi/trop ; two = deux.",
      "english": "I have two tickets too.",
      "french": "J'ai également deux billets."
    },
    {
      "title": "Its / It's",
      "explanation": "Its = son/sa (objet) ; it's = it is ou it has.",
      "english": "It's lost its color.",
      "french": "Il a perdu sa couleur."
    },
    {
      "title": "Affect / Effect",
      "explanation": "Affect est souvent un verbe ; effect est souvent un nom.",
      "english": "This may affect the result.",
      "french": "Cela peut affecter le résultat."
    },
    {
      "title": "Lose / Loose",
      "explanation": "Lose = perdre ; loose = lâche / desserré.",
      "english": "Do not lose the loose screw.",
      "french": "Ne perds pas la vis desserrée."
    },
    {
      "title": "Accept / Except",
      "explanation": "Accept = accepter ; except = sauf.",
      "english": "Everyone accepted except Tom.",
      "french": "Tout le monde a accepté sauf Tom."
    },
    {
      "title": "Advice / Advise",
      "explanation": "Advice = conseil (nom) ; advise = conseiller (verbe).",
      "english": "Please advise me.",
      "french": "Conseille-moi, s'il te plaît."
    },
    {
      "title": "Though / Tough / Through / Throughout / Thorough",
      "explanation": "Though = bien que ; tough = difficile ; through = à travers ; throughout = partout/durant ; thorough = minutieux.",
      "english": "The review was thorough.",
      "french": "La révision était minutieuse."
    },
    {
      "title": "Where / Were / We're",
      "explanation": "Where = où ; were = passé de are ; we're = we are.",
      "english": "We're where we were yesterday.",
      "french": "Nous sommes là où nous étions hier."
    },
    {
      "title": "Weather / Whether",
      "explanation": "Weather = météo ; whether = si (alternative).",
      "english": "I wonder whether the weather will change.",
      "french": "Je me demande si la météo va changer."
    },
    {
      "title": "Hear / Here",
      "explanation": "Hear = entendre ; here = ici.",
      "english": "I can hear you here.",
      "french": "Je peux t'entendre ici."
    },
    {
      "title": "Know / No",
      "explanation": "Know = savoir/connaître ; no = non/aucun.",
      "english": "No, I don't know.",
      "french": "Non, je ne sais pas."
    },
    {
      "title": "See / Sea",
      "explanation": "See = voir ; sea = mer.",
      "english": "I can see the sea.",
      "french": "Je peux voir la mer."
    },
    {
      "title": "Right / Write",
      "explanation": "Right = correct/droite ; write = écrire.",
      "english": "Write the right answer.",
      "french": "Écris la bonne réponse."
    },
    {
      "title": "Buy / By / Bye",
      "explanation": "Buy = acheter ; by = par/près de ; bye = au revoir.",
      "english": "I will buy it by Friday.",
      "french": "Je l'achèterai d'ici vendredi."
    }
  ],
  "phrasal-verbs": [
    {
      "title": "Get up",
      "explanation": "Se lever du lit ou se mettre debout.",
      "english": "I get up at seven.",
      "french": "Je me lève à sept heures."
    },
    {
      "title": "Wake up",
      "explanation": "Se réveiller ; différent de get up.",
      "english": "I wake up early.",
      "french": "Je me réveille tôt."
    },
    {
      "title": "Give up",
      "explanation": "Abandonner une activité ou un effort.",
      "english": "Don't give up!",
      "french": "N'abandonne pas !"
    },
    {
      "title": "Look for",
      "explanation": "Chercher quelque chose.",
      "english": "I'm looking for my keys.",
      "french": "Je cherche mes clés."
    },
    {
      "title": "Look after",
      "explanation": "Prendre soin de quelqu'un ou de quelque chose.",
      "english": "I look after my sister.",
      "french": "Je m'occupe de ma sœur."
    },
    {
      "title": "Find out",
      "explanation": "Découvrir une information.",
      "english": "We found out the cause.",
      "french": "Nous avons découvert la cause."
    },
    {
      "title": "Turn on / Turn off",
      "explanation": "Allumer / éteindre un appareil.",
      "english": "Turn off the screen.",
      "french": "Éteins l'écran."
    },
    {
      "title": "Pick up",
      "explanation": "Ramasser, récupérer ou décrocher selon le contexte.",
      "english": "Pick up the phone.",
      "french": "Décroche le téléphone."
    },
    {
      "title": "Take off",
      "explanation": "Enlever (vêtement) ou décoller (avion).",
      "english": "Take off your coat.",
      "french": "Enlève ton manteau."
    },
    {
      "title": "Put on",
      "explanation": "Mettre un vêtement ou activer un appareil selon contexte.",
      "english": "Put on your jacket.",
      "french": "Mets ta veste."
    },
    {
      "title": "Come back",
      "explanation": "Revenir.",
      "english": "Come back tomorrow.",
      "french": "Reviens demain."
    },
    {
      "title": "Go out",
      "explanation": "Sortir (dehors, soirée).",
      "english": "We go out on Fridays.",
      "french": "Nous sortons le vendredi."
    }
  ],
  "english-for-work": [
    {
      "title": "Professional vocabulary",
      "explanation": "Deadline, agenda, manager, task, report.",
      "english": "The deadline is Friday.",
      "french": "L'échéance est vendredi."
    },
    {
      "title": "Meetings",
      "explanation": "Demander des précisions et reformuler les décisions.",
      "english": "Could you clarify that point?",
      "french": "Pourriez-vous préciser ce point ?"
    },
    {
      "title": "Emails",
      "explanation": "Objet clair, formule de politesse, demande et délai.",
      "english": "Please find the report attached.",
      "french": "Veuillez trouver le rapport en pièce jointe."
    },
    {
      "title": "Presentations",
      "explanation": "Décrire plan, données, conclusion et questions.",
      "english": "Let me summarize the findings.",
      "french": "Permettez-moi de résumer les résultats."
    },
    {
      "title": "IT English",
      "explanation": "Server, deployment, ticket, logs, backup.",
      "english": "The deployment was successful.",
      "french": "Le déploiement a réussi."
    },
    {
      "title": "Business English",
      "explanation": "Négociation, demande, proposition et suivi.",
      "english": "We would like to discuss the proposal.",
      "french": "Nous aimerions discuter de la proposition."
    },
    {
      "title": "Job interviews",
      "explanation": "Présenter expérience, projets, outils et résultats vérifiables.",
      "english": "I improved deployment reliability.",
      "french": "J'ai amélioré la fiabilité des déploiements."
    },
    {
      "title": "Workplace conversations",
      "explanation": "Informer, demander de l'aide et signaler un problème.",
      "english": "I need help with this ticket.",
      "french": "J'ai besoin d'aide avec ce ticket."
    }
  ],
  "practice": [
    {
      "title": "QCM",
      "explanation": "Choisir une réponse puis lire l'explication.",
      "english": "Choose the correct answer.",
      "french": "Choisis la bonne réponse."
    },
    {
      "title": "Fill in the blanks",
      "explanation": "Écrire le mot manquant ; attention à la forme du verbe.",
      "english": "She ___ English.",
      "french": "Elle étudie l'anglais."
    },
    {
      "title": "Translation",
      "explanation": "Traduire vers l'anglais en respectant sens et grammaire.",
      "english": "I work every day.",
      "french": "Je travaille tous les jours."
    },
    {
      "title": "Sentence building",
      "explanation": "Réorganiser des mots pour former une phrase correcte.",
      "english": "I am learning English.",
      "french": "J'apprends l'anglais."
    },
    {
      "title": "Listening quiz",
      "explanation": "Écouter avant de sélectionner la traduction.",
      "english": "Listen carefully.",
      "french": "Écoute attentivement."
    },
    {
      "title": "Pronunciation practice",
      "explanation": "Écouter, répéter et comparer les mots reconnus.",
      "english": "Please repeat after me.",
      "french": "Répète après moi."
    },
    {
      "title": "Vocabulary quiz",
      "explanation": "Relier un mot à son sens et l'employer en contexte.",
      "english": "A deadline is a date limit.",
      "french": "Une deadline est une échéance."
    },
    {
      "title": "Grammar quiz",
      "explanation": "Appliquer règles et constructions dans de nouveaux exemples.",
      "english": "He works on Mondays.",
      "french": "Il travaille le lundi."
    },
    {
      "title": "Flashcards",
      "explanation": "Cacher la traduction puis essayer de la retrouver de mémoire.",
      "english": "Remember the word.",
      "french": "Souviens-toi du mot."
    },
    {
      "title": "Daily challenge",
      "explanation": "Revenir chaque jour, corriger les erreurs et réviser.",
      "english": "Practice a little every day.",
      "french": "Entraîne-toi un peu chaque jour."
    }
  ]
}
