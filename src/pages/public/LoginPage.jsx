import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Card from "../../components/Card";
import { postAuthData, postUserLogin } from "../../api/http-requests.js";
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
  const navigate = useNavigate();

  const handleLogin = async (data, event) => {
    event.preventDefault();
    try {
      await postAuthData(loginEndpoint, data, "LOGIN");
      const user = await postUserLogin(userDataEndpoint, data);
      // useNavigate hook to programmatically change route
      navigate(ROUTES.PROJECT_HOME_PAGE + user.id);
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
          {...register("password", { required: true })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && (
          <span className="error-msg__form" role="alert">
            {passReq}
          </span>
        )}
        <div className="form-btn__container">
          <button className="form-btn" type="submit">
            Login
          </button>
          <button className="form-btn" type="button">
            Cancel
          </button>
        </div>
      </form>
    </Card>
  );
}

export default LoginPage;
