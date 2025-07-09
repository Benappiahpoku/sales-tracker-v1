<!--
  StockList.vue
  Stratonea/Sales Tracker - Modern stock list with responsive table/card layout
  - Mobile: Modern card layout with StockCard components (3 buttons: View, Edit, Delete)
  - Desktop: Modern table layout with simplified action buttons
  - Consistent styling with dashboard and product list design
  - Ghana-optimized: touch targets, clear change display, offline support
  - All props, emits, and helpers documented for learning
  - Follows Stratonea guidelines
-->

<template>
  <div class="stock-list-container">
    <!-- ===== Mobile Card View ===== -->
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
          @quickRestock="onQuickRestock(stockEntry)"
        />
      </div>
    </div>

    <!-- ===== Desktop Table View ===== -->
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
                      <!-- Show stock warning indicators -->
                      <div class="flex items-center mt-1" v-if="stockEntry.currentStock <= 10">
                        <font-awesome-icon 
                          :icon="stockEntry.currentStock <= 0 ? 'exclamation-triangle' : 'exclamation-triangle'"
                          :class="stockEntry.currentStock <= 0 ? 'text-red-500' : 'text-orange-500'"
                          class="text-xs mr-1" 
                        />
                        <span :class="stockEntry.currentStock <= 0 ? 'text-red-600' : 'text-orange-600'" class="text-xs font-medium">
                          {{ stockEntry.currentStock <= 0 ? 'Out of stock' : 'Low stock' }}
                        </span>
                      </div>
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
                  </div>
                </td>

                <!-- Timestamp -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatTimestamp(stockEntry.timestamp) }}</div>
                </td>

                <!-- ===== Simplified Action Buttons (3 instead of 5) ===== -->
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
                      <font-awesome-icon icon="edit" class="mr-1" />
                      Edit
                    </button>

                    <!-- Delete Button -->
                    <button
                      @click="onDelete(stockEntry)"
                      class="inline-flex items-center px-3 py-2 border border-red-300 text-sm leading-4 font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150"
                      :aria-label="`Delete stock entry for ${stockEntry.productName}`"
                    >
                      <font-awesome-icon icon="trash" class="mr-1" />
                      Delete
                    </button>

                    <!-- Quick Restock Button (only for low/out of stock) -->
                    <button
                      v-if="stockEntry.currentStock <= 10"
                      @click="onQuickRestock(stockEntry)"
                      class="inline-flex items-center px-3 py-2 border border-green-300 text-sm leading-4 font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
                      :aria-label="`Quick restock ${stockEntry.productName}`"
                    >
                      <font-awesome-icon icon="plus" class="mr-1" />
                      Quick Restock
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
  </div>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * StockList.vue - Responsive stock list component (SIMPLIFIED)
 * - Mobile: Card-based layout using simplified StockCard components
 * - Desktop: Modern table layout with 3 core actions + optional quick restock
 * - Color-coded change status and stock level indicators
 * - Quick action buttons: View, Edit, Delete, Quick Restock (when needed)
 * - Ghana-optimized: clear change display, touch-friendly
 * - Emits events to parent for stock management
 */

// ===== Imports =====
import StockCard from '@/components/layout/StockCard.vue'

// ===== Types & Interfaces =====
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
 * Events emitted by StockList (SIMPLIFIED)
 * - view: User wants to view stock entry details
 * - edit: User wants to edit a stock entry
 * - delete: User wants to delete a stock entry
 * - quickRestock: User wants to quickly restock a low/out of stock product
 */
const emit = defineEmits<{
  (e: 'view', stockEntry: StockEntry): void
  (e: 'edit', stockEntry: StockEntry): void
  (e: 'delete', stockEntry: StockEntry): void
  (e: 'quickRestock', stockEntry: StockEntry): void
}>()

// ===== Event Handlers =====
function onView(stockEntry: StockEntry) {
  emit('view', stockEntry)
}

function onEdit(stockEntry: StockEntry) {
  emit('edit', stockEntry)
}

function onDelete(stockEntry: StockEntry) {
  emit('delete', stockEntry)
}

function onQuickRestock(stockEntry: StockEntry) {
  emit('quickRestock', stockEntry)
}

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

function getChangeTypeText(changeType: StockEntry['changeType']): string {
  switch (changeType) {
    case 'restock': return 'Restocked'
    case 'sale': return 'Sale'
    case 'adjustment': return 'Adjusted'
    case 'correction': return 'Corrected'
    case 'damage': return 'Damaged'
    case 'transfer': return 'Transferred'
    default: return 'Changed'
  }
}

function getChangeAmountClass(amount: number): string {
  if (amount > 0) return 'text-green-600'
  if (amount < 0) return 'text-red-600'
  return 'text-orange-600'
}

function getChangeTypeClass(changeType: StockEntry['changeType']): string {
  switch (changeType) {
    case 'restock': return 'bg-green-100 text-green-800'
    case 'sale': return 'bg-blue-100 text-blue-800'
    case 'adjustment':
    case 'correction': return 'bg-orange-100 text-orange-800'
    case 'damage':
    case 'transfer': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

function getChangeDotClass(amount: number): string {
  if (amount > 0) return 'bg-green-500'
  if (amount < 0) return 'bg-red-500'
  return 'bg-orange-500'
}
</script>

<style scoped>
/* ===== Modern Table Styling ===== */
tbody tr:hover {
  background-color: theme('colors.gray.50');
}

button {
  transition: all 0.15s ease-in-out;
}

button:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}

@media (max-width: 768px) {
  button:active {
    transform: scale(0.98);
  }
}

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
</style>