import { Link } from "react-router-dom";
import MainNavigation from "../../components/navigation/MainNavigation";
import Card from "../../components/ui/Card";
import "../../stylesheets/error-page.css";

function ErrorPage() {
  return (
    <>
      <MainNavigation />
      <main className="background-error">
        <Card>
          <h1 className="error-title">¡An error occurred!</h1>
          <p className="error-para__link">
            <Link to="/" className={"error-link"}>
              Go to home page
            </Link>
          </p>
          <p className="background-attribution">
            Background image by{" "}
            <a href="https://unsplash.com/@maxchen2k?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
              Max Chen
            </a>{" "}
            on{" "}
            <a href="https://unsplash.com/photos/source-code-lud4OaUCP4Q?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
              Unsplash
            </a>
          </p>
        </Card>
      </main>
    </>
  );
}

export default ErrorPage;
