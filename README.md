# 📅 Simple Calendar App 

A full-stack calendar application built with **Next.js + Refine + NestJS**, featuring:

✅ Event creation & management  
✅ Media upload (images & videos)  
✅ Browser notifications with snooze  
✅ Search & filter by date or keyword

---

## 🚀 Live Features

- 📆 Calendar UI with click-to-schedule functionality
- 📝 Modal form to create events with title, description, date, and media
- 📤 Upload and preview images or videos for each event
- 🔔 Browser notifications that:
  - Remind user when an event is due
  - Offer snooze (5 mins)
  - Are dismissable
- 🔍 Search bar to filter by title/description
- 📆 Date range filter to narrow events by time

---

## 💻 Tech Stack

### Frontend

- [Next.js](https://nextjs.org/)
- [Refine.dev](https://refine.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Ant Design](https://ant.design/)
- [Axios](https://axios-http.com/)

### Backend

- [NestJS](https://nestjs.com/)
- In-memory DB 

---

## 🧑‍💻 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/bavi404/Calendar
cd Calendar
2. Install & Run Backend
bash
Copy
Edit
cd backend
npm install
npm run start:dev
Backend runs on: http://localhost:3000

3. Install & Run Frontend
bash
Copy
Edit
cd ../frontend
npm install
npm run dev
Frontend runs on: http://localhost:3000 (or next port if backend is already on 3000)

📁 Folder Structure
bash
Copy
Edit
Calendar/
├── backend/        # NestJS app
└── frontend/       # Next.js app with Refine UI
🔧 Optional Enhancements
🔄 Media stored as base64 (can be swapped with cloud later)

🧠 Notification logic tied to event time dynamically

⏰ Snooze implementation using setTimeout (5 mins)

👨‍🎓 Developer
Bavishya Sankaranarayanan

