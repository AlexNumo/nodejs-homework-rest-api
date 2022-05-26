const express = require('express');
const router = express.Router();
const contacts = require('../../models');

router.get('/', async (req, res, next) => {
  const all = await contacts.listContacts()
  res.json(all);
});

router.get('/:contactId', async (req, res, next) => {
  // const { id } = req.params;
  // const contact = await contacts.getContactById(id)
  // res.console.log(contact)
});

router.post('/', async (req, res, next) => {
  const {name, email, phone} = req.body;
  const contact = await contacts.addContact(name, email, phone)
  res.status(201).json(contact);
});

router.delete('/:contactId', async (req, res, next) => {
  const {id} = req.params;
  const contact = await contacts.removeContact(id);
  res.status(204).json(contact)
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
});

module.exports = router;
