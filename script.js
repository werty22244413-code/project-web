// Инициализируем корзину из localStorage или создаем пустой массив
let cart = JSON.parse(localStorage.getItem('soft_drinks_cart')) || [];

// Функция добавления товара в корзину (для страницы каталога)
function addToCart(id, name, price) {
    // Проверяем, есть ли уже такой товар в корзине
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    
    // Сохраняем обновленную корзину
    saveCart();
    alert(`${name} добавлен в корзину!`);
}

// Функция сохранения корзины в память браузера
function saveCart() {
    localStorage.setItem('soft_drinks_cart', JSON.stringify(cart));
}

// Функция отрисовки элементов на странице корзины
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total-price');
    
    if (!cartContainer) return; // Если мы не на странице корзины, выходим
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Ваша корзина пока пуста.</p>';
        totalContainer.innerText = '0';
        return;
    }
    
    cartContainer.innerHTML = '';
    let totalPrice = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>${item.price} ₽ x ${item.quantity}</p>
            </div>
            <div>
                <span style="font-weight:bold; margin-right: 15px;">${itemTotal} ₽</span>
                <button onclick="removeFromCart(${index})" style="background-color: #e74c3c;">Удалить</button>
            </div>
        `;
        cartContainer.appendChild(itemElement);
    });
    
    totalContainer.innerText = totalPrice;
}

// Функция удаления товара из корзины
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

// Очистить всю корзину
function clearCart() {
    cart = [];
    saveCart();
    renderCart();
}

// Если открыта страница корзины, сразу отрисовываем её контент
document.addEventListener('DOMContentLoaded', renderCart);