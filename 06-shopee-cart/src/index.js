// src/index.js

import * as cartService from "./services/cart.js";
import createItem from "./services/item.js";
import * as couponService from "./services/coupon.js";

//const myCart = [];
const myCart = {
  items: [],
  couponCode: null, // Cupom de desconto
};

const myWhishList = [];

console.log("Welcome to the your Shopee Cart!");

//criando dois itens
const item1 = await createItem("hotwheels ferrari", 20.99, 1);
const item2 = await createItem("hotwheels lamborghini", 39.99, 3);

// adicionei dois itens ao carrinho
await cartService.addItem(myCart, item1);
await cartService.addItem(myCart, item2);

await cartService.removeItem(myCart, item2);
await cartService.removeItem(myCart, item2);
await cartService.removeItem(myCart, item2);

await cartService.displaycart(myCart);
// deletei dois itens do carrinho
// await cartService.deleteItem(myCart, item2.name);
// await cartService.deleteItem(myCart, item1.name);
await cartService.calculateTotal(myCart);

console.log("\n🎁 Aplicando CUPOM: DESCONTO20");
await couponService.addCoupon(myCart, "DESCONTO20");
