# English Learning AI — TP 27.20

Application personnelle **React + TypeScript + Vite**, sans compte utilisateur ni serveur d'application.

## Nouveautés intégrées

- **Accueil unifié et responsive** inspiré de la capture de référence : statistiques sur 4 cartes, objectif et série, missions, activités principales et menu « Tout explorer ».
- **Navigation tablette/téléphone** : barre mobile fixe (Accueil, Leçons, Niveaux, Progrès, Plus) et menu « Plus » donnant accès à tous les modules.
- **Toutes les anciennes fonctionnalités préservées** : A0, A1–C2, bibliothèque libre, 35 unités mixtes, Listening, Speaking, Writing, Reading, révisions, XP, missions, sauvegarde.
- **Mise à jour entre onglets du même navigateur** pour les XP, objectifs, série, A0 et famille, en complément des autres modules déjà synchronisés.
- **TP 27.20** : tests automatisés, contrôles de sécurité ciblés, configuration pour hébergement statique gratuit et instructions de déploiement.

## Installation sous Windows / PowerShell

1. Fais une **sauvegarde de ton projet actuel et de ta progression JSON** (`/backup`) avant de remplacer les fichiers.
2. Extrais l'archive et ouvre le dossier `english-learning-ai/frontend` dans VS Code.
3. Dans le terminal :

```powershell
npm ci
npm run test
npm run security:check
npm run build
npm run dev
```

> `npm ci` nécessite une connexion Internet la première fois. Le ZIP ne contient volontairement ni `node_modules`, ni `dist`, ni `.git`, pour éviter les binaires spécifiques à Windows et de partager ton historique Git.

Ouvre **http://localhost:5173/**. Si tu souhaites tester le build final, lance `npm run preview` après `npm run build`.

## Modules et adresses

| Parcours | URL |
|---|---|
| Accueil | `/` |
| Parcours A0 | `/path` |
| Parcours A1–C2 | `/cefr` |
| Cours mixtes A0–C2 | `/courses` |
| Fiches de cours | `/courses/references` |
| Bibliothèque libre | `/library` |
| Verbes et temps | `/library/verbs` |
| Grammaire | `/library/grammar` |
| Mots confondus | `/library/confusions` |
| Phrasal verbs | `/library/phrasal` |
| Exercices libres | `/library/practice` |
| Listening / Speaking / Writing / Reading | `/listening`, `/speaking`, `/writing`, `/reading` |
| Révisions intelligentes | `/reviews` |
| Sauvegarde locale | `/backup` |
| Progrès | `/progress` |

**Aucun cadenas n'a été ajouté à la bibliothèque libre.** Les parcours guidés conservent leurs règles pédagogiques existantes.

## TP 27.20 : tests et sécurité

- `npm run test` : 11 tests unitaires / intégrité des données / configuration de routage et des sauvegardes.
- `npm run security:check` : recherche locale **ciblée** de clés privées, jetons évidents, HTML brut, fichiers de configuration manquants.
- `npm run build` : vérification TypeScript + création de `dist/`.
- `npm run lint` : analyse statique Oxlint existante (facultative si le projet comporte encore des avertissements antérieurs).
- `npm audit` : audit en ligne des dépendances à lancer séparément pour les vulnérabilités connues, **avec Internet**.
- Le fichier `public/_headers` configure des en-têtes HTTP sur Netlify : CSP, anti-iframe, no-sniff, referrer minimal, restrictions d'autorisations.
- `public/_redirects` permet de recharger `/library`, `/courses`, etc. sans erreur 404 sur Netlify.
- `public/robots.txt` et `noindex` déconseillent l'indexation par les moteurs de recherche. **Cela ne rend pas l'application privée.**

### Tests manuels indispensables

1. Accueil sur 320 px, 375 px, 768 px et ordinateur : pas de défilement horizontal, boutons accessibles, menu Plus utilisable.
2. Bibliothèque `/library` : verbes et temps sans cadenas ; quiz et association de trois paires.
3. Un quiz Listening, Speaking, Reading, Writing : correction et score final.
4. Une réussite A0 puis actualisation : XP et progression restent corrects.
5. Changer l'objectif quotidien ; ouvrir un autre onglet du même site et vérifier la mise à jour.
6. `/backup` : exporter un JSON, vérifier sa présence puis le restaurer après sauvegarde de précaution.
7. Sur le site hébergé : rafraîchir directement `/library/verbs`, `/courses` et `/backup`.
8. Sur téléphone : la voix de Speaking dépend du navigateur, des permissions microphone et du contexte HTTPS ; elle peut nécessiter un service réseau du navigateur.

## Déploiement gratuit avec Netlify

**Pas de compte dans ton application.** Un **compte chez l'hébergeur** est en revanche nécessaire pour la mettre en ligne.

1. Sur ton ordinateur, exécute `npm ci` (si nécessaire) et `npm run build` dans `frontend`.
2. Va sur [app.netlify.com/drop](https://app.netlify.com/drop), connecte-toi à Netlify et dépose le **dossier `frontend/dist/`**, pas le ZIP source et pas `node_modules`.
3. Netlify publie les fichiers statiques. Copiés depuis `public/`, `_redirects` et `_headers` sont inclus dans `dist/`.
4. Ouvre l'URL fournie par Netlify et teste le rechargement direct d'une page profonde (`/library/verbs`).

Autre méthode : relie un dépôt Git à Netlify ; indique le **Base directory** `frontend`, le **Build command** `npm run build` et le **Publish directory** `dist` (ou utilise `frontend/netlify.toml` comme référence).

Netlify propose une offre gratuite avec des **limites de crédits et de trafic**, susceptibles d'évoluer. Vérifie les conditions avant de publier : https://www.netlify.com/pricing/.

### Confidentialité et synchronisation

- Tous les XP, niveaux, révisions et statistiques restent dans le **`localStorage` du navigateur pour un domaine donné**.
- Les données sont partagées entre les onglets de ce même navigateur/origine, mais **pas automatiquement entre téléphone, PC ou différents domaines** (`localhost` → Netlify).
- Pour transférer la progression : `/backup` → **Exporter JSON** sur l'ancien appareil → **Restaurer** sur le nouveau.
- Le site Netlify est **publiquement accessible** à ceux qui connaissent son adresse ; `noindex` n'est pas une authentification. Ne mets pas de secrets ni de données privées dans les fichiers sources.
- L'API SpeechRecognition peut transmettre l'audio à un service de reconnaissance du navigateur selon la plateforme ; ne promets pas un usage intégralement hors-ligne.

## Dossiers importants

- `frontend/src/pages/Home.tsx` : nouvel accueil compact
- `frontend/src/components/layout` : menus ordinateur / mobile
- `frontend/src/styles/home.css` et `mobile.css` : styles
- `frontend/src/hooks` : progression, XP et stockage
- `frontend/src/lib/progressBackup.ts` : export / import JSON
- `frontend/tests` : tests automatisés
- `frontend/public` : fichiers statiques et règles de déploiement

**Nota :** les tests automatisés ne remplacent pas un test fonctionnel complet sur navigateur. La compilation finale doit être confirmée sur ton ordinateur après `npm ci`.
