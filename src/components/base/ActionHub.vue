<!--
  ActionHub.vue
  Bottom navigation bar for Sales Tracker.
  - Ghana-optimized: mobile-first, large touch targets, clear icons.
  - Four actions: Home, New Sale, Products, Sales.
  - All actions use router-link for navigation.
  - Icons: Home (fa-home), New Sale (fa-plus-circle), Products (fa-box), Sales (fa-list-alt).
  - Follows Stratonea guidelines for accessibility and clarity.
-->

<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
    <!-- ===== Desktop View ===== -->
    <div class="hidden md:flex justify-center items-center h-16 max-w-7xl mx-auto px-4">
      <div class="flex space-x-8 items-center">
        <!-- Home -->
        <router-link to="/" class="flex items-center space-x-2 text-primary-600 hover:text-primary-700 min-h-[48px]">
          <font-awesome-icon icon="fa-solid fa-home" class="text-xl" />
          <span>My Biz</span>
        </router-link>
        <!-- New Sale -->
        <router-link to="/new-sale"
          class="flex items-center space-x-2 text-green-600 hover:text-green-700 min-h-[48px]">
          <font-awesome-icon icon="fa-solid fa-plus-circle" class="text-xl" />
          <span>New Sale</span>
        </router-link>
         <!-- Customers -->
         <router-link to="/customers"
          class="flex items-center space-x-2 text-primary-600 hover:text-primary-700 min-h-[48px]">
          <font-awesome-icon :icon="['fas', 'user-group']" class="text-xl" />
          <span>Customers</span>
        </router-link>
        <!-- Products -->
        <router-link to="/products"
          class="flex items-center space-x-2 text-primary-600 hover:text-primary-700 min-h-[48px]">
          <font-awesome-icon icon="fa-solid fa-box" class="text-xl" />
          <span>Products</span>
        </router-link>
       
        
        <!-- Menu -->
        <button @click="emit('openSidebar')"
          class="flex items-center space-x-2 text-primary-600 hover:text-primary-700 min-h-[48px]">
          <font-awesome-icon :icon="['fas', 'ellipsis-v']" class="text-xl" />
          <span>More</span>
        </button>
      </div>
    </div>

    <!-- ===== Mobile View ===== -->
    <!--
      - Each action is a column: icon on top, label below, both centered.
      - Touch targets are at least 48px.
      - Text is small but readable (text-xs), always visible.
    -->
    <div class="md:hidden flex justify-around items-center h-16">
      <!-- Home -->
      <router-link to="/"
        class="flex flex-col items-center justify-center text-primary-600 hover:text-primary-700 focus:outline-none"
        aria-label="Home">
        <font-awesome-icon icon="fa-solid fa-home" class="text-2xl" />
        <span class="text-xs mt-1 font-medium">Home</span>
      </router-link>
      <!-- New Sale -->
      <router-link to="/new-sale"
        class="flex flex-col items-center justify-center text-green-600 hover:text-green-700 focus:outline-none"
        aria-label="New Sale">
        <font-awesome-icon icon="fa-solid fa-plus-circle" class="text-2xl" />
        <span class="text-xs mt-1 font-medium">New Sale</span>
      </router-link>
      <!-- Products -->
      <router-link to="/products"
        class="flex flex-col items-center justify-center text-primary-600 hover:text-primary-700 focus:outline-none"
        aria-label="Products">
        <font-awesome-icon icon="fa-solid fa-box" class="text-2xl" />
        <span class="text-xs mt-1 font-medium">Products</span>
      </router-link>
      <!-- Sales -->
      <router-link to="/sales"
        class="flex flex-col items-center justify-center text-primary-600 hover:text-primary-700 focus:outline-none"
        aria-label="Sales">
        <font-awesome-icon icon="fa-solid fa-list-alt" class="text-2xl" />
        <span class="text-xs mt-1 font-medium">Sales</span>
      </router-link>
      <!-- Menu -->
      <button @click="emit('openSidebar')"
        class="flex flex-col items-center justify-center text-primary-600 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-150"
        aria-label="Open-menu" type="button" style="box-sizing: border-box;">
        <font-awesome-icon :icon="['fas', 'cog']" class="text-2xl" />
        <span class="text-xs mt-1 font-medium">Menu</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * ActionHub.vue
 * - Bottom navigation for Sales Tracker.
 * - Four main actions: Home, New Sale, Products, Sales.
 * - All navigation via router-link for SPA experience.
 * - Ghana-optimized: mobile-first, large touch targets, clear icons.
 * - Follows Stratonea coding and documentation guidelines.
 * - Mobile view: icon above label, always visible, centered.
 * - Desktop view: icon left of label, side by side.
 */

// ===== Emits =====
/**
 * Emits openSidebar event to parent to trigger sidebar open.
 */
const emit = defineEmits<{
  (e: 'openSidebar'): void
}>()
</script>