document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === "Enter" && this.value.trim() !== "") {
        event.preventDefault();
        const userInput = this.value;
        this.value = ''; // Clear input field

        // Display user message
        displayMessage("You: " + userInput, 'user');

        // Send data to Django backend via AJAX
        fetch("/schatbot/chat/", { // Adjust URL as needed
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"), // Handle CSRF token
            },
            body: JSON.stringify({ message: userInput })
        })
        .then(response => response.json())
        .then(data => {
            // Display response
            displayMessage("ChatGPT: " + data.message, 'chatgpt');
        })
        .catch(error => console.error('Error:', error));
    }
});

function displayMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messageDiv.className = sender;
    document.getElementById('chat-box').appendChild(messageDiv);

    // Scroll chat box to the bottom to show the latest message
    const chatBox = document.getElementById('chat-box');
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to get the value of a named cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
