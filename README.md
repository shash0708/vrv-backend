

# Todo List Application with Role-Based Access Control (RBAC)

## Overview

This project is a **Todo List Application** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) that implements **Role-Based Access Control (RBAC)** to manage user permissions. The app allows users to manage tasks based on their roles:  
- **Admin**: Can add, delete, and view todos.
- **Moderator**: Can delete and view todos.
- **User**: Can only view todos.

## Features

- **Role-Based Access Control (RBAC)**:  
  - Admins have full CRUD functionality (Create, Read, Update, Delete).
  - Moderators can delete tasks but cannot add new tasks.
  - Regular users can only view tasks.
  
- **Authentication & Authorization**:  
  Secure user authentication is handled with JWT tokens. Roles are assigned to users during registration, and access to resources is controlled based on their roles.

- **CRUD Operations for Todos**:  
  Admin users can create new todos, while moderators and users can only delete or view them.

- **Responsive Design**:  
  The application is responsive and works on various screen sizes, providing a seamless experience across devices.

## Tech Stack

- **Frontend**:  
  - React.js  
  - Axios (for making API requests)  
  - React Router (for navigation)  
  - React Toastify (for notifications)  
  - Tailwind CSS (for styling)

- **Backend**:  
  - Node.js with Express.js  
  - MongoDB (for database management)  
  - JWT Authentication (for secure user authentication)

- **Version Control**:  
  - Git & GitHub

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/your-username/todo-list-app.git
```

### 2. Navigate to the project directory:

```bash
cd todo-list-app
```

### 3. Install the backend dependencies:

```bash
cd backend
npm install
```

### 4. Set up the frontend dependencies:

```bash
cd frontend
npm install
```

### 5. Create a `.env` file for both frontend and backend:

#### Backend (`backend/.env`):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/todolist
JWT_SECRET=your-jwt-secret
```

#### Frontend (`frontend/.env`):

```env
REACT_APP_API_URL=http://localhost:5000
```

### 6. Start the application:

#### Start the backend:

```bash
cd backend
npm start
```

#### Start the frontend:

```bash
cd frontend
npm start
```

### 7. Visit the application:

- Open your browser and go to `http://localhost:3000` to view the Todo List app.

## API Endpoints

### **1. GET /api/todos**

- **Access**: Admin, Moderator, User  
- **Description**: Fetch all the todos from the database.

### **2. POST /api/todos**

- **Access**: Admin  
- **Description**: Create a new todo.

### **3. DELETE /api/todos/:id**

- **Access**: Admin, Moderator  
- **Description**: Delete a todo by ID.

## Role-Based Access Control (RBAC)

- **Admin**:  
  Admins have full control over the todos. They can add, delete, and view todos.
  
- **Moderator**:  
  Moderators can view and delete todos but cannot add new ones.

- **User**:  
  Users can only view the list of todos and cannot add or delete any todos.

## Screenshots

![Screenshot 2024-11-29 222522](https://github.com/user-attachments/assets/d7c16e39-312b-424d-8c10-c9426a5aaad6)
![Screenshot 2024-11-29 222515](https://github.com/user-attachments/assets/918a5e9c-1d61-4a04-8c6d-c3b539b223ca)
![Screenshot 2024-11-29 222711](https://github.com/user-attachments/assets/727efac1-5327-48b6-a153-95a60827dddc)


## Contributions

Feel free to fork this repository and submit pull requests. You can contribute by adding new features or fixing bugs.

## License

This project is licensed under the MIT License.

---

You can customize the sections like screenshots or additional features based on your preferences!
