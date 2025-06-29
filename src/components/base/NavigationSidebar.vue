<!--
  NavigationSidebar.vue
  Stratonea/Sales Tracker - Mobile-first sidebar navigation with proper scrolling
  - Slide-in overlay from the left (75% width on mobile)
  - Company name, user status, and main navigation links
  - Prominent Upgrade/Login button for freemium flow
  - Ghana-optimized: touch targets, color contrast, mobile sizing
  - Fixed scrolling issue: sidebar content now scrolls properly on mobile
  - Uses Tailwind utility classes for styling
  - Accessible: semantic nav, aria labels, keyboard navigation
  - Follows Stratonea guidelines (see copilot-instructions.md)
-->

<template>
  <!-- ===== Sidebar Overlay ===== -->
  <transition name="fade">
    <aside v-if="open" class="fixed inset-0 z-40 flex" aria-label="Sidebar Navigation" role="navigation"
      @keydown.esc="closeSidebar" tabindex="0">
      <!-- ===== [New Feature] START: Scrollable Sidebar Panel ===== -->
      <nav class="w-3/4 max-w-xs bg-white text-gray-900 shadow-lg h-full flex flex-col overflow-hidden" @click.stop>
        <!-- ===== Company Name & User Status (Fixed Header) ===== -->
        <div class="flex-shrink-0 flex flex-col items-start px-4 py-4 border-b border-gray-200 bg-white">
          <span class="text-xl font-bold mb-1">Stratonea</span>
          <span class="text-sm text-gray-500">Guest User</span>
        </div>

        <!-- ===== Scrollable Content Area ===== -->
        <div class="flex-1 overflow-y-auto overscroll-contain">
          <!-- ===== Navigation Links ===== -->
          <ul class="flex flex-col gap-2 px-4 py-4">
            <li v-for="item in navItems" :key="item.label">
              <button
                class="w-full text-left px-3 py-3 rounded-lg hover:bg-primary hover:text-white focus:bg-primary focus:text-white transition-colors min-h-[48px] font-medium active:scale-98"
                @click="navigate(item.route)" 
                :aria-label="item.label"
              >
                {{ item.label }}
              </button>
            </li>
          </ul>

          <!-- ===== Upgrade/Login Button (Inside Scrollable Area) ===== -->
          <div class="px-4 pb-6 mt-4">
            <button
              class="w-full bg-primary text-white font-bold py-3 rounded-lg shadow-md min-h-[48px] hover:bg-primary-dark transition-colors active:scale-98"
              @click="onUpgrade" 
              aria-label="Upgrade or Login"
            >
              Upgrade / Login
            </button>
          </div>

          <!-- ===== Bottom Padding for Better Scrolling ===== -->
          <div class="h-24"></div>
        </div>
      </nav>
      <!-- ===== [New Feature] END ===== -->

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
  { label: 'My Biz', route: '/dashboard' },
  { label: 'New Sale', route: '/new-sale' },
  { label: 'Customers', route: '/customers' },
  { label: 'Products', route: '/products' },
  { label: 'Stock', route: '/stock' },
  { label: 'Sales History', route: '/sales' },
  { label: 'Sales Report', route: '/reports' },
  { label: 'Settings', route: '/settings' }
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

<style scoped>
/* ===== [New Feature] START: Enhanced Scrolling & Touch Feedback ===== */
/* Smooth scrolling behavior for sidebar */
.overflow-y-auto {
  scroll-behavior: smooth;
}

/* Custom scrollbar styling for better mobile experience */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.8);
}

/* Touch feedback for mobile users */
button:active {
  transform: scale(0.98);
}

/* Fade transition for sidebar overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Ensure proper touch targets and prevent text selection during scrolling */
button {
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

/* Prevent scrollbar from appearing on desktop when not needed */
@media (min-width: 768px) {
  .overflow-y-auto {
    scrollbar-width: thin;
  }
}

/* Enhance mobile scrolling performance */
.overscroll-contain {
  overscroll-behavior: contain;
}
/* ===== [New Feature] END ===== */
</style>

<!--
  ===== Styling Notes =====
  - Fixed scrolling issue: sidebar content is now properly scrollable
  - Company header is fixed at top, content area scrolls independently
  - Upgrade button moved inside scrollable area so it's always accessible
  - Added smooth scrolling and custom scrollbar styling
  - All touch targets remain min 48px high for mobile usability
  - Added touch feedback (scale-98) for better mobile interaction
  - Uses overscroll-contain to prevent document scrolling when sidebar scrolls
  - Accessible: role="navigation", aria-labels, keyboard ESC to close
-->