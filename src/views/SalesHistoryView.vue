<!--
  SalesHistoryView.vue
  Stratonea/Sales Tracker - Enhanced sales history view with:
  - Mobile: Card layout with infinite scroll and grouping
  - Desktop: Table layout with filtering
  - Ghana-optimized: offline-friendly, touch targets
  - Follows Stratonea guidelines
-->

<template>
  <div class="min-h-screen bg-gray-50 px-2 py-4">
    <!-- Header with Filter Tabs -->
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Sales History</h1>
      <div class="mt-4 flex space-x-2 border-b border-gray-200">
        <button 
          v-for="tab in tabs" 
          :key="tab.value" 
          @click="currentFilter = tab.value"
          class="px-4 py-2 -mb-px text-sm font-medium" 
          :class="[
            currentFilter === tab.value 
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          ]"
        >
          {{ tab.label }}
          <span class="ml-2 text-xs rounded-full bg-gray-100 px-2 py-0.5">
            {{ getFilterCount(tab.value) }}
          </span>
        </button>
      </div>
    </header>

    <!-- Offline Alert -->
    <div v-if="!isOnline" class="mb-4 bg-amber-50 border-l-4 border-amber-400 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <font-awesome-icon icon="triangle-exclamation" class="h-5 w-5 text-amber-400" />
        </div>
        <div class="ml-3">
          <p class="text-sm text-amber-700">
            You're offline. Changes will sync when you're back online.
          </p>
        </div>
      </div>
    </div>

    <!-- Mobile View with Grouping -->
    <div class="block md:hidden">
      <!-- Group By Selector -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Group by:</label>
        <select 
          v-model="groupingOption"
          class="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        >
          <option value="none">No Grouping</option>
          <option value="day">By Day</option>
          <option value="week">By Week</option>
          <option value="month">By Month</option>
        </select>
      </div>

      <!-- Sales List with Infinite Scroll -->
      <div 
        ref="scrollContainer"
        class="space-y-4 pb-24"
        @scroll="handleScroll"
      >
        <!-- Ungrouped View -->
        <template v-if="groupingOption === 'none'">
          <SalesCard
            v-for="sale in paginatedSales"
            :key="sale.id"
            v-bind="sale"
            @view="onViewSale(sale)"
            @delete="onDeleteSale(sale)"
          />
        </template>

        <!-- Grouped View -->
        <template v-else>
          <div 
            v-for="(group, label) in groupedSales" 
            :key="label" 
            class="mb-6"
          >
            <!-- Group Header -->
            <div class="sticky top-0 z-10 bg-gray-50/95 backdrop-blur-sm p-3 mb-2 rounded-lg shadow-sm">
              <div class="flex justify-between items-center">
                <h3 class="font-semibold text-gray-900">{{ label }}</h3>
                <span class="text-sm text-primary font-medium">
                  {{ formatCurrency(getGroupTotal(group)) }}
                </span>
              </div>
            </div>
            <!-- Group Items -->
            <div class="space-y-4">
              <SalesCard
                v-for="sale in group"
                :key="sale.id"
                v-bind="sale"
                @view="onViewSale(sale)"
                @delete="onDeleteSale(sale)"
              />
            </div>
          </div>
        </template>

        <!-- Loading State -->
        <div v-if="isLoadingMore" class="py-4 text-center text-gray-600">
          <font-awesome-icon icon="spinner" spin class="mr-2" />
          Loading more...
        </div>
      </div>
    </div>

    <!-- Desktop Table Layout -->
        <!-- Desktop Table Layout -->
    <div class="hidden md:block overflow-hidden">
      <!-- Group By & Filter Controls -->
      <div class="mb-6 flex items-center justify-between">
        <!-- Group By Selector -->
        <div class="flex items-center gap-4">
          <label class="block text-sm font-medium text-gray-700">Group by:</label>
          <select 
            v-model="groupingOption"
            class="w-48 rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm"
          >
            <option value="none">No Grouping</option>
            <option value="day">By Day</option>
            <option value="week">By Week</option>
            <option value="month">By Month</option>
          </select>
        </div>
    
        <!-- Quick Actions -->
        <div class="flex items-center gap-4">
          <!-- Export Button -->
          <button 
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <font-awesome-icon icon="download" class="mr-2" />
            Export
          </button>
          <!-- New Sale Button -->
          <button 
            @click="onNewSale"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
          >
            <font-awesome-icon icon="plus" class="mr-2" />
            New Sale
          </button>
        </div>
      </div>
    
      <!-- Ungrouped Table View -->
      <template v-if="groupingOption === 'none'">
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                  Date & Time
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                  Customer
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-600">
                  Amount
                </th>
                <th scope="col" class="px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-gray-600">
                  Status
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="sale in paginatedSales" :key="sale.id"
                class="hover:bg-gray-50/50 transition-colors duration-150 ease-in-out">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDate(sale.date) }}</div>
                  <div class="text-sm text-gray-500">{{ formatTime(sale.date) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium text-gray-900">{{ sale.customer }}</div>
                  <div class="text-sm text-gray-500">{{ sale.invoiceNumber }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right">
                  <div class="text-sm font-medium text-gray-900">
                    {{ formatCurrency(sale.amount) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    sale.status === 'paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  ]">
                    {{ sale.status === 'paid' ? 'Paid' : 'Unpaid' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button @click="onViewSale(sale)"
                    class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-primary hover:text-primary-dark"
                  >
                    <font-awesome-icon icon="eye" class="mr-1" />
                    View
                  </button>
                  <button @click="onDeleteSale(sale)"
                    class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    <font-awesome-icon icon="trash" class="mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    
      <!-- Grouped Table View -->
      <template v-else>
        <div v-for="(group, label) in groupedSales" :key="label" class="mb-8">
          <!-- Group Header -->
          <div class="bg-gray-50 p-4 rounded-t-lg border border-gray-200">
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-3">
                <h3 class="font-semibold text-gray-900">{{ label }}</h3>
                <span class="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  {{ group.length }} {{ group.length === 1 ? 'sale' : 'sales' }}
                </span>
              </div>
              <div class="flex items-center gap-4">
                <span class="text-sm text-gray-600">Total:</span>
                <span class="text-sm font-medium text-primary">
                  {{ formatCurrency(getGroupTotal(group)) }}
                </span>
              </div>
            </div>
          </div>
    
          <!-- Group Table -->
          <div class="bg-white shadow-sm border border-t-0 border-gray-200 rounded-b-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50/50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                    Time
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                    Customer
                  </th>
                  <th scope="col" class="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-600">
                    Amount
                  </th>
                  <th scope="col" class="px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-gray-600">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="sale in group" :key="sale.id"
                  class="hover:bg-gray-50/50 transition-colors duration-150 ease-in-out">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ formatTime(sale.date) }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="font-medium text-gray-900">{{ sale.customer }}</div>
                    <div class="text-sm text-gray-500">{{ sale.invoiceNumber }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right">
                    <div class="text-sm font-medium text-gray-900">
                      {{ formatCurrency(sale.amount) }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-center">
                    <span :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      sale.status === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    ]">
                      {{ sale.status === 'paid' ? 'Paid' : 'Unpaid' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button @click="onViewSale(sale)"
                      class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-primary hover:text-primary-dark"
                    >
                      <font-awesome-icon icon="eye" class="mr-1" />
                      View
                    </button>
                    <button @click="onDeleteSale(sale)"
                      class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      <font-awesome-icon icon="trash" class="mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    
      <!-- Load More Button (if needed) -->
      <div v-if="hasMoreItems" class="mt-4 text-center">
        <button
          @click="loadMore"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          :disabled="isLoadingMore"
        >
          <font-awesome-icon v-if="isLoadingMore" icon="spinner" spin class="mr-2" />
          {{ isLoadingMore ? 'Loading...' : 'Load More' }}
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredSales.length === 0" class="text-center py-12 bg-gray-50 border-t border-gray-200">
      <font-awesome-icon icon="receipt" class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-2 text-sm font-medium text-gray-900">No sales found</h3>
      <p class="mt-1 text-sm text-gray-500">
        {{ getEmptyStateMessage(currentFilter) }}
      </p>
    </div>

    <!-- FAB for New Sale -->
    <button 
      @click="onNewSale"
      class="fixed bottom-20 right-4 md:hidden z-50 bg-green-500 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      aria-label="Add Sale"
    >
      <font-awesome-icon icon="plus" class="text-2xl" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { format, startOfWeek, parseISO } from 'date-fns'
import SalesCard from '@/components/layout/SalesCard.vue'

// ===== Types & Interfaces =====
interface Sale {
  id: string
  date: string
  customer: string
  amount: number
  status: 'paid' | 'unpaid'
  invoiceNumber?: string
  receiptNumber?: string
}

// ===== Constants =====
const tabs = [
  { label: 'All Sales', value: 'all' },
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Paid', value: 'paid' }
] as const

// ===== State =====
const router = useRouter()
const scrollContainer = ref<HTMLElement | null>(null)
const currentFilter = ref<'all' | 'paid' | 'unpaid'>('all')
const groupingOption = ref<'none' | 'day' | 'week' | 'month'>('none')
const isOnline = ref(navigator.onLine)
const pageSize = ref(20)
const currentPage = ref(1)
const isLoadingMore = ref(false)

// Mock data - replace with real data
const sales = ref<Sale[]>([
  {
    id: '1',
    date: '2025-06-25',
    customer: 'Ama Serwaa',
    amount: 500,
    status: 'paid',
    invoiceNumber: 'INV-001',
    receiptNumber: 'RCP-001'
  },
  {
    id: '2',
    date: '2025-06-24',
    customer: 'Kwame Mensah',
    amount: 350,
    status: 'unpaid',
    invoiceNumber: 'INV-002'
  }
])

// ===== Computed =====
const filteredSales = computed(() => {
  let items = sales.value
  if (currentFilter.value !== 'all') {
    items = items.filter(sale => sale.status === currentFilter.value)
  }
  return items
})

const paginatedSales = computed(() => {
  return filteredSales.value.slice(0, currentPage.value * pageSize.value)
})

const groupedSales = computed(() => {
  if (groupingOption.value === 'none') return {}

  return paginatedSales.value.reduce((groups, sale) => {
    const date = parseISO(sale.date)
    let label: string

    switch (groupingOption.value) {
      case 'day':
        label = format(date, 'MMMM d, yyyy')
        break
      case 'week':
        label = `Week of ${format(startOfWeek(date), 'MMM d')}`
        break
      case 'month':
        label = format(date, 'MMMM yyyy')
        break
      default:
        label = 'Ungrouped'
    }

    if (!groups[label]) {
      groups[label] = []
    }
    groups[label].push(sale)
    return groups
  }, {} as Record<string, Sale[]>)
})

const hasMoreItems = computed(() => {
  return currentPage.value * pageSize.value < filteredSales.value.length
})

// ===== Methods =====
function handleScroll(event: Event) {
  const target = event.target as HTMLElement
  const { scrollTop, scrollHeight, clientHeight } = target
  
  // Load more when user scrolls near bottom
  if (scrollHeight - scrollTop <= clientHeight * 1.5 && !isLoadingMore.value && hasMoreItems.value) {
    loadMore()
  }
}

function getFilterCount(filter: 'all' | 'paid' | 'unpaid'): number {
  if (filter === 'all') return sales.value.length
  return sales.value.filter(sale => sale.status === filter).length
}

function getEmptyStateMessage(filter: 'all' | 'paid' | 'unpaid'): string {
  switch (filter) {
    case 'paid':
      return 'No paid sales found'
    case 'unpaid':
      return 'No pending invoices found'
    default:
      return 'Get started by creating a new sale'
  }
}

function getGroupTotal(sales: Sale[]): number {
  return sales.reduce((sum, sale) => sum + sale.amount, 0)
}

function onViewSale(sale: Sale) {
  router.push(`/sales/${sale.id}`)
}

function onDeleteSale(sale: Sale) {
  if (confirm('Are you sure you want to delete this sale?')) {
    sales.value = sales.value.filter(s => s.id !== sale.id)
  }
}

function onNewSale() {
  router.push('/new-sale')
}

async function loadMore() {
  if (isLoadingMore.value || !hasMoreItems.value) return

  isLoadingMore.value = true
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    currentPage.value++
  } finally {
    isLoadingMore.value = false
  }
}

function formatCurrency(amount: number): string {
  return `GHS ${amount.toFixed(2)}`
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

// ===== Lifecycle Hooks =====
onMounted(() => {
  window.addEventListener('online', () => {
    isOnline.value = true
  })

  window.addEventListener('offline', () => {
    isOnline.value = false
  })
})

onUnmounted(() => {
  window.removeEventListener('online', () => {
    isOnline.value = true
  })

  window.removeEventListener('offline', () => {
    isOnline.value = false
  })
})
function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

</script>