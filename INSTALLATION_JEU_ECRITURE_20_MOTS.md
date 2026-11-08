# English Learning AI — Jeu « Écrire 20 mots » (Bibliothèque)

## Objectif

Ajout d'un second jeu libre, indépendant du QCM. Une définition en français est affichée : écris le mot anglais ou l'expression correspondante au clavier. Le jeu utilise le **catalogue existant** des verbes, notions grammaticales, mots confondus et phrasal verbs.

- **20 termes distincts** par partie, tirés aléatoirement.
- Priorité aux termes absents des **8 derniers tirages du mode écriture** (historique local, distinct de celui du QCM).
- Après une mauvaise réponse : « Erreur, vous vous êtes trompé », la bonne traduction et, lorsqu'il existe, l'exemple. La question revient à la fin de la file jusqu'à réussite.
- **Seule une bonne réponse valide un terme.** La partie se termine quand les 20 termes sont validés.
- Indice facultatif (première lettre, nombre de mots, longueur), sons de réussite/erreur et lecture de la bonne réponse en anglais.
- Majuscules, espaces supplémentaires et apostrophes typographiques tolérés ; mais les différences importantes, par exemple `its` et `it's`, sont distinguées.
- Une autre traduction anglaise présente dans le catalogue **avec exactement la même définition française et la même catégorie** peut être acceptée.
- Sans compte, sans cadenas et sans nouvelle dépendance npm.

## Installation recommandée

1. Sauvegarder le projet et exporter la progression via `/backup`.
2. Décompresser **English_Learning_AI_Jeu_Ecriture_20_Mots_Mise_a_jour.zip** dans le dossier parent `C:\Users\yaoib\Documents\`, puis fusionner le dossier `english-learning-ai` avec le projet existant.
3. Depuis PowerShell :

```powershell
cd C:\Users\yaoib\Documents\english-learning-ai\frontend
npm run test
npm run security:check
npm run build
npm run dev
```

4. Ouvrir `http://localhost:5173/library/spelling-game`, ou bien **Bibliothèque → Écrire les mots — 20 défis**.

## Fichiers ajoutés

- `frontend/src/lib/spellingGame.ts` — validation pure et clés de stockage.
- `frontend/src/pages/LibrarySpellingGame.tsx` — interface du jeu au clavier.
- `frontend/tests/spellingGame.test.mjs` — tests automatisés.

## Fichiers modifiés

- `frontend/src/App.tsx` — chargement différé et route `/library/spelling-game`.
- `frontend/src/pages/LibraryHome.tsx` — nouvelle carte de Bibliothèque.
- `frontend/src/pages/LibraryWordGame.tsx` — lien du QCM vers l'autre jeu.
- `frontend/src/components/layout/MobileNavigation.tsx` — lien dans le menu mobile.

Ne pas remplacer aveuglément `App.tsx` si tu l'as personnalisé après la dernière mise à jour ; reporter alors uniquement la nouvelle route et son import.

## Sauvegarde locale

Le mode écriture utilise deux nouvelles clés `localStorage` :

- `english-learning-spelling-game-history-v1`
- `english-learning-spelling-game-stats-v1`

Elles sont indépendantes des statistiques et de l'historique du jeu QCM. Leur nom commence par `english-learning-`, afin que le module général de sauvegarde puisse les inclure s'il exporte bien ces clés.

## Publication Netlify liée à GitHub

Une fois le build et le test navigateur réussis :

```powershell
cd C:\Users\yaoib\Documents\english-learning-ai
git add .
git commit -m "Ajout jeu de 20 mots à écrire"
git push origin main
```

Netlify publiera le dépôt connecté après le build. Vérifier ensuite `/library/spelling-game` sur l'adresse Netlify.

## Contrôles effectués

- Tests automatisés Node : **40/40 réussis** (dont 9 pour le jeu écrit).
- TypeScript avec `tsc -b` : **réussi** dans un environnement de vérification (compilateur global TypeScript 5.8.3).
- Contrôle de sécurité ciblé : **aucun indicateur bloquant**.
- Build Vite : **non vérifié dans cet environnement Linux**, car les dépendances natives du projet fourni ont été installées pour Windows. Le `npm run build` Windows est indispensable.

Ce quiz vérifie la réponse écrite et ne constitue pas une analyse complète de toutes les traductions synonymes possibles.
