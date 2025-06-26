<!--
  AppNavigation.vue
  Stratonea/Sales Tracker - Mobile-first app header.
  - Left: Menu icon (faCog), then current view/page name (centered)
  - Center: Stratonea logo (SVG or image)
  - Right: App name (bold, accessible)
  - Ghana-optimized: touch targets, color contrast, mobile sizing
  - Uses Tailwind utility classes for styling
  - Accessible: semantic header, alt text, good contrast
  - Follows Stratonea guidelines (see copilot-instructions.md)
-->

<template>
  <!-- ===== App Header (Top Bar) ===== -->
  <header class="flex items-center mb-10 justify-between px-4 py-3 bg-primary text-white shadow-md" role="banner"
    aria-label="App Header">

    <!-- ===== Center: Stratonea Logo ===== -->
    <StratoneaLogo class="h-10 w-auto min-h-[32px] max-h-[48px] mx-2" alt="Stratonea Logo" white />

    <!-- ===== Right: App Name ===== -->
    <span class="text-lg font-bold tracking-wide ml-2" aria-label="App Name">
      {{ appName }}
    </span>




    <!-- ===== [New Feature] START ===== -->
    <!-- Center: Current View/Page Name (passed as prop) -->
    <!-- <span class="flex-1 text-center text-lg font-semibold tracking-wide" aria-label="Current Page">
      {{ currentPage }}
    </span> -->

    <button
      class="flex items-center justify-center min-w-[48px] min-h-[48px] rounded-xl border-2 border-white focus:outline-none focus:ring-2 focus:ring-white transition-all duration-150"
      aria-label="Open menu" @click="emit('openSidebar')" type="button" style="box-sizing: border-box;">
      <font-awesome-icon :icon="['fas', 'cog']" class="text-2xl" />
    </button>
  </header>
</template>

<script setup lang="ts">
// // ===== Types & Interfaces =====
// /**
//  * Props for AppHeader
//  * - currentPage: string (the current view/page name, e.g., "Dashboard")
//  *   - Default: "Dashboard" (for safe usage if not provided)
//  */
// withDefaults(
//   defineProps<{
//     currentPage?: string
//   }>(),
//   {
//     currentPage: 'Dashboard'
//   }
// )

// ===== Emits =====
/**
 * Emits openSidebar event to parent to trigger sidebar open.
 */
const emit = defineEmits<{
  (e: 'openSidebar'): void
}>()

// ===== Constants & Config =====
/**
 * The appName constant is used for the header text.
 * Change this value if you want to reuse the header for another app.
 */
const appName = 'Sales Tracker'

// ===== Imports =====
/**
 * Import the StratoneaLogo component.
 * This should be placed in src/components/base/StratoneaLogo.vue.
 * If not yet created, use a placeholder SVG or image.
 */
import StratoneaLogo from '@/components/base/StratoneaLogo.vue'

// Import FontAwesomeIcon for the menu icon
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<!--
  ===== Styling Notes =====
  - All styling is via Tailwind utility classes for mobile-first workflow.
  - bg-primary uses the Stratonea brand color (see tailwind.config.js).
  - min-h-[48px] ensures touch-friendly targets.
  - text-lg font-bold for clear, readable app name.
  - shadow-md for subtle elevation.
  - px-4 py-3 for comfortable touch targets (min 48px).
  - Accessible: role="banner", aria-labels, alt text.
  - Menu icon uses faCog from FontAwesome.
-->