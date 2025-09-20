# Creator Affiliate Toolkit (Vanilla JS)

A link-in-bio style toolkit for creators/affiliates with simple click analytics, customizable themes, and an admin mode for CRUD links.

## Project Overview
**Problem**: Creators often rely on generic link pages with limited branding and insights.  
**Solution**: A lightweight, customizable toolkit to manage links, track clicks (today/total), and present a branded profile page.

## Technologies Used
- HTML, CSS, Vanilla JavaScript (simple, beginner-friendly)
- localStorage for persistence (no backend required for MVP)
- Optional Pro Track: Firebase Auth + Firestore (for logs & auth)

*Why these?* Lightweight stack keeps the learning curve low and speeds up delivery. Firebase unlocks auth and analytics if you choose to upgrade to a full web app.

## Features
**MVP**
- Profile (avatar, name, bio), themes (Sunrise, Midnight, Mint)
- CRUD links (title, URL, icon/emoji, pin to top)
- Click analytics: today & total counters
- Public view and admin mode

**Pro Track (optional)**
- Firebase Auth (admin login)
- Firestore (timestamped click logs)
- Simple charts for daily clicks

## Setup Instructions
**Option A: Open directly (no tooling)**
1. Download this project.
2. Open `index.html` with VS Code **Live Server** (or double-click in your browser).

**Option B: Serve with any static server**
```bash
# using python
python -m http.server 3000
# open http://localhost:3000
```

## AI Support Explanation (development-only)
- Used AI (IBM Granite/assistant) to scaffold HTML/CSS structure and boilerplate JS.
- Requested refactoring & readability improvements for state management and click counting.
- Drafted README structure and presentation outline.
- AI NOT included in the final runtime; it only assisted during development (as per brief).

## Deployment
- Netlify/Vercel/Firebase Hosting: drag & drop the folder or connect your GitHub repo.
- After deployment, you’ll get a public URL for submission.

dex.html?mode=admin`

© 2025 Creator Affiliate Toolkit
