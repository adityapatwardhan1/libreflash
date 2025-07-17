export function isLoggedIn(): boolean {
  const token = localStorage.getItem("token");
  return !!token && token !== "null" && token !== "undefined";
}

export function logout() {
  localStorage.removeItem("token");
}

