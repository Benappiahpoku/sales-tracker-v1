# PRD Review: Sales Tracker MVP with Vue.js, Supabase, LocalForage

This review examines the Sales Tracker MVP Product Requirements Document (PRD) in light of the chosen technology stack: Vue.js for the frontend, Supabase for the backend (Auth, Database, API), and LocalForage for offline data storage and synchronization.

1. Introduction & Purpose
Review: The core purpose remains robust. The addition of LocalForage significantly enhances the "user-friendly and efficient" aspect, particularly in areas with intermittent internet connectivity, aligning perfectly with the target audience in Ghana. This offline capability is a key differentiator.

2. Goals & Objectives of MVP
Review: All goals are well-supported. The offline functionality directly contributes to "Enable SMEs to digitally record and track daily sales transactions" by ensuring continuity even without an internet connection. "Provide accurate, real-time visibility" will involve robust sync mechanisms between LocalForage and Supabase.

3. Target Audience
Review: The offline-first approach (enabled by LocalForage) is a critical benefit for SMEs in Ghana, where consistent high-speed internet might not always be guaranteed. This technology choice directly addresses a major pain point for the target demographic.

4. Key Features & Functionality (MVP Scope)

4.1. Authentication & Basic System
Review:
User Login/Logout: Supabase Authentication is ideal for this. The authService.js will interact directly with Supabase's auth module (signInWithPassword, signOut, etc.). Initial authentication will likely use signInWithCustomToken provided by the Canvas environment, falling back to signInAnonymously if the token is not present. onAuthStateChanged will be essential in main.js or an auth.js store to manage the user session and ensure Firebase/Supabase instances are ready before data operations.
Basic User Profile: User data (email, uid) will come directly from Supabase Auth. Password changes will use Supabase Auth methods.
Company Name Display: This can be stored in a simple Supabase table (CompanySettings) or even a static configuration for the MVP if not needing to be changed by the user.

4.2. Dashboard Module (Home)
Review:
Data for dashboard metrics (Today's Total Sales, etc.) will primarily be aggregated from the Sales and StockHistory tables in Supabase.
Offline Consideration: If the app is offline, the dashboard should display aggregated data from LocalForage. When back online, it should trigger a sync and then refresh with the latest data from Supabase. The offlineSyncManager and salesService would be responsible for ensuring these local aggregations are up-to-date with local transactions.

4.3. Products Module (CRUD Functionality)
Review: This module is central to the offline strategy.
Data Source: All CRUD operations for Products will first update the productsStore in LocalForage.
Sync Logic:
Create/Edit/Delete: These operations will be queued in salesQueueStore (or a dedicated syncQueueStore) within LocalForage. The offlineSyncManager will then push these changes to the products table in Supabase when online.
View (Product List): This should primarily read from productsStore in LocalForage for immediate display. The productService should implement a background sync to pull the latest product data from Supabase periodically when online, updating the LocalForage cache.
Backend: Supabase's Postgres database will store the canonical products data.

4.4. Stock Module (Add, View, Edit Functionality)
Review: Similar to Products, Stock management is heavily involved in offline operations.
Data Source: Stock updates (which affect Products.quantity_in_stock) will first modify the product data in LocalForage. StockHistory entries will also be stored in LocalForage.
Sync Logic:
Add New Stock/Edit Stock Quantity: These operations trigger updates to Products records and create StockHistory records. Both changes need to be queued in LocalForage and then synced to their respective tables in Supabase.
Stock History (View): Primarily read from LocalForage, with background sync from Supabase stock_history table.
Backend: Supabase's Postgres database will manage products (for stock quantity) and stock_history tables.

4.5. Customers Module (CRUD Functionality)
Review:
Data Source: CRUD operations for Customers will first update the customersStore in LocalForage.
Sync Logic:
Create/Edit/Delete: Operations will be queued in LocalForage and pushed to the customers table in Supabase.
View (Customer List): Read from LocalForage primarily, with background sync from Supabase customers table.
Backend: Supabase's Postgres database will store the canonical customers data.

4.6. Point of Sale (POS) Module
Review: This is the critical module for offline capability.
Sell Item(s) (Sale Creation Interface):
Product selection will pull from LocalForage (productsStore).
Customer selection will pull from LocalForage (customersStore). Quick-add of new customers will create them in LocalForage and queue for Supabase sync.
Sale Processing Logic (Backend after "Complete Sale"):
Crucial: All these operations (Stock Deduction, Sales Record Creation, Sale Items Record, Stock History Update) must first be performed against LocalForage.
The complete sale transaction (including Sales record, SaleItems, and stock deductions from Products in LocalForage) should then be added as a single atomic operation to the salesQueueStore (or a more comprehensive syncQueueStore) in LocalForage.
The offlineSyncManager will then be responsible for pushing this complete sale transaction to Supabase's sales, sale_items, and updating products tables when online. This ensures data consistency.
Receipt Generation: This is a client-side (Vue.js) rendering of data primarily sourced from the newly created LocalForage sale record.
Sales / Invoices (View Historical Sales):
Will primarily read from LocalForage for immediate display.
salesService will be responsible for syncing historical sales data from Supabase to LocalForage periodically to keep the local history up-to-date.

1. Technical Considerations (Updated based on Tech Stack)
Platform: Confirmed as Web-based application using Vue.js.
Database: Explicitly Supabase's PostgreSQL database for the backend.
Offline Data Store: Explicitly LocalForage for client-side persistence.
Frontend Framework: Vue.js for component-based UI development.
Backend Services: Supabase will handle:
Database (Postgres for Products, Customers, Sales, SaleItems, StockHistory, CompanySettings).
Authentication.
Providing a RESTful API (via PostgREST).
Offline Sync Logic: A dedicated offlineSyncManager (in utils/) will be required to manage the queue of pending offline operations (CRUD for Products, Customers, and full Sale transactions) and handle synchronization with Supabase when online. This includes:
Queueing write operations locally.
Detecting network status changes.
Pushing queued writes to Supabase.
Pulling updated data from Supabase to refresh LocalForage caches.
Basic conflict resolution (e.g., last-write-wins at the server).
Error Handling: Implement robust try/catch blocks within services, especially around network requests and database operations, to gracefully handle Supabase API errors and LocalForage issues. Use custom modal/toast for user feedback.
Security: Supabase's Row Level Security (RLS) can be considered for future granular access control, but for MVP, basic authentication and ensuring proper data handling will be key. Initial setup uses __initial_auth_token for authentication.

Success Metrics for MVP
Review: Metrics remain highly relevant. The success of "Sales Tracker" will heavily rely on the seamless operation of the offline sync mechanism to ensure accurate data even with connectivity challenges.

This detailed review should provide the AI agent with clear instructions on how to leverage Vue.js, Supabase, and LocalForage for each PRD requirement, particularly focusing on the crucial offline-first and synchronization logic.
