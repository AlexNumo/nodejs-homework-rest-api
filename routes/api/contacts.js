const express = require('express');
const {listContacts, getById, addContact, updateContact, removeContact, updateFavorite} = require('../../controllers/contacts');
const router = express.Router();
const {schemaPatch, schemaCreate} = require('../../models/contact');
const {validateRequest, auth, validateId} = require('../../middlewares');


router.get('/', auth, listContacts);
// TODO: add validation for id using mongoose function isValidObjectId (for sending correct status)
router.get('/:id', validateId, getById);
router.post('/', validateRequest(schemaCreate), auth, addContact);
router.put('/:id', validateId, auth, updateContact);
router.patch('/:id/favorite', validateId, validateRequest(schemaPatch), updateFavorite);
router.delete('/:id', validateId, auth, removeContact);

module.exports = router;
