<!--
  DashboardView.vue
  Stratonea/Sales Tracker - Modern card-based dashboard
  - Mobile-first design (2 columns mobile, 3 columns desktop)
  - Card layout with icons, stats, and animations
  - Ghana-optimized: touch targets, offline support
  - Follows Stratonea guidelines
-->

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6">
    <!-- ===== [New Feature] START: Modern Welcome Section ===== -->
    <!-- Welcome Message - Kept Short -->
    <div class="mb-8 text-center">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">
        Welcome back! {{ UserName }}
      </h1>
      <p class="text-gray-600 text-base">
        Manage your business from anywhere
      </p>
    </div>
    <!-- ===== [New Feature] END ===== -->

    <!-- ===== [New Feature] START: Quick Stats Summary ===== -->
    <!-- Company Summary Cards -->
    <div class="mb-8">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Today's Overview</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <!-- Total Sales Today -->
        <div class="bg-white rounded-lg p-4 shadow-lg border border-gray-100">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <font-awesome-icon icon="chart-line" class="text-green-600 text-lg" />
            </div>
            <div class="ml-3">
              <p class="text-sm text-gray-600">Sales Today</p>
              <p class="text-lg font-semibold text-gray-900">
                {{ formatCurrency(companySummary.todaySales) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Pending Orders -->
        <div class="bg-white rounded-lg p-4 shadow-lg border border-gray-100">
          <div class="flex items-center">
            <div class="p-2 bg-orange-100 rounded-lg">
              <font-awesome-icon icon="clock" class="text-orange-600 text-lg" />
            </div>
            <div class="ml-3">
              <p class="text-sm text-gray-600">Pending</p>
              <p class="text-lg font-semibold text-gray-900">
                {{ companySummary.pendingOrders }}
              </p>
            </div>
          </div>
        </div>

        <!-- Low Stock Items -->
        <div class="bg-white rounded-lg p-4 shadow-lg border border-gray-100">
          <div class="flex items-center">
            <div class="p-2 bg-red-100 rounded-lg">
              <font-awesome-icon icon="exclamation-triangle" class="text-red-600 text-lg" />
            </div>
            <div class="ml-3">
              <p class="text-sm text-gray-600">Low Stock</p>
              <p class="text-lg font-semibold text-gray-900">
                {{ companySummary.lowStockItems }}
              </p>
            </div>
          </div>
        </div>

        <!-- Total Customers -->
        <div class="bg-white rounded-lg p-4 shadow-lg border border-gray-100">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <font-awesome-icon icon="users" class="text-blue-600 text-lg" />
            </div>
            <div class="ml-3">
              <p class="text-sm text-gray-600">Customers</p>
              <p class="text-lg font-semibold text-gray-900">
                {{ companySummary.totalCustomers }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ===== [New Feature] END ===== -->

    <!-- ===== [New Feature] START: Modern Navigation Cards ===== -->
    <!-- Main Navigation Cards -->
    <div class="mb-8">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <!-- 2 columns on mobile, 3 columns on desktop -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <!-- Sales Card -->
        <router-link to="/sales"
          class="group bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all duration-200 active:scale-98 min-h-[120px] flex flex-col justify-center items-center text-center">
          <!-- Icon Container -->
          <div
            class="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors duration-200">
            <font-awesome-icon icon="chart-bar" class="text-primary-600 text-2xl" />
          </div>
          <!-- Label -->
          <h3 class="font-semibold text-gray-900 text-base mb-1">Sales</h3>
          <!-- Stats -->
          <p class="text-sm text-gray-500">
            {{ companySummary.totalSales }} total
          </p>
        </router-link>

        <!-- Customers Card -->
        <router-link to="/customers"
          class="group bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all duration-200 active:scale-98 min-h-[120px] flex flex-col justify-center items-center text-center">
          <!-- Icon Container -->
          <div
            class="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-200">
            <font-awesome-icon icon="users" class="text-blue-600 text-2xl" />
          </div>
          <!-- Label -->
          <h3 class="font-semibold text-gray-900 text-base mb-1">Customers</h3>
          <!-- Stats -->
          <p class="text-sm text-gray-500">
            {{ companySummary.totalCustomers }} total
          </p>
        </router-link>

        <!-- Products Card -->
        <router-link to="/products"
          class="group bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all duration-200 active:scale-98 min-h-[120px] flex flex-col justify-center items-center text-center">
          <!-- Icon Container -->
          <div
            class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-200">
            <font-awesome-icon icon="box" class="text-green-600 text-2xl" />
          </div>
          <!-- Label -->
          <h3 class="font-semibold text-gray-900 text-base mb-1">Products</h3>
          <!-- Stats -->
          <p class="text-sm text-gray-500">
            {{ companySummary.totalProducts }} items
          </p>
        </router-link>

        <!-- Stock Card -->
        <router-link to="/stock"
          class="group bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all duration-200 active:scale-98 min-h-[120px] flex flex-col justify-center items-center text-center">
          <!-- Icon Container -->
          <div
            class="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors duration-200">
            <font-awesome-icon icon="warehouse" class="text-purple-600 text-2xl" />
          </div>
          <!-- Label -->
          <h3 class="font-semibold text-gray-900 text-base mb-1">Stock</h3>
          <!-- Stats -->
          <p class="text-sm text-gray-500">
            {{ companySummary.lowStockItems }} low stock
          </p>
        </router-link>

        <!-- Company Info Card -->
        <router-link to="/company"
          class="group bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all duration-200 active:scale-98 min-h-[120px] flex flex-col justify-center items-center text-center">
          <!-- Icon Container -->
          <div
            class="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors duration-200">
            <font-awesome-icon icon="building" class="text-indigo-600 text-2xl" />
          </div>
          <!-- Label -->
          <h3 class="font-semibold text-gray-900 text-base mb-1">Company Info</h3>
          <!-- Stats -->
          <p class="text-sm text-gray-500">
            Profile & Settings
          </p>
        </router-link>

        <!-- Reports Card -->
        <router-link to="/reports"
          class="group bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all duration-200 active:scale-98 min-h-[120px] flex flex-col justify-center items-center text-center">
          <!-- Icon Container -->
          <div
            class="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors duration-200">
            <font-awesome-icon icon="chart-line" class="text-orange-600 text-2xl" />
          </div>
          <!-- Label -->
          <h3 class="font-semibold text-gray-900 text-base mb-1">Reports</h3>
          <!-- Stats -->
          <p class="text-sm text-gray-500">
            Analytics & Insights
          </p>
        </router-link>
      </div>
    </div>
    <!-- ===== [New Feature] END ===== -->

    <!-- ===== Recent Activity Section (Kept from Original) ===== -->
    <!-- Recent Activity -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <router-link to="/sales" class="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View All
        </router-link>
      </div>

      <!-- Activity Cards -->
      <div class="space-y-3">
        <div v-for="activity in recentActivity" :key="activity.id"
          class="bg-white rounded-lg p-4 shadow-lg border border-gray-100">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <font-awesome-icon :icon="getActivityIcon(activity.type)" class="text-primary-600 text-sm" />
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">
                  {{ activity.description }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ formatRelativeTime(activity.timestamp) }}
                </p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold text-gray-900">
                {{ activity.amount ? formatCurrency(activity.amount) : '' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

 
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import { ref,  onMounted } from 'vue'
import {  formatDistanceToNow } from 'date-fns'



const UserName = "Benjamin"

// ===== Types & Interfaces =====
/**
 * Company summary statistics for dashboard overview
 */
interface CompanySummary {
  todaySales: number
  totalSales: number
  pendingOrders: number
  totalCustomers: number
  totalProducts: number
  lowStockItems: number
}

/**
 * Recent activity item for activity feed
 */
interface ActivityItem {
  id: string
  type: 'sale' | 'customer' | 'product' | 'stock'
  description: string
  timestamp: number
  amount?: number
}

// ===== State Management =====
// Company summary data (replace with real API call)
const companySummary = ref<CompanySummary>({
  todaySales: 2450.00,
  totalSales: 125,
  pendingOrders: 8,
  totalCustomers: 47,
  totalProducts: 156,
  lowStockItems: 12
})

// Recent activity data (replace with real API call)
const recentActivity = ref<ActivityItem[]>([
  {
    id: '1',
    type: 'sale',
    description: 'New sale to Ama Serwaa',
    timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
    amount: 125.50
  },
  {
    id: '2',
    type: 'customer',
    description: 'New customer: Kwame Asante',
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
  },
  {
    id: '3',
    type: 'stock',
    description: 'Low stock alert: Rice 25kg',
    timestamp: Date.now() - 1000 * 60 * 60 * 4, // 4 hours ago
  },
  {
    id: '4',
    type: 'sale',
    description: 'Sale completed for GHS 89.00',
    timestamp: Date.now() - 1000 * 60 * 60 * 6, // 6 hours ago
    amount: 89.00
  }
])

// ===== Helper Functions =====
/**
 * Formats currency in Ghana Cedis format
 * @param amount - The amount to format
 */
function formatCurrency(amount: number): string {
  return `GHS ${amount.toFixed(2)}`
}

/**
 * Formats relative time (e.g., "2 hours ago")
 * @param timestamp - Unix timestamp
 */
function formatRelativeTime(timestamp: number): string {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
}

/**
 * Gets the appropriate icon for activity type
 * @param type - Activity type
 */
function getActivityIcon(type: string): string {
  const icons: Record<string, string> = {
    sale: 'shopping-cart',
    customer: 'user-plus',
    product: 'box',
    stock: 'exclamation-triangle'
  }
  return icons[type] || 'info-circle'
}

// ===== Lifecycle Hooks =====
/**
 * Load dashboard data when component mounts
 */
onMounted(async () => {
  try {
    // TODO: Replace with real API calls
    // const summary = await fetchCompanySummary()
    // const activities = await fetchRecentActivity()
    // companySummary.value = summary
    // recentActivity.value = activities
    
    console.log('Dashboard loaded with mock data')
  } catch (error) {
    console.error('Failed to load dashboard data:', error)
    // Handle error appropriately for offline scenarios
  }
})
</script>

<style scoped>
/* ===== [New Feature] START: Modern Card Animations ===== */
/* Touch feedback for mobile users */
.active\:scale-98:active {
  transform: scale(0.98);
}

/* Smooth transitions for all interactive elements */
.group {
  transition: all 0.2s ease-in-out;
}

/* Enhanced focus states for accessibility */
.group:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}

/* Card hover effects */
.group:hover {
  transform: translateY(-2px);
}

/* Loading skeleton animation (for future use) */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
/* ===== [New Feature] END ===== */
</style>