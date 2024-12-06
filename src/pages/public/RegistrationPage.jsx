import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import LoadingSpinner from "../../components/ui/spinners/LoadingSpinner.jsx";
import ROUTES from "../../pages/routes/routes";
import { postAuthData } from "../../api/http-requests.js";
import { signupEndpoint } from "../../api/endpoints.js";
import {
  errorFirstnameRequired as firstReq,
  errorFirstnameInvalid as firstInv,
  errorSurnameRequired as surnReq,
  errorSurnameInvalid as surnInv,
  errorEmailInv as emailInv,
  errorEmailConfirmation as emailConfInv,
  errorPasswordInv as passInv,
} from "../../constants/error-messages.js";
import "../../stylesheets/form.css";

function RegistrationPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegistration = async (data, event) => {
    setIsLoading(true);
    event.preventDefault();
    const parsedData = {
      forename: data.forename,
      surname: data.surname,
      email: data.email,
      password: data.password,
    };

    try {
      await postAuthData(signupEndpoint, parsedData, "SIGNUP");
      navigate(ROUTES.LOGIN);
    } catch (e) {
      setError(e.message);
    }
    console.log(data);
    console.log(error);
  };

  return (
    <Card>
      <form className="form" onSubmit={handleSubmit(handleRegistration)}>
        <h1 className="form-title">¡Register!</h1>
        {error && (
          <span className="error-msg__form-resp" role="alert">
            {error}
          </span>
        )}
        {isLoading && <LoadingSpinner />}
        <label htmlFor="reg-forename">Name:</label>
        <input
          id="reg-forename"
          type="text"
          {...register("forename", {
            minLength: { value: 2 },
            required: true,
          })}
          aria-invalid={errors.forename ? "true" : "false"}
        />
        {errors.forename?.type === "required" && (
          <span className="error-msg__form" role="alert">
            {firstReq}
          </span>
        )}
        {errors.firstname?.type === "minLength" && (
          <span className="error-msg__form__form" role="alert">
            {firstInv}
          </span>
        )}
        <label htmlFor="reg-surname">Surname:</label>
        <input
          id="reg-surname"
          type="text"
          {...register("surname", {
            minLength: { value: 2 },
            required: true,
          })}
          aria-invalid={errors.surname ? "true" : "false"}
        />
        {errors.surname?.type === "required" && (
          <span className="error-msg__form" role="alert">
            {surnReq}
          </span>
        )}
        {errors.surname?.type === "minLength" && (
          <span role="alert">{surnInv}</span>
        )}
        <label htmlFor="reg-email">Email:</label>
        <input
          id="reg-email"
          type="email"
          {...register("email", {
            required: "required",
            pattern: {
              value: /\S+@\S+\.\S+/,
            },
          })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <span className="error-msg__form" role="alert">
            {emailInv}
          </span>
        )}
        <label htmlFor="reg-email__confirm">Confirm email:</label>
        <input
          id="reg-email__confirm"
          type="email"
          {...register("emailConfirmation", {
            required: "required",
            pattern: {
              value: watch("email"),
            },
          })}
          aria-invalid={errors.emailConfirmation ? "true" : "false"}
        />
        {errors.emailConfirmation && (
          <span className="error-msg__form" role="alert">
            {emailConfInv}
          </span>
        )}
        <label htmlFor="reg-password">Password</label>
        <input
          id="reg-password"
          type="password"
          {...register("password", {
            required: "required",
            pattern: {
              value:
                /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!=$_¿.* ).{8,25}$/,
            },
          })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && (
          <span className="error-msg__form" role="alert">
            {passInv}
          </span>
        )}
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

export default RegistrationPage;
