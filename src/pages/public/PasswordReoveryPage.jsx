import Card from "../../components/ui/Card";

function PasswordRecoveryPage() {
  return (
    <Card>
      <form className="form">
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
      </form>
    </Card>
  );
}

export default PasswordRecoveryPage;
