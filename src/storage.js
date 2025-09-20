// storage.js - simple wrapper for localStorage (can be swapped with Firebase later)
export const storage = {
  load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      console.warn("Failed to parse storage for", key, e);
      return fallback;
    }
  },
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Failed to save storage for", key, e);
    }
  },
  clear(key) {
    localStorage.removeItem(key);
  }
};
