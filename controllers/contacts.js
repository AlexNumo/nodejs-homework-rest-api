const {contacts, email} = require("../services");
const {createError} = require("../helpers/errors");

const listContacts = async (req, res, next) => {
    try {
       //  req.query   ?name=kiwi
        const all = await contacts.listContacts();
        email.sendEmail();
        res.json(all);
    } catch (e) {
        next(e);
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await contacts.getById(id);
        if(!contact) {
            throw createError(404, "Not found");
        }
        res.json(contact);
    } catch (e) {
        next(e);
    }
}

const addContact = async (req, res, next) => {
    try {
        const contact = await contacts.addContact(req.body);
        res.status(201).json(contact);
    } catch (e) {
        if(e.message.includes('duplicate')){
            e.status = 400
        }
        next(e);
    }
}

const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await contacts.updateContact(id, req.body);
        if(!contact) {
            throw createError(404, "Not found");
        }
        res.json(contact);
    } catch (e) {
        next(e);
    }
}

const updateFavorite = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await contacts.updateContact(id, req.body);
        if(!contact) {
            throw createError(404, "Not found");
        }
        if(req.body === null){
            throw createError(400, "missing field favorite");
        }
        res.json(contact);
    } catch (e) {
        next(e);
    }
}

const removeContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await contacts.removeContact(id);
        if(!contact) {
            throw createError(404, "Not found");
        }
        res.status(204).json({message: "Contact deleted"});
    } catch (e) {
        next(e);
    }
}

module.exports = {
    listContacts, getById, addContact, updateContact, removeContact, updateFavorite
}
