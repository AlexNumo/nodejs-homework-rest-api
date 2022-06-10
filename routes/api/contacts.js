const express = require('express');
const {listContacts, getById, addContact, updateContact, removeContact, updateFavorite} = require('../../controllers/contacts');
const router = express.Router();
const {schemaPatch, schemaCreate} = require('../../models/contact');
const {validateRequest} = require('../../middlewares/validateRequest');


router.get('/', listContacts);
// TODO: add validation for id using mongoose function isValidObjectId (for sending correct status)
router.get('/:id', getById);
router.post('/', validateRequest(schemaCreate), addContact);
router.put('/:id', updateContact);
router.patch('/:id/favorite', validateRequest(schemaPatch), updateFavorite);
router.delete('/:id', removeContact);

module.exports = router;
