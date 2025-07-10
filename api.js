fetch('https://dummyjson.com/products?sortBy=title&order=asc')
  .then((res) => res.json())
  .then((data) => {
    const products = data.products;
    const categories = [...new Set(products.map((product) => product.category))];
    console.log(categories);
    createSideNavbar(categories, products);
  })
  .catch((err) => console.error(err));

function createSideNavbar(categories, products) {
  const sideNav = document.getElementById('sidenav');
  sideNav.innerHTML = '';
  categories.forEach((category) => {
    const btn = document.createElement('button');
    btn.textContent = category;
    btn.addEventListener('click', () => {
      displayContent(category, products);
    });
    sideNav.appendChild(btn);
  });
}

function displayContent(category, products) {
  const content = document.getElementById('content');
  content.innerHTML = `<h3>${category}</h3>`;

  const filtered = products.filter((product) => product.category === category);
  const container = document.createElement('div');
  container.classList.add('container');
  filtered.forEach((product) => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
 <h3>${product.title}</h3>
  <p>${product.description}</p>
   <b>Price: $${product.price}</b>
  `;
    container.appendChild(card);
  });
  content.appendChild(container);
}
