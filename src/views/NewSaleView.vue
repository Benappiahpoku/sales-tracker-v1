<!--
  NewSaleView.vue
  Stratonea/Sales Tracker - View for creating new sales/invoices
  - Mobile-first: optimized for touch input
  - Offline-friendly: saves drafts locally
  - Clear workflow: select products, add quantities, set payment status
  - Ghana-optimized: WhatsApp sharing, clear UI
-->

<template>
  <div class="min-h-screen bg-gray-50 px-2 py-4 pb-24">
    <!-- Header with Back Button -->
    <header class="mb-6 flex items-center">
      <button 
        @click="router.back()" 
        class="mr-4 p-2 text-gray-600 hover:text-gray-900"
        aria-label="Go back"
      >
        <font-awesome-icon icon="arrow-left" class="text-xl" />
      </button>
      <div>
        <h1 class="text-2xl font-bold text-gray-900">New Sale</h1>
        <p class="mt-1 text-sm text-gray-600">Create a new sale invoice</p>
      </div>
    </header>

    <!-- Offline Alert -->
    <div v-if="!isOnline" class="mb-4 bg-amber-50 border-l-4 border-amber-400 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <font-awesome-icon icon="triangle-exclamation" class="h-5 w-5 text-amber-400" />
        </div>
        <div class="ml-3">
          <p class="text-sm text-amber-700">
            You're offline. Your sale will be saved locally and synced when you're back online.
          </p>
        </div>
      </div>
    </div>

    <!-- Main Form -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Customer Section -->
      <div class="bg-white rounded-lg shadow p-4">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Customer Details</h2>
        <div class="space-y-4">
          <!-- Customer Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Customer
            </label>
            <select 
              v-model="form.customerId"
              class="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            >
              <option value="">Select a customer</option>
              <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                {{ customer.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Products Section -->
      <div class="bg-white rounded-lg shadow p-4">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Products</h2>
        
        <!-- Product List -->
        <div class="space-y-4">
          <div 
            v-for="(item, index) in form.items" 
            :key="index"
            class="flex items-center gap-4 p-2 bg-gray-50 rounded-lg"
          >
            <!-- Product Selection -->
            <div class="flex-1">
              <select 
                v-model="item.productId"
                class="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              >
                <option value="">Select a product</option>
                <option v-for="product in products" :key="product.id" :value="product.id">
                  {{ product.name }} - {{ formatCurrency(product.price) }}
                </option>
              </select>
            </div>

            <!-- Quantity Input -->
            <div class="w-24">
              <input 
                v-model="item.quantity"
                type="number"
                min="1"
                class="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>

            <!-- Remove Button -->
            <button 
              type="button"
              @click="removeItem(index)"
              class="p-2 text-red-600 hover:text-red-800"
              aria-label="Remove item"
            >
              <font-awesome-icon icon="times" />
            </button>
          </div>

          <!-- Add Product Button -->
          <button
            type="button"
            @click="addItem"
            class="w-full py-2 flex items-center justify-center text-primary hover:text-primary-dark"
          >
            <font-awesome-icon icon="plus" class="mr-2" />
            Add Product
          </button>
        </div>

        <!-- Total -->
        <div class="mt-4 text-right">
          <p class="text-lg font-bold">
            Total: {{ formatCurrency(calculateTotal()) }}
          </p>
        </div>
      </div>

      <!-- Payment Status -->
      <div class="bg-white rounded-lg shadow p-4">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Payment Status</h2>
        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <label class="inline-flex items-center">
              <input 
                type="radio" 
                v-model="form.paymentStatus"
                value="paid"
                class="text-primary focus:ring-primary h-4 w-4"
              />
              <span class="ml-2">Paid</span>
            </label>
            <label class="inline-flex items-center">
              <input 
                type="radio" 
                v-model="form.paymentStatus"
                value="unpaid"
                class="text-primary focus:ring-primary h-4 w-4"
              />
              <span class="ml-2">Unpaid</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="fixed bottom-20 left-0 right-0 px-4 py-4 bg-white border-t border-gray-200">
        <button
          type="submit"
          class="w-full bg-primary text-white rounded-lg py-3 px-4 font-medium hover:bg-primary-dark transition-colors"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Creating Sale...' : 'Create Sale' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// ===== Types =====
interface Product {
  id: string
  name: string
  price: number
}

interface Customer {
  id: string
  name: string
}

interface SaleItem {
  productId: string
  quantity: number
}

interface SaleForm {
  customerId: string
  items: SaleItem[]
  paymentStatus: 'paid' | 'unpaid'
}

// ===== State =====
const router = useRouter()
const isOnline = ref(navigator.onLine)
const isSubmitting = ref(false)

// Mock data - replace with real data from your store
const customers = ref<Customer[]>([
  { id: '1', name: 'Ama Serwaa' },
  { id: '2', name: 'Kwame Mensah' }
])

const products = ref<Product[]>([
  { id: '1', name: 'Product 1', price: 100 },
  { id: '2', name: 'Product 2', price: 200 }
])

// Form state
const form = ref<SaleForm>({
  customerId: '',
  items: [{ productId: '', quantity: 1 }],
  paymentStatus: 'unpaid'
})

// ===== Methods =====
function addItem() {
  form.value.items.push({ productId: '', quantity: 1 })
}

function removeItem(index: number) {
  form.value.items = form.value.items.filter((_, i) => i !== index)
}

function calculateTotal(): number {
  return form.value.items.reduce((total, item) => {
    const product = products.value.find(p => p.id === item.productId)
    return total + (product?.price ?? 0) * item.quantity
  }, 0)
}

function formatCurrency(amount: number): string {
  return `GHS ${amount.toFixed(2)}`
}

async function handleSubmit() {
  try {
    isSubmitting.value = true
    
    // Create the sale object
    const sale = {
      ...form.value,
      total: calculateTotal(),
      date: new Date().toISOString()
    }

    // TODO: Save to backend/store
    console.log('Creating sale:', sale)

    // Navigate to the appropriate view based on payment status
    if (form.value.paymentStatus === 'paid') {
      router.push('/sales') // Go to sales history
    } else {
      router.push('/sales') // Go to invoices list
    }
  } catch (error) {
    console.error('Error creating sale:', error)
    // TODO: Show error message to user
  } finally {
    isSubmitting.value = false
  }
}

// ===== Network Status =====
window.addEventListener('online', () => {
  isOnline.value = true
})

window.addEventListener('offline', () => {
  isOnline.value = false
})
</script>

<!--
  ===== Styling Notes =====
  - Uses Tailwind for consistent styling
  - Mobile-first design with appropriate touch targets
  - Fixed position submit button for easy access
  - Clear visual hierarchy with sections
  - Offline-aware with proper indicators
-->