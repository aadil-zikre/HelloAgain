# HelloAgain

HelloAgain is a personalized connection management application that helps users maintain meaningful relationships with friends, family, and acquaintances. The application stores important information, tracks life updates, and facilitates thoughtful communication through AI-assisted reminders and conversation starters.

## Features

- User authentication and profile management
- Contact management with custom fields and categories
- Life events tracking and timeline
- AI-powered message generation for special occasions
- Smart check-in reminders
- Birthday and special event notifications
- Customizable notification preferences

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI for components
- React Router for navigation
- Axios for API calls

### Backend
- Python with Flask
- MongoDB for data storage
- OpenAI API for message generation
- Celery for task scheduling

## Prerequisites

- Node.js (v14 or higher)
- Python 3.9 or higher
- MongoDB
- OpenAI API key

## Setup

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a .env file with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017/helloagain
   OPENAI_API_KEY=your_openai_api_key
   ```

5. Start the Flask server:
   ```bash
   python app.py
   ```

## Development

The frontend will be available at http://localhost:3000
The backend API will be available at http://localhost:5000

## API Documentation

### Authentication Endpoints

- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Contact Endpoints

- GET /api/contacts - Get all contacts for a user
- POST /api/contacts - Create a new contact
- GET /api/contacts/:id - Get contact details
- PUT /api/contacts/:id - Update contact
- DELETE /api/contacts/:id - Delete contact

### Life Events Endpoints

- GET /api/contacts/:id/events - Get life events for a contact
- POST /api/contacts/:id/events - Create a new life event

### AI Message Generation

- POST /api/ai/generate-message - Generate a personalized message

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.