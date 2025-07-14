<!--
  HomeView.vue
  Stratonea/Sales Tracker - Modern landing page for Ghanaian SMEs
  - Mobile-first design optimized for Ghana's mobile users
  - Offline-first messaging and features highlighted
  - Card-based design matching DashboardView principles
  - WhatsApp integration for sales contact
  - Functional pricing toggle (Monthly/Yearly)
  - Multi-accordion FAQ section
  - Ghana-optimized: touch targets, clear messaging, mobile-first
  - Follows Stratonea guidelines with comprehensive documentation
-->

<template>
  <!-- ===== [New Feature] START: Complete Landing Page Layout ===== -->
  <div class="min-h-screen bg-gray-50">

    
    <HeroSection />

    <!-- ===== Why Choose Us Section ===== -->
    <section class="py-16 md:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Sales Tracker?
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Built specifically for Ghanaian SMEs with features that work in real-world conditions
          </p>
        </div>

        <!-- Features Grid - 4 columns on desktop, 1 column on mobile -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <!-- Feature 1: Works Offline -->
          <div
            class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <font-awesome-icon icon="wifi" class="text-green-600 text-xl" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Works Perfectly Offline</h3>
            <p class="text-gray-600 text-sm">
              No internet? No problem. Create invoices and track sales even when offline. Everything syncs when you're
              back online.
            </p>
          </div>

          <!-- Feature 2: No Sign-up -->
          <div
            class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <font-awesome-icon icon="user-plus" class="text-blue-600 text-xl" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">No Sign-up Required</h3>
            <p class="text-gray-600 text-sm">
              Start using immediately. No lengthy registration, no email verification, no waiting. Just open and start
              managing your business.
            </p>
          </div>

          <!-- Feature 3: Built for Ghana -->
          <div
            class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <font-awesome-icon icon="heart" class="text-orange-600 text-xl" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Built for Ghana</h3>
            <p class="text-gray-600 text-sm">
              Ghana Cedis currency, local tax rates, WhatsApp sharing, and designed for mobile-first usage that works on
              any device.
            </p>
          </div>

          <!-- Feature 4: Export Anytime -->
          <div
            class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <font-awesome-icon icon="download" class="text-purple-600 text-xl" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Export Anytime</h3>
            <p class="text-gray-600 text-sm">
              Download your invoices as PDF, share via WhatsApp, or export your data. Your business data is always
              accessible.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Key Features Section ===== -->
    <section class="py-16 md:py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Manage Sales
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple, powerful features designed for Ghanaian small businesses
          </p>
        </div>

        <!-- Features Grid - 3 columns on desktop, 1 column on mobile -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <!-- Feature 1: Invoice Creation -->
          <div
            class="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
            <div class="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <font-awesome-icon icon="file-invoice" class="text-blue-600 text-2xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Professional Invoices</h3>
            <p class="text-gray-600 mb-4">
              Create beautiful, professional invoices with your company logo. Auto-calculate taxes, add multiple items,
              and track payments.
            </p>
            <ul class="text-sm text-gray-500 space-y-1">
              <li>• Auto-incrementing invoice numbers</li>
              <li>• Ghana tax rates (VAT, NHIL)</li>
              <li>• Professional PDF generation</li>
            </ul>
          </div>

          <!-- Feature 2: Customer Management -->
          <div
            class="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
            <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <font-awesome-icon icon="users" class="text-green-600 text-2xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Customer Management</h3>
            <p class="text-gray-600 mb-4">
              Keep track of all your customers with their contact information, purchase history, and payment status.
            </p>
            <ul class="text-sm text-gray-500 space-y-1">
              <li>• Store customer contacts</li>
              <li>• Track purchase history</li>
              <li>• Quick customer selection</li>
            </ul>
          </div>

          <!-- Feature 3: WhatsApp Integration -->
          <div
            class="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
            <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <font-awesome-icon icon="fa-brands fa-whatsapp" class="text-green-600 text-2xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">WhatsApp Sharing</h3>
            <p class="text-gray-600 mb-4">
              Send invoices directly to customers via WhatsApp. Perfect for Ghana's mobile-first business environment.
            </p>
            <ul class="text-sm text-gray-500 space-y-1">
              <li>• One-click WhatsApp sharing</li>
              <li>• Formatted invoice details</li>
              <li>• Customer contact integration</li>
            </ul>
          </div>

          <!-- Feature 4: Offline Reports -->
          <div
            class="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
            <div class="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <font-awesome-icon icon="chart-bar" class="text-purple-600 text-2xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Sales Analytics</h3>
            <p class="text-gray-600 mb-4">
              Track your business performance with detailed sales reports and analytics, all working offline.
            </p>
            <ul class="text-sm text-gray-500 space-y-1">
              <li>• Daily, weekly, monthly reports</li>
              <li>• Revenue tracking</li>
              <li>• Customer insights</li>
            </ul>
          </div>

          <!-- Feature 5: Data Security -->
          <div
            class="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
            <div class="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6">
              <font-awesome-icon icon="shield-halved" class="text-red-600 text-2xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Your Data is Safe</h3>
            <p class="text-gray-600 mb-4">
              All your business data is stored securely on your device. No cloud uploads without your permission.
            </p>
            <ul class="text-sm text-gray-500 space-y-1">
              <li>• Local data storage</li>
              <li>• No unwanted cloud sync</li>
              <li>• Export control</li>
            </ul>
          </div>

          <!-- Feature 6: Mobile Optimized -->
          <div
            class="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
            <div class="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <font-awesome-icon icon="mobile-screen-button" class="text-indigo-600 text-2xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Mobile-First Design</h3>
            <p class="text-gray-600 mb-4">
              Designed specifically for mobile devices with large touch targets and intuitive navigation.
            </p>
            <ul class="text-sm text-gray-500 space-y-1">
              <li>• Touch-optimized interface</li>
              <li>• Works on any screen size</li>
              <li>• Fast loading on slow networks</li>
            </ul>
          </div>
        </div>
      </div>
    </section>


    <!-- <PricingSection /> -->


    <!-- ===== FAQ Section ===== -->
    <section class="py-16 md:py-20 bg-gray-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p class="text-xl text-gray-600">
            Everything you need to know about Sales Tracker
          </p>
        </div>

        <!-- ===== [New Feature] START: Multi-Accordion FAQ ===== -->
        <!-- FAQ Accordion -->
        <div class="space-y-4">

          <!-- FAQ Item 1 -->
          <div class="bg-white rounded-xl shadow-lg border border-gray-100">
            <button @click="toggleFAQ(0)"
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors duration-200 min-h-[64px]"
              :aria-expanded="faqOpen[0]">
              <span class="text-lg font-medium text-gray-900">
                Do I really need internet to use Sales Tracker?
              </span>
              <font-awesome-icon :icon="faqOpen[0] ? 'chevron-up' : 'chevron-down'"
                class="text-primary text-lg transition-transform duration-200" />
            </button>
            <div v-show="faqOpen[0]" class="px-6 pb-4">
              <p class="text-gray-600 leading-relaxed">
                No! Sales Tracker works completely offline. You can create invoices, manage customers, and track sales
                without any internet connection. Your data will sync automatically when you're back online, but it's not
                required for daily use.
              </p>
            </div>
          </div>

          <!-- FAQ Item 2 -->
          <div class="bg-white rounded-xl shadow-lg border border-gray-100">
            <button @click="toggleFAQ(1)"
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors duration-200 min-h-[64px]"
              :aria-expanded="faqOpen[1]">
              <span class="text-lg font-medium text-gray-900">
                Is my business data safe and private?
              </span>
              <font-awesome-icon :icon="faqOpen[1] ? 'chevron-up' : 'chevron-down'"
                class="text-primary text-lg transition-transform duration-200" />
            </button>
            <div v-show="faqOpen[1]" class="px-6 pb-4">
              <p class="text-gray-600 leading-relaxed">
                Absolutely! Your data is stored locally on your device and only synced when you choose to. We don't
                automatically upload your business information to any cloud service. You have complete control over your
                data.
              </p>
            </div>
          </div>

          <!-- FAQ Item 3 -->
          <div class="bg-white rounded-xl shadow-lg border border-gray-100">
            <button @click="toggleFAQ(2)"
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors duration-200 min-h-[64px]"
              :aria-expanded="faqOpen[2]">
              <span class="text-lg font-medium text-gray-900">
                Can I use this on my mobile phone?
              </span>
              <font-awesome-icon :icon="faqOpen[2] ? 'chevron-up' : 'chevron-down'"
                class="text-primary text-lg transition-transform duration-200" />
            </button>
            <div v-show="faqOpen[2]" class="px-6 pb-4">
              <p class="text-gray-600 leading-relaxed">
                Yes! Sales Tracker is designed mobile-first for Ghanaian businesses. It works great on any Android or
                iPhone, with large touch targets and a simple interface that's easy to use on small screens.
              </p>
            </div>
          </div>

          <!-- FAQ Item 4 -->
          <div class="bg-white rounded-xl shadow-lg border border-gray-100">
            <button @click="toggleFAQ(3)"
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors duration-200 min-h-[64px]"
              :aria-expanded="faqOpen[3]">
              <span class="text-lg font-medium text-gray-900">
                How do I share invoices with my customers?
              </span>
              <font-awesome-icon :icon="faqOpen[3] ? 'chevron-up' : 'chevron-down'"
                class="text-primary text-lg transition-transform duration-200" />
            </button>
            <div v-show="faqOpen[3]" class="px-6 pb-4">
              <p class="text-gray-600 leading-relaxed">
                You can share invoices directly via WhatsApp with one click, download them as PDF files, or print them.
                The WhatsApp integration makes it super easy to send professional invoices to your customers instantly.
              </p>
            </div>
          </div>

          <!-- FAQ Item 5 -->
          <div class="bg-white rounded-xl shadow-lg border border-gray-100">
            <button @click="toggleFAQ(4)"
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors duration-200 min-h-[64px]"
              :aria-expanded="faqOpen[4]">
              <span class="text-lg font-medium text-gray-900">
                What happens if I lose my phone?
              </span>
              <font-awesome-icon :icon="faqOpen[4] ? 'chevron-up' : 'chevron-down'"
                class="text-primary text-lg transition-transform duration-200" />
            </button>
            <div v-show="faqOpen[4]" class="px-6 pb-4">
              <p class="text-gray-600 leading-relaxed">
                With the free plan, your data is stored locally on your device. For Pro users, we offer automatic backup
                and sync features so you can recover your data on a new device. We recommend regular exports as backup.
              </p>
            </div>
          </div>

          <!-- FAQ Item 6 -->
          <!-- <div class="bg-white rounded-xl shadow-lg border border-gray-100">
            <button @click="toggleFAQ(5)"
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors duration-200 min-h-[64px]"
              :aria-expanded="faqOpen[5]">
              <span class="text-lg font-medium text-gray-900">
                How do I upgrade to Pro?
              </span>
              <font-awesome-icon :icon="faqOpen[5] ? 'chevron-up' : 'chevron-down'"
                class="text-primary text-lg transition-transform duration-200" />
            </button>
            <div v-show="faqOpen[5]" class="px-6 pb-4">
              <p class="text-gray-600 leading-relaxed">
                Simply click the "Talk to Sales" button above or WhatsApp us at +233 59 409 3926. We'll help you upgrade
                and get access to all Pro features. Payment can be made via Mobile Money or bank transfer.
              </p>
            </div>
          </div> -->
        </div>
        <!-- ===== [New Feature] END ===== -->
      </div>
    </section>

  
<Footer />
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * HomeView.vue - Modern landing page for Sales Tracker
 * - Comprehensive homepage with all sections from design document
 * - Mobile-first design optimized for Ghanaian SMEs
 * - Functional pricing toggle with real price calculations
 * - Multi-accordion FAQ section with smooth animations
 * - WhatsApp integration for sales contact (+233594093926)
 * - Card-based design matching DashboardView principles
 * - Ghana-specific features highlighted throughout
 * - Follows Stratonea guidelines with comprehensive documentation
 */

// ===== Imports =====
import { ref } from 'vue'
// import PricingSection from '@/components/base/PricingSection.vue'

import Footer from '@/components/common/Footer.vue'
import HeroSection from '@/components/base/HeroSection.vue'

// ===== State Management =====


/**
 * FAQ accordion state - tracks which FAQ items are open
 * Using array to allow multiple accordions to be open simultaneously
 */
const faqOpen = ref([false, false, false, false, false, false])

// ===== [New Feature] START: Pricing Toggle Logic =====

// ===== [New Feature] END =====

// ===== [New Feature] START: FAQ Accordion Logic =====
/**
 * Toggle FAQ accordion items
 * Allows multiple FAQ items to be open at the same time
 * @param index - Index of the FAQ item to toggle
 */
function toggleFAQ(index: number) {
  faqOpen.value[index] = !faqOpen.value[index]
}
// ===== [New Feature] END =====
</script>

<style scoped>
/* ===== [New Feature] START: Custom Animations and Transitions ===== */
/* Smooth transitions for all interactive elements */
button,
a {
  transition: all 0.2s ease-in-out;
}

/* Touch feedback for mobile users */
button:active,
a:active {
  transform: scale(0.98);
}

/* Enhanced hover effects for cards */
.hover\:-translate-y-1:hover {
  transform: translateY(-4px);
}

/* Gradient text effect */
.text-gradient {
  background: linear-gradient(135deg, #1F3A8A 0%, #3B81F6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Hero section background gradient */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, #1F3A8A 0%, #1E40AF 50%, #1D4ED8 100%);
}

/* Floating animation for hero elements */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.float-animation {
  animation: float 3s ease-in-out infinite;
}

/* Enhanced focus states for accessibility */
button:focus-visible,
a:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}

/* Mobile-optimized touch targets */
@media (max-width: 768px) {
  .min-h-\[64px\] {
    min-height: 64px;
  }
  
  .min-h-\[56px\] {
    min-height: 56px;
  }
  
  .min-h-\[48px\] {
    min-height: 48px;
  }
}

/* Pricing toggle switch animation */
.translate-x-1 {
  transform: translateX(4px);
}

.translate-x-9 {
  transform: translateX(36px);
}

/* FAQ accordion smooth expand/collapse */
.accordion-content {
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
}
/* ===== [New Feature] END ===== */
</style>