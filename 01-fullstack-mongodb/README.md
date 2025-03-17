# 🚀 Node.js + Mongoose Authentication (MVC)

This project sets up a **Node.js backend** with **MongoDB (Mongoose)**, following the **MVC architecture** and implementing authentication and authorization.

## 📌 Features

✅ Node.js + Express setup  
✅ MongoDB connection using Mongoose  
✅ MVC Architecture (Models, Routes, Controllers)  
✅ Environment variables handling (.env)  
✅ User Authentication (Signup, Login, JWT)  
✅ Email Verification  
✅ Forgot Password & Reset Password  
✅ Logout Functionality  
✅ Setting & Removing Cookies  
✅ Password Hashing  
✅ JWT Authentication & Authorization  
✅ Sending Emails using Nodemailer & Mailtrap

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Other Tools:** dotenv (for environment variables), zod (validation for form data), nodemailer (mail service)
- **Authentication:** JWT, Bcrypt

## 📂 Folder Structure

```scss
📦 01-FULLSTACK-MONGODB
┣ 📂 backend
┃   ┣ 📂 model (User Schema)
┃   ┣ 📂 controller (Business Logic)
┃   ┣ 📂 middleware
┃   ┣ 📂 routes (Routes)
┃   ┣ 📂 utils (utilities)
┃   ┣ 📂 validations
┃   ┣ 📜 index.js
┣   📜 .env
┣   📜 package.json
┣ 📂 frontend
```

## ▶️ How to Run

### 1️⃣ Install dependencies

```sh
npm install
```

### 2️⃣ Create a `.env` file

```env
PORT=your-port
MONGO_URI=your-mongodb-connection-string
BASE_URL=your-base-url

# Nodemailer (Mailtrap Credentials)
MAILTRAP_HOST=your-mailtrap-host
MAILTRAP_PORT=your-mailtrap-port
MAILTRAP_USERNAME=your-mailtrap-username
MAILTRAP_PASSWORD=your-mailtrap-password

JWT_SECRET=your-secret-key
```

### 3️⃣ Start the server

```sh
npm run dev
```

## 🚀 API Endpoints

| Method | Endpoint                     | Description         |
| ------ | ---------------------------- | ------------------- |
| POST   | /api/v1/user/register        | Register new user   |
| GET    | /api/v1/user/verify/token    | Verify the new user |
| POST   | /api/v1/user/login           | User login          |
| POST   | /api/v1/user/forget-password | Forgot password     |
| POST   | /api/v1/user/reset-password  | Reset password      |
| GET    | /api/v1/user/user-profile    | Get user profile    |
| POST   | /api/v1/user/logout          | Logout user         |

📩 Postman Collection

You can test the API using Postman. Import the Postman collection from the link below:

[POSTMAN_COLLECTION_LINK](https://fullstack-webdev-7836.postman.co/workspace/fullstack-webdev-Workspace~29c174ca-03a8-4598-9a51-2304df8d7e7f/collection/42848063-01946ca1-1d3f-42f6-9501-097be2bb4727?action=share&creator=42848063)

### Now, the project is **complete** with full authentication and authorization features. 🚀
