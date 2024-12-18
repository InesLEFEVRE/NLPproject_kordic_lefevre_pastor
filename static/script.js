// Function to send a message
function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    
    if (!userInput) {
        return;
    }

    // Display the user's message in the chat box
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.textContent = userInput;
    document.getElementById('chat-box').appendChild(userMessage);
    
    // Clear the input field
    document.getElementById('user-input').value = '';

    // Scroll to the bottom of the chat box
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;

    // Send the user input to the server for processing
    fetch('/recommend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userInput }), // Send user input as JSON
    })
    .then(response => response.json())
    .then(data => {
        const botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot-message');
        if (data.recommendations) {
            botMessage.textContent = data.recommendations; // Display recommendations
        } else {
            botMessage.textContent = 'Sorry, I couldn\'t find any recommendations.';
        }
        document.getElementById('chat-box').appendChild(botMessage);
        document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
}

// Listen for Enter key to trigger message sending
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();  // Prevent the default "Enter" behavior (new line in text field)
        sendMessage();           // Call the sendMessage function
    }
});

