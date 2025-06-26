<!--
  InvoiceCard.vue
  Stratonea/Sales Tracker - Component for displaying a single invoice with actions.
  - Mobile-first, touch-optimized, Ghana-optimized
  - Uses Tailwind utility classes for styling
  - Follows Stratonea guidelines (see copilot-instructions.md)
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <div
    class="flex flex-col bg-white rounded-lg shadow p-4 mb-2 min-h-[64px] hover:bg-gray-50 transition-colors"
    aria-label="Invoice Item" role="listitem">
    <!-- Main Info Row -->
    <div class="flex items-center gap-4">
      <!-- Invoice Icon (placeholder for now) -->
      <div class="flex-shrink-0 w-12 h-12 bg-gray-200 rounded stratonea flex items-center justify-center">
        <span class="text-gray-400 text-xl" aria-hidden="true">📄</span>
      </div>
      <!-- Invoice Info -->
      <div class="flex-1 min-w-0">
        <div class="flex justify-between items-center">
          <span class="font-bold text-base text-gray-900 truncate">{{ customer || 'Unknown Customer' }}</span>
          <span class="text-sm font-bold text-primary">{{ formatCurrency(amount || 0) }}</span>
        </div>
        <div class="flex justify-between items-end mt-1">
          <span class="text-sm text-gray-700">
            <span class="font-semibold">#{{ number || '---' }}</span>
          </span>
          <span :class="[
            'text-xs font-medium px-2 py-1 rounded-full',
            status === 'Paid' ? 'bg-green-100 text-green-800' :
            status === 'Unpaid' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          ]">
            {{ status }}
          </span>
        </div>
      </div>
    </div>

    <!-- ===== [New Feature] START ===== -->
    <!-- Action Buttons: View & Share -->
    <div class="flex flex-col gap-2 mt-4">
      <button
        @click="onView"
        class="w-full min-h-[48px] bg-primary text-white rounded-lg font-bold text-base shadow-sm hover:bg-primary-dark transition-colors"
        aria-label="View invoice details"
      >
        View
      </button>
      <button
        @click="onShare"
        class="w-full min-h-[48px] bg-green-600 text-white rounded-lg font-bold text-base shadow-sm hover:bg-green-700 transition-colors"
        aria-label="Share invoice via WhatsApp"
      >
        Share via WhatsApp
      </button>
    </div>
    <!-- ===== [New Feature] END ===== -->
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
/**
 * Props for InvoiceCard
 * - number: string (invoice number)
 * - customer: string (customer name)
 * - amount: number (invoice amount)
 * - status: 'Paid' | 'Unpaid' | 'Overdue' (invoice status)
 */
withDefaults(
  defineProps<{
    id?: string
    number?: string
    customer?: string
    amount?: number
    status?: 'Paid' | 'Unpaid' | 'Overdue'
  }>(),
  {
    id: '001', 
    number: 'INV-001',
    customer: 'Unknown Customer',
    amount: 0,
    status: 'Unpaid'
  }
)

// ===== Emits =====
/**
 * Emits 'view' and 'share' events to parent.
 */
const emit = defineEmits<{
  (e: 'view'): void
  (e: 'share'): void
}>()

// ===== Main Logic =====
/**
 * Emit view event when View button is clicked.
 */
function onView() {
  emit('view')
}

/**
 * Emit share event when Share button is clicked.
 */
function onShare() {
  emit('share')
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
  - Placeholder emoji for invoice icon (replace with real icon later).
  - Action buttons now part of card for full reusability.
-->