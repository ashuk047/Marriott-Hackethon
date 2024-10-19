// guestMessageRequest.js

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

// Call the function after the page has loaded
window.onload = populateRequestForm;
