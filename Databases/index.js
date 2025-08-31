// Mongodb Compass provides a graphical user interface to interact with MongoDB

const express = require('express');
const connectDB = require('./db');
const users = require('./Routes/user');
const User = require('./models/userModel'); // ✅ import User model
const app = express();

app.use(express.json());  // ✅ should come before routes
app.use('/api', users);

const port = 3000;

// Function to insert a sample user (only if it doesn't already exist)
const insertSampleUser = async () => {
    try {
        const existing = await User.findOne({ name: "Hamza" });
        if (!existing) {
            const sampleUser = new User({ name: "Hamza", age: 22, weight: 70 });
            await sampleUser.save();
            console.log("✅ Sample user inserted:", sampleUser);
        } else {
            console.log("ℹ️ Sample user already exists, skipping insert.");
        }
    } catch (err) {
        console.error("❌ Error inserting sample user:", err.message);
    }
};

// Connect DB and insert sample user
connectDB().then(() => {
    insertSampleUser();
});

app.get('/', (req, res) => {
    console.log('I am inside home page route');
    res.send('Hello Welcome to Codehub');
});

app.listen(port, () => {
    console.log(`🚀 Server is up and running on http://localhost:${port}`);
});
