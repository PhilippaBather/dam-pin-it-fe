import { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom"; // Outlet marks the place to where the child elements are to be rendered
import Footer from "../../components/Footer";
import MainNavigation from "../../components/MainNavigation";
import { getTokenDuration } from "../../auth/auth-functions";
//import MainNavigation from "../../components/MainNavigation";

function RootLayout() {
  // in root route so no need to specify useRouteLoaderData
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "POST" });
      return;
    }

    const tokenDuration = getTokenDuration();

    // set token timeout to 1 hour in ms
    setTimeout(() => {
      // null as data posted
      submit(null, { action: "/logout", method: "POST" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main></main>
      <Footer />
      <Outlet />
    </>
  );
}

export default RootLayout;
