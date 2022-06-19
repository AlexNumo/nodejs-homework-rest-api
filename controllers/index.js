const {loginUser, logoutUser, registerUser} = require('./auth');
const {listContacts, getById, removeContact, addContact, updateContact, updateFavorite} = require('./contacts');

module.exports = {
    loginUser,
    logoutUser,
    registerUser,
    listContacts,
    getById,
    removeContact,
    addContact,
    updateContact,
    updateFavorite,
}
