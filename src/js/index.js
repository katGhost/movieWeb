const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-btn');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');
const bannerBtn = document.querySelector('.banner-btn');

//main cart, placing and getting info from local storage
//in cart
let cart = [];
//buttons
let buttonsDOM = [];

/*classes*/

// API
class Products{
   async getProducts(){
      try{
         let result = await fetch('products.json');
         let data = await result.json();
         let products = data.items;
         products = products.map(item => {
            const { title,price } = item.fields;
            const { id } = item.sys;
            const image = item.fields.image.fields.file.url;
            return { title, price, id, image };
         });
         return products;
      } catch (error) {
         console.log(error);
      }
   }
}


// UI
class UI{
    displayProducts(products) {
       let result = '';
       products.forEach(product => {
          result += `
          <article class="product">
             <div class="img-container">
                <img src=${product.image} alt="product-1" class="product-img">
                <button class="cart-btn" data-id=${product.id}>
                   <i class="shopping-cart">
                      <img src="./img/iconmonstr-shopping-cart-3.svg" alt="">
                   </i>
                   add to cart
                </button>
             </div>
             <h3>${product.title}</h3>
             <h4>R${product.price}</h4>
          </article>
          `;
       });
       productsDOM.innerHTML = result;
    }
}
