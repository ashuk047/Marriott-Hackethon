// Define the menu data as an array of objects
const menuData = [
    {
        category: 'Starters',
        items: [
            { name: 'Tomato Soup', price: '$5.99' },
            { name: 'Garlic Bread', price: '$4.99' },
            { name: 'Bruschetta', price: '$6.99' }
        ]
    },
    {
        category: 'Main Courses',
        items: [
            { name: 'Grilled Chicken', price: '$12.99' },
            { name: 'Spaghetti Carbonara', price: '$11.99' },
            { name: 'Vegetarian Pizza', price: '$10.99' }
        ]
    },
    {
        category: 'Desserts',
        items: [
            { name: 'Chocolate Cake', price: '$4.99' },
            { name: 'Ice Cream', price: '$3.99' }
        ]
    },
    {
        category: 'Drinks',
        items: [
            { name: 'Coffee', price: '$2.99' },
            { name: 'Orange Juice', price: '$2.99' }
        ]
    }
];

// Function to dynamically generate the menu
function generateMenu() {
    const menuContainer = document.getElementById('menuContainer');

    // Loop through each category
    menuData.forEach(categoryData => {
        // Create a div for each category
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('menu-category');
        
        // Create and append the category heading
        const categoryHeading = document.createElement('h2');
        categoryHeading.textContent = categoryData.category;
        categoryDiv.appendChild(categoryHeading);
        
        // Loop through each item in the category
        categoryData.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('menu-item');
            
            // Create and append the item name
            const itemName = document.createElement('p');
            itemName.textContent = item.name;
            itemDiv.appendChild(itemName);
            
            // Create and append the item price
            const itemPrice = document.createElement('p');
            itemPrice.classList.add('price');
            itemPrice.textContent = item.price;
            itemDiv.appendChild(itemPrice);
            
            // Append the item div to the category div
            categoryDiv.appendChild(itemDiv);
        });

        // Append the category div to the menu container
        menuContainer.appendChild(categoryDiv);
    });
}

// Call the function to generate the menu when the page loads
document.addEventListener('DOMContentLoaded', generateMenu);
