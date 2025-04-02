const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.config"); // Import MongoDB connection

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB(); 

// Create the Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Define routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/valid', require('./routes/protect.route'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

// Export the app
module.exports = app;
