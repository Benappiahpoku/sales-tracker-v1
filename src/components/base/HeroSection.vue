<!--
  HeroSection.vue
  Stratonea/Sales Tracker - Homepage hero section
  - Mobile-first, touch-friendly, Ghana-optimized
  - Clean, centered, screenshot-inspired layout
  - Blue background, white text, clear CTA, and visual branding
-->

<template>
  <!-- ===== Hero Section ===== -->
  <section class="bg-primary text-white min-h-[70vh] flex items-center justify-center px-4 py-12 md:py-20"
    aria-label="Sales Tracker Hero">
    <div class="w-full max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-16">
      <!-- ===== Left: Hero Content ===== -->
      <div class="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
        <!-- ===== [New Feature] START ===== -->
        <!-- Headline: Matches attached image -->
        <h1 class="text-3xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in">
          Your Free Sales<br />
          <span class="text-blue-200">Tracker</span>
        </h1>
        <!-- Subtext: Matches attached image -->
        <p
          class="text-sm md:text-md text-blue-100 mb-6 flex flex-wrap items-center justify-center md:justify-start gap-x-2">
          <span>✓ Free Forever</span>
          <span class="mx-1"></span>
          <span>✓ No Sign-up Required</span>
          <span class="mx-1"></span>
          <span>✓ Works Offline</span>
        </p>
        <!-- CTA Button: Matches attached image -->
        <router-link to="/dashboard"
          class="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold text-lg rounded-2xl shadow-lg hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-40 transition-all duration-200 min-h-[56px]">
          <!-- Simple chart icon (optional, matches screenshot style) -->
          <svg class="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
            aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M8 12l2 2 4-4m6 4V6a2 2 0 00-2-2H6a2 2 0 00-2 2v10" />
          </svg>
          Manage My Biz
        </router-link>
        <!-- ===== [New Feature] END ===== -->
      </div>

      <!-- ===== Right: Hero Image/Screenshot ===== -->
      <div class="flex-1 flex animate-float  items-center justify-center px-10 md:px-0">
        <!--
          Use the provided screenshot image.
          - Responsive width/height
          - Rounded corners, subtle shadow
        -->
        <img src="/salestracker-teklumin.webp" alt="Sales Tracker Invoice Screenshot"
          class="w-[60%] md:w-[55%] max-w-md mx-auto rounded-lg " loading="lazy" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No logic needed for this static hero section.
// All styling and layout handled via Tailwind CSS utility classes.
</script>

<style  scoped>

@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0px);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-float {
  animation: float 1.8s ease-in-out infinite;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

</style>