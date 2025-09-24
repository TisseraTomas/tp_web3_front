// src/stores/cart.js
import { reactive, computed } from 'vue'

const state = reactive({
  items: [] // cada item: { id, name, price, qty }
})

function addToCart(product) {
  const existing = state.items.find(i => i.id === product.id)
  if (existing) {
    if (product.stock && existing.qty < product.stock) existing.qty++
  } else {
    state.items.push({ id: product.id, name: product.name, price: product.price, qty: 1 })
  }
}

function increaseQty(id) {
  const it = state.items.find(i => i.id === id)
  if (it) it.qty++
}

function decreaseQty(id) {
  const it = state.items.find(i => i.id === id)
  if (!it) return
  it.qty--
  if (it.qty <= 0) {
    removeItem(id)
  }
}

function removeItem(id) {
  const idx = state.items.findIndex(i => i.id === id)
  if (idx !== -1) state.items.splice(idx, 1)
}

const total = computed(() => state.items.reduce((s, i) => s + i.price * i.qty, 0))

export default {
  state,
  addToCart,
  increaseQty,
  decreaseQty,
  removeItem,
  total
}
