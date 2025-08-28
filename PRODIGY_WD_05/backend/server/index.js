require('dotenv').config();   // <--- add this at the very top
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const WeatherModel = require('./models/Weather.js');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// LOGIN Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await WeatherModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ status: "Error", error: "No record exists" });
        }

        // ⚠️ If you want to switch to bcrypt comparison later:
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) { ... }

        if (password !== user.password) {
            return res.status(400).json({ status: "Error", error: "Password is incorrect" });
        }

        res.json({ status: "Success", user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ status: "Error", error: "Something went wrong" });
    }
});

// SIGNUP Route
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await WeatherModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: "Error", error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await WeatherModel.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ status: "Success", user: { name: newUser.name, email: newUser.email } });
    } catch (err) {
        res.status(400).json({ status: "Error", error: err.message });
    }
});

// GET all users
app.get('/weather', async (req, res) => {
    try {
        const allWeather = await WeatherModel.find().select("-password");
        res.json(allWeather);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
