// Login function
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "1234") {
        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("chatbotPage").classList.remove("hidden");
    } else {
        document.getElementById("loginMsg").innerText = "Invalid username or password!";
    }
}

// Logout function
function logout() {
    document.getElementById("chatbotPage").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");
}

// Chatbot + Voice Recognition
const startBtn = document.getElementById("startBtn");
const chatBox = document.getElementById("chatBox");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";

// Voice start
startBtn.addEventListener("click", () => {
    recognition.start();
});

// When voice is recognized
recognition.onresult = (event) => {
    const userText = event.results[0][0].transcript;
    addMessage(userText, "user-msg");
    botReply(userText);
};

// Add message to chat
function addMessage(text, className) {
    const msg = document.createElement("p");
    msg.className = className;
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Simple bot reply
function botReply(userText) {
    let reply = "I didn't understand that.";

    if (userText.toLowerCase().includes("hello")) {
        reply = "Hello! How can I help you?";
    } else if (userText.toLowerCase().includes("time")) {
        reply = "The time is " + new Date().toLocaleTimeString();
    } else if (userText.toLowerCase().includes("date")) {
        reply = "Today's date is " + new Date().toLocaleDateString();
    } else if (userText.toLowerCase().includes("your name")) {
        reply = "I am your voice assistant!";
    }

    addMessage(reply, "bot-msg");
    speak(reply);
}

// Speak out reply
function speak(text) {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    synth.speak(utter);
}
