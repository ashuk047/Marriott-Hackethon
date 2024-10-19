// Initialize the socket connection
function initializeSocket() {
    const socket = io(); // Initialize socket.io

    // Listen for messages from the staff
    socket.on('staffMessage', (data) => {
        console.log(`Received message in room ${data.room}: ${data.message}`);
    });

    return socket;
}

// Set up the form handling
// Set up the form handling
function setupForm(socket) {
    // Retrieve room number from localStorage and set it in the input field
    const roomNumber = localStorage.getItem('roomNumber');
    if (roomNumber) {
        document.getElementById("roomNumber").value = roomNumber;
    }

    // Add an event listener for the form submission
    const form = document.getElementById("roomForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Retrieve the guest name, room number, and time slot from the input fields
        const guestName = localStorage.getItem('guestName');
        const roomNumberInput = document.getElementById("roomNumber").value;
        const timeSlot = document.getElementById("timeSlot").value;

        if (guestName && roomNumberInput && timeSlot) {
            // Save the room number to localStorage
            localStorage.setItem('roomNumber', roomNumberInput);

            // Emit the joinRoom event
            socket.emit('joinRoom', roomNumberInput);

            // Emit the messageFromRoomToStaff event with guest name, room, and message details
            socket.emit('messageFromRoomToStaff', {
                guestName: guestName,
                room: roomNumberInput,
                message: `Guest ${guestName} requesting room service for ${timeSlot}`
            });
        }
    });
}

// Main function to initialize everything
function main() {
    const socket = initializeSocket();
    setupForm(socket);
}

// Call the main function after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", main);