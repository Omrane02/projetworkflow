# ADR0002 : Choix du workflow Git pour le projet Mémoire de France

---
## Contexte

Le projet **Mémoire de France** est développé en équipe (groupe 3, 6 personnes) dans le cadre d'un projet pédagogique Git à YNOV Sophia B2. Un fonctionnement collaboratif clair est nécessaire pour :
- permettre à plusieurs membres de travailler en parallèle sans se bloquer mutuellement ;
- distinguer les types de contributions (nouvelles fonctionnalités, documentation, corrections, etc.) ;
- garder un historique lisible et une branche principale toujours stable/fonctionnelle ;
- faciliter la revue de code avant intégration.

Plusieurs stratégies de workflow Git sont envisageables :
1. **Git Flow** : workflow structuré avec des branches dédiées (`develop`, `release`, `hotfix`, `feature/*`), plus adapté aux projets avec cycles de release formalisés.
2. **GitHub Flow** : workflow simplifié basé sur une branche principale stable et des branches courtes créées pour chaque tâche, fusionnées via pull request.
3. **Trunk-based development** : commits fréquents et directs sur la branche principale, avec des branches très courtes voire absentes — nécessite une forte discipline et des tests automatisés robustes.

Pour un projet pédagogique de taille réduite, sans logique de release formelle ni environnement de production à gérer, un workflow léger et facile à appliquer par toute l'équipe est préférable.

---
## Décision

L'équipe adopte un **GitHub Flow**, avec une convention de nommage des branches par préfixe selon le type de contribution :
- `feature/nom-de-la-fonctionnalite` pour le développement de nouvelles fonctionnalités ;
- `doc/nom-du-sujet` pour les mises à jour de documentation ;
- (et par extension, d'autres préfixes du même type si besoin, par exemple `fix/` pour les corrections de bugs).

Chaque branche est créée à partir de la branche principale, dédiée à une tâche précise, puis fusionnée dans la branche principale via pull request une fois le travail terminé. **Une pull request doit être validée (review approuvée) par au moins deux membres de l'équipe avant d'être fusionnée.**

Justification :
- Le workflow est simple à comprendre et à appliquer, adapté à une équipe étudiante sans besoin de gestion de releases multiples.
- Le préfixage des branches (`feature/`, `doc/`, etc.) permet d'identifier immédiatement la nature d'une branche et facilite le suivi de l'avancement du projet.
- Les branches courtes limitent les risques de conflits et favorisent une intégration régulière du travail de chacun.
- L'exigence de deux validations par pull request réduit le risque d'erreurs ou d'oublis passant inaperçus, favorise la relecture croisée du code entre membres, et évite qu'une seule personne ne valide (et potentiellement fusionne) son propre travail sans second avis.

Conséquences :
- La branche principale doit rester stable en permanence : tout travail en cours passe par une branche dédiée.
- L'équipe doit respecter la convention de nommage pour garder l'historique des branches lisible et cohérent.
- Une pull request ne peut pas être fusionnée tant que deux approbations n'ont pas été obtenues, ce qui peut ralentir l'intégration si l'équipe n'est pas disponible en simultané ; une organisation (créneaux de revue, répartition des relecteurs) doit être anticipée pour éviter les blocages.
- Aucune gestion de branches de release ou de hotfix n'est prévue, ce qui est cohérent avec le périmètre pédagogique et l'absence de mise en production formelle du projet.