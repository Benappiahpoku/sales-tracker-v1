<!--
  StockItem.vue
  Stratonea/Sales Tracker - Component for displaying a single stock item (stock movement or product stock).
  - Mobile-first, touch-optimized, Ghana-optimized
  - Uses Tailwind utility classes for styling
  - Follows Stratonea guidelines (see copilot-instructions.md)
  - Uses mock/static data for now (replace with real data later)
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <div
    class="flex items-center gap-4 bg-white rounded-lg shadow p-4 mb-2 min-h-[64px] hover:bg-gray-50 transition-colors"
    aria-label="Stock Item" role="listitem">
    <!-- Stock Icon (placeholder for now) -->
    <div class="flex-shrink-0 w-12 h-12 bg-gray-200 rounded stratonea flex items-center justify-center">
      <span class="text-gray-400 text-xl" aria-hidden="true">📦</span>
    </div>
    <!-- Stock Info -->
    <div class="flex-1 min-w-0">
      <div class="flex justify-between items-center">
        <span class="font-bold text-base text-gray-900 truncate">{{ productName }}</span>
        <span class="text-xs text-gray-500">{{ sku }}</span>
      </div>
      <div class="flex justify-between items-end mt-1">
        <span class="text-sm text-gray-700">Change: <span :class="changeClass">{{ change ?? 0 > 0 ? '+' : '' }}{{ change
            }}</span></span>
        <span class="text-sm font-bold text-primary">Stock: {{ stock }}</span>
      </div>
      <div class="flex justify-between text-xs text-gray-400 mt-1">
        <span>{{ date }}</span>
        <span>{{ reason }}</span>
      </div>
    </div>
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">

import { computed } from 'vue'
// ===== Types & Interfaces =====
/**
 * Props for StockItem
 * - productName: string (product name)
 * - sku: string (product SKU/code)
 * - stock: number (current stock after movement)
 * - change: number (stock change, positive or negative)
 * - date: string (date of movement)
 * - reason: string (reason for stock change)
 */
const props = withDefaults(
  defineProps<{
    productName?: string
    sku?: string
    stock?: number
    change?: number
    date?: string
    reason?: string
  }>(),
  {
    productName: 'Sample Product',
    sku: 'SKU-001',
    stock: 25,
    change: +10,
    date: '2025-06-25',
    reason: 'Restock'
  }
)

// ===== Helper Functions =====
/**
 * Returns a Tailwind class for positive or negative stock change.
 * @returns string
 */
const changeClass = computed(() =>
  props.change && props.change > 0
    ? 'text-green-600 font-bold'
    : props.change && props.change < 0
      ? 'text-red-600 font-bold'
      : 'text-gray-700'
)
</script>

<!--
  ===== Styling Notes =====
  - Card is touch-optimized (min-h-[64px]), large tap area for mobile.
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: aria-label, role="listitem", semantic markup.
  - Placeholder emoji for stock icon (replace with real image later).
  - Color-coded change: green for positive, red for negative, gray for zero.
-->