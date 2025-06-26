<!--
  InvoiceList.vue
  Stratonea/Sales Tracker - Responsive invoice list with:
  - Mobile: Vertical card layout using InvoiceCard
  - Desktop: Horizontal table layout
  - Ghana-optimized: offline-friendly, touch targets
  - Uses Tailwind utility classes for styling
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <!-- Mobile Card Layout: Use InvoiceCard for each invoice -->
  <div class="block md:hidden">
    <div class="space-y-4 max-w-md mx-auto my-4">
      <InvoiceCard
        v-for="invoice in invoices"
        :key="invoice.number"
        :number="invoice.number"
        :customer="invoice.customer"
        :amount="invoice.amount"
        :status="invoice.status"
        @view="onView(invoice)"
        @share="onShare(invoice)"
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
            <span class="text-xs font-bold uppercase tracking-wider text-gray-600">Invoice #</span>
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
            <span class="text-xs font-bold uppercase tracking-wider text-gray-600">Status</span>
          </div>
        </th>
        <th class="px-6 py-4 text-right">
          <span class="text-xs font-bold uppercase tracking-wider text-gray-600">Actions</span>
        </th>
      </tr>
    </thead>

    <!-- Table Body -->
    <tbody class="divide-y divide-gray-200 bg-white">
      <tr v-for="invoice in invoices" :key="invoice.number"
        class="hover:bg-gray-50/50 transition-colors duration-150 ease-in-out">
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="font-medium text-gray-900">#{{ invoice.number }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">{{ invoice.customer }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right">
          <div class="text-sm font-medium text-gray-900">{{ formatCurrency(invoice.amount) }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span :class="[
            'px-2 py-1 text-xs font-medium rounded-full',
            invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
            invoice.status === 'Unpaid' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          ]">
            {{ invoice.status }}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
          <button @click="onView(invoice)"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150">
            View
          </button>
          <button @click="onShare(invoice)"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150">
            Share
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Empty State -->
  <div v-if="(invoices?.length ?? 0) === 0" class="text-center py-12 bg-gray-50 border-t border-gray-200">
    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
    <h3 class="mt-2 text-sm font-medium text-gray-900">No invoices</h3>
    <p class="mt-1 text-sm text-gray-500">Get started by creating a new invoice.</p>
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import InvoiceCard from '@/components/layout/InvoiceCard.vue'

// ===== Types & Interfaces =====
/**
 * Invoice type for the invoice list.
 */
interface Invoice {
    id: string
  number: string
  customer: string
  amount: number
  status: 'Paid' | 'Unpaid' | 'Overdue'
}

// ===== Props =====
/**
 * Props for InvoiceList
 * - invoices: Invoice[] (array of invoices)
 */
withDefaults(
  defineProps<{
    invoices?: Invoice[]
  }>(),
  {
    invoices: () => [
      {
            id: '1', 
            number: 'INV-001',
        customer: 'Ama Serwaa',
        amount: 500,
        status: 'Paid'
      },
      {
          id: '2',  
          number: 'INV-002',
        customer: 'Kwame Mensah',
        amount: 350,
        status: 'Unpaid'
      }
    ]
  }
)

// ===== Emits =====
/**
 * Emits events to parent for view and share actions.
 */
const emit = defineEmits<{
  (e: 'view', invoice: Invoice): void
  (e: 'share', invoice: Invoice): void
}>()

// ===== Main Logic =====
/**
 * Handles view button click.
 * @param invoice - The invoice to view
 */
function onView(invoice: Invoice) {
  emit('view', invoice)
}

/**
 * Handles share button click.
 * @param invoice - The invoice to share
 */
function onShare(invoice: Invoice) {
  emit('share', invoice)
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
  - Uses responsive classes (md:) for desktop/mobile switching
  - Mobile: Card layout with InvoiceCard component
  - Desktop: Table layout with horizontal rows
  - Consistent colors and spacing across both layouts
  - Touch-optimized for mobile, precise for desktop
-->