<template>

     <!-- ===== Pricing Section ===== -->
     <section class="py-16 md:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p class="text-xl text-gray-600 mb-8">
            Choose the plan that works best for your business
          </p>
          
          <!-- ===== [New Feature] START: Functional Pricing Toggle ===== -->
          <!-- Pricing Toggle -->
          <div class="flex items-center justify-center mb-8">
            <span :class="['text-lg font-medium', !isYearly ? 'text-primary' : 'text-gray-500']">Monthly</span>
            <button
              @click="togglePricing"
              :class="[
                'relative mx-4 w-16 h-8 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50',
                isYearly ? 'bg-primary' : 'bg-gray-300'
              ]"
              aria-label="Toggle pricing period"
            >
              <span
                :class="[
                  'absolute w-6 h-6 bg-white rounded-full top-1 transition-transform duration-200 shadow-md',
                  isYearly ? 'translate-x-9' : 'translate-x-1'
                ]"
              ></span>
            </button>
            <span :class="['text-lg font-medium', isYearly ? 'text-primary' : 'text-gray-500']">
              Yearly 
              <span class="text-green-600 text-sm font-normal">(Save 25%)</span>
            </span>
          </div>
          <!-- ===== [New Feature] END ===== -->
        </div>

        <!-- Pricing Cards - 1 column on mobile, 2 columns on desktop -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          <!-- Free Plan -->
          <div class="bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
            <div class="text-center">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Free Forever</h3>
              <div class="text-4xl font-bold text-gray-900 mb-4">
                ₵0
                <span class="text-lg font-normal text-gray-600">/month</span>
              </div>
              <p class="text-gray-600 mb-6">Perfect for getting started</p>
              
              <!-- Features List -->
              <ul class="text-left space-y-3 mb-8">
                <li class="flex items-center">
                  <font-awesome-icon icon="check" class="text-green-600 mr-3" />
                  <span class="text-gray-700">Up to 50 invoices per month</span>
                </li>
                <li class="flex items-center">
                  <font-awesome-icon icon="check" class="text-green-600 mr-3" />
                  <span class="text-gray-700">Unlimited customers</span>
                </li>
                <li class="flex items-center">
                  <font-awesome-icon icon="check" class="text-green-600 mr-3" />
                  <span class="text-gray-700">Offline functionality</span>
                </li>
                <li class="flex items-center">
                  <font-awesome-icon icon="check" class="text-green-600 mr-3" />
                  <span class="text-gray-700">WhatsApp sharing</span>
                </li>
                <li class="flex items-center">
                  <font-awesome-icon icon="check" class="text-green-600 mr-3" />
                  <span class="text-gray-700">PDF export</span>
                </li>
                <li class="flex items-center">
                  <font-awesome-icon icon="check" class="text-green-600 mr-3" />
                  <span class="text-gray-700">Basic reports</span>
                </li>
              </ul>

              <!-- CTA Button -->
              <router-link
                to="/dashboard"
                class="w-full inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-200 min-h-[48px]"
              >
                Get Started Free
              </router-link>
            </div>
          </div>

          <!-- Pro Plan -->
          <div class="bg-primary rounded-xl p-8 shadow-lg border-2 border-primary hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 relative">
            <!-- Popular Badge -->
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span class="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </span>
            </div>
            
            <div class="text-center text-white">
              <h3 class="text-2xl font-bold mb-2">Pro</h3>
              <div class="text-4xl font-bold mb-4">
                {{ isYearly ? '₵30' : '₵40' }}
                <span class="text-lg font-normal opacity-80">/month</span>
              </div>
              <p class="opacity-80 mb-6">
                {{ isYearly ? 'Billed yearly (₵360/year)' : 'Perfect for growing businesses' }}
              </p>
              
              <!-- Features List -->
              <ul class="text-left space-y-3 mb-8">
                <li class="flex items-center">
                  <font-awesome-icon icon="check" class="text-green-300 mr-3" />
                  <span>Unlimited invoices</span>
                </li>
                <li class="flex items-center">
                  <font-awesome-icon icon="check" class="text-green-300 mr-3" />
                  <span>Advanced analytics</span>
                </li>
                <li class="flex items-center">
                  <font-awesome-icon icon="check" class="text-green-300 mr-3" />
                  <span>Custom invoice templates</span>
                </li>
                <li class="flex items-center">
                  <font-awesome-icon icon="check" class="text-green-300 mr-3" />
                  <span>Inventory management</span>
                </li>
                <li class="flex items-center">
                  <font-awesome-icon icon="check" class="text-green-300 mr-3" />
                  <span>Priority support</span>
                </li>
                <li class="flex items-center">
                  <font-awesome-icon icon="check" class="text-green-300 mr-3" />
                  <span>Data backup & sync</span>
                </li>
              </ul>

              <!-- CTA Button -->
              <a
                href="https://wa.me/233594093926?text=Hi! I'm interested in the Pro plan for Sales Tracker"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200 min-h-[48px]"
              >
                <font-awesome-icon icon="fa-brands fa-whatsapp" class="mr-2" />
                Talk to Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    </template>

<script setup lang="ts">
import {ref} from 'vue'

/**
 * Pricing toggle state - switches between monthly and yearly pricing
 */
 const isYearly = ref(false)
/**
 * Toggle between monthly and yearly pricing
 * Updates the displayed prices throughout the pricing section
 */
 function togglePricing() {
  isYearly.value = !isYearly.value
}
</script>
