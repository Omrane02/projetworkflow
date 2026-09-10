# Playbook — Mémoire de France

Ce document décrit les règles et processus de travail de l'équipe (groupe 3, YNOV Sophia B2). Pour les procédures techniques pas-à-pas, voir le **Runbook**.

---
## Organisation Git

- Workflow : **GitHub Flow**.
- Nommage des branches par préfixe selon le type de travail :
  - `feature/nom-de-la-fonctionnalite` → nouvelle fonctionnalité (ex : `feature/mode-difficulte`, `feature/scoreboard`)
  - `doc/nom-du-sujet` → documentation (ex : `doc/readme`, `doc/adr-workflow`)
  - `fix/nom-du-bug` → correction de bug
- Toute branche part de la branche principale et y est fusionnée via **pull request**.
- **Une PR doit être approuvée par au moins deux membres de l'équipe** avant d'être fusionnée.
- La branche principale doit toujours rester dans un état fonctionnel (le quiz doit se lancer sans erreur).

---
## Répartition du code

Le projet est structuré en deux grandes responsabilités, à respecter lors des contributions :
- **`backendGamePage/backend.js`** : les données du quiz (le tableau `questions`, avec `question`, `answers`, `correct`). Toute modification/ajout de question passe par ce fichier.
- **`backendGamePage/game.js`** : la logique du jeu (mélange des questions, affichage, gestion des réponses, score, redémarrage). Toute évolution de comportement (nouvelle règle, nouvel écran, nouveau mode) passe par ce fichier.
- **`index.html`** : la structure de page uniquement. Elle ne doit pas contenir de logique métier — tout passe par les scripts.

Avant d'ajouter une fonctionnalité qui touche à la structure de la page (ex : écran de choix de difficulté, saisie du pseudonyme, scoreboard), vérifier avec l'équipe si de nouveaux éléments HTML doivent être ajoutés à `index.html`, pour éviter les conflits de fusion entre plusieurs branches qui toucheraient le même fichier.

---
## Définition du "fini" pour une fonctionnalité

Une fonctionnalité (branche `feature/*`) est considérée prête à être proposée en PR quand :
- le quiz se lance sans erreur en console depuis `index.html` ;
- la fonctionnalité a été testée manuellement au moins une fois du début à la fin (y compris le cas "rejouer") ;
- le code respecte l'organisation des fichiers ci-dessus (pas de logique métier dans `index.html`, pas de données de question hors de `backend.js`) ;
- les noms de fonctions/variables sont explicites et cohérents avec l'existant (`initGame`, `showQuestion`, `selectAnswer`, etc.).

---
## Ajout de questions

- Toute nouvelle question doit respecter le format déjà en place : `{ question, answers: [3 réponses], correct: index }`.
- Les questions sont réparties par niveau via des commentaires (`// Niveau 1 : Facile`, `// Niveau 2 : Moyen`, `// Niveau 3 : Difficile`) dans `backend.js` — respecter cette organisation pour préparer la future fonctionnalité de choix de difficulté.
- Vérifier qu'il n'y a qu'une seule bonne réponse par question et que l'`index` de `correct` correspond bien à la position dans `answers`.

---
## Revue de code (PR)

- Vérifier que le fichier modifié correspond bien à sa responsabilité (données vs logique vs structure).
- Vérifier l'absence d'erreurs console et le bon fonctionnement du quiz de bout en bout avant d'approuver.
- En cas de désaccord sur une implémentation, en discuter en équipe avant de merger plutôt que d'imposer une modification directement sur la branche d'un autre membre.
