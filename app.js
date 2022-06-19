const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/api/auth');
const avatarRouter = require('./routes/api/avatars');

const contactsRouter = require('./routes/api/contacts');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger(process.env.NODE_ENV === 'dev' ? 'dev' : 'tiny'));
app.use(express.static('public'))

app.use('/users', avatarRouter);
app.use('/users', authRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = "Internal Server Error"} = err;
  res.status(status).json({ message })
})

module.exports = app;
