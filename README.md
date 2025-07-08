An elegant and responsive e-commerce web application built with **HTML**, **CSS**, and **JavaScript** on the frontend, and **Node.js**, **Express.js**, and **MongoDB** on the backend. This project was developed as part of the ALX Software Engineering Portfolio.                                                                               
---                                                                                                                                                                       ## 🔗 Live Demo                                                                      👉 **[Live Site on GitHub Pages (Frontend)](https://dzebakueso.github.io/e_commerce_website/index.html)**
👉 **[Backend API (Localhost)](http://localhost:5000/api/products)**

---

## 📦 Features

- Browse product catalog with image, price, and description
- Add/remove items to/from shopping cart (localStorage-based)
- Update quantity of items in cart
- Checkout form with customer and payment details
- Order persistence in MongoDB (via backend API)
- Confirmation modal and redirect after successful order
- Responsive UI for desktop and mobile
- Modular, scalable backend (routes/controllers/models)

---

## 🧠 Tech Stack

| Frontend              | Backend                  | Database      |
|-----------------------|--------------------------|---------------|
| HTML, CSS, JavaScript | Node.js, Express.js      | MongoDB Atlas |
| Bootstrap (optional)  | RESTful API Architecture | Mongoose      |

---
## 🚀 Getting Started

### 📁 Clone the Repository

bash
git clone git@github.com:DzeBakuEso/e_commerce_website.git
cd e_commerce_website


cd backend
npm install

node seeder.js

PORT=5000
MONGO_URI=your-mongodb-atlas-uri

node server.js

The backend server runs on http://localhost:5000 

## 🚀 Getting Started 🗂️ Project Structure

e_commerce_website/
├── public/                 # Frontend
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── index.html
│   ├── shop.html
│   ├── cart.html
│   ├── checkout.html
│   └── thankyou.html
│
├── backend/               # Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── seeder.js
│   └── server.js
│
├── .env
├── package.json
└── README.md


API Endpoints (Backend)

Method  Route   Description
GET /api/products   Fetch all products
POST    /api/orders Place an order
GET /api/orders View all orders (admin/dev)

Author:Dzeble Bakue Kwame 
Git Repo: https://github.com/DzeBakuEso

LinkedIn : www.linkedin.com/in/dzeble-frank-kwame
