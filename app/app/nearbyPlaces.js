// Data for the nearby places
const placesData = [
    {
        name: "The Grand Park",
        image: "https://images.unsplash.com/photo-1595081688301-56ec91f9052c",
        description: "A large park with walking trails, beautiful gardens, and lakes for a peaceful retreat.",
        distance: "1.2 km",
        openHours: "8:00 AM - 6:00 PM",
        bestTime: "Early morning for a peaceful stroll, or late afternoon for sunset views."
    },
    {
        name: "Museum of Modern Art",
        image: "https://images.unsplash.com/photo-1565021695-66b582e15c2b",
        description: "Explore contemporary art and exhibitions from renowned artists across the world.",
        distance: "3.5 km",
        openHours: "9:00 AM - 7:00 PM",
        bestTime: "Early afternoon when the museum is less crowded."
    },
    {
        name: "Sunny Beach",
        image: "https://images.unsplash.com/photo-1518354697-168d1ea9d648",
        description: "A beautiful beach with golden sand, perfect for relaxing or swimming.",
        distance: "5.2 km",
        openHours: "Always open",
        bestTime: "Early morning for a quiet, relaxing experience or during sunset for a scenic view."
    },
    {
        name: "Historic Castle",
        image: "https://images.unsplash.com/photo-1565424059-b1f52b5570c2",
        description: "A historic castle with stunning views and guided tours to explore its rich history.",
        distance: "8.0 km",
        openHours: "10:00 AM - 5:00 PM",
        bestTime: "Sunset for breathtaking views from the castle."
    }
];

// Function to dynamically generate the list of places
function generatePlaces() {
    const placesContainer = document.getElementById('placesContainer');

    placesData.forEach(place => {
        // Create a div for each place
        const placeDiv = document.createElement('div');
        placeDiv.classList.add('place');

        // Add the place name
        const placeName = document.createElement('h2');
        placeName.textContent = place.name;
        placeDiv.appendChild(placeName);

        // Add the place image
        const placeImage = document.createElement('img');
        placeImage.src = place.image;
        placeImage.alt = place.name;
        placeDiv.appendChild(placeImage);

        // Add the place description
        const placeDescription = document.createElement('p');
        placeDescription.innerHTML = `<strong>Description:</strong> ${place.description}`;
        placeDiv.appendChild(placeDescription);

        // Add the distance
        const placeDistance = document.createElement('p');
        placeDistance.innerHTML = `<strong>Distance:</strong> ${place.distance}`;
        placeDiv.appendChild(placeDistance);

        // Add the open hours
        const placeOpenHours = document.createElement('p');
        placeOpenHours.innerHTML = `<strong>Open Hours:</strong> ${place.openHours}`;
        placeDiv.appendChild(placeOpenHours);

        // Add the best time to visit
        const placeBestTime = document.createElement('p');
        placeBestTime.classList.add('best-time');
        placeBestTime.innerHTML = `<strong>Best Time to Visit:</strong> ${place.bestTime}`;
        placeDiv.appendChild(placeBestTime);

        // Append the placeDiv to the placesContainer
        placesContainer.appendChild(placeDiv);
    });
}

// Call the function to generate the places list
document.addEventListener('DOMContentLoaded', generatePlaces);
