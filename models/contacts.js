const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, 'models', 'contacts.json');

const listContacts = async () => {
  const dataString = await fs.readFile(contactsPath, 'utf8');
  const data = JSON.parse(dataString);
  return data || null;
}

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const result = allContacts.find(contact => contact.id === contactId);
  return result || null;
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

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = {id: nanoid(), body};
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact || null;
}

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const result = allContacts.find(contact => contact.id === contactId);
  const updateContact = result.JSON({id: contactId, body});
  allContacts.push(updateContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return updateContact || null;

}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
