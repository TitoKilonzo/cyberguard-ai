import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { system, message } = req.body;

    if (!system || !message) {
      return res.status(400).json({ error: 'Missing system or message' });
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      system: system,
      messages: [{ role: 'user', content: message }],
    });

    res.status(200).json({ content: response.content[0].text });
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}