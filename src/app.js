// app.js - wire everything together
import { storage } from "./storage.js";
import { uuid, createDefaultState, validateUrl, resetTodayIfNeeded, getTodayISO } from "./model.js";
import { renderProfile, renderLinks, fillForm, getFormData, setProfileForm, readProfileForm } from "./ui.js";

const KEY = "creator_affiliate_toolkit_state";

let state = storage.load(KEY, createDefaultState());
resetTodayIfNeeded(state);
storage.save(KEY, state);

const params = new URLSearchParams(location.search);
const isAdminMode = params.get("mode") === "admin";

// Elements
const adminPanel = document.getElementById("adminPanel");
const publicView = document.getElementById("publicView");
const linkForm = document.getElementById("linkForm");
const themeToggle = document.getElementById("themeToggle");
const adminToggle = document.getElementById("adminToggle");
const resetTodayBtn = document.getElementById("resetTodayBtn");
const saveProfileBtn = document.getElementById("saveProfileBtn");
const exportBtn = document.getElementById("exportBtn");
const importFile = document.getElementById("importFile");
const yearEl = document.getElementById("year");

yearEl.textContent = new Date().getFullYear();

function syncViewMode() {
  if (isAdminMode) {
    adminPanel.hidden = false;
    publicView.hidden = false;
    adminToggle.textContent = "Public Mode";
    adminToggle.href = location.pathname;
    setProfileForm(state.profile);
  } else {
    adminPanel.hidden = true;
    publicView.hidden = false;
    adminToggle.textContent = "Admin Mode";
    const url = new URL(location.href);
    url.searchParams.set("mode", "admin");
    adminToggle.href = url.toString();
  }
}

function saveState() {
  storage.save(KEY, state);
  render();
}

function render() {
  renderProfile(state);
  renderLinks(state, {
    onClick: (link) => {
      // count & open in new tab
      link.clicks.total += 1;
      const today = getTodayISO();
      // daily counter stored as numeric; reset logic handled elsewhere
      link.clicks.today += 1;
      saveState();
      window.open(link.url, "_blank", "noopener");
    },
    onEdit: (link) => {
      fillForm(link);
      document.getElementById("titleInput").focus();
    },
    onDelete: (link) => {
      state.links = state.links.filter(l => l.id !== link.id);
      saveState();
    },
    onPin: (link) => {
      link.pinned = !link.pinned;
      saveState();
    }
  });
}

linkForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = getFormData();
  if (!data.title || !validateUrl(data.url)) {
    alert("Please enter a valid title and URL (http/https).");
    return;
  }
  const editingId = document.getElementById("editingId").value;
  if (editingId) {
    const idx = state.links.findIndex(l => l.id === editingId);
    if (idx >= 0) {
      state.links[idx].title = data.title;
      state.links[idx].url = data.url;
      state.links[idx].icon = data.icon;
      state.links[idx].pinned = data.pinned;
    }
  } else {
    state.links.push({
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
      title: data.title,
      url: data.url,
      icon: data.icon || "🔗",
      pinned: data.pinned,
      clicks: { total: 0, today: 0 }
    });
  }
  // clear form
  e.target.reset();
  document.getElementById("editingId").value = "";
  saveState();
});

themeToggle.addEventListener("click", () => {
  const themes = ["theme-sunrise", "theme-midnight", "theme-mint"];
  const current = state.profile.theme || themes[0];
  const next = themes[(themes.indexOf(current) + 1) % themes.length];
  state.profile.theme = next;
  saveState();
});

resetTodayBtn.addEventListener("click", () => {
  state.links.forEach(l => l.clicks.today = 0);
  saveState();
});

saveProfileBtn.addEventListener("click", () => {
  const p = readProfileForm();
  state.profile.name = p.name || state.profile.name;
  state.profile.bio = p.bio || state.profile.bio;
  state.profile.avatar = p.avatar || state.profile.avatar;
  state.profile.theme = p.theme || state.profile.theme;
  saveState();
});

exportBtn.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "creator_affiliate_toolkit_export.json";
  a.click();
  URL.revokeObjectURL(a.href);
});

importFile.addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const text = await file.text();
  try {
    const imported = JSON.parse(text);
    // naive shape check
    if (!imported || !Array.isArray(imported.links) || !imported.profile) throw new Error("Invalid file");
    state = imported;
    saveState();
    alert("Import successful.");
  } catch (err) {
    alert("Import failed: " + err.message);
  }
});

// initial render
syncViewMode();
render();
