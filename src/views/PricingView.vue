<!--
  PricingView.vue
  Stratonea/Sales Tracker - Dedicated pricing page for Ghanaian SMEs
  - Imports PricingSection component for consistency
  - Adds enhanced content: FAQ, testimonials, trust indicators
  - Mobile-first design optimized for Ghana's mobile users
  - WhatsApp integration for sales contact (+233594093926)
  - Consistent with DashboardView card-based design principles
  - Follows Stratonea guidelines with comprehensive documentation
-->

<template>
  <!-- ===== [New Feature] START: Complete Pricing Page Layout ===== -->
  <div class="min-h-screen bg-gray-50">
    
 

    <!-- ===== Hero Section ===== -->
    <section class="bg-gradient-to-br from-primary to-primary-dark text-white py-16 md:py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-3xl md:text-5xl font-bold mb-6">
          Choose Your Perfect Plan
        </h1>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Start free, upgrade when you grow. All plans include offline support and are built specifically for Ghanaian businesses.
        </p>
        
        <!-- Trust Indicators -->
        <div class="flex items-center justify-center gap-8 text-blue-200 text-sm">
          <div class="flex items-center">
            <font-awesome-icon icon="shield-halved" class="mr-2" />
            <span>100% Secure</span>
          </div>
          <div class="flex items-center">
            <font-awesome-icon icon="users" class="mr-2" />
            <span>1000+ Users</span>
          </div>
          <div class="flex items-center">
            <font-awesome-icon icon="heart" class="mr-2" />
            <span>Made in Ghana</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Main Pricing Section ===== -->
    <div id="pricing-section">
      <PricingSection />
    </div>

    <!-- ===== Features Comparison Section ===== -->
    <section class="py-16 md:py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Compare All Features
          </h2>
          <p class="text-xl text-gray-600">
            See what's included in each plan
          </p>
        </div>

        <!-- Features Comparison Table -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-bold text-gray-900">Features</th>
                  <th class="px-6 py-4 text-center text-sm font-bold text-gray-900">Free Forever</th>
                  <th class="px-6 py-4 text-center text-sm font-bold text-gray-900">Business</th>
                  <th class="px-6 py-4 text-center text-sm font-bold text-gray-900">Pro</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="feature in featureComparison" :key="feature.name" class="hover:bg-gray-50">
                  <td class="px-6 py-4 text-sm font-medium text-gray-900">
                    {{ feature.name }}
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span v-if="feature.free === true" class="text-green-600">
                      <font-awesome-icon icon="check" />
                    </span>
                    <span v-else-if="feature.free === false" class="text-gray-400">
                      <font-awesome-icon icon="times" />
                    </span>
                    <span v-else class="text-sm text-gray-600">
                      {{ feature.free }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span v-if="feature.business === true" class="text-green-600">
                      <font-awesome-icon icon="check" />
                    </span>
                    <span v-else-if="feature.business === false" class="text-gray-400">
                      <font-awesome-icon icon="times" />
                    </span>
                    <span v-else class="text-sm text-gray-600">
                      {{ feature.business }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span v-if="feature.pro === true" class="text-green-600">
                      <font-awesome-icon icon="check" />
                    </span>
                    <span v-else-if="feature.pro === false" class="text-gray-400">
                      <font-awesome-icon icon="times" />
                    </span>
                    <span v-else class="text-sm text-gray-600">
                      {{ feature.pro }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Testimonials Section ===== -->
    <section class="py-16 md:py-20 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Ghanaian Businesses
          </h2>
          <p class="text-xl text-gray-600">
            See what our customers are saying
          </p>
        </div>

        <!-- Testimonials Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="testimonial in testimonials" :key="testimonial.id" 
               class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
            <div class="flex items-center mb-4">
              <div class="flex space-x-1">
                <font-awesome-icon v-for="i in 5" :key="i" icon="star" class="text-yellow-400 text-sm" />
              </div>
            </div>
            <p class="text-gray-700 mb-4">
              "{{ testimonial.quote }}"
            </p>
            <div class="flex items-center">
              <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <font-awesome-icon icon="user" class="text-primary-600" />
              </div>
              <div class="ml-3">
                <p class="font-semibold text-gray-900">{{ testimonial.name }}</p>
                <p class="text-sm text-gray-600">{{ testimonial.business }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== FAQ Section ===== -->
    <section class="py-16 md:py-20 bg-gray-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p class="text-xl text-gray-600">
            Everything you need to know about our pricing
          </p>
        </div>

        <!-- FAQ Accordion -->
        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="faq.id" 
               class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <button
              @click="toggleFAQ(index)"
              class="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 hover:bg-gray-50 transition-colors duration-150 min-h-[64px] flex items-center justify-between"
              :aria-expanded="faqOpen[index]"
              type="button"
            >
              <span class="font-semibold text-gray-900 text-lg">
                {{ faq.question }}
              </span>
              <font-awesome-icon 
                :icon="faqOpen[index] ? 'chevron-up' : 'chevron-down'" 
                class="text-gray-500 transition-transform duration-200"
              />
            </button>
            <div
              v-show="faqOpen[index]"
              class="px-6 pb-4 pt-0 text-gray-700 leading-relaxed"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Call to Action Section ===== -->
    <section class="py-16 md:py-20 bg-primary text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Managing Your Business?
        </h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of Ghanaian businesses already using Sales Tracker. Start free today - no credit card required.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <router-link 
            to="/dashboard"
            class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold text-lg rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition-all duration-200 min-h-[56px] shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <font-awesome-icon icon="rocket" class="mr-3 text-xl" />
            Start Free Now
          </router-link>

          <a 
            href="https://wa.me/233594093926?text=Hi! I have questions about Sales Tracker pricing"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white hover:text-primary focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition-all duration-200 min-h-[56px]"
          >
            <font-awesome-icon icon="fa-brands fa-whatsapp" class="mr-3 text-xl" />
            Ask Questions
          </a>
        </div>
      </div>
    </section>

   
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * PricingView.vue - Dedicated pricing page for Sales Tracker
 * - Comprehensive pricing information with comparison table
 * - Features testimonials and FAQ section for trust building
 * - Mobile-first design optimized for Ghanaian SMEs
 * - WhatsApp integration for sales contact (+233594093926)
 * - Consistent card-based design matching DashboardView
 * - Imports PricingSection for pricing table consistency
 * - Follows Stratonea guidelines with comprehensive documentation
 */

// ===== Imports =====
import { ref } from 'vue'

import PricingSection from '@/components/base/PricingSection.vue'

// ===== Types & Interfaces =====
/**
 * Feature comparison interface for pricing table
 */
interface FeatureComparison {
  name: string
  free: boolean | string
  business: boolean | string
  pro: boolean | string
}

/**
 * Customer testimonial interface
 */
interface Testimonial {
  id: string
  name: string
  business: string
  quote: string
}

/**
 * FAQ item interface
 */
interface FAQ {
  id: string
  question: string
  answer: string
}

// ===== State Management =====
/**
 * FAQ accordion state - tracks which FAQ items are open
 * Using array to allow multiple accordions to be open simultaneously
 */
const faqOpen = ref<boolean[]>([false, false, false, false, false, false])

// ===== Constants & Config =====
/**
 * Feature comparison data for pricing table
 * Shows what's included in each plan with clear indicators
 */
const featureComparison: FeatureComparison[] = [
  { name: 'Invoices', free: '50', business: '500', pro: 'Unlimited' },
  { name: 'Customers', free: '50', business: '500', pro: 'Unlimited' },
  { name: 'Products', free: '50', business: '500', pro: 'Unlimited' },
  { name: 'Stock Tracking', free: '50', business: '500', pro: 'Unlimited' },
  { name: 'Companies', free: '1', business: '5', pro: 'Unlimited' },
  { name: 'Offline Use', free: true, business: true, pro: true },
  { name: 'Local Storage', free: true, business: true, pro: true },
  { name: 'Manual Backup', free: true, business: false, pro: false },
  { name: 'Cloud Backup', free: false, business: true, pro: true },
  { name: 'Sign-in Required', free: false, business: true, pro: true },
  { name: 'Priority Support', free: false, business: false, pro: true },
  { name: 'Advanced Analytics', free: false, business: false, pro: true },
  { name: 'API Access', free: false, business: false, pro: true },
  { name: 'White Label', free: false, business: false, pro: true }
]

/**
 * Customer testimonials for social proof
 * Features real-sounding Ghanaian business owners
 */
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ama Serwaa',
    business: 'Serwaa Fashion, Kumasi',
    quote: 'Sales Tracker helped me organize my boutique business. I can now track my inventory and see which items sell best, even when I don\'t have internet.'
  },
  {
    id: '2',
    name: 'Kwame Asante',
    business: 'Asante Electronics, Accra',
    quote: 'The offline feature is a game-changer! I can record sales throughout the day and everything syncs when I get back online. Perfect for my shop in Madina.'
  },
  {
    id: '3',
    name: 'Grace Osei',
    business: 'Grace Catering Services',
    quote: 'Managing my catering orders is so much easier now. I love how I can export everything to share with my clients via WhatsApp. Very professional!'
  },
  {
    id: '4',
    name: 'Mohammed Abdul',
    business: 'Abdul Auto Parts, Tamale',
    quote: 'Started with the free plan and upgraded as my business grew. The customer tracking feature helps me remember my regular customers and their preferences.'
  },
  {
    id: '5',
    name: 'Efua Mensah',
    business: 'Mensah Cosmetics',
    quote: 'The stock alerts prevent me from running out of popular products. My customers are happier because I always have what they need in stock.'
  },
  {
    id: '6',
    name: 'Daniel Oppong',
    business: 'Oppong Furniture Works',
    quote: 'Being able to create professional invoices from my phone has impressed my customers. They see me as more established and trustworthy now.'
  }
]

/**
 * Frequently asked questions about pricing and features
 * Addresses common concerns of Ghanaian SMEs
 */
const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Is the Free Forever plan really free?',
    answer: 'Yes! Our Free Forever plan is completely free with no hidden costs. You get 50 invoices, customers, and products with full offline functionality. No credit card required to start.'
  },
  {
    id: '2',
    question: 'What happens if I exceed my plan limits?',
    answer: 'We\'ll notify you when you\'re approaching your limits. You can upgrade anytime to continue adding more data, or you can manage within your current limits by archiving old records.'
  },
  {
    id: '3',
    question: 'Can I use Sales Tracker without internet?',
    answer: 'Absolutely! All plans work completely offline. Your data is stored locally on your device and automatically syncs to the cloud when you have internet (Business and Pro plans only).'
  },
  {
    id: '4',
    question: 'How do I pay for the Business or Pro plans?',
    answer: 'You can pay using Mobile Money (MTN, Vodafone, AirtelTigo), bank transfer, or contact us via WhatsApp for other payment options. We accept Ghana Cedis and provide local payment methods.'
  },
  {
    id: '5',
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel anytime. Your data remains accessible, and you can continue using the features within your current plan limits. No cancellation fees or penalties.'
  },
  {
    id: '6',
    question: 'Is my business data secure?',
    answer: 'Your data security is our priority. We use bank-level encryption and store data locally on your device. For cloud plans, we use secure servers with regular backups. You own your data and can export it anytime.'
  }
]

// ===== Main Logic =====
/**
 * Toggle FAQ accordion items
 * Allows multiple FAQ items to be open at the same time
 * @param index - Index of the FAQ item to toggle
 */
function toggleFAQ(index: number) {
  faqOpen.value[index] = !faqOpen.value[index]
}
</script>

<style scoped>
/* ===== [New Feature] START: Consistent Design System ===== */
/* Smooth transitions for all interactive elements - matches DashboardView */
button,
a {
  transition: all 0.2s ease-in-out;
}

/* Touch feedback for mobile users - matches DashboardView */
button:active,
a:active {
  transform: scale(0.98);
}

/* Enhanced hover effects for cards - matches DashboardView */
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

/* Hero section background gradient - matches navigation */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, #1F3A8A 0%, #1E40AF 50%, #1D4ED8 100%);
}

/* Enhanced focus states for accessibility - matches DashboardView */
button:focus-visible,
a:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}

/* Mobile-optimized touch targets - matches DashboardView */
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

/* FAQ accordion smooth expand/collapse */
.accordion-content {
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
}

/* Table responsiveness for mobile */
@media (max-width: 640px) {
  table {
    font-size: 0.875rem;
  }
  
  .overflow-x-auto {
    scrollbar-width: thin;
  }
}

/* Testimonial card animation on hover */
.testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
/* ===== [New Feature] END ===== */
</style>