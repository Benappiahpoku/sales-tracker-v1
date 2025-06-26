<!--
  SalesCard.vue
  Stratonea/Sales Tracker - Component for displaying a single sale with actions.
  - Mobile-first, touch-optimized, Ghana-optimized
  - Uses Tailwind utility classes for styling
  - Follows Stratonea guidelines (see copilot-instructions.md)
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <div
    class="flex flex-col bg-white rounded-lg shadow p-4 mb-2 min-h-[64px] hover:bg-gray-50 transition-colors"
    aria-label="Sale Item" role="listitem">
    <!-- Main Info Row -->
    <div class="flex items-center gap-4">
      <!-- Sale Icon (placeholder for now) -->
      <div class="flex-shrink-0 w-12 h-12 bg-gray-200 rounded stratonea flex items-center justify-center">
        <span class="text-gray-400 text-xl" aria-hidden="true">💰</span>
      </div>
      <!-- Sale Info -->
      <div class="flex-1 min-w-0">
        <div class="flex justify-between items-center">
          <span class="font-bold text-base text-gray-900 truncate">{{ customer || 'Unknown Customer' }}</span>
          <span class="text-sm font-bold text-primary">{{ formatCurrency(amount || 0) }}</span>
        </div>
        <div class="flex justify-between items-end mt-1">
          <span class="text-sm text-gray-700">Date: <span class="font-semibold">{{ formatDate(date || new Date().toISOString()) }}</span></span>
          <span class="text-xs text-gray-500">#{{ id || '---' }}</span>
        </div>
      </div>
    </div>

    <!-- ===== [New Feature] START ===== -->
    <!-- Action Buttons: View & Delete -->
    <div class="flex flex-col gap-2 mt-4">
      <button
        @click="onView"
        class="w-full min-h-[48px] bg-primary text-white rounded-lg font-bold text-base shadow-sm hover:bg-primary-dark transition-colors"
        aria-label="View sale details"
      >
        View
      </button>
      <button
        @click="onDelete"
        class="w-full min-h-[48px] bg-red-600 text-white rounded-lg font-bold text-base shadow-sm hover:bg-red-700 transition-colors"
        aria-label="Delete sale"
      >
        Delete
      </button>
    </div>
    <!-- ===== [New Feature] END ===== -->
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
/**
 * Props for SalesCard
 * - id: string (sale ID)
 * - date: string (sale date)
 * - customer: string (customer name)
 * - amount: number (sale amount)
 */
withDefaults(
  defineProps<{
    id?: string
    date?: string
    customer?: string
    amount?: number
  }>(),
  {
    id: '001',
    date: new Date().toISOString(),
    customer: 'Ama Serwaa',
    amount: 0 // Changed default to 0 for safer number handling
  }
)

// ===== Emits =====
/**
 * Emits 'view' and 'delete' events to parent.
 */
const emit = defineEmits<{
  (e: 'view'): void
  (e: 'delete'): void
}>()

// ===== Main Logic =====
/**
 * Emit view event when View button is clicked.
 */
function onView() {
  emit('view')
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
 * Always expects a number (use default 0 for undefined).
 * @param amount - The amount to format
 * @returns string (e.g., GHS 10.00)
 */
function formatCurrency(amount: number): string {
  return `GHS ${amount.toFixed(2)}`
}

/**
 * Formats a date string for display.
 * Always expects a valid date string (use current date for undefined).
 * @param dateString - The date string to format
 * @returns string (formatted date)
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
</script>

<!--
  ===== Styling Notes =====
  - Card is touch-optimized (min-h-[64px]), large tap area for mobile.
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: aria-label, role="listitem", semantic markup.
  - Placeholder emoji for sale icon (replace with real icon later).
  - Action buttons now part of card for full reusability.
-->