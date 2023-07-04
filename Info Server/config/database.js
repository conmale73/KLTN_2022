const mongoose = require('mongoose');

const connect = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://conmale:conmale1@myspace.09mrbha.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

module.exports = { connect };
