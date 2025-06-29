<!--
  AppNavigation.vue
  Stratonea/Sales Tracker - Modern blue navigation for homepage and app
  - Desktop: Logo+App Name (left) | Nav Links (center) | Avatar/CTA (right)
  - Mobile: Logo+App Name (left) | Hamburger (right) with collapsible menu
  - Blue background with white text for modern look
  - Ghana-optimized: touch targets, mobile-first design
  - Context-aware: Shows CTA on homepage, avatar in app
  - Follows Stratonea guidelines with comprehensive documentation
-->

<template>
  <!-- ===== [Fix] START: Fixed Mobile Navigation Issues ===== -->
  <nav 
    class="bg-primary shadow-lg sticky top-0 z-50" 
    role="navigation"
    aria-label="Main navigation"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <!-- ===== Left: Logo + App Name ===== -->
        <div class="flex items-center flex-shrink-0">
          <router-link to="/" class="flex items-center" aria-label="Stratonea Home">
            <StratoneaLogo 
              class="h-8 w-auto sm:h-10 min-h-[32px] max-h-[48px]" 
              alt="Stratonea Logo" 
              white
            />
            <span class="ml-3 text-xl font-bold text-white tracking-wide">
              Sales Tracker
            </span>
          </router-link>
        </div>

        <!-- ===== Center: Desktop Navigation Links ===== -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="link in navigationLinks"
            :key="link.name"
            :to="link.path"
            :class="[
              'px-3 py-2 text-base font-bold text-white hover:text-blue-200 transition-colors duration-200 min-h-[48px] flex items-center',
              isActiveLink(link.path) 
                ? 'border-b-2 border-white' 
                : 'hover:border-b-2 hover:border-blue-200'
            ]"
            :aria-current="isActiveLink(link.path) ? 'page' : undefined"
          >
            {{ link.name }}
          </router-link>
        </div>

        <!-- ===== Right: Profile Avatar or CTA Button ===== -->
        <div class="flex items-center space-x-4">
          
          <!-- Show CTA button on homepage (desktop only) -->
          <template v-if="isHomePage">
            <!-- ===== Homepage CTA Button ===== -->
            <router-link
              to="/dashboard"
              class="hidden sm:inline-flex items-center px-6 py-2 border-2 border-white text-base font-bold rounded-lg text-white hover:bg-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200 min-h-[48px]"
            >
              Manage My Biz
            </router-link>
          </template>
          
          <!-- Show profile avatar in app pages (desktop only) -->
          <template v-else>
            <!-- ===== Profile Avatar with Dropdown ===== -->
            <div class="hidden md:block relative" ref="dropdownContainer">
              <!-- Avatar Button -->
              <button
                @click="toggleDropdown"
                class="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full border-2 border-white border-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200"
                aria-label="Open profile menu"
                :aria-expanded="isDropdownOpen"
                aria-haspopup="true"
                type="button"
              >
                <!-- Default User Avatar Icon -->
                <font-awesome-icon 
                  :icon="['fas', 'user']" 
                  class="text-white text-lg"
                />
              </button>

              <!-- Dropdown Menu (existing functionality preserved) -->
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

              <!-- Backdrop for desktop dropdown -->
              <div
                v-show="isDropdownOpen"
                class="fixed inset-0 z-40"
                @click="closeDropdown"
                aria-hidden="true"
              ></div>
            </div>
          </template>

          <!-- ===== Mobile Hamburger Menu Button ===== -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden flex items-center justify-center w-12 h-12 text-white hover:text-blue-200 hover:bg-white hover:bg-opacity-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200"
            aria-label="Toggle mobile menu"
            :aria-expanded="isMobileMenuOpen"
            type="button"
          >
            <!-- Hamburger Icon -->
            <svg 
              v-if="!isMobileMenuOpen"
              class="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Close Icon -->
            <svg 
              v-else
              class="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- ===== [Fix] Mobile Navigation Menu - Fixed Positioning and Styling ===== -->
    <div 
      v-show="isMobileMenuOpen"
      class="md:hidden absolute top-full left-0 right-0 bg-primary border-t border-blue-400 shadow-lg z-40"
      role="menu"
      aria-orientation="vertical"
    >
      <div class="max-w-7xl mx-auto px-4 py-4 space-y-1">
        <!-- Mobile Navigation Links -->
        <router-link
          v-for="link in navigationLinks"
          :key="link.name"
          :to="link.path"
          @click="closeMobileMenu"
          :class="[
            'px-4 py-3 text-base font-bold transition-colors duration-200 min-h-[48px] flex items-center rounded-lg',
            isActiveLink(link.path) 
              ? 'text-white bg-white bg-opacity-20 border-l-4 border-white' 
              : 'text-white hover:text-blue-200 hover:bg-white hover:bg-opacity-10'
          ]"
          role="menuitem"
          :aria-current="isActiveLink(link.path) ? 'page' : undefined"
        >
          {{ link.name }}
        </router-link>

        <!-- Mobile CTA Button (homepage only) -->
        <div v-if="isHomePage" class="pt-4 border-t border-blue-400 mt-4">
          <router-link
            to="/dashboard"
            @click="closeMobileMenu"
            class="w-full flex items-center justify-center px-6 py-3 border-2 border-white text-base font-bold rounded-lg text-white hover:bg-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200 min-h-[48px]"
          >
            Manage My Biz
          </router-link>
        </div>

        <!-- Mobile Profile Menu (app pages only) -->
        <div v-if="!isHomePage" class="pt-4 border-t border-blue-400 mt-4 space-y-1">
          <router-link
            to="/userprofile"
            @click="closeMobileMenu"
            class="flex items-center px-4 py-3 text-white hover:text-blue-200 hover:bg-white hover:bg-opacity-10 transition-colors duration-150 min-h-[48px] rounded-lg"
          >
            <font-awesome-icon 
              :icon="['fas', 'user']" 
              class="text-white mr-3 text-sm" 
            />
            <span class="font-medium">View Profile</span>
          </router-link>

          <router-link
            to="/company"
            @click="closeMobileMenu"
            class="flex items-center px-4 py-3 text-white hover:text-blue-200 hover:bg-white hover:bg-opacity-10 transition-colors duration-150 min-h-[48px] rounded-lg"
          >
            <font-awesome-icon 
              :icon="['fas', 'cog']" 
              class="text-white mr-3 text-sm" 
            />
            <span class="font-medium">Settings</span>
          </router-link>

          <button
            @click="handleLogout"
            class="w-full flex items-center px-4 py-3 text-red-300 hover:text-red-200 hover:bg-red-500 hover:bg-opacity-20 transition-colors duration-150 min-h-[48px] rounded-lg"
          >
            <font-awesome-icon 
              :icon="['fas', 'sign-out']" 
              class="text-red-300 mr-3 text-sm" 
            />
            <span class="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Backdrop -->
    <div
      v-show="isMobileMenuOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
      @click="closeMobileMenu"
      aria-hidden="true"
    ></div>
  </nav>
  <!-- ===== [Fix] END ===== -->
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * AppNavigation.vue - Modern blue navigation for Sales Tracker
 * - Desktop: Logo+App Name (left) | Nav Links (center) | Avatar/CTA (right)
 * - Mobile: Logo+App Name visible, everything else in hamburger menu
 * - Blue background with white text for modern, professional look
 * - Context-aware: Shows different elements based on current page
 * - Maintains all existing profile dropdown functionality
 * - Ghana-optimized: touch targets, clear navigation, mobile-first
 */

// ===== Imports =====
import StratoneaLogo from '@/components/base/StratoneaLogo.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

// ===== Types & Interfaces =====
/**
 * Navigation link interface for type safety
 */
interface NavigationLink {
  name: string
  path: string
}

// ===== Constants & Config =====
/**
 * Main navigation links for the homepage and app
 * These will appear in both desktop and mobile navigation
 */
const navigationLinks: NavigationLink[] = [
  { name: 'Home', path: '/' },
  { name: 'My Biz', path: '/dashboard' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]

// ===== State Management =====
/**
 * Mobile menu state management
 */
const isMobileMenuOpen = ref(false)

/**
 * Profile dropdown state management (existing functionality)
 */
const isDropdownOpen = ref(false)
const dropdownContainer = ref<HTMLElement | null>(null)

/**
 * Get current route for navigation state
 */
const route = useRoute()

// ===== Computed Properties =====
/**
 * Check if we're on the homepage to show different navigation elements
 */
const isHomePage = computed(() => route.path === '/')

// ===== Helper Functions =====
/**
 * Check if a navigation link is currently active
 */
function isActiveLink(path: string): boolean {
  return route.path === path
}

// ===== [New Feature] START: Mobile Menu Logic =====
/**
 * Toggle mobile menu visibility
 */
function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  // Close profile dropdown if open
  if (isMobileMenuOpen.value) {
    isDropdownOpen.value = false
  }
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
  isMobileMenuOpen.value = false
}
// ===== [New Feature] END =====

// ===== [Existing Feature] Profile Dropdown Logic =====
/**
 * Toggle profile dropdown menu visibility
 */
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
  // Close mobile menu if open
  if (isDropdownOpen.value) {
    isMobileMenuOpen.value = false
  }
}

/**
 * Close profile dropdown menu
 */
function closeDropdown() {
  isDropdownOpen.value = false
}

/**
 * Handle logout functionality (existing functionality preserved)
 */
function handleLogout() {
  // TODO: Implement actual logout logic
  // - Clear user session
  // - Clear local storage
  // - Redirect to login page
  alert('Logout functionality will be implemented here')
  closeDropdown()
  closeMobileMenu()
}

/**
 * Handle click outside dropdown/menu to close them
 */
function handleClickOutside(event: MouseEvent) {
  // Close profile dropdown if clicking outside
  if (dropdownContainer.value && !dropdownContainer.value.contains(event.target as Node)) {
    closeDropdown()
  }
  
  // Close mobile menu if clicking outside (handled by backdrop)
}

// ===== Lifecycle Hooks =====
/**
 * Set up click outside listener when component mounts
 */
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

/**
 * Clean up event listener when component unmounts
 */
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* ===== [Fix] START: Fixed Mobile Navigation Styling ===== */
/* Smooth transitions for all interactive elements */
a,
button {
  transition: all 0.2s ease-in-out;
}

/* Touch feedback for mobile users */
button:active,
a:active {
  transform: scale(0.98);
}

/* Enhanced focus states for accessibility */
a:focus-visible,
button:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
}

/* Active link indicator animation */
.border-b-2 {
  border-bottom-width: 2px;
  transition: border-color 0.2s ease-in-out;
}

/* Mobile menu slide animation */
.md\:hidden[role="menu"] {
  animation: slideDown 0.3s ease-out;
  transform-origin: top;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Backdrop blur effect for mobile menu */
.bg-opacity-50 {
  backdrop-filter: blur(4px);
}

/* Subtle gradient overlay for modern look */
.bg-primary {
  background: linear-gradient(135deg, #1F3A8A 0%, #1E40AF 100%);
}

/* Ensure mobile menu appears above other content */
nav {
  position: relative;
}

/* Fix mobile menu positioning */
@media (max-width: 768px) {
  .md\:hidden[role="menu"] {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
}
/* ===== [Fix] END ===== */
</style>