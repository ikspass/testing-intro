function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

const availablePromo = 'SAVE10';
const deliverySum = 30000;

function addToCart(cart, product, quantity) { 
  if (quantity <= 0){
    throw new RangeError("Количество товара должно быть больше 0")
  }

  if (quantity > product.stock) {
    throw new RangeError("Количество товара должно быть меньше или равно кол-ву товара в наличии")
  }

  const selectedProduct = cart.find((p) => p.id == product.id);

  if (selectedProduct) {
    cart.forEach(p => {
      if (p.id === product.id) {
        p.quantity += quantity;
      }
    })
  } else {
    cart.push({...product, quantity})
  }

  return cart;
}
function changeQuantity(cart, productId, quantity) { 
  if (quantity <= 0) {
    throw new RangeError("Количество товара должно быть больше 0")
  }

  const selectedProduct = cart.find(p => p.id === productId);
  if(selectedProduct && quantity > selectedProduct.stock){
    throw new RangeError("Количество товара должно быть меньше или равно кол-ву товара в наличии")
  }

  cart.forEach(p => {
    if (p.id = productId) {
      p.quantity = quantity;
    }
  })

  return cart;
}
function removeFromCart(cart, productId) { 
  return cart.filter((p) => p.id !== productId)
}
function calculateCartSubtotal(cart) { 
  let total = 0;
  if (cart.length !== 0) {
    cart.forEach(p => {
      total += p.price * p.quantity;
    });
  }
  return total;
}
function calculateOrderTotal(cart, promo) { 
  let order = {
    subtotal: calculateCartSubtotal(cart),
    discount: 0,
    delivery: 0,
    total: calculateCartSubtotal(cart)
  };

  if (order.subtotal < 50000 && order.subtotal !== 0) {
    order.delivery = deliverySum;
  }

  if (order.subtotal >= 20000 && promo === availablePromo) {
    order.discount = order.total * 0.1;
  }
  order.total = order.subtotal - order.discount + order.delivery;

  return order;
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
