<!--
  InvoiceView.vue
  Stratonea/BizPoint - Main view for managing and viewing invoices.
  - Ghana-optimized: mobile-first, offline-friendly, simple UI
  - Uses mock/static data for now (replace with real data later)
  - Follows Stratonea guidelines and file structure
-->

<template>


  <!-- ===== Main Content ===== -->
  <div class="max-w-md mx-auto">
    <!-- Invoice List (mock data) -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 class="text-lg font-bold text-primary mb-2">Invoices</h2>
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-200">
            <th class="text-left py-2">Invoice #</th>
            <th class="text-left py-2">Customer</th>
            <th class="text-right py-2">Amount</th>
            <th class="text-left py-2">Status</th>
            <th class="text-center py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="invoice in invoices" :key="invoice.id"
            class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td class="py-2 font-medium text-gray-900">{{ invoice.number }}</td>
            <td class="py-2 text-gray-500">{{ invoice.customer }}</td>
            <td class="py-2 text-right text-gray-700">{{ formatCurrency(invoice.amount) }}</td>
            <td class="py-2 text-gray-500">{{ invoice.status }}</td>
            <td class="py-2 text-center">
              <button class="text-primary font-bold px-2" @click="onView(invoice)" aria-label="View">
                View
              </button>
              <button class="text-green-600 font-bold px-2" @click="onShare(invoice)" aria-label="Share via WhatsApp">
                Share
              </button>
            </td>
          </tr>
          <tr v-if="(invoices?.length ?? 0) === 0">
            <td colspan="5" class="text-center text-gray-400 py-4">No invoices found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import { ref } from 'vue'


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

// ===== Main Logic =====
// Mock invoice data (replace with real data from store or API)
const invoices = ref<Invoice[]>([
  { id: '1', number: 'INV-001', customer: 'Ama Serwaa', amount: 200, status: 'Paid' },
  { id: '2', number: 'INV-002', customer: 'Kwame Mensah', amount: 350, status: 'Unpaid' }
])

/**
 * Formats a number as Ghanaian currency (GHS).
 * @param amount - The amount to format
 * @returns string (e.g., GHS 10.00)
 */
function formatCurrency(amount: number): string {
  return `GHS ${amount.toFixed(2)}`
}

/**
 * Handles viewing an invoice.
 * @param invoice - The invoice to view
 */
function onView(invoice: Invoice) {
  // Show invoice details (mock)
  alert(`Viewing invoice ${invoice.number} for ${invoice.customer}`)
}

/**
 * Handles sharing an invoice via WhatsApp.
 * @param invoice - The invoice to share
 */
function onShare(invoice: Invoice) {
  // WhatsApp integration (mock)
  const message = `Invoice ${invoice.number} for ${invoice.customer}: GHS ${invoice.amount.toFixed(2)} (${invoice.status})`
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}
</script>

<!--
  ===== Styling Notes =====
  - Mobile-first, max-w-md for mobile, centered content.
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: aria-labels, clear feedback.
  - WhatsApp sharing for Ghanaian business context.
-->