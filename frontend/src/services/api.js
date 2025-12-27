const API_URL = "http://localhost:5000/api";

function qs(obj = {}) {
  const str = Object.keys(obj)
    .filter(k => obj[k] !== undefined && obj[k] !== null)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
    .join("&");
  return str ? `?${str}` : "";
}

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

  // Assets (existing)
  getAssets: () =>
    fetch(`${API_URL}/assets`).then(res => res.json()),

  addAsset: (data) =>
    fetch(`${API_URL}/assets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => res.json()),

  // Maintenance (existing)
  getMaintenance: (id) =>
    fetch(`${API_URL}/maintenance/${id}`).then(res => res.json()),

  addMaintenance: (data) =>
    fetch(`${API_URL}/maintenance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => res.json()),

  // New: Equipment
  getEquipments: () => fetch(`${API_URL}/equipment`).then(res => res.json()),
  getEquipment: (id) => fetch(`${API_URL}/equipment/${id}`).then(res => res.json()),
  createEquipment: (data) => fetch(`${API_URL}/equipment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  updateEquipment: (id, data) => fetch(`${API_URL}/equipment/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  deleteEquipment: (id) => fetch(`${API_URL}/equipment/${id}`, { method: "DELETE" }).then(res => res.json()),
  getEquipmentRequests: (id) => fetch(`${API_URL}/equipment/${id}/requests`).then(res => res.json()),

  // Teams
  getTeams: () => fetch(`${API_URL}/teams`).then(res => res.json()),
  createTeam: (data) => fetch(`${API_URL}/teams`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  updateTeam: (id, data) => fetch(`${API_URL}/teams/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  deleteTeam: (id) => fetch(`${API_URL}/teams/${id}`, { method: "DELETE" }).then(res => res.json()),

  // Requests
  getRequests: (opts = {}) => fetch(`${API_URL}/requests${qs(opts)}`).then(res => res.json()),
  getRequest: (id) => fetch(`${API_URL}/requests/${id}`).then(res => res.json()),
  createRequest: (data) => fetch(`${API_URL}/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  updateRequest: (id, data) => fetch(`${API_URL}/requests/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  deleteRequest: (id) => fetch(`${API_URL}/requests/${id}`, { method: "DELETE" }).then(res => res.json())
};
