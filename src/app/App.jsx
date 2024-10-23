import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/public/ErrorPage";
import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/public/LoginPage";
import RegistrationPage from "../pages/public/RegistrationPage";
import PrivateRoutes from "../pages/routes/PrivateRoutes";
import ProjectHomePage from "../pages/private/ProjectHomePage";
import RootLayout from "../pages/public/RootLayout";
import ROUTES from "../pages/routes/routes";

//every object reflects a route
const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <PrivateRoutes />,
    errorElement: <ErrorPage />,
    children: [
      { path: ROUTES.PROJECT_HOME_PAGE, element: <ProjectHomePage /> },
    ],
  },

  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.REGISTER, element: <RegistrationPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
