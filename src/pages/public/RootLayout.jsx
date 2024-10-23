import { Outlet } from "react-router-dom"; // Outlet marks the place to where the child elements are to be rendered
import Footer from "../../components/Footer";
import MainNavigation from "../../components/MainNavigation";
//import MainNavigation from "../../components/MainNavigation";

function RootLayout() {
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
