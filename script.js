document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const purchaseBtn = document.querySelector('.purchase-btn');
    const shipmentSection = document.querySelector('.shipment');
    const summaryItems = document.querySelector('.summary-items');
    const summaryTotal = document.querySelector('.summary-total');
    const shippingForm = document.getElementById('shipping-form');
    const trackOrderBtn = document.querySelector('.track-order-btn');
  
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', () => {
        const product = button.closest('.product');
        const productId = product.getAttribute('data-id');
        const productName = product.getAttribute('data-name');
        const productPrice = parseFloat(product.getAttribute('data-price'));
  
        const existingItem = cart.find(item => item.id === productId);
  
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }
  
        updateCart();
      });
    });
  
    // Update cart display
    function updateCart() {
      cartItems.innerHTML = '';
      let total = 0;
  
      cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${item.name} - $${item.price} x ${item.quantity}
          <button onclick="removeFromCart('${item.id}')">Remove</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
      });
  
      cartTotal.textContent = total.toFixed(2);
    }
  
    // Remove item from cart
    window.removeFromCart = (productId) => {
      const itemIndex = cart.findIndex(item => item.id === productId);
      if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        updateCart();
      }
    };
  
    // Purchase button functionality
    purchaseBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Your cart is empty!');
      } else {
        // Show shipment section
        shipmentSection.style.display = 'block';
        // Update order summary
        updateOrderSummary();
      }
    });
  
    // Update order summary
    function updateOrderSummary() {
      summaryItems.innerHTML = '';
      let total = 0;
  
      cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${item.name} - $${item.price} x ${item.quantity}
        `;
        summaryItems.appendChild(li);
        total += item.price * item.quantity;
      });
  
      summaryTotal.textContent = total.toFixed(2);
    }
  
    // Submit shipping details
    shippingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Shipping details submitted successfully!');
    });
  
    // Track order button
    trackOrderBtn.addEventListener('click', () => {
      alert('Your order is on the way! Track your order using the tracking number: 123456789');
    });
  });