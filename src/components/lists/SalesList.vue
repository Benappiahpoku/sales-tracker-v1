<!--
  SalesList.vue
  Stratonea/Sales Tracker - Modern sales list with responsive table/card layout
  - Mobile: Modern card layout with SalesCard components
  - Desktop: Modern table layout with hover effects and color-coded payment status
  - Consistent styling with dashboard and product list design
  - Ghana-optimized: touch targets, clear pricing, offline support
  - All props, emits, and helpers documented for learning
  - Follows Stratonea guidelines
-->

<template>
  <div class="sales-list-container">
    <!-- ===== [New Feature] START: Mobile Card View ===== -->
    <!-- Mobile View: Card Layout -->
    <div class="block md:hidden">
      <div class="space-y-4 max-w-md mx-auto my-4">
        <SalesCard
          v-for="sale in sales"
          :key="sale.id"
          :customer-name="sale.customerName"
          :invoice-number="sale.invoiceNumber"
          :total-amount="sale.totalAmount"
          :item-count="sale.itemCount"
          :sale-date="sale.saleDate"
          :due-date="sale.dueDate"
          :payment-status="sale.paymentStatus"
          @view="onView(sale)"
          @edit="onEdit(sale)"
          @delete="onDelete(sale)"
          @download="onDownload(sale)"
        />
      </div>
    </div>
    <!-- ===== [New Feature] END ===== -->

    <!-- ===== [New Feature] START: Desktop Table View ===== -->
    <!-- Desktop View: Modern Table Layout -->
    <div class="hidden md:block">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <!-- Table Header -->
        <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Sales History</h3>
        </div>

        <!-- Table Content -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <!-- Table Headers -->
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <!-- Table Body -->
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="sale in sales"
                :key="sale.id"
                class="hover:bg-gray-50 transition-colors duration-150"
              >
                <!-- Customer Name with Icon -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                      <font-awesome-icon icon="receipt" class="text-primary-600" />
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ sale.customerName }}</div>
                    </div>
                  </div>
                </td>

                <!-- Invoice Number -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 font-mono">{{ sale.invoiceNumber }}</div>
                </td>

                <!-- Total Amount - Prominently Displayed -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold text-primary-600">
                    {{ formatCurrency(sale.totalAmount) }}
                  </div>
                </td>

                <!-- Item Count -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ sale.itemCount }} items</div>
                </td>

                <!-- Sale Date -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDate(sale.saleDate) }}</div>
                </td>

                <!-- Payment Status with Color-Coded Badge -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      getPaymentStatusClass(sale.paymentStatus)
                    ]"
                  >
                    <div 
                      :class="[
                        'w-2 h-2 rounded-full mr-1.5',
                        getPaymentDotClass(sale.paymentStatus)
                      ]"
                    ></div>
                    {{ getPaymentStatusText(sale.paymentStatus) }}
                  </span>
                </td>

                <!-- Action Buttons -->
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end gap-2">
                    <!-- View Button -->
                    <button
                      @click="onView(sale)"
                      class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150"
                      :aria-label="`View sale for ${sale.customerName}`"
                    >
                      <font-awesome-icon icon="eye" class="mr-1" />
                      View
                    </button>

                    <!-- Edit Button -->
                    <button
                      @click="onEdit(sale)"
                      class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150"
                      :aria-label="`Edit sale for ${sale.customerName}`"
                    >
                      Edit
                    </button>

                    <!-- Download Button -->
                    <button
                      @click="onDownload(sale)"
                      class="inline-flex items-center px-3 py-2 border border-green-300 text-sm leading-4 font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
                      :aria-label="`Download receipt for ${sale.customerName}`"
                    >
                      Download
                    </button>

                    <!-- Delete Button -->
                    <button
                      @click="onDelete(sale)"
                      class="inline-flex items-center px-3 py-2 border border-red-300 text-sm leading-4 font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150"
                      :aria-label="`Delete sale for ${sale.customerName}`"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="sales.length === 0" class="text-center py-12">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <font-awesome-icon icon="receipt" class="text-gray-400 text-2xl" />
          </div>
          <h3 class="text-sm font-medium text-gray-900 mb-2">No sales found</h3>
          <p class="text-sm text-gray-500">Start making sales to see them here.</p>
        </div>
      </div>
    </div>
    <!-- ===== [New Feature] END ===== -->
  </div>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * SalesList.vue - Responsive sales list component
 * - Mobile: Card-based layout using SalesCard components
 * - Desktop: Modern table layout with hover effects
 * - Color-coded payment status and status indicators
 * - Quick action buttons for View, Edit, Delete, Download
 * - Ghana-optimized: clear GHS pricing, touch-friendly
 * - Emits events to parent for sales management
 */

// ===== Imports =====
/**
 * Import the SalesCard component for mobile card layout
 * This component handles individual sale display on mobile devices
 */
import SalesCard from '@/components/layout/SalesCard.vue'

// ===== Types & Interfaces =====
/**
 * Sale interface defining the structure of sale data
 * - id: Unique identifier for the sale
 * - customerName: Name of the customer who made the purchase
 * - invoiceNumber: Unique invoice/receipt number
 * - totalAmount: Total amount of the sale in Ghana Cedis
 * - itemCount: Number of items in the sale
 * - saleDate: Date when the sale was made
 * - dueDate: Payment due date
 * - paymentStatus: Current payment status
 */
interface Sale {
  id: string
  customerName: string
  invoiceNumber: string
  totalAmount: number
  itemCount: number
  saleDate: string | Date
  dueDate: string | Date
  paymentStatus: 'paid' | 'pending' | 'overdue'
}

// ===== Props =====
/**
 * Component props
 * - sales: Array of sales to display
 */
withDefaults(
  defineProps<{
    sales: Sale[]
  }>(),
  {
    sales: () => []
  }
)

// ===== Emits =====
/**
 * Events emitted by SalesList
 * - view: User wants to view sale details
 * - edit: User wants to edit a sale
 * - delete: User wants to delete a sale
 * - download: User wants to download receipt/invoice
 */
const emit = defineEmits<{
  (e: 'view', sale: Sale): void
  (e: 'edit', sale: Sale): void
  (e: 'delete', sale: Sale): void
  (e: 'download', sale: Sale): void
}>()

// ===== Event Handlers =====
/**
 * Handle view sale action
 * Emits view event to parent component with sale data
 * @param sale - The sale to view
 */
function onView(sale: Sale) {
  emit('view', sale)
}

/**
 * Handle edit sale action
 * Emits edit event to parent component with sale data
 * @param sale - The sale to edit
 */
function onEdit(sale: Sale) {
  emit('edit', sale)
}

/**
 * Handle delete sale action
 * Emits delete event to parent component with sale data
 * @param sale - The sale to delete
 */
function onDelete(sale: Sale) {
  emit('delete', sale)
}

/**
 * Handle download receipt action
 * Emits download event to parent component with sale data
 * @param sale - The sale to download receipt for
 */
function onDownload(sale: Sale) {
  emit('download', sale)
}

// ===== Helper Functions =====
/**
 * Formats currency amount in Ghana Cedis format
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "GHS 25.50")
 */
function formatCurrency(amount: number): string {
  return `GHS ${amount.toFixed(2)}`
}

/**
 * Formats date for display
 * @param date - The date to format
 * @returns Formatted date string (DD/MM/YYYY)
 */
function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

/**
 * Gets payment status text based on status
 * @param status - Current payment status
 * @returns Payment status text
 */
function getPaymentStatusText(status: Sale['paymentStatus']): string {
  switch (status) {
    case 'paid':
      return 'Paid'
    case 'pending':
      return 'Pending'
    case 'overdue':
      return 'Overdue'
    default:
      return 'Unknown'
  }
}

/**
 * Gets CSS classes for payment status badge
 * @param status - Current payment status
 * @returns CSS classes for badge styling
 */
function getPaymentStatusClass(status: Sale['paymentStatus']): string {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-orange-100 text-orange-800'
    case 'overdue':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

/**
 * Gets CSS classes for payment status dot
 * @param status - Current payment status
 * @returns CSS classes for dot color
 */
function getPaymentDotClass(status: Sale['paymentStatus']): string {
  switch (status) {
    case 'paid':
      return 'bg-green-500'
    case 'pending':
      return 'bg-orange-500'
    case 'overdue':
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
}
</script>

<style scoped>
/* ===== [New Feature] START: Modern Table Styling ===== */
/* Enhanced table row hover effects */
tbody tr:hover {
  background-color: theme('colors.gray.50');
}

/* Smooth transitions for all interactive elements */
button {
  transition: all 0.15s ease-in-out;
}

/* Enhanced focus states for accessibility */
button:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}

/* Touch feedback for mobile users */
@media (max-width: 768px) {
  button:active {
    transform: scale(0.98);
  }
}

/* Table responsiveness */
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: theme('colors.gray.400') theme('colors.gray.100');
}

.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: theme('colors.gray.100');
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: theme('colors.gray.400');
  border-radius: 3px;
}
/* ===== [New Feature] END ===== */
</style>