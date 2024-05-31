function renderProducts() {
            const itemsContainer = document.getElementById('items-container');
            itemsContainer.innerHTML = '';
            products.forEach(product => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');
                itemDiv.innerHTML = `
                    <h3>${product.name}</h3>
                    <img src="${product.image}" alt="${product.name}">
                    <p><strong>Precio:</strong> $${product.price}</p>
                    ${product.sizes ? `
                    <div id="sizes-${product.id}">
                        <label>Tamaño:</label><br>
                        ${product.sizes.map(size => `<button class="size-btn" onclick="selectSize(${product.id}, '${size}')">${size}</button>`).join('')}
                    </div>` : ''}
                    ${product.colors ? `
                    <div id="colors-${product.id}">
                        <label>Color:</label><br>
                        ${product.colors.map(color => `<button class="color-btn" onclick="selectColor(${product.id}, '${color}')">${color}</button>`).join('')}
                    </div>` : ''}
                    <br>
                    <button onclick="addToCart(${product.id})">Agregar al carrito</button>
                `;
                itemsContainer.appendChild(itemDiv);
            });
        }




          // Función para agregar un producto al carrito
    function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const selectedSize = selectedSizes[productId];
    const selectedColor = selectedColors[productId];


    if (!selectedSize || !selectedColor) {
        alert('Por favor, seleccione un tamaño y un color');
        return;
    }
    

    const item = {
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        color: selectedColor
    };

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();

    // Abre el carrito después de agregar un producto
    document.getElementById('cart').style.display = 'block';
}

        // Variables para almacenar las selecciones
        const selectedSizes = {};
        const selectedColors = {};

        // Función para seleccionar un tamaño
        function selectSize(productId, size) {
            selectedSizes[productId] = size;
            const sizeButtons = document.querySelectorAll(`#sizes-${productId} .size-btn`);
            sizeButtons.forEach(btn => {
                btn.classList.toggle('selected', btn.textContent === size);
            });

        }

         // Función para seleccionar un color
         function selectColor(productId, color) {
            selectedColors[productId] = color;
            const colorButtons = document.querySelectorAll(`#colors-${productId} .color-btn`);
            colorButtons.forEach(btn => {
                btn.classList.toggle('selected', btn.textContent === color);
            });
        }
           //Carrito emergente
         document.getElementById('open-cart').addEventListener('click', function() {
            document.getElementById('cart').style.display = 'block';
        });

        document.getElementById('close-cart').addEventListener('click', function() {
            document.getElementById('cart').style.display = 'none';
        });

        // Eliminar un producto del carrito
        function removeFromCart(productId) {
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems = cartItems.filter(item => item.id !== productId);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCart();
        }

        // Render
        function renderCart() {
            const cartItemsContainer = document.getElementById('cart-items');
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItemsContainer.innerHTML = '';
            cartItems.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - $${item.price} - Tamaño: ${item.size} - Color: ${item.color}`;
                const removeIcon = document.createElement('span');
                removeIcon.textContent = '🗑️';
                removeIcon.classList.add('remove-icon');
                removeIcon.onclick = () => removeFromCart(item.id);
                li.appendChild(removeIcon);
                cartItemsContainer.appendChild(li);
            });
        }
            // Función para agregar un producto al carrito
            function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            const selectedSize = selectedSizes[productId];
            const selectedColor = selectedColors[productId];

            if (!selectedSize || !selectedColor) {
                alert('Por favor, seleccione un tamaño y un color');
                return;
            }

            const item = {
                id: product.id,
                name: product.name,
                price: product.price,
                size: selectedSize,
                color: selectedColor
            };

            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existingItem = cartItems.find(cartItem => cartItem.id === item.id && cartItem.size === item.size && cartItem.color === item.color);

            if (existingItem) {
                alert('El producto con las mismas características ya está en el carrito');
                return;
            }

            cartItems.push(item);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCart();

            // Abre el carrito después de agregar un producto
            document.getElementById('cart').style.display = 'block';
        }
        // Función para eliminar un producto específico del carrito
         function removeFromCart(productId) {
         let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Encuentra el índice del producto en el carrito
           const index = cartItems.findIndex(item => item.id === productId);
         if (index !== -1) {

        // Elimina el producto del carrito en base a su índice
        cartItems.splice(index, 1);

        // Actualiza el carrito en el almacenamiento local
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Renderiza el carrito nuevamente
        renderCart();
    }
        }
        // checkout
        function checkout() {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            if (cartItems.length === 0) {
                alert('El carrito está vacío');
                return;
            }
            const total = cartItems.reduce((acc, item) => acc + item.price, 0);
            const confirmCheckout = confirm(`El total a pagar es: $${total}. ¿Desea proceder con el pago?`);
            if (confirmCheckout) {
                alert('¡Gracias por su compra, su compañero K9 estará feliz!');
                localStorage.removeItem('cartItems');
                renderCart();
            }
        }

        renderProducts();
        renderCart();