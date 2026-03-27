# BougeVersForme 🏃

A personalized fitness platform that recommends weekly workout plans based on your goals, fitness level, and daily schedule — powered by AI.

## 🌐 Live Demo

[https://your-netlify-url.netlify.app](https://your-netlify-url.netlify.app)

## 📋 Features

- User registration and login
- Personalized goal and fitness level selection
- Weekly schedule input (describe your daily routine)
- AI-generated workout plans tailored to your profile
- Language toggle (English / French)
- Feedback system
- Data persistence across sessions

## 🛠️ Tech Stack

- **Frontend:** React + Vite + React Router
- **Styling:** CSS Modules
- **AI:** Anthropic Claude API (via Netlify serverless functions)
- **Deployment:** Netlify

## 🚀 How to Run Locally

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Step 1 — Clone the repository
```bash
git clone https://github.com/s-gasaro/bougeversforme.git
cd bougeversforme
```

### Step 2 — Install dependencies
```bash
npm install
```

### Step 3 — Set up environment variables
Create a `.env` file in the root of the project:
```
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
```
You can get a free API key at [console.anthropic.com](https://console.anthropic.com)

### Step 4 — Run the development server
```bash
npm run dev
```

Open your browser and go to `http://localhost:5173`

## 📁 Project Structure
```
src/
├── components/     # Reusable UI components (Navbar)
├── context/        # Global state (UserContext, LanguageContext)
├── layouts/        # Page shell with Navbar and Footer
├── pages/          # One component per route
│   ├── Login.jsx
│   ├── Welcome.jsx
│   ├── Goals.jsx
│   ├── Schedule.jsx
│   ├── Dashboard.jsx
│   └── Feedback.jsx
├── styles/         # Global CSS and design tokens
└── utils/          # Helper functions (AI plan generator)
netlify/
└── functions/      # Serverless functions (secure API calls)
```

## 👤 How to Use

1. **Register** — Create an account with your name, email and password
2. **Set your goal** — Choose between Weight loss, Muscle gain, Wellness or Endurance
3. **Select your level** — Beginner, Intermediate or Advanced
4. **Describe your week** — Fill in your daily routine for at least 3 days
5. **Generate** — Get your personalized AI workout plan
6. **Give feedback** — Rate your experience

## 📄 SRS Document

[Link to SRS Document](your-srs-link-here)

## 👩‍💻 Author

**Sarah Gasaro** — [GitHub](https://github.com/s-gasaro) | [Portfolio](https://s-gasaro.github.io/MyPortFolio/)
