import { useState } from "react";
import { useForm } from "react-hook-form";
import Card from "../../components/ui/Card";
import FormActions from "../../components/forms/FormActions";
import ROUTES from "../routes/routes.js";
import { errorEmailReq as emailReq } from "../../constants/error-messages.js";

function PasswordRecoveryPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [emailSent, setEmailSent] = useState(false);
  const successMsg =
    "Please check your emails for password reset instructions.";

  const handlePasswordRecovery = async (data, event) => {
    event.preventDefault();
    try {
      await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: origin,
        },
        body: JSON.stringify(data),
      });
      setEmailSent(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card>
      <form className="form" onSubmit={handleSubmit(handlePasswordRecovery)}>
        <h1 className="form-title">Recover Password</h1>
        {emailSent && <span>{successMsg}</span>}
        <label htmlFor="pswd-recovery-email">Email:</label>
        <input
          id="pswd-recovery-email"
          type="email"
          {...register("email", { required: true })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <span className="error-msg__form" role="alert">
            {emailReq}
          </span>
        )}

        <FormActions
          btnLabel1={"Submit"}
          btnLabel2={emailSent ? "Close" : "Cancel"}
          isLink={true}
          link={ROUTES.LOGIN}
        />
      </form>
    </Card>
  );
}

export default PasswordRecoveryPage;
