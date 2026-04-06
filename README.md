# Summify

Summify is a full-stack web application that allows users to generate concise summaries from long texts using artificial intelligence. The application is built with a modern JavaScript stack and integrates the Groq API for fast and efficient text processing.

## Features

- Generate summaries from any text input
- Clean and responsive user interface
- User authentication with JWT
- Secure API communication
- Error handling and loading states

## Tech Stack

Frontend:
- React
- Tailwind CSS
- Axios

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose

AI Integration:
- Groq API (LLM)

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB database (local or Atlas)
- Groq API key

### Installation

Clone the repository
```bash
git clone https://github.com/Skander006/ai-summary-app.git
cd "AI Summary"
```
#### Install Dependencies 
cd backend
npm install

cd ../frontend
npm install

### Environment Variables
PORT=2525
MONGO_URI=your mongodb uri
JWT_SECRET=your jwt secret
GROQ_API_KEY=your groq api key

## Run the application

### Start backend
```bash
cd backend
npm run dev
```
### Start frontend
```bash
cd frontend
npm run dev
```
## API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- POST /api/summary (protected)

## Project Structure
- backend/
  routes/
  middleware/
  models/
  config/
- frontend/
  components/
  pages/
  api/
  context/ 
## Possible Improvements
- Add multiple summary formats (short, detailed, bullet points)
- Save user summaries
- Improve UI/UX
- Add copy-to-clipboard feature

## Author
Developed by Skander SAAFI
```bash
git clone https://github.com/your-username/summify.git
cd summify
