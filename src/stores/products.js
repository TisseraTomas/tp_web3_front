import { reactive } from 'vue'

const state = reactive({
  products: [
    { id: 1, name: 'Pan', price: 50, stock: 10 },
    { id: 2, name: 'Leche', price: 120, stock: 5 },
    { id: 3, name: 'Huevos (x12)', price: 300, stock: 0 },
    { id: 4, name: 'Queso', price: 700, stock: 2 },
    { id: 5, name: 'Mermelada', price: 220, stock: 4 },
  ]
})

function decreaseStock(id, qty = 1) {
  const p = state.products.find(pr => pr.id === id)
  if (p && p.stock > 0) {
    p.stock = Math.max(0, p.stock - qty)
  }
}

function increaseStock(id, qty = 1) {
  const p = state.products.find(pr => pr.id === id)
  if (p) {
    p.stock += qty
  }
}

export default {
  state,
  decreaseStock,
  increaseStock
}

