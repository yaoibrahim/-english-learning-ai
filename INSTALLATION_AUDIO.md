# English Learning AI — Sons, corrections et récompenses

## Contenu ajouté

- Sons courts et doux, générés localement avec **Web Audio API**, sans fichiers MP3 et sans service externe : bonne réponse, erreur, association de mots, fin d'exercice, attribution de XP.
- Petite animation et notification visuelle quand une leçon est terminée ou qu'une récompense est obtenue.
- Réglage 🔊 / 🔇 dans l'en-tête **ordinateur et téléphone** : activer/désactiver, volume de 0 à 100 %, prévisualisation des sons.
- Préférences sauvegardées localement sous `english-learning-audio-settings-v1` ; elles peuvent être incluses dans la sauvegarde JSON existante.
- Respect de la préférence système `prefers-reduced-motion` pour supprimer les animations inutiles.
- Aucun nouveau paquet npm, compte utilisateur, serveur ni paiement.

## Installer dans ton projet Windows

1. **Sauvegarde ton projet** et exporte ta progression depuis `/backup`.
2. Pour la **mise à jour légère**, décompresse le ZIP `English_Learning_AI_Sons_Mise_a_jour.zip` dans le dossier `Documents` en fusionnant les dossiers `english-learning-ai` avec ton projet existant. Les fichiers contenus dans l'archive prennent la même arborescence que ton projet.
3. **Ne copie pas** les dossiers `node_modules` ou `dist` d'une autre machine.
4. Dans PowerShell :

```powershell
cd C:\Users\yaoib\Documents\english-learning-ai\frontend
npm run test
npm run security:check
npm run build
npm run dev
```

5. Ouvre `http://localhost:5173/`. En haut du site, clique sur **🔊**. Règle le volume et essaie les deux boutons « Tester succès » et « Tester récompense ».

## Essais conseillés

- Une mauvaise réponse dans le parcours `/courses/a0-1` : deux notes graves, correction affichée.
- Une bonne réponse : son positif court.
- Une réussite dans `/library/practice` : son de fin d'exercice.
- Un exercice d'association `/library/practice` : un son par paire correcte et un autre pour les erreurs.
- Une première leçon validée (XP), par exemple le test de fin d'unité : petit jingle + confettis.
- Le bouton « Désactiver les effets sonores » dans les réglages : **plus aucun son de jeu** ; la célébration visuelle reste visible.
- Sur téléphone : même bouton 🔊 dans l'en-tête, indépendant de la navigation.

**Important :** les effets sonores ne coupent pas la voix anglaise de lecture des phrases. Le micro et la synthèse vocale restent des fonctions distinctes.

## Mettre à jour le site Netlify via GitHub

Après `npm run build` et tes essais dans le navigateur, à la racine du projet :

```powershell
cd C:\Users\yaoib\Documents\english-learning-ai
git status
git add .
git commit -m "Ajout sons de correction et recompenses"
git push origin main
```

Avec ton site Netlify relié à la branche `main`, Netlify déploiera la nouvelle version automatiquement si le build réussit.

## Notes techniques et limites

- **TypeScript** : contrôle réussi dans l'environnement de préparation avec TypeScript 5.8.3.
- **Tests automatisés** : 22 tests réussis, dont 2 tests audio.
- **Sécurité ciblée** : contrôle réussi.
- **Build Vite complet non exécuté ici** : les dépendances natives du ZIP d'origine étaient prévues pour Windows ; elles ne fonctionnent pas sur l'environnement Linux de préparation. Vérifier impérativement `npm run build` sur ton PC.
- La lecture audio peut être bloquée avant le premier clic ou dans un navigateur ne supportant pas `AudioContext`. Dans ce cas l'application reste utilisable, sans interrompre l'exercice.
- Les niveaux, les XP, les sauvegardes et le contenu des leçons sont conservés. Les effets de jeu ne demandent ni permissions micro ni connexion Internet.
