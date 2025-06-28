<!--
  CompanySettingsView.vue
  Stratonea/Sales Tracker - Modern company settings screen with card-based design
  - Follows DashboardView.vue design principles and modern styling
  - Ghana-optimized: mobile-first, offline-friendly, WhatsApp integration
  - Uses modern card layouts with hover effects and animations
  - Touch-optimized buttons and accessibility features
  - Follows Stratonea guidelines with comprehensive documentation
-->

<template>
  <!-- ===== [New Feature] START: Modern Company Settings Design ===== -->
  <div class="min-h-screen bg-gray-50 px-4 py-6">
    <!-- Page Header -->
    <div class="max-w-2xl mx-auto mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Company Settings</h1>
      <p class="text-gray-600">Manage your business information and preferences</p>
    </div>

    <!-- Settings Content Container -->
    <div class="max-w-2xl mx-auto space-y-6">
      
      <!-- ===== Company Overview Card ===== -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group">
        <!-- Company Header with Logo -->
        <div class="flex items-center mb-6">
          <!-- Company Logo Placeholder -->
          <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary-200 transition-colors duration-200">
            <font-awesome-icon icon="building" class="text-primary-600 text-2xl" />
          </div>
          
          <!-- Company Basic Info -->
          <div class="flex-1">
            <h2 class="text-xl font-semibold text-gray-900 mb-1">{{ company.name }}</h2>
            <p class="text-sm text-gray-500 mb-1">{{ company.location }}</p>
            <div class="flex items-center">
              <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span class="text-xs text-green-600 font-medium">Active Business</span>
            </div>
          </div>
        </div>

        <!-- Company Details Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <!-- Phone -->
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center mb-2">
              <font-awesome-icon icon="phone" class="text-gray-400 mr-2 w-4 h-4" />
              <span class="text-sm font-medium text-gray-700">Phone</span>
            </div>
            <p class="text-sm text-gray-900 font-mono">{{ company.phone }}</p>
          </div>

          <!-- Email -->
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center mb-2">
              <font-awesome-icon icon="envelope" class="text-gray-400 mr-2 w-4 h-4" />
              <span class="text-sm font-medium text-gray-700">Email</span>
            </div>
            <p class="text-sm text-gray-900 font-mono">{{ company.email }}</p>
          </div>

          <!-- Currency -->
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center mb-2">
              <font-awesome-icon icon="money-bill-wave" class="text-gray-400 mr-2 w-4 h-4" />
              <span class="text-sm font-medium text-gray-700">Currency</span>
            </div>
            <p class="text-sm text-gray-900 font-semibold">{{ company.currency }}</p>
          </div>

          <!-- Timezone -->
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center mb-2">
              <font-awesome-icon icon="clock" class="text-gray-400 mr-2 w-4 h-4" />
              <span class="text-sm font-medium text-gray-700">Timezone</span>
            </div>
            <p class="text-sm text-gray-900">{{ company.timezone }}</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3">
          <!-- Edit Company Button -->
          <button
            @click="onEdit"
            class="flex-1 inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 min-h-[48px] active:scale-98"
            :aria-label="`Edit company information for ${company.name}`"
          >
            <font-awesome-icon icon="edit" class="mr-2" />
            Edit Company Info
          </button>

          <!-- WhatsApp Support Button -->
          <button
            @click="onWhatsAppSupport"
            class="flex-1 inline-flex items-center justify-center px-4 py-3 border border-green-300 text-sm font-medium rounded-lg text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 min-h-[48px] active:scale-98"
            aria-label="Get business support via WhatsApp"
          >
            <font-awesome-icon :icon="['fab', 'whatsapp']" class="mr-2" />
            Business Support
          </button>
        </div>
      </div>

      <!-- ===== Business Settings Card ===== -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Business Settings</h3>
        
        <div class="space-y-4">
          <!-- Tax Configuration -->
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center">
              <font-awesome-icon icon="percentage" class="text-gray-400 mr-3 w-5 h-5" />
              <div>
                <p class="text-sm font-medium text-gray-900">Tax Rate</p>
                <p class="text-xs text-gray-500">VAT and other business taxes</p>
              </div>
            </div>
            <div class="flex items-center">
              <span class="text-sm font-medium text-gray-900 mr-2">12.5%</span>
              <button
                @click="onTaxSettings"
                class="px-3 py-1 text-xs font-medium rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
              >
                Configure
              </button>
            </div>
          </div>

          <!-- Business Hours -->
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center">
              <font-awesome-icon icon="business-time" class="text-gray-400 mr-3 w-5 h-5" />
              <div>
                <p class="text-sm font-medium text-gray-900">Business Hours</p>
                <p class="text-xs text-gray-500">Operating hours and availability</p>
              </div>
            </div>
            <div class="flex items-center">
              <span class="text-sm font-medium text-gray-900 mr-2">8AM - 6PM</span>
              <button
                @click="onBusinessHours"
                class="px-3 py-1 text-xs font-medium rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
              >
                Edit
              </button>
            </div>
          </div>

          <!-- Backup & Sync -->
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center">
              <font-awesome-icon 
                :icon="isBackupEnabled ? 'cloud-upload-alt' : 'cloud-download-alt'" 
                :class="isBackupEnabled ? 'text-green-500' : 'text-orange-500'"
                class="mr-3 w-5 h-5"
              />
              <div>
                <p class="text-sm font-medium text-gray-900">Data Backup</p>
                <p class="text-xs text-gray-500">Automatic data backup and sync</p>
              </div>
            </div>
            <div class="flex items-center">
              <div 
                :class="isBackupEnabled ? 'bg-green-500' : 'bg-orange-500'"
                class="w-2 h-2 rounded-full mr-2"
              ></div>
              <span 
                :class="isBackupEnabled ? 'text-green-600' : 'text-orange-600'"
                class="text-xs font-medium mr-2"
              >
                {{ isBackupEnabled ? 'Enabled' : 'Disabled' }}
              </span>
              <button
                @click="toggleBackup"
                class="px-3 py-1 text-xs font-medium rounded-md bg-primary text-white hover:bg-primary-hover transition-colors duration-200"
              >
                {{ isBackupEnabled ? 'Disable' : 'Enable' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== Edit Form Card (Conditional) ===== -->
      <div v-if="editing" class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Edit Company Information</h3>
        
        <form @submit.prevent="onSave" class="space-y-4">
          <!-- Company Name -->
          <div>
            <label for="company-name" class="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              id="company-name"
              v-model="form.name"
              type="text"
              required
              class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 text-sm"
              placeholder="Enter company name"
            />
          </div>

          <!-- Phone Number -->
          <div>
            <label for="company-phone" class="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              id="company-phone"
              v-model="form.phone"
              type="tel"
              required
              class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 text-sm"
              placeholder="e.g. 024 123 4567"
            />
          </div>

          <!-- Email Address -->
          <div>
            <label for="company-email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="company-email"
              v-model="form.email"
              type="email"
              class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 text-sm"
              placeholder="Enter email address"
            />
          </div>

          <!-- Location -->
          <div>
            <label for="company-location" class="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              id="company-location"
              v-model="form.location"
              type="text"
              class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 text-sm"
              placeholder="e.g. Accra, Ghana"
            />
          </div>

          <!-- Currency -->
          <div>
            <label for="company-currency" class="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              id="company-currency"
              v-model="form.currency"
              required
              class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 text-sm"
            >
              <option value="GHS">Ghana Cedi (GHS)</option>
              <option value="USD">US Dollar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="GBP">British Pound (GBP)</option>
            </select>
          </div>

          <!-- Timezone -->
          <div>
            <label for="company-timezone" class="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <select
              id="company-timezone"
              v-model="form.timezone"
              required
              class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 text-sm"
            >
              <option value="Africa/Accra">Ghana (Africa/Accra)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="Europe/London">London Time</option>
            </select>
          </div>

          <!-- Error Message -->
          <div v-if="formError" class="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start">
            <font-awesome-icon icon="exclamation-triangle" class="text-red-500 mr-2 w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <p class="text-sm font-medium text-red-800">Validation Error</p>
              <p class="text-xs text-red-600 mt-1">{{ formError }}</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              class="flex-1 inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 min-h-[48px] active:scale-98"
            >
              <font-awesome-icon icon="save" class="mr-2" />
              Save Changes
            </button>

            <button
              type="button"
              @click="onCancel"
              class="flex-1 inline-flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 min-h-[48px] active:scale-98"
            >
              <font-awesome-icon icon="times" class="mr-2" />
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- ===== Empty State (If No Company Info) ===== -->
      <div v-if="!company.name && !editing" class="text-center py-12">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <font-awesome-icon icon="building" class="text-gray-400 text-2xl" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No company information</h3>
        <p class="text-gray-500 mb-6">Add your business details to get started</p>
        <button
          @click="onAdd"
          class="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200"
        >
          Add Company Information
        </button>
      </div>
    </div>
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * CompanySettingsView.vue - Modern company settings management
 * - Displays company information with modern card layout
 * - Handles company CRUD operations (Create, Read, Update, Delete)
 * - Manages form state for editing company information
 * - Ghana-optimized: WhatsApp support, local business settings
 * - Proper TypeScript interfaces for all company data
 * - Follows DashboardView.vue design principles
 */

// ===== Imports =====
import { ref, reactive } from 'vue'

// ===== Types & Interfaces =====
/**
 * Company information interface
 * - name: Company name
 * - phone: Company phone number (Ghana format)
 * - email: Company email address
 * - location: Company location/address
 * - currency: Business currency (default GHS for Ghana)
 * - timezone: Business timezone (default Africa/Accra)
 */
interface CompanyInfo {
  name: string
  phone: string
  email: string
  location: string
  currency: string
  timezone: string
}

// ===== State Management =====
/**
 * Company information with mock data for demonstration
 * Replace with real company data from store or API
 */
const company = ref<CompanyInfo>({
  name: 'Stratonea Business Solutions',
  phone: '024 123 4567',
  email: 'info@stratonea.com',
  location: 'Accra, Ghana',
  currency: 'GHS',
  timezone: 'Africa/Accra'
})

/**
 * Form state management
 * - editing: Controls visibility of edit form
 * - form: Reactive form data for editing
 * - formError: Error message for form validation
 * - isBackupEnabled: Backup status for business settings
 */
const editing = ref(false)
const form = reactive<CompanyInfo>({ ...company.value })
const formError = ref('')
const isBackupEnabled = ref(true)

// ===== Helper Functions =====
/**
 * Validates company form data
 * @param data - Company form data to validate
 * @returns Error message or empty string if valid
 */
function validateCompanyForm(data: CompanyInfo): string {
  if (!data.name.trim()) {
    return 'Company name is required'
  }
  
  if (!data.phone.trim()) {
    return 'Phone number is required'
  }
  
  if (!data.currency) {
    return 'Currency selection is required'
  }
  
  if (!data.timezone) {
    return 'Timezone selection is required'
  }
  
  // Validate Ghana phone number format
  const phoneRegex = /^(\+233|0)(20|21|23|24|25|26|27|28|29|50|51|52|53|54|55|56|57|58|59)\d{7}$/
  const cleanPhone = data.phone.replace(/\s+/g, '')
  if (!phoneRegex.test(cleanPhone)) {
    return 'Please enter a valid Ghana phone number (e.g., 024 123 4567)'
  }
  
  return ''
}

// ===== Event Handlers =====
/**
 * Handle edit company action
 * Shows the edit form with current company data
 */
function onEdit() {
  Object.assign(form, company.value)
  editing.value = true
  formError.value = ''
}

/**
 * Handle add company action
 * Shows the edit form with empty data for new company
 */
function onAdd() {
  Object.assign(form, {
    name: '',
    phone: '',
    email: '',
    location: '',
    currency: 'GHS',
    timezone: 'Africa/Accra'
  })
  editing.value = true
  formError.value = ''
}

/**
 * Handle save company action
 * Validates and saves company information
 */
function onSave() {
  // Validate form data
  const validationError = validateCompanyForm(form)
  if (validationError) {
    formError.value = validationError
    return
  }
  
  // Save company information
  Object.assign(company.value, form)
  editing.value = false
  formError.value = ''
  
  // TODO: Implement actual save logic
  // - Call API to save company information
  // - Handle network errors gracefully
  // - Show success/error feedback
  
  alert(`Company information saved successfully!`)
}

/**
 * Handle cancel edit action
 * Cancels editing and resets form
 */
function onCancel() {
  editing.value = false
  formError.value = ''
  Object.assign(form, company.value)
}

/**
 * Handle WhatsApp support action
 * Opens WhatsApp with business support contact
 * Ghana-optimized: Uses local business support number
 */
function onWhatsAppSupport() {
  const supportPhone = '233241234567' // Ghana business support number
  const message = encodeURIComponent(
    `Hello! I need help with my business settings in Sales Tracker. Company: ${company.value.name}`
  )
  const whatsappUrl = `https://wa.me/${supportPhone}?text=${message}`
  
  window.open(whatsappUrl, '_blank')
}

/**
 * Handle tax settings action
 * Opens tax configuration (placeholder for future implementation)
 */
function onTaxSettings() {
  alert('Tax settings configuration (feature coming soon)')
}

/**
 * Handle business hours action
 * Opens business hours configuration (placeholder for future implementation)
 */
function onBusinessHours() {
  alert('Business hours configuration (feature coming soon)')
}

/**
 * Toggle backup settings
 * Enables/disables automatic data backup
 */
function toggleBackup() {
  isBackupEnabled.value = !isBackupEnabled.value
  
  const status = isBackupEnabled.value ? 'enabled' : 'disabled'
  alert(`Data backup has been ${status}`)
  
  // TODO: Implement actual backup toggle logic
  // - Update backup settings in backend
  // - Handle offline scenarios
  // - Show appropriate feedback
}
</script>

<style scoped>
/* ===== [New Feature] START: Modern Company Settings Styling ===== */
/* Touch feedback for mobile users */
button:active {
  transform: scale(0.98);
}

/* Enhanced focus states for accessibility */
button:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}

/* Card hover effects matching DashboardView */
.group:hover {
  transform: translateY(-2px);
}

/* Smooth transitions for all interactive elements */
.group {
  transition: all 0.2s ease-in-out;
}

/* Form input enhancements */
input:focus,
select:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Select dropdown styling */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .min-h-screen {
    padding-bottom: 2rem;
  }
  
  /* Ensure touch targets are at least 48px */
  button,
  input,
  select {
    min-height: 48px;
  }
}
/* ===== [New Feature] END ===== */
</style>