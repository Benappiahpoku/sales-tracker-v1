<!--
  SalesCard.vue
  Stratonea/Sales Tracker - Modern sales card for mobile view
  - Card-based design matching dashboard and product card style
  - Color-coded payment status (green=paid, orange=pending, red=overdue)
  - Receipt/money icons and hover animations
  - Prominent pricing display with Ghana Cedis
  - Quick actions: View, Edit, Delete, Download buttons
  - Ghana-optimized: touch targets, offline support
  - Follows Stratonea guidelines
-->

<template>
  <!-- ===== [New Feature] START: Modern Sales Card ===== -->
  <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all duration-200 relative group">
    <!-- Payment Status Badge -->
    <div class="absolute top-4 right-4">
      <span
        :class="[
          'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
          paymentStatusClass
        ]"
      >
        <div 
          :class="[
            'w-2 h-2 rounded-full mr-1',
            paymentDotClass
          ]"
        ></div>
        {{ paymentStatusText }}
      </span>
    </div>

    <!-- Sale Icon -->
    <div class="flex items-center mb-4">
      <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
        <font-awesome-icon icon="receipt" class="text-primary-600 text-xl" />
      </div>
      <div class="ml-3 flex-1">
        <h3 class="font-semibold text-gray-900 text-base truncate">{{ customerName }}</h3>
        <p class="text-sm text-gray-500">Invoice: {{ invoiceNumber }}</p>
      </div>
    </div>

    <!-- Total Amount - Prominently Displayed -->
    <div class="mb-4">
      <p class="text-2xl font-bold text-primary-600">
        {{ formatCurrency(totalAmount) }}
      </p>
      <p class="text-sm text-gray-500">{{ itemCount }} items</p>
    </div>

    <!-- Sale Date and Time -->
    <div class="mb-4">
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-600">Sale Date</span>
        <span class="text-sm font-medium text-gray-900">{{ formatDate(saleDate) }}</span>
      </div>
      <div class="flex items-center justify-between mt-1">
        <span class="text-sm text-gray-600">Payment Due</span>
        <span class="text-sm font-medium text-gray-900">{{ formatDate(dueDate) }}</span>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-2 mt-4">
      <!-- View Button -->
      <button
        @click="emit('view')"
        class="flex-1 bg-primary text-white px-4 py-3 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200 min-h-[48px] flex items-center justify-center"
        aria-label="View Sale Details"
      >
        <font-awesome-icon icon="eye" class="mr-2" />
        View
      </button>
      
      <!-- Edit Button -->
      <button
        @click="emit('edit')"
        class="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 min-h-[48px] flex items-center justify-center"
        aria-label="Edit Sale"
      >
        <font-awesome-icon icon="edit" />
      </button>
      
      <!-- Download Button -->
      <button
        @click="emit('download')"
        class="px-4 py-3 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors duration-200 min-h-[48px] flex items-center justify-center"
        aria-label="Download Receipt"
      >
        <font-awesome-icon icon="download" />
      </button>
      
      <!-- Delete Button -->
      <button
        @click="emit('delete')"
        class="px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200 min-h-[48px] flex items-center justify-center"
        aria-label="Delete Sale"
      >
        <font-awesome-icon icon="trash" />
      </button>
    </div>

    <!-- Payment Status Warning -->
    <div v-if="isOverdue" class="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
      <div class="flex items-center">
        <font-awesome-icon icon="exclamation-triangle" class="text-red-600 mr-2" />
        <p class="text-sm text-red-800 font-medium">Payment overdue - {{ overdueDays }} days</p>
      </div>
    </div>

    <!-- Pending Payment Notice -->
    <div v-if="isPending" class="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
      <div class="flex items-center">
        <font-awesome-icon icon="clock" class="text-orange-600 mr-2" />
        <p class="text-sm text-orange-800 font-medium">Payment pending - due in {{ daysUntilDue }} days</p>
      </div>
    </div>
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * SalesCard.vue - Modern sales card component
 * - Displays sale information in card format for mobile view
 * - Color-coded payment status with visual indicators
 * - Hover animations and touch-friendly buttons
 * - Quick actions: View, Edit, Delete, Download
 * - Ghana-optimized: clear pricing in GHS, offline support
 * - Emits: 'view', 'edit', 'delete', 'download' for parent handling
 */

// ===== Imports =====
import { computed } from 'vue'

// ===== Types & Interfaces =====
/**
 * Props for SalesCard component
 * - customerName: Name of the customer who made the purchase
 * - invoiceNumber: Unique invoice/receipt number
 * - totalAmount: Total amount of the sale in Ghana Cedis
 * - itemCount: Number of items in the sale
 * - saleDate: Date when the sale was made
 * - dueDate: Payment due date
 * - paymentStatus: Current payment status
 */
interface Props {
  customerName: string
  invoiceNumber: string
  totalAmount: number
  itemCount: number
  saleDate: string | Date
  dueDate: string | Date
  paymentStatus: 'paid' | 'pending' | 'overdue'
}

const props = defineProps<Props>()

// ===== Emits =====
/**
 * Events emitted by SalesCard
 * - view: User wants to view sale details
 * - edit: User wants to edit this sale
 * - delete: User wants to delete this sale
 * - download: User wants to download receipt/invoice
 */
const emit = defineEmits<{
  (e: 'view'): void
  (e: 'edit'): void
  (e: 'delete'): void
  (e: 'download'): void
}>()

// ===== Computed Properties =====
/**
 * Determines if payment is overdue
 */
const isOverdue = computed(() => props.paymentStatus === 'overdue')

/**
 * Determines if payment is pending
 */
const isPending = computed(() => props.paymentStatus === 'pending')

/**
 * Calculate days until payment is due
 */
const daysUntilDue = computed(() => {
  const today = new Date()
  const due = new Date(props.dueDate)
  const diffTime = due.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
})

/**
 * Calculate days overdue
 */
const overdueDays = computed(() => {
  const today = new Date()
  const due = new Date(props.dueDate)
  const diffTime = today.getTime() - due.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
})

/**
 * Payment status text for badge
 */
const paymentStatusText = computed(() => {
  switch (props.paymentStatus) {
    case 'paid':
      return 'Paid'
    case 'pending':
      return 'Pending'
    case 'overdue':
      return 'Overdue'
    default:
      return 'Unknown'
  }
})

/**
 * CSS classes for payment status badge
 */
const paymentStatusClass = computed(() => {
  switch (props.paymentStatus) {
    case 'paid':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-orange-100 text-orange-800'
    case 'overdue':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
})

/**
 * CSS classes for payment status dot
 */
const paymentDotClass = computed(() => {
  switch (props.paymentStatus) {
    case 'paid':
      return 'bg-green-500'
    case 'pending':
      return 'bg-orange-500'
    case 'overdue':
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
})

// ===== Helper Functions =====
/**
 * Formats currency amount in Ghana Cedis format
 * @param amount - The amount to format
 */
function formatCurrency(amount: number): string {
  return `GHS ${amount.toFixed(2)}`
}

/**
 * Formats date for display
 * @param date - The date to format
 */
function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
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