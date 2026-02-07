# 🌐 Deep Search: Premium Opportunity Scouter

Deep Search is an AI-powered discovery engine that crawls the web in real-time to find high-impact hackathons and internships. Built with a focus on luxury aesthetics and intelligent filtering, it ensures you never miss a major opportunity.

![Banner](https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=2000)

## ✨ Key Features

- **🧠 AI-Driven Extraction**: Uses Mistral-Large (via OpenRouter) to parse raw web data into clean event structures.
- **🔄 GitHub Persistence**: Automatically commits search results back to the repository for data longevity in serverless environments.
- **� Luxury UI**: Glassmorphism design system with animated mesh backgrounds and smooth transitions.
- **📑 Bookmark System**: Save interesting opportunities to your local storage for quick access.
- **📊 Real-time Stats**: Live dashboard showing the scale and quality of discovered opportunities.
- **🎯 Intelligent Scouter**: Custom priority scoring system based on source reliability, location, and urgency.

---

## 🚀 Tech Stack

- **Frontend**: Next.js 16 (Turbopack), Framer Motion, Tailwind CSS 4, Lucide React.
- **Backend**: Express.js, Playwright (Crawler), OpenAI API (OpenRouter), Octokit (GitHub API).

---

## �️ Setup & Installation

### 1. Prerequisites
- Node.js (v20+)
- A GitHub Token (with `repo` permissions)
- An [OpenRouter API Key](https://openrouter.ai/)
- Telegram Bot Token (Optional - for notifications)

### 2. Backend Setup
```bash
cd backend
npm install
touch .env
```
Add the following to your `.env`:
```env
OPENROUTER_API_KEY=your_key
GITHUB_TOKEN=your_github_token
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
PORT=3001
```
Run development server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## � Project Structure

```text
├── backend/
│   ├── src/
│   │   ├── core/      # Crawler & Search Logic
│   │   ├── utils/     # LLM, Priority, Helpers
│   │   └── config/    # Targets & Service Config
│   └── data/          # Persistent JSON Results
├── frontend/
│   ├── src/
│   │   ├── app/       # Next.js Pages & Styles
│   │   └── components/# Premium UI System
```

## �️ License
Distributed under the MIT License. Built by Arshad Chaudhary.