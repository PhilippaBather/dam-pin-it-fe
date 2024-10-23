import Card from "../../components/Card";
import Form from "../../components/Form";

function RegistrationPage() {
  return (
    <Card>
      <Form>
        <h1 className="form-title">¡Register!</h1>
        <label htmlFor="reg-username">Username:</label>
        <input id="reg-username" type="text" />
        <label htmlFor="reg-email">Email:</label>
        <input id="reg-email" type="email" />
        <label htmlFor="reg-email__confirm">Confirm email:</label>
        <input id="reg-email__confirm" type="email" />
        <label htmlFor="login-password">Password</label>
        <input id="login-password" type="password" />
        <div className="form-btn__container">
          <button className="form-btn" type="submit">
            Submit
          </button>
          <button className="form-btn" type="button">
            Cancel
          </button>
        </div>
      </Form>
    </Card>
  );
}

export default RegistrationPage;
