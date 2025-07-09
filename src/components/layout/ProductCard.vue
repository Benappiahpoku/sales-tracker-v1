<!--
  ProductCard.vue
  Stratonea/Sales Tracker - Modern product card for mobile view
  - Card-based design matching dashboard style
  - Color-coded stock levels (green=in stock, orange=low, red=out)
  - Product placeholder icons and hover animations
  - Price prominently displayed with Ghana Cedis
  - Quick "Add to Sale" action button
  - Ghana-optimized: touch targets, offline support
  - Follows Stratonea guidelines
-->

<template>
  <!-- ===== Product Card ===== -->
  <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all duration-200 relative group">
    
    <!-- ===== Stock Status Badge ===== -->
    <div class="absolute top-4 right-4">
      <span :class="['inline-flex items-center px-2 py-1 rounded-full text-xs font-medium', stockStatusClass]">
        <div :class="['w-2 h-2 rounded-full mr-1', stockDotClass]"></div>
        {{ stockStatusText }}
      </span>
    </div>

    <!-- ===== Product Header ===== -->
    <div class="flex items-center mb-4">
      <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
        <font-awesome-icon icon="box" class="text-primary-600 text-xl" />
      </div>
      <div class="ml-3 flex-1">
        <h3 class="font-semibold text-gray-900 text-base truncate">{{ name }}</h3>
        <p class="text-sm text-gray-500">SKU: {{ sku }}</p>
      </div>
    </div>

    <!-- ===== Price Display ===== -->
    <div class="mb-4">
      <p class="text-2xl font-bold text-primary-600">
        {{ formatCurrency(price) }}
      </p>
    </div>

    <!-- ===== Stock Information ===== -->
    <div class="mb-4">
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-600">Stock Level</span>
        <span class="text-sm font-medium text-gray-900">{{ stock }} units</span>
      </div>
      <!-- Stock Progress Bar -->
      <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
        <div 
          :class="['h-2 rounded-full transition-all duration-300', stockProgressClass]"
          :style="{ width: `${stockPercentage}%` }"
        ></div>
      </div>
    </div>

    <!-- ===== Action Buttons ===== -->
    <div class="flex gap-2 mt-4">
      <!-- Add to Sale Button -->
      <button
        @click="emit('addToSale')"
        class="flex-1 bg-primary text-white px-4 py-3 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200 min-h-[48px] flex items-center justify-center"
        :disabled="stock <= 0"
        aria-label="Add to Sale"
      >
        <font-awesome-icon icon="plus" class="mr-2" />
        Add to Sale
      </button>
      
      <!-- Edit Button -->
      <button
        @click="emit('edit')"
        class="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 min-h-[48px] flex items-center justify-center"
        aria-label="Edit Product"
      >
        <font-awesome-icon icon="edit" />
      </button>
      
      <!-- Delete Button -->
      <button
        @click="emit('delete')"
        class="px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200 min-h-[48px] flex items-center justify-center"
        aria-label="Delete Product"
      >
        <font-awesome-icon icon="trash" />
      </button>
    </div>

    <!-- ===== Stock Warnings ===== -->
    <!-- Low Stock Warning -->
    <div v-if="isLowStock" class="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
      <div class="flex items-center">
        <font-awesome-icon icon="exclamation-triangle" class="text-orange-600 mr-2" />
        <p class="text-sm text-orange-800 font-medium">Low stock - consider restocking</p>
      </div>
    </div>

    <!-- Out of Stock Warning -->
    <div v-if="stock <= 0" class="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
      <div class="flex items-center">
        <font-awesome-icon icon="exclamation-triangle" class="text-red-600 mr-2" />
        <p class="text-sm text-red-800 font-medium">Out of stock</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * ProductCard.vue - Modern product card component
 * - Displays product information in card format for mobile view
 * - Color-coded stock levels with visual indicators
 * - Hover animations and touch-friendly buttons
 * - Quick actions: Add to Sale, Edit, Delete
 * - Ghana-optimized: clear pricing in GHS, offline support
 */

// ===== Imports =====
import { computed } from 'vue'

// ===== Types & Interfaces =====
interface Props {
  name: string
  sku: string
  price: number
  stock: number
}

const props = defineProps<Props>()

// ===== Emits =====
const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'delete'): void
  (e: 'addToSale'): void
}>()

// ===== Constants =====
const LOW_STOCK_THRESHOLD = 10
const MAX_STOCK_FOR_PERCENTAGE = 100

// ===== Computed Properties =====
const isLowStock = computed(() => 
  props.stock > 0 && props.stock <= LOW_STOCK_THRESHOLD
)

const stockPercentage = computed(() => 
  Math.min((props.stock / MAX_STOCK_FOR_PERCENTAGE) * 100, 100)
)

const stockStatusText = computed(() => {
  if (props.stock <= 0) return 'Out of Stock'
  if (props.stock <= LOW_STOCK_THRESHOLD) return 'Low Stock'
  return 'In Stock'
})

const stockStatusClass = computed(() => {
  if (props.stock <= 0) return 'bg-red-100 text-red-800'
  if (props.stock <= LOW_STOCK_THRESHOLD) return 'bg-orange-100 text-orange-800'
  return 'bg-green-100 text-green-800'
})

const stockDotClass = computed(() => {
  if (props.stock <= 0) return 'bg-red-500'
  if (props.stock <= LOW_STOCK_THRESHOLD) return 'bg-orange-500'
  return 'bg-green-500'
})

const stockProgressClass = computed(() => {
  if (props.stock <= 0) return 'bg-red-500'
  if (props.stock <= LOW_STOCK_THRESHOLD) return 'bg-orange-500'
  return 'bg-green-500'
})

// ===== Helper Functions =====
function formatCurrency(amount: number): string {
  return `GHS ${amount.toFixed(2)}`
}
</script>

<style scoped>
/* ===== Modern Card Animations ===== */
.group {
  transition: all 0.2s ease-in-out;
}

.group:hover {
  transform: translateY(-2px);
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

/* Disabled button styles */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button:disabled:hover {
  transform: none;
}
</style>