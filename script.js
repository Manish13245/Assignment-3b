// Smoothie Class
class Smoothie {
  constructor(name, base, ingredients, size, instructions, totalPrice) {
    this.name = name;
    this.base = base;
    this.ingredients = ingredients;
    this.size = size;
    this.instructions = instructions;
    this.totalPrice = totalPrice;
  }

  getDescription() {
    return `
      <h2>Your Smoothie Order:</h2>
      <p><strong>Name:</strong> ${this.name}</p>
      <p><strong>Base:</strong> ${this.base}</p>
      <p><strong>Ingredients:</strong> ${this.ingredients.length ? this.ingredients.join(', ') : 'None selected'}</p>
      <p><strong>Size:</strong> ${this.size}</p>
      <p><strong>Instructions:</strong> ${this.instructions || 'None provided'}</p>
      <p><strong>Total Price:</strong> $${this.totalPrice.toFixed(2)}</p>
    `;
  }
}

//Ingredient images
const ingredientImages = {
  Banana: 'banana.jpg',
  Strawberry: 'strawberry.jpg',
  Blueberry: 'blueberry.png',
  Mango: 'mango.jpg',
  Spinach: 'spinach.jpg',
  Honey: 'honey.webp',
  Oats: 'oats.jpg',
  Cocoa: 'cocoa.jpg',
};

// Handle Order Button Click
document.getElementById('order-button').addEventListener('click', () => {
  const name = document.getElementById('smoothie-name').value.trim();
  const base = document.getElementById('base').value;
  const sizeElement = document.getElementById('size');
  const size = sizeElement.value;
  const sizePrice = parseFloat(sizeElement.options[sizeElement.selectedIndex].dataset.price || 0);
  const instructions = document.getElementById('instructions').value.trim();

  // Get selected ingredients
  const ingredients = Array.from(document.querySelectorAll('input[name="ingredients"]:checked')).map(
    (checkbox) => checkbox.value
  );

  // Calculate total price
  const ingredientPrice = ingredients.length * 1; // $1 per ingredient
  const basePrice = 2.5; // Fixed base price
  const totalPrice = sizePrice + basePrice + ingredientPrice;

  // Validate form
  if (!name || !base || !size) {
    alert('Please fill out all required fields!');
    return;
  }

  // Create Smoothie Object
  const smoothie = new Smoothie(name, base, ingredients, size, instructions, totalPrice);

  // Display Smoothie Summary
  const summaryDiv = document.getElementById('summary-details');
  summaryDiv.innerHTML = smoothie.getDescription();

  // Display Ingredient Images
  const imageDiv = document.getElementById('smoothie-image');
  imageDiv.innerHTML = ''; // Clear previous images
  ingredients.forEach((ingredient) => {
    if (ingredientImages[ingredient]) {
      const imgElement = document.createElement('img');
      imgElement.src = ingredientImages[ingredient];
      imgElement.alt = ingredient;
      document.getElementById('smoothie-image').appendChild(imgElement);
    }
  });  

  // Show Order Summary and scroll to it
  showOrderSummary();
});

// Function to show the order summary and scroll to it
function showOrderSummary() {
  const orderSummary = document.getElementById('order-summary');
  
  // Add the 'show' class to display the order summary with animation
  orderSummary.classList.add('show');

  // Scroll the page to the order summary
  orderSummary.scrollIntoView({
    behavior: 'smooth', // Smooth scroll effect
    block: 'start' // Scroll to the top of the order summary
  });
}