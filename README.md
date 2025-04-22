# 🏨 Hotel Management System (MERN Stack)

A full-featured hotel booking web application built using the MERN stack, with secure JWT authentication, dynamic pricing using Segment Tree, and a responsive admin panel.

## 🔗 Live Demo

- 🌐 [Live Site](https://hotel-management-frontend-blush.vercel.app/)
- 💻 [GitHub Repo](https://github.com/KarthikBandi75/HotelManagement)

---

## ⚙️ Tech Stack

- **Frontend:** React.js, Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JWT
- **Algorithms:** Segment Tree for Dynamic Pricing
- **DevOps:** Vercel (Frontend), Render (Backend)

---

## ✨ Features

### 🔐 Authentication
- JWT-based Register/Login
- User role management (Admin/User)

### 📅 Booking System
- View available rooms
- Book hotel rooms with live pricing
- User dashboard for bookings

### 🛠️ Admin Panel
- Login as admin
- View all bookings
- Manage room availability and pricing

### 📈 Dynamic Pricing (DSA)
- Real-time room price updates using Segment Tree
- Efficient `O(log n)` update and query operations

---

## 🧠 DSA Component: Segment Tree

Used to implement dynamic pricing based on demand.

```js
class SegmentTree {
  constructor(size) { /* ... */ }
  build(arr) { /* ... */ }
  update(index, value) { /* ... */ }
  query(left, right) { /* ... */ }
}
