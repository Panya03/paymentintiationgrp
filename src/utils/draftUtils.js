// draftUtils.js
const DRAFTS_KEY = "payment_drafts";

export const loadDrafts = () =>
  JSON.parse(localStorage.getItem(DRAFTS_KEY) || "[]");

export const persistDrafts = (drafts) =>
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));

export const saveDraftToStorage = (draft) => {
  const existing = loadDrafts();
  const updated = [draft, ...existing];
  persistDrafts(updated);
  return updated;
};

export const deleteDraftFromStorage = (id) => {
  const updated = loadDrafts().filter((d) => d.id !== id);
  persistDrafts(updated);
  return updated;
};

export const genId = () =>
  (crypto?.randomUUID && crypto.randomUUID()) || String(Date.now());
