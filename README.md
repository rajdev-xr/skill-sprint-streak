# 🌟 SkillSprint — One Skill a Day, Every Day

Welcome to **SkillSprint**, your micro-learning companion designed to help users build habits by completing daily skill challenges. From CSS tricks to Python snippets, users log in, complete the daily task, and track their progress with streaks, stats, and badges.

---

## 🚀 Live Demo

🌐 [Visit SkillSprint on Vercel](https://skill-sprint-streak.vercel.app/)  

---

## 🎯 Features

### ✅ Core User Features
- 🔐 Supabase Auth – Login/signup securely
- 📅 Daily Skill Challenges – One bite-sized task per day
- ☑️ Check-In System – Track your daily completion
- 🔥 Streak Tracking – Auto-streaks + reward badges (3, 7, 30 days)
- 🧑‍🎓 Profile Page – DiceBear avatars, streaks, badges
- 📆 Calendar View – Visual monthly progress tracker
- 💬 Daily Quotes – Inspirational quotes from public APIs (with fallback)

### 🔐 Admin Features
- 🛠️ Admin Panel – Add/Edit/Delete challenges
- 👑 Role-based Access – Only admins can manage content

---

## 🧱 Built With

- ⚙️ **Supabase** – Auth, Database, Admin Control
- 💅 **Tailwind CSS** – Utility-first CSS
- 🔧 **shadcn/ui** – Beautiful, accessible components
- ⚛️ **React + Vite + TypeScript** – Lightning-fast frontend
- 🎨 **DiceBear Avatars** – Unique avatars for each user
- 📊 **Public APIs** – ZenQuotes.io (fallback-ready)

---

## 📁 Folder Structure

skillsprint/
├── src/
│ ├── components/
│ ├── pages/
│ └── lib/
├── supabase/
├── tailwind.config.ts
├── README.md

---

## 🛠️ Run Locally

```bash
git clone https://github.com/your-username/skillsprint.git
cd skillsprint
npm install
npm run dev

Create a .env file and add your Supabase project URL and anon/public key:

env
Copy
Edit
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
⚙️ Admin Setup
To access the Admin Panel:

Go to your Supabase dashboard

Find the user_roles table

Set a user’s role to 'admin'

🏅 Badge System
Streak Days	Badge
3	🥉 Bronze
7	🥈 Silver
30	🥇 Gold

📣 Contribution & License
This project was built using Lovable AI 
Feel free to fork or reuse the code for your own portfolio!

🪪 MIT License
💌 Built by ROHAN RAJ
