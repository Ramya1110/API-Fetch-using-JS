window.addEventListener('load', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  console.log(cart);
  const count = document.getElementById('count');

  if (count) {
    const totalCount = cart.reduce((sum, product) => {
      const quantity = Number(product.quantity) || 0;
      return sum + quantity;
    }, 0);
    count.textContent = totalCount;
  }
  fetchProducts();
});
// fetch('https://dummyjson.com/products?sortBy=title&order=asc')
//   .then((res) => res.json())
//   .then((data) => {
//     const products = data.products;

//     const categories = [...new Set(products.map((product) => product.category))];
//     console.log(data, categories);

//     createSideNav(categories, products);
//     displayAllProducts('All Products', products);
//   })
//   .catch(console.error);

async function fetchProducts() {
  try {
    const response = await fetch('https://dummyjson.com/products?sortBy=title&order=asc');
    const data = await response.json();
    const products = data.products;

    const categories = [...new Set(products.map((product) => product.category))];
    console.log(data, categories);

    createSideNav(categories, products);
    displayAllProducts('All Products', products);
  } catch (error) {
    console.error(error);
  }
}

function createSideNav(categories, products) {
  const sidenav = document.getElementById('sidenav');
  sidenav.innerHTML = '';

  categories.forEach((category) => {
    const container = document.createElement('div');
    container.classList.add('container');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = category;
    checkbox.value = category;

    const para = document.createElement('p');
    para.textContent = category;

    checkbox.addEventListener('change', () => {
      const checked = document.querySelectorAll('#sidenav input:checked');
      console.log(checked, 'checked');
      const checkeddata = [...checked].map((cb) => cb.value);
      console.log(checkeddata);
      const filtered = products.filter((product) => checkeddata.includes(product.category));
      console.log(filtered);
      displayAllProducts(checkeddata, filtered);
    });
    container.append(checkbox);
    container.appendChild(para);
    sidenav.appendChild(container);
  });
}
function displayAllProducts(category, products) {
  const content = document.getElementById('content');
  content.innerHTML = `<h3>${category}</h3>`;
  const container = document.createElement('div');
  container.classList.add('container');
  products.forEach((product) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h4>${product.title}</h4>
      <p>${product.description}</p>
      <b>Price: $${product.price}</b> <br>
      <button class="button" data-id="${product.id}">
    Add to Cart
  </button>
    `;
    container.appendChild(card);
  });
  content.appendChild(container);

  //Add to cart - functionality
  const buttons = document.querySelectorAll('.button');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      console.log(cart);
      const id = parseInt(button.getAttribute('data-id'));
      const addProduct = products.find((product) => product.id === id);
      const exist = cart.some((product) => product.id === id);
      if (exist) {
        alert('Already added to the cart');
      } else {
        addProduct.quantity = 1;
        cart.push(addProduct);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Added to the cart');
        console.log('Cart:', cart);
        count.textContent = cart.length;
        console.log('count:' + count);

        if (count) {
          const totalCount = cart.reduce((sum, product) => {
            const quantity = Number(product.quantity) || 0;
            return sum + quantity;
          }, 0);
          count.textContent = totalCount;
        }
      }
    });
  });
  const button = document.getElementById('cartBtn');
  button.addEventListener('click', () => {
    window.location.href = 'cart.html';
  });
}
