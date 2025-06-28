<!--
  UserProfileView.vue
  Stratonea/Sales Tracker - Modern user profile screen with card-based design
  - Follows DashboardView.vue design principles and modern styling
  - Ghana-optimized: mobile-first, offline-friendly, WhatsApp integration
  - Uses modern card layouts with hover effects and animations
  - Touch-optimized buttons and accessibility features
  - Follows Stratonea guidelines with comprehensive documentation
-->

<template>
  <!-- ===== [New Feature] START: Modern Profile Design ===== -->
  <div class="min-h-screen bg-gray-50 px-4 py-6">
    <!-- Page Header -->
    <div class="max-w-2xl mx-auto mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Profile</h1>
      <p class="text-gray-600">Manage your account information and preferences</p>
    </div>

    <!-- Profile Content Container -->
    <div class="max-w-2xl mx-auto space-y-6">
      
      <!-- ===== Profile Overview Card ===== -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group">
        <!-- Profile Header with Avatar -->
        <div class="flex items-center mb-6">
          <!-- User Avatar -->
          <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary-200 transition-colors duration-200">
            <font-awesome-icon icon="user" class="text-primary-600 text-2xl" />
          </div>
          
          <!-- User Basic Info -->
          <div class="flex-1">
            <h2 class="text-xl font-semibold text-gray-900 mb-1">{{ user.name }}</h2>
            <p class="text-sm text-gray-500 mb-1">{{ user.region }} Region</p>
            <div class="flex items-center">
              <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span class="text-xs text-green-600 font-medium">{{ profileStatus }}</span>
            </div>
          </div>
        </div>

        <!-- Profile Details Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <!-- Email -->
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center mb-2">
              <font-awesome-icon icon="envelope" class="text-gray-400 mr-2 w-4 h-4" />
              <span class="text-sm font-medium text-gray-700">Email</span>
            </div>
            <p class="text-sm text-gray-900 font-mono">{{ user.email }}</p>
          </div>

          <!-- Phone -->
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center mb-2">
              <font-awesome-icon icon="phone" class="text-gray-400 mr-2 w-4 h-4" />
              <span class="text-sm font-medium text-gray-700">Phone</span>
            </div>
            <p class="text-sm text-gray-900 font-mono">{{ formattedPhone }}</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3">
          <!-- Edit Profile Button -->
          <button
            @click="onEdit"
            class="flex-1 inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 min-h-[48px] active:scale-98"
            :aria-label="`Edit profile for ${user.name}`"
          >
            <font-awesome-icon icon="edit" class="mr-2" />
            Edit Profile
          </button>

          <!-- WhatsApp Contact Button -->
          <button
            @click="onWhatsAppSupport"
            class="flex-1 inline-flex items-center justify-center px-4 py-3 border border-green-300 text-sm font-medium rounded-lg text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 min-h-[48px] active:scale-98"
            aria-label="Contact support via WhatsApp"
          >
            <font-awesome-icon :icon="['fab', 'whatsapp']" class="mr-2" />
            Get Support
          </button>

          <!-- Logout Button -->
          <button
            @click="onLogout"
            class="flex-1 inline-flex items-center justify-center px-4 py-3 border border-red-300 text-sm font-medium rounded-lg text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 min-h-[48px] active:scale-98"
            aria-label="Logout from account"
          >
            <font-awesome-icon icon="sign-out-alt" class="mr-2" />
            Logout
          </button>
        </div>
      </div>

      <!-- ===== Account Settings Card ===== -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
        
        <div class="space-y-4">
          <!-- Sync Status -->
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center">
              <font-awesome-icon 
                :icon="isOnline ? 'cloud-upload-alt' : 'cloud-download-alt'" 
                :class="isOnline ? 'text-green-500' : 'text-orange-500'"
                class="mr-3 w-5 h-5"
              />
              <div>
                <p class="text-sm font-medium text-gray-900">Sync Status</p>
                <p class="text-xs text-gray-500">{{ syncStatusMessage }}</p>
              </div>
            </div>
            <div class="flex items-center">
              <div 
                :class="isOnline ? 'bg-green-500' : 'bg-orange-500'"
                class="w-2 h-2 rounded-full mr-2"
              ></div>
              <span 
                :class="isOnline ? 'text-green-600' : 'text-orange-600'"
                class="text-xs font-medium"
              >
                {{ isOnline ? 'Online' : 'Offline' }}
              </span>
            </div>
          </div>

          <!-- Last Sync Time -->
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center">
              <font-awesome-icon icon="clock" class="text-gray-400 mr-3 w-5 h-5" />
              <div>
                <p class="text-sm font-medium text-gray-900">Last Sync</p>
                <p class="text-xs text-gray-500">{{ lastSyncTime }}</p>
              </div>
            </div>
            <button
              @click="onForceSync"
              :disabled="!isOnline"
              class="px-3 py-1 text-xs font-medium rounded-md bg-primary text-white hover:bg-primary-hover disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Sync Now
            </button>
          </div>

          <!-- Data Usage -->
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center">
              <font-awesome-icon icon="chart-bar" class="text-gray-400 mr-3 w-5 h-5" />
              <div>
                <p class="text-sm font-medium text-gray-900">Data Usage</p>
                <p class="text-xs text-gray-500">Optimize for Ghana networks</p>
              </div>
            </div>
            <div class="flex items-center">
              <span class="text-sm font-medium text-gray-900 mr-2">{{ dataUsage }}MB</span>
              <button
                @click="onDataSettings"
                class="px-3 py-1 text-xs font-medium rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== Offline Status Banner ===== -->
      <div 
        v-if="!isOnline" 
        class="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center animate-pulse"
      >
        <font-awesome-icon icon="wifi" class="text-orange-500 mr-3 w-5 h-5" />
        <div>
          <p class="text-sm font-medium text-orange-800">Working Offline</p>
          <p class="text-xs text-orange-600">Your changes will sync when you're back online</p>
        </div>
      </div>
    </div>
  </div>
  <!-- ===== [New Feature] END ===== -->
</template>

<script setup lang="ts">
// ===== Imports =====
import { ref, computed, onMounted } from 'vue'
import { formatDistanceToNow } from 'date-fns'

// ===== Types & Interfaces =====
/**
 * User profile interface with comprehensive user data
 * - name: User's full name
 * - email: User's email address
 * - phone: User's phone number (Ghana format)
 * - region: User's region in Ghana
 * - lastSync: Last synchronization timestamp
 * - dataUsage: Current data usage in MB
 */
interface UserProfile {
  name: string
  email: string
  phone: string
  region: string
  lastSync: number
  dataUsage: number
}

// ===== State Management =====
/**
 * Mock user data for demonstration
 * Replace with real user data from store or API
 */
const user = ref<UserProfile>({
  name: 'Ama Serwaa',
  email: 'ama.serwaa@example.com',
  phone: '024 123 4567',
  region: 'Ashanti',
  lastSync: Date.now() - 300000, // 5 minutes ago
  dataUsage: 45.2
})

/**
 * Network status state
 * Simulated online/offline state - replace with real network status composable
 */
const isOnline = ref(navigator.onLine)

/**
 * Sync status state
 */
const isSyncing = ref(false)

// ===== Computed Properties =====
/**
 * Format phone number for Ghana display
 * Ensures consistent phone number formatting
 */
const formattedPhone = computed(() => {
  const phone = user.value.phone
  const cleaned = phone.replace(/\D/g, '')
  
  // Check if it's a valid Ghanaian number format
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    // Format as: 024 123 4567
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
  }
  
  return phone
})

/**
 * Profile status based on sync and network state
 */
const profileStatus = computed(() => {
  if (!isOnline.value) return 'Offline'
  if (isSyncing.value) return 'Syncing...'
  return 'Active'
})

/**
 * Sync status message for user feedback
 */
const syncStatusMessage = computed(() => {
  if (!isOnline.value) {
    return 'Working offline - changes will sync when online'
  }
  if (isSyncing.value) {
    return 'Syncing your data...'
  }
  return 'All data synchronized'
})

/**
 * Last sync time in human-readable format
 */
const lastSyncTime = computed(() => {
  if (!user.value.lastSync) return 'Never'
  return formatDistanceToNow(new Date(user.value.lastSync), { addSuffix: true })
})

/**
 * Data usage formatted for display
 */
const dataUsage = computed(() => {
  return user.value.dataUsage.toFixed(1)
})

// ===== Event Handlers =====
/**
 * Handle edit profile action
 * Opens edit profile form or navigates to edit screen
 */
function onEdit() {
  // TODO: Implement navigation to edit profile screen
  alert(`Edit profile for ${user.value.name} (feature coming soon)`)
}

/**
 * Handle WhatsApp support action
 * Opens WhatsApp with support contact
 * Ghana-optimized: Uses local support number
 */
function onWhatsAppSupport() {
  const supportPhone = '233241234567' // Ghana support number
  const message = encodeURIComponent(
    `Hello! I'm ${user.value.name} and I need help with my Sales Tracker account.`
  )
  const whatsappUrl = `https://wa.me/${supportPhone}?text=${message}`
  
  window.open(whatsappUrl, '_blank')
}

/**
 * Handle logout action
 * Clears user session and navigates to login
 */
function onLogout() {
  if (confirm('Are you sure you want to logout?')) {
    // TODO: Implement actual logout logic
    // - Clear user session
    // - Clear local storage
    // - Navigate to login screen
    alert('Logged out successfully (mock)')
  }
}

/**
 * Handle force sync action
 * Triggers manual data synchronization
 */
async function onForceSync() {
  if (!isOnline.value) {
    alert('Cannot sync while offline. Please check your internet connection.')
    return
  }
  
  isSyncing.value = true
  
  try {
    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 2000))
    user.value.lastSync = Date.now()
    alert('Sync completed successfully!')
  } catch (error) {
    alert('Sync failed. Please try again.')
  } finally {
    isSyncing.value = false
  }
}

/**
 * Handle data settings action
 * Opens data usage settings
 */
function onDataSettings() {
  alert('Data settings (feature coming soon)')
}

// ===== Lifecycle Hooks =====
/**
 * Setup network status monitoring
 * Listens for online/offline events
 */
onMounted(() => {
  // Listen for network status changes
  window.addEventListener('online', () => {
    isOnline.value = true
  })
  
  window.addEventListener('offline', () => {
    isOnline.value = false
  })
  
  // Auto-sync when coming back online
  window.addEventListener('online', () => {
    if (isOnline.value) {
      onForceSync()
    }
  })
})
</script>

<style scoped>
/* ===== [New Feature] START: Modern Profile Styling ===== */
/* Touch feedback for mobile users */
button:active {
  transform: scale(0.98);
}

/* Enhanced focus states for accessibility */
button:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}

/* Card hover effects matching DashboardView */
.group:hover {
  transform: translateY(-2px);
}

/* Smooth transitions for all interactive elements */
.group {
  transition: all 0.2s ease-in-out;
}

/* Loading animation for sync status */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .min-h-screen {
    padding-bottom: 2rem;
  }
}
/* ===== [New Feature] END ===== */
</style>