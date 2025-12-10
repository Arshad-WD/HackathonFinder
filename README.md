# 🚀 Opportunity Intelligence Platform

A full-stack, AI-powered discovery platform that automatically finds, extracts, filters, and displays **hackathons and internships** from across the web in real time.

Built with a modern **crawler + AI extraction backend** and a **premium, professional frontend UI** with pagination, search, and filtering.

---

## ✨ Features

### 🔍 Intelligent Data Extraction
- AI-powered extraction using **OpenRouter free models**
- Smart fallback using **regex-based extraction**
- Automatic normalization of:
  - Title
  - Type (hackathon / internship)
  - Mode (online / offline)
  - Location
  - Deadline
  - Description
  - URL

### 🌐 Web Crawling
- Headless crawling using **Playwright**
- Multi-source aggregation:
  - Unstop
  - Hack2Skill
  - Devfolio
  - Internship portals
  - Global hackathon platforms
- Handles blocked pages & timeouts safely

### 📊 Smart Filtering & Processing
- Filters expired opportunities
- Normalizes hybrid / in-person to online/offline
- Guarantees non-null URLs
- AI + Regex dual-layer extraction
- De-duplication logic
- Priority scoring system

### 🖥️ Professional Frontend
- Modern **glass UI design**
- Hackathon / Internship tabs
- Search by title, company, location
- Fully responsive grid
- Skeleton loading cards
- Professional pagination
- Premium action buttons

### ⚙️ Automation & API
- Manual fetch trigger from the dashboard
- REST API backend
- Auto persistence to `results.json`
- Safe fallback when AI quota is exceeded

---

## 🧠 Tech Stack

### Backend
- **Node.js**
- **Express**
- **Playwright**
- **OpenRouter API**
- **File-based persistence (`results.json`)**

### Frontend
- **Next.js (App Router)**
- **React**
- **Tailwind CSS**
- **Component-based UI architecture**

---

## 📁 Project Structure

<pre>
backend/
├── crawler.js
├── deepSearch.js
├── openrouterLLM.js
├── filters.js
├── deduplicate.js
├── priority.js
├── targets.js
├── runSearch.js
├── server.js
├── results.json
</pre>

<pre>
frontend/
├── app/
│ ├── page.js
│ ├── components/
│ │ ├── EventCard.jsx
│ │ ├── EventGrid.jsx
│ │ ├── FetchButton.jsx
│ │ ├── SearchBar.jsx
│ │ ├── Tabs.jsx
│ │ ├── Pagination.jsx
│ │ ├── Navbar.jsx
│ │ ├── SkeletonCard.jsx
│ └── services/
│ └── api.js

</pre>


---

## 🚀 Getting Started

```bash
Clone the Repository
git clone <your-repo-url>
cd opportunity-intelligence

2️ Backend Setup
cd backend
npm install

Create a .env file:
OPENROUTER_API_KEY=your_api_key_here

Start the backend:
node server.js

Backend runs at:
http://localhost:3001

Trigger manual fetch:
http://localhost:3001/fetch

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:3000

📦 API Endpoints
Method	Endpoint	Description
GET	/events	Fetch all stored opportunities
POST	/fetch	Trigger fresh crawl & extraction
🛡️ Reliability & Safety
Automatic fallback if AI fails
Regex-based extraction ensures no downtime
Daily free OpenRouter quota protected
Broken JSON protection
Safe file writes to prevent data loss

📌 Roadmap
✅ Pagination
✅ Professional UI
✅ Regex fallback
✅ AI fallback

✅ Manual refresh
⏳ Auto weekly scheduler
⏳ Email / Telegram alerts
⏳ User authentication
⏳ Saved/bookmarked events
⏳ Admin analytics dashboard
📄 License

This project is open-source and available under the MIT License.

✍️ Author
Arshad Chaudhary
Final Year IT Student | Full-Stack Developer | AI & Security Enthusiast

⭐ Support
If this project helped you:
Star the repo ⭐
Share with your peers
Build something amazing with it 🚀