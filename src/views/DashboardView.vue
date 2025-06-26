<!--
  DashboardView.vue
  Stratonea/Sales Tracker - Main dashboard/home view.
  - Ghana-optimized: mobile-first, offline-friendly, simple UI
  - Shows company summary and quick links
  - Follows Stratonea guidelines and file structure
-->

<template>

  <!-- ===== Main Content ===== -->
  <div class="max-w-md mx-auto">
    <!-- Welcome Message -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-4">
      <h1 class="text-xl font-bold text-primary mb-2">Welcome, {{ userName }}!</h1>
      <p class="text-gray-700 mb-2">
        This is your Sales Tracker dashboard. Manage your business, customers, and sales from one place.
      </p>
      <div class="text-xs text-gray-400 mb-2">
        Offline mode is supported. Your data will sync when you’re back online.
      </div>
    </div>

    <!-- Company Summary (mock data) -->
    <div class="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 class="text-lg font-bold text-primary mb-2">Company Summary</h2>
      <div class="flex flex-col gap-2">
        <div>
          <span class="font-medium text-gray-700">Company:</span>
          <span class="ml-2 text-gray-900">{{ company.name }}</span>
        </div>
        <div>
          <span class="font-medium text-gray-700">Total Products:</span>
          <span class="ml-2 text-gray-900">{{ summary.products }}</span>
        </div>
        <div>
          <span class="font-medium text-gray-700">Customers:</span>
          <span class="ml-2 text-gray-900">{{ summary.customers }}</span>
        </div>
        <div>
          <span class="font-medium text-gray-700">Sales (GHS):</span>
          <span class="ml-2 text-gray-900">{{ summary.sales }}</span>
        </div>
        <div>
          <span class="font-medium text-gray-700">Stock Items:</span>
          <span class="ml-2 text-gray-900">{{ summary.stock }}</span>
        </div>
      </div>
    </div>

    <!-- Quick Links to Main Features -->
    <!-- ===== [New Feature] START: Responsive grid for mobile-first UX ===== -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <router-link to="/products"
        class="bg-primary text-white rounded-lg py-4 text-center font-bold shadow min-h-[48px] hover:bg-primary-dark transition-colors"
        aria-label="Go to Products">
        Products
      </router-link>
      <router-link to="/customers"
        class="bg-primary text-white rounded-lg py-4 text-center font-bold shadow min-h-[48px] hover:bg-primary-dark transition-colors"
        aria-label="Go to Customers">
        Customers
      </router-link>
      <router-link to="/sales"
        class="bg-primary text-white rounded-lg py-4 text-center font-bold shadow min-h-[48px] hover:bg-primary-dark transition-colors"
        aria-label="Go to Sales">
        Sales
      </router-link>
      <router-link to="/stock"
        class="bg-primary text-white rounded-lg py-4 text-center font-bold shadow min-h-[48px] hover:bg-primary-dark transition-colors"
        aria-label="Go to Stock">
        Stock
      </router-link>
    </div>
    <!-- ===== [New Feature] END ===== -->
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import { ref } from 'vue'


// ===== Types & Interfaces =====
/**
 * Company summary type for the dashboard.
 */
interface CompanySummary {
  products: number
  customers: number
  sales: number
  stock: number
}

/**
 * Company info type for the dashboard.
 */
interface CompanyInfo {
  name: string
}

// ===== Main Logic =====
// Mock user and company data (replace with real data from store or API)
const userName = ref('Benjamin')
const company = ref<CompanyInfo>({
  name: 'Stratonea Ltd.'
})
const summary = ref<CompanySummary>({
  products: 12,
  customers: 8,
  sales: 1500,
  stock: 37
})
</script>

<!--
  ===== Styling Notes =====
  - Mobile-first, max-w-md for mobile, centered content.
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: aria-labels, clear feedback.
  - Quick links stack vertically on mobile, 2-column grid on desktop (md+).
-->