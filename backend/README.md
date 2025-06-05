# FreeFire Tournament - Backend

This is the backend server for the FreeFire Tournament website, handling contact form submissions and registration confirmations.

## Features

- Contact form submission
- Registration confirmation emails
- CORS support
- Request logging
- Environment-based configuration
- Error handling

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- EmailJS account with service and template configured

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   
   # EmailJS Configuration
   EMAILJS_SERVICE_ID=your_service_id
   EMAILJS_TEMPLATE_ID=your_template_id
   EMAILJS_USER_ID=your_user_id
   
   # Admin Email
   ADMIN_EMAIL=your_email@example.com
   
   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:5173
   ```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon

## API Endpoints

### Health Check
- `GET /api/health` - Check if the server is running

### Contact Form
- `POST /api/contact` - Submit contact form
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, I have a question!"
  }
  ```

### Registration
- `POST /api/register` - Register for the tournament
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "teamName": "Pro Gamers",
    "playerId": "FF123456"
  }
  ```

## Deployment

1. Set `NODE_ENV=production` in your production environment
2. Make sure all environment variables are properly set
3. Use a process manager like PM2 to keep the server running:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "freefire-backend"
   ```

## License

This project is licensed under the MIT License.
