# 📦 Parcel Delivery Frontend

A secure, modern, and role-based frontend web application for a Parcel Delivery System, inspired by real-world courier platforms like Pathao Courier and Sundarban Courier.
Built with React, TypeScript, and Redux Toolkit, this frontend connects seamlessly with the backend API to provide dynamic dashboards for Admin, Sender, and Receiver users.

---

## Live Link

```
https://parcel-delivery-system-2025.vercel.app
```

## 🧑‍💻 Admin, Sender, and Receiver Credentials

Admin:\
email: [admin@gmail.com](mailto:admin@gmail.com)\
password: Admin@123

Sender:\
email: [sender@gmail.com](mailto:sender@gmail.com)\
password: Sender@123

Receiver:\
email: [receiver@gmail.com](mailto:receiver@gmail.com)\
password: Receiver@123

## Features

### Public Pages

- Home – Overview of delivery services

- About – Company details and mission

- Contact – Simple inquiry form

- Track Parcel – Track parcels by tracking ID (publicly available)

### 🔐 Authentication

- JWT-based login and registration

- Role-based authentication and authorization

- Secure persistence with localStorage

- Logout for all roles

- Integration with backend authentication system

### 📦 Sender Dashboard

- Create new parcel requests

- Cancel pending parcels (if not dispatched)

- View parcel history and tracking logs

- Real-time delivery status updates

### 🎯 Receiver Dashboard

- View incoming parcels

- Confirm/Return parcel delivery

- Track received parcels and view history

### 🛠️ Admin Dashboard

- Manage all users (block/unblock)

- Manage all parcels (update, block/unblock, delete)

- Access full parcel statistics and analytics overview

### 📊 Analytics & Visualization

- Dashboard overview cards: Total Parcels, Delivered, Pending, Cancelled

- Charts showing parcel trends and delivery statuses

- Searchable & filterable tables for users and parcels

- Status timeline: Requested → Approved → Dispatched → Delivered

### ✨ Additional Features

- Role-based Navigation Menus

- Responsive Design (Tailwind CSS)

- Dark Mode Support

- Form Validation

- Loading Indicators & Error Handling

- Toast Notifications (Sonner)

- Pagination, Filtering, Sorting

- Framer Motion Animations

## 🧰 Technologies Used

Frontend Stack

React.js (Vite)

TypeScript

Redux Toolkit + RTK Query

React Router DOM

Tailwind CSS

Lucide React / React Icons

Sonner (Toast Notifications)

Framer Motion

Backend API

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

### ⚙️ Installation & Setup

```
git clone https://github.com/sahabulislamsifat/parcel-delivery-frontend.git
```

cd parcel-delivery-frontend
npm install

👉 Create a .env file in the project root:

```
VITE_API_URL=https://parcel-delivery-system-api.vercel.app
```

Then run:

npm run dev

## 🏗️ Project Structure

```
src/
├── assets/
│   └── images/
│
├── components/
│   ├── common/
│   ├── layout/
│   └── ui/
│
├── hooks/
│
├── pages/
│   ├── Home/
│   ├── About/
│   ├── Contact/
│   ├── Dashboard/
│   │   ├── Admin/
│   │   ├── Sender/
│   │   └── Receiver/
│
├── redux/
│   ├── api/
│   │   └── baseApi.ts
│   ├── features/
│   │   ├── auth/
│   │   ├── parcels/
│   │   ├── users/
│   │   └── stats/
│   └── store.ts
│
├── routes/
│   └── ProtectedRoutes.tsx
│
├── App.tsx
└── main.tsx
```

### 🧭 Navigation Flow

Role Accessible Pages Main Features
Guest Home, About, Contact, Track Parcel, Login, Register Public access
Sender Dashboard → My Parcels, Create Parcel, Cancel Parcel Manage parcel deliveries
Receiver Dashboard → Incoming Parcels, Confirm Delivery Confirm and track parcels
Admin Dashboard → Manage Users, Manage Parcels, Statistics Full system management
🔌 API Integration

All data is fetched dynamically via RTK Query from the backend API:

```
https://parcel-delivery-system-api.vercel.app/api/v1/
```

Each feature slice (auth, parcels, users, stats) manages its own endpoints and cache invalidations for real-time updates.

### 📈 Statistics & Dashboard

Stat Cards showing totals for each parcel status

Charts visualizing monthly shipment and delivery data (Recharts)

Tables for users and parcels (searchable, sortable, paginated)

Animations with Framer Motion for smooth transitions

### 🚀 Deployment (Vercel)

Push the project to a public GitHub repository

Go to Vercel Dashboard

Import the repository

Add environment variable:

```
VITE_API_URL=https://parcel-delivery-system-api.vercel.app
```

Deploy — your app will be live in seconds 🎉

### 👨‍💻 Developer Information

```
Developer: Sahabul Islam Sifat
Email: sahabulislamsifat@gmail.com

GitHub: @sahabulislamsifat

Portfolio: sifat0.web.app
```

## 🙌 Acknowledgments

Inspired by Pathao Courier and Sundarban Courier services.
Built as part of the Next Level Web Development assignment.
Special thanks to all mentors and testers for guidance and feedback.

## 🧾 License

This project is open-source and available under the MIT License.
