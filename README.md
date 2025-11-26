# KindLink - CS319Project

Modern Web Application for Community & Society - A platform for donation and community support.

## Tech Stack
- **Frontend:** Vite, React, TypeScript, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT
<!-- Add more technologies here after installing and configuring them in your project -->

## Features
- User Authentication (Register/Login)
- Post Management (Create, Edit, Delete, View)
- User Profile Management
- Responsive UI/UX
- Secure API with JWT tokens
- Clean project structure with TypeScript types

## ⚠️ IMPORTANT: First Time Setup

**This project requires environment configuration!** After cloning, you MUST:

### Quick Start (Same Machine)

```bash
# 1. Clone the repository
git clone <repository-url>
cd CS319Project

# 2. Setup Frontend
npm install
copy .env.example .env

# 3. Setup Backend
cd server
npm install
copy .env.example .env
# Edit server/.env with your MongoDB URI and JWT secret

# 4. Run Backend
npm run dev

# 5. Run Frontend (in new terminal)
cd ..
npm run dev
```

### Setup for Different Machines (Proxmox VM, etc.)

If running Frontend and Backend on **different machines**, you MUST update the `.env` files:

**Frontend `.env`:**
```env
# Replace with Backend machine's IP address
VITE_API_URL=http://192.168.x.x:5000/api
```

**Backend `server/.env`:**
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
# Replace with Frontend machine's IP address
CLIENT_URL=http://192.168.x.x:5173
```

**📖 For detailed setup instructions, see [SETUP.md](SETUP.md)**

## Common Issues

### "Cannot reach backend" / "Network Error"
- Check that Backend is running
- Verify `VITE_API_URL` in `.env` matches Backend's IP
- **DON'T use `localhost` if running on different machines!**
- Restart Frontend after changing `.env`

### "CORS Error"
- Update `CLIENT_URL` in `server/.env` to match Frontend's IP

## Project Purpose
This project is designed to help and develop communities and society through a donation platform, using modern web technologies and best practices.