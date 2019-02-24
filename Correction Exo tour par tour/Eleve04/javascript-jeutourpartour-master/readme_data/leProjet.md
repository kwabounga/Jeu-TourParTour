# Project lifecycle

## Atlassian Documentation

[Leading an agile project](https://confluence.atlassian.com/jirasoftwareserver072/leading-an-agile-project-829056770.html)

1. [Starting a new project](https://confluence.atlassian.com/jirasoftwareserver072/starting-a-new-project-829056771.html) 
   - [Configuring a project](https://confluence.atlassian.com/jirasoftwareserver072/configuring-a-project-829056772.html)
     * Creating a board
     * Configure the board for your project
     * Tweak issue types, workflow, screens, and fields
     * Organizing work with components
     * Customizing the issues in a project
   - [Creating repositories](https://confluence.atlassian.com/bitbucketserver/creating-repositories-776639815.html)
   - [Configuring development tools](https://confluence.atlassian.com/jirasoftwareserver072/configuring-development-tools-829056897.html)
     * [Configuring workflow triggers](https://confluence.atlassian.com/adminjiraserver071/configuring-workflow-triggers-802592811.html)
2. [Building a backlog](https://confluence.atlassian.com/jirasoftwareserver072/building-a-backlog-829056905.html)
   - [Using the backlog](https://confluence.atlassian.com/jirasoftwareserver072/using-the-backlog-829056906.html)
3. [Planning a version](https://confluence.atlassian.com/jirasoftwareserver072/planning-a-version-829056922.html)
   - [Configuring versions in a Scrum project](https://confluence.atlassian.com/jirasoftwareserver072/configuring-versions-in-a-scrum-project-829056926.html)
   - [Working with epics](https://confluence.atlassian.com/jirasoftwareserver072/working-with-epics-829056932.html)
4. [Getting to work](https://confluence.atlassian.com/jirasoftwareserver072/getting-to-work-829056957.html)
   - [Running sprints in a Scrum project](https://confluence.atlassian.com/jirasoftwareserver072/running-sprints-in-a-scrum-project-829056958.html)
   - [Checking the progress of a version](https://confluence.atlassian.com/jirasoftwareserver072/checking-the-progress-of-a-version-829056995.html)
5. [Releasing a version](https://confluence.atlassian.com/jirasoftwareserver072/releasing-a-version-829057044.html)
   - [Checking the release status of a version](https://confluence.atlassian.com/jirasoftwareserver072/checking-the-release-status-of-a-version-829057045.html)
   - [Deploying a release](https://confluence.atlassian.com/jirasoftwareserver072/deploying-a-release-829057049.html)
6. [Reporting](https://confluence.atlassian.com/jirasoftwareserver072/deploying-a-release-829057049.html)

### [Epics, user stories, versions et sprints](https://fr.atlassian.com/agile/delivery-vehicles)
- les user stories
  * Dans un cadre de travail agile, les user stories constituent les unités de travail les plus petites. Leur objectif est de restituer au client une certaine valeur ajoutée. Les user stories désignent une série de phrases, rédigées dans un langage simple, qui décrivent le résultat souhaité. Elles n'entrent pas dans le détail. Les user stories suivent souvent le modèle suivant : "En tant que *type d'utilisateur*, je souhaite *objectif* pour pouvoir *avantage visé*".
- les sprints
- les epics
- les versions


# Définir le projet


![N|Solid](https://sdz-upload.s3.amazonaws.com/prod/upload/Cycle%20V.png)



- Identifier le contexte et les besoins principaux des utilisateurs
  1. Définir le contexte du futur logiciel
    - A qui rend-il service ? Le joueur
    - Sur quoi agit-il ? Page web
    - Dans quel but ? Divertir l'utilisateur
  2. Décomposer le système en parties, dit "package"
  3. Les cas d'utilisation

## Les spécifications fonctionnelles

- un auteur
- des scénarios utilisateurs
- un aperçu sous forme de diagramme
- des détails concernant chaque scénario utilisateurs
- des non-buts
- des questions en suspens

## Les spécifications techniques


# UML - Quel document pour quelle étape ?

## Etape: Analyse
### Pour définir les besoins (contexte et système)
- diagramme de contexte
- diagramme de cas d'utilisation
### Analyse de domaine
- diagramme de cas d'utilisation
- diagramme d'activité
- diagramme de classes
### Analyse applicative
- diagramme des séquences
- diagramme d'état-transition
- diagramme de collaboration
## Etape: Conception
### Conception de la solution
- Tous les diagrammes précédents
- diagramme de composants
- diagramme de déploiement

## SCRUM
Au début du projet, le projet est découpé en fonctionnalités qui sont listées dans un backlog, une sorte de grand tableau. Chaque mise en production est appelée release et est constituée de plusieurs sprints. Un sprint dure entre une et deux semaines et sert à développer une ou plusieurs fonctionnalités. Elles sont décidées par l’équipe et le Product Owner. Chaque sprint est découpé en Stories. À la fin de chaque sprint, l’équipe ajoute une nouvelle brique au projet qui devient ainsi, de sprint en sprint, de plus en plus complet. Son évaluation et le feedback récolté permettent d’ajuster le backlog pour le sprint suivant. Cela s’appelle l’inspection.

- Linda et Paul veulent s'affronter dans un petit jeu sur le même navigateur.
- Linda veut cliquer sur "easy" pour selectionner un niveau de difficulté facile
- Linda veut cliquer sur "medium" pour selectionner un niveau de difficulté moyen
- Linda veut cliquer sur "hard" pour selectrionner un niveau de diffifculté difficile
- Linda veut cliquer sur une case pour déplacer son personnage
- Linda veut cliquer sur "attaquer" pour infliger des dégâts au personnage de Paul
- Linda veut cliquer sur "defendre" pour réduire les dégâts de son personnage
- Linda veut récupérer une arme pour s'assurer la victoire à son personnage
- Linda veut cliquer sur fuire pour pouvoir quitter un combat
- Linda veut cliquer sur "Restart" pour relancer une nouvelle partie

```
jsdoc classes\board.js classes\cell.js classes\console.js classes\page.js classes\player.js classes\playerinfo.js classes\weapon.js display\generatorCSS.js game\game-controller.js game\game-display.js game\game-engine.js
```
