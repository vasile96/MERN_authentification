const express = require('express');
const connectDB = require('./config/db');
const app = express();

//heroku port deployment
const PORT = process.env.PORT || 5000;

//connect to db
connectDB();

// initialize middleware (parses incoming JSON payloads)
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/users', require('./routes/api/users'));

app.listen(PORT, () => console.log('Server started on port ${PORT}'));