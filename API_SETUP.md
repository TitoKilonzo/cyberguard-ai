# CyberGuard AI - API Key Setup Instructions

## For Real-Time AI Analysis (No More Demo Mode)

### Step 1: Get API Keys

**Option A: OpenAI (Recommended - Faster & Cheaper)**
1. Go to https://platform.openai.com/
2. Sign up/Login to your account
3. Go to API Keys section
4. Create a new API key
5. Copy the key (starts with `sk-`)

**Option B: Anthropic (More Detailed Analysis)**
1. Go to https://console.anthropic.com/
2. Sign up/Login to your account
3. Create a new API key
4. Copy the key (starts with `sk-ant-`)

### Step 2: Configure the Tools

1. Open `assets/js/main.js` in any text editor
2. Find the CONFIG section at the top
3. Replace the placeholder keys with your real keys:

```javascript
const CONFIG = {
  OPENAI_API_KEY: 'sk-your-actual-openai-key-here',
  ANTHROPIC_API_KEY: 'sk-ant-your-actual-anthropic-key-here'
};

const AI_SERVICE = 'openai'; // Change to 'anthropic' if you prefer Claude
```

### Step 3: Test the Tools

1. Open `tools.html` in your web browser
2. Try the fraud detector, spam analyzer, or product checker
3. You should now get real AI analysis instead of demo responses!

### Cost Information

- **OpenAI GPT-4o-mini**: ~$0.0015 per analysis (very cheap)
- **Anthropic Claude**: ~$0.002-0.004 per analysis

Each analysis uses about 500-1000 tokens, so costs are minimal for personal use.

### Troubleshooting

- **"API key invalid"**: Double-check you copied the full key correctly
- **"Rate limit exceeded"**: Wait a few minutes and try again
- **"Network error"**: Check your internet connection
- **Still getting demo mode**: Make sure you saved the file and refreshed the browser

### Security Note

Your API keys are stored locally in the JavaScript file. For production use, consider using a backend server instead.