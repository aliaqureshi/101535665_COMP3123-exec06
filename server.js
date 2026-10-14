const express = require('express');
const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL || "";
const PORT = process.env.PORT || 8081;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const noteRoutes = require('./routes/NoteRoutes');
app.use('/api', noteRoutes);

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

// Connect to MongoDB Atlas
mongoose.connect(DB_URL)
    .then(() => {
        console.log("Successfully connected to the database mongoDB Atlas Server");

        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit(1);
    });