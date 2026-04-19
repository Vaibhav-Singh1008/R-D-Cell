const BASE_URL="http://10.7.37.126:5000";
document.addEventListener('DOMContentLoaded', () => {
    
    
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(11, 15, 25, 0.9)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(11, 15, 25, 0.7)';
            navbar.style.boxShadow = 'none';
        }
    });

    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach((card, index) => {
        card.animate([
            { transform: 'translateY(0px)' },
            { transform: 'translateY(-8px)' },
            { transform: 'translateY(0px)' }
        ], {
            duration: 3000,
            iterations: Infinity,
            delay: index * 400,
            easing: 'ease-in-out'
        });
    });
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .login-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'scale(0.95)';
        });
        
        btn.addEventListener('mouseup', () => {
            btn.style.transform = 'scale(1)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)'; // Reset if mouse leaves while pressing
        });
    });
});
// --- FACULTY FILTERING LOGIC ---
const searchInput = document.getElementById('searchInput');
const courseFilter = document.getElementById('courseFilter');
const expFilter = document.getElementById('expFilter');
const facultyCards = document.querySelectorAll('.faculty-card');

function filterFaculty() {
    if(!searchInput) return; // Agar directory page pe nahi hain toh ignore karo

    const searchTerm = searchInput.value.toLowerCase();
    const selectedCourse = courseFilter.value;
    const selectedExp = parseInt(expFilter.value) || 0;

    facultyCards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const cardCourse = card.getAttribute('data-course');
        const cardExp = parseInt(card.getAttribute('data-exp'));

        // Match Logic
        const matchesSearch = name.includes(searchTerm);
        const matchesCourse = selectedCourse === 'all' || cardCourse === selectedCourse;
        
        let matchesExp = true;
        if (expFilter.value !== 'all') {
            matchesExp = cardExp >= selectedExp; // E.g., if filter is 10, show 10, 11, 12...
        }

        if (matchesSearch && matchesCourse && matchesExp) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

if(searchInput) {
    searchInput.addEventListener('input', filterFaculty);
    courseFilter.addEventListener('change', filterFaculty);
    expFilter.addEventListener('change', filterFaculty);
}
document.addEventListener("DOMContentLoaded", function() {
    const fabButton = document.querySelector('.chatbot-fab');
    const chatWindow = document.getElementById('chatWindow');
    const closeChatBtn = document.getElementById('closeChat');
    const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBody = document.getElementById("chatBody");

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // User message show karo
    const userMsg = document.createElement("div");
    userMsg.innerText = "You: " + message;
    chatBody.appendChild(userMsg);

    userInput.value = "";

    try {
        const res = await fetch(`${BASE_URL}/api/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query: message })
        });

        const data = await res.json();

        // Bot response show karo
        const botMsg = document.createElement("div");
        botMsg.innerText = "Bot: " + data.recommendation;
        chatBody.appendChild(botMsg);

    } catch (err) {
        console.error(err);
    }
}

// Button click
if(sendBtn){
    sendBtn.addEventListener("click", sendMessage);
}

// Enter press
if(userInput){
    userInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
}

    if(fabButton && chatWindow) {
        // Open Chat
        fabButton.addEventListener('click', () => {
            chatWindow.style.display = 'flex';
            // Chota delay taaki CSS transition smoothly kaam kare
            setTimeout(() => chatWindow.classList.add('active'), 10);
        });

        // Close Chat
        closeChatBtn.addEventListener('click', () => {
            chatWindow.classList.remove('active');
            // Animation khatam hone ke baad display none karo
            setTimeout(() => chatWindow.style.display = 'none', 300);
        });
    }
});
