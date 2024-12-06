import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/public/ErrorPage";
import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/public/LoginPage";
import RegistrationPage from "../pages/public/RegistrationPage";
import ProjectHomePage from "../pages/private/ProjectHomePage";
import RootLayout from "../pages/public/RootLayout";
import { ProjectContextProvider } from "../context/project-context.jsx";
import { action as logoutAction } from "../pages/private/Logout.js";
import ProjectDashboard from "../pages/private/ProjectDashboard.jsx";
import { checkAuthLoader, tokenLoader } from "../auth/auth-functions.js";
import ROUTES from "../pages/routes/routes";
import { UIContextProvider } from "../context/ui-context.jsx";
import PasswordRecoveryPage from "../pages/public/PasswordReoveryPage.jsx";

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
        path: "/projects-home/user/:id",
        element: <ProjectHomePage />,
        loader: checkAuthLoader,
      },
      {
        path: "/projects-home/user/:id/project/:pid",
        element: <ProjectDashboard />,
      },

      { index: true, element: <HomePage /> },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.REGISTER, element: <RegistrationPage /> },
      { path: ROUTES.PASSWORD_RECOVERY, element: <PasswordRecoveryPage /> },
      {
        path: ROUTES.LOGOUT,
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <UIContextProvider>
      <ProjectContextProvider>
        <RouterProvider router={router} />
      </ProjectContextProvider>
    </UIContextProvider>
  );
}

export default App;
