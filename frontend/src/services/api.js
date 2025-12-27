const API_URL = "http://localhost:5000/api";

export const api = {
  login: (data) =>
    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => res.json()),

  register: (data) =>
    fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => res.json()),

  getAssets: () =>
    fetch(`${API_URL}/assets`).then(res => res.json()),

  addAsset: (data) =>
    fetch(`${API_URL}/assets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => res.json()),

  getMaintenance: (id) =>
    fetch(`${API_URL}/maintenance/${id}`).then(res => res.json()),

  addMaintenance: (data) =>
    fetch(`${API_URL}/maintenance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => res.json())
};
