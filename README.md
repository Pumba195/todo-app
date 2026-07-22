# TODO App

A full-stack TODO application built with FastAPI and Next.js.

## Live demo
- Frontend: https://todo-app-ruddy-alpha-55.vercel.app
- Backend API docs: https://todo-app-kh49.onrender.com/docs

## Tech stack
- Backend: Python, FastAPI, SQLModel, SQLite
- Frontend: Next.js, React, Tailwind CSS

## Features
- Add, remove, search, and filter tasks
- Mark tasks as done
- Assign priority (1-10) and sort by it
- Data persisted in SQLite

## Running locally
### Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

### Frontend
cd frontend
npm install
npm run dev

## Notes
Deployed on Render's free tier, so the backend may take ~30-60s to
wake up after inactivity, and the SQLite database resets on redeploy.