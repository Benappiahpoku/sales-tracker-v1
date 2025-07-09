<!--
  CustomerCard.vue
  Stratonea/Sales Tracker - Modern customer card for mobile view
  - Card-based design matching dashboard and product card style
  - Ghana-optimized: phone format, touch targets, offline support
  - Box icons and hover animations
  - Prominent customer details with location display
  - Quick actions: View, Edit, Delete buttons
  - Follows Stratonea guidelines
-->

<template>
  <!-- ===== Customer Card ===== -->
  <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all duration-200 relative group">
    
    <!-- ===== Customer Header ===== -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center">
        <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
          <font-awesome-icon icon="user" class="text-primary-600 text-lg" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ name }}</h3>
          <div class="flex items-center text-sm text-gray-500">
            <font-awesome-icon icon="map-marker-alt" class="mr-1 text-xs" />
            <span>{{ location }}</span>
          </div>
        </div>
      </div>
      
      <!-- Status Badge -->
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <div class="w-2 h-2 bg-green-500 rounded-full mr-1.5"></div>
        Active
      </span>
    </div>

    <!-- ===== Customer Details ===== -->
    <div class="space-y-3 mb-6">
      <!-- Phone Number -->
      <div class="flex items-center justify-between py-2 border-b border-gray-100">
        <div class="flex items-center">
          <font-awesome-icon icon="phone" class="text-gray-400 mr-3 w-4" />
          <span class="text-sm text-gray-600">Phone</span>
        </div>
        <span class="text-sm font-medium text-gray-900 font-mono">{{ formattedPhone }}</span>
      </div>

      <!-- Email -->
      <div class="flex items-center justify-between py-2 border-b border-gray-100">
        <div class="flex items-center">
          <font-awesome-icon icon="envelope" class="text-gray-400 mr-3 w-4" />
          <span class="text-sm text-gray-600">Email</span>
        </div>
        <span class="text-sm font-medium text-gray-900 truncate max-w-[150px]" :title="email">{{ email }}</span>
      </div>

      <!-- Location -->
      <div class="flex items-center justify-between py-2">
        <div class="flex items-center">
          <font-awesome-icon icon="map-marker-alt" class="text-gray-400 mr-3 w-4" />
          <span class="text-sm text-gray-600">Location</span>
        </div>
        <span class="text-sm font-medium text-primary-600">{{ location }}</span>
      </div>
    </div>

    <!-- ===== Action Buttons ===== -->
    <div class="flex gap-2">
      <!-- View Button -->
      <button
        @click="onView"
        class="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150"
        :aria-label="`View details for ${name}`"
      >
        <font-awesome-icon icon="eye" class="mr-2" />
        View
      </button>

      <!-- Edit Button -->
      <button
        @click="onEdit"
        class="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150"
        :aria-label="`Edit ${name}`"
      >
        <font-awesome-icon icon="edit" class="mr-2" />
        Edit
      </button>

      <!-- Delete Button -->
      <button
        @click="onDelete"
        class="inline-flex items-center justify-center px-3 py-2 border border-red-300 text-sm leading-4 font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150"
        :aria-label="`Delete ${name}`"
      >
        <font-awesome-icon icon="trash" />
      </button>
    </div>

    <!-- ===== WhatsApp Quick Action ===== -->
    <div class="mt-3 pt-3 border-t border-gray-100">
      <button
        @click="onWhatsApp"
        class="w-full inline-flex items-center justify-center px-3 py-2 border border-green-300 text-sm leading-4 font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
        :aria-label="`Message ${name} on WhatsApp`"
      >
        <font-awesome-icon icon="['fab', 'whatsapp']" class="mr-2" />
        WhatsApp
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * CustomerCard.vue - Modern customer card component
 * - Displays customer information in card format for mobile view
 * - Ghana-optimized: phone formatting, WhatsApp integration, touch-friendly
 * - Hover animations and visual status indicators
 * - Quick actions: View, Edit, Delete, WhatsApp
 */

// ===== Imports =====
import { computed } from 'vue'

// ===== Types & Interfaces =====
interface Props {
  name: string
  phone: string
  email: string
  location: string
}

const props = withDefaults(defineProps<Props>(), {
  name: 'Ama Serwaa',
  phone: '024 123 4567',
  email: 'ama@example.com',
  location: 'Kumasi'
})

// ===== Emits =====
const emit = defineEmits<{
  (e: 'view'): void
  (e: 'edit'): void
  (e: 'delete'): void
  (e: 'whatsapp'): void
}>()

// ===== Computed Properties =====
const formattedPhone = computed(() => {
  const cleaned = props.phone.replace(/\D/g, '')
  
  // Format Ghana phone numbers: 024 123 4567
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
  } else if (cleaned.length === 12 && cleaned.startsWith('233')) {
    // Convert +233 format to local format
    const localNumber = '0' + cleaned.slice(3)
    return `${localNumber.slice(0, 3)} ${localNumber.slice(3, 6)} ${localNumber.slice(6)}`
  }
  
  return props.phone
})

// ===== Event Handlers =====
function onView() {
  emit('view')
}

function onEdit() {
  emit('edit')
}

function onDelete() {
  emit('delete')
}

function onWhatsApp() {
  const cleaned = props.phone.replace(/\D/g, '')
  let whatsappPhone = ''
  
  // Convert to international format for WhatsApp
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    whatsappPhone = '233' + cleaned.slice(1)
  } else if (cleaned.length === 12 && cleaned.startsWith('233')) {
    whatsappPhone = cleaned
  } else {
    whatsappPhone = cleaned
  }
  
  const message = encodeURIComponent(`Hello ${props.name}, I hope you're doing well!`)
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${message}`
  
  window.open(whatsappUrl, '_blank')
  emit('whatsapp')
}
</script>

<style scoped>
/* ===== Modern Card Animations ===== */
.group {
  transform: translateZ(0); /* Enable hardware acceleration */
}

.group:hover {
  transform: translateY(-2px);
}

/* Touch feedback for mobile users */
button:active {
  transform: scale(0.98);
}

/* Enhanced focus states for accessibility */
button:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}

/* Smooth icon transitions */
.fa-icon {
  transition: transform 0.15s ease-in-out;
}

button:hover .fa-icon {
  transform: scale(1.1);
}
</style>