document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const statusText = document.getElementById('status');

    statusText.innerText = "Connecting to backend...";
    statusText.style.color = "blue";

    try {
        const response = await fetch('http://10.30.193.236:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            statusText.innerText = "Login Successful! ";
            statusText.style.color = "green";
            window.location.href = "index.html"
        } else {
            statusText.innerText = "Error: " + (data.error || "Kuch galat hua");
            statusText.style.color = "red";
        }
    } catch (error) {
        statusText.innerText = "Connection Failed. Check Antra IP aur firewall!";
        statusText.style.color = "red";
    }
});
