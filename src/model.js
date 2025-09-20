// model.js - data schema & utilities
export function uuid() {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
}

export function getTodayISO() {
  const d = new Date();
  return d.toISOString().slice(0,10); // YYYY-MM-DD
}

export function validateUrl(url) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function createDefaultState() {
  return {
    profile: { name: "Your Name", bio: "Short bio or tagline", avatar: "./assets/avatar.png", theme: "theme-sunrise" },
    links: [
      { id: uuid(), title: "Portfolio", url: "https://example.com", icon: "🗂️", pinned: true, clicks: { total: 0, today: 0 } },
      { id: uuid(), title: "YouTube", url: "https://youtube.com", icon: "▶️", pinned: false, clicks: { total: 0, today: 0 } }
    ],
    lastOpenDate: getTodayISO()
  };
}

export function resetTodayIfNeeded(state) {
  const today = getTodayISO();
  if (state.lastOpenDate !== today) {
    state.links.forEach(l => l.clicks.today = 0);
    state.lastOpenDate = today;
  }
}

export function sortLinks(links) {
  return [...links].sort((a,b) => Number(b.pinned) - Number(a.pinned));
}
