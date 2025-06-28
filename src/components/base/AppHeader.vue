<!--
  AppHeader.vue
  Stratonea/Sales Tracker - Modern mobile-first app header with card design.
  - Mobile: Compact header with essential elements
  - Desktop: Spacious header with search functionality
  - Left: Back button (kept as requested)
  - Center: Page title (smaller as requested)
  - Right: Search icon + subtle online/offline indicator
  - Ghana-optimized: touch targets, modern card styling, shadow-lg
  - Follows Stratonea guidelines with modern card-based design
-->

<template>
  <!-- ===== Modern App Header ===== -->
  <header class="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-md">
    <!-- Mobile Header -->
    <div class="md:hidden">
      <div class="flex items-center justify-between px-4 py-3 min-h-[64px]">
        <!-- ===== [New Feature] START: Mobile Back Button ===== -->
        <!-- Left: Back button -->
        <button
          @click="emit('back')"
          class="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 min-h-[48px] min-w-[48px]"
          aria-label="Go Back"
          type="button"
        >
          <font-awesome-icon icon="arrow-left" class="text-gray-700 text-lg" />
          <span class="text-sm font-medium text-gray-700">Back</span>
        </button>
        <!-- ===== [New Feature] END ===== -->

        <!-- Center: Page title (smaller) -->
        <h1 class="flex-1 text-center text-base font-semibold text-gray-900 mx-4 truncate">
          {{ currentPage }}
        </h1>

        <!-- ===== [New Feature] START: Mobile Action Buttons ===== -->
        <!-- Right: Search + Status -->
        <div class="flex items-center gap-2">
          <!-- Search Button -->
          <button
            @click="emit('search')"
            class="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
            aria-label="Search"
            type="button"
          >
            <font-awesome-icon icon="search" class="text-gray-600 text-lg" />
          </button>

          <!-- Subtle Online/Offline Indicator -->
          <div
            class="flex items-center justify-center w-3 h-3 rounded-full"
            :class="isOnline ? 'bg-green-500' : 'bg-red-500'"
            :title="isOnline ? 'Online' : 'Offline'"
            aria-live="polite"
            :aria-label="networkStatusLabel"
          >
            <div
              v-if="isOnline"
              class="w-1.5 h-1.5 bg-white rounded-full animate-pulse"
            ></div>
          </div>
        </div>
        <!-- ===== [New Feature] END ===== -->
      </div>
    </div>

    <!-- Desktop Header -->
    <div class="hidden md:block">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between min-h-[72px]">
          <!-- ===== [New Feature] START: Desktop Back Button ===== -->
          <!-- Left: Back button -->
          <button
            @click="emit('back')"
            class="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 min-h-[48px] group"
            aria-label="Go Back"
            type="button"
          >
            <font-awesome-icon 
              icon="arrow-left" 
              class="text-gray-700 text-xl group-hover:text-gray-900 transition-colors" 
            />
            <span class="text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
              Back
            </span>
          </button>
          <!-- ===== [New Feature] END ===== -->

          <!-- Center: Page title (smaller) -->
          <div class="flex-1 text-center mx-8">
            <h1 class="text-xl font-semibold text-gray-900">
              {{ currentPage }}
            </h1>
          </div>

          <!-- ===== [New Feature] START: Desktop Search & Status ===== -->
          <!-- Right: Search + Status -->
          <div class="flex items-center gap-4">
            <!-- Search Button -->
            <button
              @click="emit('search')"
              class="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 min-h-[48px] group"
              aria-label="Search"
              type="button"
            >
              <font-awesome-icon 
                icon="search" 
                class="text-gray-600 text-lg group-hover:text-gray-800 transition-colors" 
              />
              <span class="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                Search
              </span>
            </button>

            <!-- Subtle Online/Offline Indicator -->
            <div class="flex items-center gap-2">
              <div
                class="flex items-center justify-center w-3 h-3 rounded-full"
                :class="isOnline ? 'bg-green-500' : 'bg-red-500'"
                :aria-label="networkStatusLabel"
                aria-live="polite"
              >
                <div
                  v-if="isOnline"
                  class="w-1.5 h-1.5 bg-white rounded-full animate-pulse"
                ></div>
              </div>
              <span class="text-xs font-medium text-gray-500">
                {{ isOnline ? 'Online' : 'Offline' }}
              </span>
            </div>
          </div>
          <!-- ===== [New Feature] END ===== -->
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * AppHeader.vue - Modern card-based header component
 * - Mobile: Compact design with essential functionality
 * - Desktop: Spacious design with enhanced search features
 * - Modern card styling with shadow-md and rounded corners
 * - Subtle online/offline indicator (small dot instead of pill)
 * - Ghana-optimized: proper touch targets, smooth transitions
 * - Emits: 'back', 'search' events for parent handling
 */

// ===== Imports =====
import { computed } from 'vue'
import { useNetworkStatus } from '@/composables/useNetworkStatus'

// ===== Types & Interfaces =====
/**
 * Props for modern AppHeader
 * - currentPage: string (current page/view name, smaller display)
 */
interface Props {
  currentPage?: string
}

withDefaults(defineProps<Props>(), {
  currentPage: 'Dashboard'
})

// ===== Emits =====
/**
 * Events emitted by AppHeader
 * - back: User clicked back button
 * - search: User clicked search button
 */
const emit = defineEmits<{
  (e: 'back'): void
  (e: 'search'): void
}>()

// ===== State Management =====
/**
 * Network status from composable
 * Provides real-time online/offline status
 */
const { networkInfo } = useNetworkStatus()

// ===== Computed Properties =====
/**
 * Reactive online status
 */
const isOnline = computed(() => networkInfo.value.isOnline)

/**
 * Accessible network status label
 */
const networkStatusLabel = computed(() => 
  isOnline.value ? 'Connected to internet' : 'Working offline'
)
</script>

<style scoped>
/* ===== [New Feature] START: Modern Header Animations ===== */
/* Smooth transitions for all interactive elements */
button {
  transition: all 0.2s ease-in-out;
}

/* Enhanced focus states for accessibility */
button:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}

/* Touch feedback for mobile users */
button:active {
  transform: scale(0.98);
}

/* Subtle hover effects for desktop */
@media (min-width: 768px) {
  button:hover {
    transform: translateY(-1px);
  }
}

/* Pulse animation for online indicator */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
/* ===== [New Feature] END ===== */
</style>