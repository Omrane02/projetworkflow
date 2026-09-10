# Runbook — Mémoire de France

Ce document décrit les procédures techniques pas-à-pas du projet. Pour les règles d'équipe et de processus, voir le **Playbook**.

---
## Lancer le projet en local

1. Cloner le dépôt Git du projet.
2. Ouvrir le fichier `index.html` directement dans un navigateur (double-clic ou glisser-déposer).
3. Le quiz doit se lancer automatiquement (appel de `initGame()` au chargement du DOM).

Aucune installation de dépendance ni serveur n'est nécessaire : le projet est 100 % statique.

---
## Ajouter une nouvelle question

1. Ouvrir `backendGamePage/backend.js`.
2. Repérer la section correspondant au niveau de difficulté voulu (commentaires `// Niveau 1 : Facile`, `// Niveau 2 : Moyen`, `// Niveau 3 : Difficile`).
3. Ajouter un objet au tableau `questions` en respectant le format :
   ```js
   { question: "Texte de la question ?", answers: ["Réponse A", "Réponse B", "Réponse C"], correct: 1 }
   ```
4. `correct` correspond à l'**index** (0, 1 ou 2) de la bonne réponse dans `answers`.
5. Sauvegarder puis recharger `index.html` dans le navigateur pour vérifier que la question s'affiche correctement (relancer plusieurs fois si besoin, le tirage étant aléatoire via `shuffleArray`).

---
## Modifier la logique du quiz

1. Ouvrir `backendGamePage/game.js`.
2. Fonctions clés à connaître :
   - `initGame()` : réinitialise le score, mélange les questions (`shuffleArray`), affiche la première question.
   - `showQuestion()` : affiche la question courante et génère dynamiquement les boutons de réponse.
   - `selectAnswer(selectedIndex, btnElement)` : gère le clic sur une réponse, désactive les boutons, colore bonne/mauvaise réponse, met à jour le score.
   - `nextQuestion()` : passe à la question suivante.
   - `showFinalResult()` : affiche l'écran de fin avec le score final et le bouton "Rejouer".
3. Après toute modification, tester le déroulé complet du quiz : première question → réponse → question suivante → dernière question → écran de résultat → rejouer.

---
## Créer une branche et proposer une PR

1. Se placer sur la branche principale à jour (`git pull`).
2. Créer une branche avec le bon préfixe :
   ```
   git checkout -b feature/nom-de-la-fonctionnalite
   ```
   (ou `doc/...`, `fix/...` selon le cas — voir le Playbook)
3. Développer et commiter les changements.
4. Pousser la branche : `git push -u origin feature/nom-de-la-fonctionnalite`.
5. Ouvrir une pull request sur GitHub vers la branche principale.
6. Demander une revue à au moins deux membres de l'équipe.
7. Attendre les deux approbations avant de fusionner.

---
## Vérifier / réinitialiser une partie en cours

- Le score et la progression sont stockés uniquement en mémoire JavaScript (`score`, `currentQuestionIndex`, `shuffledQuestions`), sans persistance.
- Pour réinitialiser une partie manuellement (hors clic sur "Rejouer") : recharger simplement la page (`F5` ou actualiser le navigateur), ce qui relance `initGame()` via l'écouteur `DOMContentLoaded`.

---
## Déboguer un problème d'affichage ou de script

1. Ouvrir la console développeur du navigateur (`F12` ou clic droit → Inspecter → Console).
2. Vérifier qu'aucune erreur JS n'apparaît au chargement (erreur fréquente : `backend.js` non chargé avant `game.js`, ou tableau `questions` mal formé après une modification).
3. Vérifier l'ordre des scripts dans `index.html` :
   ```html
   <script src="./backendGamePage/backend.js"></script>
   <script src="./backendGamePage/game.js"></script>
   ```
   `backend.js` doit impérativement être chargé avant `game.js`, car ce dernier utilise la variable globale `questions`.
4. Si une question ne s'affiche pas correctement, vérifier dans `backend.js` que l'objet correspondant a bien exactement 3 éléments dans `answers` et un `correct` valide (0, 1 ou 2).
