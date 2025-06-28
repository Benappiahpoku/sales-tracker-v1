<!--
  LoginView.vue
  Stratonea/Sales Tracker - Modern mobile-first login screen for authentication
  - Follows DashboardView.vue and UserProfileView.vue design principles
  - Ghana-optimized: mobile-first, offline-friendly, simple and clear
  - Uses modern card layouts with hover effects and animations
  - Touch-optimized buttons and accessibility features
  - Follows Stratonea guidelines with comprehensive documentation
-->

<template>
  <!-- ===== [New Feature] START: Modern Login Design ===== -->
  <div class="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 py-6">
    <!-- ===== App Header with Logo ===== -->
    <div class="w-full max-w-md mb-8">
      <div class="text-center">
        <!-- Stratonea Logo Placeholder -->
        <div class="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <font-awesome-icon icon="chart-line" class="text-white text-2xl" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Sales Tracker</h1>
        <p class="text-gray-600">Sign in to manage your business</p>
      </div>
    </div>

    <!-- ===== Login Card ===== -->
    <div class="w-full max-w-md">
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
        <!-- Login Header -->
        <div class="mb-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-2">Welcome Back</h2>
          <p class="text-sm text-gray-600">Enter your details to access your account</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="onLogin" class="space-y-5">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <font-awesome-icon icon="envelope" class="text-gray-400 w-4 h-4" />
              </div>
              <input
                id="email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 text-sm"
                placeholder="Enter your email"
                :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': error && !form.email }"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <font-awesome-icon icon="lock" class="text-gray-400 w-4 h-4" />
              </div>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                class="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 text-sm"
                placeholder="Enter your password"
                :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': error && !form.password }"
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
              >
                <font-awesome-icon 
                  :icon="showPassword ? 'eye-slash' : 'eye'" 
                  class="text-gray-400 hover:text-gray-600 w-4 h-4 transition-colors duration-200" 
                />
              </button>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start">
            <font-awesome-icon icon="exclamation-triangle" class="text-red-500 mr-2 w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <p class="text-sm font-medium text-red-800">Login Failed</p>
              <p class="text-xs text-red-600 mt-1">{{ error }}</p>
            </div>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="rememberMe"
                type="checkbox"
                class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded transition-colors duration-200"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <button
              type="button"
              @click="onForgotPassword"
              class="text-sm text-primary hover:text-primary-hover font-medium transition-colors duration-200"
            >
              Forgot password?
            </button>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="isLoading || !form.email || !form.password"
            class="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 min-h-[48px] active:scale-98"
            :aria-label="isLoading ? 'Signing in...' : 'Sign in to your account'"
          >
            <font-awesome-icon 
              v-if="isLoading" 
              icon="spinner" 
              class="animate-spin mr-2" 
            />
            <font-awesome-icon 
              v-else 
              icon="sign-in-alt" 
              class="mr-2" 
            />
            {{ isLoading ? 'Signing In...' : 'Sign In' }}
          </button>
        </form>

        <!-- Divider -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Need help?</span>
            </div>
          </div>
        </div>

        <!-- Support Section -->
        <div class="mt-6">
          <button
            @click="onWhatsAppSupport"
            class="w-full inline-flex items-center justify-center px-4 py-3 border border-green-300 text-sm font-medium rounded-lg text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 min-h-[48px] active:scale-98"
            aria-label="Contact support via WhatsApp"
          >
            <font-awesome-icon :icon="['fab', 'whatsapp']" class="mr-2" />
            Get Help via WhatsApp
          </button>
        </div>
      </div>

      <!-- ===== Demo Credentials Card ===== -->
      <div class="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div class="flex items-start">
          <font-awesome-icon icon="info-circle" class="text-blue-500 mr-3 w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <h3 class="text-sm font-medium text-blue-800 mb-2">Demo Access</h3>
            <p class="text-xs text-blue-600 mb-3">Use these credentials to explore the app:</p>
            <div class="space-y-2">
              <div class="bg-white rounded-md p-2">
                <p class="text-xs text-gray-600">Email: <span class="font-mono text-gray-900">demo@salestracker.com</span></p>
              </div>
              <div class="bg-white rounded-md p-2">
                <p class="text-xs text-gray-600">Password: <span class="font-mono text-gray-900">demo123</span></p>
              </div>
            </div>
            <button
              @click="fillDemoCredentials"
              class="mt-3 text-xs text-blue-700 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              Click to fill demo credentials
            </button>
          </div>
        </div>
      </div>

      <!-- ===== Offline Status Banner ===== -->
      <div 
        v-if="!isOnline" 
        class="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center"
      >
        <font-awesome-icon icon="wifi" class="text-orange-500 mr-3 w-5 h-5" />
        <div>
          <p class="text-sm font-medium text-orange-800">You're offline</p>
          <p class="text-xs text-orange-600">Connect to the internet to sign in</p>
        </div>
      </div>
    </div>
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== Imports =====
import { reactive, ref, onMounted } from 'vue'

// ===== Types & Interfaces =====
/**
 * Login form interface with validation
 * - email: User's email address
 * - password: User's password
 */
interface LoginForm {
  email: string
  password: string
}

// ===== State Management =====
/**
 * Login form reactive state
 * Handles user input for email and password
 */
const form = reactive<LoginForm>({
  email: '',
  password: ''
})

/**
 * Component state variables
 * - error: Error message to display
 * - isLoading: Loading state during authentication
 * - showPassword: Toggle for password visibility
 * - rememberMe: Remember user preference
 * - isOnline: Network status for offline handling
 */
const error = ref('')
const isLoading = ref(false)
const showPassword = ref(false)
const rememberMe = ref(false)
const isOnline = ref(navigator.onLine)

// ===== Event Handlers =====
/**
 * Handle login form submission
 * Validates form data and simulates authentication
 * Ghana-optimized: Simple validation with clear error messages
 */
async function onLogin() {
  // Clear previous errors
  error.value = ''
  
  // Basic validation with user-friendly messages
  if (!form.email || !form.password) {
    error.value = 'Please fill in both email and password to continue.'
    return
  }
  
  // Check if user is online for authentication
  if (!isOnline.value) {
    error.value = 'You need an internet connection to sign in. Please check your network and try again.'
    return
  }
  
  // Start loading state
  isLoading.value = true
  
  try {
    // Simulate authentication delay (replace with real auth later)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Demo credential check
    if (form.email === 'demo@salestracker.com' && form.password === 'demo123') {
      // Successful demo login
      alert('Welcome to Sales Tracker! (Demo login successful)')
      
      // TODO: Replace with actual authentication logic
      // - Call authentication API
      // - Store user session/token
      // - Navigate to dashboard
      // - Set up offline data sync
      
    } else {
      // Simulate authentication failure
      error.value = 'The email or password you entered is incorrect. Please try again.'
    }
    
  } catch (err) {
    // Handle network or server errors
    error.value = 'Something went wrong. Please check your connection and try again.'
    console.error('Login error:', err)
  } finally {
    isLoading.value = false
  }
}

/**
 * Toggle password visibility
 * Improves user experience by allowing password verification
 */
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

/**
 * Handle forgot password action
 * Opens forgot password flow or support
 */
function onForgotPassword() {
  alert('Forgot password feature coming soon! For now, use the WhatsApp support button below.')
}

/**
 * Handle WhatsApp support action
 * Opens WhatsApp with support contact for login help
 * Ghana-optimized: Uses local support number
 */
function onWhatsAppSupport() {
  const supportPhone = '233241234567' // Ghana support number
  const message = encodeURIComponent(
    'Hello! I need help signing in to my Sales Tracker account. Can you assist me?'
  )
  const whatsappUrl = `https://wa.me/${supportPhone}?text=${message}`
  
  window.open(whatsappUrl, '_blank')
}

/**
 * Fill demo credentials for easy testing
 * Helps users quickly explore the application
 */
function fillDemoCredentials() {
  form.email = 'demo@salestracker.com'
  form.password = 'demo123'
}

// ===== Lifecycle Hooks =====
/**
 * Setup component when mounted
 * Initializes network status monitoring and loads saved preferences
 */
onMounted(() => {
  // Monitor network status for offline handling
  window.addEventListener('online', () => {
    isOnline.value = true
  })
  
  window.addEventListener('offline', () => {
    isOnline.value = false
  })
  
  // Load remembered email if available
  const savedEmail = localStorage.getItem('remembered-email')
  if (savedEmail) {
    form.email = savedEmail
    rememberMe.value = true
  }
  
  // Save email when remember me is checked
  const saveEmailPreference = () => {
    if (rememberMe.value && form.email) {
      localStorage.setItem('remembered-email', form.email)
    } else {
      localStorage.removeItem('remembered-email')
    }
  }
  
  // Watch for changes to remember me preference
  const unwatchRememberMe = watchEffect(() => {
    saveEmailPreference()
  })
  
  // Clean up watcher when component unmounts
  onUnmounted(() => {
    unwatchRememberMe()
  })
})

// Import watchEffect and onUnmounted for the above functionality
import { watchEffect, onUnmounted } from 'vue'
</script>

<style scoped>
/* ===== [New Feature] START: Modern Login Styling ===== */
/* Touch feedback for mobile users matching other components */
button:active {
  transform: scale(0.98);
}

/* Enhanced focus states for accessibility */
button:focus-visible,
input:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}

/* Card hover effects matching DashboardView and UserProfileView */
.bg-white:hover {
  transform: translateY(-1px);
}

/* Smooth transitions for all interactive elements */
.bg-white,
button,
input {
  transition: all 0.2s ease-in-out;
}

/* Input focus states */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Loading spinner animation */
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

/* Responsive adjustments for Ghana's mobile-first context */
@media (max-width: 640px) {
  .min-h-screen {
    padding: 1rem;
  }
  
  /* Ensure touch targets are at least 48px */
  button,
  input {
    min-height: 48px;
  }
}

/* Custom checkbox styling for better mobile interaction */
input[type="checkbox"]:checked {
  background-color: theme('colors.primary.DEFAULT');
  border-color: theme('colors.primary.DEFAULT');
}

/* Demo credentials card animation */
.bg-blue-50 {
  animation: fadeInUp 0.3s ease-out 0.5s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* ===== [New Feature] END ===== */
</style>