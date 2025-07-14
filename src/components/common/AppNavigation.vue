<!--
  AppNavigation.vue
  Stratonea/Sales Tracker - Simple navigation bar
  - Mobile-first design with hamburger menu
  - Shows different content based on current page
  - Touch-friendly buttons (48px+ targets)
-->

<template>
  <!-- ===== Main Navigation Bar ===== -->
  <nav class="bg-primary shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- ===== Logo + App Name ===== -->
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/" class="flex items-center space-x-4">
            <StratoneaLogo white />
            <span class="text-xl font-semibold text-white border-l pl-4 border-white/30">Sales Tracker
  </span>
          </router-link>
        </div>
        <!-- ===== Desktop Menu ===== -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link v-for="link in navLinks" :key="link.name" :to="link.path" :class="[
              'px-3 py-2 text-white font-medium min-h-[48px] flex items-center relative',
              'hover:text-blue-200 border-b-2 border-transparent hover:border-white',
              routePath === link.path ? 'border-white' : ''
            ]">
            {{ link.name }}
          </router-link>
          <!-- Desktop CTA Button -->
          <router-link v-if="isHomePage" to="/dashboard"
            class="px-6 py-2 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-primary min-h-[48px] flex items-center">
            Start Free
          </router-link>
        </div>

        <!-- ===== Mobile Menu Button ===== -->
        <button @click="toggleMobileMenu"
          class="md:hidden w-12 h-12 text-white rounded-lg hover:bg-white hover:bg-opacity-20">
          <!-- Hamburger or X icon -->
          <svg v-if="!showMobileMenu" class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- ===== Mobile Menu ===== -->
    <div v-show="showMobileMenu" class="md:hidden bg-primary border-t border-blue-400 z-50 fixed top-16 left-0 right-0">
      <div class="px-4 py-4 space-y-2">
        <!-- Mobile nav links -->
        <router-link v-for="link in navLinks" :key="link.name" :to="link.path" @click="closeMobileMenu" :class="[
            'px-4 py-3 text-white font-medium rounded-lg min-h-[48px] flex items-center relative',
            'hover:bg-white hover:bg-opacity-20 border-l-4 border-transparent hover:border-white',
            routePath === link.path ? 'border-white bg-white bg-opacity-10' : ''
          ]">
          {{ link.name }}
        </router-link>
        <!-- Mobile CTA button -->
        <router-link v-if="isHomePage" to="/dashboard" @click="closeMobileMenu"
          class="px-4 py-3 border-2 border-white text-white font-bold rounded-lg text-center hover:bg-white hover:text-primary min-h-[48px] flex items-center justify-center mt-4">
          Start Free
        </router-link>
      </div>
    </div>

    <!-- Mobile menu backdrop (lower z-index than menu) -->
    <div v-show="showMobileMenu" @click="closeMobileMenu" class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
    </div>
  </nav>
</template>

<script setup lang="ts">
// ===== Imports =====
import StratoneaLogo from '@/components/base/StratoneaLogo.vue'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

// ===== Navigation Links =====
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'My Biz', path: '/dashboard' },
  // { name: 'Pricing', path: '/pricing' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]

// ===== State =====
const showMobileMenu = ref(false)
const route = useRoute()
const routePath = computed(() => route.path)
const isHomePage = computed(() => route.path === '/')

// ===== Functions =====
function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value
}
function closeMobileMenu() {
  showMobileMenu.value = false
}
</script>

<style scoped>
/* ===== Simple Animations ===== */
a, button {
  transition: all 0.2s ease;
}

/* Touch feedback for mobile */
button:active, a:active {
  transform: scale(0.98);
}

/* Mobile menu slide down */
.md\:hidden {
  animation: slideDown 0.3s ease-out;
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

/* Blue gradient background */
.bg-primary {
  background: linear-gradient(135deg, #1F3A8A 0%, #1E40AF 100%);
}
</style>