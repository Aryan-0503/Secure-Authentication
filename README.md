# 🔐 Secure Authentication System

A secure and lightweight authentication backend built using **Node.js**, **Express.js**, **MongoDB**, **JWT**, and **Bcrypt**.  
Includes multiple layers of security such as:

- JWT-based authentication  
- Password hashing (bcrypt)  
- IP-based rate limiting  
- User-based rate limiting  
- Role-based access control (Admin only routes)  

This project is designed for beginners who want to understand modern security implementations in backend systems.

---

## 🚀 Features

### ✅ User Authentication
- Signup & Login with hashed passwords  
- Secure JWT token generation  
- Token-based authorization for protected routes  

### ✅ Rate Limiting
- **IP-based** rate limiting to stop brute-force attacks  
- **User-based** rate limits stored in database  
- **Role-based** limits (free, premium, admin)

### ✅ Access Control
- Middleware to protect routes  
- Admin-only access support  

---

## 🛠️ Tech Stack

| Category   | Technologies |
|------------|--------------|
| Backend    | Node.js, Express.js |
| Database   | MongoDB, Mongoose |
| Security   | JWT, Bcrypt, Rate Limiting |
| Tools      | Thunder Client / Postman |

---

## 📁 Project Structure

