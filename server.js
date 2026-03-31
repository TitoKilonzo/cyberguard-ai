require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const port = process.env.PORT || 3000;

console.log('Starting server...');
console.log('API Key loaded:', process.env.ANTHROPIC_API_KEY ? 'Yes' : 'No');

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static('.'));

// API endpoint for AI analysis
app.post('/api/analyze', async (req, res) => {
  console.log('Received API request:', req.body);
  try {
    const { system, message } = req.body;

    if (!system || !message) {
      return res.status(400).json({ error: 'Missing system or message' });
    }

    console.log('Calling Anthropic API...');
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      system: system,
      messages: [{ role: 'user', content: message }],
    });

    console.log('Anthropic response received');
    res.json({ content: response.content[0].text });
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Open http://localhost:${port} in your browser`);
});