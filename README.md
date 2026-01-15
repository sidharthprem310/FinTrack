# FinTrack

A Personal Finance Tracker application built with Django (Backend) and React/Vite (Frontend).

## Prerequisites

- Python 3.8+
- Node.js 16+
- npm

## Setup & Run

### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run migrations:
   ```bash
   python manage.py migrate
   ```
4. Start the server:
   ```bash
   python manage.py runserver
   ```
   The backend API will be running at `http://127.0.0.1:8000/`.

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend application will be running at `http://localhost:5173/`.

## Features

- Dashboard with financial overview
- Transaction logging
- Budget management
- Visualizations
