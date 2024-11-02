// src/lib/stores/cartStore.js
import { writable } from 'svelte/store';

export const cart = writable([]); // Initialize cart as an empty array
console.log('🚀 ~ cart:', cart);

// Function to add a product to the cart
/**
 * @param {{ id: any; }} product
 */
export function addToCart(product) {
  console.log('🚀 ~ addToCart ~ product:', product);
  cart.update((items) => {
    const existingProduct = items.find((item) => item.id === product.id);
    if (existingProduct) {
      console.log('🚀 ~ cart.update ~ existingProduct:', existingProduct);
      existingProduct.quantity += 1; // Increase quantity if product already exists
    } else {
      items.push({ ...product, quantity: 1 }); // Add new product with quantity 1
    }
    return items;
  });
}

// Function to remove a product from the cart
export function removeFromCart(productId) {
  cart.update((items) => items.filter((item) => item.id !== productId));
}

// Function to update quantity of a product
export function updateQuantity(productId, quantity) {
  cart.update((items) => {
    const product = items.find((item) => item.id === productId);
    if (product) product.quantity = quantity;
    return items;
  });
}
