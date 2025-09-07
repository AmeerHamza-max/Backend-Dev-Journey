const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongodb Connected Successfully');
  } catch (error) {
    console.error('Mongodb Connection Failed');
    console.error(error.message); // 👈 show the exact error
    process.exit(1);
  }
};

module.exports = connectDB;
