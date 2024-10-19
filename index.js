
// Function to populate guest details
function populateGuestDetails() {
    // Simulating guest data which would typically come from a server or database
    const guestDetails = {
        guestName: "John Doe", // Replace with actual guest name dynamically
        wifiPassword: "WiFi1234", // Replace with the actual Wi-Fi password dynamically
        phoneNumbers: {
            reception: "+123-456-7890",
            roomService: "+123-456-7891",
            restaurant: "+123-456-7892",
            laundry: "+123-456-7893"
        },
        roomNumber: 102
    };

    // Populating guest name
    document.getElementById("guestName").textContent = `Welcome ${guestDetails.guestName}!`;

    // Populating Wi-Fi password
    document.getElementById("wifiPassword").textContent = `Wi-Fi Password: ${guestDetails.wifiPassword}`;

    // Populating phone numbers
    document.getElementById("receptionNumber").textContent = `Reception: ${guestDetails.phoneNumbers.reception}`;
    document.getElementById("roomServiceNumber").textContent = `Room Service: ${guestDetails.phoneNumbers.roomService}`;
    document.getElementById("restaurantNumber").textContent = `Restaurant: ${guestDetails.phoneNumbers.restaurant}`;
    document.getElementById("laundryNumber").textContent = `Laundry: ${guestDetails.phoneNumbers.laundry}`;

    // Storing room number in localStorage
    localStorage.setItem('roomNumber', guestDetails.roomNumber);
    localStorage.setItem("guestName", guestDetails.guestName);
}

// Call the function after the page has loaded
window.onload = populateGuestDetails;
