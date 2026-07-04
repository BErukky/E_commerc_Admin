# E-Commerce Admin Dashboard

A full-stack, responsive E-Commerce Admin Dashboard built from scratch using **Next.js (App Router)**, **TypeScript**, and **MongoDB**. This project was developed as a technical assessment to demonstrate proficiency in modern web development, database integration, and UI/UX design.

---

## 🚀 What Was Built (Project Journey)

Here is a step-by-step breakdown of how this project was constructed from start to finish:

### 1. Foundation & Layout

- **Next.js App Router Setup**: Initialized the project using Next.js 15, React 19, and TypeScript for robust, type-safe development.
- **Styling Architecture**: Configured **Tailwind CSS** for rapid UI development, focusing on a clean, modern, and premium dark/light mode aesthetic.
- **Global Layouts**: Built a responsive, mobile-first layout featuring a collapsible **Sidebar** (with backdrop overlays for mobile) and a top **Header**. Global state for the sidebar was managed using React Context (`SidebarProvider`).

### 2. Dashboard Analytics

- **Recharts Integration**: Built the main dashboard view to display key metrics. Integrated `recharts` to render interactive data visualizations, including a Revenue Bar Chart and a Category Distribution Pie Chart.
- **Summary Cards**: Added statistical overview cards for quick insights into total products, low stock items, and overall revenue.

### 3. Database Integration (MongoDB)

- **MongoDB Atlas Setup**: Configured a cloud MongoDB cluster and established a secure connection pool in Next.js using `mongoose`.
- **Data Modeling**: Designed and implemented strict Mongoose schemas for the application's core entities:
  - **Category Model**: Stores category name, slug, description, theme color, and icons.
  - **Product Model**: Stores SKU, name, pricing, stock levels, min/max thresholds, and relationships to categories.

### 4. Server Actions & Data Fetching

- Leveraged Next.js **Server Actions** to handle backend logic safely without exposing API endpoints.
- Created robust functions (`getProducts`, `addProduct`, `getCategories`, `addCategory`) to fetch live data from MongoDB and mutate the database.
- Implemented `revalidatePath` to instantly refresh the UI whenever new data is added to the database.

### 5. Interactive Pages & UI Components

Refactored the application to use a Server Component / Client Component split pattern:

- **Categories Page**: Fetches live categories from MongoDB. Features grid/table view toggles and color-coded UI cards.
- **Products Page**: Fetches live products. Features client-side searching and filtering by category.
- **Inventory Page**: Tracks stock quantities against minimum thresholds, featuring dynamic progress bars and visual warnings for low/out-of-stock items.

### 6. Pop-up Modals (Form Submission)

- Built custom, animated pop-up modals for adding new records to the database.
- **Add Category Modal**: Collects name, slug, color, and icon.
- **Add Product Modal**: Dynamically pulls in live categories from the database into a select dropdown, ensuring products are assigned to valid categories.

---

## 🛠️ Tech Stack Used

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Lucide React (Icons)
- **Database:** MongoDB Atlas
- **ORM:** Mongoose
- **Charts:** Recharts
- **State Management:** React Hooks (`useState`, `useTransition`, Context API)
- **Authentication:** NextAuth.js (Auth.js)

---

## 📁 Project Structure

```text
.
├── app/
│   ├── actions/          # Server Actions for DB mutations (product-actions.ts, etc.)
│   ├── dashboard/        # Dashboard routes (products, categories, inventory)
│   ├── layout.tsx        # Global layout and Auth provider
│   └── page.tsx          # Landing/Login page
│
├── components/
│   ├── dashboard/        # Modals, Charts, and UI components
│   └── layout/           # Sidebar, Header, and SidebarProvider
│
├── lib/
│   ├── db.ts             # MongoDB connection logic
│   └── auth.ts           # NextAuth configuration
│
├── models/               # Mongoose Database Schemas
│   ├── Category.ts
│   └── Product.ts
│
└── .env.local            # Environment variables (MongoDB URI, Auth Secrets)
```

---

## ⚙️ How to Run Locally

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory and add your MongoDB connection string and Auth secrets:

```env
# Your MongoDB Atlas Connection String
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/ecommerce-admin?appName=Cluster0"

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_a_random_secret_here

# Default Admin Login (for development bypass)
ADMIN_USERNAME=admin@example.com
ADMIN_PASSWORD=admin
```

### 3. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Hosting & Deployment

The application is built to be easily deployable using modern cloud infrastructure:

- **Frontend & Backend Hosting (Vercel):** The entire Next.js application (including the React frontend and the Server Actions backend) is hosted seamlessly on **Vercel**. Vercel was chosen because it is optimized for Next.js, automatically handling serverless functions and edge routing.
- **Database Hosting (MongoDB Atlas):** The database is hosted on **MongoDB Atlas**, providing a secure, scalable, and fully managed cloud database. The Vercel application securely communicates with MongoDB Atlas via the `MONGODB_URI` environment variable.

---

## 🎯 Future Improvements

While the core requirements for the assessment have been met, future iterations could include:

- Cloudinary integration for actual image uploads instead of emojis.
- Full CRUD operations (Edit and Delete functionality inside the tables).
- Advanced server-side pagination for handling thousands of products.
- Exporting inventory reports to CSV/PDF.
