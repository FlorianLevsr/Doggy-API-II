module.exports = {

    homepage: (_, response) => {

        response.status(200).json({ 

            title: "Bienvenue sur DoggyAPI",
            subtitle: "API publique réalisée avec l'ORM Sequelize à des fins pédagogiques",
            content: "Une doc swagger est disponible. Copiez-collez le contenu du fichier swagger-doc.yaml dans Swagger Editor (https://editor.swagger.io/) pour utiliser l'api."
        
        });
        
    }

};
