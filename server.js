// server.js (updated - without the DELETE endpoint)
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const MESSAGES_FILE = 'messages.json';

// Helper function to read messages from the file
function readMessages() {
    try {
        const data = fs.readFileSync(MESSAGES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading messages file:', error);
        return [];
    }
}

// Helper function to write messages to the file
function writeMessages(messages) {
    try {
        fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing messages file:', error);
    }
}

// Endpoint to get all messages
app.get('/api/messages', (req, res) => {
    const messages = readMessages();
    res.json(messages);
});

// Endpoint to add a new message
app.post('/api/messages', (req, res) => {
    const messages = readMessages();
    const newMessage = {
        sender: req.body.sender,
        message: req.body.message,
        timestamp: new Date()
    };
    messages.push(newMessage);
    writeMessages(messages);
    res.status(201).json(newMessage);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});