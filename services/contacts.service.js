const { Contact } = require('../models/contact');


const listContacts = async () => {
    return Contact.find({}, {}, {});
}

const getById = async (id) => {
    return Contact.findById(id);
}

const addContact = async (contact) => {
    return Contact.create(contact);
}

const updateContact = async (id, contact) => {
    return Contact.findByIdAndUpdate(id, contact, { new: true });
}

const removeContact = async (id) => {
    return Contact.findByIdAndDelete(id);
}

module.exports = {
    listContacts, addContact, getById, updateContact, removeContact
}
