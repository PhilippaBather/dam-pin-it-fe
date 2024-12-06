import { Form, NavLink, useParams } from "react-router-dom";
import { getAuthToken } from "../../auth/auth-functions.js";
import ROUTES from "../../pages/routes/routes.js";
import "../../stylesheets/navigation.css";

// NavLink does not send new HTTP request and uses an anonymous function to indicate whether a lin is active

function MainNavigation() {
  const isUserAuth = getAuthToken();
  const { id } = useParams();

  const authNav = (
    <ul className={"nav-list"}>
      <li className={"nav-list__signout"}>
        <Form action="/logout" method="POST">
          <button className={"nav-list__signout-btn"} type="submit">
            Logout
          </button>
        </Form>
      </li>
      <li className={"nav-list__item"}>
        <NavLink
          to={`/projects-home/user/${id}`}
          className={({ isActive }) =>
            isActive ? "nav-list__link-active" : "nav-list__link"
          }
        >
          Home
        </NavLink>
      </li>
      <li className={"nav-list__item"}>
        <NavLink
          to="/account"
          className={({ isActive }) =>
            isActive ? "nav-list__link-active" : "nav-list__link"
          }
        >
          Account
        </NavLink>
      </li>
    </ul>
  );

  const unauthNav = (
    <ul className={"nav-list"}>
      <li className={"nav-list__item"}>
        <NavLink
          to={ROUTES.LOGIN}
          className={({ isActive }) =>
            isActive ? "nav-list__link-active" : "nav-list__link"
          }
        >
          Login
        </NavLink>
      </li>
      <li className={"nav-list__item"}>
        <NavLink
          to={ROUTES.REGISTER}
          className={({ isActive }) =>
            isActive ? "nav-list__link-active" : "nav-list__link"
          }
        >
          Register
        </NavLink>
      </li>
    </ul>
  );

  return (
    <header className={"root-header"}>
      <h1 className={"header-title"}>
        <NavLink to={ROUTES.HOME} className={"header-title nav-list__link"}>
          ¡Pin-it App!
        </NavLink>
      </h1>
      <nav>
        <div>
          {isUserAuth !== null && authNav}
          {isUserAuth === null && unauthNav}
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
