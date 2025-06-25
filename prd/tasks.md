# BizPoint MVP Development Task List (Vue.js, Supabase, LocalForage)

This development task list outlines the key steps to build the Minimum Viable Product (MVP) for BizPoint, based on the provided PRD and incorporating the Vue.js, Supabase, and LocalForage technology stack, with an anonymous-first and freemium model.
Phase 1: Project Setup & Core Infrastructure
Vue.js Project Initialization
Set up a new Vue.js project (e.g., using Vue CLI or Vite).
Configure basic project structure (src/views, src/components, etc.).
Install necessary dependencies: localforage, @supabase/supabase-js, pinia (for state management).
Supabase & LocalForage Setup
Supabase Client (src/services/supabaseClient.js): Initialize Supabase client with environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY).
LocalForage Instances (src/plugins/localforage.js): Configure and create named LocalForage instances for productsStore, customersStore, salesQueueStore, stockHistoryStore, and companySettingsStore. Integrate into Vue app's global properties.
Supabase Database Schema:
Create products table: (id, name, selling_price, cost_price, quantity_in_stock, updated_at)
Create customers table: (id, name, phone_number, updated_at)
Create sales table: (id, date_time, total_amount, payment_method, receipt_number, customer_id, user_id, updated_at)
Create sale_items table: (id, sale_id, product_id, quantity_sold, selling_price_at_time_of_sale)
Create stock_history table: (id, date_time, product_id, quantity_change, reason, user_id)
Create company_settings table: (id, company_name)
Important: Add user_id column to products, customers, sales, stock_history tables to link data to the anonymous/authenticated user. Implement Row Level Security (RLS) policies in Supabase to restrict data access to the respective user_id.
Authentication & Anonymous Session Management
Pinia Store (src/stores/auth.js): Manage isLoggedIn, user object (uid), and network status.
main.js / Initial Load Logic:
On app start, immediately attempt to sign in using signInWithCustomToken(__initial_auth_token) or signInAnonymously() if__initial_auth_token is not defined.
Establish onAuthStateChanged listener to track the current user's UID (anonymous or authenticated). Store uid in auth.js store. This uid will be used for all data storage paths in Supabase.
If no user is authenticated or anonymous ID is not available, generate a unique local anonymousUserId (e.g., crypto.randomUUID()) to use for LocalForage and temporary Supabase user_id until a proper anonymous sign-in or account creation.
Frontend: Remove dedicated Login page as initial view. Dashboard becomes the landing page.
Phase 2: Offline Synchronization & Data Services
Network Status Utility (src/utils/networkStatus.js):
Implement logic to detect online/offline status using window.navigator.onLine and online/offline events.
Update offline.js Pinia store with current status.
Offline Synchronization Manager (src/utils/offlineSyncManager.js):
Listen to auth.isLoggedIn changes and offline.isOnline changes.
Queue Management: Implement functions to enqueueOperation(operation), dequeueOperation(). Store operations (e.g., { type: 'add/update/delete', entity: 'product/customer/sale', data: { ... } }) in salesQueueStore (LocalForage).
Push Sync Logic: When online and queue has items, iterate through salesQueueStore, attempt to push each operation to Supabase via relevant services. On success, remove from queue. Handle basic errors.
Pull Sync Logic: Periodically (e.g., every 5-10 seconds when online, or on online event):
Fetch latest data for products, customers, sales from Supabase (filtered by user_id if authenticated).
Update corresponding LocalForage stores (productsStore, customersStore, salesQueueStore) with the latest server data. Implement simple "last-write-wins" for conflicts (server version takes precedence on pull).
Data Services (src/services/*.js):
Refactor ALL CRUD/data interaction services (product, customer, stock, sales, company):
Each add, update, delete method:
Performs operation on LocalForage first.
Enqueues the operation in salesQueueStore.
If isOnline, immediately attempts to push to Supabase via offlineSyncManager.
Each get method (getList, getById):
Attempts to retrieve data from LocalForage first for immediate display.
If online, initiates a background pull from Supabase to refresh LocalForage.
Phase 3: Module Development with Anonymous/Freemium Flow
Dashboard Module (src/views/DashboardPage.vue)
UI: Implement the updated dashboard wireframe with "Hello, Guest!" and "Upgrade Your Account!" CTA. Include Quick Actions (Start New Sale, Manage Products, View Customers).
Data: Fetch daily sales, payments, purchases from salesQueueStore (LocalForage) for local data and sales table (Supabase) for synced data. Display combined or prioritized data.
Upgrade CTA Logic: Link "Upgrade Your Account!" to the UpgradeAuthPage.
Products Module (src/views/ProductsPage.vue, src/components/forms/ProductForm.vue, src/components/tables/ProductTable.vue)
Data Flow: All CRUD operations performed via productService (LocalForage first, then queued sync).
UI: Implement Product List, Add Product Form, Edit Product Form as per wireframes.
Stock Module (src/views/StockPage.vue, src/components/forms/StockAdjustmentForm.vue)
Data Flow: Stock adjustments and history management performed via stockService (LocalForage first, then queued sync).
UI: Implement Stock Adjustment form and Stock History view.
Customers Module (src/views/CustomersPage.vue, src/components/forms/CustomerForm.vue, src/components/tables/CustomerTable.vue)
Data Flow: All CRUD operations performed via customerService (LocalForage first, then queued sync).
UI: Implement Customer List, Add Customer Form, Edit Customer Form.
Point of Sale (POS) Module (src/views/PosPage.vue)
Data Flow: All sale transactions performed via salesService.
CRITICAL: A sale must be treated as an atomic operation. The entire sale (including updating product stock, creating sale record, and sale items) must first be saved transactionally in LocalForage (e.g., using a single LocalForage key for the entire sale object if needed, or by ensuring all related updates are part of one queued sync operation).
This queued operation then pushes the complete sale to Supabase (creating sales, sale_items and updating products tables).
UI: Implement POS interface including product search, cart, customer selection/quick-add, payment method, complete sale button.
Receipt & Invoice Views (src/views/ReceiptView.vue, src/views/InvoiceView.vue)
Data Source: Primarily read from the LocalForage salesQueueStore (for pending/recent sales) or synced sales data in LocalForage.
UI: Implement the receipt and invoice display as per wireframes.
Freemium Limit & Upgrade Prompt
Backend/Logic (salesService, customerService): Implement logic to track usage (e.g., number of sales, number of customers added).
Frontend (UpgradeAccountModal.vue / src/views/UpgradeAuthPage.vue):
When a limit is hit, trigger the UpgradeAccountModal.
Design the modal with options for "Create Account", "Login", and "I'll do it later".
If "Create Account" or "Login" is selected, navigate to UpgradeAuthPage.
UpgradeAuthPage.vue:
Design a combined login/signup form.
Account Migration Logic: Upon successful registration/login, implement logic to migrate/link the anonymous user's data (from LocalForage and Supabase with the anonymous UID) to the new authenticated user's UID. This will involve updating the user_id columns for all existing products, customers, sales, stock_history records associated with the anonymous ID to the new authenticated UID. This needs careful transactional handling to prevent data loss.
Phase 4: UI/UX & General Enhancements
Responsive Layout: Ensure all components and views render correctly and are usable on mobile, tablet, and desktop screens using a responsive CSS framework (e.g., Tailwind CSS).
User Feedback: Implement a global notification system (toast messages) for success/error/offline status feedback.
Loading States: Implement visual loading indicators for data fetching and sync operations.
Confirm Modals: Use a custom ConfirmModal.vue component for delete actions.
Phase 5: Testing & Deployment Preparation
Unit & Integration Tests: (As feasible)
Test Supabase service interactions.
Test LocalForage operations.
Test offlineSyncManager logic (queueing, pushing, pulling, conflict resolution).
Test state management (pinia stores).
Test core business logic (stock deduction, total calculations).
End-to-End Testing:
Test full anonymous user flow (add product, add customer, make sale, go offline, make sale, go online, verify sync).
Test freemium limit triggers and upgrade path.
Verify all CRUD operations and data displays correctly.
Code Comments & Documentation: Ensure thorough inline code comments, especially for sync logic.
