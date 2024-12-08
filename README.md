Project Architecture

Frontend (React.js)

quiz-frontend/
  src/
  components/ 
    Login.js
    Register.js
    TopicSelection.js
    Quiz.js
    Leaderboard.js
    Navbar.js
  App.js
  index.js
  package.json

Local Development Setup

Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.0 or higher)
- npm (v6 or higher)

Frontend Setup
1. Navigate to frontend directory and install dependencies:
cd quiz-frontend
npm install

2. Create `.env` file:
REACT_APP_API_URL=http://localhost:5000/api

3. Start development server:
npm start

Features

User Management
- User registration with validation
- Secure authentication using JWT
- Password encryption using bcrypt

Quiz System
- Topic selection
- Random question generation
- Multiple choice answers
- Score calculation
- Progress tracking

Performance Tracking
- Individual quiz scores
- Topic-wise progress
- Overall performance statistics
- Leaderboard system

Dependencies

Frontend
- react: UI library
- react-router-dom: Routing
- axios: HTTP client
- tailwindcss: Styling
