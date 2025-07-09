<!--
  StockCard.vue
  Stratonea/Sales Tracker - Stock change card for mobile view
  - Shows stock changes (restocks, sales, adjustments)
  - Color-coded by change type (green=positive, red=negative, orange=neutral)
  - 3 core actions: View, Edit, Delete
  - Quick restock button for low/out of stock items
  - Ghana-optimized: touch targets, clear formatting
  - Follows Stratonea guidelines
-->

<template>
  <!-- ===== Stock Card ===== -->
  <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all duration-200 relative group">
    
    <!-- ===== Change Status Badge ===== -->
    <div class="absolute top-4 right-4">
      <span :class="['inline-flex items-center px-2 py-1 rounded-full text-xs font-medium', changeStatusClass]">
        <div :class="['w-2 h-2 rounded-full mr-1', changeDotClass]"></div>
        {{ changeStatusText }}
      </span>
    </div>

    <!-- ===== Stock Header ===== -->
    <div class="flex items-center mb-4">
      <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
        <font-awesome-icon icon="box" class="text-primary-600 text-xl" />
      </div>
      <div class="ml-3 flex-1">
        <h3 class="font-semibold text-gray-900 text-base truncate">{{ productName }}</h3>
        <p class="text-sm text-gray-500">SKU: {{ productSku }}</p>
      </div>
    </div>

    <!-- ===== Change Amount Display ===== -->
    <div class="mb-4">
      <p class="text-2xl font-bold text-primary-600">
        {{ formatChangeAmount(changeAmount) }}
      </p>
      <p class="text-sm text-gray-500">{{ changeType }} • {{ currentStock }} units remaining</p>
    </div>

    <!-- ===== Change Details ===== -->
    <div class="mb-4">
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-600">Changed On</span>
        <span class="text-sm font-medium text-gray-900">{{ formatTimestamp(timestamp) }}</span>
      </div>
      <div v-if="reason" class="flex items-center justify-between mt-1">
        <span class="text-sm text-gray-600">Reason</span>
        <span class="text-sm font-medium text-gray-900">{{ reason }}</span>
      </div>
    </div>

    <!-- ===== Action Buttons ===== -->
    <div class="flex gap-2 mt-4">
      <!-- View Button -->
      <button
        @click="emit('view')"
        class="flex-1 bg-primary text-white px-4 py-3 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200 min-h-[48px] flex items-center justify-center"
        aria-label="View Stock Details"
      >
        <font-awesome-icon icon="eye" class="mr-2" />
        View
      </button>
      
      <!-- Edit Button -->
      <button
        @click="emit('edit')"
        class="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 min-h-[48px] flex items-center justify-center"
        aria-label="Edit Stock Entry"
      >
        <font-awesome-icon icon="edit" />
      </button>
      
      <!-- Delete Button -->
      <button
        @click="emit('delete')"
        class="px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200 min-h-[48px] flex items-center justify-center"
        aria-label="Delete Stock Entry"
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
    <div v-if="isOutOfStock" class="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
      <div class="flex items-center">
        <font-awesome-icon icon="exclamation-triangle" class="text-red-600 mr-2" />
        <p class="text-sm text-red-800 font-medium">Out of stock</p>
      </div>
    </div>
    
    <!-- ===== Quick Restock Button ===== -->
    <div v-if="isLowStock || isOutOfStock" class="mt-3 pt-3 border-t border-gray-100">
      <button
        @click="emit('quickRestock')"
        class="w-full bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 min-h-[48px] flex items-center justify-center"
        aria-label="Quick Restock"
      >
        <font-awesome-icon icon="plus" class="mr-2" />
        Quick Restock
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * StockCard.vue - Stock change card component
 * - Shows stock change information in card format
 * - Color-coded status badges for different change types
 * - 3 core actions: View, Edit, Delete
 * - Quick restock for low/out of stock items
 * - Mobile-optimized with touch-friendly buttons
 */

// ===== Imports =====
import { computed } from 'vue'

// ===== Types & Interfaces =====
interface Props {
  productName: string
  productSku: string
  changeAmount: number
  changeType: 'restock' | 'sale' | 'adjustment' | 'correction' | 'damage' | 'transfer'
  currentStock: number
  reason?: string
  timestamp: string | Date
}

const props = defineProps<Props>()

// ===== Emits =====
const emit = defineEmits<{
  (e: 'view'): void
  (e: 'edit'): void
  (e: 'delete'): void
  (e: 'quickRestock'): void
}>()

// ===== Constants =====
const LOW_STOCK_THRESHOLD = 10

// ===== Computed Properties =====
const isLowStock = computed(() => 
  props.currentStock > 0 && props.currentStock <= LOW_STOCK_THRESHOLD
)

const isOutOfStock = computed(() => props.currentStock <= 0)

const changeStatusText = computed(() => {
  switch (props.changeType) {
    case 'restock': return 'Restocked'
    case 'sale': return 'Sale'
    case 'adjustment': return 'Adjusted'
    case 'correction': return 'Corrected'
    case 'damage': return 'Damaged'
    case 'transfer': return 'Transferred'
    default: return 'Changed'
  }
})

const changeStatusClass = computed(() => {
  if (props.changeAmount > 0) return 'bg-green-100 text-green-800'
  if (props.changeAmount < 0) return 'bg-red-100 text-red-800'
  return 'bg-orange-100 text-orange-800'
})

const changeDotClass = computed(() => {
  if (props.changeAmount > 0) return 'bg-green-500'
  if (props.changeAmount < 0) return 'bg-red-500'
  return 'bg-orange-500'
})

// ===== Helper Functions =====
function formatChangeAmount(amount: number): string {
  if (amount > 0) return `+${amount} units`
  if (amount < 0) return `${amount} units`
  return '±0 units'
}

function formatTimestamp(timestamp: string | Date): string {
  const d = new Date(timestamp)
  return d.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
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
</style>