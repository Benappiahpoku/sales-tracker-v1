<!--
  NavigationSidebar.vue
  Stratonea/BizPoint - Mobile-first sidebar navigation.
  - Slide-in overlay from the left (75% width on mobile)
  - Company name, user status, and main navigation links
  - Prominent Upgrade/Login button for freemium flow
  - Ghana-optimized: touch targets, color contrast, mobile sizing
  - Uses Tailwind utility classes for styling
  - Accessible: semantic nav, aria labels, keyboard navigation
  - Follows Stratonea guidelines (see copilot-instructions.md)
-->

<template>
  <!-- ===== Sidebar Overlay ===== -->
  <transition name="fade">
    <aside
      v-if="open"
      class="fixed inset-0 z-40 flex"
      aria-label="Sidebar Navigation"
      role="navigation"
      @keydown.esc="closeSidebar"
      tabindex="0"
    >
      <!-- ===== Sidebar Panel ===== -->
      <nav
        class="w-3/4 max-w-xs bg-white text-gray-900 shadow-lg h-full flex flex-col"
        @click.stop
      >
        <!-- ===== Company Name & User Status ===== -->
        <div class="flex flex-col items-start px-4 py-4 border-b border-gray-200">
          <span class="text-xl font-bold mb-1">Stratonea</span>
          <span class="text-sm text-gray-500">Guest User</span>
        </div>

        <!-- ===== Navigation Links ===== -->
        <ul class="flex-1 flex flex-col gap-2 px-4 py-4">
          <li v-for="item in navItems" :key="item.label">
            <button
              class="w-full text-left px-3 py-3 rounded-lg hover:bg-primary hover:text-white focus:bg-primary focus:text-white transition-colors min-h-[48px] font-medium"
              @click="navigate(item.route)"
              :aria-label="item.label"
            >
              {{ item.label }}
            </button>
          </li>
        </ul>

        <!-- ===== Upgrade/Login Button ===== -->
        <div class="px-4 pb-6">
          <button
            class="w-full bg-primary text-white font-bold py-3 rounded-lg shadow-md min-h-[48px] hover:bg-primary-dark transition-colors"
            @click="onUpgrade"
            aria-label="Upgrade or Login"
          >
            Upgrade / Login
          </button>
        </div>
      </nav>

      <!-- ===== Overlay Click Area (closes sidebar) ===== -->
      <div class="flex-1" @click="closeSidebar" aria-label="Close Sidebar"></div>
    </aside>
  </transition>
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
/**
 * Navigation item type for sidebar links.
 */
interface NavItem {
  label: string
  route: string
}

// ===== Props =====
/**
 * Controls sidebar open/close state from parent.
 */
defineProps<{
  open: boolean
}>()

// ===== Emits =====
/**
 * Emits events to parent for navigation and closing.
 */
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'navigate', route: string): void
  (e: 'upgrade'): void
}>()

// ===== Constants & Config =====
/**
 * List of navigation items for main modules.
 * Update routes as needed for your router.
 */
const navItems: NavItem[] = [
  { label: 'Home (Dashboard)', route: '/dashboard' },
  { label: 'Products', route: '/products' },
  { label: 'Stock', route: '/stock' },
  { label: 'Point of Sale', route: '/pos' },
  { label: 'Customers', route: '/customers' }
]

// ===== Main Logic =====
/**
 * Emits navigation event to parent.
 */
function navigate(route: string) {
  emit('navigate', route)
  emit('close')
}

/**
 * Emits close event to parent.
 */
function closeSidebar() {
  emit('close')
}

/**
 * Emits upgrade/login event to parent.
 */
function onUpgrade() {
  emit('upgrade')
  emit('close')
}
</script>

<!--
  ===== Styling Notes =====
  - Sidebar is 75% width on mobile, max-w-xs for larger screens.
  - Overlay covers the rest of the screen and closes sidebar on click.
  - All touch targets are min 48px high for mobile usability.
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: role="navigation", aria-labels, keyboard ESC to close.
-->