// script.js (updated)
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('rakhi-form');
    const rakhiList = document.getElementById('rakhi-list');
    const API_URL = 'http://localhost:3000/api/messages';

    // Function to fetch and render all messages from the server
    async function fetchAndRenderRakhis() {
        try {
            const response = await fetch(API_URL);
            const rakhis = await response.json();

            if (rakhis.length === 0) {
                rakhiList.innerHTML = '<p>No rakhis received yet. 😔</p>';
                return;
            }

            rakhiList.innerHTML = ''; // Clear previous rakhis
            rakhis.forEach((rakhi, index) => {
                const card = document.createElement('div');
                card.className = 'rakhi-card';
                card.innerHTML = `
                    <h3>From: ${rakhi.sender}</h3>
                    <p>${rakhi.message}</p>
                `;
                rakhiList.appendChild(card);
            });

        } catch (error) {
            console.error('Error fetching rakhis:', error);
            rakhiList.innerHTML = '<p>Failed to load rakhis. Please try again later.</p>';
        }
    }

    // Function to send a new message
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const senderName = document.getElementById('sender-name').value;
        const message = document.getElementById('message').value;

        if (senderName && message) {
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sender: senderName, message: message })
                });

                if (response.ok) {
                    form.reset();
                    fetchAndRenderRakhis(); // Refresh the list
                } else {
                    alert('Failed to send rakhi.');
                }
            } catch (error) {
                console.error('Error sending rakhi:', error);
                alert('Failed to send rakhi. Network error.');
            }
        }
    });

    // Initial fetch and render when the page loads
    fetchAndRenderRakhis();
});