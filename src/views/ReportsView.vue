<!--
  ReportsView.vue
  Stratonea/Sales Tracker - Modern reports dashboard with card-based design
  - Follows DashboardView.vue design principles and modern styling
  - Ghana-optimized: mobile-first, offline-friendly, WhatsApp sharing
  - Uses modern card layouts with hover effects and animations
  - Touch-optimized buttons and accessibility features
  - Follows Stratonea guidelines with comprehensive documentation
-->

<template>
  <!-- ===== [New Feature] START: Modern Reports Design ===== -->
  <div class="min-h-screen bg-gray-50 px-4 py-6">
    <!-- Page Header -->
    <div class="max-w-7xl mx-auto mb-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Business Reports</h1>
          <p class="text-gray-600">Analyze your business performance and insights</p>
        </div>
        
        <!-- Export Actions -->
        <div class="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
          <button
            @click="onExportPDF"
            class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 min-h-[48px] active:scale-98"
          >
            <font-awesome-icon icon="file-pdf" class="mr-2 text-red-600" />
            Export PDF
          </button>
          
          <button
            @click="onShareWhatsApp"
            class="inline-flex items-center justify-center px-4 py-2 border border-green-300 text-sm font-medium rounded-lg text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 min-h-[48px] active:scale-98"
          >
            <font-awesome-icon :icon="['fab', 'whatsapp']" class="mr-2" />
            Share via WhatsApp
          </button>
        </div>
      </div>
    </div>

    <!-- Time Period Filter -->
    <div class="max-w-7xl mx-auto mb-6">
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="period in timePeriods"
            :key="period.value"
            @click="selectedPeriod = period.value"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 min-h-[48px] active:scale-98',
              selectedPeriod === period.value
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ period.label }}
          </button>
        </div>
        
        <!-- Date Range Display -->
        <div class="mt-3 pt-3 border-t border-gray-200">
          <p class="text-sm text-gray-600">
            <font-awesome-icon icon="calendar" class="mr-2" />
            Showing data for: <span class="font-medium text-gray-900">{{ currentDateRange }}</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Reports Content Container -->
    <div class="max-w-7xl mx-auto space-y-8">
      
      <!-- ===== Sales Reports Section ===== -->
      <section>
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Sales Reports</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Sales Overview Card -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">Sales Overview</h3>
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                <font-awesome-icon icon="chart-line" class="text-blue-600" />
              </div>
            </div>
            
            <!-- Chart Placeholder -->
            <div class="h-32 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
              <div class="text-center">
                <font-awesome-icon icon="chart-line" class="text-gray-400 text-2xl mb-2" />
                <p class="text-sm text-gray-500">Sales trend chart</p>
              </div>
            </div>
            
            <!-- Key Metrics -->
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Total Sales</span>
                <span class="text-sm font-semibold text-gray-900">{{ formatCurrency(salesData.totalSales) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Growth</span>
                <span class="text-sm font-semibold text-green-600">+{{ salesData.growthPercent }}%</span>
              </div>
            </div>
            
            <button
              @click="onViewSalesDetails"
              class="w-full mt-4 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200"
            >
              View Details
            </button>
          </div>

          <!-- Revenue Analysis Card -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">Revenue Analysis</h3>
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                <font-awesome-icon icon="money-bill-wave" class="text-green-600" />
              </div>
            </div>
            
            <!-- Chart Placeholder -->
            <div class="h-32 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
              <div class="text-center">
                <font-awesome-icon icon="chart-bar" class="text-gray-400 text-2xl mb-2" />
                <p class="text-sm text-gray-500">Revenue breakdown</p>
              </div>
            </div>
            
            <!-- Key Metrics -->
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Net Revenue</span>
                <span class="text-sm font-semibold text-gray-900">{{ formatCurrency(salesData.netRevenue) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Profit Margin</span>
                <span class="text-sm font-semibold text-blue-600">{{ salesData.profitMargin }}%</span>
              </div>
            </div>
            
            <button
              @click="onViewRevenueDetails"
              class="w-full mt-4 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200"
            >
              View Analysis
            </button>
          </div>

          <!-- Top Products Card -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">Top Products</h3>
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                <font-awesome-icon icon="star" class="text-purple-600" />
              </div>
            </div>
            
            <!-- Top Products List -->
            <div class="space-y-3">
              <div
                v-for="product in topProducts"
                :key="product.id"
                class="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
                  <p class="text-xs text-gray-500">{{ product.sales }} sold</p>
                </div>
                <span class="text-sm font-semibold text-gray-900">{{ formatCurrency(product.revenue) }}</span>
              </div>
            </div>
            
            <button
              @click="onViewTopProducts"
              class="w-full mt-4 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      <!-- ===== Customer Reports Section ===== -->
      <section>
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Customer Reports</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Customer Overview Card -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">Customer Overview</h3>
              <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors duration-200">
                <font-awesome-icon icon="users" class="text-indigo-600" />
              </div>
            </div>
            
            <!-- Stats Grid -->
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="text-center p-3 bg-gray-50 rounded-lg">
                <p class="text-2xl font-bold text-gray-900">{{ customerData.totalCustomers }}</p>
                <p class="text-xs text-gray-600">Total Customers</p>
              </div>
              <div class="text-center p-3 bg-gray-50 rounded-lg">
                <p class="text-2xl font-bold text-green-600">{{ customerData.newCustomers }}</p>
                <p class="text-xs text-gray-600">New This Month</p>
              </div>
            </div>
            
            <!-- Key Metrics -->
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Active Customers</span>
                <span class="text-sm font-semibold text-gray-900">{{ customerData.activeCustomers }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Retention Rate</span>
                <span class="text-sm font-semibold text-green-600">{{ customerData.retentionRate }}%</span>
              </div>
            </div>
            
            <button
              @click="onViewCustomerDetails"
              class="w-full mt-4 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200"
            >
              View Details
            </button>
          </div>

          <!-- Customer Regions Card -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">Customer Regions</h3>
              <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-200">
                <font-awesome-icon icon="map-marker-alt" class="text-orange-600" />
              </div>
            </div>
            
            <!-- Regional Breakdown -->
            <div class="space-y-3">
              <div
                v-for="region in customerRegions"
                :key="region.name"
                class="flex items-center justify-between"
              >
                <div class="flex items-center">
                  <div class="w-3 h-3 rounded-full mr-3" :style="{ backgroundColor: region.color }"></div>
                  <span class="text-sm font-medium text-gray-900">{{ region.name }}</span>
                </div>
                <div class="text-right">
                  <span class="text-sm font-semibold text-gray-900">{{ region.customers }}</span>
                  <span class="text-xs text-gray-500 ml-1">({{ region.percentage }}%)</span>
                </div>
              </div>
            </div>
            
            <button
              @click="onViewRegionalAnalysis"
              class="w-full mt-4 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200"
            >
              View Regional Map
            </button>
          </div>

          <!-- Customer Lifetime Value Card -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">Customer Value</h3>
              <div class="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-200 transition-colors duration-200">
                <font-awesome-icon icon="gem" class="text-pink-600" />
              </div>
            </div>
            
            <!-- Chart Placeholder -->
            <div class="h-32 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
              <div class="text-center">
                <font-awesome-icon icon="chart-pie" class="text-gray-400 text-2xl mb-2" />
                <p class="text-sm text-gray-500">Customer value distribution</p>
              </div>
            </div>
            
            <!-- Key Metrics -->
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Avg. Customer Value</span>
                <span class="text-sm font-semibold text-gray-900">{{ formatCurrency(customerData.avgValue) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Top 10% Value</span>
                <span class="text-sm font-semibold text-blue-600">{{ formatCurrency(customerData.topTenPercentValue) }}</span>
              </div>
            </div>
            
            <button
              @click="onViewCustomerValue"
              class="w-full mt-4 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200"
            >
              View Segmentation
            </button>
          </div>
        </div>
      </section>

      <!-- ===== Product Reports Section ===== -->
      <section>
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Product Reports</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Product Performance Card -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">Product Performance</h3>
              <div class="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center group-hover:bg-cyan-200 transition-colors duration-200">
                <font-awesome-icon icon="box" class="text-cyan-600" />
              </div>
            </div>
            
            <!-- Chart Placeholder -->
            <div class="h-32 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
              <div class="text-center">
                <font-awesome-icon icon="chart-bar" class="text-gray-400 text-2xl mb-2" />
                <p class="text-sm text-gray-500">Product performance metrics</p>
              </div>
            </div>
            
            <!-- Key Metrics -->
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Total Products</span>
                <span class="text-sm font-semibold text-gray-900">{{ productData.totalProducts }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Best Performer</span>
                <span class="text-sm font-semibold text-green-600">{{ productData.bestPerformer }}</span>
              </div>
            </div>
            
            <button
              @click="onViewProductPerformance"
              class="w-full mt-4 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200"
            >
              View Performance
            </button>
          </div>

          <!-- Inventory Analysis Card -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">Inventory Analysis</h3>
              <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors duration-200">
                <font-awesome-icon icon="warehouse" class="text-yellow-600" />
              </div>
            </div>
            
            <!-- Inventory Status -->
            <div class="space-y-3 mb-4">
              <div class="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span class="text-sm text-gray-900">Low Stock</span>
                </div>
                <span class="text-sm font-semibold text-red-600">{{ productData.lowStock }}</span>
              </div>
              
              <div class="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <span class="text-sm text-gray-900">Medium Stock</span>
                </div>
                <span class="text-sm font-semibold text-orange-600">{{ productData.mediumStock }}</span>
              </div>
              
              <div class="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span class="text-sm text-gray-900">Good Stock</span>
                </div>
                <span class="text-sm font-semibold text-green-600">{{ productData.goodStock }}</span>
              </div>
            </div>
            
            <button
              @click="onViewInventoryDetails"
              class="w-full mt-4 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200"
            >
              Manage Inventory
            </button>
          </div>

          <!-- Product Categories Card -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">Product Categories</h3>
              <div class="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors duration-200">
                <font-awesome-icon icon="tags" class="text-teal-600" />
              </div>
            </div>
            
            <!-- Categories Breakdown -->
            <div class="space-y-3">
              <div
                v-for="category in productCategories"
                :key="category.name"
                class="flex items-center justify-between"
              >
                <div class="flex items-center">
                  <div class="w-3 h-3 rounded-full mr-3" :style="{ backgroundColor: category.color }"></div>
                  <span class="text-sm font-medium text-gray-900">{{ category.name }}</span>
                </div>
                <div class="text-right">
                  <span class="text-sm font-semibold text-gray-900">{{ category.count }}</span>
                  <span class="text-xs text-gray-500 ml-1">({{ category.percentage }}%)</span>
                </div>
              </div>
            </div>
            
            <button
              @click="onViewCategoryAnalysis"
              class="w-full mt-4 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200"
            >
              View Categories
            </button>
          </div>
        </div>
      </section>

      <!-- ===== Offline Status Banner ===== -->
      <div 
        v-if="!isOnline" 
        class="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center"
      >
        <font-awesome-icon icon="wifi" class="text-orange-500 mr-3 w-5 h-5" />
        <div>
          <p class="text-sm font-medium text-orange-800">Reports showing cached data</p>
          <p class="text-xs text-orange-600">Connect to the internet to see the latest updates</p>
        </div>
      </div>
    </div>
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * ReportsView.vue - Modern business reports dashboard
 * - Displays comprehensive business analytics with modern card layout
 * - Three main report categories: Sales, Customer, and Product Reports
 * - Time period filtering with date range selection
 * - Export functionality with PDF and WhatsApp sharing
 * - Ghana-optimized: mobile-first, offline support, realistic mock data
 * - Follows DashboardView.vue design principles
 */

// ===== Imports =====
import { ref, computed, onMounted } from 'vue'


// ===== Types & Interfaces =====
/**
 * Time period options for filtering reports
 */
interface TimePeriod {
  label: string
  value: string
  days: number
}

/**
 * Sales data interface for sales reports
 */
interface SalesData {
  totalSales: number
  netRevenue: number
  growthPercent: number
  profitMargin: number
}

/**
 * Customer data interface for customer reports
 */
interface CustomerData {
  totalCustomers: number
  newCustomers: number
  activeCustomers: number
  retentionRate: number
  avgValue: number
  topTenPercentValue: number
}

/**
 * Product data interface for product reports
 */
interface ProductData {
  totalProducts: number
  bestPerformer: string
  lowStock: number
  mediumStock: number
  goodStock: number
}

/**
 * Top performing product interface
 */
interface TopProduct {
  id: string
  name: string
  sales: number
  revenue: number
}

/**
 * Customer regional distribution interface
 */
interface CustomerRegion {
  name: string
  customers: number
  percentage: number
  color: string
}

/**
 * Product category interface
 */
interface ProductCategory {
  name: string
  count: number
  percentage: number
  color: string
}

// ===== State Management =====
/**
 * Network status for offline support
 */
const isOnline = ref(navigator.onLine)

/**
 * Available time periods for filtering
 */
const timePeriods: TimePeriod[] = [
  { label: 'Today', value: 'today', days: 1 },
  { label: 'This Week', value: 'week', days: 7 },
  { label: 'This Month', value: 'month', days: 30 },
  { label: 'Last 3 Months', value: '3months', days: 90 },
  { label: 'This Year', value: 'year', days: 365 }
]

/**
 * Currently selected time period
 */
const selectedPeriod = ref('month')

/**
 * Mock sales data for demonstration (Ghana business context)
 */
const salesData = ref<SalesData>({
  totalSales: 45750, // GHS 45,750
  netRevenue: 38500, // GHS 38,500
  growthPercent: 12.5,
  profitMargin: 25.3
})

/**
 * Mock customer data for demonstration
 */
const customerData = ref<CustomerData>({
  totalCustomers: 248,
  newCustomers: 32,
  activeCustomers: 195,
  retentionRate: 78.5,
  avgValue: 185, // GHS 185 average customer value
  topTenPercentValue: 850 // GHS 850 for top 10% customers
})

/**
 * Mock product data for demonstration
 */
const productData = ref<ProductData>({
  totalProducts: 156,
  bestPerformer: 'Palm Oil (5L)',
  lowStock: 12,
  mediumStock: 45,
  goodStock: 99
})

/**
 * Top performing products with Ghana-relevant items
 */
const topProducts = ref<TopProduct[]>([
  { id: '1', name: 'Palm Oil (5L)', sales: 45, revenue: 2250 },
  { id: '2', name: 'Rice (50kg)', sales: 38, revenue: 1900 },
  { id: '3', name: 'Tomato Paste', sales: 67, revenue: 1340 }
])

/**
 * Customer regional distribution (Ghana regions)
 */
const customerRegions = ref<CustomerRegion[]>([
  { name: 'Greater Accra', customers: 98, percentage: 39.5, color: '#3B82F6' },
  { name: 'Ashanti', customers: 67, percentage: 27.0, color: '#10B981' },
  { name: 'Western', customers: 45, percentage: 18.1, color: '#F59E0B' },
  { name: 'Northern', customers: 28, percentage: 11.3, color: '#8B5CF6' },
  { name: 'Other Regions', customers: 10, percentage: 4.1, color: '#6B7280' }
])

/**
 * Product categories with Ghana business context
 */
const productCategories = ref<ProductCategory[]>([
  { name: 'Food & Beverages', count: 67, percentage: 42.9, color: '#EF4444' },
  { name: 'Personal Care', count: 34, percentage: 21.8, color: '#3B82F6' },
  { name: 'Household Items', count: 28, percentage: 17.9, color: '#10B981' },
  { name: 'Clothing', count: 19, percentage: 12.2, color: '#F59E0B' },
  { name: 'Electronics', count: 8, percentage: 5.2, color: '#8B5CF6' }
])

// ===== Computed Properties =====
/**
 * Current date range display based on selected period
 */
const currentDateRange = computed(() => {
  const now = new Date()
  const period = timePeriods.find(p => p.value === selectedPeriod.value)
  
  if (!period) return 'Current Period'
  
  switch (period.value) {
    case 'today':
      return now.toLocaleDateString('en-GB')
    case 'week':
      const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
      return `${weekStart.toLocaleDateString('en-GB')} - ${now.toLocaleDateString('en-GB')}`
    case 'month':
      return now.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    case '3months':
      const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
      return `${threeMonthsAgo.toLocaleDateString('en-GB')} - ${now.toLocaleDateString('en-GB')}`
    case 'year':
      return now.getFullYear().toString()
    default:
      return 'Current Period'
  }
})

// ===== Helper Functions =====
/**
 * Format currency for Ghana Cedi display
 * @param amount - Amount to format
 * @returns Formatted currency string
 */
function formatCurrency(amount: number): string {
  return `GH₵ ${amount.toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`
}

// ===== Event Handlers =====
/**
 * Handle PDF export action
 * Generates and downloads a PDF report
 */
function onExportPDF() {
  // TODO: Implement actual PDF generation
  alert(`Exporting ${selectedPeriod.value} reports to PDF (feature coming soon)`)
}

/**
 * Handle WhatsApp sharing action
 * Opens WhatsApp with business report summary
 */
function onShareWhatsApp() {
  const reportSummary = `📊 *Business Report Summary*\n\n` +
    `📅 Period: ${currentDateRange.value}\n\n` +
    `💰 *Sales Performance:*\n` +
    `• Total Sales: ${formatCurrency(salesData.value.totalSales)}\n` +
    `• Growth: +${salesData.value.growthPercent}%\n\n` +
    `👥 *Customer Insights:*\n` +
    `• Total Customers: ${customerData.value.totalCustomers}\n` +
    `• New Customers: ${customerData.value.newCustomers}\n\n` +
    `📦 *Product Performance:*\n` +
    `• Total Products: ${productData.value.totalProducts}\n` +
    `• Best Seller: ${productData.value.bestPerformer}\n\n` +
    `Generated by Sales Tracker 📱`

  const message = encodeURIComponent(reportSummary)
  const whatsappUrl = `whatsapp://send?text=${message}`
  
  window.open(whatsappUrl, '_blank')
}

/**
 * Handle view sales details action
 */
function onViewSalesDetails() {
  alert('Detailed sales analytics (feature coming soon)')
}

/**
 * Handle view revenue details action
 */
function onViewRevenueDetails() {
  alert('Revenue analysis dashboard (feature coming soon)')
}

/**
 * Handle view top products action
 */
function onViewTopProducts() {
  alert('Complete product performance report (feature coming soon)')
}

/**
 * Handle view customer details action
 */
function onViewCustomerDetails() {
  alert('Customer analytics dashboard (feature coming soon)')
}

/**
 * Handle view regional analysis action
 */
function onViewRegionalAnalysis() {
  alert('Interactive regional map view (feature coming soon)')
}

/**
 * Handle view customer value action
 */
function onViewCustomerValue() {
  alert('Customer segmentation analysis (feature coming soon)')
}

/**
 * Handle view product performance action
 */
function onViewProductPerformance() {
  alert('Product performance metrics (feature coming soon)')
}

/**
 * Handle view inventory details action
 */
function onViewInventoryDetails() {
  alert('Inventory management dashboard (feature coming soon)')
}

/**
 * Handle view category analysis action
 */
function onViewCategoryAnalysis() {
  alert('Product category insights (feature coming soon)')
}

// ===== Lifecycle Hooks =====
/**
 * Setup network status monitoring and initialize data
 */
onMounted(() => {
  // Monitor network status for offline support
  window.addEventListener('online', () => {
    isOnline.value = true
  })
  
  window.addEventListener('offline', () => {
    isOnline.value = false
  })

  // TODO: Replace with actual API calls
  // loadReportsData()
})
</script>

<style scoped>
/* ===== [New Feature] START: Modern Reports Styling ===== */
/* Touch feedback for mobile users */
button:active {
  transform: scale(0.98);
}

/* Enhanced focus states for accessibility */
button:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}

/* Card hover effects matching DashboardView */
.group:hover {
  transform: translateY(-2px);
}

/* Smooth transitions for all interactive elements */
.group {
  transition: all 0.2s ease-in-out;
}

/* Chart placeholder hover effects */
.group:hover .h-32 {
  background-color: theme('colors.gray.100');
}

/* Button state transitions */
button {
  transition: all 0.2s ease-in-out;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .min-h-screen {
    padding-bottom: 2rem;
  }
  
  /* Ensure touch targets are at least 48px */
  button {
    min-height: 48px;
  }
  
  /* Stack time period buttons on mobile */
  .flex-wrap {
    gap: 0.5rem;
  }
}

/* Loading states for future chart integration */
.chart-loading {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
/* ===== [New Feature] END ===== */
</style>