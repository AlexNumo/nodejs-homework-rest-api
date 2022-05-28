const express = require('express');
const router = express.Router();
const contacts = require('../../models');
const {createError} = require('../../errors');
const Joi = require('joi');

const schemaCreate = Joi.object({
  email: Joi.string().min(5),
  name: Joi.string().min(3),
  phone: Joi.number().min(0.1),
}).min(3).message("missing required name field");

const schemaUpdate = Joi.object({
  email: Joi.string().min(5),
  name: Joi.string().min(3),
  phone: Joi.number().min(0.1),
}).min(1).message("missing fields");

router.get('/', async (req, res, next) => {
  try{
    const allContacts = await contacts.listContacts()
    res.status(200).json(allContacts);
  } catch (e) {
    next(e);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getById(contactId)
    if(!contact){
      throw createError(404, "Not found");
    }
    res.status(200).json(contact);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try{
    const {error} = schemaCreate.validate(req.body);
    if(error){
      throw createError(400, error.message);
    }
  const {name, email, phone} = req.body;
  const contact = await contacts.addContact(name, email, phone)
  res.status(201).json(contact);
  } catch(e){
    next(e);
  }
  
});

router.delete('/:contactId', async (req, res, next) => {
  try{
    const {contactId} = req.params;
    const contact = await contacts.removeContact(contactId);
    if(contact){
      throw createError(204, "contact deleted");
    }
    else {
      throw createError(404, "Not found");
    }
  } catch (e){
    next(e);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try{
    const {error} = schemaUpdate.validate(req.body);
    if(error){
      throw createError(400, error.message);
    }
    const {name, email, phone} = req.body;
    const {contactId} = req.params;
    const contact = await contacts.updateContact(contactId, name, email, phone);
    if(!contact){
      throw createError(404, "Not found");
    }
    res.status(200).json(contact);
  } catch (e) {
      next(e);
  }
});

module.exports = router;
