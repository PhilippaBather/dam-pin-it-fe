import { useForm } from "react-hook-form";
import Select from "react-select";
import {
  colourStyles,
  priorityOptions,
} from "../guests/guest-permissions-dropdown-settings";
import { useUIContext } from "../../context/ui-context";
import { errorEmailInv } from "../../constants/error-messages.js";
import FormActions from "./FormActions.jsx";

function FormGuest({ handleGuestSubmit, selectionError, setSelectionError }) {
  const {
    modalComponentType,
    setModalComponentType,
    selectedOption,
    setSelectOption,
  } = useUIContext();

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

  const handleChange = (selectedOption) => {
    setSelectOption(selectedOption.label);
    setSelectionError(selectedOption.label === "None");
  };

  return (
    <>
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
        {errors.email && (
          <span className="error-msg__form" role="alert">
            {errorEmailInv}
          </span>
        )}
        <label htmlFor="guest-msg">Message</label>
        <textarea
          id="guest-msg"
          name="guest-msg"
          defaultValue="Include an optional message..."
          {...register("msg", { required: false })}
        ></textarea>
        <label htmlFor="guest-permissions">Permissions</label>
        <Select
          id="proj-priority"
          defaultValue={
            modalComponentType !== "INVITE_GUEST"
              ? priorityOptions[1]
              : priorityOptions[selectedOption]
          }
          styles={colourStyles}
          options={priorityOptions}
          isSearchable={true}
          onChange={handleChange}
        />
        {selectionError && (
          <span className="error-msg__form" role="alert">
            Permissions must be selected.
          </span>
        )}
        <FormActions
          btnLabel1={"Send"}
          btnLabel2={"Close"}
          btn2Type={"button"}
          handleClick={handleClose}
        />
      </form>
    </>
  );
}

export default FormGuest;
