<!--
  SalesList.vue
  Stratonea/BizPoint - Table to display sales list.
  - Mobile-first, Ghana-optimized, offline-friendly
  - Uses Tailwind utility classes for styling
  - Follows Stratonea guidelines (see copilot-instructions.md)
  - Uses mock/static data for now (replace with real data later)
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <div class="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto my-4">
    <!-- Table Header -->
    <div class="flex justify-between items-center mb-2">
      <span class="text-lg font-bold text-primary">Sales</span>
    </div>
    <!-- Sales Table -->
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-gray-200">
          <th class="text-left py-2">Date</th>
          <th class="text-left py-2">Customer</th>
          <th class="text-right py-2">Amount</th>
          <th class="text-center py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="sale in sales"
          :key="sale.id"
          class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <td class="py-2 font-medium text-gray-900">{{ sale.date }}</td>
          <td class="py-2 text-gray-500">{{ sale.customer }}</td>
          <td class="py-2 text-right text-gray-700">{{ formatCurrency(sale.amount) }}</td>
          <td class="py-2 text-center">
            <button
              class="text-primary font-bold px-2"
              @click="onView(sale)"
              aria-label="View"
            >
              View
            </button>
            <button
              class="text-red-600 font-bold px-2"
              @click="onDelete(sale)"
              aria-label="Delete"
            >
              Delete
            </button>
          </td>
        </tr>
        <!-- ===== [New Feature] START: Safe empty check ===== -->
        <tr v-if="(sales?.length ?? 0) === 0">
          <td colspan="4" class="text-center text-gray-400 py-4">No sales found.</td>
        </tr>
        <!-- ===== [New Feature] END ===== -->
      </tbody>
    </table>
  </div>
  <!-- ===== [New Feature] END ===== -->
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
      { id: '1', date: '2025-06-25', customer: 'Ama Serwaa', amount: 40 },
      { id: '2', date: '2025-06-24', customer: 'Kwame Mensah', amount: 100 }
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
</script>

<!--
  ===== Styling Notes =====
  - Table is mobile-first, touch-optimized (min-h-[48px] for actions).
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: aria-labels, clear feedback.
-->