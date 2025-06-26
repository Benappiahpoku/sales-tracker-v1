<!--
  SalesList.vue
  Stratonea/Sales Tracker - Responsive sales list with:
  - Mobile: Vertical card layout
  - Desktop: Horizontal table layout
  - Ghana-optimized: offline-friendly, touch targets
  - Uses Tailwind utility classes for styling
-->

<template>
  <!-- Mobile Card Layout -->
  <div class="block md:hidden">
    <div class="space-y-4 max-w-md mx-auto my-4">
      <div v-for="sale in sales" :key="sale.id" class="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2">
        <!-- Sale Details: Stacked vertically for mobile -->
        <div class="flex flex-col gap-1 text-sm">
          <div class="flex justify-between">
            <span class="font-semibold text-gray-700">Date:</span>
            <span class="text-gray-900">{{ sale.date }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold text-gray-700">Customer:</span>
            <span class="text-gray-900">{{ sale.customer }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold text-gray-700">Amount:</span>
            <span class="text-gray-900">{{ formatCurrency(sale.amount) }}</span>
          </div>
        </div>

        <!-- Mobile Action Buttons -->
        <div class="flex flex-col gap-2 mt-2">
          <button @click="onView(sale)"
            class="w-full min-h-[48px] bg-primary text-white rounded-lg font-bold text-base shadow-sm hover:bg-primary-dark transition-colors">
            View
          </button>
          <button @click="onDelete(sale)"
            class="w-full min-h-[48px] bg-red-600 text-white rounded-lg font-bold text-base shadow-sm hover:bg-red-700 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Desktop Table Layout -->
  <table class="hidden md:table min-w-full border-separate border-spacing-0">

    <!-- Table Header -->
    <thead class="bg-gray-50">
      <tr>
        <th class="px-6 py-4 text-left">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-gray-600">Date</span>
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
        <th class="px-6 py-4 text-right">
          <span class="text-xs font-bold uppercase tracking-wider text-gray-600">Actions</span>
        </th>
      </tr>
    </thead>

    <!-- Table Body -->
    <tbody class="divide-y divide-gray-200 bg-white">
      <tr v-for="sale in sales" :key="sale.id" class="hover:bg-gray-50/50 transition-colors duration-150 ease-in-out">
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">{{ formatDate(sale.date) }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="font-medium text-gray-900">{{ sale.customer }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right">
          <div class="text-sm font-semibold text-gray-900">{{ formatCurrency(sale.amount) }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
          <button @click="onView(sale)"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150">
            View
          </button>
          <button @click="onDelete(sale)"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>


  <!-- Enhanced Empty State -->
  <div v-if="(sales?.length ?? 0) === 0" class="text-center py-12 bg-gray-50 border-t border-gray-200">
    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
    <h3 class="mt-2 text-sm font-medium text-gray-900">No sales records</h3>
    <p class="mt-1 text-sm text-gray-500">Get started by recording your first sale.</p>
  </div>

</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
/**
 * Sale type for the sales list.
 */
interface Sale {
  id: string
  date: string
  customer: string
  amount: number
}

// ===== Props =====
/**
 * Props for SalesList
 * - sales: Sale[] (array of sales)
 */
withDefaults(
  defineProps<{
    sales?: Sale[]
  }>(),
  {
    sales: () => [
      {
        id: '1',
        date: '2025-06-25',
        customer: 'Ama Serwaa',
        amount: 40
      },
      {
        id: '2',
        date: '2025-06-24',
        customer: 'Kwame Mensah',
        amount: 100
      }
    ]
  }
)

// ===== Emits =====
/**
 * Emits events to parent for view and delete actions.
 */
const emit = defineEmits<{
  (e: 'view', sale: Sale): void
  (e: 'delete', sale: Sale): void
}>()

// ===== Main Logic =====
/**
 * Handles view button click.
 * @param sale - The sale to view
 */
function onView(sale: Sale) {
  emit('view', sale)
}

/**
 * Handles delete button click.
 * @param sale - The sale to delete
 */
function onDelete(sale: Sale) {
  emit('delete', sale)
}

/**
 * Formats a number as Ghanaian currency (GHS).
 * @param amount - The amount to format
 * @returns string (e.g., GHS 10.00)
 */
function formatCurrency(amount: number): string {
  return `GHS ${amount.toFixed(2)}`
}

/**
 * Formats a date string for better display.
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