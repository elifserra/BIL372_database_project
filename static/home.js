// API Base URL
const API_BASE_URL = "http://127.0.0.1:5000";

// Fetch and display all hotels
async function fetchHotels() {
    try {
        const response = await fetch(`${API_BASE_URL}/hotels`);
        const hotels = await response.json();

        const hotelList = document.getElementById('hotel-list');
        hotelList.innerHTML = ''; // Clear previous content

        hotels.forEach(hotel => {
            const hotelCard = document.createElement('div');
            hotelCard.className = 'hotel-card';
            hotelCard.innerHTML = `
                <h3>${hotel.OtelName}</h3>
                <p>Location: ${hotel.OtelLocation}</p>
                <button onclick="fetchRooms(${hotel.OtelID})">View Rooms</button>
            `;
            hotelList.appendChild(hotelCard);
        });
    } catch (error) {
        console.error("Error fetching hotels:", error);
    }
}

// Fetch and display rooms for a selected hotel
async function fetchRooms(hotelId) {
    try {
        const response = await fetch(`${API_BASE_URL}/hotels/${hotelId}/rooms`);
        const rooms = await response.json();

        const roomList = document.getElementById('room-list');
        roomList.innerHTML = ''; // Clear previous content

        rooms.forEach(room => {
            if (room.Status == 0) {  // If room is available
                const roomCard = document.createElement('div');
                roomCard.className = 'room-card';
                roomCard.innerHTML = `
                    <h4>Room Number: ${room.RoomNumber}</h4>
                    <p>Price: $${room.Price}</p>
                    <p>Type: ${room.Type}</p>

                `;

                // Create the "Book Now" button dynamically
                const bookNowButton = document.createElement('button');
                bookNowButton.textContent = 'Book Now';
                
                // Attach an event listener to the button
                bookNowButton.addEventListener('click', function() {
                    redirectToBookingPage(room.RoomID,room.RoomNumber,room.Price); // Call the bookRoom function with the room ID
                });

                roomCard.appendChild(bookNowButton);

                roomList.appendChild(roomCard);
            }
        });
    } catch (error) {
        console.error("Error fetching rooms:", error);
    }
}

function redirectToBookingPage(roomId, roomNumber,price) {
    // Store room details in sessionStorage
    sessionStorage.setItem('roomId', roomId);
    sessionStorage.setItem('roomNumber', roomNumber);
    sessionStorage.setItem('price', price);


    // Redirect to booking page
    window.location.href = '/booking';
}


// Initialize
fetchHotels();