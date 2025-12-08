const products = [
    {
        id: 1,
        name: "Bay Leaf Cheesecake",
        price: 12.99,
        size: "500ml",
        category: "pints",
        flavor: "seasonal",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=800&fit=crop",
        description: "A tribute to our favorite little laurel. Tastes like a cool breeze."
    },
    {
        id: 2,
        name: "Chocolate Fudge Brownie",
        price: 11.99,
        size: "500ml",
        category: "pints",
        flavor: "chocolate",
        image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=800&h=800&fit=crop",
        description: "Rich chocolate ice cream with fudge swirls and brownie chunks."
    },
    {
        id: 3,
        name: "Strawberry Cheesecake",
        price: 11.99,
        size: "500ml",
        category: "pints",
        flavor: "fruit",
        image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w-800&h=800&fit=crop",
        description: "Creamy cheesecake ice cream with strawberry swirls."
    },
    {
        id: 4,
        name: "Vanilla Bean",
        price: 10.99,
        size: "500ml",
        category: "pints",
        flavor: "vanilla",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=800&fit=crop",
        description: "Classic vanilla with real vanilla bean specks."
    },
    {
        id: 5,
        name: "Mint Chocolate Chip",
        price: 11.99,
        size: "500ml",
        category: "pints",
        flavor: "chocolate",
        image: "https://images.unsplash.com/photo-1516559828984-fb3b99548b21?w=800&h=800&fit=crop",
        description: "Refreshing mint ice cream with dark chocolate chips."
    },
    {
        id: 6,
        name: "Salted Caramel",
        price: 12.99,
        size: "500ml",
        category: "pints",
        flavor: "nut",
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&h=800&fit=crop",
        description: "Sweet caramel ice cream with a hint of sea salt."
    },
    {
        id: 7,
        name: "Cookies & Cream",
        price: 11.99,
        size: "500ml",
        category: "pints",
        flavor: "chocolate",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=800&fit=crop",
        description: "Vanilla ice cream with chocolate cookie pieces."
    },
    {
        id: 8,
        name: "Pistachio",
        price: 13.99,
        size: "500ml",
        category: "pints",
        flavor: "nut",
        image: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=800&h=800&fit=crop",
        description: "Creamy pistachio ice cream with roasted nuts."
    },
    {
        id: 9,
        name: "Ice Cream Sandwich - Chocolate",
        price: 6.99,
        size: "single",
        category: "sandwiches",
        flavor: "chocolate",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=800&fit=crop&crop=faces",
        description: "Chocolate cookies with vanilla ice cream filling."
    },
    {
        id: 10,
        name: "Ice Cream Sandwich - Strawberry",
        price: 6.99,
        size: "single",
        category: "sandwiches",
        flavor: "fruit",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=800&fit=crop",
        description: "Vanilla cookies with strawberry ice cream filling."
    },
    {
        id: 11,
        name: "Family Pack Collection",
        price: 49.99,
        size: "1l",
        category: "collections",
        flavor: "vanilla",
        image: "https://images.unsplash.com/photo-1516043827470-d52c543c438f?w=800&h=800&fit=crop",
        description: "Assortment of 6 different flavors (1L each)."
    },
    {
        id: 12,
        name: "Holiday Collection",
        price: 39.99,
        size: "500ml",
        category: "collections",
        flavor: "seasonal",
        image: "https://images.unsplash.com/photo-1532117182044-031e7cd916ee?w=800&h=800&fit=crop",
        description: "Special holiday flavors in a gift box."
    }
];

// Корзина
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let filteredProducts = [...products];
let visibleProducts = 8;

// DOM элементы
const productsGrid = document.getElementById('productsGrid');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const totalPrice = document.getElementById('totalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');
const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
const clearFiltersBtn = document.getElementById('clearFilters');
const sortSelect = document.getElementById('sortSelect');
const resultsCount = document.getElementById('resultsCount');
const loadMoreBtn = document.getElementById('loadMore');
const cartLink = document.querySelector('.cart-link');

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
    setupEventListeners();
});

// Рендер карточек товаров
function renderProducts() {
    productsGrid.innerHTML = '';
    
    const productsToShow = filteredProducts.slice(0, visibleProducts);
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-category', product.category);
        productCard.setAttribute('data-flavor', product.flavor);
        productCard.setAttribute('data-size', product.size);
        productCard.setAttribute('data-price', getPriceRange(product.price));
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/logo.png'">
                <div class="product-badge">${product.size}</div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-details">
                    <span class="product-size">${product.size}</span>
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                </div>
                <button class="add-to-cart-btn" data-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    updateResultsCount();
    
    // Показываем/скрываем кнопку "Load More"
    loadMoreBtn.style.display = visibleProducts < filteredProducts.length ? 'block' : 'none';
    
    // Добавляем обработчики для кнопок "Add to Cart"
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Определение ценового диапазона
function getPriceRange(price) {
    if (price < 10) return 'under-10';
    if (price <= 20) return '10-20';
    return 'over-20';
}

// Добавление в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCartToLocalStorage();
    
    // Анимация добавления
    const addButton = document.querySelector(`.add-to-cart-btn[data-id="${productId}"]`);
    addButton.textContent = 'Added!';
    addButton.classList.add('added');
    
    setTimeout(() => {
        addButton.textContent = 'Add to Cart';
        addButton.classList.remove('added');
    }, 1000);
}

// Обновление счетчика корзины
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Сохранение корзины в localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Открытие корзины
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        openCartModal();
    });
    
    // Закрытие корзины
    closeCart.addEventListener('click', closeCartModal);
    
    // Закрытие корзины при клике вне её
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            closeCartModal();
        }
    });
    
    // Обработка фильтров
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Очистка фильтров
    clearFiltersBtn.addEventListener('click', clearFilters);
    
    // Сортировка
    sortSelect.addEventListener('change', applySorting);
    
    // Кнопка "Load More"
    loadMoreBtn.addEventListener('click', loadMoreProducts);
    
    // Кнопка оформления заказа
    checkoutBtn.addEventListener('click', checkout);
}

// Открытие модального окна корзины
function openCartModal() {
    renderCartItems();
    cartModal.style.display = 'flex';
}

// Закрытие модального окна корзины
function closeCartModal() {
    cartModal.style.display = 'none';
}

// Рендер товаров в корзине
function renderCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        totalPrice.textContent = '$0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.size} • $${item.price.toFixed(2)} each</p>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn minus" data-id="${item.id}">−</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                <span class="item-total">$${itemTotal.toFixed(2)}</span>
                <button class="remove-item" data-id="${item.id}">×</button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    totalPrice.textContent = `$${total.toFixed(2)}`;
    
    // Добавляем обработчики для кнопок в корзине
    document.querySelectorAll('.quantity-btn.minus').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            updateCartQuantity(productId, -1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            updateCartQuantity(productId, 1);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Обновление количества товара в корзине
function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        
        updateCartCount();
        saveCartToLocalStorage();
        renderCartItems();
    }
}

// Удаление товара из корзины
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    saveCartToLocalStorage();
    renderCartItems();
}

// Применение фильтров
function applyFilters() {
    const activeFilters = {
        category: [],
        flavor: [],
        size: [],
        price: []
    };
    
    // Собираем активные фильтры
    filterCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const filterType = checkbox.getAttribute('data-filter');
            const value = checkbox.value;
            activeFilters[filterType].push(value);
        }
    });
    
    // Фильтруем продукты
    filteredProducts = products.filter(product => {
        // Проверяем каждый тип фильтра
        for (const filterType in activeFilters) {
            if (activeFilters[filterType].length > 0) {
                if (filterType === 'price') {
                    const priceRange = getPriceRange(product.price);
                    if (!activeFilters[filterType].includes(priceRange)) {
                        return false;
                    }
                } else if (!activeFilters[filterType].includes(product[filterType])) {
                    return false;
                }
            }
        }
        return true;
    });
    
    visibleProducts = 8;
    applySorting();
}

// Очистка фильтров
function clearFilters() {
    filterCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    filteredProducts = [...products];
    visibleProducts = 8;
    sortSelect.value = 'featured';
    renderProducts();
}

// Применение сортировки
function applySorting() {
    const sortValue = sortSelect.value;
    
    switch (sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'newest':
            // В нашем случае просто переворачиваем массив
            filteredProducts.reverse();
            break;
        default:
            // Featured - возвращаем исходный порядок
            filteredProducts = [...filteredProducts];
    }
    
    renderProducts();
}

function loadMoreProducts() {
    visibleProducts += 4;
    renderProducts();
}

// Обновление счетчика результатов
function updateResultsCount() {
    const count = Math.min(visibleProducts, filteredProducts.length);
    resultsCount.textContent = count;
}

// Оформление заказа
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert(`Thank you for your order! Total: $${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`);
    cart = [];
    updateCartCount();
    saveCartToLocalStorage();
    closeCartModal();
    renderCartItems();
}