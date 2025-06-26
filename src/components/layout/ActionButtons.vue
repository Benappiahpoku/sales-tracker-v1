<!--
  ActionButtons.vue
  Stratonea/Sales Tracker - Action buttons for receipt/invoice actions.
  - Print, WhatsApp Share, Download PDF (can be extended)
  - Ghana-optimized: large touch targets, clear icons, mobile-first
  - WhatsApp integration for sharing receipts
  - Uses Tailwind utility classes for styling
  - Follows Stratonea guidelines (see copilot-instructions.md)
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <div class="flex flex-row gap-3 w-full justify-center py-2">
    <!-- Print Button -->
    <button
      class="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 rounded-lg shadow min-h-[48px] hover:bg-primary-dark transition-colors"
      @click="onPrint" aria-label="Print Receipt" type="button">
      <span class="material-icons" aria-hidden="true">print</span>
      Print
    </button>
    <!-- WhatsApp Share Button -->
    <button
      class="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 rounded-lg shadow min-h-[48px] hover:bg-green-700 transition-colors"
      @click="onWhatsApp" aria-label="Share via WhatsApp" type="button">
      <span class="material-icons" aria-hidden="true">whatsapp</span>
      WhatsApp
    </button>
    <!-- Download PDF Button -->
    <button
      class="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-800 font-bold py-3 rounded-lg shadow min-h-[48px] hover:bg-gray-300 transition-colors"
      @click="onDownload" aria-label="Download PDF" type="button">
      <span class="material-icons" aria-hidden="true">download</span>
      PDF
    </button>
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
/**
 * Props for ActionButtons
 * - shareMessage: string (message to share via WhatsApp)
 * - pdfUrl: string (URL for PDF download)
 */
const props = withDefaults(
  defineProps<{
    shareMessage?: string
    pdfUrl?: string
  }>(),
  {
    shareMessage: '',
    pdfUrl: ''
  }
)

// ===== Emits =====
/**
 * Emits events to parent for print, WhatsApp, and download actions.
 */
const emit = defineEmits<{
  (e: 'print'): void
  (e: 'whatsapp'): void
  (e: 'download'): void
}>()

// ===== Main Logic =====
/**
 * Handles print action.
 */
function onPrint() {
  emit('print')
}

/**
 * Handles WhatsApp share action.
 * Opens WhatsApp share link if shareMessage is provided.
 */
function onWhatsApp() {
  if (props.shareMessage) {
    const url = `https://wa.me/?text=${encodeURIComponent(props.shareMessage)}`
    window.open(url, '_blank')
  }
  emit('whatsapp')
}

/**
 * Handles PDF download action.
 * Opens the PDF URL if provided.
 */
function onDownload() {
  if (props.pdfUrl) {
    window.open(props.pdfUrl, '_blank')
  }
  emit('download')
}
</script>

<!--
  ===== Styling Notes =====
  - All buttons are min 48px high for mobile usability.
  - Uses Tailwind for color, spacing, and responsive design.
  - WhatsApp button uses green for brand recognition.
  - Material icons assumed (swap for SVGs if needed).
  - Accessible: aria-labels, clear text.
-->