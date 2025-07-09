<!--
  CustomerForm.vue
  Stratonea/Sales Tracker - Modern customer form for adding/editing customers
  - Mobile-first, Ghana-optimized: phone validation, city suggestions, offline support
  - Touch-optimized inputs, clear error messages, and status selection
  - Follows Stratonea guidelines with comprehensive documentation
-->

<template>
  <!-- ===== Customer Form Card ===== -->
  <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
    <!-- ===== Form Header ===== -->
    <div class="flex items-center mb-6">
      <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
        <font-awesome-icon :icon="isEditing ? 'user-edit' : 'user-plus'" class="text-primary-600" />
      </div>
      <div>
        <h2 class="text-xl font-bold text-gray-900">
          {{ isEditing ? 'Edit Customer' : 'Add New Customer' }}
        </h2>
        <p class="text-sm text-gray-600">
          {{ isEditing ? 'Update customer information' : 'Enter customer details below' }}
        </p>
      </div>
    </div>

    <!-- ===== Customer Form ===== -->
    <form @submit.prevent="onSubmit" class="space-y-4" autocomplete="off">
      <!-- Name -->
      <div>
        <label for="customer-name" class="flex items-center text-sm font-medium text-gray-700 mb-2">
          <font-awesome-icon icon="user" class="mr-2 text-gray-400 w-4" />
          Customer Name *
        </label>
        <input
          id="customer-name"
          type="text"
          v-model="form.name"
          required
          class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px] transition-colors duration-200"
          placeholder="Enter full name (e.g., Ama Serwaa)"
          autocomplete="off"
          :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': errors.name }"
        />
        <p v-if="errors.name" class="text-xs text-red-600 mt-1">{{ errors.name }}</p>
      </div>

      <!-- Phone -->
      <div>
        <label for="customer-phone" class="flex items-center text-sm font-medium text-gray-700 mb-2">
          <font-awesome-icon icon="phone" class="mr-2 text-gray-400 w-4" />
          Phone Number *
        </label>
        <input
          id="customer-phone"
          type="tel"
          v-model="form.phone"
          required
          pattern="^0[2-5][0-9]{8}$"
          class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px] font-mono transition-colors duration-200"
          placeholder="e.g., 024 123 4567"
          autocomplete="off"
          :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': errors.phone }"
          @input="formatPhoneNumber"
        />
        <p class="text-xs text-gray-500 mt-1">Ghana format: 024, 020, 050, 054, 055, 026, 057</p>
        <p v-if="errors.phone" class="text-xs text-red-600 mt-1">{{ errors.phone }}</p>
      </div>

      <!-- Email -->
      <div>
        <label for="customer-email" class="flex items-center text-sm font-medium text-gray-700 mb-2">
          <font-awesome-icon icon="envelope" class="mr-2 text-gray-400 w-4" />
          Email Address
          <span class="text-gray-400 ml-1">(optional)</span>
        </label>
        <input
          id="customer-email"
          type="email"
          v-model="form.email"
          class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px] transition-colors duration-200"
          placeholder="customer@example.com"
          autocomplete="off"
          :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': errors.email }"
        />
        <p v-if="errors.email" class="text-xs text-red-600 mt-1">{{ errors.email }}</p>
      </div>

      <!-- Location -->
      <div>
        <label for="customer-location" class="flex items-center text-sm font-medium text-gray-700 mb-2">
          <font-awesome-icon icon="map-marker-alt" class="mr-2 text-gray-400 w-4" />
          Location
          <span class="text-gray-400 ml-1">(optional)</span>
        </label>
        <select
          id="customer-location"
          v-model="form.location"
          class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px] transition-colors duration-200"
        >
          <option value="">Select location...</option>
          <option v-for="city in ghanaianCities" :key="city" :value="city">{{ city }}</option>
        </select>
        <p class="text-xs text-gray-500 mt-1">Choose from major Ghanaian cities</p>
      </div>

      <!-- Status -->
      <div>
        <label class="flex items-center text-sm font-medium text-gray-700 mb-2">
          <font-awesome-icon icon="user-check" class="mr-2 text-gray-400 w-4" />
          Customer Status
        </label>
        <div class="grid grid-cols-3 gap-2">
          <label
            v-for="status in statusOptions"
            :key="status.value"
            class="relative cursor-pointer"
          >
            <input
              type="radio"
              :value="status.value"
              v-model="form.status"
              class="sr-only"
            />
            <div
              :class="[
                'flex items-center justify-center px-3 py-3 rounded-lg border-2 text-sm font-medium min-h-[48px] transition-all duration-200',
                form.status === status.value
                  ? `border-${status.color}-500 bg-${status.color}-50 text-${status.color}-700`
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              ]"
            >
              <div
                :class="[
                  'w-2 h-2 rounded-full mr-2',
                  form.status === status.value ? `bg-${status.color}-500` : 'bg-gray-300'
                ]"
              ></div>
              {{ status.label }}
            </div>
          </label>
        </div>
      </div>

      <!-- Join Date (edit only) -->
      <div v-if="isEditing">
        <label for="join-date" class="flex items-center text-sm font-medium text-gray-700 mb-2">
          <font-awesome-icon icon="calendar" class="mr-2 text-gray-400 w-4" />
          Join Date
        </label>
        <input
          id="join-date"
          type="date"
          v-model="form.joinDate"
          class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px] transition-colors duration-200"
        />
        <p class="text-xs text-gray-500 mt-1">When this customer was first added</p>
      </div>

      <!-- Form Actions -->
      <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
        <!-- Save Button -->
        <button
          type="submit"
          :disabled="isSubmitting"
          class="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] transition-all duration-200 active:scale-98"
        >
          <font-awesome-icon
            :icon="isSubmitting ? 'spinner' : 'save'"
            :class="{ 'animate-spin': isSubmitting }"
            class="mr-2"
          />
          {{ isSubmitting ? 'Saving...' : (isEditing ? 'Update Customer' : 'Add Customer') }}
        </button>
        <!-- Cancel Button -->
        <button
          type="button"
          @click="onCancel"
          :disabled="isSubmitting"
          class="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] transition-all duration-200 active:scale-98"
        >
          <font-awesome-icon icon="times" class="mr-2" />
          Cancel
        </button>
      </div>

      <!-- Offline Status Indicator -->
      <div v-if="!isOnline" class="flex items-center justify-center p-3 bg-orange-50 border border-orange-200 rounded-lg mt-4">
        <font-awesome-icon icon="wifi" class="text-orange-600 mr-2" />
        <span class="text-sm text-orange-700">Working offline - changes will sync when connected</span>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * CustomerForm.vue - Modern customer form component
 * - Ghana-optimized: phone validation, city selection, offline support
 * - Mobile-first design, touch-optimized inputs, clear error messages
 */

// ===== Imports =====
import { reactive, ref, onMounted } from 'vue'

// ===== Types & Interfaces =====
interface CustomerFormData {
  name: string
  phone: string
  email: string
  location: string
  status: 'active' | 'inactive' | 'pending'
  joinDate: string
}
interface FormErrors {
  name?: string
  phone?: string
  email?: string
  location?: string
}
interface StatusOption {
  value: 'active' | 'inactive' | 'pending'
  label: string
  color: string
}

// ===== Props =====
const props = withDefaults(defineProps<{
  initial?: Partial<CustomerFormData>
  isEditing?: boolean
}>(), {
  initial: () => ({}),
  isEditing: false
})

// ===== Emits =====
const emit = defineEmits<{
  (e: 'save', data: CustomerFormData): void
  (e: 'cancel'): void
}>()

// ===== Constants & Config =====
const ghanaianCities = [
  'Accra', 'Kumasi', 'Tamale', 'Takoradi', 'Cape Coast', 'Koforidua',
  'Sunyani', 'Ho', 'Wa', 'Bolgatanga', 'Techiman', 'Obuasi',
  'Tema', 'Tarkwa', 'Dunkwa', 'Nkawkaw'
]
const statusOptions: StatusOption[] = [
  { value: 'active', label: 'Active', color: 'green' },
  { value: 'pending', label: 'Pending', color: 'orange' },
  { value: 'inactive', label: 'Inactive', color: 'red' }
]

// ===== State Management =====
const form = reactive<CustomerFormData>({
  name: '',
  phone: '',
  email: '',
  location: '',
  status: 'active',
  joinDate: new Date().toISOString().split('T')[0],
  ...props.initial
})
const errors = reactive<FormErrors>({})
const isSubmitting = ref(false)
const isOnline = ref(navigator.onLine)

// ===== Helper Functions =====
function validatePhone(phone: string): boolean {
  // Ghana phone: 0[2-5]XXXXXXXX
  const cleaned = phone.replace(/\s/g, '')
  return /^0[2-5][0-9]{8}$/.test(cleaned)
}
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
function formatPhoneNumber(event: Event) {
  // Format as 024 123 4567 for readability
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  if (value.length > 3 && value.length <= 6) {
    value = value.slice(0, 3) + ' ' + value.slice(3)
  } else if (value.length > 6) {
    value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 10)
  }
  form.phone = value
  input.value = value
}
function validateForm(): boolean {
  // Clear previous errors
  Object.keys(errors).forEach(key => delete errors[key as keyof FormErrors])
  let isValid = true
  if (!form.name.trim()) {
    errors.name = 'Customer name is required'
    isValid = false
  }
  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required'
    isValid = false
  } else if (!validatePhone(form.phone)) {
    errors.phone = 'Please enter a valid Ghana phone number (e.g., 024 123 4567)'
    isValid = false
  }
  if (form.email && !validateEmail(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }
  return isValid
}

// ===== Event Handlers =====
async function onSubmit() {
  if (!validateForm()) return
  isSubmitting.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API
    const cleanedData: CustomerFormData = {
      ...form,
      phone: form.phone.replace(/\s/g, ''),
      name: form.name.trim(),
      email: form.email.trim()
    }
    emit('save', cleanedData)
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
function onCancel() {
  emit('cancel')
}

// ===== Lifecycle Hooks =====
onMounted(() => {
  window.addEventListener('online', () => { isOnline.value = true })
  window.addEventListener('offline', () => { isOnline.value = false })
  const nameInput = document.getElementById('customer-name')
  if (nameInput) nameInput.focus()
})
</script>

<style scoped>
/* ===== Modern Form Styling ===== */
button:active { transform: scale(0.98); }
input:focus-visible, select:focus-visible, button:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}
input, select, button { transition: all 0.2s ease-in-out; }
.cursor-pointer:hover div { transform: translateY(-1px); }
.animate-spin { animation: spin 1s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@media (max-width: 640px) {
  .flex-col button { width: 100%; }
  .p-6 { padding: 1rem; }
}
</style>