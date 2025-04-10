# 🥗 FoodExpo — Food Product Explorer

Welcome to **FoodExpo**, a modern and responsive web application that allows users to explore food products using the OpenFoodFacts API. With a sleek UI and powerful features like barcode scanning, category filtering, nutritional info display, and cart support — FoodExpo is your ultimate food discovery app.

![FoodExpo Banner](./frontend/public/OG.png)

---

## 🚀 Features

### 🌐 Homepage
- Displays a responsive grid of food products.
- Shows key details like name, image, category, and nutrition grade.
- Optimized infinite scroll (Load More) with scroll-to-product animation.

### 🔍 Smart Search
- Search products by **name**.
- Search by **barcode** using camera scanner powered by `@zxing/browser`.

### 📂 Filter & Sort
- Filter by category with dynamic dropdown from OpenFoodFacts.
- Sort by:
  - Name (A-Z, Z-A)
  - Nutrition Grade (↑/↓)

### 📦 Product Detail Page
- Full product information:
  - Ingredients
  - Nutrition facts (per 100g)
  - Labels
- Share button with Web Share API or fallback to clipboard.
- Add to cart with animation + toast.

### 🛒 Cart Sidebar
- View added items in a slide-out panel.
- Remove or clear items.

### 🎨 Modern Design
- Fully responsive (mobile-first).
- Beautiful UI using **Tailwind CSS**.
- Animations with **Framer Motion**.

---

## 🧱 Tech Stack

- **React 19**
- **Tailwind CSS 4**
- **Vite**
- **React Router v7**
- **Framer Motion**
- **React Hot Toast**
- **@zxing/browser** for barcode scanning

---

## 📁 Project Structure

```bash
Food_Product_Explorer/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── public/
│   │   ├── OG.png
│   └── src/
│       ├── App.jsx, main.jsx
│       ├── assets/
│       ├── context/         # Cart context
│       ├── hooks/           # useProductFetcher
│       ├── services/        # API integration
│       ├── components/
│       │   ├── Global.Module/       # Navbar, Loader, etc
│       │   ├── Home.Module/         # ProductCard, Explorer
│       │   └── ProductDetail.Module/ # Image, Info
│       └── pages/           # Home, ProductDetail
```

---

## ⚙️ Installation & Run

### 1. Clone the Repo
```bash
git clone https://github.com/dhruv457457/Food_Product_Explorer.git
cd Food_Product_Explorer/frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Dev Server
```bash
npm run dev
```

---

## 🌐 Deployment
This project is optimized for Vercel. Already includes:
- `vercel.json` for SPA fallback
- Production-ready Tailwind/Vite config

To deploy:
```bash
vercel deploy
```

---

## 🗕️ Time Taken
**⏱️ 4 Days**

---

## 📚 API Reference
- **OpenFoodFacts**: [https://world.openfoodfacts.org/](https://world.openfoodfacts.org/)

---

## 🤝 Credits
- OpenFoodFacts for the public API
- Lucide Icons
- ZXing Barcode Scanner
- Tailwind UI inspiration

---

## 📄 License
MIT — Feel free to use & enhance!

---

## ✨ Author
**Dhruv Pancholi** — [LinkedIn](https://www.linkedin.com/in/dhruv-pancholi-222704250/) | [GitHub](https://github.com/dhruv457457)
