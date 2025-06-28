<!--
  ProductsView.vue
  Stratonea/Sales Tracker - Products management page
  - Modern card-based design matching dashboard style
  - Mobile-first responsive layout
  - Handles product CRUD operations
  - Ghana-optimized: touch targets, clear pricing, offline support
  - All TypeScript interfaces properly defined for learning
  - Follows Stratonea guidelines
-->

<template>
  <div class="products-page">
    <!-- ===== Page Header ===== -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Products</h1>
        <p class="text-gray-600 mt-1">Manage your product inventory</p>
      </div>
      
      <!-- Add Product Button -->
      <button
        @click="showAddForm"
        class="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200 min-h-[48px] flex items-center gap-2"
        aria-label="Add New Product"
      >
        <font-awesome-icon icon="plus" />
        <span class="hidden sm:inline">Add Product</span>
      </button>
    </div>

    <!-- ===== [Fix] START: Product List with corrected typing ===== -->
    <!-- Product List - passes products with proper id field -->
    <ProductList 
      v-if="!showForm" 
      :products="products" 
      @edit="onEdit" 
      @delete="onDelete" 
      @add-to-sale="onAddToSale" 
    />
    <!-- ===== [Fix] END ===== -->

    <!-- Product Form (Add/Edit) -->
    <ProductForm
      v-if="showForm"
      :product="selectedProduct"
      :is-editing="isEditing"
      @save="onSave"
      @cancel="onCancel"
    />

    <!-- Empty State -->
    <div v-if="products.length === 0 && !showForm" class="text-center py-12">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <font-awesome-icon icon="box" class="text-gray-400 text-2xl" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
      <p class="text-gray-500 mb-6">Start by adding your first product to track inventory</p>
      <button
        @click="showAddForm"
        class="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200"
      >
        Add Your First Product
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * ProductsView.vue - Main products management page
 * - Displays product list with modern card/table layout
 * - Handles product CRUD operations (Create, Read, Update, Delete)
 * - Manages form state for adding/editing products
 * - Ghana-optimized: clear GHS pricing, offline support
 * - Proper TypeScript interfaces for all product data
 * - Emits events for parent components to handle data persistence
 */

// ===== Imports =====
import { ref, computed } from 'vue'
import ProductList from '@/components/lists/ProductList.vue'
import ProductForm from '@/components/forms/ProductForm.vue'

// ===== Types & Interfaces =====
/**
 * Product interface with all required fields including id
 * - id: Unique identifier for the product (required by ProductList)
 * - name: Display name of the product
 * - sku: Stock Keeping Unit (unique product code)
 * - price: Product price in Ghana Cedis
 * - stock: Current stock level (number of units available)
 * - description: Optional product description
 * - category: Optional product category
 */
interface Product {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  description?: string
  category?: string
}

// ===== State Management =====
/**
 * Products array with proper id field for TypeScript compliance
 * Each product now includes the required id field that ProductList expects
 */
const products = ref<Product[]>([
  {
    id: '1', // ===== [Fix] Added required id field =====
    name: 'Rice 25kg',
    sku: 'RICE-25KG-001',
    price: 85.00,
    stock: 45
  },
  {
    id: '2', // ===== [Fix] Added required id field =====
    name: 'Cooking Oil 5L',
    sku: 'OIL-5L-002',
    price: 32.50,
    stock: 23
  },
  {
    id: '3', // ===== [Fix] Added required id field =====
    name: 'Sugar 2kg',
    sku: 'SUGAR-2KG-003',
    price: 12.00,
    stock: 5 // Low stock example
  },
  {
    id: '4', // ===== [Fix] Added required id field =====
    name: 'Flour 10kg',
    sku: 'FLOUR-10KG-004',
    price: 65.00,
    stock: 0 // Out of stock example
  }
])

/**
 * Form state management
 * - showForm: Controls visibility of add/edit form
 * - selectedProduct: Currently selected product for editing
 * - isEditing: Determines if form is in edit mode or add mode
 */
const showForm = ref(false)
const selectedProduct = ref<Product | null>(null)
const isEditing = computed(() => selectedProduct.value !== null)

// ===== Helper Functions =====
/**
 * Generates a unique ID for new products
 * In a real app, this would be handled by the backend
 * @returns Unique string identifier
 */
function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

// ===== Event Handlers =====
/**
 * Shows the add product form
 * Resets selected product and shows form
 */
function showAddForm() {
  selectedProduct.value = null
  showForm.value = true
}

/**
 * Handles edit product action
 * Sets selected product and shows form in edit mode
 * @param product - The product to edit
 */
function onEdit(product: Product) {
  selectedProduct.value = { ...product }
  showForm.value = true
}

/**
 * Handles delete product action
 * Shows confirmation dialog and removes product if confirmed
 * @param product - The product to delete
 */
function onDelete(product: Product) {
  if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
    const index = products.value.findIndex(p => p.id === product.id)
    if (index !== -1) {
      products.value.splice(index, 1)
    }
  }
}

/**
 * Handles add to sale action
 * In a real app, this would add the product to current sale
 * @param product - The product to add to sale
 */
function onAddToSale(product: Product) {
  if (product.stock > 0) {
    // TODO: Implement add to sale functionality
    alert(`Added "${product.name}" to sale. This will be implemented in the sales module.`)
  } else {
    alert(`"${product.name}" is out of stock and cannot be added to sale.`)
  }
}

/**
 * Handles save product action from form
 * Creates new product or updates existing based on editing state
 * @param productData - The product data from form
 */
function onSave(productData: Omit<Product, 'id'>) {
  if (isEditing.value && selectedProduct.value) {
    // ===== [Fix] START: Update existing product =====
    // Update existing product - maintain the original id
    const index = products.value.findIndex(p => p.id === selectedProduct.value!.id)
    if (index !== -1) {
      products.value[index] = {
        ...productData,
        id: selectedProduct.value.id // Keep original id
      }
    }
    // ===== [Fix] END =====
  } else {
    // ===== [Fix] START: Add new product with generated id =====
    // Add new product - generate new id
    const newProduct: Product = {
      ...productData,
      id: generateId() // Generate unique id for new product
    }
    products.value.push(newProduct)
    // ===== [Fix] END =====
  }
  
  // Reset form state
  showForm.value = false
  selectedProduct.value = null
}

/**
 * Handles cancel form action
 * Hides form and resets selected product
 */
function onCancel() {
  showForm.value = false
  selectedProduct.value = null
}
</script>

<style scoped>
/* ===== Modern Page Styling ===== */
.products-page {
  max-width: 7xl;
  margin: 0 auto;
  padding: 1.5rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .products-page {
    padding: 1rem;
  }
}

/* Touch feedback for mobile users */
button:active {
  transform: scale(0.98);
}

/* Enhanced focus states for accessibility */
button:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}
</style>