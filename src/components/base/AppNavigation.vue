<!--
  AppNavigation.vue
  Stratonea/Sales Tracker - Mobile-first app header with profile avatar.
  - Left: Stratonea logo (SVG or image)
  - Center: App name (bold, accessible)
  - Right: Profile avatar with dropdown menu
  - Ghana-optimized: touch targets, color contrast, mobile sizing
  - Uses Tailwind utility classes for styling
  - Accessible: semantic header, alt text, good contrast
  - Follows Stratonea guidelines (see copilot-instructions.md)
-->

<template>
  <!-- ===== App Header (Top Bar) ===== -->
  <header 
    class="flex items-center mb-10 justify-between px-4 py-3 bg-primary text-white shadow-md" 
    role="banner"
    aria-label="App Header"
  >
    <!-- ===== Left: Stratonea Logo ===== -->
    <StratoneaLogo 
      class="h-10 w-auto min-h-[32px] max-h-[48px] mx-2" 
      alt="Stratonea Logo" 
      white 
    />

    <!-- ===== Center: App Name ===== -->
    <span 
      class="text-lg font-bold tracking-wide ml-2 flex-1 text-center" 
      aria-label="App Name"
    >
      {{ appName }}
    </span>

    <!-- ===== [New Feature] START: Profile Avatar with Dropdown ===== -->
    <!-- Right: Profile Avatar -->
    <div class="relative" ref="dropdownContainer">
      <!-- Avatar Button -->
      <button
        @click="toggleDropdown"
        class="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full border-2 border-white border-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200"
        aria-label="Open profile menu"
        aria-expanded="false"
        aria-haspopup="true"
        type="button"
      >
        <!-- Default User Avatar Icon -->
        <font-awesome-icon 
          :icon="['fas', 'user']" 
          class="text-white text-lg"
        />
      </button>

      <!-- Dropdown Menu -->
      <div
        v-show="isDropdownOpen"
        class="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
        role="menu"
        aria-orientation="vertical"
        @click="closeDropdown"
      >
        <!-- Profile Link -->
        <router-link
          to="/userprofile"
          class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-150 min-h-[48px]"
          role="menuitem"
        >
          <font-awesome-icon 
            :icon="['fas', 'user']" 
            class="text-gray-500 mr-3 text-sm" 
          />
          <span class="font-medium">View Profile</span>
        </router-link>

        <!-- Settings Link -->
        <router-link
          to="/company"
          class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-150 min-h-[48px]"
          role="menuitem"
        >
          <font-awesome-icon 
            :icon="['fas', 'cog']" 
            class="text-gray-500 mr-3 text-sm" 
          />
          <span class="font-medium">Settings</span>
        </router-link>

        <!-- Divider -->
        <div class="border-t border-gray-200 my-2"></div>

        <!-- Logout Button -->
        <button
          @click="handleLogout"
          class="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-150 min-h-[48px]"
          role="menuitem"
        >
          <font-awesome-icon 
            :icon="['fas', 'sign-out']" 
            class="text-red-500 mr-3 text-sm" 
          />
          <span class="font-medium">Sign Out</span>
        </button>
      </div>

      <!-- Backdrop for mobile (closes dropdown when clicked) -->
      <div
        v-show="isDropdownOpen"
        class="fixed inset-0 z-40 md:hidden"
        @click="closeDropdown"
        aria-hidden="true"
      ></div>
    </div>
    <!-- ===== [New Feature] END ===== -->
  </header>
</template>

<script setup lang="ts">
// ===== Imports =====
/**
 * Import the StratoneaLogo component.
 * This should be placed in src/components/base/StratoneaLogo.vue.
 * If not yet created, use a placeholder SVG or image.
 */
import StratoneaLogo from '@/components/base/StratoneaLogo.vue'

// Import FontAwesome icons for profile avatar and menu items
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import Vue composition API functions
import { ref, onMounted, onUnmounted } from 'vue'


// ===== Constants & Config =====
/**
 * The appName constant is used for the header text.
 * Change this value if you want to reuse the header for another app.
 */
const appName = 'Sales Tracker'

// ===== State Management =====
/**
 * Dropdown state management
 * - isDropdownOpen: Controls visibility of profile dropdown menu
 * - dropdownContainer: Reference to dropdown container for click outside detection
 */
const isDropdownOpen = ref(false)
const dropdownContainer = ref<HTMLElement | null>(null)

// ===== Router Setup =====
/**
 * Vue Router instance for navigation
 */


// ===== [New Feature] START: Profile Dropdown Logic =====
/**
 * Toggle dropdown menu visibility
 * Provides smooth open/close animation and proper focus management
 */
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

/**
 * Close dropdown menu
 * Used when clicking outside or selecting a menu item
 */
function closeDropdown() {
  isDropdownOpen.value = false
}

/**
 * Handle logout functionality
 * Currently shows alert - replace with actual logout logic
 */
function handleLogout() {
  // TODO: Implement actual logout logic
  // - Clear user session
  // - Clear local storage
  // - Redirect to login page
  alert('Logout functionality will be implemented here')
  closeDropdown()
}

/**
 * Handle click outside dropdown to close it
 * Improves mobile user experience
 */
function handleClickOutside(event: MouseEvent) {
  if (dropdownContainer.value && !dropdownContainer.value.contains(event.target as Node)) {
    closeDropdown()
  }
}
// ===== [New Feature] END =====

// ===== Lifecycle Hooks =====
/**
 * Set up click outside listener when component mounts
 * Essential for good dropdown UX on mobile devices
 */
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

/**
 * Clean up event listener when component unmounts
 * Prevents memory leaks
 */
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<!--
  ===== Styling Notes =====
  - All styling is via Tailwind utility classes for mobile-first workflow.
  - bg-primary uses the Stratonea brand color (see tailwind.config.js).
  - Profile avatar: 48px circular button with semi-transparent background
  - Dropdown: Positioned absolute, right-aligned, with proper shadows
  - Touch targets: All interactive elements minimum 48px height
  - Accessible: proper ARIA attributes, role="menu", focus management
  - Mobile-optimized: backdrop overlay for mobile dropdown closing
  - Color scheme: White avatar button on primary background, clean dropdown
  - Hover states: Subtle background color changes for better feedback
  - Typography: Clear font weights and sizing for readability
-->