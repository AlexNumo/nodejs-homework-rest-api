const express = require('express');
const {registerUser, loginUser, logoutUser} = require('../../controllers/auth');
const router = express.Router();
const {schemaRegister, schemaLogin} = require('../../models/user');
const {validateRequest} = require('../../middlewares/validateRequest');
const {auth} = require('../../middlewares/auth');
const {getCurrent} = require('../../services/auth.service');



router.post('/signup', validateRequest(schemaRegister), registerUser);
router.post('/login', validateRequest(schemaLogin), loginUser);
router.get('/logout', auth, logoutUser);
router.get('/current', auth, getCurrent)


module.exports = router;
