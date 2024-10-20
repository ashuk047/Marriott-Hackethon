
function initializeSocket() {
    const socket = io(); // Initialize socket.io

    // Listen for messages from the staff (optional)
    socket.on('staffMessage', (data) => {
        console.log(`Received message in room ${data.room}: ${data.message}`);
    });

    return socket;
}

// Function to populate the guest message request form
function populateRequestForm() {
    // Fetching room number and guest name from the sessionStorage or localStorage
    const roomNumber = localStorage.getItem("roomNumber");
    const guestName = localStorage.getItem("guestName");

    // If roomNumber or guestName is not found, alert the user (you can change this logic)
    if (roomNumber && guestName) {
        // Populate the input fields with the room number and guest name
        document.getElementById("roomNumber").value = roomNumber;
        document.getElementById("guestName").value = guestName;
    } else {
        alert("Guest details are missing. Please go back to the home page.");
    }
}

// Function to handle form submission
function setupForm(socket) {
    const form = document.getElementById("serviceForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Retrieve the guest name and room number from the input fields
        const guestName = document.getElementById("guestName").value;
        const roomNumberInput = document.getElementById("roomNumber").value;
        const serviceType = document.getElementById("request").value;
        let message = '';

            if (guestName && roomNumberInput) {
                message = `Guest ${guestName} requesting ${serviceType}`;
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
    populateRequestForm();
    setupForm(socket);
}

// Call the main function after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", main);