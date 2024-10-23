import { NavLink } from "react-router-dom";
import ROUTES from "../pages/routes/routes.js";
import "../stylesheets/navigation.css";

// NavLink does not send new HTTP request and uses an anonymous function to indicate whether a lin is active
// add classes when doing SASS style sheets
// end indicates that the path ends with a slash, otherwise all urls beginning with a forward slash would be indicated as being active
// <NavLink to="/" className={(isActive) => (isActive ? classes.active : undefined) end} >Home</NavLink>

// useNavigate hook: allows you to switch to a different route programmatically inside your code

// TODO: conditional rendering: Login and register if not logged in
// TODO: conditional rendering: Sign out button if logged in

function MainNavigation() {
  return (
    <header className={"root-header"}>
      <h1 className={"header-title"}>
        <NavLink to={ROUTES.HOME} className={"header-title nav-list__link"}>
          ¡Pin-it App!
        </NavLink>
      </h1>
      <nav>
        <div>
          <ul className={"nav-list"}>
            <li className={["nav-list__signout"]}>
              <button className={"nav-list__signout-btn"}>Sign out</button>
            </li>
            <li className={"nav-list__item"}>
              <NavLink to={ROUTES.HOME} className={"nav-list__link"}>
                Home
              </NavLink>
            </li>
            <li className={"nav-list__item"}>
              <NavLink to={ROUTES.LOGIN} className={"nav-list__link"}>
                Login
              </NavLink>
            </li>
            <li className={"nav-list__item"}>
              <NavLink to={ROUTES.REGISTER} className={"nav-list__link"}>
                Register
              </NavLink>
            </li>
            <li className={"nav-list__item"}>
              <NavLink
                to={ROUTES.PROJECT_HOME_PAGE}
                className={"nav-list__link"}
              >
                Account
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
