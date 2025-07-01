# Development Quick Start

This repository contains the Traknor front‑end (React + Vite) and an optional Django backend.

## Requirements
- Node.js 20
- pnpm

## Frontend
```bash
cp .env.example .env   # configure API URL if needed
cd frontend
./setup.sh             # install Node and dependencies
pnpm dev
```
The app will be available at http://localhost:5173.

To create a production build:
```bash
cd frontend
pnpm build
```

## Backend (if present)
```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
