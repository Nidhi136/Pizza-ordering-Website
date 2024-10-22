// Glue b/w View and Model
import makeNetworkCall from "./api-client.js";
import productOperations from "./product-operations.js";

async function loadPizza() {
    const URL = 'https://raw.githubusercontent.com/brainmentorspvtltd/pizza-api/main/pizza.json';
    
    try {
        const response = await makeNetworkCall(URL);
        const data = await response.json();
        printPizzas(data.Vegetarian); // Pass the list of pizzas to print
    } catch (err) {
        console.log('Error in fetch call ', err);
    }
}

// Call the loadPizza function
loadPizza();

function addToCart() {
    const pizzaId = this.getAttribute('pizza-id');
    productOperations.addInCart(pizzaId);
    printCart();
}

function printCart() {
    const pizzasInCart = productOperations.viewAll();
    document.getElementById('carts').innerHTML = '';
    pizzasInCart.forEach(p => printCartItem(p));
    document.getElementById('carts').appendChild(printTotal(pizzasInCart));
}

function printCartItem(pizza) {
    const pTag = document.createElement('p');
    pTag.innerText = `${pizza.name} ₹${pizza.price}`;
    document.getElementById('carts').appendChild(pTag);
}

function printTotal(pizzasInCart) {
    const total = pizzasInCart.reduce((acc, pizza) => parseFloat(acc + pizza.price), 0).toFixed(2);
    const pTag = document.createElement('p');
    pTag.innerText = 'Total Bill ₹' + total;
    return pTag;
}

function printPizzas(pizzas) {
    productOperations.pizzas = pizzas; // Store pizza data in cart operations

    // Clear previous pizza cards
    const pizzaContainer = document.getElementById('pizzas');
    pizzaContainer.innerHTML = '';

    // Iterate over each pizza and create a card
    pizzas.forEach(pizza => printPizza(pizza));
}

function printPizza(pizza) {
    // Create elements for the pizza card
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.style.width = '18rem';

    const image = document.createElement('img');
    image.src = pizza.assets.menu[0].url;
    image.className = 'card-img-top';

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body';

    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = pizza.name;

    const pTag = document.createElement('p');
    pTag.className = 'card-text';
    pTag.innerHTML = `${pizza['menu_description']} &#8377; ${pizza.price}`;

    const button = document.createElement('button');
    button.innerText = 'Add to Cart';
    button.setAttribute('pizza-id', pizza.id);
    button.className = 'btn btn-primary';
    button.addEventListener('click', addToCart);

    // Append elements to the card
    cardBodyDiv.appendChild(h5);
    cardBodyDiv.appendChild(pTag);
    cardBodyDiv.appendChild(button);
    cardDiv.appendChild(image);
    cardDiv.appendChild(cardBodyDiv);

    // Append the card to the container
    const pizzaContainer = document.getElementById('pizzas');
    pizzaContainer.appendChild(cardDiv);
}
