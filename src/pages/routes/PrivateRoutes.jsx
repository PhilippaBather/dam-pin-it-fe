import { Navigate, Outlet } from "react-router-dom";
import ROUTES from "./routes";

const PrivateRoutes = () => {
  const userLoggedIn = true; // placeholder

  if (!userLoggedIn) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
