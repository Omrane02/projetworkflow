# ADR0001 : Choix du langage de programmation frontend pour un quiz web

---
## Contexte

**Mémoire de France** est un quiz permettant de tester ses connaissances sur l'histoire de la France, développé dans le cadre d'un projet pédagogique Git (YNOV Sophia B2, groupe 3).

Fonctionnalités :
- un quiz de type QCM à trois réponses ;
- un choix de difficulté (facile, moyen, difficile) ;
- un choix de mode de jeu (5, 10 ou 20 questions) ;
- un système de score basé sur le pseudonyme du joueur ;
- un scoreboard affichant les meilleurs scores de la session.

L'installation prévue se limite au téléchargement et au lancement direct du fichier `index.html`, sans étape de build, d'installation de dépendances ni de serveur applicatif. L'application doit donc être 100% autonome côté client (état du quiz, scoreboard de session compris).

Plusieurs options sont envisageables pour le frontend :
1. **HTML/CSS/JavaScript vanilla** : pas de dépendance, contrôle total, léger, exécutable directement en ouvrant `index.html`, mais plus de code à écrire à la main pour la gestion d'état et du DOM.
2. **Un framework/librairie (React, Vue, etc.)** : gestion d'état et du DOM facilitée, composants réutilisables, mais nécessite en général un outillage de build (bundler, transpileur) incompatible avec un simple lancement du fichier `index.html`, et une courbe d'apprentissage supplémentaire.
3. **TypeScript** (en complément du JS) : sécurise le typage, utile sur un projet qui grossit, mais ajoute une étape de compilation, elle aussi incompatible avec la contrainte de démarrage sans installation.

Le quiz n'a pas vocation à évoluer vers une application complexe multi-vues avec une gestion d'état avancée.

---
## Décision

Le frontend du quiz sera développé en **HTML, CSS et JavaScript vanilla (ES6+)**, sans framework ni bundler.

Justification :
- Le choix d'installation (« télécharger et lancer `index.html` ») impose une solution ne nécessitant ni build, ni bundler, ni serveur : le JavaScript vanilla y répond nativement.
- Le périmètre fonctionnel (QCM, sélection de difficulté et de nombre de questions, score, scoreboard de session) ne justifie pas la complexité additionnelle d'un framework.
- Cela s'appuie sur les compétences déjà maîtrisées par l'équipe, limitant le risque et le temps d'apprentissage sur un projet pédagogique à durée limitée.
- Le JavaScript natif permet un contrôle direct et transparent du DOM, suffisant pour la taille de l'application.
- La légèreté du livrable (pas de dépendances lourdes) améliore les temps de chargement et facilite le partage du projet (simple fichier `index.html` à ouvrir).

Conséquences :
- Le code de gestion d'état (difficulté choisie, mode de jeu, question courante, score, pseudonyme, scoreboard de session) devra être structuré manuellement (par exemple via des objets JS et des fonctions de rendu dédiées) pour éviter que le code ne devienne difficile à maintenir à plusieurs.
- Le scoreboard étant limité à la session (pas de persistance mentionnée), son stockage pourra se faire en mémoire JS (ou via `localStorage` si une persistance entre sessions est souhaitée ultérieurement) sans nécessiter de backend.
- Si le projet venait à s'étendre significativement (multi-pages complexes, gestion d'état partagé important, persistance serveur des scores), une réévaluation vers un framework et/ou un backend pourrait être envisagée dans un ADR ultérieur.