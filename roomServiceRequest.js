// Initialize the socket connection
function initializeSocket() {
    const socket = io(); // Initialize socket.io
    // const roomNumber = localStorage.getItem("roomNumber");
    // const guestName = localStorage.getItem("guestName");
    // Listen for messages from the staff
    socket.on('staffMessage', (data) => {
        console.log(`Received message in room ${data.room}: ${data.message}`);
    });

    return socket;
}

// Set up the form handling
// Set up the form handling
function setupForm(socket) {
    const form = document.getElementById("serviceForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Retrieve the guest name and room number from the input fields
        
        const guestName=localStorage.getItem("guestName");
        const roomNumberInput = document.getElementById("roomNumber").value;
        const serviceType = document.getElementById("serviceType").value;
        let message = '';

        if (serviceType === 'roomService') {
            const timeSlot = document.getElementById("timeSlot").value;
            if (guestName && roomNumberInput && timeSlot) {
                message = `Guest ${guestName} requesting room service for ${timeSlot}`;
            }
        } else if (serviceType === 'other') {
            const otherService = document.getElementById("otherService").value;
            if (guestName && roomNumberInput && otherService) {
                message = `Guest ${guestName} requesting additional service: ${otherService}`;
            }
        } else if (serviceType === 'waterBottle') {
            if (guestName && roomNumberInput) {
                message = `Guest ${guestName} requesting a water bottle`;
            }
        }

        if (message) {
            // Emit the messageFromRoomToStaff event with guest name, room, and message details
            socket.emit('messageFromRoomToStaff', {
                guestName: guestName,
                room: roomNumberInput,
                message: message
            });

            console.log(`Message sent: ${message}`);
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