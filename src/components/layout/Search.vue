<!--
  Search.vue
  Stratonea/Sales Tracker - Minimal, mobile-first search input for filtering lists.
  - Large touch targets, clear feedback, Ghana-optimized
  - Uses Tailwind utility classes for styling
  - Follows Stratonea guidelines (see copilot-instructions.md)
  - Emits search input to parent for filtering
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <div class="w-full mb-3">
    <!-- Label for accessibility -->
    <label :for="id || ''" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <!-- Search Input -->
    <div class="relative">
      <input :id="id || ''" type="search" :placeholder="placeholder || ''" :value="modelValue || ''" @input="onInput"
        class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px]"
        autocomplete="off" aria-label="Search" />
      <!-- Search Icon (optional, for visual feedback) -->
      <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true">
        🔍
      </span>
    </div>
    <!-- Show error if provided -->
    <p v-if="error" class="text-xs text-red-600 mt-1">{{ error }}</p>
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
/**
 * Props for Search
 * - modelValue: string (current search value)
 * - label: string (field label)
 * - placeholder: string (input placeholder)
 * - error: string (optional error message)
 * - id: string (for accessibility)
 */
withDefaults(
  defineProps<{
    modelValue?: string
    label?: string
    placeholder?: string
    error?: string
    id?: string
  }>(),
  {
    modelValue: '',
    label: 'Search',
    placeholder: 'Type to search...',
    error: '',
    id: 'search-input'
  }
)

// ===== Emits =====
/**
 * Emits the new search value to the parent component.
 */
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

/**
 * Handles input event and emits the updated value.
 * @param event - Input event from the search field
 */
function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
}
</script>

<!--
  ===== Styling Notes =====
  - Input is touch-optimized (min-h-[48px]), large tap area for mobile.
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: label, aria-label, error feedback.
  - Search icon is for visual feedback only.
-->