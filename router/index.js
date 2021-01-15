const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
const ownerController = require('../controllers/ownerController');
const accountController = require('../controllers/accountController');

const authenticateToken = require('../mw/authenticateToken');
const { refreshToken }  = require('../mw/refreshToken');

const { validateBody } = require('../validation/validator');
const { createOwnerSchema, editOwnerSchema } = require('../validation/schema/owner');

const notFound = require('../mw/notFound');

router.get('/', mainController.homepage);

router.post('/login', accountController.login);
router.post('/token', authenticateToken.authenticateToken, refreshToken )
router.get('/logout', authenticateToken.authenticateToken, accountController.logout);

router.get('/owners', ownerController.getAllOwners);
router.get('/owner/:id(\\d+)', ownerController.getOwnerbyId);

router.post('/owner/create', authenticateToken.authenticateToken, validateBody(createOwnerSchema), ownerController.createOneOwner);
router.put('/owner/:id(\\d+)/edit', authenticateToken.authenticateToken, validateBody(editOwnerSchema), ownerController.updateOneOwner);
router.delete('/owner/:id(\\d+)/delete', authenticateToken.authenticateToken, ownerController.deleteOneOwner);

//404
router.use(notFound.error);


module.exports = router;

