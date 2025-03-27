// Função que faz a chamada para o backend e exibe os produtos
async function fetchProducts() {
    try {
      const response = await fetch('/api/products');
      const products = await response.json();
  
      const productList = document.getElementById('products');
      products.forEach(product => {
        const li = document.createElement('li');
        li.classList.add('product');
        li.innerHTML = `
          <h3>${product.name}</h3>
          <p>${product.price}</p>
          <a href="${product.link}" target="_blank">Ver produto</a>
        `;
        productList.appendChild(li);
      });
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  }
  
  // Chama a função para exibir os produtos
  fetchProducts();
  