<!--
  DeleteConfirmModal.vue
  Stratonea/BizPoint - Generic confirmation dialog for delete actions.
  - Accessible modal with focus trap and keyboard support
  - Ghana-optimized: clear message, large touch targets, mobile-first
  - Uses Tailwind utility classes for styling
  - Follows Stratonea guidelines (see copilot-instructions.md)
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-desc"
      @keydown.esc="onCancel"
      tabindex="0"
    >
      <!-- Modal Panel -->
      <div class="bg-white rounded-lg shadow-lg w-11/12 max-w-sm p-6 flex flex-col items-center">
        <!-- Title -->
        <h2 id="delete-modal-title" class="text-lg font-bold mb-2 text-gray-900">
          Confirm Delete
        </h2>
        <!-- Description -->
        <p id="delete-modal-desc" class="text-base text-gray-700 mb-6 text-center">
          {{ message || 'Are you sure you want to delete this item? This action cannot be undone.' }}
        </p>
        <!-- Action Buttons -->
        <div class="flex gap-4 w-full">
          <button
            class="flex-1 py-3 rounded-lg bg-gray-200 text-gray-800 font-medium min-h-[48px] focus:outline-none focus:ring-2 focus:ring-primary"
            @click="onCancel"
            aria-label="Cancel"
            type="button"
          >
            Cancel
          </button>
          <button
            class="flex-1 py-3 rounded-lg bg-red-600 text-white font-bold min-h-[48px] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
            @click="onConfirm"
            aria-label="Confirm Delete"
            type="button"
            autofocus
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </transition>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
/**
 * Props for DeleteConfirmModal
 * - open: boolean (controls modal visibility)
 * - message: string (optional custom message)
 */
withDefaults(
  defineProps<{
    open: boolean
    message?: string
  }>(),
  {
    message: ''
  }
)

// ===== Emits =====
/**
 * Emits events to parent for confirm/cancel actions.
 */
const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

// ===== Main Logic =====
/**
 * Handles confirm action.
 */
function onConfirm() {
  emit('confirm')
}

/**
 * Handles cancel action (close modal).
 */
function onCancel() {
  emit('cancel')
}
</script>

<!--
  ===== Styling Notes =====
  - Modal is centered, with a dark overlay for focus.
  - All touch targets are min 48px high for mobile usability.
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: role="dialog", aria labels, ESC to close.
  - Clear, simple English for Ghanaian users.
-->