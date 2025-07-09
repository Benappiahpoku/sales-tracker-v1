<!--
  PricingSection.vue
  Stratonea/Sales Tracker - Pricing section for Ghanaian SMEs
  - Mobile-first, touch-friendly, Ghana-optimized
  - Simple pricing toggle, WhatsApp integration, clear feature lists
-->

<template>
  <!-- ===== Pricing Section ===== -->
  <section class="py-16 md:py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- ===== Section Header ===== -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Simple, Transparent Pricing
        </h2>
        <p class="text-xl text-gray-600 mb-8">
          Choose the plan that works best for your business
        </p>
        <!-- ===== Pricing Toggle ===== -->
        <div class="flex items-center justify-center mb-8">
          <span :class="['text-lg font-medium mr-4', !isYearly ? 'text-primary' : 'text-gray-500']">
            Monthly
          </span>
          <div class="relative">
            <input
              id="pricing-toggle"
              type="checkbox"
              v-model="isYearly"
              class="sr-only"
            />
            <label
              for="pricing-toggle"
              :class="[
                'flex items-center cursor-pointer relative w-20 h-10 rounded-full p-1 transition-colors duration-300',
                isYearly ? 'bg-primary' : 'bg-gray-300'
              ]"
            >
              <div
                :class="[
                  'bg-white w-8 h-8 rounded-full shadow-lg transform transition-transform duration-300 flex items-center justify-center',
                  isYearly ? 'translate-x-10' : 'translate-x-0'
                ]"
              >
                <span class="text-xs font-bold text-gray-600">
                  {{ isYearly ? 'Y' : 'M' }}
                </span>
              </div>
            </label>
          </div>
          <span :class="['text-lg font-medium ml-4', isYearly ? 'text-primary' : 'text-gray-500']">
            Yearly 
            <span class="text-green-600 text-sm font-normal block md:inline">(Save 25%)</span>
          </span>
        </div>
      </div>

      <!-- ===== Pricing Cards ===== -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <!-- ===== Free Forever Card ===== -->
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
              <li v-for="item in freeFeatures" :key="item" class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">{{ item }}</span>
              </li>
            </ul>
            <!-- CTA Button -->
            <router-link
              to="/dashboard"
              class="w-full inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-200 min-h-[48px]"
            >
              Go to My Biz
            </router-link>
          </div>
        </div>

        <!-- ===== Business Card (Popular) ===== -->
        <div class="bg-white rounded-xl p-8 shadow-lg border-2 border-primary hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 relative">
          <!-- Popular Badge -->
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span class="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
              Most Popular
            </span>
          </div>
          <div class="text-center">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Business</h3>
            <div class="text-4xl font-bold text-gray-900 mb-4">
              {{ isYearly ? '₵45' : '₵60' }}
              <span class="text-lg font-normal text-gray-600">/month</span>
            </div>
            <p class="text-gray-600 mb-6">
              {{ isYearly ? 'Billed yearly (₵540/year)' : 'Perfect for growing businesses' }}
            </p>
            <!-- Features List -->
            <ul class="text-left space-y-3 mb-8">
              <li v-for="item in businessFeatures" :key="item" class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">{{ item }}</span>
              </li>
            </ul>
            <!-- WhatsApp CTA -->
            <a
              href="https://wa.me/233594093926?text=Hi! I'm interested in the Business plan for Sales Tracker"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-200 min-h-[48px]"
            >
              <font-awesome-icon icon="fa-brands fa-whatsapp" class="mr-2" />
              Subscribe Now
            </a>
          </div>
        </div>

        <!-- ===== Pro Card ===== -->
        <div class="bg-gray-50 rounded-xl p-8 shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
          <div class="text-center">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
            <div class="text-2xl font-bold text-gray-900 mb-4">
              Contact Sales
            </div>
            <p class="text-gray-600 mb-6">For enterprise businesses</p>
            <!-- Features List -->
            <ul class="text-left space-y-3 mb-8">
              <li v-for="item in proFeatures" :key="item" class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">{{ item }}</span>
              </li>
            </ul>
            <!-- WhatsApp CTA -->
            <a
              href="https://wa.me/233594093926?text=Hi! I'm interested in the Pro plan for Sales Tracker"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-200 min-h-[48px]"
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
// ===== File-Level Documentation =====
/**
 * PricingSection.vue
 * - Ghana-optimized, mobile-first pricing section with toggle and WhatsApp integration
 * - All features and plans are clearly listed for user clarity
 */

// ===== Imports =====
import { ref } from 'vue'

// ===== State: Pricing Toggle =====
/**
 * isYearly: true = yearly pricing, false = monthly pricing
 */
const isYearly = ref(false)

// ===== Constants: Features Lists =====
const freeFeatures = [
  '50 invoices',
  '50 customers',
  '50 products',
  '50 stock',
  '1 company',
  'Offline use only',
  'Local storage in browser',
  'Manual data backup',
  'No sign-in required'
]

const businessFeatures = [
  'Everything in Free',
  '500 invoices',
  '500 customers',
  '500 products',
  '500 stock',
  '5 companies',
  'Sign-in required',
  'Cloud data backup'
]

const proFeatures = [
  'Everything in Popular',
  'Unlimited invoices',
  'Unlimited customers',
  'Unlimited products',
  'Unlimited stock',
  'Unlimited everything',
  'Cloud storage',
  'Full support'
]
</script>