<!--
  CompanySettingsView.vue
  Stratonea/Sales Tracker - Main view for managing company settings.
  - Ghana-optimized: mobile-first, offline-friendly, simple UI
  - Handles company info with mock data for now
  - Follows Stratonea guidelines and file structure
-->

<template>
  <!-- ===== App Header (Stratonea pattern) ===== -->


  <!-- ===== Main Content ===== -->
  <div class="max-w-md mx-auto">
    <!-- Company Info Card -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 class="text-lg font-bold mb-2 text-primary">Company Information</h2>
      <div class="mb-2">
        <span class="font-medium text-gray-700">Name:</span>
        <span class="ml-2 text-gray-900">{{ company.name }}</span>
      </div>
      <div class="mb-2">
        <span class="font-medium text-gray-700">Phone:</span>
        <span class="ml-2 text-gray-900">{{ company.phone }}</span>
      </div>
      <div class="mb-2">
        <span class="font-medium text-gray-700">Email:</span>
        <span class="ml-2 text-gray-900">{{ company.email }}</span>
      </div>
      <div class="mb-2">
        <span class="font-medium text-gray-700">Location:</span>
        <span class="ml-2 text-gray-900">{{ company.location }}</span>
      </div>
      <div class="mb-2">
        <span class="font-medium text-gray-700">Currency:</span>
        <span class="ml-2 text-gray-900">{{ company.currency }}</span>
      </div>
      <div class="mb-2">
        <span class="font-medium text-gray-700">Timezone:</span>
        <span class="ml-2 text-gray-900">{{ company.timezone }}</span>
      </div>
      <button
        class="w-full bg-primary text-white font-bold py-3 rounded-lg shadow min-h-[48px] hover:bg-primary-dark transition-colors mt-4"
        @click="onAdd" aria-label="Edit Company Info">
        Add Company Info
      </button>
      <!-- Edit Button -->
      <button
        class="w-full bg-primary text-white font-bold py-3 rounded-lg shadow min-h-[48px] hover:bg-primary-dark transition-colors mt-4"
        @click="editing = true" aria-label="Edit Company Info">
        Edit Company Info
      </button>
    </div>

    <!-- Edit Form (shows when editing) -->
    <form v-if="editing" class="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4" @submit.prevent="onSave"
      autocomplete="off" aria-label="Edit Company Info">
      <h2 class="text-lg font-bold mb-2 text-primary">Edit Company Info</h2>
      <div>
        <label for="company-name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input id="company-name" type="text" v-model="form.name" required
          class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px]"
          placeholder="Enter company name" />
      </div>
      <div>
        <label for="company-phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input id="company-phone" type="tel" v-model="form.phone" required
          class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px]"
          placeholder="e.g. 024 123 4567" />
      </div>
      <div>
        <label for="company-email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input id="company-email" type="email" v-model="form.email"
          class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px]"
          placeholder="Enter email address" />
      </div>
      <div>
        <label for="company-location" class="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input id="company-location" type="text" v-model="form.location"
          class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px]"
          placeholder="e.g. Accra" />
      </div>
      <div>
        <label for="company-currency" class="block text-sm font-medium text-gray-700 mb-1">Currency</label>
        <input id="company-currency" type="text" v-model="form.currency" required
          class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px]"
          placeholder="e.g. GHS" />
      </div>
      <div>
        <label for="company-timezone" class="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
        <input id="company-timezone" type="text" v-model="form.timezone" required
          class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px]"
          placeholder="e.g. Africa/Accra" />
      </div>
      <!-- Error Message -->
      <p v-if="formError" class="text-xs text-red-600 mt-1">{{ formError }}</p>
      <!-- Action Buttons -->
      <div class="flex gap-3 mt-2">
        <button type="submit"
          class="flex-1 bg-primary text-white font-bold py-3 rounded-lg shadow min-h-[48px] hover:bg-primary-dark transition-colors"
          aria-label="Save">
          Save
        </button>
        <button type="button"
          class="flex-1 bg-gray-200 text-gray-800 font-bold py-3 rounded-lg shadow min-h-[48px] hover:bg-gray-300 transition-colors"
          @click="onCancel" aria-label="Cancel">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import { ref } from 'vue'

// ===== Types & Interfaces =====
/**
 * Company info type for the settings view.
 */
interface CompanyInfo {
  name: string
  phone: string
  email: string
  location: string
  currency: string
  timezone: string
}

// ===== Main Logic =====
/**
 * Mock company data for demonstration.
 * Replace with real data from store or API.
 */
const company = ref<CompanyInfo>({
  name: 'Stratonea Ltd.',
  phone: '024 123 4567',
  email: 'info@stratonea.com',
  location: 'Accra',
  currency: 'GHS',
  timezone: 'Africa/Accra'
})

// State for editing and form error
const editing = ref(false)
const form = ref<CompanyInfo>({ ...company.value })
const formError = ref('')

/**
 * Handles saving the company info.
 */
function onSave() {
  // Simple validation (mock)
  if (!form.value.name || !form.value.phone || !form.value.currency || !form.value.timezone) {
    formError.value = 'Please fill in all required fields.'
    return
  }
  // Save changes (mock)
  company.value = { ...form.value }
  editing.value = false
  formError.value = ''
}

/**
 * Handles canceling the edit form.
 */
function onCancel() {
  editing.value = false
  form.value = { ...company.value }
  formError.value = ''
}

function onAdd() {
  alert("Add a new company")
}
</script>

<!--
  ===== Styling Notes =====
  - Mobile-first, max-w-md for mobile, centered content.
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: aria-labels, clear feedback.
-->