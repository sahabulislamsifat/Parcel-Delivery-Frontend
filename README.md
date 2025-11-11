# 📦 Parcel Delivery Frontend (React + Redux Toolkit + RTK Query)

A **secure**, **modern**, and **role-based** frontend web application for a **Parcel Delivery System**, inspired by real-world courier platforms like _Pathao_ and _Sundarban_.
This project serves as the user interface for the backend API and provides dashboards for **Admin**, **Sender**, and **Receiver** roles.

---

## 🌐 Live Link

https://parcel-delivery-system-2025.vercel.app

---

## 🧑‍💻 Admin, Sender, and Receiver Credentials

**Admin**
email: [admin@gmail.com](mailto:admin@gmail.com)
password: `Admin@123`

**Sender**
email: [sender@gmail.com](mailto:sender@gmail.com)
password: `Sender@123`

**Receiver**
email: [receiver@gmail.com](mailto:receiver@gmail.com)
password: `Receiver@123`

---

## 🚀 Features

### 🌍 Public Pages

- **Home** – Overview of delivery service
- **About** – Information about company mission & goals
- **Contact** – Basic inquiry/contact form
- **Track Parcel** – Search parcel by tracking ID (publicly accessible)

---

### 🔐 Authentication

- Login & Registration with role-based access
- Secure JWT-based authentication (integrated with backend)
- Persistent login with `localStorage` or `cookies`
- Logout functionality for all roles

---

### 📦 Sender Dashboard

- Create parcel delivery requests
- Cancel pending parcels (before dispatched)
- View all sent parcels with status & logs
- Real-time tracking and delivery updates

---

### 🎯 Receiver Dashboard

- View incoming parcels
- Confirm delivery upon receipt
- Review past deliveries & statuses

---

### 🛠️ Admin Dashboard

- Manage all users (block/unblock)
- Manage all parcels (update status, block/unblock, delete)
- Access complete statistics and analytics dashboard

---

### 📊 Analytics & Visualization

- Overview cards: Total Parcels, Delivered, In-Transit, Cancelled
- Charts: Monthly shipments, delivery distribution, trends
- Tables: Search, sort, and filter parcels or users
- Parcel status timeline with logs (requested → approved → delivered)

---

### ✨ Additional Features

- **Role-based Navigation Menus**
- **Loading Indicators & Error Handling**
- **Toast Notifications** for feedback
- **Form Validation** using controlled components
- **Pagination & Filtering** for large datasets
- **Responsive Design** (mobile-first with Tailwind CSS)
- **Dark Mode Support**
- **Stat Cards Section** for quick insights

---

## 🧰 Tech Stack

**Frontend**

- React.js (Vite)
- Redux Toolkit + RTK Query
- React Router DOM
- TypeScript
- Tailwind CSS
- Lucide Icons / React Icons
- Sonner (Toast Notifications)

**Backend API**

- Node.js, Express.js, MongoDB (Mongoose)
- JWT Authentication
- Hosted on Vercel

---

## 🏗️ Folder Structure

src/
├── assets/
│ └── images/
├── components/
│ ├── common/
│ ├── layout/
│ └── ui/
├── hooks/
├── pages/
│ ├── Home/
│ ├── About/
│ ├── Contact/
│ ├── Dashboard/
│ │ ├── Admin/
│ │ ├── Sender/
│ │ └── Receiver/
├── redux/
│ ├── api/
│ │ └── baseApi.ts
│ ├── features/
│ │ ├── auth/
│ │ ├── parcels/
│ │ ├── users/
│ │ └── stats/
│ └── store.ts
├── routes/
│ └── ProtectedRoutes.tsx
├── App.tsx
└── main.tsx

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/sahabulislamsifat/parcel-delivery-frontend.git
cd parcel-delivery-frontend

2️⃣ Install Dependencies
npm install

3️⃣ Environment Variables

Create a .env file in the project root and add:

VITE_API_URL=https://parcel-delivery-system-api.vercel.app

4️⃣ Run Project
npm run dev

🧭 Navigation Flow

| Role         | Accessible Pages                                     | Main Features                |
| ------------ | ---------------------------------------------------- | ---------------------------- |
| **Guest**    | Home, About, Contact, Track Parcel, Login, Register  | Public access                |
| **Sender**   | Dashboard → My Parcels, Create Parcel, Cancel Parcel | Create and manage deliveries |
| **Receiver** | Dashboard → Incoming Parcels, Confirm Delivery       | Confirm and track parcels    |
| **Admin**    | Dashboard → Manage Users, Manage Parcels, Statistics | Full system control          |


🧪 API Integration

All data is fetched via RTK Query from the backend API:
https://parcel-delivery-system-api.vercel.app/api/v1/

Each feature slice (auth, parcels, users) defines its own endpoints and cache invalidations for real-time updates.

📈 Stats & Dashboard
Stat Cards: Display total parcels, delivered, pending, etc.

Charts: Visualize parcel flow over time using Recharts.

Tables: Paginated and searchable data for users/parcels.

Animations: Subtle fade/slide effects via Framer Motion.

🧑‍💻 Developer Info
Developer: Sahabul Islam Sifat
Email: sahabulislamsifat@gmail.com
GitHub: @sahabulislamsifat
Portfolio: https://sifat0.web.app

🙌 Acknowledgments
Inspired by Pathao Courier and Sundarban Courier Service

Developed for Next Level Web Development Assignment

Special thanks to all mentors and peers for feedback and testing

🧾 License
This project is open-source and available under the MIT License.


---

Would you like me to include **deployment instructions for Vercel** and **environment variable examples** (for API base URL, tokens, etc.) in this README too?
That would make it fully production-ready for public submission.
```
