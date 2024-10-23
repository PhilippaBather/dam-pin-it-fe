import Card from "../../components/Card";
import Form from "../../components/Form";

function PasswordRecoveryPage() {
  return (
    <Card>
      <Form>
        <h1 className="form-title">Recover Password</h1>
        <label htmlFor="login-email">Email:</label>
        <input id="login-email" type="email" />
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

export default PasswordRecoveryPage;
