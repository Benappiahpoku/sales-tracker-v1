<!--
  ProductList.vue
  Stratonea/Sales Tracker - Modern product list with responsive table/card layout
  - Mobile: Modern card layout with ProductCard components
  - Desktop: Modern table layout with hover effects and color-coded stock
  - Consistent styling with dashboard design
  - Ghana-optimized: touch targets, clear pricing, offline support
  - All props, emits, and helpers documented for learning
  - Follows Stratonea guidelines
-->

<template>
  <div class="product-list-container">
    <!-- ===== [New Feature] START: Mobile Card View ===== -->
    <!-- Mobile View: Card Layout -->
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
          @add-to-sale="onAddToSale(product)"
        />
      </div>
    </div>
    <!-- ===== [New Feature] END ===== -->

    <!-- ===== [New Feature] START: Desktop Table View ===== -->
    <!-- Desktop View: Modern Table Layout -->
    <div class="hidden md:block">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <!-- Table Header -->
        <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Products</h3>
        </div>

        <!-- Table Content -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <!-- Table Headers -->
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <!-- Table Body -->
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="product in products"
                :key="product.sku"
                class="hover:bg-gray-50 transition-colors duration-150"
              >
                <!-- Product Name with Icon -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                      <font-awesome-icon icon="box" class="text-primary-600" />
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                    </div>
                  </div>
                </td>

                <!-- SKU -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 font-mono">{{ product.sku }}</div>
                </td>

                <!-- Price - Prominently Displayed -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold text-primary-600">
                    {{ formatCurrency(product.price) }}
                  </div>
                </td>

                <!-- Stock Count -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ product.stock }} units</div>
                </td>

                <!-- Stock Status with Color-Coded Badge -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      getStockStatusClass(product.stock)
                    ]"
                  >
                    <div 
                      :class="[
                        'w-2 h-2 rounded-full mr-1.5',
                        getStockDotClass(product.stock)
                      ]"
                    ></div>
                    {{ getStockStatusText(product.stock) }}
                  </span>
                </td>

                <!-- Action Buttons -->
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end gap-2">
                    <!-- Add to Sale Button -->
                    <button
                      @click="onAddToSale(product)"
                      class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150"
                      :disabled="product.stock <= 0"
                      :aria-label="`Add ${product.name} to sale`"
                    >
                      <font-awesome-icon icon="plus" class="mr-1" />
                      Add to Sale
                    </button>

                    <!-- Edit Button -->
                    <button
                      @click="onEdit(product)"
                      class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150"
                      :aria-label="`Edit ${product.name}`"
                    >
                      Edit
                    </button>

                    <!-- Delete Button -->
                    <button
                      @click="onDelete(product)"
                      class="inline-flex items-center px-3 py-2 border border-red-300 text-sm leading-4 font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150"
                      :aria-label="`Delete ${product.name}`"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="products.length === 0" class="text-center py-12">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <font-awesome-icon icon="box" class="text-gray-400 text-2xl" />
          </div>
          <h3 class="text-sm font-medium text-gray-900 mb-2">No products found</h3>
          <p class="text-sm text-gray-500">Get started by adding your first product.</p>
        </div>
      </div>
    </div>
    <!-- ===== [New Feature] END ===== -->
  </div>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * ProductList.vue - Responsive product list component
 * - Mobile: Card-based layout using ProductCard components
 * - Desktop: Modern table layout with hover effects
 * - Color-coded stock levels and status indicators
 * - Quick action buttons for Add to Sale, Edit, Delete
 * - Ghana-optimized: clear GHS pricing, touch-friendly
 * - Emits events to parent for product management
 */

// ===== Imports =====
/**
 * Import the ProductCard component for mobile card layout
 * This component handles individual product display on mobile devices
 */
import ProductCard from '@/components/layout/ProductCard.vue'

// ===== Types & Interfaces =====
/**
 * Product interface defining the structure of product data
 * - id: Unique identifier for the product
 * - name: Display name of the product
 * - sku: Stock Keeping Unit (unique product code)
 * - price: Product price in Ghana Cedis
 * - stock: Current stock level (number of units available)
 * - description: Optional product description
 * - category: Optional product category
 */
interface Product {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  description?: string
  category?: string
}

// ===== Props =====
/**
 * Component props
 * - products: Array of products to display
 */
 withDefaults(
  defineProps<{
    products: Product[]
  }>(),
  {
    products: () => []
  }
)

// ===== Emits =====
/**
 * Events emitted by ProductList
 * - edit: User wants to edit a product
 * - delete: User wants to delete a product
 * - addToSale: User wants to add a product to current sale
 */
const emit = defineEmits<{
  (e: 'edit', product: Product): void
  (e: 'delete', product: Product): void
  (e: 'addToSale', product: Product): void
}>()

// ===== Constants =====
/**
 * Stock level threshold for determining low stock status
 * Products with stock at or below this number are considered low stock
 */
const LOW_STOCK_THRESHOLD = 10

// ===== Event Handlers =====
/**
 * Handle edit product action
 * Emits edit event to parent component with product data
 * @param product - The product to edit
 */
function onEdit(product: Product) {
  emit('edit', product)
}

/**
 * Handle delete product action
 * Emits delete event to parent component with product data
 * @param product - The product to delete
 */
function onDelete(product: Product) {
  emit('delete', product)
}

/**
 * Handle add to sale action
 * Emits addToSale event to parent component with product data
 * @param product - The product to add to sale
 */
function onAddToSale(product: Product) {
  emit('addToSale', product)
}

// ===== Helper Functions =====
/**
 * Formats currency amount in Ghana Cedis format
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "GHS 25.50")
 */
function formatCurrency(amount: number): string {
  return `GHS ${amount.toFixed(2)}`
}

/**
 * Gets stock status text based on stock level
 * @param stock - Current stock level
 * @returns Stock status text
 */
function getStockStatusText(stock: number): string {
  if (stock <= 0) return 'Out of Stock'
  if (stock <= LOW_STOCK_THRESHOLD) return 'Low Stock'
  return 'In Stock'
}

/**
 * Gets CSS classes for stock status badge
 * @param stock - Current stock level
 * @returns CSS classes for badge styling
 */
function getStockStatusClass(stock: number): string {
  if (stock <= 0) return 'bg-red-100 text-red-800'
  if (stock <= LOW_STOCK_THRESHOLD) return 'bg-orange-100 text-orange-800'
  return 'bg-green-100 text-green-800'
}

/**
 * Gets CSS classes for stock status dot
 * @param stock - Current stock level
 * @returns CSS classes for dot color
 */
function getStockDotClass(stock: number): string {
  if (stock <= 0) return 'bg-red-500'
  if (stock <= LOW_STOCK_THRESHOLD) return 'bg-orange-500'
  return 'bg-green-500'
}
</script>

<style scoped>
/* ===== [New Feature] START: Modern Table Styling ===== */
/* Enhanced table row hover effects */
tbody tr:hover {
  background-color: theme('colors.gray.50');
}

/* Smooth transitions for all interactive elements */
button {
  transition: all 0.15s ease-in-out;
}

/* Enhanced focus states for accessibility */
button:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}

/* Disabled button styling */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button:disabled:hover {
  background-color: initial;
  transform: none;
}

/* Touch feedback for mobile users */
@media (max-width: 768px) {
  button:active {
    transform: scale(0.98);
  }
}

/* Table responsiveness */
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: theme('colors.gray.400') theme('colors.gray.100');
}

.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: theme('colors.gray.100');
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: theme('colors.gray.400');
  border-radius: 3px;
}
/* ===== [New Feature] END ===== */
</style>