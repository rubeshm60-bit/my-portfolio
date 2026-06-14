const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ClientLead = require('../models/ClientLead');

// In-Memory Fallback Database
let memoryLeads = [];

// POST /api/leads - Create a new lead
router.post('/', async (req, res) => {
    try {
        const { name, phone, business } = req.body;
        
        // Validation
        if (!name || !phone || !business) {
            return res.status(400).json({ error: 'All fields (name, phone, business) are required.' });
        }
        
        // Check if MongoDB is connected
        if (mongoose.connection.readyState === 1) {
            const newLead = new ClientLead({ name, phone, business });
            const savedLead = await newLead.save();
            return res.status(201).json({ 
                message: 'Lead saved to MongoDB successfully', 
                lead: savedLead,
                storage: 'mongodb'
            });
        } else {
            // Use In-Memory Fallback
            const fallbackLead = {
                _id: 'mem_' + Math.random().toString(36).substr(2, 9),
                name,
                phone,
                business,
                createdAt: new Date()
            };
            memoryLeads.unshift(fallbackLead); // Prepend to show newest first
            console.log('Saved lead to In-Memory storage:', fallbackLead);
            return res.status(201).json({ 
                message: 'Lead saved to Memory Fallback successfully (MongoDB offline)', 
                lead: fallbackLead,
                storage: 'memory'
            });
        }
    } catch (err) {
        console.error('Error saving lead:', err);
        res.status(500).json({ error: 'Server error while saving lead.' });
    }
});

// GET /api/leads - Retrieve all leads
router.get('/', async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const leads = await ClientLead.find().sort({ createdAt: -1 });
            return res.status(200).json(leads);
        } else {
            // Return In-Memory leads
            return res.status(200).json(memoryLeads);
        }
    } catch (err) {
        console.error('Error fetching leads:', err);
        res.status(500).json({ error: 'Server error while fetching leads.' });
    }
});

module.exports = router;
