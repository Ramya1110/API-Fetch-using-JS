window.addEventListener('load', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cartContainer');
  const displayPrice = document.getElementById('price');
  displayPrice.style.color = '#e67e22';

  cart.forEach((product) => {
    const card = document.createElement('div');
    card.classList.add('card');
    product.quantity = product.quantity || 1;
    console.log(product.quantity);

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btnContainer');
    btnContainer.innerHTML = `
    <button id='decrese'>-</button>
    <span id='quantity'>${product.quantity}</span>
    <button id='increse'>+</button>
    `;
    const decBtn = btnContainer.querySelector('#decrese');
    const incBtn = btnContainer.querySelector('#increse');
    const displayQuantity = btnContainer.querySelector('#quantity');

    decBtn.addEventListener('click', () => {
      if (product.quantity > 1) {
        product.quantity--;
        displayQuantity.textContent = product.quantity;
        updateInLocalStorage();
        totalPrice();
      } else {
        card.remove();
        const index = cart.findIndex((p) => p.id === product.id);
        if (index > -1) {
          cart.splice(index, 1);
        }
        alert('remove from the cart');
        updateInLocalStorage();
        totalPrice();
      }
    });

    incBtn.addEventListener('click', () => {
      product.quantity++;
      displayQuantity.textContent = product.quantity;
      updateInLocalStorage();
      totalPrice();
    });
    card.innerHTML = `
      <h4>${product.title}</h4>
      <p>${product.description}</p>
      <b>Price: $${product.price}</b>
    `;
    card.appendChild(btnContainer);
    cartContainer.appendChild(card);
  });
  function updateInLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  function totalPrice() {
    const total = cart.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);
    displayPrice.textContent = `Total Price: $${total}`;
  }
  totalPrice();
});
