# 🔗 Shrt.ly — URL Shortener
*A URL shortener with click analytics, built with React, JavaScript, and TailwindCSS.*

---

## ✨ Features

### 🎟️ Link Shortening
- Paste any URL and get a short `shrt.ly/xxxxxx` code instantly.
- Optional **custom alias** (e.g. `shrt.ly/my-portfolio`).
- Client-side URL validation with auto `https://` prefixing.

### 📊 Click Analytics
- Per-link **click counter**.
- **7-day bar chart** (pure CSS, no chart library) showing click activity over time.
- Summary stats: total links, total clicks, average clicks per link.

### 🎨 Design
- Receipt/ticket-style cards with a decorative CSS-only barcode — every shortened
  link looks like a printed ticket.
- Dark theme with lime-green accent, `Space Grotesk` + `JetBrains Mono` typography.
- All styling done via **inline styles** driven by a centralized design-token module
  (`src/styles/tokens.js`), kept consistent across every component.

### 💾 Persistence
- No backend — links and click logs are stored in **localStorage**.
- Survives page refreshes; data is private to your browser.

---

## 🛠️ Technologies

- **React 19** (Hooks, custom hooks, functional components)
- **JavaScript ES6+**
- **TailwindCSS 3** (base reset + global utilities; component styling is inline)
- **Vite 6** (build tool)

---

## 🏗️ Architecture & Best Practices

```
src/
├── components/
│   ├── Header.jsx        # App title and intro copy
│   ├── ShortenForm.jsx   # URL input, validation, custom alias toggle
│   ├── LinkTicket.jsx    # Receipt-style card for each shortened link
│   ├── ClickChart.jsx    # CSS-only 7-day bar chart
│   └── States.jsx        # Empty state + stat pill components
├── hooks/
│   └── useLinks.js       # All link CRUD logic, isolated from UI
├── utils/
│   ├── urlHelpers.js     # Validation, shortcode generation, formatting
│   └── storage.js        # localStorage read/write layer
├── styles/
│   └── tokens.js         # Single source of truth for colors, fonts, spacing
├── App.jsx
└── main.jsx
```

**Key decisions:**
- **Separation of concerns** — UI components never touch `localStorage` directly;
  they go through `useLinks`, which is the only place that knows about persistence.
- **Pure utility functions** (`urlHelpers.js`) are fully testable in isolation,
  with no React or DOM dependencies.
- **Design tokens module** means every inline style references the same palette,
  so changing a color in one place updates the whole app — no Tailwind config
  override needed since styling is inline by design.

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📦 Build

```bash
npm run build
```

## 🌍 Deploy on Vercel

```bash
npm install -g vercel
vercel
```

Or import the repo at [vercel.com](https://vercel.com) — Vite is auto-detected,
no environment variables required.

---

## 🔮 Future Improvements

- Real backend (NestJS + Prisma) for shareable links that work across devices.
- QR code generation for each short link.
- Link expiration dates.
- Geographic click breakdown.
