<!--
  default.vue
  Main layout for Sales Tracker with sidebar navigation.
  - Handles sidebar open/close state consistently with toggle functionality
  - Works with both AppNavigation and ActionHub menu buttons
  - Ghana-optimized: touch targets, offline support
  - Follows Stratonea guidelines
-->

<template>
  <div class="min-h-screen bg-gray-50 pb-16">
    <!-- Network status indicator for Ghana's intermittent connectivity -->
    <OfflineIndicator v-if="!networkInfo.isOnline" />

    <!-- ===== App Navigation ===== -->
    <!-- ===== [Fix] START: Use toggle function instead of just open ===== -->
    <AppNavigation @openSidebar="toggleSidebar" />

    <!-- ===== App Header ===== -->
    <AppHeader :currentPage="currentPage" @back="handleBack" />

    <!-- ===== Navigation Sidebar ===== -->
    <NavigationSidebar 
      :open="sidebarOpen" 
      @close="closeSidebar" 
      @navigate="handleNavigate"
      @upgrade="handleUpgrade" 
    />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <router-view />
    </main>

    <!-- ===== Action Hub ===== -->
    <!-- ===== [Fix] Use toggle function for consistent behavior ===== -->
    <ActionHub @openSidebar="toggleSidebar" />

    <!-- Overlay for mobile - closes sidebar when clicked -->
    <div 
      v-if="sidebarOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 z-30" 
      @click="closeSidebar"
    ></div>
    <!-- ===== [Fix] END ===== -->
  </div>
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
/**
 * Route meta type definition to ensure proper typing
 */
interface RouteMeta {
  title?: string
}

// ===== File-Level Imports =====
import { useNetworkStatus } from '@/composables/useNetworkStatus'
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import OfflineIndicator from '@/components/base/OfflineIndicator.vue'
import AppNavigation from '@/components/base/AppNavigation.vue'
import NavigationSidebar from '@/components/base/NavigationSidebar.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import ActionHub from '@/components/base/ActionHub.vue'

// ===== State Management =====
const sidebarOpen = ref(false)

// Dynamically get current page name from route meta.title
const route = useRoute()
const router = useRouter()

// Properly typed computed ref for currentPage
const currentPage = computed(() => {
  const meta = route.meta as RouteMeta
  return meta.title || 'Dashboard'
})

// Get network info for offline indicator
const { networkInfo } = useNetworkStatus()

// ===== [Fix] START: Improved Sidebar Control Methods ===== 
/**
 * Toggles the sidebar - used by both AppNavigation and ActionHub
 * This method provides consistent toggle behavior for both menu buttons
 * If sidebar is open, it closes. If closed, it opens.
 */
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

/**
 * Opens the sidebar explicitly
 * Used when we specifically want to open (not toggle)
 */


/**
 * Closes the sidebar - used by NavigationSidebar, overlay click, and navigation
 * This method provides a single point of control for closing the sidebar
 */
function closeSidebar() {
  sidebarOpen.value = false
}
// ===== [Fix] END ===== 

// ===== Navigation Handlers =====
/**
 * Handles navigation from the sidebar.
 * Navigates to the given route using Vue Router.
 * @param routePath - The route path to navigate to (e.g., '/dashboard')
 */
function handleNavigate(routePath: string) {
  // Only navigate if not already on the target route
  if (router.currentRoute.value.path !== routePath) {
    router.push(routePath)
  }
  closeSidebar() // Always close sidebar after navigation
}

/**
 * Handles upgrade/login action from sidebar
 * Shows upgrade modal or redirects to login page
 */
function handleUpgrade() {
  // TODO: Implement upgrade/login logic
  console.log('Upgrade/Login clicked')
  closeSidebar() // Close sidebar after action
}

/**
 * Handles the 'back' event from AppHeader.
 * Navigates to the previous page in browser history.
 */
function handleBack() {
  router.back()
}
</script>

<style>
/* ===== Global Transition Styles ===== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ===== Mobile-Optimized Touch Targets ===== */
@media (max-width: 768px) {
  /* Ensure all clickable elements meet 48px minimum */
  .touch-target {
    min-height: 48px;
    min-width: 48px;
  }
}
</style>