import { useForm } from "react-hook-form";
import CloseForm from "./CloseForm";
import { useUIContext } from "../../context/ui-context";
import { errorEmailInv } from "../../constants/error-messages.js";
import FormActions from "./FormActions.jsx";

function FormGuest({ handleGuestSubmit }) {
  const { setModalComponentType } = useUIContext();

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    clearErrors();
    reset({ email: "", msg: "" });
    setModalComponentType(null);
  };

  return (
    <>
      <CloseForm handleClose={handleClose} />
      <form className="form" onSubmit={handleSubmit(handleGuestSubmit)}>
        <h2 className="form-title">Invite a Guest</h2>
        <p>Invite participants to the project and set their permissions.</p>
        <label htmlFor="guest-email">Email</label>
        <input
          id="guest-email"
          type="email"
          {...register("email", { required: true })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.title && (
          <span className="error-msg__form" role="alert">
            {errorEmailInv}
          </span>
        )}
        <label htmlFor="guest-msg">Message</label>
        <textarea id="guest-msg" name="guest-msg">
          Include an optional message...
        </textarea>
        <label htmlFor="guest-permissions">Permissions</label>
        <input type="radio" id="perm-read" checked />
        <label htmlFor="perm-read">Read</label>
        <input type="perm-edit" id="perm-read" />
        <label htmlFor="perm-edit">Add Tasks</label>
        <input type="radio" id="perm-delete" />
        <label htmlFor="perm-delete">Add and Delete Tasks</label>
        <FormActions btnLabel1={"Send"} btnLabel2={"Reset"} />
      </form>
    </>
  );
}

export default FormGuest;
