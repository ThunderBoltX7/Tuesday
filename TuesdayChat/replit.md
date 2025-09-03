# Tuesday - AI Study Buddy

## Overview

Tuesday is a web-based AI-powered chat application designed specifically as a study companion for students. The application provides an interactive interface where students can ask questions, get homework help, receive explanations of concepts, and obtain study tips through conversations with an AI assistant powered by Google's Gemini AI model.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Technology Stack**: Pure HTML5, CSS3, and vanilla JavaScript with Bootstrap 5 for responsive UI components
- **Design Pattern**: Class-based JavaScript architecture with the `TuesdayChat` class handling all chat functionality
- **UI Framework**: Bootstrap 5 for responsive layout and components, with custom CSS for styling
- **Visual Design**: Colorful gradient-based theme with Poppins font family for a student-friendly appearance

### Backend Architecture
- **Framework**: Flask (Python) following a simple MVC pattern
- **API Design**: RESTful endpoint structure with `/chat` POST endpoint for message handling
- **Response Format**: JSON-based communication between frontend and backend
- **Error Handling**: Basic validation for empty messages with appropriate HTTP status codes

### AI Integration
- **AI Provider**: Google Gemini AI (gemini-2.5-flash model)
- **Integration Method**: Direct API calls using the Google GenAI Python client
- **Prompt Engineering**: Student-focused system prompt to ensure educational and supportive responses
- **Content Generation**: Structured request/response pattern with role-based message formatting

### Configuration Management
- **Environment Variables**: API keys and session secrets stored as environment variables
- **Security**: Session secret key configuration for Flask sessions
- **Logging**: Python logging module configured for debugging and monitoring

## External Dependencies

### AI Services
- **Google Gemini AI**: Primary AI service for generating conversational responses
- **Authentication**: Requires GEMINI_API_KEY environment variable for API access

### Frontend Libraries
- **Bootstrap 5.3.0**: CSS framework for responsive design and UI components
- **Font Awesome 6.4.0**: Icon library for visual elements
- **Google Fonts**: Poppins font family for typography

### Python Packages
- **Flask**: Web framework for backend API
- **google-genai**: Official Google client library for Gemini AI integration

### Runtime Environment
- **Python**: Backend runtime environment
- **Environment Variables**: 
  - `GEMINI_API_KEY`: Required for AI service authentication
  - `SESSION_SECRET`: Optional Flask session configuration (defaults to "tuesday-chat-secret")