# 🚀 Node.js + Mongoose Authentication (MVC)

This project sets up a **Node.js backend** with **MongoDB (Mongoose)**, following the **MVC architecture** and implementing authentication and authorization.

## 📌 Features

✅ Node.js + Express setup  
✅ MongoDB connection using Mongoose  
✅ MVC Architecture (Models, Routes, Controllers)  
✅ Environment variables handling (.env)

<!-- ✅ User Authentication (Signup, Login, JWT)   -->

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Other Tools:** dotenv (for environment variables)
<!-- - **Authentication:** JWT, Bcrypt  -->

## 📂 Folder Structure

```scss
📦 01-FULLSTACK-MONGODB
┣ 📂 backend
┃   ┣ 📂 model (User Schema)
┃   ┣ 📂 controller (Business Logic)
┃   ┣ 📂 routes (Routes)
┃   ┣ 📂 utils (utilities)
┃   ┣ 📜 index.js
┣   📜 .env
┣   📜 package.json
┣ 📂 frontend
```

## ▶️ How to Run
### 1️⃣ Install dependencie
```js
npm install
```
### 2️⃣ Create a `.env` file
```env
MONGO_URI=your-mongodb-connection-string  
JWT_SECRET=your-secret-key  
```
### 3️⃣ Start the server
```js
npm run dev
```

## 🚀 API Endpoints
```md
## 🚀 API Endpoints  

| Method |            Endpoint          |          Description             |
|--------|------------------------------|----------------------------------|
| POST   | /api/v1/user/register        | Register new user                |


```

