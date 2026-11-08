# Nouveau module — Jeu de mots aléatoires (20 termes)

## Ce qu'il fait

- **20 termes anglais distincts par partie**, issus des données existantes de la bibliothèque libre (349 verbes, 246 entrées de grammaire, 51 entrées de mots confondus et 36 phrasal verbs, soit 682 entrées dans cette version).
- Chaque question affiche **quatre définitions françaises** parmi lesquelles choisir.
- En cas d'erreur : message **« Erreur, vous vous êtes trompé. »**, affichage de la bonne définition (et de l'exemple, s'il existe), puis la question **revient en fin de partie** jusqu'à une réponse correcte.
- Seules **20 bonnes réponses sur les 20 termes tirés** terminent la partie. Pas de cadenas et aucune limite de tentatives.
- **Nouveau tirage à chaque ouverture ou clic sur « Autre tirage »**. L'historique des **huit dernières parties** est gardé dans `localStorage` pour minimiser les répétitions, mais les répétitions restent possibles au fil du temps.
- Sons correct/erreur et célébration déjà installés dans l'application ; pas de service externe.
- Compatible PC/téléphone ; ajoute une entrée dans la bibliothèque et dans le menu mobile.

## Installation

### Option A : ZIP de mise à jour

1. Fermer VS Code si des fichiers sont ouverts et **sauvegarder le projet**. Utiliser `/backup` pour exporter la progression.
2. Décompresser le ZIP de mise à jour **dans `C:\Users\yaoib\Documents\`** ; fusionner le dossier `english-learning-ai` avec le dossier actuel en conservant l'arborescence.
3. Ne pas supprimer les autres modules. Les fichiers `App.tsx`, `LibraryHome.tsx` et `MobileNavigation.tsx` sont adaptés à la version **English_Learning_AI_Sons_Projet_Complet.zip**. Si vous les avez modifiés depuis, reporter manuellement les changements ci-dessous plutôt que de les remplacer.
4. Dans PowerShell, se placer dans `frontend` et lancer :

```powershell
cd C:\Users\yaoib\Documents\english-learning-ai\frontend
npm run test
npm run security:check
npm run build
npm run dev
```

5. Ouvrir `http://localhost:5173/library/word-game`.

### Option B : insertion manuelle dans un projet personnalisé

Copier ces trois nouveaux fichiers :

- `frontend/src/lib/wordGameEngine.ts`
- `frontend/src/data/wordGameCatalog.ts`
- `frontend/src/pages/LibraryWordGame.tsx`

Ajouter la route dans `src/App.tsx` :

```tsx
const LibraryWordGame = lazy(() => import('./pages/LibraryWordGame'))
```

Puis à l'intérieur des `<Routes>` :

```tsx
<Route path="/library/word-game" element={<LibraryWordGame />} />
```

Ajouter une carte dans `src/pages/LibraryHome.tsx` et, facultativement, un lien dans `src/components/layout/MobileNavigation.tsx`.

## Essai rapide

1. Le compteur doit afficher **0/20** et quatre traductions possibles.
2. Cliquer volontairement sur une mauvaise traduction ; vérifier la bonne définition et le message d'erreur.
3. Cliquer sur « Question suivante » : le mot n'est pas validé et reviendra après les autres.
4. Répondre correctement à son retour : il sera définitivement validé.
5. Atteindre 20/20 : écran de réussite. Rejouer ou recharger la page : nouveau tirage.
6. Tester le son, notamment en mode silencieux.

## Publication Netlify depuis GitHub

Après avoir vérifié les tests et la compilation locale, depuis le dossier racine du dépôt :

```powershell
git add frontend/src frontend/tests
git commit -m "Ajout du jeu de 20 mots aleatoires"
git push origin main
```

Netlify reconstruira le site automatiquement si le dépôt est lié. La route directe `/library/word-game` utilisera les règles de redirection SPA déjà présentes dans le projet.

## Notes techniques

- Le catalogue reprend les **traductions et exemples existants** : aucune définition n'est produite par une IA ou une API.
- Les clés `english-learning-word-game-history-v1` et `english-learning-word-game-stats-v1` sont enregistrées en `localStorage` ; les sauvegardes JSON du TP 27.18 peuvent les inclure.
- Les tirages récents influencent les tirages futurs, **sans garantir qu'un mot ne se répétera jamais**.
- Le score du jeu reste **indépendant des XP et de la progression guidée**, afin de ne pas modifier leur logique.
