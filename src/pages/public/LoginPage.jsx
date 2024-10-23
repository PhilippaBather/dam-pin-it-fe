import Card from "../../components/Card";
import Form from "../../components/Form";
import "../../stylesheets/ui-components.css";

function LoginPage() {
  return (
    <Card>
      <Form>
        <h1 className="form-title">Login</h1>
        <label htmlFor="login-email">Email:</label>
        <input id="login-email" type="email" />
        <label htmlFor="login-password">Password</label>
        <input id="login-password" type="password" />
        <div className="form-btn__container">
          <button className="form-btn" type="submit">
            Login
          </button>
          <button className="form-btn" type="button">
            Cancel
          </button>
        </div>
      </Form>
    </Card>
  );
}

export default LoginPage;
