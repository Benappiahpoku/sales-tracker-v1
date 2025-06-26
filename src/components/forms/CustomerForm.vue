<!--
  CustomerForm.vue
  Stratonea/Sales Tracker - Form for adding/editing a customer.
  - Mobile-first, Ghana-optimized, offline-friendly
  - Uses Tailwind utility classes for styling
  - Follows Stratonea guidelines (see copilot-instructions.md)
  - Uses mock/static data for now (replace with real data later)
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <form class="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto my-4 flex flex-col gap-4" @submit.prevent="onSubmit"
    aria-label="Customer Form" autocomplete="off">
    <!-- Customer Name -->
    <div>
      <label for="customer-name" class="block text-sm font-medium text-gray-700 mb-1">
        Customer Name
      </label>
      <input id="customer-name" type="text" v-model="form.name" required
        class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px]"
        placeholder="Enter customer name" autocomplete="off" aria-label="Customer Name" />
    </div>

    <!-- Phone -->
    <div>
      <label for="customer-phone" class="block text-sm font-medium text-gray-700 mb-1">
        Phone Number
      </label>
      <input id="customer-phone" type="tel" v-model="form.phone" required pattern="^0\d{9}$"
        class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px]"
        placeholder="e.g. 024 123 4567" autocomplete="off" aria-label="Phone Number" />
    </div>

    <!-- Email -->
    <div>
      <label for="customer-email" class="block text-sm font-medium text-gray-700 mb-1">
        Email (optional)
      </label>
      <input id="customer-email" type="email" v-model="form.email"
        class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px]"
        placeholder="Enter email address" autocomplete="off" aria-label="Email" />
    </div>

    <!-- Location -->
    <div>
      <label for="customer-location" class="block text-sm font-medium text-gray-700 mb-1">
        Location (optional)
      </label>
      <input id="customer-location" type="text" v-model="form.location"
        class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px]"
        placeholder="e.g. Kumasi" autocomplete="off" aria-label="Location" />
    </div>

    <!-- Error Message -->
    <p v-if="error" class="text-xs text-red-600 mt-1">{{ error }}</p>

    <!-- Action Buttons -->
    <div class="flex gap-3 mt-2">
      <button type="submit"
        class="flex-1 bg-primary text-white font-bold py-3 rounded-lg shadow min-h-[48px] hover:bg-primary-dark transition-colors"
        aria-label="Save Customer">
        Save
      </button>
      <button type="button"
        class="flex-1 bg-gray-200 text-gray-800 font-bold py-3 rounded-lg shadow min-h-[48px] hover:bg-gray-300 transition-colors"
        @click="onCancel" aria-label="Cancel">
        Cancel
      </button>
    </div>
  </form>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// ===== Types & Interfaces =====
/**
 * Props for CustomerForm
 * - initial: CustomerFormData (optional, for editing)
 * - error: string (optional error message)
 */
interface CustomerFormData {
  name: string
  phone: string
  email: string
  location: string
}

const props = withDefaults(
  defineProps<{
    initial?: CustomerFormData
    error?: string
  }>(),
  {
    initial: () => ({
      name: '',
      phone: '',
      email: '',
      location: ''
    }),
    error: ''
  }
)

// ===== Emits =====
/**
 * Emits events to parent for save/cancel actions.
 */
const emit = defineEmits<{
  (e: 'save', data: CustomerFormData): void
  (e: 'cancel'): void
}>()

// ===== Main Logic =====
/**
 * Local reactive form state, initialized from props.initial.
 */
const form = reactive<CustomerFormData>({ ...props.initial })

/**
 * Handles form submission and emits save event.
 */
function onSubmit() {
  emit('save', { ...form })
}

/**
 * Handles cancel action.
 */
function onCancel() {
  emit('cancel')
}
</script>

<!--
  ===== Styling Notes =====
  - All inputs are touch-optimized (min-h-[48px]), large tap area for mobile.
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: label, aria-label, error feedback.
-->