# Missouri Bail Bonds

A full-stack web application for Jody Story Bail Bonds providing 24/7 bail bond services, jail release information, and county/city service area coverage across Missouri.

---

## 🚀 Features

- **Full-Stack Express + Vite Architecture**: Ultra-fast server-rendered SPA handling dynamic routes, canonical tag injection, and sitemap generation.
- **Dynamic County & City Routing**: Detailed pages for over 20+ Missouri counties and cities with customized SEO schemas (`BreadcrumbList`, `LegalService`, `FAQPage` JSON-LD).
- **SEO & Canonical URL Handling**: Dynamic sitemap builder (`scripts/generateSitemap.ts`) and automatic server-side head metadata injection.
- **24/7 Jail Release & Contact**: Fast contact form with optional Resend API email integration.
- **Fully Responsive & Accessible**: Custom Tailwind CSS styling and Lucide icons.

---

## 🛠️ Getting Started Locally

### Prerequisites

- **Node.js**: v18.x or v20.x or higher
- **npm**: v9.x or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.NAME.git
   cd YOUR_REPOSITORY_NAME
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and fill in any necessary values:
   ```bash
   cp .env.example .env
   ```

   ```env
   # .env
   GEMINI_API_KEY="your-gemini-api-key"
   APP_URL="https://your-domain.com"
   RESEND_API_KEY="your-resend-api-key"
   VITE_CONTACT_EMAIL="jodystory95@yahoo.com"
   VITE_FROM_EMAIL="Jody Story Bail Bonds <onboarding@resend.dev>"
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 📦 Building & Production Execution

To test the production build locally:

```bash
# Typecheck and build the client bundle & Express server
npm run build

# Start the production Express server
npm start
```

---

## 🌐 Deploying from GitHub

### Option 1: Exporting to GitHub from AI Studio

1. In Google AI Studio, click the **Settings / Export** menu in the top right.
2. Select **Export to GitHub** (or connect your GitHub account).
3. Choose your target repository name and push your code directly.

### Option 2: Deploying to Cloud Hosts (Render, Railway, Fly.io, Cloud Run)

Since this app uses Express to serve the Vite frontend and API routes:

- **Docker Container**: A production-ready `Dockerfile` is included in the project root.
  - Simply connect your GitHub repository to **Render**, **Railway**, or **Google Cloud Run**, and select **Docker** as the runtime.
  - Set required Environment Variables (`PORT=3000`, `RESEND_API_KEY`, etc.) in your hosting provider dashboard.
- **Node Server**:
  - Build Command: `npm run build`
  - Start Command: `npm start`

### Option 3: Continuous Integration (GitHub Actions)

This repository includes a `.github/workflows/ci.yml` GitHub Actions workflow. On every push or pull request to `main` or `master`, GitHub Actions will automatically run:
1. `npm ci` (Dependency installation)
2. `npm run lint` (TypeScript typechecking)
3. `npm run build` (Sitemap generation + Vite & server compilation)

---

## 📄 License

Private repository for Jody Story Bail Bonds LLC. All rights reserved.
