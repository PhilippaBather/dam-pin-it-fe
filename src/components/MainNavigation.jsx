import { NavLink } from "react-router-dom";
import ROUTES from "../pages/routes/routes.js";

// NavLink does not send new HTTP request and uses an anonymous function to indicate whether a lin is active
// add classes when doing SASS style sheets
// end indicates that the path ends with a slash, otherwise all urls beginning with a forward slash would be indicated as being active
// <NavLink to="/" className={(isActive) => (isActive ? classes.active : undefined) end} >Home</NavLink>

// useNavigate hook: allows you to switch to a different route programmatically inside your code

function MainNavigation() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to={ROUTES.HOME}>Home</NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.LOGIN}>Login</NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.REGISTER}>Register</NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.PROJECT_HOME_PAGE}>Account</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default MainNavigation;
