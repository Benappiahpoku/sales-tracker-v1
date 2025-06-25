<!--
  StockView.vue
  Stratonea/BizPoint - Main view for managing stock/inventory.
  - Ghana-optimized: mobile-first, offline-friendly, simple UI
  - Uses StockList and StockAdjustmentForm components
  - Handles add/edit stock logic with mock data for now
  - Follows Stratonea guidelines and file structure
-->

<template>


  <!-- ===== Main Content ===== -->
  <div class="max-w-md mx-auto">
    <!-- Stock List (shows when not adding/editing) -->
    <StockList v-if="!showForm" :stock="stock" @add="onAdd" @edit="onEdit" @delete="onDelete" />

    <!-- Stock Adjustment Form (shows when adding/editing) -->
    <StockAdjustmentForm v-if="showForm" :initial="formInitial" :error="formError" @save="onSave" @cancel="onCancel" />
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import { ref, computed } from 'vue'

import StockList from '@/components/lists/StockList.vue'
import StockAdjustmentForm from '@/components/forms/StockAdjustmentForm.vue'


// ===== Types & Interfaces =====
/**
 * Stock item type for the stock list.
 */
interface StockItem {
  id: string
  productName: string
  sku: string
  stock: number
  change: number
  reason: string
  type: 'restock' | 'remove' | 'correction' | ''
}

/**
 * StockAdjustmentFormData type for the adjustment form.
 */
interface StockAdjustmentFormData {
  productName: string
  type: 'restock' | 'remove' | 'correction' | ''
  quantity: number
  reason: string
}

// ===== Constants & Config =====
/**
 * Default empty stock adjustment for new entries.
 */


// ===== Main Logic =====
// Local mock stock data (replace with Pinia/store or API later)
const stock = ref<StockItem[]>([
  { id: '1', productName: 'Sample Product', sku: 'SKU-001', stock: 25, change: +10, reason: 'Restock', type: 'restock' },
  { id: '2', productName: 'Another Product', sku: 'SKU-002', stock: 10, change: -5, reason: 'Sold', type: 'remove' }
])

// State for showing the form and tracking which stock item is being edited
const showForm = ref(false)
const editingStock = ref<StockItem | null>(null)
const formError = ref('')

/**
 * Computed: Maps editingStock or emptyStock to StockAdjustmentFormData for the form.
 */
const formInitial = computed<StockAdjustmentFormData>(() => {
  if (editingStock.value) {
    // Map StockItem to StockAdjustmentFormData for editing
    return {
      productName: editingStock.value.productName,
      type: editingStock.value.type,
      quantity: Math.abs(editingStock.value.change) || 1,
      reason: editingStock.value.reason
    }
  }
  // For new entry, provide empty/defaults
  return {
    productName: '',
    type: '',
    quantity: 1,
    reason: ''
  }
})

/**
 * Handles the "Add" button click.
 */
function onAdd() {
  editingStock.value = null // Use empty for new adjustment
  showForm.value = true
}

/**
 * Handles the "Edit" button click.
 * @param item - The stock item to edit
 */
function onEdit(item: StockItem) {
  editingStock.value = { ...item }
  showForm.value = true
}

/**
 * Handles the "Delete" button click.
 * @param item - The stock item to delete
 */
function onDelete(item: StockItem) {
  // Remove stock item from list (mock logic)
  stock.value = stock.value.filter(s => s.id !== item.id)
}

/**
 * Handles saving a stock adjustment (add or edit).
 * @param data - The stock data from the form (StockAdjustmentFormData)
 */
function onSave(data: StockAdjustmentFormData) {
  // Simple validation (mock)
  if (!data.productName || !data.type) {
    formError.value = 'Please fill in all required fields.'
    return
  }
  formError.value = ''
  if (editingStock.value) {
    // Edit existing stock item
    const idx = stock.value.findIndex(s => s.id === editingStock.value?.id)
    if (idx !== -1) {
      // Update the stock item with new values
      stock.value[idx] = {
        ...stock.value[idx],
        productName: data.productName,
        type: data.type,
        change: data.type === 'remove' ? -Math.abs(data.quantity) : Math.abs(data.quantity),
        reason: data.reason
      }
    }
  } else {
    // Add new stock item (generate mock id)
    stock.value.push({
      id: Date.now().toString(),
      productName: data.productName,
      sku: '', // Could be selected/filled in a real app
      stock: 0, // Would be calculated in a real app
      change: data.type === 'remove' ? -Math.abs(data.quantity) : Math.abs(data.quantity),
      reason: data.reason,
      type: data.type
    })
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