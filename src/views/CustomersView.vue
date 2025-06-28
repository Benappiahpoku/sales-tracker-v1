<!--
  CustomersView.vue
  Stratonea/Sales Tracker - Main view for managing customers.
  - Modern design matching ProductsView.vue and StockView.vue
  - Mobile-first responsive layout with floating action button
  - Ghana-optimized: mobile-first, offline-friendly, WhatsApp integration
  - Uses CustomerList and CustomerForm components
  - Handles add/edit customer logic with proper TypeScript interfaces
  - Follows Stratonea guidelines and modern design patterns
-->

<template>
  <div class="customers-page">
    <!-- ===== Page Header ===== -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Customers </h1>
        <p class="text-gray-600 mt-1">Manage your customer <br> relationships and contacts </p>
      </div>
      
      <!-- Add Customer Button -->
      <button
        @click="onAdd"
        class="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200 min-h-[48px] flex items-center gap-2"
        aria-label="Add New Customer"
      >
        <font-awesome-icon icon="plus" />
        <span class="hidden sm:inline">Add Customer</span>
      </button>
    </div>

    <!-- ===== [New Feature] START: Quick Stats Header ===== -->
    <!-- Quick Stats - matches dashboard card style -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <!-- Total Customers -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <font-awesome-icon icon="users" class="text-blue-600 text-sm" />
          </div>
          <div>
            <p class="text-sm text-gray-600">Total Customers</p>
            <p class="text-lg font-semibold text-gray-900">{{ totalCustomers }}</p>
          </div>
        </div>
      </div>

      <!-- Active Customers -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
            <font-awesome-icon icon="user-check" class="text-green-600 text-sm" />
          </div>
          <div>
            <p class="text-sm text-gray-600">Active</p>
            <p class="text-lg font-semibold text-gray-900">{{ activeCustomers }}</p>
          </div>
        </div>
      </div>

      <!-- Pending Customers -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
            <font-awesome-icon icon="user-clock" class="text-orange-600 text-sm" />
          </div>
          <div>
            <p class="text-sm text-gray-600">Pending</p>
            <p class="text-lg font-semibold text-gray-900">{{ pendingCustomers }}</p>
          </div>
        </div>
      </div>

      <!-- New This Month -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
            <font-awesome-icon icon="user-plus" class="text-purple-600 text-sm" />
          </div>
          <div>
            <p class="text-sm text-gray-600">New This Month</p>
            <p class="text-lg font-semibold text-gray-900">{{ newThisMonth }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- ===== [New Feature] END ===== -->

    <!-- Customer List - passes customers with proper typing -->
    <CustomerList 
      v-if="!showForm" 
      :customers="customers" 
      @view="onView" 
      @edit="onEdit" 
      @delete="onDelete" 
      @whatsapp="onWhatsApp"
    />

    <!-- Customer Form (Add/Edit) - Placeholder for future implementation -->
    <div v-if="showForm" class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">
        {{ isEditing ? 'Edit Customer' : 'New Customer' }}
      </h2>
      <p class="text-gray-600">Customer form will be implemented here.</p>
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
    <div v-if="customers.length === 0 && !showForm" class="text-center py-12">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <font-awesome-icon icon="users" class="text-gray-400 text-2xl" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No customers yet</h3>
      <p class="text-gray-500 mb-6">Start building your customer relationships</p>
      <button
        @click="onAdd"
        class="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200"
      >
        Add Your First Customer
      </button>
    </div>

    <!-- ===== [New Feature] START: Floating Action Button ===== -->
    <!-- Floating Action Button for mobile users -->
    <button
      @click="onAdd"
      class="fixed bottom-6 right-6 bg-primary text-white w-14 h-14 rounded-full shadow-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 flex items-center justify-center md:hidden"
      aria-label="Add Customer"
    >
      <font-awesome-icon icon="plus" class="text-xl" />
    </button>
    <!-- ===== [New Feature] END ===== -->

    <!-- ===== [New Feature] START: Customer Details Modal Integration ===== -->
    <!-- Customer Details Modal - Only render when we have a selected customer -->
    <CustomerDetailsModal
      v-if="selectedCustomerForDetails"
      :is-open="showCustomerDetailsModal"
      :customer="selectedCustomerForDetails"
      @close="onCloseCustomerDetails"
      @edit="onEditFromModal"
      @message-whatsapp="onMessageWhatsAppFromModal"
      @view-transactions="onViewTransactionsFromModal"
    />
    <!-- ===== [New Feature] END ===== -->
  </div>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * CustomersView.vue - Main customer management page
 * - Displays customer list with modern card/table layout
 * - Shows quick stats matching dashboard design
 * - Handles customer CRUD operations (Create, Read, Update, Delete)
 * - Manages form state for adding/editing customers
 * - Ghana-optimized: WhatsApp integration, phone formatting, offline support
 * - Proper TypeScript interfaces for all customer data
 * - Emits events for parent components to handle data persistence
 */

// ===== Imports =====
import { ref, computed } from 'vue'
import CustomerList from '@/components/lists/CustomerList.vue'
// ===== [New Feature] START: Import Customer Details Modal =====
import CustomerDetailsModal from '@/components/modals/CustomerDetailsModal.vue'
// ===== [New Feature] END =====

// ===== Types & Interfaces =====
/**
 * Customer interface matching CustomerList component interface
 * - id: Unique identifier for the customer
 * - name: Customer's full name
 * - phone: Customer's phone number (Ghana format)
 * - email: Customer's email address
 * - location: Customer's location/city
 * - status: Customer status (active, inactive, pending)
 * - joinDate: When the customer was added (Date or ISO string)
 */
interface Customer {
  id: string
  name: string
  phone: string
  email: string
  location: string
  status: 'active' | 'inactive' | 'pending'
  joinDate: string | Date
}

// ===== [New Feature] START: Modal State Management =====
/**
 * Modal state for showing customer details
 * Using proper null checking to prevent TypeScript errors
 */
const showCustomerDetailsModal = ref(false)
const selectedCustomerForDetails = ref<Customer | null>(null)

/**
 * Handle closing the customer details modal
 * Properly resets both modal state and selected customer
 */
function onCloseCustomerDetails() {
  showCustomerDetailsModal.value = false
  selectedCustomerForDetails.value = null
}

/**
 * Handle edit customer from modal
 * @param customer - The customer to edit
 */
function onEditFromModal(customer: Customer) {
  // Call the existing edit handler
  onEdit(customer)
}

/**
 * Handle WhatsApp message from modal
 * @param customer - The customer to message via WhatsApp
 */
function onMessageWhatsAppFromModal(customer: Customer) {
  // You can add analytics or additional logic here
  console.log('Customer messaged via WhatsApp from modal:', customer.name)
}

/**
 * Handle view transactions from modal
 * @param customer - The customer to view transactions for
 */
function onViewTransactionsFromModal(customer: Customer) {
  // TODO: Navigate to transactions view filtered by customer
  alert(`View transactions for ${customer.name}\n\nThis will navigate to the Sales History page filtered by this customer.`)
}
// ===== [New Feature] END =====

// ===== State Management =====
/**
 * Customer entries array with mock data for demonstration
 * Each entry includes all required fields for proper TypeScript compliance
 */
const customers = ref<Customer[]>([
  {
    id: '1',
    name: 'Ama Serwaa',
    phone: '024 123 4567',
    email: 'ama.serwaa@example.com',
    location: 'Kumasi',
    status: 'active',
    joinDate: '2024-01-15T10:30:00'
  },
  {
    id: '2',
    name: 'Kwame Mensah',
    phone: '020 987 6543',
    email: 'kwame.mensah@example.com',
    location: 'Accra',
    status: 'active',
    joinDate: '2024-01-12T14:20:00'
  },
  {
    id: '3',
    name: 'Akosua Boateng',
    phone: '050 555 1234',
    email: 'akosua.boateng@example.com',
    location: 'Takoradi',
    status: 'pending',
    joinDate: '2024-01-20T09:15:00'
  },
  {
    id: '4',
    name: 'Kofi Asante',
    phone: '054 777 8888',
    email: 'kofi.asante@example.com',
    location: 'Tamale',
    status: 'inactive',
    joinDate: '2023-12-10T16:45:00'
  },
  {
    id: '5',
    name: 'Efua Owusu',
    phone: '026 444 5555',
    email: 'efua.owusu@example.com',
    location: 'Cape Coast',
    status: 'active',
    joinDate: '2024-01-18T11:30:00'
  }
])

/**
 * Form state management
 * - showForm: Controls visibility of add/edit form
 * - selectedCustomer: Currently selected customer for editing
 * - isEditing: Determines if form is in edit mode or add mode
 */
const showForm = ref(false)
const selectedCustomer = ref<Customer | null>(null)
const isEditing = computed(() => selectedCustomer.value !== null)

// ===== Computed Properties for Quick Stats =====
/**
 * Calculate total number of customers
 */
const totalCustomers = computed(() => customers.value.length)

/**
 * Count active customers
 */
const activeCustomers = computed(() => 
  customers.value.filter(customer => customer.status === 'active').length
)

/**
 * Count pending customers
 */
const pendingCustomers = computed(() => 
  customers.value.filter(customer => customer.status === 'pending').length
)

/**
 * Count customers added this month
 */
const newThisMonth = computed(() => {
  const now = new Date()
  const thisMonth = now.getMonth()
  const thisYear = now.getFullYear()
  
  return customers.value.filter(customer => {
    const joinDate = new Date(customer.joinDate)
    return joinDate.getMonth() === thisMonth && joinDate.getFullYear() === thisYear
  }).length
})

// ===== Helper Functions =====
/**
 * Generates a unique ID for new customers
 * In a real app, this would be handled by the backend
 */
function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

// ===== Event Handlers =====
/**
 * Shows the add customer form
 * Resets selected customer and shows form
 */
function onAdd() {
  selectedCustomer.value = null
  showForm.value = true
}

/**
 * Handles view customer action - now opens modal instead of alert
 * @param customer - The customer to view
 */
function onView(customer: Customer) {
  // ===== [New Feature] START: Open Customer Details Modal =====
  selectedCustomerForDetails.value = customer
  showCustomerDetailsModal.value = true
  // ===== [New Feature] END =====
}

/**
 * Handles edit customer action
 * Sets selected customer and shows form in edit mode
 * @param customer - The customer to edit
 */
function onEdit(customer: Customer) {
  selectedCustomer.value = { ...customer }
  showForm.value = true
}

/**
 * Handles delete customer action
 * Shows confirmation dialog and removes customer if confirmed
 * @param customer - The customer to delete
 */
function onDelete(customer: Customer) {
  if (confirm(`Are you sure you want to delete "${customer.name}"?\nThis action cannot be undone.`)) {
    const index = customers.value.findIndex(c => c.id === customer.id)
    if (index !== -1) {
      customers.value.splice(index, 1)
    }
  }
}

/**
 * Handles WhatsApp message action
 * Opens WhatsApp with customer's phone number
 * Ghana-optimized: Uses proper phone format for WhatsApp
 * @param customer - The customer to message
 */
function onWhatsApp(customer: Customer) {
  const cleaned = customer.phone.replace(/\D/g, '')
  let whatsappPhone = ''
  
  // Convert to international format for WhatsApp
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    whatsappPhone = '233' + cleaned.slice(1)
  } else if (cleaned.length === 12 && cleaned.startsWith('233')) {
    whatsappPhone = cleaned
  } else {
    whatsappPhone = cleaned
  }
  
  const message = encodeURIComponent(`Hello ${customer.name}, I hope you're doing well!`)
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${message}`
  
  window.open(whatsappUrl, '_blank')
}

/**
 * Handles save customer action from form
 * Creates new customer or updates existing based on editing state
 */
function onSave() {
  // TODO: Implement save logic when CustomerForm is created
  if (isEditing.value) {
    // Update existing customer
    const index = customers.value.findIndex(c => c.id === selectedCustomer.value?.id)
    if (index !== -1 && selectedCustomer.value) {
      customers.value[index] = { ...selectedCustomer.value }
    }
    alert(`Updated customer: ${selectedCustomer.value?.name}`)
  } else {
    // Add new customer
    const newCustomer: Customer = {
      id: generateId(),
      name: 'New Customer',
      phone: '024 000 0000',
      email: 'customer@example.com',
      location: 'Accra',
      status: 'pending',
      joinDate: new Date().toISOString()
    }
    customers.value.push(newCustomer)
    alert('Added new customer. Customer form will be implemented to capture actual data.')
  }
  
  showForm.value = false
  selectedCustomer.value = null
}

/**
 * Handles cancel form action
 * Hides form and resets selected customer
 */
function onCancel() {
  showForm.value = false
  selectedCustomer.value = null
}
</script>

<style scoped>
/* ===== Modern Page Styling ===== */
.customers-page {
  max-width: 7xl;
  margin: 0 auto;
  padding: 1.5rem;
  position: relative; /* For floating action button positioning */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .customers-page {
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