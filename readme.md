# 🍽️ Restaurant Management System (MERN)

A full-stack Restaurant Management System built using the MERN stack.  
This project allows customers to place orders and enables restaurant admins to manage orders, tables, chefs, and menu items efficiently.

---

## 🚀 Features

### 👤 Customer Panel
- Browse food menu by category
- Search food items
- Add items to cart
- Swipe to place order
- Choose order type (Dine-in / Takeaway)
- Add cooking instructions
- View estimated preparation time
- Order confirmation page

### 🛠️ Admin Dashboard
- Dashboard analytics (orders, revenue, chefs)
- Manage food menu items
- Manage restaurant tables
- Assign chefs automatically
- Track order status (Processing / Served)
- View order history

### ⚙️ Backend
- REST API using Express.js
- MongoDB database using Mongoose
- Order processing logic
- Chef assignment based on least orders
- Table reservation system
- Image upload using Cloudinary

---

## 🛠️ Tech Stack

**Frontend**
- React.js
- Vite
- CSS
- Axios
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

**Deployment**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📂 Project Structure

```
Restaurant-Management
│
├── client
│ ├── user - Customer ordering app
│ └── restaurant - Admin dashboard
│
├── server  Backend API
│
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```
git clone https://github.com/yourusername/restaurant-management.git
```

### 2️⃣ Install dependencies

#### Backend
```
cd server
npm install
```

#### Frontend (User)
```
cd client/user
npm instal
```

#### Frontend (Admin)
```
cd client/restaurant
npm install
```


---

## ▶️ Run the project

### Start Backend
```
cd server
npm run dev
```


### Start Customer App
```
cd client/user
npm run dev
```

### Start Admin Dashboard

```
cd client/restaurant
npm run dev
```


---

## 🌐 Environment Variables

Create a `.env` file in the server folder:
```
PORT=9000
MONGO_URI=your_mongodb_atlas_connection
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```


---

### Customer App
- Menu browsing
- Cart & checkout
- Swipe to order

### Admin Dashboard
- Analytics dashboard
- Order management
- Table management

---

## 📦 Deployment

Frontend deployed on **Vercel**  
Backend deployed on **Render**  

User App:
https://restaurant-management-drab.vercel.app

Admin Dashboard:
https://restaurant-management-nnbm.vercel.app

Backend API:
https://restaurant-management-bnor.onrender.com


---

## 👨‍💻 Author

**Rahul Kumar**

- GitHub: https://github.com/ahulkumar1234
- LinkedIn: https://www.linkedin.com/in/rahul-kumar-3990b618b

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub.