import { Link } from "react-router-dom";
import ROUTES from "../routes/routes";
import "../../stylesheets/home-page.css";

function HomePage() {
  return (
    <main className="backdrop-home">
      <h2 className="app-slogan">
        Cards, Columns, Clarity | Flow, Focus, Finish
      </h2>
      <h3 className="app-description">
        An intuitive project management solution for personal projects and
        multi-person collaborations.
      </h3>
      <Link to={ROUTES.REGISTER}>
        <h4 className="app-reg">Register for Free</h4>
      </Link>
    </main>
  );
}

export default HomePage;
