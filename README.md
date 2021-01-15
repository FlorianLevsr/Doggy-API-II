# Doggy-API-II
Refonte de l'API Doggy-API, réalisée cette fois-ci sans ORM (SQL natif uniquement) et ajout d'un cache REDIS


## Technologies utilisées

- Node.js
- PostgreSQL
- Sqitch
- Redis

## Packages npm utilisés

- dotenv
- express
- pg
- jsonwebtoken
- bcrypt
- cors
- sqitch
- joi
- (optionnel) nodemon

## Initialisation

1. Installez les différents packages npm à l'aide de la commande ``npm install``.
2. Configurez vos accès à postgreSQL et Redis en créant un fichier ``.env`` (un fichier .env_example est disponible)
3. Configurez les accès de Sqitch à postgresql en créant un fichier ``sqitch.conf`` (un fichier ``sqitch_example.conf`` est disponible) et executez la commande ``sqitch deploy``.
4. Executez la commande ``npm run import`` pour executer le script ``data-import.js`` qui remplira votre base de données postgresql nouvellement créée.
5. Executez la commande ``npm run start`` (ou ``npm run dev`` si vous avez préalablement installé le package nodemon à l'aide la commande ``npm install nodemon -g``).

6. (optionnel) Un fichier ``swagger-doc.yaml`` est à disposition. Copiez-collez son contenu dans Swagger Editor (https://editor.swagger.io/) pour intéragir avec l'api.

*Informations: Cette API a été exclusivement créée à des fins pédagogiques. Les données sont entièrement factices. Aucun 'front'/partie client n'est disponible et je ne peux que vous conseiller d'utiliser une application bureau telle que Insomnia pour intéragir avec l'API. Enfin, n'hésitez pas à poster un ticket incident si vous avez des questions et/ou rencontrez un problème avec l'API.*



