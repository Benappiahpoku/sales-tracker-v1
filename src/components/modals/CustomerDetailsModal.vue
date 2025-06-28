<!--
  CustomerDetailsModal.vue
  Stratonea/Sales Tracker - Customer details modal with comprehensive information display
  - Shows complete customer information including contact details and transaction history
  - Mobile-first design with touch-optimized buttons and scrollable content
  - Ghana-optimized: WhatsApp integration, phone formatting, mobile-first design
  - Follows modern card design with proper accessibility features
  - Responsive modal that works on all screen sizes
  - Follows Stratonea guidelines with comprehensive documentation
-->

<template>
  <!-- ===== [New Feature] START: Customer Details Modal ===== -->
  <!-- Modal Overlay -->
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
    @click.self="onClose"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <!-- Modal Content -->
    <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
      
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h2 id="modal-title" class="text-xl font-bold text-gray-900">Customer Details</h2>
          <p class="text-sm text-gray-600 mt-1">{{ customer.name }}</p>
        </div>
        
        <!-- Close Button -->
        <button
          @click="onClose"
          class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Close modal"
        >
          <font-awesome-icon icon="times" class="text-gray-500" />
        </button>
      </div>

      <!-- Modal Body - Scrollable Content -->
      <div class="overflow-y-auto max-h-[calc(90vh-8rem)]">
        <div class="p-6 space-y-6">
          
          <!-- Customer Status Card -->
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-lg font-semibold text-gray-900">Customer Status</h3>
              <div class="flex items-center">
                <div 
                  :class="[
                    'w-3 h-3 rounded-full mr-2',
                    customer.status === 'active' ? 'bg-green-500' :
                    customer.status === 'pending' ? 'bg-orange-500' :
                    'bg-red-500'
                  ]"
                ></div>
                <span :class="[
                  'text-sm font-semibold capitalize',
                  customer.status === 'active' ? 'text-green-600' :
                  customer.status === 'pending' ? 'text-orange-600' :
                  'text-red-600'
                ]">
                  {{ customer.status }}
                </span>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-600">Join Date:</span>
                <p class="font-medium text-gray-900">{{ formatDate(customer.joinDate) }}</p>
              </div>
              <div>
                <span class="text-gray-600">Days as Customer:</span>
                <p class="font-medium text-gray-900">{{ daysSinceJoin }} days</p>
              </div>
            </div>
          </div>

          <!-- Contact Information Card -->
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <font-awesome-icon icon="address-book" class="mr-2 text-blue-600" />
              Contact Information
            </h3>
            
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <span class="text-sm text-gray-600">Full Name:</span>
                  <p class="font-medium text-gray-900">{{ customer.name }}</p>
                </div>
                <button
                  @click="copyToClipboard(customer.name)"
                  class="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  aria-label="Copy name"
                >
                  <font-awesome-icon icon="copy" class="text-sm" />
                </button>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <span class="text-sm text-gray-600">Phone Number:</span>
                  <p class="font-medium text-gray-900">{{ formatPhone(customer.phone) }}</p>
                </div>
                <div class="flex gap-2">
                  <button
                    @click="copyToClipboard(customer.phone)"
                    class="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    aria-label="Copy phone number"
                  >
                    <font-awesome-icon icon="copy" class="text-sm" />
                  </button>
                  <button
                    @click="callCustomer"
                    class="p-2 text-green-600 hover:text-green-700 transition-colors duration-200"
                    aria-label="Call customer"
                  >
                    <font-awesome-icon icon="phone" class="text-sm" />
                  </button>
                </div>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <span class="text-sm text-gray-600">Email:</span>
                  <p class="font-medium text-gray-900">{{ customer.email }}</p>
                </div>
                <div class="flex gap-2">
                  <button
                    @click="copyToClipboard(customer.email)"
                    class="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    aria-label="Copy email"
                  >
                    <font-awesome-icon icon="copy" class="text-sm" />
                  </button>
                  <button
                    @click="emailCustomer"
                    class="p-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    aria-label="Email customer"
                  >
                    <font-awesome-icon icon="envelope" class="text-sm" />
                  </button>
                </div>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <span class="text-sm text-gray-600">Location:</span>
                  <p class="font-medium text-gray-900">{{ customer.location }}</p>
                </div>
                <button
                  @click="openMaps"
                  class="p-2 text-purple-600 hover:text-purple-700 transition-colors duration-200"
                  aria-label="View on map"
                >
                  <font-awesome-icon icon="map-marker-alt" class="text-sm" />
                </button>
              </div>
            </div>
          </div>

          <!-- Transaction Summary Card -->
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <font-awesome-icon icon="chart-bar" class="mr-2 text-green-600" />
              Transaction Summary
            </h3>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center p-3 bg-green-50 rounded-lg">
                <p class="text-2xl font-bold text-green-600">{{ customerStats.totalPurchases }}</p>
                <p class="text-sm text-gray-600">Total Purchases</p>
              </div>
              <div class="text-center p-3 bg-blue-50 rounded-lg">
                <p class="text-2xl font-bold text-blue-600">{{ formatCurrency(customerStats.totalSpent) }}</p>
                <p class="text-sm text-gray-600">Total Spent</p>
              </div>
              <div class="text-center p-3 bg-purple-50 rounded-lg">
                <p class="text-2xl font-bold text-purple-600">{{ formatCurrency(customerStats.averageOrder) }}</p>
                <p class="text-sm text-gray-600">Average Order</p>
              </div>
              <div class="text-center p-3 bg-orange-50 rounded-lg">
                <p class="text-2xl font-bold text-orange-600">{{ customerStats.lastPurchaseDays }}</p>
                <p class="text-sm text-gray-600">Days Since Last Purchase</p>
              </div>
            </div>
          </div>

          <!-- Recent Transactions Card -->
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <font-awesome-icon icon="history" class="mr-2 text-gray-600" />
              Recent Transactions ({{ recentTransactions.length }})
            </h3>
            
            <div class="space-y-3">
              <div 
                v-for="transaction in recentTransactions" 
                :key="transaction.id"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div class="flex-1">
                  <p class="font-medium text-gray-900">{{ transaction.description }}</p>
                  <p class="text-sm text-gray-600">{{ formatDate(transaction.date) }}</p>
                </div>
                <div class="text-right">
                  <p class="font-semibold text-gray-900">{{ formatCurrency(transaction.amount) }}</p>
                  <span :class="[
                    'text-xs px-2 py-1 rounded-full',
                    transaction.status === 'completed' ? 'bg-green-100 text-green-700' :
                    transaction.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  ]">
                    {{ transaction.status }}
                  </span>
                </div>
              </div>
            </div>
            
            <!-- View All Transactions Link -->
            <div class="mt-4 text-center">
              <button
                @click="viewAllTransactions"
                class="text-primary hover:text-primary-hover font-medium text-sm transition-colors duration-200"
              >
                View All Transactions →
              </button>
            </div>
          </div>

          <!-- Notes Section -->
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <font-awesome-icon icon="sticky-note" class="mr-2 text-yellow-600" />
              Customer Notes
            </h3>
            
            <div v-if="customerNotes.length > 0" class="space-y-3">
              <div 
                v-for="note in customerNotes" 
                :key="note.id"
                class="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400"
              >
                <p class="text-gray-700">{{ note.content }}</p>
                <p class="text-xs text-gray-500 mt-2">{{ formatDate(note.createdAt) }}</p>
              </div>
            </div>
            
            <div v-else class="text-center py-4 text-gray-500">
              <font-awesome-icon icon="sticky-note" class="text-2xl mb-2" />
              <p>No notes added yet</p>
            </div>
            
            <!-- Add Note Button -->
            <button
              @click="addNote"
              class="w-full mt-3 py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary transition-colors duration-200"
            >
              <font-awesome-icon icon="plus" class="mr-2" />
              Add Note
            </button>
          </div>

        </div>
      </div>

      <!-- Modal Footer with Actions -->
      <div class="p-6 border-t border-gray-200 bg-gray-50">
        <div class="flex flex-col sm:flex-row gap-3 sm:justify-end">
          
          <!-- WhatsApp Message Button -->
          <button
            @click="onMessageWhatsApp"
            class="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 min-h-[48px] font-medium active:scale-98"
          >
            <font-awesome-icon :icon="['fab', 'whatsapp']" class="mr-2" />
            Message on WhatsApp
          </button>
          
          <!-- View Transactions Button -->
          <button
            @click="viewAllTransactions"
            class="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 min-h-[48px] font-medium active:scale-98"
          >
            <font-awesome-icon icon="history" class="mr-2" />
            View Transactions
          </button>
          
          <!-- Edit Customer Button -->
          <button
            @click="onEditCustomer"
            class="flex items-center justify-center px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors duration-200 min-h-[48px] font-medium active:scale-98"
          >
            <font-awesome-icon icon="edit" class="mr-2" />
            Edit Customer
          </button>
          
          <!-- Close Button -->
          <button
            @click="onClose"
            class="flex items-center justify-center px-4 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200 min-h-[48px] font-medium active:scale-98"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * CustomerDetailsModal.vue - Comprehensive customer information modal
 * - Displays complete customer details including contact info and transaction history
 * - Mobile-first responsive design with touch-optimized buttons
 * - Ghana-optimized features: WhatsApp integration, phone formatting, location support
 * - Accessible modal with proper ARIA labels and keyboard navigation
 * - Scrollable content for handling large transaction histories
 * - Action buttons for common operations (edit, message, view transactions)
 */

// ===== Imports =====
import { computed } from 'vue'

// ===== Types & Interfaces =====
/**
 * Customer interface matching the data structure from CustomersView
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

/**
 * Transaction interface for customer transaction history
 */
interface Transaction {
  id: string
  description: string
  amount: number
  date: string | Date
  status: 'completed' | 'pending' | 'failed'
}

/**
 * Customer note interface for storing notes about customers
 */
interface CustomerNote {
  id: string
  content: string
  createdAt: string | Date
}

/**
 * Customer statistics interface for transaction summary
 */
interface CustomerStats {
  totalPurchases: number
  totalSpent: number
  averageOrder: number
  lastPurchaseDays: number
}

// ===== Props =====
/**
 * Component props with proper typing and defaults
 */
const props = withDefaults(defineProps<{
  isOpen: boolean
  customer: Customer
}>(), {
  isOpen: false
})

// ===== Emits =====
/**
 * Events emitted to parent component
 */
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'edit', customer: Customer): void
  (e: 'message-whatsapp', customer: Customer): void
  (e: 'view-transactions', customer: Customer): void
}>()

// ===== Computed Properties =====
/**
 * Calculate days since customer joined
 */
const daysSinceJoin = computed(() => {
  const joinDate = new Date(props.customer.joinDate)
  const today = new Date()
  const diffTime = today.getTime() - joinDate.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
})

/**
 * Mock customer statistics for demonstration
 * In a real app, this would come from the API or database
 */
const customerStats = computed<CustomerStats>(() => ({
  totalPurchases: Math.floor(Math.random() * 20) + 5, // 5-25 purchases
  totalSpent: (Math.random() * 5000) + 500, // GHS 500-5500
  averageOrder: 0, // Will be calculated below
  lastPurchaseDays: Math.floor(Math.random() * 30) + 1 // 1-30 days ago
}))

// Calculate average order value
customerStats.value.averageOrder = customerStats.value.totalSpent / customerStats.value.totalPurchases

/**
 * Mock recent transactions for demonstration
 * In a real app, this would come from the API based on customer ID
 */
const recentTransactions = computed<Transaction[]>(() => [
  {
    id: '1',
    description: 'Palm Oil & Rice Package',
    amount: 245.50,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    status: 'completed'
  },
  {
    id: '2',
    description: 'Household Items',
    amount: 156.75,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    status: 'completed'
  },
  {
    id: '3',
    description: 'Cooking Supplies',
    amount: 89.25,
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
    status: 'pending'
  }
])

/**
 * Mock customer notes for demonstration
 * In a real app, this would come from the API
 */
const customerNotes = computed<CustomerNote[]>(() => [
  {
    id: '1',
    content: 'Prefers delivery on weekends. Very punctual with payments.',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
  },
  {
    id: '2',
    content: 'Regular customer since January. Interested in bulk discounts.',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
  }
])

// ===== Helper Functions =====
/**
 * Format currency for Ghana Cedi display
 * @param amount - Amount to format
 * @returns Formatted currency string
 */
function formatCurrency(amount: number): string {
  return `GHS ${amount.toFixed(2)}`
}

/**
 * Format date for display
 * @param date - Date to format (string or Date object)
 * @returns Formatted date string
 */
function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

/**
 * Format phone number for Ghana
 * @param phone - Phone number to format
 * @returns Formatted phone number
 */
function formatPhone(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Format as Ghana phone number
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
  }
  
  return phone
}

/**
 * Copy text to clipboard with user feedback
 * @param text - Text to copy
 */
async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    // Show toast notification (would implement with toast library)
    alert(`Copied to clipboard: ${text}`)
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    alert('Failed to copy to clipboard')
  }
}

// ===== Event Handlers =====
/**
 * Handle modal close action
 */
function onClose() {
  emit('close')
}

/**
 * Handle edit customer action
 */
function onEditCustomer() {
  emit('edit', props.customer)
  emit('close') // Close modal after emitting edit event
}

/**
 * Handle WhatsApp messaging action
 * Creates formatted message and opens WhatsApp
 */
function onMessageWhatsApp() {
  const cleaned = props.customer.phone.replace(/\D/g, '')
  let whatsappPhone = ''
  
  // Convert to international format for WhatsApp
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    whatsappPhone = '233' + cleaned.slice(1)
  } else if (cleaned.length === 12 && cleaned.startsWith('233')) {
    whatsappPhone = cleaned
  } else {
    whatsappPhone = cleaned
  }
  
  const message = `Hello ${props.customer.name}, I hope you're doing well! 😊\n\n` +
    `I wanted to reach out regarding your account with us.\n\n` +
    `Thank you for being a valued customer since ${formatDate(props.customer.joinDate)}.\n\n` +
    `Best regards,\nYour Sales Team`

  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
  
  emit('message-whatsapp', props.customer)
}

/**
 * Handle view all transactions action
 */
function viewAllTransactions() {
  emit('view-transactions', props.customer)
  emit('close')
}

/**
 * Handle call customer action
 */
function callCustomer() {
  const cleaned = props.customer.phone.replace(/\D/g, '')
  const telUrl = `tel:${cleaned.startsWith('0') ? '+233' + cleaned.slice(1) : cleaned}`
  window.open(telUrl)
}

/**
 * Handle email customer action
 */
function emailCustomer() {
  const subject = encodeURIComponent(`Following up - ${props.customer.name}`)
  const body = encodeURIComponent(`Hello ${props.customer.name},\n\nI hope this email finds you well.\n\nBest regards,\nYour Sales Team`)
  const mailtoUrl = `mailto:${props.customer.email}?subject=${subject}&body=${body}`
  window.open(mailtoUrl)
}

/**
 * Handle open maps action
 */
function openMaps() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(props.customer.location + ', Ghana')}`
  window.open(mapsUrl, '_blank')
}

/**
 * Handle add note action
 */
function addNote() {
  const noteContent = prompt('Enter a note about this customer:')
  if (noteContent && noteContent.trim()) {
    // In a real app, this would save to the database
    alert(`Note added: "${noteContent}"\n\nThis will be implemented with the backend.`)
  }
}
</script>

<style scoped>
/* ===== [New Feature] START: Customer Details Modal Styling ===== */
/* Touch feedback for mobile users */
button:active {
  transform: scale(0.98);
}

/* Enhanced focus states for accessibility */
button:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}

/* Smooth transitions for all interactive elements */
button {
  transition: all 0.2s ease-in-out;
}

/* Modal animations */
.modal-overlay {
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  animation: slideUp 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom scrollbar for modal body */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Hover effects for transaction items */
.hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
  cursor: pointer;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  /* Stack action buttons vertically on mobile */
  .flex-col button {
    width: 100%;
  }
  
  /* Reduce modal padding on small screens */
  .p-6 {
    padding: 1rem;
  }
  
  /* Adjust grid layout on mobile */
  .grid-cols-2 {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}
/* ===== [New Feature] END ===== */
</style>