# CyberGuard AI
### Intelligent Cybersecurity Education Platform

![Version](https://img.shields.io/badge/version-1.0.0-cyan)
![Status](https://img.shields.io/badge/status-production--ready-brightgreen)
![License](https://img.shields.io/badge/license-Educational%20Use-orange)

---

## Overview

**CyberGuard AI** is a full-stack, multi-page web platform combining structured cybersecurity education with three live AI-powered detection tools. Built with a dark cyber-noir aesthetic and powered by Anthropic's Claude AI, it enables users to learn about AI in cybersecurity and immediately apply that knowledge through interactive tools.

The platform was developed following content from an AI Awareness & Cybersecurity webinar, covering threat detection, malware analysis, network security, AI automation, risks, and best practices.

---

## Project Structure

```
cyberguard-ai/
├── index.html              # Home page — hero, page navigator, CTA
├── learn.html              # What is AI in Cybersecurity?
├── detection.html          # AI for Threat Detection & Prevention
├── usecases.html           # Real-World Use Cases (Malware, Network, Automation)
├── challenges.html         # Challenges & Risks of AI in Cybersecurity
├── bestpractices.html      # Best Practices for Responsible AI Use
├── tools.html              # Live AI Detection Tools (3 tools)
├── assets/
│   ├── css/
│   │   └── style.css       # Shared global stylesheet
│   └── js/
│       └── main.js         # Shared JavaScript + AI API integration
└── README.md               # This file
```

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Animated hero, stats, page navigation cards, CTA |
| Learn | `learn.html` | AI in cybersecurity fundamentals — threat detection, automated response, predictive analytics |
| Detection | `detection.html` | Darktrace, Microsoft Purview, detection methods, real-time alerts |
| Use Cases | `usecases.html` | Malware detection (CrowdStrike), network security (Vectra AI), automation (MS Sentinel) |
| Challenges | `challenges.html` | Adversarial attacks, model bias, data privacy, over-reliance risks |
| Best Practices | `bestpractices.html` | Ongoing training, human supervision, balanced datasets, responsible AI |
| AI Tools | `tools.html` | Three live AI-powered detection tools |

---

## AI-Powered Tools

All three tools are powered by **Claude Sonnet** via the Anthropic API. They analyze user-provided text and return structured JSON responses rendered as visual result cards.

### 1. Transaction Fraud Detector
- **Input:** Transaction details (amount, location, time, merchant, payment method)
- **Output:** Risk Level (Low / Medium / High), Risk Score (0–100), Suspicious Indicators, Safe Signals, Recommendation
- **Use case:** Identify potentially fraudulent bank transfers, card charges, M-Pesa payments

### 2. Spam & Phishing Analyzer
- **Input:** Full email, SMS, or message text including sender and subject
- **Output:** Classification (Legitimate / Spam / Phishing / Scam), Confidence %, Red Flags, Safe Signals, What To Do
- **Use case:** Detect KCB/bank impersonation scams, prize lottery SMS, advance fee job fraud

### 3. Product Authenticity Checker
- **Input:** Product description — seller platform, price, condition, reviews, payment method
- **Output:** Authenticity Score (0–100), Verdict, Red Flags, Verification Steps, Safety Tips
- **Use case:** Verify Facebook Marketplace deals, suspicious online store products, counterfeit goods

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic) |
| Styling | Custom CSS3 — CSS Variables, Flexbox, Grid, Animations |
| Scripting | Vanilla JavaScript (ES6+) |
| Fonts | Orbitron (headings) + Exo 2 (body) via Google Fonts |
| Icons | Font Awesome 6.5.1 |
| AI API | Anthropic Claude Sonnet (`claude-sonnet-4-20250514`) |
| Animation | Canvas API (hero particle network), CSS keyframes |
| Hosting | Any static host (Vercel, Netlify, GitHub Pages) |

---

## Design System

### Colors
| Name | Value | Usage |
|------|-------|-------|
| Background Dark | `#010b18` | Primary background |
| Surface | `#071428` | Card backgrounds |
| Cyan | `#00e5ff` | Primary accent, icons, borders |
| Green | `#00ff88` | Positive states, success indicators |
| Orange | `#ff6b35` | Warning states, secondary accents |
| Red | `#ff4757` | Danger states, risk indicators |
| Gold | `#ffd700` | Medium risk, caution states |
| Text Primary | `#daeef5` | Body text |
| Text Secondary | `#6fa8c4` | Subtitles, descriptions |

### Typography
- **Display / Headings:** Orbitron (monospace-style, futuristic feel)
- **Body / UI:** Exo 2 (clean, geometric, highly readable)

### Key Components
- `card` — Hover-animated info cards with color variants (default, `.green`, `.orange`, `.red`)
- `feature-item` — Icon + title + description list rows
- `reveal` — Scroll-triggered fade-in animation class
- `tool-box` — AI tool container with header, body, loading state, and result display
- `cta-banner` — Section-closing call-to-action panels
- `stats-strip` — 4-column metric display bar

---

## Setup & Usage

### Prerequisites
- Node.js (v16 or higher) - [Download from nodejs.org](https://nodejs.org/)
- Anthropic API Key - [Get from console.anthropic.com](https://console.anthropic.com/)

### Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   - Copy `.env` file and add your Anthropic API key:
   ```bash
   ANTHROPIC_API_KEY=your_actual_api_key_here
   ```

3. **Start the Server**
   ```bash
   npm start
   # Or directly: node server.js
   ```

4. **Open in Browser**
   - Navigate to `http://localhost:3000`
   - The AI tools will now work with real Claude API integration

> **Note:** If the API key is not set or server fails, the tools will show demo responses for educational purposes.

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variable**
   - In Vercel dashboard, add `ANTHROPIC_API_KEY` to environment variables
   - Redeploy

4. **Access Your Site**
   - Vercel will provide a URL where the tools work with real AI

### Option A: Open Locally (Static)
No build step required. Simply open `index.html` in any modern browser.

```bash
# Open in browser
start index.html       # Windows
```

> **Note:** AI tools will use demo mode unless you configure API keys (see Real-Time AI Analysis below).

### Real-Time AI Analysis Setup

For **live AI analysis** (not demo mode), follow the detailed setup instructions in [`API_SETUP.md`](API_SETUP.md).

**Quick Setup:**
1. Get an OpenAI API key from [platform.openai.com](https://platform.openai.com/)
2. Edit `assets/js/main.js` and replace `sk-your-openai-key-here` with your real key
3. Set `AI_SERVICE = 'openai'`
4. Open `tools.html` - you'll get real AI analysis!

> **Note:** OpenAI's GPT-4o-mini is faster and more cost-effective. Anthropic's Claude provides more detailed analysis.

### Option B: Deploy to Vercel/Netlify
The project includes Vercel configuration. For production deployment with API functions, create serverless functions for the `/api/analyze` endpoint.
```

> **Security Warning:** Never expose API keys in client-side code for production deployments. Use a backend proxy (Node.js/Express, Cloudflare Worker, etc.) to protect your API key.

### Option C: Deploy to Vercel/Netlify
```bash
# Vercel
npx vercel --prod

# Netlify Drop
# Drag and drop the cyberguard-ai/ folder to app.netlify.com/drop
```

---

## Responsive Breakpoints

| Breakpoint | Layout Changes |
|-----------|----------------|
| `≥ 1100px` | Full desktop — two-column layouts, side-by-side hero |
| `< 1100px` | Tablet — single column, hide decorative visuals |
| `< 768px` | Mobile — hamburger nav, stacked cards, simplified tabs |
| `< 480px` | Small mobile — full-width buttons, single-column stats |

---

## Content Coverage (Webinar-Based)

This platform directly maps to content from the AI Awareness & Cybersecurity webinar:

- **What is AI in Cybersecurity** — threat detection, automated responses, predictive analytics
- **AI for Threat Detection & Prevention** — Darktrace, Microsoft Purview, proactive alerts
- **Use Case: AI for Malware Detection** — before vs. with AI, CrowdStrike example
- **AI for Network Security** — traffic analysis, zero trust, Vectra AI
- **Role of AI in Cybersecurity Automation** — incident response, vulnerability scanning, MS Sentinel
- **Challenges & Risks** — adversarial attacks, model bias, data privacy, over-reliance
- **Best Practices** — ongoing training, human supervision, balanced datasets, responsible AI

---

## Author

**Tito Kilonzo Kinyambu**  
Back-End Developer | Founder, SynthLink Technologies  
GitHub: [github.com/TitoKilonzo](https://github.com/TitoKilonzo)  
LinkedIn: [linkedin.com/in/titokinyambu](https://linkedin.com/in/titokinyambu)

---

## License

This project is created for **educational purposes**. Content is based on publicly available cybersecurity knowledge and webinar materials. AI analysis tools are powered by Anthropic's Claude API.

---

*Built with Claude AI — Powered by Anthropic*
