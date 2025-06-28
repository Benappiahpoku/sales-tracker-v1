<!--
  StockList.vue
  Stratonea/Sales Tracker - Modern stock list with responsive table/card layout
  - Mobile: Modern card layout with StockCard components
  - Desktop: Modern table layout with hover effects and color-coded change status
  - Consistent styling with dashboard and product list design
  - Ghana-optimized: touch targets, clear change display, offline support
  - All props, emits, and helpers documented for learning
  - Follows Stratonea guidelines
-->

<template>
  <div class="stock-list-container">
    <!-- ===== [New Feature] START: Mobile Card View ===== -->
    <!-- Mobile View: Card Layout -->
    <div class="block md:hidden">
      <div class="space-y-4 max-w-md mx-auto my-4">
        <StockCard
          v-for="stockEntry in stockEntries"
          :key="stockEntry.id"
          :product-name="stockEntry.productName"
          :product-sku="stockEntry.productSku"
          :change-amount="stockEntry.changeAmount"
          :change-type="stockEntry.changeType"
          :current-stock="stockEntry.currentStock"
          :reason="stockEntry.reason || 'Not specified'"
          :timestamp="stockEntry.timestamp"
          @view="onView(stockEntry)"
          @edit="onEdit(stockEntry)"
          @delete="onDelete(stockEntry)"
          @restock="onRestock(stockEntry)"
          @adjust="onAdjust(stockEntry)"
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
          <h3 class="text-lg font-semibold text-gray-900">Stock Movement History</h3>
        </div>

        <!-- Table Content -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <!-- Table Headers -->
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date/Time
                </th>
                <th class="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <!-- Table Body -->
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="stockEntry in stockEntries"
                :key="stockEntry.id"
                class="hover:bg-gray-50 transition-colors duration-150"
              >
                <!-- Product Name with Icon -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                      <font-awesome-icon icon="box" class="text-primary-600" />
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ stockEntry.productName }}</div>
                    </div>
                  </div>
                </td>

                <!-- Product SKU -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 font-mono">{{ stockEntry.productSku }}</div>
                </td>

                <!-- Change Amount - Prominently Displayed -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div 
                    :class="[
                      'text-sm font-semibold',
                      getChangeAmountClass(stockEntry.changeAmount)
                    ]"
                  >
                    {{ formatChangeAmount(stockEntry.changeAmount) }}
                  </div>
                </td>

                <!-- Change Type -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      getChangeTypeClass(stockEntry.changeType)
                    ]"
                  >
                    <div 
                      :class="[
                        'w-2 h-2 rounded-full mr-1.5',
                        getChangeDotClass(stockEntry.changeAmount)
                      ]"
                    ></div>
                    {{ getChangeTypeText(stockEntry.changeType) }}
                  </span>
                </td>

                <!-- Current Stock with Warning -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <span class="text-sm text-gray-900 mr-2">{{ stockEntry.currentStock }} units</span>
                    <font-awesome-icon 
                      v-if="stockEntry.currentStock <= 0"
                      icon="exclamation-triangle" 
                      class="text-red-500 text-xs" 
                      title="Out of stock"
                    />
                    <font-awesome-icon 
                      v-else-if="stockEntry.currentStock <= 10"
                      icon="exclamation-triangle" 
                      class="text-orange-500 text-xs" 
                      title="Low stock"
                    />
                  </div>
                </td>

                <!-- Timestamp -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatTimestamp(stockEntry.timestamp) }}</div>
                </td>

                <!-- Action Buttons -->
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end gap-2">
                    <!-- View Button -->
                    <button
                      @click="onView(stockEntry)"
                      class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150"
                      :aria-label="`View stock entry for ${stockEntry.productName}`"
                    >
                      <font-awesome-icon icon="eye" class="mr-1" />
                      View
                    </button>

                    <!-- Edit Button -->
                    <button
                      @click="onEdit(stockEntry)"
                      class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150"
                      :aria-label="`Edit stock entry for ${stockEntry.productName}`"
                    >
                      Edit
                    </button>

                    <!-- Restock Button -->
                    <button
                      @click="onRestock(stockEntry)"
                      class="inline-flex items-center px-3 py-2 border border-green-300 text-sm leading-4 font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
                      :aria-label="`Restock ${stockEntry.productName}`"
                    >
                      Restock
                    </button>

                    <!-- Adjust Button -->
                    <button
                      @click="onAdjust(stockEntry)"
                      class="inline-flex items-center px-3 py-2 border border-blue-300 text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                      :aria-label="`Adjust stock for ${stockEntry.productName}`"
                    >
                      Adjust
                    </button>

                    <!-- Delete Button -->
                    <button
                      @click="onDelete(stockEntry)"
                      class="inline-flex items-center px-3 py-2 border border-red-300 text-sm leading-4 font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150"
                      :aria-label="`Delete stock entry for ${stockEntry.productName}`"
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
        <div v-if="stockEntries.length === 0" class="text-center py-12">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <font-awesome-icon icon="box" class="text-gray-400 text-2xl" />
          </div>
          <h3 class="text-sm font-medium text-gray-900 mb-2">No stock movements found</h3>
          <p class="text-sm text-gray-500">Stock changes will appear here as they happen.</p>
        </div>
      </div>
    </div>
    <!-- ===== [New Feature] END ===== -->
  </div>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * StockList.vue - Responsive stock list component
 * - Mobile: Card-based layout using StockCard components
 * - Desktop: Modern table layout with hover effects
 * - Color-coded change status and stock level indicators
 * - Quick action buttons for View, Edit, Delete, Restock, Adjust
 * - Ghana-optimized: clear change display, touch-friendly
 * - Emits events to parent for stock management
 */

// ===== Imports =====
/**
 * Import the StockCard component for mobile card layout
 * This component handles individual stock entry display on mobile devices
 */
import StockCard from '@/components/layout/StockCard.vue'

// ===== Types & Interfaces =====
/**
 * StockEntry interface defining the structure of stock movement data
 * - id: Unique identifier for the stock entry
 * - productName: Name of the product
 * - productSku: SKU of the product
 * - changeAmount: Amount of stock change (positive for add, negative for remove)
 * - changeType: Type of change (restock, sale, adjustment, etc.)
 * - currentStock: Current stock level after the change
 * - reason: Reason for the stock change (optional)
 * - timestamp: When the change was made
 * - productPrice: Price per unit (optional, for calculations)
 */
interface StockEntry {
  id: string
  productName: string
  productSku: string
  changeAmount: number
  changeType: 'restock' | 'sale' | 'adjustment' | 'correction' | 'damage' | 'transfer'
  currentStock: number
  reason?: string
  timestamp: string | Date
  productPrice?: number
}

// ===== Props =====
/**
 * Component props
 * - stockEntries: Array of stock entries to display
 */
 withDefaults(
  defineProps<{
    stockEntries: StockEntry[]
  }>(),
  {
    stockEntries: () => []
  }
)

// ===== Emits =====
/**
 * Events emitted by StockList
 * - view: User wants to view stock entry details
 * - edit: User wants to edit a stock entry
 * - delete: User wants to delete a stock entry
 * - restock: User wants to restock a product
 * - adjust: User wants to adjust stock levels
 */
const emit = defineEmits<{
  (e: 'view', stockEntry: StockEntry): void
  (e: 'edit', stockEntry: StockEntry): void
  (e: 'delete', stockEntry: StockEntry): void
  (e: 'restock', stockEntry: StockEntry): void
  (e: 'adjust', stockEntry: StockEntry): void
}>()

// ===== Event Handlers =====
/**
 * Handle view stock entry action
 * Emits view event to parent component with stock entry data
 * @param stockEntry - The stock entry to view
 */
function onView(stockEntry: StockEntry) {
  emit('view', stockEntry)
}

/**
 * Handle edit stock entry action
 * Emits edit event to parent component with stock entry data
 * @param stockEntry - The stock entry to edit
 */
function onEdit(stockEntry: StockEntry) {
  emit('edit', stockEntry)
}

/**
 * Handle delete stock entry action
 * Emits delete event to parent component with stock entry data
 * @param stockEntry - The stock entry to delete
 */
function onDelete(stockEntry: StockEntry) {
  emit('delete', stockEntry)
}

/**
 * Handle restock product action
 * Emits restock event to parent component with stock entry data
 * @param stockEntry - The stock entry to restock
 */
function onRestock(stockEntry: StockEntry) {
  emit('restock', stockEntry)
}

/**
 * Handle adjust stock action
 * Emits adjust event to parent component with stock entry data
 * @param stockEntry - The stock entry to adjust
 */
function onAdjust(stockEntry: StockEntry) {
  emit('adjust', stockEntry)
}

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

/**
 * Gets change type text based on type
 * @param changeType - Current change type
 * @returns Change type text
 */
function getChangeTypeText(changeType: StockEntry['changeType']): string {
  switch (changeType) {
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
}

/**
 * Gets CSS classes for change amount display
 * @param amount - The change amount
 * @returns CSS classes for amount styling
 */
function getChangeAmountClass(amount: number): string {
  if (amount > 0) {
    return 'text-green-600'
  } else if (amount < 0) {
    return 'text-red-600'
  } else {
    return 'text-orange-600'
  }
}

/**
 * Gets CSS classes for change type badge
 * @param changeType - Current change type
 * @returns CSS classes for badge styling
 */
function getChangeTypeClass(changeType: StockEntry['changeType']): string {
  switch (changeType) {
    case 'restock':
      return 'bg-green-100 text-green-800'
    case 'sale':
      return 'bg-blue-100 text-blue-800'
    case 'adjustment':
    case 'correction':
      return 'bg-orange-100 text-orange-800'
    case 'damage':
    case 'transfer':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

/**
 * Gets CSS classes for change status dot
 * @param amount - The change amount
 * @returns CSS classes for dot color
 */
function getChangeDotClass(amount: number): string {
  if (amount > 0) {
    return 'bg-green-500'
  } else if (amount < 0) {
    return 'bg-red-500'
  } else {
    return 'bg-orange-500'
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