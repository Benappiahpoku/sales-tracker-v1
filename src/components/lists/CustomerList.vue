<!--
  CustomerList.vue
  Stratonea/Sales Tracker - Modern customer list with responsive table/card layout
  - Mobile: Modern card layout with CustomerCard components
  - Desktop: Modern table layout with hover effects and status indicators
  - Consistent styling with dashboard and product list design
  - Ghana-optimized: touch targets, WhatsApp integration, offline support
  - All props, emits, and helpers documented for learning
  - Follows Stratonea guidelines
-->

<template>
  <div class="customer-list-container">
    <!-- ===== [New Feature] START: Mobile Card View ===== -->
    <!-- Mobile View: Card Layout -->
    <div class="block md:hidden">
      <div class="space-y-4 max-w-md mx-auto my-4">
        <CustomerCard
          v-for="customer in customers"
          :key="customer.id"
          :name="customer.name"
          :phone="customer.phone"
          :email="customer.email"
          :location="customer.location"
          @view="onView(customer)"
          @edit="onEdit(customer)"
          @delete="onDelete(customer)"
          @whatsapp="onWhatsApp(customer)"
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
          <h3 class="text-lg font-semibold text-gray-900">Customer Directory</h3>
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
                  Contact
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th class="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <!-- Table Body -->
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="customer in customers"
                :key="customer.id"
                class="hover:bg-gray-50 transition-colors duration-150"
              >
                <!-- Customer Name with Icon -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                      <font-awesome-icon icon="user" class="text-primary-600" />
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ customer.name }}</div>
                      <div class="text-sm text-gray-500">ID: {{ customer.id }}</div>
                    </div>
                  </div>
                </td>

                <!-- Contact Information -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="space-y-1">
                    <div class="flex items-center text-sm text-gray-900">
                      <font-awesome-icon icon="phone" class="text-gray-400 mr-2 w-3 h-3" />
                      <span class="font-mono">{{ formatPhone(customer.phone) }}</span>
                    </div>
                    <div class="flex items-center text-sm text-gray-500">
                      <font-awesome-icon icon="envelope" class="text-gray-400 mr-2 w-3 h-3" />
                      <span class="truncate max-w-[180px]" :title="customer.email">{{ customer.email }}</span>
                    </div>
                  </div>
                </td>

                <!-- Location -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <font-awesome-icon icon="map-marker-alt" class="text-gray-400 mr-2 w-3 h-3" />
                    <span class="text-sm font-medium text-primary-600">{{ customer.location }}</span>
                  </div>
                </td>

                <!-- Status -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      getStatusClass(customer.status)
                    ]"
                  >
                    <div 
                      :class="[
                        'w-2 h-2 rounded-full mr-1.5',
                        getStatusDotClass(customer.status)
                      ]"
                    ></div>
                    {{ getStatusText(customer.status) }}
                  </span>
                </td>

                <!-- Join Date -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDate(customer.joinDate) }}</div>
                </td>

                <!-- Action Buttons -->
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end gap-2">
                    <!-- View Button -->
                    <button
                      @click="onView(customer)"
                      class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150"
                      :aria-label="`View details for ${customer.name}`"
                    >
                      <font-awesome-icon icon="eye" class="mr-1" />
                      View
                    </button>

                    <!-- Edit Button -->
                    <button
                      @click="onEdit(customer)"
                      class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150"
                      :aria-label="`Edit ${customer.name}`"
                    >
                      Edit
                    </button>

                    <!-- WhatsApp Button -->
                    <button
                      @click="onWhatsApp(customer)"
                      class="inline-flex items-center px-3 py-2 border border-green-300 text-sm leading-4 font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
                      :aria-label="`Message ${customer.name} on WhatsApp`"
                    >
                      <font-awesome-icon :icon="['fab', 'whatsapp']" />
                    </button>

                    <!-- Delete Button -->
                    <button
                      @click="onDelete(customer)"
                      class="inline-flex items-center px-3 py-2 border border-red-300 text-sm leading-4 font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150"
                      :aria-label="`Delete ${customer.name}`"
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
        <div v-if="customers.length === 0" class="text-center py-12">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <font-awesome-icon icon="users" class="text-gray-400 text-2xl" />
          </div>
          <h3 class="text-sm font-medium text-gray-900 mb-2">No customers found</h3>
          <p class="text-sm text-gray-500">Add your first customer to get started.</p>
        </div>
      </div>
    </div>
    <!-- ===== [New Feature] END ===== -->
  </div>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * CustomerList.vue - Responsive customer list component
 * - Mobile: Card-based layout using CustomerCard components
 * - Desktop: Modern table layout with hover effects
 * - Status indicators and join date tracking
 * - Quick action buttons for View, Edit, Delete, WhatsApp
 * - Ghana-optimized: WhatsApp integration, phone formatting
 * - Emits events to parent for customer management
 */

// ===== Imports =====
/**
 * Import the CustomerCard component for mobile card layout
 * This component handles individual customer display on mobile devices
 */
import CustomerCard from '@/components/layout/CustomerCard.vue'

// ===== Types & Interfaces =====
/**
 * Customer interface defining the structure of customer data
 * - id: Unique identifier for the customer (required for proper Vue key binding)
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

// ===== Props =====
/**
 * Component props
 * - customers: Array of customers to display
 */
 withDefaults(
  defineProps<{
    customers: Customer[]
  }>(),
  {
    customers: () => []
  }
)

// ===== Emits =====
/**
 * Events emitted by CustomerList
 * - view: User wants to view customer details
 * - edit: User wants to edit a customer
 * - delete: User wants to delete a customer
 * - whatsapp: User wants to message customer on WhatsApp
 */
const emit = defineEmits<{
  (e: 'view', customer: Customer): void
  (e: 'edit', customer: Customer): void
  (e: 'delete', customer: Customer): void
  (e: 'whatsapp', customer: Customer): void
}>()

// ===== Event Handlers =====
/**
 * Handle view customer action
 * Emits view event to parent component with customer data
 * @param customer - The customer to view
 */
function onView(customer: Customer) {
  emit('view', customer)
}

/**
 * Handle edit customer action
 * Emits edit event to parent component with customer data
 * @param customer - The customer to edit
 */
function onEdit(customer: Customer) {
  emit('edit', customer)
}

/**
 * Handle delete customer action
 * Emits delete event to parent component with customer data
 * @param customer - The customer to delete
 */
function onDelete(customer: Customer) {
  emit('delete', customer)
}

/**
 * Handle WhatsApp message action
 * Emits whatsapp event to parent component with customer data
 * @param customer - The customer to message
 */
function onWhatsApp(customer: Customer) {
  emit('whatsapp', customer)
}

// ===== Helper Functions =====
/**
 * Formats phone number for Ghana display
 * @param phone - The phone number to format
 */
function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  
  // Check if it's a valid Ghanaian number format
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    // Format as: 024 123 4567
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
  } else if (cleaned.length === 12 && cleaned.startsWith('233')) {
    // Convert +233 format to local format
    const localNumber = '0' + cleaned.slice(3)
    return `${localNumber.slice(0, 3)} ${localNumber.slice(3, 6)} ${localNumber.slice(6)}`
  }
  
  // Return original if not a recognized format
  return phone
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

/**
 * Gets status text based on status
 * @param status - Current customer status
 * @returns Status text
 */
function getStatusText(status: Customer['status']): string {
  switch (status) {
    case 'active':
      return 'Active'
    case 'inactive':
      return 'Inactive'
    case 'pending':
      return 'Pending'
    default:
      return 'Unknown'
  }
}

/**
 * Gets CSS classes for status badge
 * @param status - Current customer status
 * @returns CSS classes for badge styling
 */
function getStatusClass(status: Customer['status']): string {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'inactive':
      return 'bg-gray-100 text-gray-800'
    case 'pending':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

/**
 * Gets CSS classes for status dot
 * @param status - Current customer status
 * @returns CSS classes for dot color
 */
function getStatusDotClass(status: Customer['status']): string {
  switch (status) {
    case 'active':
      return 'bg-green-500'
    case 'inactive':
      return 'bg-gray-500'
    case 'pending':
      return 'bg-orange-500'
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