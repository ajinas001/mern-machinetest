# MERN Stack Developer Machine Test

## *Project Overview*
This is a MERN Stack application that includes the following features:
- *Admin User Login*
- *Agent Creation & Management*
- *Uploading and Distributing Lists*

The project follows best practices, including authentication using JSON Web Tokens (JWT), proper data validation, error handling, and a user-friendly UI.

---

## *Tech Stack*
- *Frontend:* Next.js
- *Backend:* Node.js, Express.js
- *Database:* MongoDB
- *Authentication:* JSON Web Token (JWT)
- *File Handling:* CSV Parser

---

## *Features Implemented*
### 1. *User Login*
- Secure authentication system with JWT.
- Login form with email and password fields.
- Redirection to the dashboard on successful login.
- Proper error messages for failed login attempts.
- **Default Admin Credentials:**
  - **Email:** admin@gmail.com
  - **Password:** admin@123
  
  If you are using your own MongoDB connection string, ensure you create a hardcoded admin entry in the **Admin** table of your database.

### 2. *Agent Management*
- Admin can add agents with the following details:
  - Name
  - Email
  - Mobile Number (with country code)
  - Password
- Secure storage of agent data in MongoDB.

### 3. *CSV Upload & Task Distribution*
- Upload csv,xlsx and axls files containing:
  - First Name
  - Phone Number
  - Notes
- Validate uploaded files (allow only csv,xlsx and axls formats).
- Store the distributed lists in MongoDB.
- Display assigned lists on the frontend.

### 4. *Additional Enhancements*
- Implemented a light and dark mode switch.
- Theme preference is saved for a better user experience.

---

## *Installation & Setup*
### 1. *Clone the Repository*
```bash
git clone (https://github.com/ajinas001/mern-machinetest.git)
```

### 2. *Backend Setup*
```bash
cd backend
npm install
```

### 3. *Frontend Setup*
```bash
cd frontend
npm install
```

### 4. *Environment Variables*
Create a `.env` file in the backend directory and configure:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 5. *Run the Application*
- Start the backend server:
```bash
cd backend
nodemon server 
```
  
- Start the frontend application:
```bash
cd frontend
npm run dev
```
  

## *Contact*
For any queries or contributions, feel free to reach out!
- *Email:* ajinasp001@gmail.com


