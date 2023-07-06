// ====== CART OPEN AND CLOSE
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
// Open Cart
cartIcon.onclick = () => {
    cart.classList.add('active');
}
// Close Cart
closeCart.onclick = () => {
    cart.classList.remove('active');
}

// ====== Menu Open And Close
let iconMenu = document.querySelector('#menuItem');
let boxNav = document.querySelector('.navbar-nav');

iconMenu.onclick = () => {
    boxNav.classList.toggle('active');
}


// ========= Making Add To Cart ======
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}
else {
    ready();
}
// Making Function
function ready() {
    // Remove Item From Cart
    var removeCartBtn = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartBtn.length; i++) {
        removeCartBtn[i].addEventListener("click", removeCartItem);
    }
    // Change quantity
    var quantityInput = document.querySelectorAll('.cart-quantity');
    for (var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i];
        input.addEventListener("change", quantityChanged);
    }
    // Add To cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var btn = addCart[i];
        btn.addEventListener("click", AddCartClick);
    }

}
// Remove cart Item
function removeCartItem(event) {
    var btn = event.target;
    btn.parentElement.remove();
    updateTotal();
}
// Change quantity
function quantityChanged(event) {
    var btn = event.target;
    if (isNaN(btn.value) || btn.value <= 0) {
        btn.value = 1;
    }
    updateTotal();
}
// Add cart Item
function AddCartClick(event) {
    var btn = event.target;
    var Products = btn.parentElement;
    var title = Products.getElementsByClassName("title-product")[0].innerText;
    var price = Products.getElementsByClassName("price")[0].innerText;
    var imgProduct = Products.getElementsByClassName("product-img")[0].src;
    AddProductToCart(title, price, imgProduct);
    // saveCartItem();
    // updateCartIcon();
}
function AddProductToCart(title, price, imgProduct) {
    var CartShopBox = document.createElement('div');
    CartShopBox.classList.add('cart-box');
    var CartItems = document.querySelector('.cart-content');
    var CartItemName = CartItems.querySelectorAll('.cart-product-title');
    for (var i = 0; i < CartItemName.length; i++) {
        if (CartItemName[i].innerText == title) {
            alert("Bạn đã thêm sản phẩm này vào giỏ hàng trước đây rồi !!")
            return;
        }
    }
    var cartBoxContent = `<img src="${imgProduct}" alt="img" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- Remove Cart -->
                        <i class='bx bx-trash cart-remove'></i>`
    CartShopBox.innerHTML = cartBoxContent;
    CartItems.appendChild(CartShopBox);
    CartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    CartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
    updateTotal();
    // saveCartItem();
    // updateCartIcon();
}
function updateTotal() {
    var cartContent = document.querySelector('.cart-content');
    var cartBoxs = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxs.length; i++) {
        var cartBox = cartBoxs[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantity = cartBox.getElementsByClassName('cart-quantity')[0].value;
        var price = parseFloat(priceElement.innerHTML.replace("$", ""));
        total = total + price * quantity;
    }
    total = Math.round(total * 100) / 100;
    document.querySelector('.total-price').innerHTML = "$" + total;
}
// BUY NOW
document.querySelector('.btn-buy').addEventListener("click", () => {
    var cartContent = document.querySelector('.cart-content');
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
});

