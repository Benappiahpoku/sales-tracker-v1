<!--
  ProductList.vue
  Stratonea/Sales Tracker - List of products, mobile-first.
  - Uses ProductCard.vue for mobile card layout (DRY, maintainable)
  - Table layout for desktop (per design wireframe)
  - Follows Stratonea guidelines (see copilot-instructions.md)
  - All props, emits, and helpers documented for learning
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <!-- Mobile Card Layout: Use ProductCard.vue for each product, with actions inside card -->
  <div class="block md:hidden">
    <div class="space-y-4 max-w-md mx-auto my-4">
      <ProductCard
        v-for="product in products"
        :key="product.sku"
        :name="product.name"
        :sku="product.sku"
        :price="product.price"
        :stock="product.stock"
        @edit="onEdit(product)"
        @delete="onDelete(product)"
      />
    </div>
  </div>
  <!-- ===== [New Feature] END ===== -->

  <!-- Desktop Table Layout (unchanged, per design) -->
  <table class="hidden md:table min-w-full border-separate border-spacing-0">
    <!-- Table Header -->
    <thead class="bg-gray-50">
      <tr>
        <th class="px-6 py-4 text-left">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-gray-600">Product</span>
          </div>
        </th>
        <th class="px-6 py-4 text-left">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-gray-600">SKU</span>
          </div>
        </th>
        <th class="px-6 py-4 text-right">
          <div class="flex items-center justify-end gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-gray-600">Price</span>
          </div>
        </th>
        <th class="px-6 py-4 text-center">
          <div class="flex items-center justify-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-gray-600">Stock</span>
          </div>
        </th>
        <th class="px-6 py-4 text-right">
          <span class="text-xs font-bold uppercase tracking-wider text-gray-600">Actions</span>
        </th>
      </tr>
    </thead>

    <!-- Table Body -->
    <tbody class="divide-y divide-gray-200 bg-white">
      <tr v-for="product in products" :key="product.sku"
        class="hover:bg-gray-50/50 transition-colors duration-150 ease-in-out">
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="font-medium text-gray-900">{{ product.name }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-600 font-mono">{{ product.sku }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right">
          <div class="text-sm font-medium text-gray-900">{{ formatCurrency(product.price) }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-center">
          <div class="text-sm text-gray-900">{{ product.stock }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
          <button @click="onEdit(product)"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150">
            Edit
          </button>
          <button @click="onDelete(product)"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Empty State -->
  <div v-if="(products?.length ?? 0) === 0" class="text-center py-12 bg-gray-50 border-t border-gray-200">
    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
    <h3 class="mt-2 text-sm font-medium text-gray-900">No products</h3>
    <p class="mt-1 text-sm text-gray-500">Get started by adding new products.</p>
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
/**
 * Import ProductCard for mobile card layout.
 */
import ProductCard from '@/components/layout/ProductCard.vue'

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
 * Emits events to parent for edit and delete actions.
 */
const emit = defineEmits<{
  (e: 'edit', product: Product): void
  (e: 'delete', product: Product): void
}>()

// ===== Main Logic =====
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
  - Card layout is mobile-first, touch-optimized (min-h-[48px] for actions)
  - Uses Tailwind for color, spacing, and responsive design
  - Accessible: aria-labels, clear feedback
  - Ghana-optimized: vertical stacking, large touch targets
  - ProductCard.vue is now the single source of card design for mobile
-->