<!--
  StockList.vue
  Stratonea/Sales Tracker - Responsive stock list with:
  - Mobile: Vertical card layout using StockCard
  - Desktop: Horizontal table layout
  - Ghana-optimized: offline-friendly, touch targets
  - Uses Tailwind utility classes for styling
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <!-- Mobile Card Layout: Use StockCard for each item -->
  <div class="block md:hidden">
    <div class="space-y-4 max-w-md mx-auto my-4">
      <StockCard
        v-for="item in stock"
        :key="item.id"
        :product-name="item.productName"
        :sku="item.sku"
        :stock="item.stock"
        :change="item.change"
        :date="item.date || 'Today'"
        :reason="item.reason"
        @edit="onEdit(item)"
        @delete="onDelete(item)"
      />
    </div>
  </div>
  <!-- ===== [New Feature] END ===== -->

  <!-- Desktop Table Layout -->
  <table class="hidden md:table min-w-full border-separate border-spacing-0">
    <!-- Table Header -->
    <thead class="bg-gray-50">
      <tr>
        <th class="top-0 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
          Product
        </th>
        <th class="top-0 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          SKU
        </th>
        <th class="top-0 px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
          Current Stock
        </th>
        <th class="top-0 px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
          Change
        </th>
        <th class="top-0 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          Reason
        </th>
        <th class="top-0 py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900">
          Actions
        </th>
      </tr>
    </thead>

    <!-- Table Body -->
    <tbody class="bg-white">
      <tr v-for="item in stock" :key="item.id" class="hover:bg-gray-50">
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
          {{ item.productName }}
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
          {{ item.sku }}
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900">
          {{ item.stock }}
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-center">
          <span :class="[changeClass(item.change)]">
            {{ item.change > 0 ? '+' : '' }}{{ item.change }}
          </span>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
          {{ item.reason }}
        </td>
        <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm space-x-2">
          <button @click="onEdit(item)"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150">
            Edit
          </button>
          <button @click="onDelete(item)"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Empty State -->
  <div v-if="(stock?.length ?? 0) === 0" class="text-center py-12 bg-gray-50">
    <p class="text-sm text-gray-500">No stock items found</p>
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import StockCard from '@/components/layout/StockCard.vue'

// ===== Types & Interfaces =====
/**
 * Stock item type for the stock list.
 */
interface StockItem {
  id: string
  productName: string
  sku: string
  stock: number
  change: number
  reason: string
  date?: string
  type: 'restock' | 'remove' | 'correction' | ''
}

// ===== Props =====
/**
 * Props for StockList
 * - stock: StockItem[] (array of stock records)
 */
withDefaults(
  defineProps<{
    stock?: StockItem[]
  }>(),
  {
    stock: () => [
      { 
        id: '1', 
        productName: 'Sample Product', 
        sku: 'SKU-001', 
        stock: 25, 
        change: +10, 
        reason: 'Restock',
        date: '2025-06-25',
        type: 'restock' 
      },
      { 
        id: '2', 
        productName: 'Another Product', 
        sku: 'SKU-002', 
        stock: 10, 
        change: -5, 
        reason: 'Sold',
        date: '2025-06-25', 
        type: 'remove' 
      }
    ]
  }
)

// ===== Emits =====
/**
 * Emits events to parent for edit and delete actions.
 */
const emit = defineEmits<{
  (e: 'edit', item: StockItem): void
  (e: 'delete', item: StockItem): void
}>()

// ===== Main Logic =====
/**
 * Handles edit button click.
 * @param item - The stock item to edit
 */
function onEdit(item: StockItem) {
  emit('edit', item)
}

/**
 * Handles delete button click.
 * @param item - The stock item to delete
 */
function onDelete(item: StockItem) {
  emit('delete', item)
}

/**
 * Returns Tailwind classes for positive or negative stock changes.
 * @param change - The stock change value
 * @returns string (Tailwind classes)
 */
function changeClass(change: number): string {
  if (change > 0) return 'text-green-600 font-bold'
  if (change < 0) return 'text-red-600 font-bold'
  return 'text-gray-700'
}
</script>

<!--
  ===== Styling Notes =====
  - Uses responsive classes (md:) for desktop/mobile switching
  - Mobile: Card layout with StockCard component
  - Desktop: Table layout with horizontal rows
  - Consistent colors and spacing across both layouts
  - Touch-optimized for mobile, precise for desktop
-->