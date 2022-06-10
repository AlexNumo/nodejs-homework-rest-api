const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/api/auth')

const contactsRouter = require('./routes/api/contacts');

const app = express();

app.use(logger(process.env.NODE_ENV === 'dev' ? 'dev' : 'tiny'));
app.use(cors());
app.use(express.json());


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
