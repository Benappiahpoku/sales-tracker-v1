<!--
  StockList.vue
  Stratonea/BizPoint - Table to display stock/inventory list.
  - Ghana-optimized: mobile-first, offline-friendly, simple UI
  - Uses Tailwind utility classes for styling
  - Follows Stratonea guidelines and file structure
  - Uses mock/static data for now (replace with real data later)
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <div class="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto my-4">
    <!-- Table Header -->
    <div class="flex justify-between items-center mb-2">
      <span class="text-lg font-bold text-primary">Stock</span>
      <button
        class="bg-primary text-white px-4 py-2 rounded-lg font-bold min-h-[48px] hover:bg-primary-dark transition-colors"
        @click="onAdd"
        aria-label="Add Stock"
      >
        + Add
      </button>
    </div>
    <!-- Stock Table -->
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-gray-200">
          <th class="text-left py-2">Product</th>
          <th class="text-left py-2">SKU</th>
          <th class="text-right py-2">Change</th>
          <th class="text-right py-2">Stock</th>
          <th class="text-left py-2">Reason</th>
          <th class="text-center py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in stock"
          :key="item.id"
          class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <td class="py-2 font-medium text-gray-900">{{ item.productName }}</td>
          <td class="py-2 text-gray-500">{{ item.sku }}</td>
          <td class="py-2 text-right">
            <span :class="changeClass(item.change)">
              {{ item.change > 0 ? '+' : '' }}{{ item.change }}
            </span>
          </td>
          <td class="py-2 text-right text-gray-700">{{ item.stock }}</td>
          <td class="py-2 text-gray-500">{{ item.reason }}</td>
          <td class="py-2 text-center">
            <button
              class="text-primary font-bold px-2"
              @click="onEdit(item)"
              aria-label="Edit"
            >
              Edit
            </button>
            <button
              class="text-red-600 font-bold px-2"
              @click="onDelete(item)"
              aria-label="Delete"
            >
              Delete
            </button>
          </td>
        </tr>
        <!-- ===== [New Feature] START: Safe empty check ===== -->
        <tr v-if="(stock?.length ?? 0) === 0">
          <td colspan="6" class="text-center text-gray-400 py-4">No stock records found.</td>
        </tr>
        <!-- ===== [New Feature] END ===== -->
      </tbody>
    </table>
  </div>
  <!-- ===== [New Feature] END ===== -->
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
 * Emits events to parent for add, edit, and delete actions.
 */
const emit = defineEmits<{
  (e: 'add'): void
  (e: 'edit', item: StockItem): void
  (e: 'delete', item: StockItem): void
}>()

// ===== Main Logic =====
/**
 * Handles add button click.
 */
function onAdd() {
  emit('add')
}

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
 * Returns a Tailwind class for positive or negative stock change.
 * @param change - The stock change value
 * @returns string
 */
function changeClass(change: number): string {
  if (change > 0) return 'text-green-600 font-bold'
  if (change < 0) return 'text-red-600 font-bold'
  return 'text-gray-700'
}
</script>

<!--
  ===== Styling Notes =====
  - Table is mobile-first, touch-optimized (min-h-[48px] for actions).
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: aria-labels, clear feedback.
  - Color-coded change: green for positive, red for negative, gray for zero.
-->