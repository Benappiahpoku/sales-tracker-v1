<!--
  InvoiceView.vue
  Stratonea/Sales Tracker - Main view for managing and viewing invoices.
  - Ghana-optimized: mobile-first, offline-friendly, simple UI
  - Uses mock/static data for now (replace with real data later)
  - Follows Stratonea guidelines and file structure
  - Mobile: Card/list layout
  - Desktop: Table layout
  - Floating Action Button (FAB) for adding invoices
-->

<template>
  <!-- ===== Main Content Wrapper ===== -->
  <div class="min-h-screen bg-gray-50 px-2 py-4 pb-24">
    <!-- ===== Desktop Table View (md and up) ===== -->
    <div class="hidden md:block max-w-2xl mx-auto">
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

    
    <!-- ===== Mobile Card/List View (below md) ===== -->
    <div class="md:hidden max-w-md mx-auto">
      <h2 class="text-lg font-bold text-primary mb-4 px-2">Invoices</h2>
      <div v-if="invoices.length > 0" class="flex flex-col gap-4">
        <div v-for="invoice in invoices" :key="invoice.id" class="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
          <div class="flex justify-between items-center">
            <span class="font-semibold text-gray-900">{{ invoice.number }}</span>
            <span class="px-2 py-1 rounded text-xs font-semibold" :class="{
              'bg-green-100 text-green-700': invoice.status === 'Paid',
              'bg-yellow-100 text-yellow-700': invoice.status === 'Unpaid',
              'bg-red-100 text-red-700': invoice.status === 'Overdue'
            }">
              {{ invoice.status }}
            </span>
          </div>
          <div class="text-gray-500 text-sm">Customer: {{ invoice.customer }}</div>
          <div class="text-gray-700 font-bold text-base">Amount: {{ formatCurrency(invoice.amount) }}</div>
          <!-- ===== [New Feature] START ===== -->
          <!-- Vertically stacked action buttons for mobile -->
          <div class="flex flex-col gap-2 mt-2">
            <button
              class="w-full py-2 rounded stratonea:rounded bg-primary text-white font-semibold text-sm focus:outline-none"
              @click="onView(invoice)" aria-label="View Invoice">
              View
            </button>
            <button
              class="w-full py-2 rounded stratonea:rounded bg-green-600 text-white font-semibold text-sm focus:outline-none"
              @click="onShare(invoice)" aria-label="Share Invoice via WhatsApp">
              Share
            </button>
          </div>
          <!-- ===== [New Feature] END ===== -->
        </div>
      </div>
      <div v-else class="text-center text-gray-400 py-8">No invoices found.</div>
    </div>

    <!-- ===== Floating Action Button (FAB) for Add Invoice ===== -->
 
    <button
      class="fixed bottom-20 right-4 md:hidden z-50 bg-green-500 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-3xl focus:outline-none"
      @click="onAddInvoice" aria-label="Add Invoice" title="Add Invoice">
      +
    </button>
    <!-- ===== [New Feature] END ===== -->
  </div>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * InvoiceView.vue
 * - Ghana-optimized, mobile-first invoice list view.
 * - Mobile: Card/list layout for invoices.
 * - Desktop: Table layout for invoices.
 * - Floating Action Button (FAB) for adding invoices (mobile only).
 * - WhatsApp sharing for Ghanaian business context.
 */

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

/**
 * Handles adding a new invoice (FAB).
 * For now, just show an alert (replace with real logic later).
 */
function onAddInvoice() {
  alert('Add Invoice (functionality coming soon)')
}
</script>

<!--
  ===== Styling Notes =====
  - Mobile-first, min-h-screen, px-2 py-4 for mobile spacing.
  - Card/list layout for mobile, table for desktop.
  - Floating action button (FAB) for mobile add action.
  - Accessible: aria-labels, clear feedback.
  - WhatsApp sharing for Ghanaian business context.
-->