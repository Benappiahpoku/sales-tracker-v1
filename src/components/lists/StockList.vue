<!--
  StockList.vue
  Stratonea/Sales Tracker - Responsive stock list with:
  - Mobile: Vertical card layout
  - Desktop: Horizontal table layout
  - Ghana-optimized: offline-friendly, touch targets
  - Uses Tailwind utility classes for styling
-->

<template>
  <!-- Mobile Card Layout (default) -->
  <div class="block md:hidden">
    <div class="space-y-4 max-w-md mx-auto my-4">
      <div v-for="item in stock" :key="item.id" class="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2">
        <!-- Stock Details: Stacked vertically for mobile -->
        <div class="flex flex-col gap-1 text-sm">
          <div class="flex justify-between">
            <span class="font-semibold text-gray-700">Product:</span>
            <span class="text-gray-900">{{ item.productName }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold text-gray-700">SKU:</span>
            <span class="text-gray-900">{{ item.sku }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold text-gray-700">Current Stock:</span>
            <span class="text-gray-900">{{ item.stock }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold text-gray-700">Change:</span>
            <span :class="changeClass(item.change)">
              {{ item.change > 0 ? '+' : '' }}{{ item.change }}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold text-gray-700">Reason:</span>
            <span class="text-gray-900">{{ item.reason }}</span>
          </div>
        </div>

        <!-- Mobile Action Buttons -->
        <div class="flex flex-col gap-2 mt-2">
          <button
            class="w-full min-h-[48px] bg-primary text-white rounded-lg font-bold text-base shadow-sm hover:bg-primary-dark transition-colors"
            @click="onEdit(item)" aria-label="Edit Stock Item">
            Edit
          </button>
          <button
            class="w-full min-h-[48px] bg-red-600 text-white rounded-lg font-bold text-base shadow-sm hover:bg-red-700 transition-colors"
            @click="onDelete(item)" aria-label="Delete Stock Item">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Desktop Table Layout -->

  <table class="hidden md:table min-w-full border-separate border-spacing-0">
    <!-- Table Header -->
    <thead class="bg-gray-50">
      <tr>
        <th class=" top-0 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
          Product
        </th>
        <th class=" top-0 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          SKU
        </th>
        <th class=" top-0 px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
          Current Stock
        </th>
        <th class=" top-0 px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
          Change
        </th>
        <th class=" top-0 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          Reason
        </th>
        <th class=" top-0 py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900">
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
          <span :class="[
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
            changeClass(item.change)
          ]">
            {{ item.change > 0 ? '+' : '' }}{{ item.change }}
          </span>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
          {{ item.reason }}
        </td>
        <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm space-x-2">
          <button @click="onEdit(item)"
            class="inline-flex items-center px-2.5 py-1.5 text-sm font-medium text-white bg-primary rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            Edit
          </button>
          <button @click="onDelete(item)"
            class="inline-flex items-center px-2.5 py-1.5 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
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
      { id: '1', productName: 'Sample Product', sku: 'SKU-001', stock: 25, change: +10, reason: 'Restock', type: 'restock' },
      { id: '2', productName: 'Another Product', sku: 'SKU-002', stock: 10, change: -5, reason: 'Sold', type: 'remove' }
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
// Update the existing changeClass function
function changeClass(change: number): string {
  if (change > 0) return 'bg-green-100 text-green-800'
  if (change < 0) return 'bg-red-100 text-red-800'
  return 'bg-gray-100 text-gray-800'
}
</script>

<!--
  ===== Styling Notes =====
  - Uses responsive classes (md:) for desktop/mobile switching
  - Mobile: Card layout with full-width buttons
  - Desktop: Table layout with horizontal rows
  - Consistent colors and spacing across both layouts
  - Touch-optimized for mobile, precise for desktop
-->