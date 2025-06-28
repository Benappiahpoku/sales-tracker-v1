<!--
  StockCard.vue
  Stratonea/Sales Tracker - Modern stock card for mobile view
  - Card-based design matching dashboard and product card style
  - Color-coded change status (green=restock, red=removal, orange=correction)
  - Box icons and hover animations
  - Prominent change display with Ghana Cedis
  - Quick actions: View, Edit, Delete, Restock, Adjust buttons
  - Ghana-optimized: touch targets, offline support
  - Follows Stratonea guidelines
-->

<template>
  <!-- ===== [New Feature] START: Modern Stock Card ===== -->
  <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all duration-200 relative group">
    <!-- Change Status Badge -->
    <div class="absolute top-4 right-4">
      <span
        :class="[
          'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
          changeStatusClass
        ]"
      >
        <div 
          :class="[
            'w-2 h-2 rounded-full mr-1',
            changeDotClass
          ]"
        ></div>
        {{ changeStatusText }}
      </span>
    </div>

    <!-- Stock Icon -->
    <div class="flex items-center mb-4">
      <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
        <font-awesome-icon icon="box" class="text-primary-600 text-xl" />
      </div>
      <div class="ml-3 flex-1">
        <h3 class="font-semibold text-gray-900 text-base truncate">{{ productName }}</h3>
        <p class="text-sm text-gray-500">SKU: {{ productSku }}</p>
      </div>
    </div>

    <!-- Change Amount - Prominently Displayed -->
    <div class="mb-4">
      <p class="text-2xl font-bold text-primary-600">
        {{ formatChangeAmount(changeAmount) }}
      </p>
      <p class="text-sm text-gray-500">{{ changeType }} • {{ currentStock }} units</p>
    </div>

    <!-- Change Details and Timestamp -->
    <div class="mb-4">
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-600">Changed On</span>
        <span class="text-sm font-medium text-gray-900">{{ formatTimestamp(timestamp) }}</span>
      </div>
      <div class="flex items-center justify-between mt-1">
        <span class="text-sm text-gray-600">Reason</span>
        <span class="text-sm font-medium text-gray-900">{{ reason || 'Not specified' }}</span>
      </div>
    </div>

    <!-- Stock Level Warnings -->
    <div v-if="isLowStock" class="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
      <div class="flex items-center">
        <font-awesome-icon icon="exclamation-triangle" class="text-orange-600 mr-2" />
        <p class="text-sm text-orange-800 font-medium">Low stock - consider restocking</p>
      </div>
    </div>

    <div v-if="isOutOfStock" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
      <div class="flex items-center">
        <font-awesome-icon icon="exclamation-triangle" class="text-red-600 mr-2" />
        <p class="text-sm text-red-800 font-medium">Out of stock</p>
      </div>
    </div>

    <!-- Action Buttons -->
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
      
      <!-- Restock Button -->
      <button
        @click="emit('restock')"
        class="px-4 py-3 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors duration-200 min-h-[48px] flex items-center justify-center"
        aria-label="Restock Product"
      >
        <font-awesome-icon icon="plus" />
      </button>
      
      <!-- Adjust Button -->
      <button
        @click="emit('adjust')"
        class="px-4 py-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200 min-h-[48px] flex items-center justify-center"
        aria-label="Adjust Stock"
      >
        <font-awesome-icon icon="cog" />
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
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * StockCard.vue - Modern stock card component
 * - Displays stock change information in card format for mobile view
 * - Color-coded change status with visual indicators
 * - Hover animations and touch-friendly buttons
 * - Quick actions: View, Edit, Delete, Restock, Adjust
 * - Ghana-optimized: clear change display, offline support
 * - Emits: 'view', 'edit', 'delete', 'restock', 'adjust' for parent handling
 */

// ===== Imports =====
import { computed } from 'vue'

// ===== Types & Interfaces =====
/**
 * Props for StockCard component
 * - productName: Name of the product
 * - productSku: SKU of the product
 * - changeAmount: Amount of stock change (positive for add, negative for remove)
 * - changeType: Type of change (restock, sale, adjustment, etc.)
 * - currentStock: Current stock level after the change
 * - reason: Reason for the stock change
 * - timestamp: When the change was made
 */
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
/**
 * Events emitted by StockCard
 * - view: User wants to view stock details
 * - edit: User wants to edit this stock entry
 * - delete: User wants to delete this stock entry
 * - restock: User wants to restock this product
 * - adjust: User wants to adjust stock levels
 */
const emit = defineEmits<{
  (e: 'view'): void
  (e: 'edit'): void
  (e: 'delete'): void
  (e: 'restock'): void
  (e: 'adjust'): void
}>()

// ===== Constants =====
/**
 * Stock level threshold for determining low stock status
 */
const LOW_STOCK_THRESHOLD = 10

// ===== Computed Properties =====
/**
 * Determines if current stock is low
 */
const isLowStock = computed(() => 
  props.currentStock > 0 && props.currentStock <= LOW_STOCK_THRESHOLD
)

/**
 * Determines if product is out of stock
 */
const isOutOfStock = computed(() => props.currentStock <= 0)

/**
 * Change status text for badge
 */
const changeStatusText = computed(() => {
  switch (props.changeType) {
    case 'restock':
      return 'Restocked'
    case 'sale':
      return 'Sale'
    case 'adjustment':
      return 'Adjusted'
    case 'correction':
      return 'Corrected'
    case 'damage':
      return 'Damaged'
    case 'transfer':
      return 'Transferred'
    default:
      return 'Changed'
  }
})

/**
 * CSS classes for change status badge
 */
const changeStatusClass = computed(() => {
  if (props.changeAmount > 0) {
    // Positive changes (restock, returns)
    return 'bg-green-100 text-green-800'
  } else if (props.changeAmount < 0) {
    // Negative changes (sales, damage)
    return 'bg-red-100 text-red-800'
  } else {
    // No change (corrections)
    return 'bg-orange-100 text-orange-800'
  }
})

/**
 * CSS classes for change status dot
 */
const changeDotClass = computed(() => {
  if (props.changeAmount > 0) {
    return 'bg-green-500'
  } else if (props.changeAmount < 0) {
    return 'bg-red-500'
  } else {
    return 'bg-orange-500'
  }
})

// ===== Helper Functions =====
/**
 * Formats change amount with + or - prefix
 * @param amount - The change amount
 */
function formatChangeAmount(amount: number): string {
  if (amount > 0) {
    return `+${amount} units`
  } else if (amount < 0) {
    return `${amount} units`
  } else {
    return '±0 units'
  }
}

/**
 * Formats timestamp for display
 * @param timestamp - The timestamp to format
 */
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
/* ===== [New Feature] START: Modern Card Animations ===== */
/* Smooth transitions for all interactive elements */
.group {
  transition: all 0.2s ease-in-out;
}

/* Enhanced hover effects */
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
/* ===== [New Feature] END ===== */
</style>