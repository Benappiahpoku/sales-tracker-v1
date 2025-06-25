# BizPoint MVP Mobile Keyboard Wireframe (Anonymous-First & Freemium)

This wireframe outlines the layout and interaction flow for the BizPoint MVP on a mobile device, explicitly incorporating the anonymous-first access, offline functionality, and the freemium upgrade path. This document supersedes the previous mobile wireframe for clarity on the initial user experience.

1. Global Navigation & UI Elements
Top Bar:
Left: Menu Icon (Hamburger) - Taps to toggle sidebar.
Center: Screen Title (e.g., "Dashboard," "Products").
Right: Connection Status (Dynamic):
[Online]
[Offline]
Sidebar Navigation (Hidden, appears on Menu Icon tap):
Overlay from left, covering ~75% of screen.
Company Name (e.g., "Stratonea").
User Status: "Guest User"
List of main modules (Tappable links):
Home (Dashboard)
Products
Stock
Point of Sale
Customers
[ Upgrade / Login ] (Prominent Link/Button)
Taps outside sidebar or on close icon hides it.
Notifications:
Toast messages (small, non-intrusive pop-ups at top/bottom) for success/error feedback (e.g., "Product Added Successfully," "No Internet Connection - Saving Locally").
Modals:
Centered overlay for confirmations (e.g., "Are you sure you want to delete?").
"Upgrade Account" Modal: (Detailed below).
1. Module Wireframes (Emphasizing Anonymous & Offline Flow)
2.1. Initial App Load & Dashboard (The New Landing Page)
+------------------------------------+
| BizPoint                           |
|------------------------------------|
| [Menu Icon]   Dashboard    [Online]|  <-- Initial state, assumes online for first load
|                                    |
|  Hello, Guest!                     |  <-- Welcoming message for anonymous user
|                                    |
|  +------------------------------+  |
|  |   ⚡ Upgrade Your Account!   |  |  <-- Prominent CTA for permanent storage
|  |   Save your data, sync across|  |
|  |   devices, & unlock limits!  |  |
|  +------------------------------+  |
|                                    |
|  [Daily Summary]                   |
|  +------------------------------+  |
|  |  Today's Sales               |  |
|  |  GHS 0.00                    |  |
|  +------------------------------+  |
|                                    |
|  +------------------------------+  |
|  |  Payments Received           |  |
|  |  GHS 0.00                    |  |
|  +------------------------------+  |
|                                    |
|  [Quick Actions]                   |
|  +------------------------------+  |
|  |      Start New Sale          |  |  <-- Direct access to POS
|  +------------------------------+  |
|                                    |
|  +------------------------------+  |
|  |      Manage Products         |  |  <-- Direct access to Products list
|  +------------------------------+  |
|                                    |
|  +------------------------------+  |
|  |      View Customers          |  |  <-- Direct access to Customers list
|  +------------------------------+  |
|                                    |
+------------------------------------+

Interaction: User sees this immediately on app launch. Taps "Upgrade Your Account!" or quick action buttons.

Interaction: User fills form, taps SAVE. Toast confirms local save.
2.4. POS Page (Main Sales Interface) - Demonstrating Offline Sales)
+------------------------------------+

| BizPoint                           |
|------------------------------------|
| [Menu Icon] Point of Sale  [Offline]|
|                                    |
|  --------------------------------  |

|  | Search Product...            |  |
|  --------------------------------  |
|                                    |
|  Selected Items:                   |

|  --------------------------------  |
|  Product A x1   GHS 10.00 [X]      |

|  Product C x2   GHS 50.00 [X]      |
|  --------------------------------  |
|  TOTAL: GHS 60.00                  |
|                                    |
|  Customer:                         |
|  --------------------------------  |

|  | Search Customer... / Add New |  |

|  --------------------------------  |
|                                    |
|  Payment Method:                   |
|  [ ] Cash     [ ] Mobile Money     |
|                                    |
|  +------------------------------+  |
|  |         COMPLETE SALE        |  | <---- Invoice Preview
|  +------------------------------+  |
|                                    |
|  [Toast: Sale recorded locally. Will sync when online.]
|  +------------------------------+  |
|  |       VIEW SALES HISTORY     |  |
|  +------------------------------+  |
|                                    |
+------------------------------------+

Interaction: User completes sale while offline. Toast confirms local saving.
2.5. Upgrade Account Prompt (Modal Example - Triggered by Freemium Limit)
This modal could appear when a user attempts to add their 5th customer, or after 10 sales, etc. This is illustrative, the trigger logic is in the PRD.
+------------------------------------+

| BizPoint                           |
|------------------------------------|
| [App Overlayed]                    |
|                                    |
|        +---------------------+     |

|        |  UPGRADE YOUR ACCOUNT |     |

|        |---------------------|     |
|        |                     |     |
|        | You've reached your |     |
|        | limit for (e.g., free |     |
|        | sales / customers)! |     |
|        |                     |     |
|        | Create an account   |     |
|        | to keep your data,  |     |
|        | sync across devices,|     |
|        | and continue using  |     |
|        | BizPoint without    |     |
|        | limits.             |     |
|        |                     |     |
|        | [  CREATE ACCOUNT   ] |     |
|        | [  I'LL DO IT LATER ] |     |
|        | [  LOGIN (if existing) ] |     |
|        +---------------------+     |
|                                    |
+------------------------------------+

Interaction: User is presented with this modal. Taps "CREATE ACCOUNT" or "LOGIN" to proceed to the dedicated auth page. "I'LL DO IT LATER" might close the modal but prevent the action that triggered it (e.g., adding a 6th customer).
2.6. Upgrade/Login/Signup Page (Generic Placeholder)
This page is a standard authentication flow, accessible from the "Upgrade Your Account" CTA or sidebar.
+------------------------------------+

| BizPoint                           |
|------------------------------------|
| [Back Icon] Sign Up / Login [Online]|
|                                    |
|  [ Welcome / Create Account Header]|
|                                    |
|  --------------------------------  |

|  | Email Address                |  |
|  --------------------------------  |
|                                    |

|  --------------------------------  |
|  | Password                     |  |
|  --------------------------------  |
|                                    |
|  [ Confirm Password (for Signup) ] |
|  [ Have an account? Login (Link) ] |
|  [ Forgot Password? (Link) ]       |
|                                    |
|  +------------------------------+  |
|  |      CREATE ACCOUNT / LOGIN  |  |
|  +------------------------------+  |
|                                    |
+------------------------------------+

Interaction: Standard form entry. After successful signup/login, the system should ideally merge/migrate their anonymous data to the new account and then redirect to the Dashboard.
This updated wireframe set clearly distinguishes the anonymous flow, emphasizes offline resilience, and integrates the freemium upgrade path. This level of detail should give the AI agent a very precise understanding of the desired user experience, Benjamin.

## BizPoint MVP Mobile Keyboard Wireframe

This wireframe outlines the layout and interaction flow for the BizPoint MVP on a mobile device, emphasizing a mobile-first, keyboard-friendly approach.

1. Global Navigation & UI Elements
Top Bar:
Left: Menu Icon (Hamburger) - Taps to toggle sidebar.
Center: Screen Title (e.g., "Login," "Dashboard," "Products").
Right: Online/Offline Indicator (Small icon/text, e.g., Green Dot "Online" / Red Cross "Offline").
Sidebar Navigation (Hidden, appears on Menu Icon tap):
Overlay from left, covering ~75% of screen.
Company Name (e.g., "Stratonea").
User Name.
List of main modules (Tappable links):
Home (Dashboard)
Products
Stock
Point of Sale
Customers
User Profile (or Account)
Logout
Taps outside sidebar or on close icon hides it.
Notifications:
Toast messages (small, non-intrusive pop-ups at top/bottom) for success/error feedback (e.g., "Product Added Successfully," "Insufficient Stock").
Modals:
Centered overlay for confirmations (e.g., "Are you sure you want to delete?").

Sidebar Navigation (Opened State)
+------------------------------------+

| BizPoint                           |
|------------------------------------|

| [Menu Icon]   [Current Page]       |  (App's top bar is still visible underneath)

|                                    |
|  +---------------------------+     |
|  |                           |     |
|  |       Sidebar             |     |
|  | (Overlays app content)    |     |
|  |                           |     |
|  |  -------------------------|-----|-----+
|  |  |   Your Company Name   |     |     |
|  |  |                       |     |     |
|  |  |  User Status:         |     |     |
|  |  |  Guest User / Anonymous |     |     |
|  |  -------------------------|-----|-----+
|  |                           |     |
|  |  +---------------------+  |     |
|  |  |   Home (Dashboard)  |  |     |
|  |  +---------------------+  |     |
|  |                           |     |
|  |  +---------------------+  |     |
|  |  |   Products          |  |     |
|  |  +---------------------+  |     |
|  |                           |     |
|  |  +---------------------+  |     |
|  |  |   Stock             |  |     |
|  |  +---------------------+  |     |
|  |                           |     |
|  |  +---------------------+  |     |
|  |  |   Point of Sale     |  |     |
|  |  +---------------------+  |     |
|  |                           |     |
|  |  +---------------------+  |     |
|  |  |   Customers         |  |     |
|  |  +---------------------+  |     |
|  |  +---------------------+  |     |
|  |  |   Company Settings     |     |
|  |  +---------------------+  |     |
|  |                           |     |
|  |  +---------------------+  |     |
|  |  | ⚡ Upgrade / Login  |  |     |
|  |  +---------------------+  |     |
|  |                           |     |
|  |                           |     |
|  |                           |     |
|  |                           |     |
|  +---------------------------+     |
|                                    |
+------------------------------------+

Company Settings Page
+------------------------------------+

| BizPoint                           |
|------------------------------------|

| [Back Icon] Company Settings [Online]|  <-- Navigate back to User Profile/Dashboard

|                                    |
|  Your Company Information          |
|                                    |
|  Company Name:                     |

|  --------------------------------  |
|  | e.g., My Small Enterprise    |  |  <-- Input field for company name
|  --------------------------------  |
|
Company logo Upload:

|  --------------------------------  |
|  |Upload Logo  |                   |  <-- Input field for company logo
|  --------------------------------  |                    |
|  (Optional: Small description     )|
|  (e.g., "This name will appear on )|
|  (receipts and invoices."         )|
|                                    |
|  +------------------------------+  |
|  |             SAVE             |  |  <-- Button to save changes
|  +------------------------------+  |
|                                    |
+------------------------------------+

1. Module Wireframes
2.1. Login Page
+------------------------------------+
| BizPoint                           |
|------------------------------------|
|              [Menu Icon]           |
|                                    |
|          Login                     |
|                                    |
|  [Logo Placeholder]                |
|                                    |
|  --------------------------------  |
|  | Username / Email             |  |
|  --------------------------------  |
|                                    |
|  --------------------------------  |
|  | Password                     |  |
|  --------------------------------  |
|                                    |
|  [ Forgot Password? (Link) ]       |
|                                    |
|  +------------------------------+  |
|  |           LOGIN              |  |
|  +------------------------------+  |
|                                    |
|                                    |
+------------------------------------+

Interaction: User taps on input fields, mobile keyboard appears. Tabs/navigates between fields using keyboard next/previous buttons. Taps LOGIN button.
2.2. Dashboard Page
+------------------------------------+

| BizPoint                           |
|------------------------------------|
| [Menu Icon]   Dashboard    [Online]|
|                                    |
|  +------------------------------+  |

|  |  Today's Sales               |  |

|  |  GHS 0.00                    |  |
|  +------------------------------+  |
|                                    |
|  +------------------------------+  |
|  |  Payments Received           |  |
|  |  GHS 0.00                    |  |
|  +------------------------------+  |
|                                    |
|                                    |

|  [Quick Actions]                   |
|  +------------------------------+  |
|  |      Start New Sale          |  |  <-- Direct access to POS
|  +------------------------------+  |
|                                    |
|  +------------------------------+  |
|  |      Manage Products         |  |  <-- Direct access to Products list
|  +------------------------------+  |
|                                    |
|  +------------------------------+  |
|  |      View Customers          |  |  <-- Direct access to Customers list
|  +------------------------------+  |
|                                    |

Interaction: Taps Menu Icon to navigate. Dashboard is a display-only screen, no direct input here.
2.3. Products Page (List)
+------------------------------------+

| BizPoint                           |
|------------------------------------|
| [Menu Icon]   Products     [Online]|
|                                    |
|  +------------------------------+  |

|  |      Add New Product         |  |

|  +------------------------------+  |
|                                    |
|  Product List                      |

|  --------------------------------  |
|  Product A                         |
|  Price: GHS 10.00                  |
|  Stock: 50                         |
|  [ Edit ] [ Delete ]               |

|  --------------------------------  |
|  Product B                         |
|  Price: GHS 25.50                  |
|  Stock: 12                         |
|  [ Edit ] [ Delete ]               |

|  --------------------------------  |
|  ... (Scrollable List)             |
|                                    |
+------------------------------------+

Interaction: Taps "Add New Product" to go to form. Taps "Edit" or "Delete" next to individual products. List is vertically scrollable.
2.4. Add/Edit Product Page (Form)
+------------------------------------+

| BizPoint                           |
|------------------------------------|
| [Back Icon] Add Product    [Online]|
|                                    |
|  Product Name:                     |
|  --------------------------------  |

|  | e.g., Mobile Phone           |  |

|  --------------------------------  |
|                                    |
|  Selling Price (GHS):              |

|  --------------------------------  |
|  | 500.00                       |  |
|  --------------------------------  |
|                                    |
|  Cost Price (GHS):                 |

|  --------------------------------  |
|  | 350.00                       |  |
|  --------------------------------  |
|                                    |
|  Quantity in Stock:                |

|  --------------------------------  |
|  | 20                           |  |
|  --------------------------------  |
|                                    |
|  +------------------------------+  |
|  |           SAVE               |  |
|  +------------------------------+  |
|                                    |
+------------------------------------+

Interaction: Taps input fields, uses numeric or text keyboard. Keyboard "Next" button for field navigation. Taps SAVE button. Taps Back Icon to return to list.
2.5. Stock Page (Add/Adjust)
+------------------------------------+

| BizPoint                           |
|------------------------------------|
| [Menu Icon]   Stock        [Online]|
|                                    |
|  Add New Stock / Adjust            |
|                                    |
|  Select Product:                   |
|  ----------------------------------|

|  | Product A (50 in stock)  [v] |  |

|  ----------------------------------|
|                                    |
|  Quantity Received / New Quantity: |

|  --------------------------------  |
|  | 10                           |  |

|  --------------------------------  |
|                                    |
|  Supplier Name (Optional):         |

|  --------------------------------  |
|  | ABC Wholesalers              |  |
|  --------------------------------  |
|                                    |
|  +------------------------------+  |
|  |     UPDATE STOCK             |  |
|  +------------------------------+  |
|                                    |
|  +------------------------------+  |
|  |     VIEW STOCK HISTORY       |  |
|  +------------------------------+  |
|                                    |
+------------------------------------+

Interaction: Taps dropdown for product selection. Uses numeric/text keyboard for quantities/supplier. Taps UPDATE STOCK. Taps VIEW STOCK HISTORY to navigate.
2.6. Stock History Page
+------------------------------------+

| BizPoint                           |
|------------------------------------|
| [Back Icon] Stock History  [Online]|
|                                    |
|  Stock Movement Log                |
|  --------------------------------  |
|  2025-06-24 10:30 AM               |
|  Product A: +10 units              |
|  Reason: Received (ABC Wholesalers)|
|  --------------------------------  |
|  2025-06-24 09:15 AM               |
|  Product B: -2 units               |
|  Reason: Sale #1234                |
|  --------------------------------  |
|  ... (Scrollable List)             |
|                                    |

+------------------------------------+

Interaction: Vertically scrollable list. Taps Back Icon to return.
2.7. Customers Page (List)
+------------------------------------+

| BizPoint                           |
|------------------------------------|
| [Menu Icon]   Customers    [Online]|
|                                    |
|  +------------------------------+  |

|  |       Add New Customer       |  |
|  +------------------------------+  |
|                                    |
|  Customer List                     |

|  --------------------------------  |
|  John Doe                          |
|  Phone: +233-241234567             |
|  [ Edit ] [ Delete ]               |

|  --------------------------------  |
|  Jane Smith                        |
|  Phone: +233-551234567             |
|  [ Edit ] [ Delete ]               |

|  --------------------------------  |
|  ... (Scrollable List)             |
|                                    |
+------------------------------------+

Interaction: Taps "Add New Customer" to go to form. Taps "Edit" or "Delete" next to individual customers. List is vertically scrollable.
2.8. Add/Edit Customer Page (Form)
+------------------------------------+

| BizPoint                           |
|------------------------------------|
| [Back Icon] Add Customer   [Online]|
|                                    |
|  Customer Name:                    |
|  --------------------------------  |

|  | e.g., Kwame Mensah           |  |

|  --------------------------------  |
|                                    |
|  Phone Number:                     |

|  --------------------------------  |
|  | +233-201234567               |  |
|  --------------------------------  |
|                                    |
|  +------------------------------+  |
|  |           SAVE               |  |
|  +------------------------------+  |
|                                    |
+------------------------------------+

Interaction: Taps input fields, uses numeric or text keyboard. Keyboard "Next" button for field navigation. Taps SAVE button. Taps Back Icon to return to list.
2.9. POS View (Main Sales Interface)
+------------------------------------+

| BizPoint                           |
|------------------------------------|
| [Menu Icon] Point of Sale  [Online]|
|                                    |
|  --------------------------------  |

|  | Search Product...            |  |

|  --------------------------------  |
|                                    |
|  Selected Items:                   |

|  --------------------------------  |
|  Desc: Product A
   Quantity: 2                       |
|  Price: GHS 10.00
    Total: GHS 10.00                   |
|  
Add Item
Remove Item

|  --------------------------------  |
|   Subtotal: GHS 60.00  
    TOTAL: GHS 100.00                  |
|                                    |
|  Customer:                         |

|  --------------------------------  |
|  | Search Customer... / Add New |  |
|  --------------------------------  |
|                                    |
|  Payment Method:                   |
|  [ ] Cash     [ ] Mobile Money     |
|                                    |
|  +------------------------------+  |
|  |         COMPLETE SALE        |  | <---- Invoice Preview
|  +------------------------------+  |
|                                    |
|  +------------------------------+  |
|  |       VIEW SALES HISTORY     |  |
|  +------------------------------+  |
|                                    |
+------------------------------------+

Interaction: Taps product search bar, keyboard appears. Taps result to add to cart. Taps quantity to adjust (small +/- buttons or direct input). Taps 'X' to remove item. Taps customer search, gets list or 'Add New Customer' modal. Taps radio button for payment. Taps COMPLETE SALE. Taps VIEW SALES HISTORY to navigate.
2.10. Receipt PreView (Post-Sale)
+------------------------------------+

| BizPoint                           |
|------------------------------------|
| [Back Icon] Sale Complete  [Online]|
|                                    |
|  Sale Successful!                  |
|                                    |
|  --------------------------------  |

|  |         RECEIPT              |  |

|  |Company Logo
    Company Name                   |
|  | Date: 2025-06-24 10:45 AM      |
|  | Receipt No: BP-20250624-001    |
|  |                                |
|  | Item            Qty   Price    |
|  | Product A       1     GHS 10.00|
|  | Product C       2     GHS 50.00|
|  |--------------------------------|
|  | Total:          GHS 60.00    |
|  | Payment: Mobile Money          |
|  |                                |
|  | Thank You!                     |
|  --------------------------------  |
|                                    |
|  +------------------------------+  |
|  |       DOWNLOAD PDF                 |  |
|  +------------------------------+  |
|                                    |
|  +------------------------------+  |
|  |       Share WhatsApp            |  |
|  +------------------------------+  |
|                                    |
+------------------------------------+

Interaction: Displays automatically. Taps PRINT or DOWNLOAD PDF. Taps Back Icon to return to POS.
2.11. Sales / Invoices View (List)
+------------------------------------+

| BizPoint                           |
|------------------------------------|
| [Back Icon] Sales History  [Online]|
|                                    |
|  Sales Transactions                |
|  --------------------------------  |
|  2025-06-24 (Today)                |
|  Receipt #BP-001                   |
|  Customer: John Doe                |
|  Total: GHS 60.00                  |
|  [ View Invoice ]                  |
|  --------------------------------  |
|  2025-06-23                        |
|  Receipt #BP-000                   |
|  Customer: Anonymous               |
|  Total: GHS 25.00                  |
|  [ View Invoice ]                  |
|  --------------------------------  |
|  ... (Scrollable List)             |
|                                    |

+------------------------------------+

Interaction: Vertically scrollable list. Taps "View Invoice" to navigate to invoice detail. Taps Back Icon to return to POS.
2.12. Invoice PreView (Detail)
+------------------------------------+

| BizPoint                           |
|------------------------------------|
| [Back Icon] Invoice Detail [Online]|
|                                    |
|  --------------------------------  |

|  |          INVOICE             |  |

|  | Company Logo
    Company Name                   |
|  | Date: 2025-06-24 10:45 AM      |
|  | Invoice No: BP-20250624-001    |
|  |                                |
|  | Customer: John Doe             |
|  | Phone: +233-241234567          |
|  |                                |
|  |  Desc: Product A
   Quantity: 2                       |
|  Price: GHS 10.00
    Total: GHS 10.00                   |
|  
Add Item
Remove Item|
|  |--------------------------------|
|  | Subtotal:       GHS 60.00    |
|  | Total:          GHS 60.00    |
|  | Payment: Mobile Money          |
|  --------------------------------  |
|                                    |
|  +------------------------------+  |
|  |       DOWNLOAD PDF                 |  |
|  +------------------------------+  |
|                                    |
|  +------------------------------+  |
|  |       Share WhatsApp            |  |
|  +------------------------------+  |
|                                    |
+------------------------------------+

Interaction: Displays historical invoice. Taps PRINT or DOWNLOAD PDF. Taps Back Icon to return to sales list.
2.13. User Profile Page
+------------------------------------+

| BizPoint                           |
|------------------------------------|
| [Back Icon] My Profile     [Online]|
|                                    |
|  User Name: Benjamin               |
|                                    |
|  Email: <user@example.com>           |
|                                    |
|  +------------------------------+  |

|  |      Change Password         |  |
|  +------------------------------+  |
|                                    |
|                                    |
+------------------------------------+

Interaction: Taps "Change Password" to initiate password change flow (not detailed here, but a separate simple form). Taps Back Icon to return.
This comprehensive wireframe provides a clear visual and interactive guide for building BizPoint with a mobile-first philosophy, Benjamin. It should give the AI agent a solid foundation for the UI development.
