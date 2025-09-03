import os
import logging
from flask import Flask, render_template, request, jsonify
from google import genai
from google.genai import types

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "tuesday-chat-secret")

# Initialize Gemini client
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

@app.route('/')
def index():
    """Render the main chat interface"""
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    """Handle chat messages and get AI responses"""
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({'error': 'Message cannot be empty'}), 400
        
        # Create a student-friendly system prompt
        system_prompt = (
            "You are Tuesday, a friendly and helpful AI assistant designed specifically for students. "
            "Your goal is to help students learn and understand concepts clearly. "
            "Provide helpful, accurate, and encouraging responses. "
            "Keep your answers clear and educational, and always maintain a positive, supportive tone. "
            "If you're unsure about something, be honest about it and suggest ways the student can find reliable information."
        )
        
        # Generate response using Gemini
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                types.Content(role="user", parts=[types.Part(text=f"{system_prompt}\n\nStudent question: {user_message}")])
            ]
        )
        
        ai_response = response.text if response.text else "I'm sorry, I couldn't generate a response right now. Please try again!"
        
        return jsonify({
            'response': ai_response,
            'status': 'success'
        })
        
    except Exception as e:
        logging.error(f"Error in chat endpoint: {str(e)}")
        return jsonify({
            'error': 'Sorry, I encountered an error while processing your message. Please try again!',
            'status': 'error'
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
