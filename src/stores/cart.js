import { reactive, computed } from 'vue'
import productsStore from './products.js'

const state = reactive({
  items: []
})

function addToCart(product) {
  const existing = state.items.find(i => i.id === product.id)

  // solo agregar si hay stock disponible
  if (product.stock <= 0) return

  if (existing) {
    existing.qty++
  } else {
    state.items.push({ id: product.id, name: product.name, price: product.price, qty: 1 })
  }

  // disminuir stock en productsStore
  productsStore.decreaseStock(product.id, 1)
}

function increaseQty(id) {
  const it = state.items.find(i => i.id === id)
  const product = productsStore.state.products.find(p => p.id === id)
  if (it && product && product.stock > 0) {
    it.qty++
    productsStore.decreaseStock(id, 1)
  }
}

function decreaseQty(id) {
  const it = state.items.find(i => i.id === id)
  if (!it) return
  it.qty--
  productsStore.increaseStock(id, 1) // devolvemos stock al listado
  if (it.qty <= 0) {
    removeItem(id)
  }
}

function removeItem(id) {
  const idx = state.items.findIndex(i => i.id === id)
  if (idx !== -1) {
    const removed = state.items[idx]
    productsStore.increaseStock(id, removed.qty) // devolver todo el stock
    state.items.splice(idx, 1)
  }
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
