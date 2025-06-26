<!--
  CustomersView.vue
  Stratonea/Sales Tracker - Main view for managing customers.
  - Ghana-optimized: mobile-first, offline-friendly, simple UI
  - Uses CustomerList and CustomerForm components
  - Handles add/edit customer logic with mock data for now
  - Follows Stratonea guidelines and file structure
-->

<template>


  <!-- ===== Main Content ===== -->
  <div class="min-h-screen bg-gray-50 px-2 py-4">
    <!-- Customer List (shows when not adding/editing) -->
    <CustomerList v-if="!showForm" :customers="customers" @add="onAdd" @edit="onEdit" @delete="onDelete" />

    <!-- Customer Form (shows when adding/editing) -->
    <CustomerForm v-if="showForm" :initial="editingCustomer || emptyCustomer" :error="formError" @save="onSave"
      @cancel="onCancel" />

    <!-- ===== Floating Action Button (FAB) for Add Invoice ===== -->

    <button
      class="fixed bottom-20 right-4 md:hidden z-50 bg-green-500 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-3xl focus:outline-none"
      @click="onAdd" aria-label="Add Invoice" title="Add Invoice">
      +
    </button>
    <!-- ===== [New Feature] END ===== -->
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import { ref } from 'vue'
import CustomerList from '@/components/lists/CustomerList.vue'
import CustomerForm from '@/components/forms/CustomerForm.vue'

// ===== Types & Interfaces =====
/**
 * Customer type for the customer list and form.
 */
interface Customer {
  name: string
  phone: string
  email: string
  location: string
}

// ===== Constants & Config =====
/**
 * Default empty customer for new entries.
 */
const emptyCustomer: Customer = {
  name: '',
  phone: '',
  email: '',
  location: ''
}

// ===== Main Logic =====
// Local mock customer data (replace with Pinia/store or API later)
const customers = ref<Customer[]>([
  { name: 'Ama Serwaa', phone: '024 123 4567', email: 'ama@example.com', location: 'Kumasi' },
  { name: 'Kwame Mensah', phone: '020 987 6543', email: 'kwame@example.com', location: 'Accra' }
])

// State for showing the form and tracking which customer is being edited
const showForm = ref(false)
const editingCustomer = ref<Customer | null>(null)
const formError = ref('')

/**
 * Handles the "Add" button click.
 */
function onAdd() {
  editingCustomer.value = null // Use emptyCustomer for new customer
  showForm.value = true
}

/**
 * Handles the "Edit" button click.
 * @param customer - The customer to edit
 */
function onEdit(customer: Customer) {
  editingCustomer.value = { ...customer }
  showForm.value = true
}

/**
 * Handles the "Delete" button click.
 * @param customer - The customer to delete
 */
function onDelete(customer: Customer) {
  // Remove customer from list (mock logic)
  customers.value = customers.value.filter(c => c.phone !== customer.phone)
}

/**
 * Handles saving a customer (add or edit).
 * @param customer - The customer data from the form
 */
function onSave(customer: Customer) {
  // Simple validation (mock)
  if (!customer.name || !customer.phone) {
    formError.value = 'Please fill in all required fields.'
    return
  }
  formError.value = ''
  if (editingCustomer.value) {
    // Edit existing customer
    const idx = customers.value.findIndex(c => c.phone === editingCustomer.value?.phone)
    if (idx !== -1) customers.value[idx] = { ...customer }
  } else {
    // Add new customer
    customers.value.push({ ...customer })
  }
  showForm.value = false
}

/**
 * Handles canceling the form.
 */
function onCancel() {
  showForm.value = false
  formError.value = ''
}
</script>

<!--
  ===== Styling Notes =====
  - Mobile-first, max-w-md for mobile, centered content.
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: aria-labels, clear feedback.
-->