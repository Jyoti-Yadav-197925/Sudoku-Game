const mongoose = require('mongoose');

// Function to establish MongoDB connection
async function connectToDataBase(url) {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/urlShortner');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}


module.exports = connectToDataBase;
