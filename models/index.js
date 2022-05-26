const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const dataString = await fs.readFile(contactsPath, 'utf8');
  const data = JSON.parse(dataString);
  return data;
}

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const result = allContacts.find(contact => contact.id === contactId);
  // eslint-disable-next-line no-unneeded-ternary
  return result ? result : null;
}

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const indx = allContacts.findIndex(contact => contact.id === contactId);
  if (indx === -1) {
    return null;
  }
  const updateContacts = allContacts.filter((_, index) => index !== indx);
  await fs.writeFile(contactsPath, JSON.stringify(updateContacts));
  return allContacts[indx];
}

const addContact = async (name, email, phone) => {
  const newContact = {
    id: nanoid(), 
    name: name, 
    email: email, 
    phone: phone
  };
  const allContacts = await listContacts();
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const result = allContacts.find(contact => contact.id === contactId);
  const updateContact = result.JSON({id: contactId, body});
  allContacts.push(updateContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return updateContact || null;

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
