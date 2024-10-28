import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/public/ErrorPage";
import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/public/LoginPage";
import RegistrationPage from "../pages/public/RegistrationPage";
import ProjectHomePage from "../pages/private/ProjectHomePage";
import RootLayout from "../pages/public/RootLayout";
import ROUTES from "../pages/routes/routes";
import { action as logoutAction } from "../pages/private/Logout.js";
import { checkAuthLoader, tokenLoader } from "../auth/auth-functions.js";

// TODO: const token = useRouteLoaderData("root"); // retruns token

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    id: "root",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      {
        path: ROUTES.PROJECT_HOME_PAGE,
        element: <ProjectHomePage />,
        loader: checkAuthLoader,
      },
      { index: true, element: <HomePage /> },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.REGISTER, element: <RegistrationPage /> },
      {
        path: ROUTES.LOGOUT,
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
