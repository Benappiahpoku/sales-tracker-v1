<!--
  ProductCard.vue
  Stratonea/Sales Tracker - Component for displaying a single product item with actions.
  - Mobile-first, touch-optimized, Ghana-optimized
  - Uses Tailwind utility classes for styling
  - Follows Stratonea guidelines (see copilot-instructions.md)
  - Emits 'edit' and 'delete' events for parent handling
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <div
    class="flex items-center gap-4 bg-white rounded-lg shadow p-4 mb-2 min-h-[64px] hover:bg-gray-50 transition-colors"
    aria-label="Product Item" role="listitem">
    <!-- Product Image (optional, placeholder for now) -->
    <div class="flex-shrink-0 w-12 h-12 bg-gray-200 rounded stratonea flex items-center justify-center">
      <span class="text-gray-400 text-xl" aria-hidden="true">📦</span>
    </div>
    <!-- Product Info -->
    <div class="flex-1 min-w-0">
      <div class="flex justify-between items-center">
        <span class="font-bold text-base text-gray-900 truncate">{{ name }}</span>
        <span class="text-xs text-gray-500">{{ sku }}</span>
      </div>
      <div class="flex justify-between items-end mt-1">
        <span class="text-sm text-gray-700">Stock: <span class="font-semibold">{{ stock }}</span></span>
        <span class="text-sm font-bold text-primary">{{ formatCurrency(price ?? 0) }}</span>
      </div>
      <!-- ===== [New Feature] START ===== -->
      <!-- Action Buttons: Edit & Delete, touch-optimized -->
      <div class="flex flex-col gap-2 mt-4">
        <button
          @click="onEdit"
          class="w-full min-h-[48px] bg-primary text-white rounded-lg font-bold text-base shadow-sm hover:bg-primary-dark transition-colors"
          aria-label="Edit product"
        >
          Edit
        </button>
        <button
          @click="onDelete"
          class="w-full min-h-[48px] bg-red-600 text-white rounded-lg font-bold text-base shadow-sm hover:bg-red-700 transition-colors"
          aria-label="Delete product"
        >
          Delete
        </button>
      </div>
      <!-- ===== [New Feature] END ===== -->
    </div>
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
/**
 * Props for ProductCard
 * - name: string (product name)
 * - sku: string (product SKU/code)
 * - price: number (product price)
 * - stock: number (current stock)
 */
withDefaults(
  defineProps<{
    name?: string
    sku?: string
    price?: number
    stock?: number
  }>(),
  {
    name: 'Sample Product',
    sku: 'SKU-001',
    price: 10,
    stock: 25
  }
)

// ===== Emits =====
/**
 * Emits 'edit' and 'delete' events to parent.
 */
const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'delete'): void
}>()

// ===== Main Logic =====
/**
 * Emit edit event when Edit button is clicked.
 */
function onEdit() {
  emit('edit')
}

/**
 * Emit delete event when Delete button is clicked.
 */
function onDelete() {
  emit('delete')
}

// ===== Helper Functions =====
/**
 * Formats a number as Ghanaian currency (GHS).
 * @param amount - The amount to format
 * @returns string (e.g., GHS 10.00)
 */
function formatCurrency(amount: number): string {
  return `GHS ${amount.toFixed(2)}`
}
</script>

<!--
  ===== Styling Notes =====
  - Card is touch-optimized (min-h-[64px]), large tap area for mobile.
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: aria-label, role="listitem", semantic markup.
  - Placeholder emoji for product image (replace with real image later).
  - Buttons are part of the card for full reusability.
-->