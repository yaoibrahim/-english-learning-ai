# English Learning AI — Découverte progressive par phrases

Cette version adapte **le projet que tu as fourni** en conservant les 35 unités A0–C2 et les modules déjà présents.

## Ce qui change

Chaque page `/courses/:unitId` propose désormais :

1. **Découverte phrase par phrase** : les notions présentes dans `unit.lessons` et les nouveaux mots de `unit.vocabulary` s'alternent.
2. **Explications en français et prononciation** : une phrase anglaise, sa traduction, l'explication de la règle, et deux vitesses d'écoute.
3. **Rappel du vocabulaire** : les mots des anciennes unités utilisés dans la phrase sont signalés en vert ; le mot introduit dans l'étape est signalé en jaune.
4. **Bilan** : les mots du jour, une lecture et une phrase à prononcer.
5. **Exercices nouveaux** : QCM sur le sens des mots et reconstitution de phrases par clic sur les mots mélangés.
6. **Entraînement et test existants** : les exercices de `CourseQuiz` et le test final `UnitTests` n'ont pas été supprimés.

Il n'y a **aucune condition de réussite** pour les nouveaux exercices de découverte : tu peux les refaire autant de fois que souhaité. Seul le **test final du parcours guidé** conserve sa règle de 80 % pour débloquer l'unité suivante. Les sections `/library` restent indépendantes et sans cadenas.

## Fichiers concernés

- `frontend/src/lib/sentenceDiscovery.ts` **nouveau** : construit la séquence et les nouveaux exercices à partir des données existantes.
- `frontend/src/components/courses/SentenceDiscovery.tsx` **nouveau** : interface de découverte et mini-quiz.
- `frontend/src/pages/CourseUnit.tsx` **modifié** : insère la découverte avant les exercices et le test.
- `frontend/src/pages/Home.tsx`, `frontend/src/pages/Courses.tsx`, `frontend/src/components/courses/LevelPath.tsx` : textes d'accueil actualisés.
- `frontend/tests/sentenceDiscovery.test.mjs` **nouveau** : vérifie les 35 séquences, les exercices et les mots réemployés.

## Ajouter une notion à une unité

Dans `frontend/src/data/courses.ts`, repère l'unité choisie et ajoute une entrée à son tableau `lessons` :

```ts
{
  category: 'Grammaire — Pronoms',
  title: 'Le pronom she',
  explanation: 'She signifie elle. Avec she, le verbe be devient is au présent.',
  english: 'She is a student.',
  french: 'Elle est étudiante.',
}
```

La nouvelle notion apparaîtra automatiquement dans la découverte progressive de cette unité. Les notions peuvent concerner les **pronoms**, **articles**, **adjectifs**, **auxiliaires**, **temps**, **adverbes**, **orthographe** ou d'autres thèmes.

## Ajouter un nouveau mot

Ajoute-le au tableau `vocabulary` de l'unité dans `courses.ts` :

```ts
{ english: 'teacher', french: 'professeur' }
```

Puis ajoute une phrase d'exemple à `frontend/src/data/unitContent.ts`, dans l'objet `wordExamples` :

```ts
 'teacher': ['She is a teacher.', 'Elle est professeure.'],
```

Le mot sera introduit dans sa propre phrase, ajouté aux exercices de reconnaissance et disponible pour les révisions des unités suivantes. Les tests existants signalent l'absence d'une phrase d'exemple pour un nouveau mot.

**Important :** dans une phrase d'exemple, utilise autant que possible des mots déjà étudiés et une seule nouvelle difficulté grammaticale à la fois.

## Conservation des progrès

La position de lecture de chaque unité est conservée localement sous la clé `english-learning-sentence-steps-v1`. Cette clé est incluse dans la sauvegarde JSON de `/backup`. Les XP et le résultat du test final restent gérés par les hooks existants.

## Installation sur Windows

1. Sauvegarde ton projet et utilise `/backup` pour exporter tes progrès.
2. Décompresse la mise à jour dans le dossier qui contient ton dossier `frontend` ; ne supprime pas les autres fichiers.
3. Depuis `english-learning-ai/frontend`, lance :

```powershell
npm ci
npm run test
npm run security:check
npm run build
npm run dev
```

4. Ouvre `http://localhost:5173/courses/a0-1`. Enchaîne les phrases, écoute, consulte les traductions et termine les nouveaux exercices.
5. Après un build réussi, publie ta mise à jour en poussant les modifications sur la branche Git suivie par Netlify.

**Validation effectuée ici :** tests Node et contrôle de sécurité. Une compilation `npm run build` complète nécessitera l'installation des dépendances, indisponible dans cet environnement d'exécution.
