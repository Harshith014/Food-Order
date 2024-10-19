
---

# Affame - Food Ordering Web Application

## Overview

**Affame** is a dynamic and interactive food ordering web application developed using the **MERN stack** (MongoDB, Express, React, Node.js). The platform provides users with a seamless experience to browse a menu, add items to their cart, and place orders. The app features a secure authentication system, role-based access control for users and administrators, and real-time payment processing through Stripe.

**Live Demo:** [Affame Live Link](https://food-order-five-amber.vercel.app)

## Features

- **User Authentication & Authorization:** 
  - Secure password hashing using **BcryptJS**.
  - **JWT (JSON Web Tokens)** for user authorization and session management.
  - Role-based authorization for **admin** and **user** access levels.

- **Product Management:**
  - Users can browse a menu of food items.
  - Admins can add, edit, or remove menu items.
  - **Multer** and **Cloudinary** integration for seamless image uploading and storage for food items.

- **Shopping Cart:**
  - Add, remove, and update item quantities in the shopping cart.
  - User-friendly interface for managing cart items and checkout.

- **Payment Integration:**
  - Secure payment gateway integration using **Stripe** for processing transactions.

- **Admin Panel:**
  - Role-based control allows administrators to manage orders, products, and user roles efficiently.

- **Real-time Order Tracking:**
  - Users can view their order status after placing the order.

## Tech Stack

### Frontend:
- **React (Vite)**: Fast, modern React-based setup using Vite for optimal performance and developer experience.
- **Context API**: For state management of user authentication, cart, and orders.
- **Axios**: For making API requests to the backend.
- **Stripe**: Integrated for handling secure payment processing.

### Backend:
- **Node.js & Express.js**: For server-side logic and API routing.
- **MongoDB & Mongoose**: NoSQL database for storing user data, product catalog, and orders.
- **JWT**: Secure token-based authentication for user sessions.
- **BcryptJS**: For secure password hashing.
- **Multer & Cloudinary**: For image uploading and cloud storage.
- **Stripe API**: For payment processing.

## Installation

### Prerequisites
- **Node.js**: Ensure you have Node.js installed. Download it [here](https://nodejs.org/).
- **MongoDB**: You need a MongoDB instance to store user data, product information, and orders. You can either run MongoDB locally or use a service like MongoDB Atlas.

### Clone the Repository:

```bash
git clone https://github.com/Harshith014/food-order.git
cd food-order
```

### Environment Variables

Both the **frontend** and **backend** require `.env` files to store environment variables like database URIs, JWT secrets, Cloudinary API keys, and Stripe credentials. Refer to the provided `.env.example` files and modify them with your actual credentials.

### Backend Setup

Navigate to the backend folder and install the necessary dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add the following variables:

```bash
MONGO_URI=<your MongoDB URI>
JWT_SECRET=<your JWT secret>
CLOUDINARY_NAME=<your Cloudinary cloud name>
CLOUDINARY_API_KEY=<your Cloudinary API key>
CLOUDINARY_API_SECRET=<your Cloudinary API secret>
STRIPE_SECRET_KEY=<your Stripe secret key>
```

Start the backend server:

```bash
node server.js
```

### Frontend Setup

Navigate to the frontend folder and install dependencies:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder and add any necessary environment variables. You can follow the structure from the `.env.example` provided in the repository.

To start the React development server:

```bash
npm run dev
```

The application will now be running on `http://localhost:5173`.

## Usage

1. **Admin Functionality**: 
   - Log in with admin credentials to access the dashboard.
   - Add or edit food items, view and manage user orders, and oversee the status of the orders.

2. **User Experience**: 
   - Register or log in to view the food menu, add items to the cart, and place orders.
   - Secure payment with Stripe ensures a smooth checkout process.
   - Track your order status in real-time after placing an order.


```

## Key Dependencies

### Backend:
- **Express.js**: For API routing and handling HTTP requests.
- **MongoDB & Mongoose**: NoSQL database and data modeling.
- **Multer & Cloudinary**: Image handling and cloud storage.
- **JWT & BcryptJS**: Authentication and password security.
- **Stripe API**: For handling payments.

### Frontend:
- **React.js**: For building the user interface.
- **Vite**: Fast development build tool for React.
- **Axios**: For making API requests to the backend.
- **Stripe**: For secure payment handling.



---

