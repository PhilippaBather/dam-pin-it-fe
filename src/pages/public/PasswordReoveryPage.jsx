import { useState } from "react";
import { useForm } from "react-hook-form";
import Card from "../../components/ui/Card";
import FormActions from "../../components/forms/FormActions";
import LoadingDots from "../../components/ui/spinners/LoadingDots.jsx";
import ROUTES from "../routes/routes.js";
import { handleAuthHTTPRequest } from "../../auth/auth-apis.js";
import { errorEmailReq as emailReq } from "../../constants/error-messages.js";
import {
  FAILED_FETCH,
  MALFORMED_REQUEST,
  UNDEFINED_PARAM,
  UNEXPECTED_JSON,
} from "../../api/api-constants.js";

function PasswordRecoveryPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [emailSent, setEmailSent] = useState(false);
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const successMsg =
    "Please check your emails for password reset instructions.";

  const handlePasswordRecovery = async (data, e) => {
    e.preventDefault();
    console.log(data);
    try {
      setIsLoading(true);
      await handleAuthHTTPRequest(data.email, "POST", "PSWD_RESET", null);
      setEmailSent(true);
      setIsLoading(false);
    } catch (e) {
      setHttpError(
        e.message === FAILED_FETCH
          ? "Network error"
          : e.message === UNEXPECTED_JSON || e.message.includes(UNDEFINED_PARAM)
          ? MALFORMED_REQUEST
          : e.message
      );
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form className="form" onSubmit={handleSubmit(handlePasswordRecovery)}>
        <h1 className="form-title">Recover Password</h1>
        {!isLoading && emailSent && (
          <span className="msg-alert">{successMsg}</span>
        )}
        {isLoading && (
          <LoadingDots dotColor="rgba(251, 5, 173, 0.7)" size="30" />
        )}
        {httpError && <span className="msg-alert">{httpError}</span>}
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
