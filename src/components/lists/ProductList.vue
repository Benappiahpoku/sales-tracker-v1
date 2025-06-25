<!--
  ProductList.vue
  Stratonea/BizPoint - Table to display product list.
  - Mobile-first, Ghana-optimized, offline-friendly
  - Uses Tailwind utility classes for styling
  - Follows Stratonea guidelines (see copilot-instructions.md)
  - Uses mock/static data for now (replace with real data later)
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <div class="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto my-4">
    <!-- Table Header -->
    <div class="flex justify-between items-center mb-2">
      <span class="text-lg font-bold text-primary">Products</span>
      <button
        class="bg-primary text-white px-4 py-2 rounded-lg font-bold min-h-[48px] hover:bg-primary-dark transition-colors"
        @click="onAdd"
        aria-label="Add Product"
      >
        + Add
      </button>
    </div>
    <!-- Product Table -->
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-gray-200">
          <th class="text-left py-2">Name</th>
          <th class="text-left py-2">SKU</th>
          <th class="text-right py-2">Price</th>
          <th class="text-right py-2">Stock</th>
          <th class="text-center py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in products"
          :key="product.sku"
          class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <td class="py-2 font-medium text-gray-900">{{ product.name }}</td>
          <td class="py-2 text-gray-500">{{ product.sku }}</td>
          <td class="py-2 text-right text-gray-700">{{ formatCurrency(product.price) }}</td>
          <td class="py-2 text-right text-gray-700">{{ product.stock }}</td>
          <td class="py-2 text-center">
            <button
              class="text-primary font-bold px-2"
              @click="onEdit(product)"
              aria-label="Edit"
            >
              Edit
            </button>
            <button
              class="text-red-600 font-bold px-2"
              @click="onDelete(product)"
              aria-label="Delete"
            >
              Delete
            </button>
          </td>
        </tr>
        <tr v-if=" (products?.length ?? 0 ) === 0 ">
          <td colspan="5" class="text-center text-gray-400 py-4">No products found.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
/**
 * Product type for the product list.
 */
interface Product {
  name: string
  sku: string
  price: number
  stock: number
}

// ===== Props =====
/**
 * Props for ProductList
 * - products: Product[] (array of products)
 */
withDefaults(
  defineProps<{
    products?: Product[]
  }>(),
  {
    products: () => [
      { name: 'Sample Product', sku: 'SKU-001', price: 10, stock: 25 },
      { name: 'Another Product', sku: 'SKU-002', price: 20, stock: 10 }
    ]
  }
)

// ===== Emits =====
/**
 * Emits events to parent for add, edit, and delete actions.
 */
const emit = defineEmits<{
  (e: 'add'): void
  (e: 'edit', product: Product): void
  (e: 'delete', product: Product): void
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
 * @param product - The product to edit
 */
function onEdit(product: Product) {
  emit('edit', product)
}

/**
 * Handles delete button click.
 * @param product - The product to delete
 */
function onDelete(product: Product) {
  emit('delete', product)
}

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
  - Table is mobile-first, touch-optimized (min-h-[48px] for actions).
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: aria-labels, clear feedback.
-->