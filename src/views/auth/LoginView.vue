<!--
  LoginView.vue
  Stratonea/Sales Tracker - Mobile-first login screen for authentication.
  - Ghana-optimized: simple, clear, offline-friendly
  - Uses Tailwind utility classes for styling
  - Follows Stratonea guidelines (see copilot-instructions.md)
  - Uses mock/static logic for now (replace with real auth later)
-->

<template>
  <!-- ===== [New Feature] START ===== -->
  <div class="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
    <!-- App Header (reuse component if possible) -->
    <header class="w-full max-w-md mb-8">
      <div class="flex items-center justify-between px-4 py-3 bg-primary text-white shadow-md rounded-lg">
        <StratoneaLogo class="h-10 w-auto" white />
        <span class="text-lg font-bold tracking-wide">Sales Tracker</span>
      </div>
    </header>

    <!-- Login Form -->
    <form class="bg-white rounded-lg shadow-md p-6 w-full max-w-md flex flex-col gap-4" @submit.prevent="onLogin"
      aria-label="Login Form" autocomplete="off">
      <h2 class="text-xl font-bold text-primary mb-2 text-center">Sign In</h2>
      <!-- Email -->
      <div>
        <label for="login-email" class="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input id="login-email" type="email" v-model="form.email" required
          class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px]"
          placeholder="Enter your email" autocomplete="off" aria-label="Email" />
      </div>
      <!-- Password -->
      <div>
        <label for="login-password" class="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input id="login-password" type="password" v-model="form.password" required
          class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm min-h-[48px]"
          placeholder="Enter your password" autocomplete="off" aria-label="Password" />
      </div>
      <!-- Error Message -->
      <p v-if="error" class="text-xs text-red-600 mt-1">{{ error }}</p>
      <!-- Login Button -->
      <button type="submit"
        class="w-full bg-primary text-white font-bold py-3 rounded-lg shadow min-h-[48px] hover:bg-primary-dark transition-colors"
        aria-label="Sign In">
        Sign In
      </button>
      <!-- Offline/Recovery Message -->
      <p class="text-xs text-gray-500 text-center mt-2">
        If you are offline, you can still view cached data after login.
      </p>
    </form>
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
// ===== Types & Interfaces =====
/**
 * Local form state for login.
 */
interface LoginForm {
  email: string
  password: string
}

// ===== Main Logic =====
const form = reactive<LoginForm>({
  email: '',
  password: ''
})

const error = ref('')

/**
 * Handles login form submission.
 * Emits a mock login event for now.
 */
function onLogin() {
  // Simple validation for demonstration
  if (!form.email || !form.password) {
    error.value = 'Please enter both email and password.'
    return
  }
  // Simulate login success (replace with real auth later)
  error.value = ''
  // You can emit an event or navigate here
  // emit('login', { ...form })
  alert('Login successful (mock)')
}
</script>

<!--
  ===== Styling Notes =====
  - All inputs and buttons are touch-optimized (min-h-[48px]).
  - Uses Tailwind for color, spacing, and responsive design.
  - Accessible: aria-labels, clear feedback.
  - Offline message for Ghanaian context.
-->