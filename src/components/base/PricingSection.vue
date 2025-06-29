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
        
        <!-- ===== [Updated Feature] START: Fixed Pricing Toggle ===== -->
        <!-- Pricing Toggle with fixed functionality -->
        <div class="flex items-center justify-center mb-8">
          <span :class="['text-lg font-medium mr-4', !isYearly ? 'text-primary' : 'text-gray-500']">
            Monthly
          </span>
          
          <!-- Fixed Toggle Switch Design -->
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
                'flex items-center cursor-pointer relative w-20 h-10 rounded-full p-1 transition-colors duration-300 ease-in-out',
                isYearly ? 'bg-primary' : 'bg-gray-300'
              ]"
            >
              <!-- Toggle Slider -->
              <div
                :class="[
                  'bg-white w-8 h-8 rounded-full shadow-lg transform transition-transform duration-300 ease-in-out flex items-center justify-center',
                  isYearly ? 'translate-x-10' : 'translate-x-0'
                ]"
              >
                <!-- Optional: Add icons inside the toggle -->
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
        <!-- ===== [Updated Feature] END ===== -->
      </div>

      <!-- ===== [Updated Feature] START: 3-Card Layout ===== -->
      <!-- Pricing Cards - Stacked on mobile, 3 columns on desktop -->
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
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">50 invoices</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">50 customers</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">50 products</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">50 stock</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">1 company</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">Offline use only</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">Local storage in browser</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">Manual data backup</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">No sign-in required</span>
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
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">Everything in Free</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">500 invoices</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">500 customers</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">500 products</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">500 stock</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">5 companies</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">Sign-in required</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">Cloud data backup</span>
              </li>
            </ul>

            <!-- CTA Button -->
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
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">Everything in Popular</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">Unlimited invoices</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">Unlimited customers</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">Unlimited products</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">Unlimited stock</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">Unlimited everything</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">Cloud storage</span>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="check" class="text-green-600 mr-3 flex-shrink-0" />
                <span class="text-gray-700">Full support</span>
              </li>
            </ul>

            <!-- CTA Button -->
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
      <!-- ===== [Updated Feature] END ===== -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// ===== Types & Interfaces =====
/**
 * Pricing toggle state - switches between monthly and yearly pricing
 * When true, shows yearly pricing with discount
 * When false, shows monthly pricing
 */
const isYearly = ref(false)

// ===== Main Logic =====
// Note: We removed the togglePricing function since v-model handles the state automatically
// The reactive `isYearly` ref will update automatically when the checkbox is clicked
</script>