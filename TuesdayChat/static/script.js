// Chat functionality
class TuesdayChat {
    constructor() {
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.chatMessages = document.getElementById('chatMessages');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        
        this.initializeEventListeners();
        this.focusInput();
    }

    initializeEventListeners() {
        // Send button click
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Enter key press
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize input (optional enhancement)
        this.messageInput.addEventListener('input', () => {
            this.updateSendButtonState();
        });

        // Initial button state
        this.updateSendButtonState();
    }

    updateSendButtonState() {
        const hasContent = this.messageInput.value.trim().length > 0;
        this.sendButton.disabled = !hasContent;
    }

    focusInput() {
        this.messageInput.focus();
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        
        if (!message) {
            return;
        }

        // Disable input and show user message
        this.setInputState(false);
        this.addUserMessage(message);
        this.clearInput();
        
        // Show loading indicator
        this.showLoading();

        try {
            // Send to backend
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });

            const data = await response.json();

            if (response.ok && data.status === 'success') {
                this.addTuesdayMessage(data.response);
            } else {
                this.addErrorMessage(data.error || 'Something went wrong. Please try again!');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            this.addErrorMessage('Unable to connect to Tuesday. Please check your connection and try again!');
        } finally {
            this.hideLoading();
            this.setInputState(true);
            this.focusInput();
        }
    }

    addUserMessage(message) {
        const messageWrapper = document.createElement('div');
        messageWrapper.className = 'message-wrapper user-message';
        
        messageWrapper.innerHTML = `
            <div class="message user">
                <div class="message-content">
                    <p>${this.escapeHtml(message)}</p>
                </div>
            </div>
        `;

        this.chatMessages.appendChild(messageWrapper);
        this.scrollToBottom();
    }

    addTuesdayMessage(message) {
        const messageWrapper = document.createElement('div');
        messageWrapper.className = 'message-wrapper tuesday-message';
        
        // Convert basic markdown-like formatting
        const formattedMessage = this.formatMessage(message);
        
        messageWrapper.innerHTML = `
            <div class="message tuesday">
                <div class="message-content">
                    ${formattedMessage}
                </div>
            </div>
        `;

        this.chatMessages.appendChild(messageWrapper);
        this.scrollToBottom();
    }

    addErrorMessage(errorText) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorText;
        
        this.chatMessages.appendChild(errorDiv);
        this.scrollToBottom();
    }

    formatMessage(message) {
        // Basic formatting for line breaks and simple markdown
        return message
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .map(line => `<p>${this.escapeHtml(line)}</p>`)
            .join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showLoading() {
        this.loadingIndicator.style.display = 'block';
        this.scrollToBottom();
    }

    hideLoading() {
        this.loadingIndicator.style.display = 'none';
    }

    setInputState(enabled) {
        this.messageInput.disabled = !enabled;
        this.sendButton.disabled = !enabled;
        
        if (enabled) {
            this.updateSendButtonState();
        }
    }

    clearInput() {
        this.messageInput.value = '';
        this.updateSendButtonState();
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }
}

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TuesdayChat();
});

// Add some fun animations for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animation to header
    const header = document.querySelector('.header-gradient');
    header.style.animation = 'slideIn 0.6s ease-out';
    
    // Add staggered animation to initial welcome message
    setTimeout(() => {
        const welcomeMessage = document.querySelector('.tuesday-message');
        if (welcomeMessage) {
            welcomeMessage.style.animation = 'slideIn 0.8s ease-out';
        }
    }, 300);
});
