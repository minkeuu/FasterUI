# FasterUI

**FasterUI** — full-stack веб-приложение на React с авторизацией, профилем пользователя и серверной частью на Node.js.

🌐 **Demo:** https://faster-ui-alpha.vercel.app

## ✨ Features

* 🔐 Регистрация и авторизация пользователей
* 🔑 JWT-аутентификация
* 👤 Профиль пользователя
* 🖼️ Загрузка изображений
* 🔒 Защищённые API-маршруты
* 🗄️ Работа с базой данных через Prisma
* ⚡ REST API на Express
* 📱 Адаптивный интерфейс
* 🚀 Деплой frontend и backend на Vercel

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* Tailwind CSS
* Vite
* Lucide React

### Backend

* Node.js
* Express
* JWT
* bcrypt
* CORS
* Multer

### Database

* Prisma ORM
* PostgreSQL

### Deployment

* Vercel

## 📁 Project Structure

```text
FasterUI/
├── api/
│   ├── server.cjs
│   ├── auth.cjs
│   ├── profile.cjs
│   ├── prisma.cjs
│   └── ...
│
├── prisma/
│   └── ...
│
├── public/
│   └── ...
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── ...
│   └── main.jsx
│
├── package.json
├── vite.config.js
├── tailwind.config.js
└── vercel.json
```

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/minkeuu/FasterUI.git
cd FasterUI
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DATABASE_URL="your_database_url"
JWT_SECRET="your_jwt_secret"
```

Generate Prisma Client:

```bash
npx prisma generate
```

Start the frontend:

```bash
npm run dev
```

For local development with the backend:

```bash
npm run start
```

## 🔌 API

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Profile

```text
GET /api/profile
```

Protected endpoints require a JWT token:

```http
Authorization: Bearer <token>
```

## 🔐 Environment Variables

| Variable       | Description                    |
| -------------- | ------------------------------ |
| `DATABASE_URL` | PostgreSQL database connection |
| `JWT_SECRET`   | Secret key used for JWT tokens |

> Never commit `.env` or other files containing secrets to the repository.

## 🌐 Deployment

The project is deployed on Vercel.

Frontend is built with Vite, while the Express backend runs as a Vercel Serverless Function.

## 📌 Project Status

The project is currently under development. New features and improvements may be added over time.

## 👨‍💻 Author

**minkeuu**

GitHub: https://github.com/minkeuu
