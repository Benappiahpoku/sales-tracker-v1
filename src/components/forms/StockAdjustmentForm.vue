<!--
  StockAdjustmentForm.vue
  Stratonea/Sales Tracker - Form for adding/adjusting stock.
  - Mobile-first, Ghana-optimized, offline-friendly
  - Uses Tailwind utility classes for styling
  - Follows Stratonea guidelines (see copilot-instructions.md)
  - Uses mock/static data for now (replace with real data later)
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <form class="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto my-4 flex flex-col gap-4" @submit.prevent="onSubmit"
    aria-label="Stock Adjustment Form" autocomplete="off">
    <!-- Product Name (read-only or select) -->
    <div>
      <label for="product-name" class="block text-sm font-medium text-gray-700 mb-1">
        Product
      </label>
      <input id="product-name" type="text" v-model="form.productName" readonly
        class="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-base shadow-sm min-h-[48px]"
        aria-label="Product Name" />
    </div>

    <!-- Adjustment Type -->
    <div>
      <label for="adjustment-type" class="block text-sm font-medium text-gray-700 mb-1">
        Adjustment Type
      </label>
      <select id="adjustment-type" v-model="form.type" required
        class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px]"
        aria-label="Adjustment Type">
        <option value="" disabled>Select type</option>
        <option value="restock">Restock</option>
        <option value="remove">Remove</option>
        <option value="correction">Correction</option>
      </select>
    </div>

    <!-- Quantity -->
    <div>
      <label for="adjustment-qty" class="block text-sm font-medium text-gray-700 mb-1">
        Quantity
      </label>
      <input id="adjustment-qty" type="number" v-model.number="form.quantity" min="1" step="1" required
        class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px]"
        placeholder="Enter quantity" autocomplete="off" aria-label="Quantity" />
    </div>

    <!-- Reason (optional) -->
    <div>
      <label for="adjustment-reason" class="block text-sm font-medium text-gray-700 mb-1">
        Reason (optional)
      </label>
      <input id="adjustment-reason" type="text" v-model="form.reason"
        class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px]"
        placeholder="e.g. Damaged, Expired, Correction" autocomplete="off" aria-label="Reason" />
    </div>

    <!-- Error Message -->
    <p v-if="error" class="text-xs text-red-600 mt-1">{{ error }}</p>

    <!-- Action Buttons -->
    <div class="flex gap-3 mt-2">
      <button type="submit"
        class="flex-1 bg-primary text-white font-bold py-3 rounded-lg shadow min-h-[48px] hover:bg-primary-dark transition-colors"
        aria-label="Save Adjustment">
        Save
      </button>
      <button type="button"
        class="flex-1 bg-gray-200 text-gray-800 font-bold py-3 rounded-lg shadow min-h-[48px] hover:bg-gray-300 transition-colors"
        @click="onCancel" aria-label="Cancel">
        Cancel
      </button>
    </div>
  </form>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// ===== Types & Interfaces =====
/**
 * Props for StockAdjustmentForm
 * - initial: StockAdjustmentFormData (optional, for editing)
 * - error: string (optional error message)
 */
interface StockAdjustmentFormData {
  productName: string
  type: 'restock' | 'remove' | 'correction' | ''
  quantity: number
  reason: string
}

const props = withDefaults(
  defineProps<{
    initial?: StockAdjustmentFormData
    error?: string
  }>(),
  {
    initial: () => ({
      productName: 'Sample Product',
      type: '',
      quantity: 1,
      reason: ''
    }),
    error: ''
  }
)

// ===== Emits =====
/**
 * Emits events to parent for save/cancel actions.
 */
const emit = defineEmits<{
  (e: 'save', data: StockAdjustmentFormData): void
  (e: 'cancel'): void
}>()

// ===== Main Logic =====
/**
 * Local reactive form state, initialized from props.initial.
 */
const form = reactive<StockAdjustmentFormData>({ ...props.initial })

/**
 * Handles form submission and emits save event.
 */
function onSubmit() {
  emit('save', { ...form })
}

/**
 * Handles cancel action.
 */
function onCancel() {
  emit('cancel')
}
</script>

<!--
  ===== Styling Notes =====
  - All inputs are touch-optimized (min-h-[48px]), large tap area for mobile.
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: label, aria-label, error feedback.
-->