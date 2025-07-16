const mongoose = require('mongoose');

// mongoose.set('debug', true);  // Enable debug mode

const DB_URL = 'mongodb+srv://session40:1234qweasd@testdb.0drh9bo.mongodb.net/'


mongoose.connect(DB_URL)
    .then(() => console.log('Connected to database!'));

