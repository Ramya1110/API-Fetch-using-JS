//fetch('https://dummyjson.com/products/search?q=phone')
fetch('https://dummyjson.com/products?sortBy=title&order=asc')
  .then((res) => res.json())
  .then((data) => {
    const products = data.products;

    const categories = [...new Set(products.map((product) => product.category))];
    console.log(data, categories);

    createSideNav(categories, products);
    displayAllProducts('All Products', products);
  })
  .catch(console.error);

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
      if (checkeddata.length === 0) {
        content.innerHTML = `<h3>No Category Selected</h3>`;
        return;
      }
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
  content.style.color = 'white';

  const container = document.createElement('div');
  container.classList.add('container');

  products.forEach((product) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h4>${product.title}</h4>
      <p>${product.description}</p>
      <b>Price: $${product.price}</b> <br>
      <button>Add</button>
    `;
    container.appendChild(card);
  });

  content.appendChild(container);
}
