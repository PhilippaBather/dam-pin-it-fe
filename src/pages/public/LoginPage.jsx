import { useForm } from "react-hook-form";
import Card from "../../components/Card";
import {
  errorEmailReq as emailReq,
  errorPasswordRequired as passReq,
} from "../../constants/error-messages.js";
import "../../stylesheets/form.css";
import "../../stylesheets/ui-components.css";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    console.log(data);
    console.log("hello");
  };

  return (
    <Card>
      <form className="form" onSubmit={handleSubmit(handleLogin)}>
        <h1 className="form-title">Login</h1>
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
        )}{" "}
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
