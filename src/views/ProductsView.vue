<!--
  ProductsView.vue
  Stratonea/Sales Tracker - Main view for managing products.
  - Ghana-optimized: mobile-first, offline-friendly, simple UI
  - Uses ProductList and ProductForm components
  - Handles add/edit product logic with mock data for now
  - Follows Stratonea guidelines and file structure
-->

<template>


  <!-- ===== Main Content ===== -->
  <div class="min-h-screen bg-gray-50 px-2 py-4">

    
    <!-- Product List (shows when not adding/editing) -->
    <ProductList v-if="!showForm" :products="products" @add="onAdd" @edit="onEdit" @delete="onDelete" />

    <!-- Product Form (shows when adding/editing) -->
    <ProductForm v-if="showForm" :initial="editingProduct || emptyProduct" :error="formError" @save="onSave"
      @cancel="onCancel" />

    <!-- ===== Floating Action Button (FAB) for Add Invoice ===== -->

    <button
      class="fixed bottom-20 right-4 md:hidden z-50 bg-green-500 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-3xl focus:outline-none"
      @click="onAdd" aria-label="Add Invoice" title="Add Invoice">
      +
    </button>
    <!-- ===== [New Feature] END ===== -->
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import { ref } from 'vue'

import ProductList from '@/components/lists/ProductList.vue'
import ProductForm from '@/components/forms/ProductForm.vue'

// ===== Types & Interfaces =====
/**
 * Product type for the product list and form.
 */
interface Product {
  name: string
  sku: string
  price: number
  stock: number
}


// ===== Constants & Config =====
/**
 * Default empty product for new entries.
 */
const emptyProduct: Product = {
  name: '',
  sku: '',
  price: 0,
  stock: 0
}

// ===== Main Logic =====
// Local mock product data (replace with Pinia/store or API later)
const products = ref<Product[]>([
  { name: 'Sample Product', sku: 'SKU-001', price: 10, stock: 25 },
  { name: 'Another Product', sku: 'SKU-002', price: 20, stock: 10 }
])

// State for showing the form and tracking which product is being edited
const showForm = ref(false)
const editingProduct = ref<Product | undefined>(undefined)
const formError = ref('')

/**
 * Handles the "Add" button click.
 */
function onAdd() {
  editingProduct.value = undefined // New product
  showForm.value = true
}

/**
 * Handles the "Edit" button click.
 * @param product - The product to edit
 */
function onEdit(product: Product) {
  editingProduct.value = { ...product }
  showForm.value = true
}

/**
 * Handles the "Delete" button click.
 * @param product - The product to delete
 */
function onDelete(product: Product) {
  // Remove product from list (mock logic)
  products.value = products.value.filter(p => p.sku !== product.sku)
}

/**
 * Handles saving a product (add or edit).
 * @param product - The product data from the form
 */
function onSave(product: Product) {
  // Simple validation (mock)
  if (!product.name || !product.sku) {
    formError.value = 'Please fill in all required fields.'
    return
  }
  formError.value = ''
  if (editingProduct.value) {
    // Edit existing product
    const idx = products.value.findIndex(p => p.sku === editingProduct.value?.sku)
    if (idx !== -1) products.value[idx] = { ...product }
  } else {
    // Add new product
    products.value.push({ ...product })
  }
  showForm.value = false
}

/**
 * Handles canceling the form.
 */
function onCancel() {
  showForm.value = false
  formError.value = ''
}
</script>

<!--
  ===== Styling Notes =====
  - Mobile-first, max-w-md for mobile, centered content.
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: aria-labels, clear feedback.
-->