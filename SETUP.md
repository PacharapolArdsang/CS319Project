# KindLink - Setup Guide

คู่มือการติดตั้งและเริ่มใช้งานโปรเจค KindLink สำหรับการใช้งานในเครื่องต่างๆ

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- MongoDB Atlas account (หรือ MongoDB local)
- Git

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone <repository-url>
cd CS319Project
```

### 2. Setup Backend (Server)

```bash
cd server
npm install
```

สร้างไฟล์ `.env` ในโฟลเดอร์ `server`:

```bash
cp .env.example .env
```

แก้ไขไฟล์ `.env` ให้ตรงกับข้อมูลของคุณ:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
CLIENT_URL=http://localhost:5173
```

**สำคัญ:**
- แทนที่ `username`, `password`, `cluster`, และ `database` ด้วยข้อมูลจริงของคุณจาก MongoDB Atlas
- ใช้ JWT_SECRET ที่ปลอดภัยและไม่ซ้ำกับที่อื่น
- หาก frontend รันที่ port อื่น ให้แก้ไข `CLIENT_URL` ด้วย

### 3. Setup Frontend (Client)

```bash
cd ..  # กลับไปที่ root directory
npm install
```

สร้างไฟล์ `.env` ใน root directory:

```bash
cp .env.example .env
```

แก้ไขไฟล์ `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

**สำคัญ:**
- หาก backend รันที่ port อื่น ให้แก้ไข URL ให้ตรง
- สำหรับ production ให้ใส่ URL ของ backend ที่ deploy แล้ว

### 4. Start the Application

เปิด 2 terminals:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

คุณควรเห็นข้อความ:
```
✅ Connected to MongoDB successfully
📊 Database: kindlink
🚀 Server running on port 5000
🌐 API endpoint: http://localhost:5000/api
🔗 Health check: http://localhost:5000/api/health
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

คุณควรเห็นข้อความ:
```
VITE v... ready in ...ms

➜  Local:   http://localhost:5173/
```

### 5. เปิดเว็บไซต์

เปิดเบราว์เซอร์ไปที่: `http://localhost:5173`

## 🔧 Troubleshooting

### ปัญหา: Cannot connect to MongoDB

**วิธีแก้:**
1. ตรวจสอบว่า MongoDB connection string ถูกต้อง
2. ตรวจสอบ MongoDB Atlas Network Access:
   - ไปที่ MongoDB Atlas Dashboard
   - เลือก Network Access
   - เพิ่ม IP address ของคุณ หรือใส่ `0.0.0.0/0` เพื่ออนุญาตทุก IP (เฉพาะ development)

### ปัญหา: CORS Error

**วิธีแก้:**
1. ตรวจสอบว่า `CLIENT_URL` ใน `server/.env` ตรงกับ port ที่ frontend รันอยู่
2. ลองรีสตาร์ท backend server

### ปัญหา: 401 Unauthorized Error

**วิธีแก้:**
1. ลบ localStorage และลอง login ใหม่
2. ตรวจสอบว่า `JWT_SECRET` ใน `server/.env` ไม่เปลี่ยน

### ปัญหา: Cannot reach backend

**วิธีแก้:**
1. ตรวจสอบว่า backend server รันอยู่
2. ลองเปิด `http://localhost:5000/api/health` ในเบราว์เซอร์
3. ตรวจสอบ `VITE_API_URL` ใน `.env` ของ frontend

## 📦 การใช้งานในเครื่องอื่น

### สำหรับเพื่อนร่วมทีม:

1. Clone repository
2. ทำตามขั้นตอนใน Quick Start
3. **ขอ MongoDB connection string จากเจ้าของโปรเจค**
4. สร้างไฟล์ `.env` ทั้ง 2 ไฟล์ตามตัวอย่าง

### สำหรับ Production Deployment:

**Backend:**
- Deploy ไปที่ Heroku, Railway, หรือ Vercel
- Set environment variables ใน hosting platform
- อัพเดท `CLIENT_URL` ให้ตรงกับ URL ของ frontend

**Frontend:**
- Deploy ไปที่ Vercel, Netlify, หรือ GitHub Pages
- Set environment variable `VITE_API_URL` ให้ตรงกับ URL ของ backend

## 🔐 Security Notes

- **อย่าแชร์ไฟล์ `.env`** - ไฟล์นี้มีข้อมูลสำคัญ
- **อย่า commit ไฟล์ `.env`** - ตรวจสอบว่ามีใน `.gitignore` แล้ว
- ใช้ `JWT_SECRET` ที่แข็งแรงและไม่ซ้ำกัน
- สำหรับ production ควรจำกัด IP ที่สามารถเข้าถึง MongoDB ได้

## 📝 Development Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Backend:**
- `npm run dev` - Start with auto-reload
- `npm start` - Start production server

## 🤝 Contributing

1. สร้าง branch ใหม่: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push to branch: `git push origin feature/your-feature`
4. สร้าง Pull Request

## 💡 Tips

- ใช้ `npm run dev` แทน `npm start` ระหว่าง development เพื่อให้ auto-reload
- ตรวจสอบ console log ของ backend เพื่อดู error messages
- ใช้ Browser DevTools Network tab เพื่อ debug API calls
- MongoDB Compass สามารถใช้ดูข้อมูลใน database ได้
