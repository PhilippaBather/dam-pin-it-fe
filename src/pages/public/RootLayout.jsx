import { Outlet } from "react-router-dom"; // Outlet marks the place to where the child elements are to be rendered
import MainNavigation from "../../components/MainNavigation";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main></main>
      <Outlet />
    </>
  );
}

export default RootLayout;
