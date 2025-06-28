<!--
  StockView.vue
  Stratonea/Sales Tracker - Stock management page
  - Modern card-based design matching dashboard and products style
  - Mobile-first responsive layout with floating action button
  - Handles stock CRUD operations and inventory adjustments
  - Ghana-optimized: touch targets, clear stock displays, offline support
  - All TypeScript interfaces properly defined for learning
  - Follows Stratonea guidelines
-->

<template>
  <div class="stock-page">
    <!-- ===== Page Header ===== -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Stock Management</h1>
        <p class="text-gray-600 mt-1">Track and manage your <br> inventory movements</p>
      </div>
      
      <!-- Add Stock Entry Button -->
      <button
        @click="showAddForm"
        class="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200 min-h-[48px] flex items-center gap-2"
        aria-label="Add New Stock Entry"
      >
        <font-awesome-icon icon="plus" />
        <span class="hidden sm:inline">Add Entry</span>
      </button>
    </div>

    <!-- ===== [New Feature] START: Quick Stats Header ===== -->
    <!-- Quick Stats - matches dashboard card style -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <!-- Total Stock Value -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <font-awesome-icon icon="warehouse" class="text-blue-600 text-sm" />
          </div>
          <div>
            <p class="text-sm text-gray-600">Total Stock Value</p>
            <p class="text-lg font-semibold text-gray-900">{{ formatCurrency(totalStockValue) }}</p>
          </div>
        </div>
      </div>

      <!-- Low Stock Items -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
            <font-awesome-icon icon="exclamation-triangle" class="text-orange-600 text-sm" />
          </div>
          <div>
            <p class="text-sm text-gray-600">Low Stock</p>
            <p class="text-lg font-semibold text-gray-900">{{ lowStockCount }}</p>
          </div>
        </div>
      </div>

      <!-- Out of Stock Items -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
            <font-awesome-icon icon="exclamation-triangle" class="text-red-600 text-sm" />
          </div>
          <div>
            <p class="text-sm text-gray-600">Out of Stock</p>
            <p class="text-lg font-semibold text-gray-900">{{ outOfStockCount }}</p>
          </div>
        </div>
      </div>

      <!-- Recent Changes -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
            <font-awesome-icon icon="chart-line" class="text-green-600 text-sm" />
          </div>
          <div>
            <p class="text-sm text-gray-600">Today's Changes</p>
            <p class="text-lg font-semibold text-gray-900">{{ todaysChangesCount }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- ===== [New Feature] END ===== -->

    <!-- Stock List - passes stock entries with proper typing -->
    <StockList 
      v-if="!showForm" 
      :stock-entries="stockEntries" 
      @view="onView" 
      @edit="onEdit" 
      @delete="onDelete" 
      @restock="onRestock"
      @adjust="onAdjust"
    />

    <!-- Stock Form (Add/Edit) - Placeholder for future implementation -->
    <div v-if="showForm" class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">
        {{ isEditing ? 'Edit Stock Entry' : 'New Stock Entry' }}
      </h2>
      <p class="text-gray-600">Stock entry form will be implemented here.</p>
      <div class="flex gap-2 mt-4">
        <button
          @click="onCancel"
          class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          @click="onSave"
          class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors duration-200"
        >
          Save
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="stockEntries.length === 0 && !showForm" class="text-center py-12">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <font-awesome-icon icon="box" class="text-gray-400 text-2xl" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No stock movements yet</h3>
      <p class="text-gray-500 mb-6">Start by recording your first stock change</p>
      <button
        @click="showAddForm"
        class="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200"
      >
        Record Your First Stock Change
      </button>
    </div>

    <!-- ===== [New Feature] START: Floating Action Button ===== -->
    <!-- Floating Action Button for mobile users -->
    <button
      @click="showAddForm"
      class="fixed bottom-6 right-6 bg-primary text-white w-14 h-14 rounded-full shadow-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 flex items-center justify-center md:hidden"
      aria-label="Add Stock Entry"
    >
      <font-awesome-icon icon="plus" class="text-xl" />
    </button>
    <!-- ===== [New Feature] END ===== -->
  </div>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * StockView.vue - Main stock management page
 * - Displays stock list with modern card/table layout
 * - Shows quick stats matching dashboard design
 * - Handles stock CRUD operations and inventory adjustments
 * - Manages form state for adding/editing stock entries
 * - Ghana-optimized: clear stock displays, offline support
 * - Proper TypeScript interfaces for all stock data
 * - Emits events for parent components to handle data persistence
 */

// ===== Imports =====
import { ref, computed } from 'vue'
import StockList from '@/components/lists/StockList.vue'

// ===== Types & Interfaces =====
/**
 * StockEntry interface matching StockList component interface
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
  productPrice?: number // ===== [Fix] Made optional to match StockList interface =====
}

// ===== State Management =====
/**
 * Stock entries array with mock data for demonstration
 * Each entry includes all required fields for proper TypeScript compliance
 */
const stockEntries = ref<StockEntry[]>([
  {
    id: '1',
    productName: 'Rice 25kg',
    productSku: 'RICE-25KG-001',
    changeAmount: +50,
    changeType: 'restock',
    currentStock: 95,
    productPrice: 85.00,
    reason: 'Weekly restock from supplier',
    timestamp: '2024-01-15T10:30:00'
  },
  {
    id: '2',
    productName: 'Cooking Oil 5L',
    productSku: 'OIL-5L-002',
    changeAmount: -3,
    changeType: 'sale',
    currentStock: 20,
    productPrice: 32.50,
    reason: 'Customer purchase',
    timestamp: '2024-01-15T14:20:00'
  },
  {
    id: '3',
    productName: 'Sugar 2kg',
    productSku: 'SUGAR-2KG-003',
    changeAmount: -2,
    changeType: 'damage',
    currentStock: 3,
    productPrice: 12.00,
    reason: 'Package damaged during transport',
    timestamp: '2024-01-14T16:45:00'
  },
  {
    id: '4',
    productName: 'Flour 10kg',
    productSku: 'FLOUR-10KG-004',
    changeAmount: +25,
    changeType: 'restock',
    currentStock: 25,
    productPrice: 65.00,
    reason: 'Emergency restock - was out of stock',
    timestamp: '2024-01-14T09:15:00'
  }
])

/**
 * Form state management
 * - showForm: Controls visibility of add/edit form
 * - selectedStockEntry: Currently selected stock entry for editing
 * - isEditing: Determines if form is in edit mode or add mode
 */
const showForm = ref(false)
const selectedStockEntry = ref<StockEntry | null>(null)
const isEditing = computed(() => selectedStockEntry.value !== null)

// ===== Constants =====
/**
 * Stock level threshold for determining low stock status
 */
const LOW_STOCK_THRESHOLD = 10

// ===== Computed Properties for Quick Stats =====
/**
 * Calculate total stock value across all products
 * Only includes entries that have productPrice defined
 */
const totalStockValue = computed(() => {
  // Get unique products and their current stock levels
  const uniqueProducts = new Map<string, { stock: number; price: number }>()
  
  stockEntries.value.forEach(entry => {
    // ===== [Fix] Handle optional productPrice =====
    if (entry.productPrice !== undefined) {
      uniqueProducts.set(entry.productSku, {
        stock: entry.currentStock,
        price: entry.productPrice
      })
    }
  })
  
  return Array.from(uniqueProducts.values())
    .reduce((total, product) => total + (product.stock * product.price), 0)
})

/**
 * Count products with low stock levels
 */
const lowStockCount = computed(() => {
  const uniqueProducts = new Map<string, number>()
  stockEntries.value.forEach(entry => {
    uniqueProducts.set(entry.productSku, entry.currentStock)
  })
  
  return Array.from(uniqueProducts.values())
    .filter(stock => stock > 0 && stock <= LOW_STOCK_THRESHOLD).length
})

/**
 * Count products that are out of stock
 */
const outOfStockCount = computed(() => {
  const uniqueProducts = new Map<string, number>()
  stockEntries.value.forEach(entry => {
    uniqueProducts.set(entry.productSku, entry.currentStock)
  })
  
  return Array.from(uniqueProducts.values())
    .filter(stock => stock <= 0).length
})

/**
 * Count today's stock changes
 */
const todaysChangesCount = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return stockEntries.value.filter(entry => {
    const entryDate = new Date(entry.timestamp).toISOString().split('T')[0]
    return entryDate === today
  }).length
})

// ===== Helper Functions =====
/**
 * Formats currency amount in Ghana Cedis format
 * @param amount - The amount to format
 */
function formatCurrency(amount: number): string {
  return `GHS ${amount.toFixed(2)}`
}

// ===== Event Handlers =====
/**
 * Shows the add stock entry form
 * Resets selected stock entry and shows form
 */
function showAddForm() {
  selectedStockEntry.value = null
  showForm.value = true
}

/**
 * Handles view stock entry action
 * In a real app, this would show stock entry details
 * @param stockEntry - The stock entry to view
 */
function onView(stockEntry: StockEntry) {
  alert(`Viewing stock entry for ${stockEntry.productName}\nChange: ${stockEntry.changeAmount > 0 ? '+' : ''}${stockEntry.changeAmount} units\nCurrent Stock: ${stockEntry.currentStock} units\nReason: ${stockEntry.reason || 'Not specified'}`)
}

/**
 * Handles edit stock entry action
 * Sets selected stock entry and shows form in edit mode
 * @param stockEntry - The stock entry to edit
 */
function onEdit(stockEntry: StockEntry) {
  selectedStockEntry.value = { ...stockEntry }
  showForm.value = true
}

/**
 * Handles delete stock entry action
 * Shows confirmation dialog and removes stock entry if confirmed
 * @param stockEntry - The stock entry to delete
 */
function onDelete(stockEntry: StockEntry) {
  if (confirm(`Are you sure you want to delete this stock entry for "${stockEntry.productName}"?\nChange: ${stockEntry.changeAmount > 0 ? '+' : ''}${stockEntry.changeAmount} units`)) {
    const index = stockEntries.value.findIndex(s => s.id === stockEntry.id)
    if (index !== -1) {
      stockEntries.value.splice(index, 1)
    }
  }
}

/**
 * Handles restock product action
 * In a real app, this would open a restock form
 * @param stockEntry - The stock entry to restock
 */
function onRestock(stockEntry: StockEntry) {
  const amount = prompt(`How many units of "${stockEntry.productName}" would you like to restock?`, '10')
  if (amount && !isNaN(Number(amount))) {
    // TODO: Implement actual restock functionality
    alert(`Restocking ${amount} units of ${stockEntry.productName}. This will be implemented in the stock form.`)
  }
}

/**
 * Handles adjust stock action
 * In a real app, this would open a stock adjustment form
 * @param stockEntry - The stock entry to adjust
 */
function onAdjust(stockEntry: StockEntry) {
  const newStock = prompt(`Current stock: ${stockEntry.currentStock} units.\nWhat should the new stock level be for "${stockEntry.productName}"?`, stockEntry.currentStock.toString())
  if (newStock && !isNaN(Number(newStock))) {
    // TODO: Implement actual stock adjustment functionality
    alert(`Adjusting stock of ${stockEntry.productName} to ${newStock} units. This will be implemented in the stock form.`)
  }
}

/**
 * Handles save stock entry action from form
 * Creates new stock entry or updates existing based on editing state
 */
function onSave() {
  // TODO: Implement save logic when StockForm is created
  alert('Save functionality will be implemented when the StockForm component is created.')
  showForm.value = false
  selectedStockEntry.value = null
}

/**
 * Handles cancel form action
 * Hides form and resets selected stock entry
 */
function onCancel() {
  showForm.value = false
  selectedStockEntry.value = null
}
</script>

<style scoped>
/* ===== Modern Page Styling ===== */
.stock-page {
  max-width: 7xl;
  margin: 0 auto;
  padding: 1.5rem;
  position: relative; /* For floating action button positioning */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .stock-page {
    padding: 1rem;
    padding-bottom: 5rem; /* Extra space for floating button */
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

/* Floating action button animation */
.fixed.bottom-6.right-6 {
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>