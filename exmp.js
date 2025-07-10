fetch('https://dummyjson.com/products/search?q=phone')
  // fetch('https://dummyjson.com/products');
  //fetch('https://dummyjson.com/products?sortBy=title&order=asc')
  .then((res) => res.json())
  .then((data) => {
    const products = data.products;
    const categorySet = new Set();
    for (const product of products) {
      categorySet.add(product.category);
    }
    console.log(data);

    const categories = [...categorySet];
    console.log(categories);
    createSideNav(categories, products);
    displayAllProducts(products);
  })
  .catch((err) => console.error(err));

function createSideNav(categories, products) {
  const sidenav = document.getElementById('sidenav');
  sidenav.innerHTML = '';
  //sidenav bar
  categories.forEach((category) => {
    const container = document.createElement('div');
    container.textContent = '';
    container.classList.add('container');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = category;
    checkbox.value = category;
    const label = document.createElement('label');
    label.textContent = category;
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        displayContent(category, products);
      } else {
        content.textContent = '';
      }
    });
    container.appendChild(checkbox);
    container.appendChild(label);
    sidenav.appendChild(container);
  });
}
//content bar
function displayContent(category, products) {
  const content = document.getElementById('content');
  content.innerHTML = `<h3>${category}</h3>`;
  content.style.color = 'white';
  const filtered = products.filter((product) => product.category === category);

  const container = document.createElement('div');
  container.classList.add('container');

  filtered.forEach((product) => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
    <h4>${product.title}</h4>
    <p>${product.description}</p>
    <b>Price: $${product.price}</b>
  `;
    container.appendChild(card);
  });
  content.appendChild(container);
}
//all products
function displayAllProducts(products) {
  const content = document.getElementById('content');
  content.innerHTML = `<h3>All Products</h3>`;

  const container = document.createElement('div');
  container.classList.add('container');

  products.forEach((product) => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <h4>${product.title}</h4>
      <p>${product.description}</p>
      <b>Price: $${product.price}</b>
    `;
    container.appendChild(card);
  });

  content.appendChild(container);
}
