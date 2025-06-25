<!--
  CustomerList.vue
  Stratonea/BizPoint - Table to display customer list.
  - Mobile-first, Ghana-optimized, offline-friendly
  - Uses Tailwind utility classes for styling
  - Follows Stratonea guidelines (see copilot-instructions.md)
  - Uses mock/static data for now (replace with real data later)
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <div class="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto my-4">
    <!-- Table Header -->
    <div class="flex justify-between items-center mb-2">
      <span class="text-lg font-bold text-primary">Customers</span>
      <button
        class="bg-primary text-white px-4 py-2 rounded-lg font-bold min-h-[48px] hover:bg-primary-dark transition-colors"
        @click="onAdd"
        aria-label="Add Customer"
      >
        + Add
      </button>
    </div>
    <!-- Customer Table -->
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-gray-200">
          <th class="text-left py-2">Name</th>
          <th class="text-left py-2">Phone</th>
          <th class="text-left py-2">Email</th>
          <th class="text-left py-2">Location</th>
          <th class="text-center py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="customer in customers"
          :key="customer.phone"
          class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <td class="py-2 font-medium text-gray-900">{{ customer.name }}</td>
          <td class="py-2 text-gray-500">{{ customer.phone }}</td>
          <td class="py-2 text-gray-500">{{ customer.email }}</td>
          <td class="py-2 text-gray-500">{{ customer.location }}</td>
          <td class="py-2 text-center">
            <button
              class="text-primary font-bold px-2"
              @click="onEdit(customer)"
              aria-label="Edit"
            >
              Edit
            </button>
            <button
              class="text-red-600 font-bold px-2"
              @click="onDelete(customer)"
              aria-label="Delete"
            >
              Delete
            </button>
          </td>
        </tr>
        <!-- ===== [New Feature] START: Safe empty check ===== -->
        <tr v-if="(customers?.length ?? 0) === 0">
          <td colspan="5" class="text-center text-gray-400 py-4">No customers found.</td>
        </tr>
        <!-- ===== [New Feature] END ===== -->
      </tbody>
    </table>
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
/**
 * Customer type for the customer list.
 */
interface Customer {
  name: string
  phone: string
  email: string
  location: string
}

// ===== Props =====
/**
 * Props for CustomerList
 * - customers: Customer[] (array of customers)
 */
withDefaults(
  defineProps<{
    customers?: Customer[]
  }>(),
  {
    customers: () => [
      { name: 'Ama Serwaa', phone: '024 123 4567', email: 'ama@example.com', location: 'Kumasi' },
      { name: 'Kwame Mensah', phone: '020 987 6543', email: 'kwame@example.com', location: 'Accra' }
    ]
  }
)

// ===== Emits =====
/**
 * Emits events to parent for add, edit, and delete actions.
 */
const emit = defineEmits<{
  (e: 'add'): void
  (e: 'edit', customer: Customer): void
  (e: 'delete', customer: Customer): void
}>()

// ===== Main Logic =====
/**
 * Handles add button click.
 */
function onAdd() {
  emit('add')
}

/**
 * Handles edit button click.
 * @param customer - The customer to edit
 */
function onEdit(customer: Customer) {
  emit('edit', customer)
}

/**
 * Handles delete button click.
 * @param customer - The customer to delete
 */
function onDelete(customer: Customer) {
  emit('delete', customer)
}
</script>

<!--
  ===== Styling Notes =====
  - Table is mobile-first, touch-optimized (min-h-[48px] for actions).
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: aria-labels, clear feedback.
-->