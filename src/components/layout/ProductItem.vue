<!--
  ProductItem.vue
  Stratonea/BizPoint - Component for displaying a single product item.
  - Mobile-first, touch-optimized, Ghana-optimized
  - Uses Tailwind utility classes for styling
  - Follows Stratonea guidelines (see copilot-instructions.md)
  - Uses mock/static data for now (replace with real data later)
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <div
    class="flex items-center gap-4 bg-white rounded-lg shadow p-4 mb-2 min-h-[64px] hover:bg-gray-50 transition-colors"
    aria-label="Product Item"
    role="listitem"
  >
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
    </div>
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
/**
 * Props for ProductItem
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
-->