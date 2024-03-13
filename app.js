// Datos de ejemplo de hamburguesas
const burgers = [
    { id: 1, name: 'Hamburguesa con Carne', price: 14000 },
    { id: 2, name: 'Hamburguesa con Pollo', price: 12000 },
    { id: 3, name: 'Hamburguesa Mixta', price: 17000 }
];


// Función para mostrar el menú 
function displayMenu() {
    const menuSection = document.getElementById('menu');
    menuSection.innerHTML = '';
    burgers.forEach(burger => {
        const burgerElement = document.createElement('div');
        burgerElement.classList.add('burger');
        burgerElement.innerHTML = `
            <h2>${burger.name}</h2>
            <p>Precio: ${burger.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
            <h2><label for="drink${burger.id}">Bebida gaseosa</label></h2>
            <select id="drink${burger.id}">
                <option value="Sin_Bebida">Sin Bebida</option>
                <option value="Personal">Personal</option>
                <option value="Familiar">Familiar (1.5Lt)</option>
                <!-- Agrega más opciones de bebida según sea necesario -->
            </select>
            <button onclick="addToCart(${burger.id})">Agregar al carrito</button>
        `;
        menuSection.appendChild(burgerElement);
    });
}


// Función para agregar una hamburguesa con bebida o sin bebida al carrito de compras
function addToCart(burgerId) {
    const selectedBurger = burgers.find(burger => burger.id === burgerId);
    if (selectedBurger) {
        const drinkSelect = document.getElementById('drink' + burgerId);
        const selectedDrink = drinkSelect.value;
        
        let totalPrice = selectedBurger.price;
        if (selectedDrink === "Personal") {
            totalPrice += 2000; // Precio de la bebida personal
        } else if (selectedDrink === "Familiar") {
            totalPrice += 3000; // Precio de la bebida familiar
        }
        
        const cartSection = document.getElementById('cart');
        const cartItem = document.createElement('div');
        const cartItemId = 'cartItem' + burgerId; // Generar un identificador único para el elemento del carrito
        cartItem.setAttribute('id', cartItemId); // Asignar el identificador al elemento
        if (selectedDrink !== "Sin_Bebida") {
            cartItem.innerHTML = `<p>${selectedBurger.name} + ${selectedDrink} - $${totalPrice}</p>`;
        } else {
            cartItem.innerHTML = `<p>${selectedBurger.name} - $${selectedBurger.price}</p>`;
        }
        // Agregar botón para cancelar pedido
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancelar Pedido';
        cancelBtn.onclick = function() {
            removeFromCart(cartItemId);
        };
        cartItem.appendChild(cancelBtn);
        
        cartSection.appendChild(cartItem);
        updateTotal(); // Actualizar el total
    }
}

// Llamada a la función para mostrar el menú cuando la página se carga
window.onload = function() {
    displayMenu();
    const totalPedido = updateTotal(); // Obtener el total del pedido
};

// Función para eliminar un elemento del carrito
function removeFromCart(cartItemId) {
    const cartItem = document.getElementById(cartItemId);
    if (cartItem) {
        cartItem.remove(); // Eliminar el elemento del DOM
        updateTotal(); // Actualizar el total
    }
}

// Función para calcular y mostrar el total de los pedidos en el carrito
function updateTotal() {
    const cartItems = document.querySelectorAll('#cart > div');
    let total = 0;
    cartItems.forEach(item => {
        const priceStr = item.textContent.match(/\$[\d.]+/);
        if (priceStr) {
            const price = parseFloat(priceStr[0].replace('$', ''));
            total += price;
        }
    });
    const totalElement = document.getElementById('total');
    totalElement.textContent = `Total a pagar: $${total.toFixed(2)}`;
    return total; // Devolver el total calculado
}

const enlaceWhatsApp = `https://api.whatsapp.com/send?phone=+573102106937&text=Hola%2C%20ya%20s%C3%A9%20lo%20que%20quiero!%20%C2%BFPodr%C3%ADas%20ayudarme%3F%20El%20total%20a%20pagar%20es%20$${total.toFixed(2)}`;
console.log(enlaceWhatsApp);


