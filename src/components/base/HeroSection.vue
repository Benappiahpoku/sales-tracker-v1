<template>
    <!-- ===== Hero Section ===== -->
    <section class="bg-gradient-to-br from-primary to-primary-dark text-white py-16 md:py-24 rounded-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <!-- Left: Hero Content -->
                <div class="text-center lg:text-left">
                    <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                        Your Free Sales
                        <span class="text-blue-200">Tracker</span>
                    </h1>
                    <p class="text-md md:text-md text-blue-100 mb-8 leading-relaxed">
                        ✓ Free Forever • ✓ No Sign-up Required • ✓ Works Offline
                    </p>

                    <!-- CTA Button -->
                    <router-link to="/dashboard"
                        class="inline-flex items-center px-8 py-4 bg-white text-primary font-bold text-lg rounded-xl hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition-all duration-200 min-h-[56px] shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        <font-awesome-icon icon="chart-line" class="mr-3 text-xl" />
                        Manage My Biz
                    </router-link>

                    <!-- Free indicator -->
                    <!-- <p class="mt-4 text-blue-200 text-sm">
              ✓ Free Forever • ✓ No Sign-up Required • ✓ Works Offline
            </p> -->
                </div>

                <!-- Right: Hero Image/Screenshot -->
                <div class="flex justify-center lg:justify-end">
                    <div class="relative">
                        <!-- ===== [Updated] START: Real Hero Image ===== -->
                        <!-- Hero Image - Sales Tracker Dashboard Screenshot -->
                        <img src="/heropic.png"
                            alt="Sales Tracker Dashboard - Mobile app showing sales overview with revenue, customers, and quick actions"
                            class="w-80 h-96 object-cover rounded-2xl shadow-2xl border-2 border-white border-opacity-20"
                            loading="lazy" />
                        <!-- ===== [Updated] END ===== -->

                        <!-- Floating elements -->
                        <div
                            class="absolute -top-4 -right-4 w-16 h-16 bg-blue-200 bg-opacity-20 rounded-full flex items-center justify-center">
                            <font-awesome-icon icon="wifi" class="text-white text-xl" />
                        </div>
                        <div
                            class="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-200 bg-opacity-20 rounded-full flex items-center justify-center">
                            <font-awesome-icon icon="chart-bar" class="text-white text-xl" />
                        </div>
                    </div>
                </div>

                <!-- Floating elements -->
                <div
                    class="absolute -top-4 -right-4 w-16 h-16 bg-blue-200 bg-opacity-20 rounded-full flex items-center justify-center">
                    <font-awesome-icon icon="wifi" class="text-white text-xl" />
                </div>
                <div
                    class="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-200 bg-opacity-20 rounded-full flex items-center justify-center">
                    <font-awesome-icon icon="chart-bar" class="text-white text-xl" />
                </div>
            </div>
        </div>


    </section>
</template>

<script setup lang="ts">
</script>