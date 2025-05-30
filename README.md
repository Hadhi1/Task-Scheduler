# User Access Management System

A full-stack web application built for user registration, login, and access management with email confirmation and Slack channel integration.

This project was developed as part of the Leucine Tech assignment process.

---

## 📌 Live Demo

- Deployed Frontend (Netlify): https://bright-monstera-8d3de9.netlify.app/
🔗 Backend (Render): https://backend-nl2k.onrender.com



## 🚀 Features

- 🔐 **User Authentication**
  - Signup with email confirmation (verification link via email)
  - Login with error handling
  - Authenticated dashboard access

- 📨 **Email Confirmation**
  - User receives a verification link upon registration
  - Backend activates account upon confirmation

- 🔗 **Slack Integration**
  - Auto-add user to Slack via a shared Slack invite link
  - If no link is provided, default Slack redirection is triggered
  - Integration endpoint handled in `handle.js`

- 🌐 **Fully Deployed**
  - Frontend hosted on Netlify
  - Backend hosted on Render (free instance with cold start delay)

---

## 🧰 Tech Stack

| Layer      | Technology                       |
|------------|----------------------------------|
| Frontend   | Vite + React + TypeScript        |
| Styling    | Tailwind CSS                     |
| Backend    | Node.js + Express.js             |
| Database   | Supabase                         |
| Auth       | Supabase Auth (with email link)  |
| Hosting    | Netlify (frontend), Render (backend) |
| Integration| Slack API                        |

---

## 🗂️ Project Structure

```bash
D:\Task\Leuciene Tech
│
├── dist/                     # Build output
├── expree-backend/           # Express backend server
│   ├── routes/
│   ├── .env
│   ├── server.js
├── public/                   # Public assets
├── src/                      # Frontend source code
│   └── integrations/
│       └── supabase/
│           ├── client.ts
│           └── types.ts
├── supabase/
│   └── config.toml
├── package.json              # Frontend package config
├── tailwind.config.ts        # Tailwind configuration
├── vite.config.ts            # Vite configuration
└── ...
🛠️ Setup Instructions
📁 Prerequisites
Node.js (v16+)

NPM or Bun

Supabase account (for auth and DB)

Slack workspace & API integration (optional)

🖥️ Running Locally
1. Clone the Repository
bash
Copy
Edit
git clone 
cd 
2. Frontend Setup
bash
Copy
Edit
npm install
npm run dev
The frontend is connected to Render backend by default. To switch to local backend, change the API base URL in the frontend code.

3. Backend Setup
bash
Copy
Edit
cd expree-backend
npm install
node server.js
Ensure .env contains your credentials and Slack link if applicable.

⚠️ Important Notes
The account is not created until the user clicks the verification link sent via email.

Backend hosted on Render free instance may take a few seconds to start due to cold starts.

Slack integration:

Link auto-opens Slack invite or direct join

Logic handled in routes/handle.js

Replace default Slack link if needed

API key may expire. If API issues arise, please update the API keys in handle.js.

📤 Deployment Details
🔹 Frontend: Netlify
bash
Copy
Edit
npm run build
# Then deploy dist/ folder on Netlify
🔹 Backend: Render
Upload Express app

Set environment variables (.env)

Configure build/start command:
node server.js

🙋 Support
For any queries, reach out to:
📧 shaikabdulhadhi@gmail.com
📞 9110593766

📄 License
This project is submitted solely for evaluation purposes and is owned by the author.