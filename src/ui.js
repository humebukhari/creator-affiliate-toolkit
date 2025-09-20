// ui.js - render functions
import { sortLinks } from "./model.js";

export function renderProfile(state) {
  document.getElementById("displayName").textContent = state.profile.name;
  document.getElementById("bio").textContent = state.profile.bio;
  const avatar = document.getElementById("avatar");
  avatar.src = state.profile.avatar || "./assets/avatar.png";
  document.body.className = state.profile.theme || "theme-sunrise";
}

export function renderLinks(state, { onClick, onEdit, onDelete, onPin }) {
  const list = document.getElementById("linksList");
  list.innerHTML = "";
  const items = sortLinks(state.links);
  items.forEach(link => {
    const li = document.createElement("li");
    li.className = "link-card";

    const left = document.createElement("div");
    left.className = "link-left";
    const icon = document.createElement("span");
    icon.className = "icon";
    icon.textContent = link.icon || "🔗";
    const textWrap = document.createElement("div");
    const title = document.createElement("div");
    title.className = "title";
    title.textContent = link.title;
    const url = document.createElement("div");
    url.className = "url";
    url.textContent = link.url;
    textWrap.appendChild(title);
    textWrap.appendChild(url);
    left.appendChild(icon);
    left.appendChild(textWrap);

    const right = document.createElement("div");
    right.className = "controls";
    const badges = document.createElement("div");
    badges.className = "badges";
    badges.innerHTML = `<span>Today: ${link.clicks.today}</span><span>Total: ${link.clicks.total}</span>${link.pinned ? '<span>📌</span>' : ''}`;
    right.appendChild(badges);

    const openBtn = document.createElement("button");
    openBtn.textContent = "Open";
    openBtn.addEventListener("click", () => onClick(link));

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => onEdit(link));

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => onDelete(link));

    const pinBtn = document.createElement("button");
    pinBtn.textContent = link.pinned ? "Unpin" : "Pin";
    pinBtn.addEventListener("click", () => onPin(link));

    right.appendChild(openBtn);
    right.appendChild(editBtn);
    right.appendChild(delBtn);
    right.appendChild(pinBtn);

    li.appendChild(left);
    li.appendChild(right);
    list.appendChild(li);
  });
}

export function fillForm(link) {
  document.getElementById("titleInput").value = link?.title || "";
  document.getElementById("urlInput").value = link?.url || "";
  document.getElementById("iconInput").value = link?.icon || "";
  document.getElementById("pinInput").checked = !!link?.pinned;
  document.getElementById("editingId").value = link?.id || "";
}

export function getFormData() {
  return {
    title: document.getElementById("titleInput").value.trim(),
    url: document.getElementById("urlInput").value.trim(),
    icon: document.getElementById("iconInput").value.trim(),
    pinned: document.getElementById("pinInput").checked
  };
}

export function readProfileForm() {
  return {
    name: document.getElementById("nameInput").value.trim(),
    bio: document.getElementById("bioInput").value.trim(),
    avatar: document.getElementById("avatarInput").value.trim(),
    theme: document.getElementById("themeSelect").value
  };
}

export function setProfileForm(profile) {
  document.getElementById("nameInput").value = profile.name || "";
  document.getElementById("bioInput").value = profile.bio || "";
  document.getElementById("avatarInput").value = profile.avatar || "";
  document.getElementById("themeSelect").value = profile.theme || "theme-sunrise";
}
