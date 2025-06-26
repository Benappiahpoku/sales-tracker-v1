<!--
  CustomerPerson.vue
  Stratonea/Sales Tracker - Component for displaying a single customer.
  - Mobile-first, touch-optimized, Ghana-optimized
  - Uses Tailwind utility classes for styling
  - Follows Stratonea guidelines (see copilot-instructions.md)
  - Uses mock/static data for now (replace with real data later)
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <div
    class="flex items-center gap-4 bg-white rounded-lg shadow p-4 mb-2 min-h-[64px] hover:bg-gray-50 transition-colors"
    aria-label="Customer" role="listitem">
    <!-- Customer Icon (placeholder for now) -->
    <div class="flex-shrink-0 w-12 h-12 bg-gray-200 rounded stratonea flex items-center justify-center">
      <span class="text-gray-400 text-xl" aria-hidden="true">👤</span>
    </div>
    <!-- Customer Info -->
    <div class="flex-1 min-w-0">
      <div class="flex justify-between items-center">
        <span class="font-bold text-base text-gray-900 truncate">{{ name }}</span>
        <span class="text-xs text-gray-500">{{ phone }}</span>
      </div>
      <div class="flex justify-between items-end mt-1">
        <span class="text-sm text-gray-700">Email: <span class="font-semibold">{{ email }}</span></span>
        <span class="text-sm font-bold text-primary">{{ location }}</span>
      </div>
    </div>
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
/**
 * Props for CustomerPerson
 * - name: string (customer name)
 * - phone: string (customer phone number)
 * - email: string (customer email)
 * - location: string (customer location)
 */
withDefaults(
  defineProps<{
    name?: string
    phone?: string
    email?: string
    location?: string
  }>(),
  {
    name: 'Ama Serwaa',
    phone: '024 123 4567',
    email: 'ama@example.com',
    location: 'Kumasi'
  }
)
</script>

<!--
  ===== Styling Notes =====
  - Card is touch-optimized (min-h-[64px]), large tap area for mobile.
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: aria-label, role="listitem", semantic markup.
  - Placeholder emoji for customer icon (replace with real image later).
-->