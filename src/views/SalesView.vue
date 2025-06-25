<!--
  SalesView.vue
  Stratonea/BizPoint - Mobile-first sales dashboard/listing page.
  - Ghana-optimized: simple, clear, offline-friendly
  - Uses Tailwind utility classes for styling
  - Follows Stratonea guidelines (see copilot-instructions.md)
  - Uses mock/static data for now (replace with real data later)
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <div class="min-h-screen bg-gray-50 px-2 py-4">
   

    <!-- Sales List Component -->
    <SalesList :sales="sales" @view="onViewSale" @delete="onDeleteSale" />

    <!-- Add Sale Button -->
    <div class="fixed bottom-6 right-6 z-10">
      <button
        class="bg-primary text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl font-bold hover:bg-primary-dark transition-colors"
        @click="onAddSale" aria-label="Add Sale">
        +
      </button>
    </div>
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== Imports =====
import { ref } from 'vue'
// Import StratoneaLogo and SalesList if available

import SalesList from '@/components/lists/SalesList.vue'


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

// ===== Main Logic =====
/**
 * Mock sales data for demonstration.
 * Replace with real sales data from store or API.
 */
const sales = ref<Sale[]>([
  { id: '1', date: '2025-06-25', customer: 'Ama Serwaa', amount: 40 },
  { id: '2', date: '2025-06-24', customer: 'Kwame Mensah', amount: 100 }
])

/**
 * Handles viewing a sale.
 * @param sale - The sale to view
 */
function onViewSale(sale: Sale) {
  // Navigate to sale details or show modal
  alert(`Viewing sale for ${sale.customer} (mock)`)
}

/**
 * Handles deleting a sale.
 * @param sale - The sale to delete
 */
function onDeleteSale(sale: Sale) {
  // Remove sale from list (mock)
  sales.value = sales.value.filter(s => s.id !== sale.id)
  alert('Sale deleted (mock)')
}

/**
 * Handles adding a new sale.
 */
function onAddSale() {
  // Navigate to add sale form or show modal
  alert('Add new sale (mock)')
}
</script>

<!--
  ===== Styling Notes =====
  - All buttons are touch-optimized (min-h-[48px]).
  - Uses Tailwind for color, spacing, and responsive design.
  - Floating action button for mobile-first UX.
  - Accessible: aria-labels, clear feedback.
-->