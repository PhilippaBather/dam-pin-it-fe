import { redirect } from "react-router-dom";

// set to a duration of 1 hour
export function setJWTExpiration() {
  const expDate = new Date();
  expDate.setHours(expDate.getHours() + 1);
  localStorage.setItem("expiration", expDate.toISOString());
}

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("tokenExpiration");
  const expirationDate = new Date(storedExpirationDate);
  const currDate = new Date();
  const duration = expirationDate.getTime() - currDate.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  // const tokenDuration = getTokenDuration();

  // if (tokenDuration < 0) {
  //   return "EXPIRED";
  // }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export async function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/"); // TODO: is this the route I want?
  }

  // TODO: check user loaded into context

  // loaders must return a value
  return null;
}
