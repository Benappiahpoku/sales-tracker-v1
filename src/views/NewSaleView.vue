<!--
  NewSaleView.vue
  Stratonea/Sales Tracker - Modern invoice creation view
  - Mobile-first: stacked layout on mobile, side-by-side on desktop
  - Offline-friendly: auto-saves drafts via localforage
  - Ghana-optimized: tax rates, WhatsApp sharing, PDF generation
  - Clear workflow: company info, customer details, products, payment
  - Auto-incrementing invoice numbers with manual edit capability
  - Real-time calculations and validation
  - Follows Stratonea guidelines with comprehensive documentation
-->

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- ===== [New Feature] START: Mobile/Desktop Responsive Header ===== -->
    <header class="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
      <div class="flex items-center justify-between max-w-7xl mx-auto">
        <!-- Back Button & Title -->
        <div class="flex items-center">
          <button 
            @click="router.back()" 
            class="mr-4 p-2 text-gray-600 hover:text-gray-900 rounded-lg transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Go back"
          >
            <font-awesome-icon icon="arrow-left" class="text-xl" />
          </button>
          <div>
            <h1 class="text-xl md:text-2xl font-bold text-gray-900">Sales Invoice</h1>
            <p class="text-sm text-gray-600 hidden sm:block">Create and manage your invoice</p>
          </div>
        </div>

        <!-- Auto-save Status -->
        <div class="flex items-center gap-3">
          <div v-if="autoSaveStatus" class="flex items-center text-sm">
            <font-awesome-icon 
              :icon="autoSaveStatus === 'saving' ? 'spinner' : 'check-circle'" 
              :class="[
                'mr-2',
                autoSaveStatus === 'saving' ? 'animate-spin text-blue-500' : 'text-green-500'
              ]"
            />
            <span :class="autoSaveStatus === 'saving' ? 'text-blue-600' : 'text-green-600'">
              {{ autoSaveStatus === 'saving' ? 'Saving...' : 'Saved' }}
            </span>
          </div>
          
          <!-- Offline Indicator -->
          <div v-if="!isOnline" class="flex items-center text-amber-600 text-sm">
            <font-awesome-icon icon="wifi" class="mr-2" />
            <span class="hidden sm:inline">Offline</span>
          </div>
        </div>
      </div>
    </header>
    <!-- ===== [New Feature] END ===== -->

    <div class="max-w-7xl mx-auto p-4">
      <!-- ===== [New Feature] START: Responsive Grid Layout ===== -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <!-- ===== LEFT COLUMN (Company & Customer Info) ===== -->
        <div class="space-y-6">
          
          <!-- ===== Company Info Section ===== -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center mb-4">
              <div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                <font-awesome-icon icon="building" class="text-primary-600 text-sm" />
              </div>
              <h2 class="text-lg font-bold text-gray-900">Company Info</h2>
            </div>

            <div class="space-y-4">
              <!-- Logo Upload -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
                <div class="flex items-center gap-4">
                  <div v-if="form.company.logo" class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <img :src="form.company.logo" alt="Company Logo" class="w-full h-full object-cover" />
                  </div>
                  <div v-else class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <font-awesome-icon icon="image" class="text-gray-400" />
                  </div>
                  <label class="cursor-pointer bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 transition-colors min-h-[48px] flex items-center">
                    <font-awesome-icon icon="upload" class="mr-2" />
                    Upload Logo
                    <input type="file" @change="handleLogoUpload" accept="image/*" class="sr-only">
                  </label>
                </div>
              </div>

              <!-- Company Selection -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                <select 
                  v-model="form.company.id"
                  @change="onCompanyChange"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary bg-white shadow-sm min-h-[48px] transition-colors duration-200"
                  required
                >
                  <option value="">Select Company</option>
                  <option v-for="company in companies" :key="company.id" :value="company.id">
                    {{ company.name }}
                  </option>
                </select>
              </div>

              <!-- Company Phone -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <select 
                  v-model="form.company.phone"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary bg-white shadow-sm min-h-[48px] transition-colors duration-200"
                  required
                >
                  <option value="">Select Phone</option>
                  <option v-for="phone in selectedCompany?.phones || []" :key="phone" :value="phone">
                    {{ phone }}
                  </option>
                </select>
              </div>

              <!-- Add/Edit Company Button -->
              <button 
                type="button"
                @click="showCompanyModal = true"
                class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary min-h-[48px] transition-colors duration-200"
              >
                <font-awesome-icon icon="plus" class="mr-2" />
                Add / Edit Company Info
              </button>
            </div>
          </div>

          <!-- ===== Customer Info Section ===== -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center mb-4">
              <div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                <font-awesome-icon icon="user" class="text-primary-600 text-sm" />
              </div>
              <h2 class="text-lg font-bold text-gray-900">Customer Info</h2>
            </div>

            <div class="space-y-4">
              <!-- Customer Selection -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Customer *</label>
                <select 
                  v-model="form.customer.id"
                  @change="onCustomerChange"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary bg-white shadow-sm min-h-[48px] transition-colors duration-200"
                  required
                >
                  <option value="">Select Customer</option>
                  <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                    {{ customer.name }}
                  </option>
                </select>
              </div>

              <!-- Customer Phone -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Customer Phone *</label>
                <select 
                  v-model="form.customer.phone"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary bg-white shadow-sm min-h-[48px] transition-colors duration-200"
                  required
                >
                  <option value="">Select Phone</option>
                  <option v-for="phone in selectedCustomer?.phones || []" :key="phone" :value="phone">
                    {{ phone }}
                  </option>
                </select>
              </div>

              <!-- Add/Edit Customer Button -->
              <button 
                type="button"
                @click="showCustomerModal = true"
                class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary min-h-[48px] transition-colors duration-200"
              >
                <font-awesome-icon icon="plus" class="mr-2" />
                Add / Edit Customer Info
              </button>
            </div>
          </div>
        </div>

        <!-- ===== RIGHT COLUMN (Invoice Details & Products) ===== -->
        <div class="space-y-6">
          
          <!-- ===== Invoice Details Section ===== -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center mb-4">
              <div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                <font-awesome-icon icon="file-invoice" class="text-primary-600 text-sm" />
              </div>
              <h2 class="text-lg font-bold text-gray-900">Invoice Details</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Invoice Number -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Invoice No. *</label>
                <input 
                  v-model="form.invoiceNumber"
                  type="text"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary bg-white shadow-sm min-h-[48px] transition-colors duration-200"
                  placeholder="INV-0001"
                  required
                />
              </div>

              <!-- Invoice Date -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                <input 
                  v-model="form.date"
                  type="date"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary bg-white shadow-sm min-h-[48px] transition-colors duration-200"
                  required
                />
              </div>

              <!-- Currency -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select 
                  v-model="form.currency"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary bg-white shadow-sm min-h-[48px] transition-colors duration-200"
                >
                  <option value="GHS">GHS (Ghana Cedi)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="EUR">EUR (Euro)</option>
                </select>
              </div>

              <!-- Tax Type -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Tax Type</label>
                <select 
                  v-model="form.taxType"
                  @change="onTaxTypeChange"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary bg-white shadow-sm min-h-[48px] transition-colors duration-200"
                >
                  <option value="none">None</option>
                  <option value="4">VAT (4%)</option>
                  <option value="21.9">NHIL (21.9%)</option>
                  <option value="custom">Custom Tax Rate</option>
                </select>
              </div>

              <!-- Custom Tax Rate Input -->
              <div v-if="form.taxType === 'custom'" class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Custom Tax Rate (%)</label>
                <input 
                  v-model.number="form.customTaxRate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary bg-white shadow-sm min-h-[48px] transition-colors duration-200"
                  placeholder="Enter tax rate percentage"
                />
              </div>
            </div>
          </div>

          <!-- ===== Product Details Section ===== -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                  <font-awesome-icon icon="box" class="text-primary-600 text-sm" />
                </div>
                <h2 class="text-lg font-bold text-gray-900">Product Details</h2>
              </div>
              <button 
                type="button"
                @click="showProductModal = true"
                class="flex items-center px-4 py-2 text-sm font-medium text-primary bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors min-h-[48px]"
              >
                <font-awesome-icon icon="plus" class="mr-2" />
                Add / Edit New Product
              </button>
            </div>

            <!-- Desktop Table View -->
            <div class="hidden md:block overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-200">
                    <th class="text-left py-3 px-2 text-sm font-medium text-gray-700">Item</th>
                    <th class="text-left py-3 px-2 text-sm font-medium text-gray-700">Description</th>
                    <th class="text-left py-3 px-2 text-sm font-medium text-gray-700">Qty</th>
                    <th class="text-left py-3 px-2 text-sm font-medium text-gray-700">Price</th>
                    <th class="text-left py-3 px-2 text-sm font-medium text-gray-700">Total</th>
                    <th class="text-left py-3 px-2 text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in form.items" :key="index" class="border-b border-gray-100">
                    <td class="py-3 px-2">
                      <select 
                        v-model="item.productId"
                        @change="onProductSelect(index)"
                        class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white min-h-[40px]"
                        required
                      >
                        <option value="">Select Product</option>
                        <option v-for="product in products" :key="product.id" :value="product.id">
                          {{ product.name }}
                        </option>
                      </select>
                    </td>
                    <td class="py-3 px-2">
                      <input 
                        v-model="item.description"
                        type="text"
                        class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white min-h-[40px]"
                        placeholder="Item description"
                      />
                    </td>
                    <td class="py-3 px-2">
                      <input 
                        v-model.number="item.quantity"
                        type="number"
                        min="1"
                        class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white min-h-[40px]"
                        required
                      />
                    </td>
                    <td class="py-3 px-2">
                      <div class="relative">
                        <input 
                          v-model.number="item.price"
                          type="number"
                          min="0"
                          step="0.01"
                          class="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white min-h-[40px]"
                          required
                        />
                        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">₵</span>
                      </div>
                    </td>
                    <td class="py-3 px-2 font-medium">
                      {{ formatCurrency(item.quantity * item.price) }}
                    </td>
                    <td class="py-3 px-2">
                      <button 
                        type="button"
                        @click="removeItem(index)"
                        class="p-2 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50 min-h-[40px] min-w-[40px] flex items-center justify-center"
                        aria-label="Remove item"
                      >
                        <font-awesome-icon icon="trash" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Mobile Card View -->
            <div class="md:hidden space-y-4">
              <div v-for="(item, index) in form.items" :key="index" class="border border-gray-200 rounded-lg p-4">
                <div class="grid grid-cols-1 gap-3">
                  <!-- Product Selection -->
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Item</label>
                    <select 
                      v-model="item.productId"
                      @change="onProductSelect(index)"
                      class="w-full px-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-base bg-white min-h-[48px]"
                      required
                    >
                      <option value="">Select Product</option>
                      <option v-for="product in products" :key="product.id" :value="product.id">
                        {{ product.name }}
                      </option>
                    </select>
                  </div>

                  <!-- Description -->
                  <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1">Description</label>
                    <input 
                      v-model="item.description"
                      type="text"
                      class="w-full px-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-base bg-white min-h-[48px]"
                      placeholder="Item description"
                    />
                  </div>

                  <!-- Quantity and Price Row -->
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Qty</label>
                      <input 
                        v-model.number="item.quantity"
                        type="number"
                        min="1"
                        class="w-full px-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-base bg-white min-h-[48px]"
                        required
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Price</label>
                      <div class="relative">
                        <input 
                          v-model.number="item.price"
                          type="number"
                          min="0"
                          step="0.01"
                          class="w-full pl-8 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-base bg-white min-h-[48px]"
                          required
                        />
                        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₵</span>
                      </div>
                    </div>
                  </div>

                  <!-- Total and Remove Button -->
                  <div class="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div class="font-medium text-lg">
                      Total: {{ formatCurrency(item.quantity * item.price) }}
                    </div>
                    <button 
                      type="button"
                      @click="removeItem(index)"
                      class="px-4 py-2 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50 font-medium text-sm min-h-[48px] flex items-center"
                      aria-label="Remove item"
                    >
                      <font-awesome-icon icon="trash" class="mr-2" />
                      Remove Item
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add Item Button -->
            <div class="mt-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                @click="addItem"
                class="w-full flex items-center justify-center px-4 py-3 border border-dashed border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400 rounded-lg transition-colors min-h-[48px]"
              >
                <font-awesome-icon icon="plus" class="mr-2" />
                Add Item
              </button>
            </div>
          </div>

          <!-- ===== Summary Section ===== -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center mb-4">
              <div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                <font-awesome-icon icon="calculator" class="text-primary-600 text-sm" />
              </div>
              <h2 class="text-lg font-bold text-gray-900">Summary</h2>
            </div>

            <div class="space-y-3">
              <div class="flex justify-between text-base">
                <span class="text-gray-600">Subtotal:</span>
                <span class="font-medium">{{ formatCurrency(subtotal) }}</span>
              </div>
              <div v-if="taxAmount > 0" class="flex justify-between text-base">
                <span class="text-gray-600">Tax ({{ currentTaxRate }}%):</span>
                <span class="font-medium">{{ formatCurrency(taxAmount) }}</span>
              </div>
              <div class="border-t border-gray-200 pt-3">
                <div class="flex justify-between text-lg font-bold">
                  <span class="text-gray-900">Grand Total:</span>
                  <span class="text-primary">{{ formatCurrency(grandTotal) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- ===== Payment Section ===== -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center mb-4">
              <div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                <font-awesome-icon icon="credit-card" class="text-primary-600 text-sm" />
              </div>
              <h2 class="text-lg font-bold text-gray-900">Payment</h2>
            </div>

            <div class="space-y-4">
              <label class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors min-h-[48px]">
                <input 
                  type="checkbox" 
                  v-model="form.isPaid"
                  class="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span class="ml-3 text-base font-medium text-gray-700">Mark as Paid</span>
              </label>
            </div>
          </div>

          <!-- ===== Action Buttons ===== -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                type="button"
                @click="previewInvoice"
                class="flex items-center justify-center px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors min-h-[48px]"
              >
                <font-awesome-icon icon="eye" class="mr-2" />
                Preview Invoice
              </button>

              <button
                type="button"
                @click="downloadPDF"
                :disabled="!isFormValid"
                class="flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors min-h-[48px] disabled:cursor-not-allowed"
              >
                <font-awesome-icon icon="download" class="mr-2" />
                Download PDF
              </button>

              <button
                type="button"
                @click="shareWhatsApp"
                :disabled="!isFormValid"
                class="flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors min-h-[48px] disabled:cursor-not-allowed"
              >
                <font-awesome-icon icon="share" class="mr-2" />
                Share WhatsApp
              </button>

              <button
                type="button"
                @click="createNewInvoice"
                class="flex items-center justify-center px-4 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors min-h-[48px]"
              >
                <font-awesome-icon icon="plus" class="mr-2" />
                New Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== [New Feature] START: Modal Placeholders ===== -->
    <!-- Company Modal Placeholder -->
    <div v-if="showCompanyModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 class="text-lg font-bold mb-4">Add/Edit Company</h3>
        <p class="text-gray-600 mb-4">Company form will be implemented here using CustomerForm.vue pattern</p>
        <button @click="showCompanyModal = false" class="px-4 py-2 bg-gray-200 rounded-lg">Close</button>
      </div>
    </div>

    <!-- Customer Modal Placeholder -->
    <div v-if="showCustomerModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 class="text-lg font-bold mb-4">Add/Edit Customer</h3>
        <p class="text-gray-600 mb-4">Customer form will be implemented here using CustomerForm.vue</p>
        <button @click="showCustomerModal = false" class="px-4 py-2 bg-gray-200 rounded-lg">Close</button>
      </div>
    </div>

    <!-- Product Modal Placeholder -->
    <div v-if="showProductModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 class="text-lg font-bold mb-4">Add/Edit Product</h3>
        <p class="text-gray-600 mb-4">Product form will be implemented here using ProductForm.vue</p>
        <button @click="showProductModal = false" class="px-4 py-2 bg-gray-200 rounded-lg">Close</button>
      </div>
    </div>
    <!-- ===== [New Feature] END ===== -->
  </div>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * NewSaleView.vue - Modern invoice creation interface
 * - Responsive design: mobile stacked, desktop side-by-side layout
 * - Auto-save functionality with localforage integration
 * - Ghana-optimized: tax rates, currency, WhatsApp sharing
 * - Real-time calculations with comprehensive validation
 * - Auto-incrementing invoice numbers with manual override
 * - PDF generation using html2pdf for offline capability
 * - Comprehensive form validation and error handling
 */

// ===== Imports =====
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import localforage from 'localforage'

// ===== Types & Interfaces =====
/**
 * Company interface for company selection and management
 */
interface Company {
  id: string
  name: string
  phones: string[]
  logo?: string
  address?: string
}

/**
 * Customer interface for customer selection and management
 */
interface Customer {
  id: string
  name: string
  phones: string[]
  email?: string
  address?: string
}

/**
 * Product interface for product selection and management
 */
interface Product {
  id: string
  name: string
  description: string
  price: number
  sku: string
}

/**
 * Invoice item interface for line items
 */
interface InvoiceItem {
  productId: string
  description: string
  quantity: number
  price: number
}

/**
 * Main invoice form interface
 */
interface InvoiceForm {
  // Company info
  company: {
    id: string
    phone: string
    logo?: string
  }
  // Customer info
  customer: {
    id: string
    phone: string
  }
  // Invoice details
  invoiceNumber: string
  date: string
  currency: string
  taxType: 'none' | '4' | '21.9' | 'custom'
  customTaxRate: number
  // Items and payment
  items: InvoiceItem[]
  isPaid: boolean
}

// ===== Constants & Config =====
/**
 * Auto-save delay in milliseconds (2 seconds after user stops typing)
 */
const AUTO_SAVE_DELAY = 2000

/**
 * LocalForage key for draft invoices
 */
const DRAFT_STORAGE_KEY = 'invoice-draft'

/**
 * Invoice number counter key in localStorage
 */
const INVOICE_COUNTER_KEY = 'invoice-counter'

// ===== State Management =====
const router = useRouter()

/**
 * Network status tracking
 */
const isOnline = ref(navigator.onLine)

/**
 * Auto-save status indicator
 */
const autoSaveStatus = ref<'saving' | 'saved' | null>(null)

/**
 * Modal visibility states
 */
const showCompanyModal = ref(false)
const showCustomerModal = ref(false)
const showProductModal = ref(false)

/**
 * Main invoice form data with proper initialization
 */
const form = reactive<InvoiceForm>({
  company: {
    id: '',
    phone: '',
    logo: ''
  },
  customer: {
    id: '',
    phone: ''
  },
  invoiceNumber: '',
  date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
  currency: 'GHS',
  taxType: 'none',
  customTaxRate: 0,
  items: [
    {
      productId: '',
      description: '',
      quantity: 1,
      price: 0
    }
  ],
  isPaid: false
})

/**
 * Mock data - replace with real data from your store/API
 */
const companies = ref<Company[]>([
  {
    id: '1',
    name: 'Stratonea Technologies',
    phones: ['+233 24 123 4567', '+233 50 987 6543'],
    address: 'Accra, Ghana'
  },
  {
    id: '2',
    name: 'Ghana Tech Solutions',
    phones: ['+233 20 555 1234', '+233 54 444 5678'],
    address: 'Kumasi, Ghana'
  }
])

const customers = ref<Customer[]>([
  {
    id: '1',
    name: 'Ama Serwaa',
    phones: ['+233 24 111 2222', '+233 50 333 4444'],
    email: 'ama.serwaa@email.com'
  },
  {
    id: '2',
    name: 'Kwame Mensah',
    phones: ['+233 20 666 7777', '+233 54 888 9999'],
    email: 'kwame.mensah@email.com'
  }
])

const products = ref<Product[]>([
  {
    id: '1',
    name: 'Palm Oil (5L)',
    description: 'Premium quality palm oil in 5L container',
    price: 45.00,
    sku: 'SKU001'
  },
  {
    id: '2',
    name: 'Rice (50kg)',
    description: 'Local jasmine rice 50kg bag',
    price: 180.00,
    sku: 'SKU002'
  }
])

// ===== Computed Properties =====
/**
 * Get selected company object
 */
const selectedCompany = computed(() => 
  companies.value.find(c => c.id === form.company.id)
)

/**
 * Get selected customer object
 */
const selectedCustomer = computed(() => 
  customers.value.find(c => c.id === form.customer.id)
)

/**
 * Calculate subtotal (sum of all line items)
 */
const subtotal = computed(() => 
  form.items.reduce((total, item) => total + (item.quantity * item.price), 0)
)

/**
 * Get current tax rate based on selection
 */
const currentTaxRate = computed(() => {
  switch (form.taxType) {
    case '4': return 4
    case '21.9': return 21.9
    case 'custom': return form.customTaxRate || 0
    default: return 0
  }
})

/**
 * Calculate tax amount
 */
const taxAmount = computed(() => 
  (subtotal.value * currentTaxRate.value) / 100
)

/**
 * Calculate grand total (subtotal + tax)
 */
const grandTotal = computed(() => 
  subtotal.value + taxAmount.value
)

/**
 * Check if form is valid for submission
 */
const isFormValid = computed(() => {
  return form.company.id !== '' &&
         form.customer.id !== '' &&
         form.invoiceNumber !== '' &&
         form.date !== '' &&
         form.items.length > 0 &&
         form.items.every(item => 
           item.productId !== '' && 
           item.quantity > 0 && 
           item.price > 0
         )
})

// ===== Helper Functions =====
/**
 * Format currency for Ghana Cedi display
 */
function formatCurrency(amount: number): string {
  return `₵${amount.toFixed(2)}`
}

/**
 * Generate next invoice number
 */
function generateInvoiceNumber(): string {
  const currentCount = parseInt(localStorage.getItem(INVOICE_COUNTER_KEY) || '0')
  const nextCount = currentCount + 1
  localStorage.setItem(INVOICE_COUNTER_KEY, nextCount.toString())
  return `INV-${nextCount.toString().padStart(4, '0')}`
}

/**
 * Auto-save draft to localforage
 */
async function saveDraft(): Promise<void> {
  try {
    autoSaveStatus.value = 'saving'
    await localforage.setItem(DRAFT_STORAGE_KEY, {
      ...form,
      lastSaved: Date.now()
    })
    autoSaveStatus.value = 'saved'
    
    // Clear status after 3 seconds
    setTimeout(() => {
      autoSaveStatus.value = null
    }, 3000)
  } catch (error) {
    console.error('Failed to save draft:', error)
    autoSaveStatus.value = null
  }
}

/**
 * Load draft from localforage
 */
async function loadDraft(): Promise<void> {
  try {
    const draft = await localforage.getItem(DRAFT_STORAGE_KEY) as any
    if (draft && draft.lastSaved) {
      // Ask user if they want to restore the draft
      const shouldRestore = confirm('Found a saved draft. Would you like to restore it?')
      if (shouldRestore) {
        Object.assign(form, draft)
      }
    }
  } catch (error) {
    console.error('Failed to load draft:', error)
  }
}

// ===== Event Handlers =====
/**
 * Handle company selection change
 */
function onCompanyChange(): void {
  // Reset phone selection when company changes
  form.company.phone = ''
}

/**
 * Handle customer selection change
 */
function onCustomerChange(): void {
  // Reset phone selection when customer changes
  form.customer.phone = ''
}

/**
 * Handle tax type selection change
 */
function onTaxTypeChange(): void {
  if (form.taxType !== 'custom') {
    form.customTaxRate = 0
  }
}

/**
 * Handle product selection for a specific item
 */
function onProductSelect(index: number): void {
  const selectedProduct = products.value.find(p => p.id === form.items[index].productId)
  if (selectedProduct) {
    form.items[index].description = selectedProduct.description
    form.items[index].price = selectedProduct.price
  }
}

/**
 * Handle logo file upload
 */
function handleLogoUpload(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.company.logo = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

/**
 * Add new item to invoice
 */
function addItem(): void {
  form.items.push({
    productId: '',
    description: '',
    quantity: 1,
    price: 0
  })
}

/**
 * Remove item from invoice
 */
function removeItem(index: number): void {
  if (form.items.length > 1) {
    form.items.splice(index, 1)
  }
}

/**
 * Preview invoice (placeholder)
 */
function previewInvoice(): void {
  alert('Invoice preview will be implemented in next step')
}

/**
 * Download PDF using html2pdf
 */
async function downloadPDF(): Promise<void> {
  try {
    // Import html2pdf dynamically for better performance
    const html2pdf = (await import('html2pdf.js')).default
    
    // Create invoice HTML content
    const invoiceContent = generateInvoiceHTML()
    
    // Configure PDF options
    const options = {
      margin: 1,
      filename: `${form.invoiceNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }
    
    // Generate and download PDF
    await html2pdf().set(options).from(invoiceContent).save()
  } catch (error) {
    console.error('Failed to generate PDF:', error)
    alert('Failed to generate PDF. Please try again.')
  }
}

/**
 * Generate invoice HTML for PDF
 */
function generateInvoiceHTML(): string {
  const selectedComp = selectedCompany.value
  const selectedCust = selectedCustomer.value
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1F3A8A; margin: 0;">INVOICE</h1>
        <p style="margin: 5px 0;">Invoice No: ${form.invoiceNumber}</p>
        <p style="margin: 5px 0;">Date: ${form.date}</p>
      </div>
      
      <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
        <div>
          <h3>From:</h3>
          <p><strong>${selectedComp?.name || 'N/A'}</strong></p>
          <p>${selectedComp?.address || ''}</p>
          <p>${form.company.phone}</p>
        </div>
        <div>
          <h3>To:</h3>
          <p><strong>${selectedCust?.name || 'N/A'}</strong></p>
          <p>${selectedCust?.email || ''}</p>
          <p>${form.customer.phone}</p>
        </div>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <thead>
          <tr style="background-color: #f8f9fa;">
            <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Description</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: center;">Qty</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">Price</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${form.items.map(item => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px;">${item.description}</td>
              <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">${item.quantity}</td>
              <td style="border: 1px solid #ddd; padding: 12px; text-align: right;">${formatCurrency(item.price)}</td>
              <td style="border: 1px solid #ddd; padding: 12px; text-align: right;">${formatCurrency(item.quantity * item.price)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div style="text-align: right; margin-bottom: 30px;">
        <p>Subtotal: ${formatCurrency(subtotal.value)}</p>
        ${taxAmount.value > 0 ? `<p>Tax (${currentTaxRate.value}%): ${formatCurrency(taxAmount.value)}</p>` : ''}
        <h3>Grand Total: ${formatCurrency(grandTotal.value)}</h3>
        <p><strong>Status: ${form.isPaid ? 'PAID' : 'UNPAID'}</strong></p>
      </div>
    </div>
  `
}

/**
 * Share invoice via WhatsApp
 */
function shareWhatsApp(): void {
  const selectedComp = selectedCompany.value
  const selectedCust = selectedCustomer.value
  
  // Generate invoice text message
  const message = `
*INVOICE: ${form.invoiceNumber}*
Date: ${form.date}

*From:* ${selectedComp?.name || 'N/A'}
*To:* ${selectedCust?.name || 'N/A'}

*Items:*
${form.items.map(item => 
  `• ${item.description} (${item.quantity}x) - ${formatCurrency(item.quantity * item.price)}`
).join('\n')}

*Subtotal:* ${formatCurrency(subtotal.value)}
${taxAmount.value > 0 ? `*Tax (${currentTaxRate.value}%):* ${formatCurrency(taxAmount.value)}\n` : ''}*Grand Total:* ${formatCurrency(grandTotal.value)}

*Status:* ${form.isPaid ? 'PAID ✅' : 'UNPAID ⏳'}

Generated via Stratonea Sales Tracker
  `.trim()
  
  // Open WhatsApp with pre-filled message
  const whatsappUrl = `https://wa.me/${form.customer.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}

/**
 * Create new invoice (reset form)
 */
function createNewInvoice(): void {
  const shouldReset = confirm('Are you sure you want to create a new invoice? Any unsaved changes will be lost.')
  if (shouldReset) {
    // Reset form to initial state
    Object.assign(form, {
      company: { id: '', phone: '', logo: '' },
      customer: { id: '', phone: '' },
      invoiceNumber: generateInvoiceNumber(),
      date: new Date().toISOString().split('T')[0],
      currency: 'GHS',
      taxType: 'none',
      customTaxRate: 0,
      items: [{ productId: '', description: '', quantity: 1, price: 0 }],
      isPaid: false
    })
    
    // Clear saved draft
    localforage.removeItem(DRAFT_STORAGE_KEY)
  }
}

// ===== Watchers for Auto-save =====
/**
 * Auto-save watcher with debounce
 */
let autoSaveTimeout: ReturnType<typeof setTimeout>

watch(form, () => {
  // Clear existing timeout
  if (autoSaveTimeout) {
    clearTimeout(autoSaveTimeout)
  }
  
  // Set new timeout for auto-save
  autoSaveTimeout = setTimeout(() => {
    saveDraft()
  }, AUTO_SAVE_DELAY)
}, { deep: true })

// ===== Lifecycle Hooks =====
/**
 * Initialize component when mounted
 */
onMounted(async () => {
  // Set up network status listeners
  window.addEventListener('online', () => {
    isOnline.value = true
  })
  
  window.addEventListener('offline', () => {
    isOnline.value = false
  })
  
  // Load draft if exists
  await loadDraft()
  
  // Generate initial invoice number if empty
  if (!form.invoiceNumber) {
    form.invoiceNumber = generateInvoiceNumber()
  }
  
  // Set focus on first input for better UX
  const firstInput = document.querySelector('select, input') as HTMLElement
  if (firstInput) {
    firstInput.focus()
  }
})
</script>

<style scoped>
/* ===== [New Feature] START: Custom Styles ===== */
/* Smooth transitions for all interactive elements */
input,
select,
button {
  transition: all 0.2s ease-in-out;
}

/* Touch feedback for mobile users */
button:active {
  transform: scale(0.98);
}

/* Enhanced focus states for accessibility */
input:focus-visible,
select:focus-visible,
button:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}

/* Loading animation for auto-save */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive table scrolling */
@media (max-width: 768px) {
  .overflow-x-auto {
    -webkit-overflow-scrolling: touch;
  }
}
/* ===== [New Feature] END ===== */
</style>