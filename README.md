Orbit

Orbit is a full-stack MERN application that offers a modular architecture, separating the frontend and backend for enhanced scalability and maintainability. The application features secure JWT-based authentication, image upload capabilities using Multer, and cloud storage integration via Cloudinary.

🚀 Features

Modular Architecture: Clean separation of frontend and backend for better scalability.

JWT Authentication: Secure user sessions and protected routes.

Image Upload: Handles image uploads with Multer and stores them in Cloudinary.

Responsive UI: Built with Tailwind CSS for a modern and responsive user interface.

🛠️ Technologies Used

Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT (JSON Web Tokens)

File Handling: Multer

Cloud Storage: Cloudinary

📁 Project Structure
Orbit/
├── backend/           # Server-side code
│   ├── controllers/   # Request handlers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   └── server.js      # Server entry point
└── frontend/          # Client-side code
    ├── components/    # React components
    ├── pages/         # React pages
    └── tailwind.config.js # Tailwind CSS configuration

🔧 Installation
Prerequisites

Node.js (v14 or higher)

MongoDB (local or cloud instance)

Backend Setup

Navigate to the backend directory:

cd backend


Install dependencies:

npm install


Set up environment variables:

Create a .env file in the backend directory.

Add the following variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_URL=your_cloudinary_url


Start the backend server:

npm start

Frontend Setup

Navigate to the frontend directory:

cd frontend


Install dependencies:

npm install


Start the frontend development server:

npm start

🧪 Testing

Backend: Use tools like Postman or Insomnia to test API endpoints.

Frontend: Ensure responsiveness and functionality across different devices.
