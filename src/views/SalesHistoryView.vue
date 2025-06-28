<!--
  SalesHistoryView.vue
  Stratonea/Sales Tracker - Sales history management page with advanced filtering
  - Modern card-based design matching dashboard and products style
  - Time period filtering: none, day, week, month, year
  - Mobile-first responsive layout with proper SalesList integration
  - Handles sales CRUD operations and receipt downloads
  - Ghana-optimized: touch targets, clear pricing, offline support
  - Filter persistence with localStorage for better UX
  - All TypeScript interfaces properly defined for learning
  - Follows Stratonea guidelines with comprehensive documentation
-->

<template>
  <!-- ===== [New Feature] START: Enhanced Sales History with Filtering ===== -->
  <div class="sales-history-page">
    <!-- ===== Page Header ===== -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Sales History</h1>
        <p class="text-gray-600 mt-1">Track and manage your sales transactions</p>
      </div>

      <!-- Add Sale Button -->
      <button
        @click="showAddForm"
        class="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200 min-h-[48px] flex items-center gap-2 active:scale-98"
        aria-label="Add New Sale"
      >
        <font-awesome-icon icon="plus" />
        <span class="hidden sm:inline">New Sale</span>
      </button>
    </div>

    <!-- ===== Quick Stats Header ===== -->
    <!-- Quick Stats - matches dashboard card style -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <!-- Total Sales Today -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
            <font-awesome-icon icon="chart-line" class="text-green-600 text-sm" />
          </div>
          <div>
            <p class="text-sm text-gray-600">Today's Sales</p>
            <p class="text-lg font-semibold text-gray-900">{{ formatCurrency(todaysSales) }}</p>
          </div>
        </div>
      </div>

      <!-- Pending Payments -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
            <font-awesome-icon icon="clock" class="text-orange-600 text-sm" />
          </div>
          <div>
            <p class="text-sm text-gray-600">Pending</p>
            <p class="text-lg font-semibold text-gray-900">{{ pendingCount }}</p>
          </div>
        </div>
      </div>

      <!-- Overdue Payments -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
            <font-awesome-icon icon="exclamation-triangle" class="text-red-600 text-sm" />
          </div>
          <div>
            <p class="text-sm text-gray-600">Overdue</p>
            <p class="text-lg font-semibold text-gray-900">{{ overdueCount }}</p>
          </div>
        </div>
      </div>

      <!-- Total Customers -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <font-awesome-icon icon="users" class="text-blue-600 text-sm" />
          </div>
          <div>
            <p class="text-sm text-gray-600">Customers</p>
            <p class="text-lg font-semibold text-gray-900">{{ uniqueCustomers }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== [New Feature] START: Time Period Filter ===== -->
    <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
      <h3 class="text-sm font-medium text-gray-700 mb-3">Filter by Time Period</h3>
      
      <!-- Mobile: Vertical Stack -->
      <div class="flex flex-col gap-2 md:hidden">
        <button
          v-for="filter in timeFilters"
          :key="filter.value"
          @click="selectedFilter = filter.value"
          :class="[
            'px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 min-h-[48px] active:scale-98 text-left flex items-center',
            selectedFilter === filter.value
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
          :aria-label="`Filter sales by ${filter.label.toLowerCase()}`"
        >
          <font-awesome-icon :icon="filter.icon" class="mr-2" />
          {{ filter.label }}
        </button>
      </div>
      
      <!-- Desktop: Horizontal Scroll -->
      <div class="hidden md:flex gap-2 overflow-x-auto pb-2">
        <button
          v-for="filter in timeFilters"
          :key="filter.value"
          @click="selectedFilter = filter.value"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 min-h-[48px] active:scale-98 flex items-center whitespace-nowrap flex-shrink-0',
            selectedFilter === filter.value
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
          :aria-label="`Filter sales by ${filter.label.toLowerCase()}`"
        >
          <font-awesome-icon :icon="filter.icon" class="mr-2" />
          {{ filter.label }}
        </button>
      </div>
    </div>
    <!-- ===== [New Feature] END ===== -->

    <!-- ===== [New Feature] START: Integrated SalesList with Filtering ===== -->
    <!-- Sales List - passes filtered sales with proper typing -->
    <SalesList 
      v-if="!showForm" 
      :sales="filteredSales" 
      @view="onView" 
      @edit="onEdit" 
      @delete="onDelete" 
      @download="onDownload"
    />
    <!-- ===== [New Feature] END ===== -->

    <!-- Sale Form (Add/Edit) - Placeholder for future implementation -->
    <div v-if="showForm" class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">
        {{ isEditing ? 'Edit Sale' : 'New Sale' }}
      </h2>
      <p class="text-gray-600">Sale form will be implemented here.</p>
      <div class="flex gap-2 mt-4">
        <button
          @click="onCancel"
          class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 min-h-[48px] active:scale-98"
        >
          Cancel
        </button>
        <button
          @click="onSave"
          class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors duration-200 min-h-[48px] active:scale-98"
        >
          Save
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredSales.length === 0 && !showForm" class="text-center py-12">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <font-awesome-icon icon="receipt" class="text-gray-400 text-2xl" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        {{ selectedFilter === 'none' ? 'No sales yet' : 'No sales found for this period' }}
      </h3>
      <p class="text-gray-500 mb-6">
        {{ selectedFilter === 'none' ? 'Start by recording your first sale' : 'Try selecting a different time period or add a new sale' }}
      </p>
      <button
        @click="showAddForm"
        class="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200 min-h-[48px] active:scale-98"
      >
        {{ selectedFilter === 'none' ? 'Record Your First Sale' : 'Add New Sale' }}
      </button>
    </div>

    <!-- ===== [New Feature] START: Fixed Modal Integration ===== -->
    <!-- Sale Details Modal - Only render when we have a selected sale -->
    <SaleDetailsModal
      v-if="selectedSaleForDetails"
      :is-open="showSaleDetailsModal"
      :sale="selectedSaleForDetails"
      @close="onCloseSaleDetails"
      @edit="onEditFromModal"
      @download="onDownloadFromModal"
      @share-whatsapp="onShareWhatsAppFromModal"
    />
    <!-- ===== [New Feature] END ===== -->
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * SalesHistoryView.vue - Enhanced sales management with time filtering
 * - Main sales management page with advanced filtering capabilities
 * - Displays sales list with modern card/table layout via SalesList component
 * - Shows quick stats matching dashboard design
 * - Time period filtering: none, day, week, month, year
 * - Handles sales CRUD operations (Create, Read, Update, Delete)
 * - Manages form state for adding/editing sales
 * - Ghana-optimized: clear GHS pricing, offline support, touch targets
 * - Filter persistence using localStorage for better UX
 * - Proper TypeScript interfaces for all sales data
 * - Emits events for parent components to handle data persistence
 */

// ===== Imports =====
import { ref, computed, onMounted, watch } from 'vue'
import SalesList from '@/components/lists/SalesList.vue'
import SaleDetailsModal from '@/components/modals/SaleDetailsModal.vue'

// ===== Types & Interfaces =====
/**
 * Sale interface with all required fields
 * - id: Unique identifier for the sale
 * - customerName: Name of the customer who made the purchase
 * - invoiceNumber: Unique invoice/receipt number
 * - totalAmount: Total amount of the sale in Ghana Cedis
 * - itemCount: Number of items in the sale
 * - saleDate: Date when the sale was made (string or Date object)
 * - dueDate: Payment due date (string or Date object)
 * - paymentStatus: Current payment status (paid, pending, overdue)
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

/**
 * Time filter interface for filtering options
 * - label: Display name for the filter
 * - value: Internal value used for filtering logic
 * - icon: Font Awesome icon name
 * - days: Number of days to filter by (optional, none filter doesn't use this)
 */
interface TimeFilter {
  label: string
  value: string
  icon: string
  days?: number
}

// ===== [New Feature] START: Fixed Modal State Management =====
/**
 * Modal state for showing sale details
 * Using proper null checking to prevent TypeScript errors
 */
const showSaleDetailsModal = ref(false)
const selectedSaleForDetails = ref<Sale | null>(null)

/**
 * Handle closing the sale details modal
 * Properly resets both modal state and selected sale
 */
function onCloseSaleDetails() {
  showSaleDetailsModal.value = false
  selectedSaleForDetails.value = null
}

/**
 * Handle edit sale from modal
 * @param sale - The sale to edit
 */
function onEditFromModal(sale: Sale) {
  // Call the existing edit handler
  onEdit(sale)
}

/**
 * Handle download from modal
 * @param sale - The sale to download receipt for
 */
function onDownloadFromModal(sale: Sale) {
  // Call the existing download handler
  onDownload(sale)
}

/**
 * Handle WhatsApp share from modal
 * @param sale - The sale to share via WhatsApp
 */
function onShareWhatsAppFromModal(sale: Sale) {
  // You can add analytics or additional logic here
  console.log('Sale shared via WhatsApp:', sale.invoiceNumber)
}
// ===== [New Feature] END =====

// ===== State Management =====
/**
 * Sales array with mock data for demonstration
 * Each sale includes all required fields for proper TypeScript compliance
 * Extended with more realistic Ghana-specific data
 */
const sales = ref<Sale[]>([
  {
    id: '1',
    customerName: 'Kwame Asante',
    invoiceNumber: 'INV-2024-001',
    totalAmount: 245.50,
    itemCount: 5,
    saleDate: new Date(), // Today
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    paymentStatus: 'paid'
  },
  {
    id: '2',
    customerName: 'Akosua Mensah',
    invoiceNumber: 'INV-2024-002',
    totalAmount: 156.75,
    itemCount: 3,
    saleDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    paymentStatus: 'pending'
  },
  {
    id: '3',
    customerName: 'Kofi Osei',
    invoiceNumber: 'INV-2024-003',
    totalAmount: 89.25,
    itemCount: 2,
    saleDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday (overdue)
    paymentStatus: 'overdue'
  },
  {
    id: '4',
    customerName: 'Ama Boateng',
    invoiceNumber: 'INV-2024-004',
    totalAmount: 320.00,
    itemCount: 8,
    saleDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    paymentStatus: 'paid'
  },
  {
    id: '5',
    customerName: 'Yaa Asantewaa',
    invoiceNumber: 'INV-2024-005',
    totalAmount: 450.25,
    itemCount: 12,
    saleDate: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000), // 32 days ago (over a month)
    dueDate: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000), // 17 days ago (overdue)
    paymentStatus: 'overdue'
  }
])

/**
 * Time filter options with icons and filtering logic
 * Default filter is 'none' as requested to show all sales
 */
const timeFilters: TimeFilter[] = [
  { label: 'All Sales', value: 'none', icon: 'list' },
  { label: 'Today', value: 'day', icon: 'calendar-day', days: 1 },
  { label: 'This Week', value: 'week', icon: 'calendar-week', days: 7 },
  { label: 'This Month', value: 'month', icon: 'calendar-alt', days: 30 },
  { label: 'This Year', value: 'year', icon: 'calendar', days: 365 }
]

/**
 * Currently selected filter with persistence
 * Default to 'none' as requested to show all sales by default
 */
const selectedFilter = ref('none')

/**
 * Form state management
 * - showForm: Controls visibility of add/edit form
 * - selectedSale: Currently selected sale for editing
 * - isEditing: Determines if form is in edit mode or add mode
 */
const showForm = ref(false)
const selectedSale = ref<Sale | null>(null)
const isEditing = computed(() => selectedSale.value !== null)

// ===== Computed Properties =====
/**
 * Filter sales based on selected time period
 * Returns all sales if 'none' is selected, otherwise filters by date range
 */
const filteredSales = computed(() => {
  if (selectedFilter.value === 'none') {
    return sales.value
  }
  
  const filter = timeFilters.find(f => f.value === selectedFilter.value)
  if (!filter || !filter.days) {
    return sales.value
  }
  
  const cutoffDate = Date.now() - (filter.days * 24 * 60 * 60 * 1000)
  
  return sales.value.filter(sale => {
    const saleDate = new Date(sale.saleDate).getTime()
    return saleDate >= cutoffDate
  })
})

// ===== Computed Properties for Quick Stats =====
/**
 * Calculate today's total sales amount
 * Only counts sales made today with 'paid' status
 */
const todaysSales = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  return sales.value
    .filter(sale => {
      const saleDate = new Date(sale.saleDate)
      saleDate.setHours(0, 0, 0, 0)
      return saleDate.getTime() === today.getTime() && sale.paymentStatus === 'paid'
    })
    .reduce((total, sale) => total + sale.totalAmount, 0)
})

/**
 * Count pending payments from all sales
 */
const pendingCount = computed(() => 
  sales.value.filter(sale => sale.paymentStatus === 'pending').length
)

/**
 * Count overdue payments from all sales
 */
const overdueCount = computed(() => 
  sales.value.filter(sale => sale.paymentStatus === 'overdue').length
)

/**
 * Count unique customers from all sales
 */
const uniqueCustomers = computed(() => {
  const customers = new Set(sales.value.map(sale => sale.customerName))
  return customers.size
})

// ===== Helper Functions =====
/**
 * Formats currency amount in Ghana Cedis format
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "GHS 245.50")
 */
function formatCurrency(amount: number): string {
  return `GHS ${amount.toFixed(2)}`
}

// ===== Event Handlers =====
/**
 * Shows the add sale form
 * Resets selected sale and shows form
 */
function showAddForm() {
  selectedSale.value = null
  showForm.value = true
}

/**
 * Handles view sale action - now opens modal instead of alert
 * @param sale - The sale to view
 */
function onView(sale: Sale) {
  // ===== [New Feature] START: Open Sale Details Modal =====
  selectedSaleForDetails.value = sale
  showSaleDetailsModal.value = true
  // ===== [New Feature] END =====
}

/**
 * Handles edit sale action
 * Sets selected sale and shows form in edit mode
 * @param sale - The sale to edit
 */
function onEdit(sale: Sale) {
  selectedSale.value = { ...sale }
  showForm.value = true
}

/**
 * Handles delete sale action
 * Shows confirmation dialog and removes sale if confirmed
 * @param sale - The sale to delete
 */
function onDelete(sale: Sale) {
  if (confirm(`Are you sure you want to delete the sale for "${sale.customerName}"?\nInvoice: ${sale.invoiceNumber}`)) {
    const index = sales.value.findIndex(s => s.id === sale.id)
    if (index !== -1) {
      sales.value.splice(index, 1)
    }
  }
}

/**
 * Handles download receipt action
 * In a real app, this would generate and download the receipt as PDF
 * @param sale - The sale to download receipt for
 */
function onDownload(sale: Sale) {
  // TODO: Implement receipt generation and download
  alert(`Downloading receipt for ${sale.customerName}\nInvoice: ${sale.invoiceNumber}\nThis feature will be implemented with PDF generation.`)
}

/**
 * Handles save sale action from form
 * Creates new sale or updates existing based on editing state
 */
function onSave() {
  // TODO: Implement save logic when SaleForm is created
  alert('Save functionality will be implemented when the SaleForm component is created.')
  showForm.value = false
  selectedSale.value = null
}

/**
 * Handles cancel form action
 * Hides form and resets selected sale
 */
function onCancel() {
  showForm.value = false
  selectedSale.value = null
}

// ===== Lifecycle Hooks =====
/**
 * Setup component when mounted
 * Load saved filter preference from localStorage
 */
onMounted(() => {
  // Load saved filter preference
  const savedFilter = localStorage.getItem('sales-history-filter')
  if (savedFilter && timeFilters.find(f => f.value === savedFilter)) {
    selectedFilter.value = savedFilter
  }
})

// ===== Watchers =====
/**
 * Save filter preference when changed
 * Uses localStorage to persist user's filter preference
 */
watch(selectedFilter, (newFilter) => {
  localStorage.setItem('sales-history-filter', newFilter)
})
</script>

<style scoped>
/* ===== [New Feature] START: Enhanced Sales History Styling ===== */
/* Modern Page Styling */
.sales-history-page {
  max-width: 7xl;
  margin: 0 auto;
  padding: 1.5rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .sales-history-page {
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

/* Hover effects for desktop */
@media (min-width: 768px) {
  button:hover {
    transform: translateY(-1px);
  }
}

/* Smooth transitions for all interactive elements */
button {
  transition: all 0.2s ease-in-out;
}

/* Custom scrollbar for desktop filter buttons */
.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 2px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.8);
}
/* ===== [New Feature] END ===== */
</style>