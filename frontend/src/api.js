// This project uses Create React App (react-scripts), so frontend settings use
// REACT_APP_* environment variables rather than Vite's import.meta.env.
export const API_URL = (process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api").replace(/\/$/, "");
export const LARAVEL_URL = (process.env.REACT_APP_LARAVEL_URL || API_URL.replace(/\/api$/, "")).replace(/\/$/, "");
export const STORAGE_URL = API_URL.replace(/\/api$/, "") + "/storage";

export async function api(path, { method = "GET", body, auth = true } = {}) {
  const headers = { Accept: "application/json" };
  const token = localStorage.getItem("token");
  if (auth && token) headers.Authorization = `Bearer ${token}`;
  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }
  const res = await fetch(`${API_URL}${path}`, { method, headers, body });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(data?.message || "Erreur serveur");
    err.status = res.status;
    err.errors = data?.errors;
    throw err;
  }
  return data;
}

export const errorMessage = (err) =>
  err.errors ? Object.values(err.errors).flat().join("\n") : err.message;

export function saveSession({ token, user }) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  try {
    const u = JSON.parse(localStorage.getItem("user"));
    return u && typeof u === "object" ? u : null;
  } catch { return null; }
}

export async function logout() {
  try { await api("/logout", { method: "POST" }); } catch {}
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
