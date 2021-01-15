const ownerDataMapper = require('../datamappers/ownerDataMapper');

module.exports = {

    getAllOwners: async (_, response) => {

        try {

            const allOwners = await ownerDataMapper.getAllOwners();

            if (!allOwners) {

                return response.status(200).json({ message: 'Aucun propriétaire n\'est enregistré!' });

            };

            response.status(200).json({ data: allOwners });

        } catch (error) {

            response.status(500).json(error.toString());

        };

    },

    getOwnerbyId: async (request, response) => {

        try {

            const selectedOwner = await ownerDataMapper.getOneOwner(request.params.id);

            if (!selectedOwner) {

                return response.status(400).json({ message: 'Ce propriétaire n\'existe pas!' });

            };

            response.status(200).json({ data: selectedOwner });


        } catch (error) {

            response.status(500).json(error.toString());

        };

    },

    createOneOwner: async (request, response) => {

        try {

            if (!request.body.name) {

                return response.status(400).json({ message: `Vous devez remplir le champ 'name'` });

            };

            const newOwner = await ownerDataMapper.createOneOwner(request.body.name);

            response.status(200).json({ message: 'Propriétaire ajouté!', data: newOwner });

        } catch (error) {

            response.status(500).json(error.toString());

        };

    },

    updateOneOwner: async (request, response) => {

        try {

            if (!request.body.name) {

                return response.status(400).json({ message: `Vous devez remplir le champ 'name'` });

            };

            const ownerToUpdate = await ownerDataMapper.updateOneOwner(request.params.id, request.body.name);

            if (!ownerToUpdate[0]) {

                return response.status(400).json({ message: 'Ce propriétaire n\'existe pas!' });

            };

            response.status(200).json({ message: 'Propriétaire modifié!', data: ownerToUpdate });

        } catch (error) {

            response.status(500).json(error.toString());

        };

    },

    deleteOneOwner: async (request, response) => {

        try {

            const ownerToDelete = await ownerDataMapper.deleteOneOwner(request.params.id);

            if (!ownerToDelete[0]) {

                return response.status(400).json({ message: 'Ce propriétaire n\'existe pas!' });

            };

            response.status(200).json({ message: 'Propriétaire supprimé!', data: ownerToDelete });

        } catch (error) {

            response.status(500).json(error.toString());

        };

    }

};