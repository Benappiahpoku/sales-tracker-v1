# Sales Tracker MVP: Vue.js, Supabase, LocalForage - File & Component Structure

This document outlines the recommended file and component structure for the Sales Tracker MVP, leveraging Vue.js for the frontend, Supabase for backend services, and LocalForage for offline data storage and synchronization.

1. Overall Project Structure
sales-tracker-app/
├── public/                 # Static assets (index.html, favicon)
│   └── index.html          # Main HTML file for the Vue app
├── src/                    # Source code for the Vue.js application
│   ├── assets/             # Static assets (images, fonts, global CSS)
│   ├── components/         # Reusable UI components
│   ├── views/              # Main application pages/screens
│   ├── stores/             # Pinia/Vuex stores for state management
│   ├── services/           # Backend API integration (Supabase client & specific services)
│   ├── utils/              # Utility functions (helpers, offline sync logic)
│   ├── plugins/            # Vue plugins (LocalForage setup)
│   ├── App.vue             # Root Vue component
│   └── main.js             # Vue app entry point
├── package.json            # Project dependencies and scripts
├── vue.config.js           # Vue CLI configuration (if using Vue CLI)
└── .env                    # Environment variables (e.g., Supabase URL, Anon Key)

2. src Directory Breakdown
2.1. src/main.js
Initializes the Vue application.
Registers global plugins (like LocalForage setup).
Mounts the App.vue component.
Initializes Supabase client globally or passes it down.
Sets up the initial authentication check with Supabase.
2.2. src/App.vue
The root component of the application.
Manages the overall layout (e.g., sidebar, header, main content area).
Handles routing/view switching (using a v-if or v-show based on a reactive currentView or route state, as vue-router is not in MVP scope as per instructions).
Displays global UI elements like online/offline status indicators.
2.3. src/assets/
css/
tailwind.css (if using Tailwind setup)
global.css (any custom global styles)
images/
icons/ (e.g., SVG icons)
2.4. src/components/
Purpose: Contains small, reusable UI components that can be used across different views.
Structure:
components/
├── common/
│   ├── AppHeader.vue      # Top navigation/header (Company Name, User Info, Alerts)
│   ├── NavigationSidebar.vue     # Left navigation menu
│   ├── DeleteConfirmModal.vue   # Generic confirmation dialog for delete actions
│  

|---- layout/
|    ├── ActionButtons.vue       # Component for displaying a generated receipt
|    ├── ReceiptPreview.vue       # Component for displaying a generated receipt
|    └── InvoicePreview.vue       # Component for displaying a detailed invoice
|    └── ProductItem.vue       # Component for a single product Item
|    └── StockItem.vue       # Component for a single stock Item
|    └── CustomerPerson.vue       # Component for a single customer
|    └── Search.vue       # Component for a single customer
├── forms/
│   ├── ProductForm.vue    # Form for adding/editing a product
│   ├── CustomerForm.vue   # Form for adding/editing a customer
│   └── StockAdjustmentForm.vue # Form for adding/adjusting stock
└── lists/
    ├── ProductList.vue   # Table to display product list
    ├── CustomerList.vue  # Table to display customer list
    └── SalesList.vue     # Table to display sales list

2.5. src/views/
Purpose: Represents the main pages or "screens" of the application. Each view will compose multiple components.
Structure:
views/
├── Auth/
│   ├── LoginView.vue
│   └── UserProfileView.vue
├── DashboardView.vue     # Main dashboard view
├── ProductsView.vue      # Parent view for Products list and forms
├── CustomersView.vue     # Parent view for Customers list and forms
├── StockView.vue         # Parent view for Stock history and adjustments
├── POSView.vue            # Main Point of Sale interface
├── InvoiceView.vue       # Invoice interface
├── CompanySettingsView.vue       # Main company component to add, remove and editing company information

2.6. src/stores/ (Using Pinia for State Management)
Purpose: Centralized state management for global data accessible across components, especially authentication status and offline sync state.
Structure:
stores/
├── auth.js            # User authentication state (isLoggedIn, user data, token)
└── data.js            # store to cache product/customer lists when online

2.7. src/services/
Purpose: Encapsulate all logic for interacting with Supabase and managing data.
Structure:
services/
├── supabaseClient.js  # Supabase client initialization and configuration
├── authService.js     # Login, logout, user session management with Supabase auth
├── productService.js  # CRUD operations for Products (interacts with Supabase & LocalForage)
├── customerService.js # CRUD operations for Customers (interacts with Supabase & LocalForage)
├── stockService.js    # Operations for Stock adjustments and history
├── salesService.js    # Logic for POS transactions, fetching sales, generating receipts/invoices
└── companyService.js  # For fetching/updating basic company name

touch src/components/common/AppHeader.vue src/components/common/NavigationSidebar.vue src/components/common/DeleteConfirmModal.vue src/components/layout/ActionButtons.vue src/components/layout/ReceiptPreview.vue  src/components/layout/InvoicePreview.vue src/components/layout/ProductItem.vue src/components/layout/StockItem.vue  src/components/layout/CustomerPerson.vue  src/components/layout/Search.vue src/components/lists/ProductList.vue src/components/forms/CustomerList.vue src/components/forms/SalesList.vue
src/components/forms/ProductForm.vue src/components/forms/CustomerForm.vue  src/components/forms/StockAdjustmentForm.vue src/views/auth/LoginView.vue src/views/auth/UserProfileView.vue src/views/DashboardView.vue src/views/ProductsView.vue src/views/CustomersView.vue src/views/StockView.vue src/views/POSView.vue src/views/InvoiceView.vue src/views/CompanySettingsView.vue src/services/supabaseClient.ts src/services/authService.ts src/services/productService.ts src/services/customerService.ts src/services/stockService.ts src/services/salesService.ts src/services/companyService.ts

2.8. src/utils/
Purpose: Contains helper functions and the core offline synchronization logic.
Structure:
utils/
├── offlineSyncManager.js # **Crucial for offline sync:**
│   # Manages the queue of pending operations (CRUD) to be synced to Supabase.
│   # Listens for network changes.
│   # Handles pushing local changes to Supabase when online.
│   # Handles pulling latest data from Supabase to LocalForage.
│   # Implements simple conflict resolution (e.g., last-write-wins, or prefer remote for GETs).

2.9. src/plugins/
Purpose: To set up and register third-party libraries or custom Vue plugins.
Structure:
plugins/
└── localforage.js     # Initializes LocalForage instances (e.g., one for 'products', one for 'customers', one for 'sales_queue')

Supabase and LocalForage Integration Logic
Supabase Client (services/supabaseClient.js):
// services/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Or process.env.VUE_APP_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Or process.env.VUE_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

This client will be imported by all other services to interact with Supabase.
LocalForage Initialization (plugins/localforage.js):
// plugins/localforage.js
import localforage from 'localforage';

// Configure and export named LocalForage instances for different data types
export const productsStore = localforage.createInstance({ name: 'sales_tracker_products' });
export const customersStore = localforage.createInstance({ name: 'sales_tracker_customers' });
export const salesQueueStore = localforage.createInstance({ name: 'sales_tracker_sales_queue' }); // Queue for pending sales to sync

export default {
  install(app) {
    app.config.globalProperties.$productsStore = productsStore;
    app.config.globalProperties.$customersStore = customersStore;
    app.config.globalProperties.$salesQueueStore = salesQueueStore;
    // Optionally add other stores or a generic store if needed
  }
};

This plugin will be registered in main.js.
Offline Sync Strategy (utils/offlineSyncManager.js & Services):
Data Access Layer (e.g., services/productService.js):
All get methods will first attempt to retrieve data from LocalForage. If online and LocalForage data is stale, it will fetch from Supabase and update LocalForage.
All add, update, delete methods will:
Immediately update LocalForage.
Add the operation (e.g., { type: 'ADD', entity: 'product', data: {...} }) to the salesQueueStore (or a more generic syncQueueStore) in LocalForage.
If currently online, immediately attempt to push this operation to Supabase.
offlineSyncManager.js:
Listens to window.addEventListener('online') and window.addEventListener('offline').
When online event fires:
It checks salesQueueStore for pending operations.
Iterates through the queue, attempts to execute each operation against Supabase.
On successful Supabase sync, removes the item from the queue.
After processing the queue (or periodically when online), it performs a full "pull" sync: fetches the latest data for Products, Customers, and Sales from Supabase and updates the respective LocalForage stores (productsStore, customersStore). This ensures the local cache is fresh.
Conflict Resolution (MVP): For data being pulled from Supabase, the Supabase version is always considered the most authoritative (last write wins on the server). For data being pushed from LocalForage, if the Supabase record was modified after the local modification (check timestamps if available), a simple conflict might be to just overwrite (last local change wins if pushing) or log a warning. For MVP, focus on making sure changes eventually propagate.
UI Feedback: The stores/offline.js will hold the current network status and potentially sync status (e.g., isSyncing: true/false, lastSyncTime). OnlineStatusIndicator.vue will display this to the user.
This comprehensive structure provides a clear blueprint for the Sales Tracker MVP, enabling both online and offline functionality with Supabase and Vue.js.
