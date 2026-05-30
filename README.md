# ✈️ BabaFly — Private Jet Charter Platform

> A full-featured, luxury private jet charter web application built during the **InfoBharat Interns** frontend internship program.

![BabaFly Banner](https://img.shields.io/badge/BabaFly-Private%20Jet%20Charter-blue?style=for-the-badge&logo=airplane)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=flat-square&logo=redux)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?style=flat-square&logo=tailwindcss)

---

## 📌 Project Overview

**BabaFly** is a premium private jet charter booking platform that allows users to browse luxury aircraft, filter by category and specifications, manage a cart, complete checkout, and track orders. The project simulates a real-world e-commerce flow for a high-end aviation service.

---

## 🚀 Live Demo

> 🔗 **Deployment Link:** _(https://baba-fly.vercel.app/)_

---

## 🎯 Features

- 🏠 **Home Page** — Hero section, stats bar, featured fleet, services, testimonials & CTA
- 🛩️ **Aircraft Listing** — Browse all jets with real-time search, filters, sorting & pagination
- 🔍 **Aircraft Details** — Full specifications, gallery, range map & charter rate breakdown
- 🗂️ **Categories** — Browse jets by class (Ultra Long Range, Long Range, Light Jet, etc.)
- 🛒 **Cart** — Add/remove aircraft charters, persisted via localStorage
- 💳 **Checkout** — Multi-step booking form with passenger details, route & payment info
- 📦 **Orders** — View all past and upcoming charter orders
- 📋 **Order Details** — Full breakdown of individual booking
- 🔐 **Authentication** — Login & Register with JWT-based auth flow
- 🔒 **Protected Routes** — Cart, Checkout, Orders require authentication
- 📱 **Fully Responsive** — Mobile, tablet & desktop layouts
- ✨ **Animations** — Framer Motion powered transitions and micro-interactions

---

## 🛠️ Tech Stack

| Category       | Technology                              |
|----------------|----------------------------------------|
| Framework      | React 19                               |
| Build Tool     | Vite 8                                 |
| Styling        | TailwindCSS 4                          |
| State Mgmt     | Redux Toolkit + React-Redux            |
| Routing        | React Router DOM v7                    |
| Forms          | React Hook Form + Yup validation       |
| HTTP Client    | Axios (with instance & interceptors)   |
| Animations     | Framer Motion                          |
| Icons          | Lucide React                           |
| Notifications  | React Hot Toast                        |

---

## 📁 Project Structure

```
babafly/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images and media
│   ├── components/          # Reusable UI components
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── FeaturedFleet.jsx
│   │   ├── Testimonials.jsx
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   ├── layouts/             # Page layout wrappers (MainLayout)
│   ├── pages/               # Route-level page components
│   │   ├── Home.jsx
│   │   ├── AircraftListing.jsx
│   │   ├── AircraftDetails.jsx
│   │   ├── Categories.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Orders.jsx
│   │   ├── OrderDetails.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── redux/               # Redux store slices
│   │   ├── store.js
│   │   ├── authSlice.js
│   │   ├── cartSlice.js
│   │   └── ordersSlice.js
│   ├── routes/              # Route guards (ProtectedRoute)
│   ├── services/            # API service layer (api.js)
│   ├── utils/               # Utilities, mock data, axios instance
│   ├── App.jsx              # Root component with routing
│   ├── main.jsx             # App entry point
│   ├── index.css            # Global styles
│   └── App.css              # Component styles
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🔌 API Integration

The app uses a **mock API service layer** (`src/services/api.js`) structured to mirror real REST API calls:

| API Module      | Endpoints Simulated                              |
|-----------------|--------------------------------------------------|
| `authAPI`       | `login()`, `register()`                          |
| `productsAPI`   | `getAll()` (with filters/sort/paginate), `getById()`, `search()` |
| `categoriesAPI` | `getAll()`, `getBySlug()`                        |
| `ordersAPI`     | `getAll()`, `getById()`, `create()`              |
| `cartAPI`       | `getCart()`, `syncCart()`                        |

> Each API call simulates async network delay and error handling. When a real backend is available, simply replace the mock implementations with actual `axios` calls — the interface remains identical.

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### Installation & Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/babafly.git

# 2. Navigate to the project directory
cd babafly

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 🌐 Deployment

This project is deployed using **Vercel** / **Netlify** (static site hosting).

To deploy your own instance:

1. Push the project to GitHub
2. Import the repo on [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
3. Set the **Build Command** to `npm run build`
4. Set the **Output Directory** to `dist`
5. Deploy!

---

## 📸 Screenshots

> _(Add screenshots of your app pages here)_

| Page               | Preview |
|--------------------|---------|
| Home               | _screenshot_ |
| Aircraft Listing   | _screenshot_ |
| Aircraft Details   | _screenshot_ |
| Checkout           | _screenshot_ |
| Orders             | _screenshot_ |

---

## 👤 Author

**Mohammed Rizwaan**
- 🎓 Frontend Intern at **InfoBharat Interns**
- 🔗 LinkedIn: _(Add your LinkedIn profile URL)_
- 🐙 GitHub: _(Add your GitHub profile URL)_

---

## 🏆 Internship Submission

This project was built as part of the **InfoBharat Interns** Frontend Development Internship.

- ✅ Complete frontend project uploaded to GitHub
- ✅ README with full setup instructions
- ✅ Responsive UI (mobile, tablet, desktop)
- ✅ API integration layer
- ✅ State management with Redux Toolkit
- ✅ Protected routes with auth flow
- ✅ Multi-page application with React Router

---

## 📄 License

This project is for educational purposes as part of an internship program.
