const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');
require('dotenv').config();

// Configure Node's DNS resolver to resolve MongoDB Atlas SRV records correctly
dns.setServers(['8.8.8.8', '8.8.4.4']);

const leadRoutes = require('./routes/leadRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/leads', leadRoutes);

// Health Check Route
app.get('/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected (Using Memory Fallback)';
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running perfectly',
        database: dbStatus
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong on the server!' });
});

// MongoDB Connection & Server Start
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://rubeshm60_db_user:aiKdifACQY4QsMZe@cluster0.og4crwa.mongodb.net/?appName=Cluster0';

// Set strictQuery to prepare for Mongoose v7+
mongoose.set('strictQuery', false);

console.log('Connecting to MongoDB at:', MONGO_URI);
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch((err) => {
        console.warn('⚠️ MongoDB Connection Failed:', err.message);
        console.warn('⚠️ Server will run with an in-memory fallback database for demonstration.');
    })
    .finally(() => {
        // Start server regardless of DB connection (fallback active if connection failed)
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    });
