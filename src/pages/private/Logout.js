import { redirect } from "react-router-dom";

export function action() {
  logout();
  return redirect("/");
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
}
