<!--
  ReceiptList.vue
  Stratonea/Sales Tracker - Responsive receipt list with:
  - Mobile: Vertical card layout using ReceiptCard
  - Desktop: Horizontal table layout
  - Ghana-optimized: offline-friendly, touch targets
  - Uses Tailwind utility classes for styling
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <!-- Mobile Card Layout: Use ReceiptCard for each receipt -->
  <div class="block md:hidden">
    <div class="space-y-4 max-w-md mx-auto my-4">
      <ReceiptCard
        v-for="receipt in receipts"
        :key="receipt.id"
        :id="receipt.id"
        :number="receipt.number"
        :customer="receipt.customer"
        :amount="receipt.amount"
        :date="receipt.date"
        :item-count="receipt.itemCount"
        @view="onView(receipt)"
        @share="onShare(receipt)"
      />
    </div>
  </div>
  <!-- ===== [New Feature] END ===== -->

  <!-- Desktop Table Layout -->
  <table class="hidden md:table min-w-full border-separate border-spacing-0">
    <!-- Table Header -->
    <thead class="bg-gray-50">
      <tr>
        <th class="px-6 py-4 text-left">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-gray-600">Receipt #</span>
          </div>
        </th>
        <th class="px-6 py-4 text-left">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-gray-600">Customer</span>
          </div>
        </th>
        <th class="px-6 py-4 text-right">
          <div class="flex items-center justify-end gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-gray-600">Amount</span>
          </div>
        </th>
        <th class="px-6 py-4 text-center">
          <div class="flex items-center justify-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-gray-600">Items</span>
          </div>
        </th>
        <th class="px-6 py-4 text-center">
          <div class="flex items-center justify-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-gray-600">Date</span>
          </div>
        </th>
        <th class="px-6 py-4 text-right">
          <span class="text-xs font-bold uppercase tracking-wider text-gray-600">Actions</span>
        </th>
      </tr>
    </thead>

    <!-- Table Body -->
    <tbody class="divide-y divide-gray-200 bg-white">
      <tr v-for="receipt in receipts" :key="receipt.id"
        class="hover:bg-gray-50/50 transition-colors duration-150 ease-in-out">
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="font-medium text-gray-900">#{{ receipt.number }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">{{ receipt.customer }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right">
          <div class="text-sm font-medium text-gray-900">{{ formatCurrency(receipt.amount) }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-center">
          <div class="text-sm text-gray-900">{{ receipt.itemCount }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-center">
          <div class="text-sm text-gray-900">{{ formatDate(receipt.date) }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
          <button @click="onView(receipt)"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150">
            View
          </button>
          <button @click="onShare(receipt)"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150">
            Share
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Empty State -->
  <div v-if="(receipts?.length ?? 0) === 0" class="text-center py-12 bg-gray-50 border-t border-gray-200">
    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
    <h3 class="mt-2 text-sm font-medium text-gray-900">No receipts</h3>
    <p class="mt-1 text-sm text-gray-500">Get started by creating a new receipt.</p>
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import ReceiptCard from '@/components/layout/ReceiptCard.vue'

// ===== Types & Interfaces =====
/**
 * Receipt type for the receipt list.
 */
interface Receipt {
  id: string
  number: string
  customer: string
  amount: number
  date: string
  itemCount: number
}

// ===== Props =====
/**
 * Props for ReceiptList
 * - receipts: Receipt[] (array of receipts)
 */
withDefaults(
  defineProps<{
    receipts?: Receipt[]
  }>(),
  {
    receipts: () => [
      {
        id: '1',
        number: 'RCP-001',
        customer: 'Ama Serwaa',
        amount: 500,
        date: new Date().toISOString(),
        itemCount: 3
      },
      {
        id: '2',
        number: 'RCP-002',
        customer: 'Kwame Mensah',
        amount: 350,
        date: new Date().toISOString(),
        itemCount: 2
      }
    ]
  }
)

// ===== Emits =====
/**
 * Emits events to parent for view and share actions.
 */
const emit = defineEmits<{
  (e: 'view', receipt: Receipt): void
  (e: 'share', receipt: Receipt): void
}>()

// ===== Main Logic =====
/**
 * Handles view button click.
 * @param receipt - The receipt to view
 */
function onView(receipt: Receipt) {
  emit('view', receipt)
}

/**
 * Handles share button click.
 * @param receipt - The receipt to share
 */
function onShare(receipt: Receipt) {
  emit('share', receipt)
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

/**
 * Formats a date string for display.
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
  - Uses responsive classes (md:) for desktop/mobile switching
  - Mobile: Card layout with ReceiptCard component
  - Desktop: Table layout with horizontal rows
  - Consistent colors and spacing across both layouts
  - Touch-optimized for mobile, precise for desktop
-->