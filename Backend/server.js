// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contactDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

// Define the contact schema
const contactSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  mobileNumber: String,
  emailSubject: String,
  message: String
});

// Create a model from the schema
const Contact = mongoose.model('Contact', contactSchema);

// POST endpoint to save form data
app.post('/submit', (req, res) => {
  const newContact = new Contact({
    fullName: req.body.fullName,
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
    emailSubject: req.body.emailSubject,
    message: req.body.message
  });

  newContact.save()
    .then(() => res.send('Message Sent Successfully!'))
    .catch((err) => res.status(400).send('Error: ' + err));
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
