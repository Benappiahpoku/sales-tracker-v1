<!--
  CustomerList.vue
  Stratonea/Sales Tracker - Responsive customer list with:
  - Mobile: Vertical card layout using CustomerCard
  - Desktop: Horizontal table layout
  - Ghana-optimized: offline-friendly, touch targets
  - Uses Tailwind utility classes for styling
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <!-- Mobile Card Layout: Use CustomerCard for each customer -->
  <div class="block md:hidden">
    <div class="space-y-4 max-w-md mx-auto my-4">
      <CustomerCard
        v-for="customer in customers"
        :key="customer.phone"
        :name="customer.name"
        :phone="customer.phone"
        :email="customer.email"
        :location="customer.location"
        @edit="onEdit(customer)"
        @delete="onDelete(customer)"
      />
    </div>
  </div>
  <!-- ===== [New Feature] END ===== -->

  <!-- Desktop Table Layout -->
  <table class="hidden md:table min-w-full border-separate border-spacing-0">
    <!-- Table Header -->
    <thead class="bg-gray-50">
      <tr>
        <th class="top-0 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
          Name
        </th>
        <th class="top-0 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          Phone
        </th>
        <th class="top-0 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          Email
        </th>
        <th class="top-0 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          Location
        </th>
        <th class="top-0 py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900">
          Actions
        </th>
      </tr>
    </thead>

    <!-- Table Body -->
    <tbody class="bg-white">
      <tr v-for="customer in customers" :key="customer.phone" class="hover:bg-gray-50">
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
          {{ customer.name }}
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
          {{ customer.phone }}
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
          {{ customer.email }}
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
          {{ customer.location }}
        </td>
        <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm space-x-2">
          <button @click="onEdit(customer)"
            class="inline-flex items-center px-2.5 py-1.5 text-sm font-medium text-white bg-primary rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            Edit
          </button>
          <button @click="onDelete(customer)"
            class="inline-flex items-center px-2.5 py-1.5 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Empty State -->
  <div v-if="(customers?.length ?? 0) === 0" class="text-center py-12 bg-gray-50">
    <p class="text-sm text-gray-500">No customers found</p>
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import CustomerCard from '@/components/layout/CustomerCard.vue'

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
      {
        name: 'Ama Serwaa',
        phone: '024 123 4567',
        email: 'ama@example.com',
        location: 'Kumasi'
      },
      {
        name: 'Kwame Mensah',
        phone: '020 987 6543',
        email: 'kwame@example.com',
        location: 'Accra'
      }
    ]
  }
)

// ===== Emits =====
/**
 * Emits events to parent for edit and delete actions.
 */
const emit = defineEmits<{
  (e: 'edit', customer: Customer): void
  (e: 'delete', customer: Customer): void
}>()

// ===== Main Logic =====
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
  - Uses responsive classes (md:) for desktop/mobile switching
  - Mobile: Card layout with CustomerCard component
  - Desktop: Table layout with horizontal rows
  - Consistent colors and spacing across both layouts
  - Touch-optimized for mobile, precise for desktop
-->