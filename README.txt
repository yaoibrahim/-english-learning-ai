TP 27.16 - Révisions intelligentes / English Learning AI
==========================================================

COMPATIBILITÉ
- Projet frontend React + TypeScript + Vite des TP 27.14/27.15.
- App.tsx inclus est basé sur App_TP27_15_Reading.tsx.
- Le ZIP ne contient pas le projet complet : il contient les nouveaux fichiers et deux quiz existants modifiés.
- Sauvegarder son projet avant toute opération.

INSTALLATION
1) Extraire le ZIP.
2) Copier le CONTENU du dossier frontend/src/ fourni vers le dossier frontend/src/
   de votre projet (fusionner les dossiers sans supprimer les autres fichiers).
3) Deux fichiers EXISTANTS sont modifiés et doivent être remplacés :
   - src/components/reading/ReadingQuiz.tsx
   - src/components/writing/WritingQuiz.tsx
   Si vous les avez personnalisés, reporter uniquement les ajouts recordReviewMistake
   au lieu d'écraser vos personnalisations.
4) App.tsx fourni ajoute :
   - import SmartReview from './pages/SmartReview'
   - import ReviewHomeCard from './components/review/ReviewHomeCard'
   - <ReviewHomeCard /> dans la grille des activités
   - <Route path="/reviews" element={<SmartReview />} /> dans <Routes>
   Si App.tsx a été modifié depuis le TP 27.15, reportez ces quatre ajouts.
5) Modifier MANUELLEMENT src/data/activities.ts avec ACTIVITIES_AJOUTER.txt.
6) Lancer npm run build puis npm run dev depuis frontend.
7) Vérifier http://localhost:5173/reviews

TEST FONCTIONNEL
1) Aller sur /reading, répondre volontairement faux à une question,
   puis cliquer Vérifier ma réponse.
2) Aller sur /reviews : 1 question apparaît comme à revoir.
3) Répondre correctement et terminer la séance : la question est programmée
   pour le lendemain, et 15 XP de base sont accordés la première fois.
4) Après une bonne réponse à une question en révision : J+1, puis J+3,
   J+7, J+14, J+30, J+60 selon les réussites successives.
5) Une erreur en révision remet la question à revoir immédiatement.
6) Tester une réponse fausse dans /writing : elle doit aussi apparaître.

CONTRAINTES
- Enregistrement localStorage dans le navigateur (pas de compte synchronisé).
- Les erreurs anciennes avant l'installation ne sont pas récupérables
  faute d'historique question par question.
- Le TP suit automatiquement Reading et Writing uniquement ;
  il pourra être branché sur Listening et Speaking ensuite.
- La correction Writing vérifie les réponses enregistrées et leurs variantes.
  Elle ne reconnaît pas toutes les traductions valides.
- Aucune API IA externe ; planification répétition espacée déterministe.
- En cas de stockage local indisponible, les données ne sont conservées
  que pendant la session de page.
