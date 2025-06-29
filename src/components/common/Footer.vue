
<template> 

    <!-- ===== Call to Action Section ===== -->
    <section class="py-16 md:py-20 bg-primary text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Ready to Transform Your Business?
        </h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of Ghanaian businesses already using Sales Tracker to manage their sales professionally and
          efficiently.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <router-link to="/dashboard"
            class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold text-lg rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition-all duration-200 min-h-[56px] shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            <font-awesome-icon icon="rocket" class="mr-3 text-xl" />
            Start Free Now
          </router-link>

          <a href="https://wa.me/233594093926?text=Hi! I have questions about Sales Tracker" target="_blank"
            rel="noopener noreferrer"
            class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white hover:text-primary focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition-all duration-200 min-h-[56px]">
            <font-awesome-icon icon="fa-brands fa-whatsapp" class="mr-3 text-xl" />
            Ask Questions
          </a>
        </div>

        <!-- Trust indicators -->
        <div class="mt-8 flex items-center justify-center gap-8 text-blue-200 text-sm">
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
</template>

<script setup lang="ts">

</script>