<!--
  ReceiptPreview.vue
  Stratonea/BizPoint - Component for displaying a generated receipt.
  - Mobile-first, print-friendly, Ghana-optimized
  - Uses Tailwind utility classes for styling
  - Follows Stratonea guidelines (see copilot-instructions.md)
  - Uses mock/static data for now (replace with real data later)
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <div
    class="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto my-4 print:max-w-full print:shadow-none print:rounded-none"
    aria-label="Receipt Preview"
  >
    <!-- ===== Header: Company Info ===== -->
    <div class="text-center mb-4">
      <h2 class="text-xl font-bold text-primary mb-1">Stratonea</h2>
      <div class="text-sm text-gray-600">Kumasi, Ghana</div>
      <div class="text-xs text-gray-400">+233 24 000 0000</div>
    </div>

    <!-- ===== Receipt Title & Meta ===== -->
    <div class="flex justify-between items-center mb-2">
      <span class="font-semibold text-base">Receipt</span>
      <span class="text-xs text-gray-500">#{{ receiptNumber }}</span>
    </div>
    <div class="flex justify-between text-xs text-gray-500 mb-2">
      <span>{{ date }}</span>
      <span>{{ time }}</span>
    </div>

    <!-- ===== Customer Info (if available) ===== -->
    <div v-if="customerName" class="mb-2">
      <span class="text-xs text-gray-700">Customer:</span>
      <span class="text-xs font-medium text-gray-900">{{ customerName }}</span>
    </div>

    <!-- ===== Items Table ===== -->
    <table class="w-full text-xs mb-2">
      <thead>
        <tr class="border-b border-gray-200">
          <th class="text-left py-1">Item</th>
          <th class="text-right py-1">Qty</th>
          <th class="text-right py-1">Price</th>
          <th class="text-right py-1">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.name" class="border-b border-gray-100">
          <td class="py-1">{{ item.name }}</td>
          <td class="text-right py-1">{{ item.quantity }}</td>
          <td class="text-right py-1">{{ formatCurrency(item.price) }}</td>
          <td class="text-right py-1">{{ formatCurrency(item.price * item.quantity) }}</td>
        </tr>
      </tbody>
    </table>

    <!-- ===== Totals ===== -->
    <div class="flex justify-between font-bold text-base mt-2">
      <span>Total</span>
      <span>{{ formatCurrency(total ?? 0) }}</span>
    </div>
    <div class="flex justify-between text-xs text-gray-500 mt-1">
      <span>Payment Method:</span>
      <span>{{ paymentMethod }}</span>
    </div>

    <!-- ===== Footer: Thank You Message ===== -->
    <div class="text-center text-xs text-gray-500 mt-4">
      Thank you for your business!
    </div>
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
/**
 * Props for ReceiptPreview
 * - receiptNumber: string (receipt ID)
 * - date: string (date of transaction)
 * - time: string (time of transaction)
 * - customerName: string (optional)
 * - items: array of { name, quantity, price }
 * - total: number
 * - paymentMethod: string
 */
interface ReceiptItem {
  name: string
  quantity: number
  price: number
}

 withDefaults(
  defineProps<{
    receiptNumber?: string
    date?: string
    time?: string
    customerName?: string
    items?: ReceiptItem[]
    total?: number 
    paymentMethod?: string
  }>(),
  {
    receiptNumber: '000123',
    date: '2025-06-25',
    time: '14:30',
    customerName: '',
    items: () => [
      { name: 'Product A', quantity: 2, price: 10 },
      { name: 'Product B', quantity: 1, price: 20 }
    ],
    total: 40,
    paymentMethod: 'Cash'
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
  - Mobile-first, max-w-md for mobile, print:full width for printing.
  - All touch targets and text are sized for mobile readability.
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: aria-label, semantic markup.
-->