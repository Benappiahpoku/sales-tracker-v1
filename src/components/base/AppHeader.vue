<!--
  AppHeader.vue
  Stratonea/Sales Tracker - Mobile-first app header.
  - Left: Back button with FontAwesome left arrow and "Back" text
  - Center: (Optional) App logo or page title (currently omitted for minimalism)
  - Right: Online/Offline indicator with color-coded background
  - Ghana-optimized: touch targets, color contrast, mobile sizing
  - Uses Tailwind utility classes for styling
  - Accessible: semantic header, alt text, good contrast
  - Follows Stratonea guidelines (see copilot-instructions.md)
-->

<template>
  <!-- ===== App Header (Top Bar) ===== -->
  <header
    class="flex max-w-md mx-auto items-center justify-between px-4 py-3 bg-primary text-white shadow-md min-h-[48px]"
    role="banner" aria-label="App Header">
    <!-- ===== [New Feature] START ===== -->
    <!-- Left: Back button with FontAwesome left arrow and "Back" text -->
    <button
      class="flex items-center gap-2 px-3 py-2 rounded stratonea:rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light bg-white bg-opacity-10 hover:bg-opacity-20 transition min-h-[48px]"
      aria-label="Go Back" @click="$emit('back')" type="button">
      <!-- FontAwesome left arrow icon -->
      <FontAwesomeIcon icon="fa-solid fa-arrow-left" class="text-lg" />
      <span class="font-medium text-base">Back</span>
    </button>
    <!-- ===== [New Feature] END ===== -->

    <!-- Center: (Optional) App logo or page title could go here for future expansion -->
    <!-- Center: Current View/Page Name (passed as prop) -->
    <span class="flex-1 text-center text-lg font-semibold tracking-wide" aria-label="Current Page">
      {{ currentPage }}
    </span>

    <!-- ===== [New Feature] START ===== -->
    <!-- Right: Online/Offline indicator with color-coded background -->
    <span class="flex items-center gap-2 px-3 py-2 rounded stratonea:rounded font-bold text-base min-h-[40px]" :class="isOnline
        ? 'bg-green-500 text-white'
        : 'bg-red-500 text-white'" aria-live="polite" aria-label="Network Status" role="status">
      <FontAwesomeIcon :icon="isOnline ? 'fa-solid fa-circle' : 'fa-solid fa-circle'"
        :class="isOnline ? 'text-white' : 'text-white opacity-80'" class="text-xs" />
      <span>{{ isOnline ? 'Online' : 'Offline' }}</span>
    </span>
    
  </header>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * AppHeader.vue
 * - Ghana-optimized, mobile-first header for Sales Tracker.
 * - Left: Back button (FontAwesome left arrow + "Back" text)
 * - Right: Online/Offline indicator (green/red background)
 * - Uses useNetworkStatus composable for real-time network status.
 * - Emits 'back' event when back button is clicked.
 */

// ===== Imports =====
import {computed} from 'vue'
import { FontAwesomeIcon } from '@/plugins/fontawesome' // FontAwesome setup
import { useNetworkStatus } from '@/composables/useNetworkStatus' // Network status composable


// ===== Types & Interfaces =====
/**
 * Props for AppHeader
 * - currentPage: string (the current view/page name, e.g., "Dashboard")
 *   - Default: "Dashboard" (for safe usage if not provided)
 */
withDefaults(
  defineProps<{
    currentPage?: string
  }>(),
  {
    currentPage: 'Dashboard'
  }
)

// ===== Main Logic =====
/**
 * useNetworkStatus composable provides reactive network info.
 * We use networkInfo.value.isOnline to determine status.
 */
const { networkInfo } = useNetworkStatus()
const isOnline = computed(() => networkInfo.value.isOnline)
</script>

<!--
  ===== Styling Notes =====
  - All styling is via Tailwind utility classes for mobile-first workflow.
  - bg-primary uses the Stratonea brand color (see tailwind.config.js).
  - min-h-[48px] ensures touch-friendly targets.
  - text-base font-bold for clear, readable status.
  - shadow-md for subtle elevation.
  - px-4 py-3 for comfortable touch targets (min 48px).
  - Accessible: role="banner", aria-labels, alt text.
  - Back button uses FontAwesome left arrow.
  - Online/Offline indicator uses green/red backgrounds for clarity.
-->