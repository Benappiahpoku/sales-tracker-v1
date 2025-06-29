# 📄 Product Requirements Document (PRD): Sales Tracker – Landing Page

## 1. Overview

**Purpose:**
To build a clean, mobile-friendly landing page for *Sales Tracker*, a simple offline-first sales management tool designed for Ghanaian SMEs.

**Target Audience:**
Small business owners in Ghana who need a lightweight tool to manage sales, stock, and customers — with or without internet access.

**Core Message:**
“Track and manage your business offline or online — simple, fast, and built for Ghana.”

---

## 2. Page Structure & Components

### 2.1 Navigation Bar

**Location:** Fixed at the top
**Items (Left to Right):**

* Logo + “Sales Tracker”
* Links: Home | My Biz | Pricing | About | Contact
* Right: Avatar or “Sign In” button

**Behavior:**

* Mobile responsive (collapsible menu)
* "My Biz" routes to the /dashboard route
* “About,” and “Contact” route to new pages /about and /contact routes

---

### 2.2 Hero Section

**Content:**

* Headline: *“Your Offline Sales Companion”*
* Subtext: *“Manage your business – anytime, anywhere, even without internet.”*
* Main CTA Button: **“Manage My Biz”**  → Routes directly to dashboard (no sign-in) /dashboard route
* Optional: App screenshot or icon illustration

---

### 2.3 Why Choose Us

**Layout:** 3–4 simple blocks with icons/text
**Examples:**

* “Works perfectly offline”
* “No sign-up required to get started”
* “Built for Ghanaian businesses”
* “Export anytime – your data is yours”

---

### 2.4 Key Features

**Content:** Use icon cards (grid layout)
**Features:**

* Add & manage customers
* Track product stock
* Generate sales & invoices
* Export data to PDF or CSV
* Offline-first performance

---

### 2.5 Pricing Section

**Structure:** Three tier cards

* **Free Forever – ₵0/mo or ₵0/mo yearly**

  * 50 invoices
  * 50 customers
  * 50  products, stock
  * 50  stock
  * 1 company
  * Offline use only
  * local storage in Browser
  * manual data backup
  * No sign-in required
  * CTA [ Go to My Biz ] → Routes directly to dashboard (no sign-in)

* **Business (Popular) – ₵40/mo or ₵30/mo yearly**

  * Everything in Free
  * 500 invoices
  * 500 customers
  * 500 products
  * 500 stock
  * 5 companies
  * Sign-in required
  * Cloud data backup
  * CTA: “Subscribe Now”

* **Pro – Contact Sales**

  * Everything in Popular
  * Unlimited invoices
  * Unlimited customers
  * Unlimited products
  * Unlimited stock
  * Unlimited everything
  * Cloud storage, full support
  * CAT: [ Talk to Sales ] → Routes WhatsApp Contact

**Additional UI Element:**

* Toggle switch for Monthly / Yearly pricing

  * ₵50/mo
  * ₵40/mo (₵480 billed yearly)

---

### 2.6 FAQ Section

**Suggested Questions & Answers:**

1. **Do I need internet to use Sales Tracker?**
   No. You can use the app fully offline. Just open it and start managing your business. Internet is only needed for backup or syncing if you're on a paid plan.

2. **What does “My Biz” mean?**
   “My Biz” is your personal dashboard. It’s where you manage your customers, products, stock, and sales all in one place.

3. **Can I start without signing in?**
   Yes. Our Free Forever plan lets you use Sales Tracker without any sign-in. Just save the app and you’re good to go.

4. **Can I export my data?**
   Absolutely. You can export your invoices, customer lists, or product data as PDF or CSV anytime.

5. **What happens when I switch to the cloud plan?**
   Your data will be synced online automatically, allowing you to access it from anywhere. You'll also be able to restore your data in case your device is lost or changed.

---

### 2.7 Footer

**Contents:**

* Links: Home, About, Pricing, Contact
* Contact info (Email or WhatsApp)
* Tag: “Made in Ghana”
* Optional small text: “Built with [heart Icon] by TekLumen”

---

## 3. Technical Considerations

* **Framework:** Vue.js with Tailwind CSS
* **Responsive Design:** Must work seamlessly across mobile, tablet, and desktop
* **Routing:** Use Vue Router for all internal navigation
* **SEO & Load Speed:** Optimized meta tags, preload important assets
* **Accessibility:** Proper use of ARIA labels and semantic tags

[ HERO SECTION ]

“Your Offline Sales Companion”
Manage your business – anytime, anywhere,
even without internet.

[ Manage My Biz ]  ← Main CTA Button

[ WHY CHOOSE US ]

✓ Works perfectly offline  
✓ No sign-up required  
✓ Built for Ghana  
✓ Export anytime  

[ KEY FEATURES ]

• Add & manage customers
• Track product stock  
• Generate invoices  
• Export to PDF/CSV  
• Offline-first, lightweight  

[ PRICING + TOGGLE ]

Toggle: [ Monthly | Yearly ]  

[ FREE FOREVER ]

50 invoices
50 customers
50  products, stock
50  stock
1 company
Offline use only
local storage in Browser
manual data backup
No sign-in required
CTA [ Go to My Biz ] → Routes directly to dashboard (no sign-in)

[ POPULAR PLAN - ₵40/mo ]
 Everything in Free

500 invoices
500 customers
500 products
500 stock
5 companies
Sign-in required
Cloud data backup
CTA: “Subscribe Now”

[ ENTERPRISE ]

Everything in Popular
Unlimited invoices
Unlimited customers
Unlimited products
Unlimited stock
Unlimited everything
Cloud storage, full support
CAT: [ Talk to Sales ] → Routes WhatsApp Contact
[ Talk to Sales ]

[ FAQ SECTION ]

Q: Do I need internet?  
A: Nope. Use it fully offline.

Q: What is “My Biz”?  
A: Your business dashboard.

Q: Can I start without signing in?  
A: Yes, on Free Forever plan.

Q: Can I export data?  
A: Yes, to PDF or CSV.

Q: What happens when I upgrade?  

A: You get cloud sync & backup

[ FOOTER ]

Links: Home | My Biz | About | Pricing | Contact  

Made in Ghana  

Built with [Heart Icon] by TekLumen  

Contact: `<salestracker@app.com>`

## Desktop View

[ HERO SECTION ]

Headline:         “Your Offline Sales Companion”
Subtext:          Manage your business – anytime, anywhere, even offline.

[ Manage My Biz ]       (CTA Button)
[ Illustration or Screenshot on Right Side ]

[ WHY CHOOSE US ] (Grid – 4 columns)

✓ Works perfectly offline     ✓ No sign-up required  
✓ Built for Ghana             ✓ Export anytime  

[ KEY FEATURES ] (Icon Cards – 2 or 3 columns)

🧾 Manage Customers    📦 Track Stock  
📊 Generate Invoices   📤 Export Easily  
📱 Offline-first       ⚙️ Simple & Fast  

[ PRICING SECTION ] + Toggle

Toggle Switch:   [ Monthly | Yearly ]

[ FREE FOREVER ]        [ POPULAR – ₵40/mo ]      [ ENTERPRISE ]
50 items                500 items                Unlimited  
1 company               5 companies              Full support  
Offline only            Cloud + Sign-in          24/7 support  
[ Start Now ]           [ Subscribe Now ]        [ Talk to Sales ]

[ FAQ SECTION ] (Accordion or 2-column Q&A layout)

Q: Do I need internet?         A: Nope. Works offline.  
Q: What’s My Biz?              A: Your dashboard.  
Q: Can I start without sign-in?A: Yes. No sign-up needed.  
Q: Can I export data?          A: Yes. PDF/CSV supported.  
Q: What happens when I upgrade?A: Cloud sync & backup.  

[ FOOTER ]

Links: Home | My Biz | About | Pricing | Contact  

Made in Ghana  

Built with [Heart Icon] by TekLumen  

Contact: `<salestracker@app.com>`
