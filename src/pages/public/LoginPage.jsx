import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Card from "../../components/ui/Card";
import FormActions from "../../components/forms/FormActions.jsx";
import LoadingDots from "../../components/ui/spinners/LoadingDots.jsx";
import { useProjectContext } from "../../context/project-context.jsx";
import { handleHttpReq, postAuthData } from "../../api/http-requests.js";
import { useUIContext } from "../../context/ui-context.jsx";
import {
  errorEmailReq as emailReq,
  errorPasswordRequired as passReq,
} from "../../constants/error-messages.js";
import "../../stylesheets/form.css";
import "../../stylesheets/ui-components.css";
import { loginEndpoint, userDataEndpoint } from "../../api/endpoints.js";
import ROUTES from "../routes/routes.js";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAlert, setProjectNotifications } = useProjectContext();
  const { setModalComponentType } = useUIContext();
  const navigate = useNavigate();

  const handleLogin = async (data, event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await postAuthData(loginEndpoint, data, "LOGIN");
      const user = await handleHttpReq(userDataEndpoint, data, null, "POST");

      if (user.projectNotifications.length > 0) {
        setIsAlert(true);
        setProjectNotifications(user.projectNotifications);
        setModalComponentType("ALERT_PROJECT");
      }

      // useNavigate hook to programmatically change route
      const route = `/projects-home/user/${user.id}`;
      navigate(route);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Card>
      <form className="form" onSubmit={handleSubmit(handleLogin)}>
        <h1 className="form-title">Login</h1>
        {error && (
          <span className="error-msg__form-resp" role="alert">
            {error}
          </span>
        )}
        {isLoading && <LoadingDots dotColor="rgb(202, 247, 170)" size="45" />}
        <label htmlFor="login-email">Email:</label>
        <input
          id="login-email"
          type="email"
          {...register("email", { required: true })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <span className="error-msg__form" role="alert">
            {emailReq}
          </span>
        )}
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          autoComplete="on"
          {...register("password", { required: true })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && (
          <span className="error-msg__form" role="alert">
            {passReq}
          </span>
        )}
        <FormActions
          btnLabel1={"Login"}
          btnLabel2={"Cancel"}
          isLink={true}
          link={ROUTES.HOME}
        />
        <Link to={ROUTES.PASSWORD_RECOVERY} className="form-link">
          Forgotten your password?
        </Link>
      </form>
    </Card>
  );
}

export default LoginPage;
