<!--
  UserProfileView.vue
  Stratonea/Sales Tracker - Mobile-first user profile screen.
  - Ghana-optimized: simple, clear, offline-friendly
  - Uses Tailwind utility classes for styling
  - Follows Stratonea guidelines (see copilot-instructions.md)
  - Uses mock/static data for now (replace with real user data later)
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <div class="min-h-screen flex flex-col items-center bg-gray-50 px-4">
    <!-- App Header (reuse component if possible) -->
    <header class="w-full max-w-md mb-8">
      <div class="flex items-center justify-between px-4 py-3 bg-primary text-white shadow-md rounded-lg">
        <StratoneaLogo class="h-10 w-auto" white />
        <span class="text-lg font-bold tracking-wide">Sales Tracker</span>
      </div>
    </header>

    <!-- User Profile Card -->
    <div class="bg-white rounded-lg shadow-md p-6 w-full max-w-md flex flex-col gap-4 items-center">
      <!-- User Avatar (placeholder) -->
      <div class="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-2">
        <span class="text-4xl text-gray-400" aria-hidden="true">👤</span>
      </div>
      <!-- User Info -->
      <div class="text-center">
        <h2 class="text-xl font-bold text-gray-900 mb-1">{{ user.name }}</h2>
        <p class="text-sm text-gray-500 mb-1">{{ user.email }}</p>
        <p class="text-sm text-gray-500">{{ user.phone }}</p>
        <p class="text-xs text-gray-400 mt-1">Region: {{ user.region }}</p>
      </div>
      <!-- Offline/Sync Status -->
      <div v-if="!isOnline" class="offline-alert mt-2">
        You are offline. Changes will sync when you're back online.
      </div>
      <!-- Action Buttons -->
      <div class="flex gap-3 mt-4 w-full">
        <button
          class="flex-1 bg-primary text-white font-bold py-3 rounded-lg shadow min-h-[48px] hover:bg-primary-dark transition-colors"
          @click="onEdit" aria-label="Edit Profile">
          Edit Profile
        </button>
        <button
          class="flex-1 bg-gray-200 text-gray-800 font-bold py-3 rounded-lg shadow min-h-[48px] hover:bg-gray-300 transition-colors"
          @click="onLogout" aria-label="Logout">
          Logout
        </button>
      </div>
    </div>
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== Imports =====
import { ref } from 'vue'
// Import StratoneaLogo if available
import StratoneaLogo from '@/components/base/StratoneaLogo.vue'

// ===== Types & Interfaces =====
/**
 * User profile type for the view.
 */
interface UserProfile {
  name: string
  email: string
  phone: string
  region: string
}

// ===== Main Logic =====
/**
 * Mock user data for demonstration.
 * Replace with real user data from store or API.
 */
const user = ref<UserProfile>({
  name: 'Ama Serwaa',
  email: 'ama@example.com',
  phone: '024 123 4567',
  region: 'Ashanti'
})

/**
 * Simulated online/offline state.
 * Replace with real network status composable.
 */
const isOnline = ref(true)

/**
 * Handles edit profile action.
 */
function onEdit() {
  // Emit or navigate to edit profile screen
  alert('Edit profile (mock)')
}

/**
 * Handles logout action.
 */
function onLogout() {
  // Emit or navigate to login screen
  alert('Logged out (mock)')
}
</script>

<!--
  ===== Styling Notes =====
  - All inputs and buttons are touch-optimized (min-h-[48px]).
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: aria-labels, clear feedback.
  - Offline message for Ghanaian context.
-->