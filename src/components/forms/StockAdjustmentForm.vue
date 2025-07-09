<!--
  StockAdjustmentForm.vue
  Stratonea/Sales Tracker - Modern stock adjustment form for adding/editing stock changes
  - Mobile-first design matching StockCard and dashboard style
  - Ghana-optimized: offline support, touch targets, clear validation
  - Enhanced UX with icons, stock level indicators, and loading states
  - Follows Stratonea guidelines with comprehensive documentation
-->

<template>
  <!-- ===== Stock Adjustment Form Card ===== -->
  <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
    <!-- ===== Form Header ===== -->
    <div class="flex items-center mb-6">
      <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
        <font-awesome-icon :icon="isEditing ? 'box-open' : 'plus'" class="text-primary-600" />
      </div>
      <div>
        <h2 class="text-xl font-bold text-gray-900">
          {{ isEditing ? 'Edit Stock Adjustment' : 'New Stock Adjustment' }}
        </h2>
        <p class="text-sm text-gray-600">
          {{ isEditing ? 'Update stock adjustment details' : 'Record a stock change for tracking' }}
        </p>
      </div>
    </div>

    <!-- ===== Stock Adjustment Form ===== -->
    <form @submit.prevent="onSubmit" class="space-y-4" autocomplete="off">
      
      <!-- Product Selection/Display -->
      <div>
        <label for="product-name" class="flex items-center text-sm font-medium text-gray-700 mb-2">
          <font-awesome-icon icon="box" class="mr-2 text-gray-400 w-4" />
          Product *
        </label>
        <div v-if="isProductFixed" class="relative">
          <input 
            id="product-name" 
            type="text" 
            :value="form.productName"
            readonly
            class="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-base shadow-sm min-h-[48px] transition-colors duration-200"
            aria-label="Product Name"
          />
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{{ form.productSku }}</span>
          </div>
        </div>
        <select 
          v-else
          id="product-select" 
          v-model="selectedProductId"
          @change="onProductChange"
          required
          class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px] transition-colors duration-200"
        >
          <option value="">Select a product...</option>
          <option v-for="product in availableProducts" :key="product.id" :value="product.id">
            {{ product.name }} ({{ product.sku }}) - {{ product.currentStock }} units
          </option>
        </select>
      </div>

      <!-- Current Stock Display -->
      <div v-if="form.productName" class="bg-gray-50 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-700">Current Stock Level:</span>
          <div class="flex items-center">
            <span class="text-lg font-bold text-gray-900 mr-2">{{ currentStock }} units</span>
            <div 
              :class="[
                'w-3 h-3 rounded-full',
                currentStock <= 0 ? 'bg-red-500' :
                currentStock <= LOW_STOCK_THRESHOLD ? 'bg-orange-500' :
                'bg-green-500'
              ]"
            ></div>
          </div>
        </div>
        <div v-if="currentStock <= LOW_STOCK_THRESHOLD" class="mt-2 text-xs text-orange-600">
          {{ currentStock <= 0 ? 'Out of stock' : 'Low stock level' }}
        </div>
      </div>

      <!-- Adjustment Type -->
      <div>
        <label for="adjustment-type" class="flex items-center text-sm font-medium text-gray-700 mb-2">
          <font-awesome-icon icon="exchange-alt" class="mr-2 text-gray-400 w-4" />
          Adjustment Type *
        </label>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
          <label 
            v-for="type in adjustmentTypes" 
            :key="type.value"
            class="relative cursor-pointer"
          >
            <input 
              type="radio" 
              :value="type.value" 
              v-model="form.changeType"
              class="sr-only"
              required
            />
            <div 
              :class="[
                'flex flex-col items-center justify-center p-3 rounded-lg border-2 text-sm font-medium min-h-[64px] transition-all duration-200',
                form.changeType === type.value 
                  ? `border-${type.color}-500 bg-${type.color}-50 text-${type.color}-700`
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              ]"
            >
              <font-awesome-icon :icon="type.icon" class="mb-1" />
              <span class="text-xs">{{ type.label }}</span>
            </div>
          </label>
        </div>
      </div>

      <!-- Quantity -->
      <div>
        <label for="adjustment-qty" class="flex items-center text-sm font-medium text-gray-700 mb-2">
          <font-awesome-icon icon="hashtag" class="mr-2 text-gray-400 w-4" />
          Quantity *
        </label>
        <input 
          id="adjustment-qty" 
          type="number" 
          v-model.number="form.quantity"
          min="1"
          step="1"
          required
          class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px] transition-colors duration-200"
          placeholder="Enter quantity"
          autocomplete="off"
          :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': errors.quantity }"
        />
        <p v-if="errors.quantity" class="text-xs text-red-600 mt-1">{{ errors.quantity }}</p>
        
        <!-- Stock Level Preview -->
        <div v-if="form.quantity > 0 && form.changeType" class="mt-2 p-2 bg-blue-50 rounded text-xs">
          <span class="text-blue-700">
            After adjustment: {{ calculatedNewStock }} units
            <span v-if="calculatedNewStock < 0" class="text-red-600 font-medium ml-1">
              (Insufficient stock!)
            </span>
          </span>
        </div>
      </div>

      <!-- Reason -->
      <div>
        <label for="adjustment-reason" class="flex items-center text-sm font-medium text-gray-700 mb-2">
          <font-awesome-icon icon="comment" class="mr-2 text-gray-400 w-4" />
          Reason
          <span class="text-gray-400 ml-1">(optional)</span>
        </label>
        <input 
          id="adjustment-reason" 
          type="text" 
          v-model="form.reason"
          class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px] transition-colors duration-200"
          placeholder="e.g., Damaged goods, Stock correction, New delivery"
          autocomplete="off"
        />
        <p class="text-xs text-gray-500 mt-1">Add a note to help track why this adjustment was made</p>
      </div>

      <!-- Date (for editing existing adjustments) -->
      <div v-if="isEditing">
        <label for="adjustment-date" class="flex items-center text-sm font-medium text-gray-700 mb-2">
          <font-awesome-icon icon="calendar" class="mr-2 text-gray-400 w-4" />
          Adjustment Date
        </label>
        <input 
          id="adjustment-date" 
          type="datetime-local" 
          v-model="form.timestamp"
          class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px] transition-colors duration-200"
        />
        <p class="text-xs text-gray-500 mt-1">When this adjustment was made</p>
      </div>

      <!-- Form Actions -->
      <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
        <!-- Save Button -->
        <button 
          type="submit"
          :disabled="isSubmitting || !isFormValid || calculatedNewStock < 0"
          class="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] transition-all duration-200 active:scale-98"
        >
          <font-awesome-icon 
            :icon="isSubmitting ? 'spinner' : 'save'" 
            :class="{ 'animate-spin': isSubmitting }"
            class="mr-2" 
          />
          {{ isSubmitting ? 'Saving...' : (isEditing ? 'Update Adjustment' : 'Record Adjustment') }}
        </button>

        <!-- Cancel Button -->
        <button 
          type="button"
          @click="onCancel"
          :disabled="isSubmitting"
          class="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] transition-all duration-200 active:scale-98"
        >
          <font-awesome-icon icon="times" class="mr-2" />
          Cancel
        </button>
      </div>

      <!-- Offline Status Indicator -->
      <div v-if="!isOnline" class="flex items-center justify-center p-3 bg-orange-50 border border-orange-200 rounded-lg mt-4">
        <font-awesome-icon icon="wifi" class="text-orange-600 mr-2" />
        <span class="text-sm text-orange-700">Working offline - changes will sync when connected</span>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * StockAdjustmentForm.vue - Modern stock adjustment form component
 * - Comprehensive form for recording stock changes with validation
 * - Ghana-optimized: offline support, clear validation messages
 * - Mobile-first design with touch-optimized inputs
 * - Real-time stock calculation and validation
 */

// ===== Imports =====
import { reactive, ref, computed, onMounted } from 'vue'

// ===== Types & Interfaces =====
interface StockAdjustmentFormData {
  productName: string
  productSku: string
  changeType: 'restock' | 'sale' | 'adjustment' | 'correction' | 'damage' | 'transfer'
  quantity: number
  reason: string
  timestamp: string
  currentStock: number
}
interface Product {
  id: string
  name: string
  sku: string
  currentStock: number
}
interface AdjustmentType {
  value: 'restock' | 'sale' | 'adjustment' | 'correction' | 'damage' | 'transfer'
  label: string
  icon: string
  color: string
  direction: 'positive' | 'negative' | 'neutral'
}
interface FormErrors {
  quantity?: string
  changeType?: string
}

// ===== Props =====
const props = withDefaults(defineProps<{
  initial?: Partial<StockAdjustmentFormData>
  isEditing?: boolean
  isProductFixed?: boolean
  availableProducts?: Product[]
}>(), {
  initial: () => ({}),
  isEditing: false,
  isProductFixed: true,
  availableProducts: () => []
})

// ===== Emits =====
const emit = defineEmits<{
  (e: 'save', data: StockAdjustmentFormData): void
  (e: 'cancel'): void
}>()

// ===== Constants & Config =====
const LOW_STOCK_THRESHOLD = 10
const adjustmentTypes: AdjustmentType[] = [
  { value: 'restock', label: 'Restock', icon: 'plus', color: 'green', direction: 'positive' },
  { value: 'sale', label: 'Sale', icon: 'shopping-cart', color: 'blue', direction: 'negative' },
  { value: 'damage', label: 'Damage', icon: 'exclamation-triangle', color: 'red', direction: 'negative' },
  { value: 'correction', label: 'Correction', icon: 'edit', color: 'orange', direction: 'neutral' },
  { value: 'transfer', label: 'Transfer', icon: 'exchange-alt', color: 'purple', direction: 'negative' },
  { value: 'adjustment', label: 'Other', icon: 'cog', color: 'gray', direction: 'neutral' }
]

// ===== State Management =====
const form = reactive<StockAdjustmentFormData>({
  productName: '',
  productSku: '',
  changeType: 'restock',
  quantity: 1,
  reason: '',
  timestamp: new Date().toISOString().slice(0, 16),
  currentStock: 0,
  ...props.initial
})
const errors = reactive<FormErrors>({})
const isSubmitting = ref(false)
const isOnline = ref(navigator.onLine)
const selectedProductId = ref('')
const currentStock = ref(form.currentStock || 0)

// ===== Computed Properties =====
const isFormValid = computed(() => {
  return form.productName.trim() !== '' && 
         form.quantity > 0 &&
         Object.keys(errors).length === 0
})
const calculatedNewStock = computed(() => {
  if (!form.changeType || !form.quantity) return currentStock.value

  const adjustmentType = adjustmentTypes.find(t => t.value === form.changeType)
  if (!adjustmentType) return currentStock.value

  switch (adjustmentType.direction) {
    case 'positive':
      return currentStock.value + form.quantity
    case 'negative':
      return currentStock.value - form.quantity
    case 'neutral':
      return form.quantity // For corrections, set to exact quantity
    default:
      return currentStock.value
  }
})

// ===== Helper Functions =====
function validateForm(): boolean {
  Object.keys(errors).forEach(key => delete errors[key as keyof FormErrors])
  let isValid = true
  
  if (form.quantity <= 0) {
    errors.quantity = 'Quantity must be greater than 0'
    isValid = false
  }
  
  if (form.changeType !== 'correction' && calculatedNewStock.value < 0) {
    errors.quantity = 'This would result in negative stock. Reduce quantity or change adjustment type.'
    isValid = false
  }
  
  return isValid
}
function onProductChange() {
  const selectedProduct = props.availableProducts.find(p => p.id === selectedProductId.value)
  if (selectedProduct) {
    form.productName = selectedProduct.name
    form.productSku = selectedProduct.sku
    currentStock.value = selectedProduct.currentStock
    form.currentStock = selectedProduct.currentStock
  }
}

// ===== Event Handlers =====
async function onSubmit() {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const submissionData: StockAdjustmentFormData = {
      ...form,
      productName: form.productName.trim(),
      reason: form.reason.trim(),
      currentStock: calculatedNewStock.value
    }
    
    emit('save', submissionData)
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
function onCancel() {
  emit('cancel')
}

// ===== Lifecycle Hooks =====
onMounted(() => {
  window.addEventListener('online', () => { isOnline.value = true })
  window.addEventListener('offline', () => { isOnline.value = false })
  
  if (props.initial?.currentStock !== undefined) {
    currentStock.value = props.initial.currentStock
  }
  
  if (!props.isProductFixed) {
    const productSelect = document.getElementById('product-select')
    if (productSelect) productSelect.focus()
  } else {
    const quantityInput = document.getElementById('adjustment-qty')
    if (quantityInput) quantityInput.focus()
  }
})
</script>

<style scoped>
/* ===== Modern Form Styling ===== */
button:active { transform: scale(0.98); }
input:focus-visible, select:focus-visible, button:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}
input, select, button { transition: all 0.2s ease-in-out; }
.cursor-pointer:hover div { transform: translateY(-1px); }
.animate-spin { animation: spin 1s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@media (max-width: 640px) {
  .flex-col button { width: 100%; }
  .p-6 { padding: 1rem; }
  .grid-cols-2 { grid-template-columns: 1fr 1fr; gap: 0.5rem; }
}
</style>