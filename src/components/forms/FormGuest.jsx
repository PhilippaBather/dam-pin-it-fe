import { useForm } from "react-hook-form";
import Select from "react-select";
import {
  colourStyles,
  priorityOptions,
  selectPriorityOption,
} from "../guests/guest-permissions-dropdown-settings";
import { useUIContext } from "../../context/ui-context";
import { errorEmailInv } from "../../constants/error-messages.js";
import FormActions from "./FormActions.jsx";
import { useProjectContext } from "../../context/project-context.jsx";

function FormGuest({
  guest = null,
  handleGuestSubmit,
  selectionError,
  setSelectionError,
  setSelectOption,
  httpError,
}) {
  const { modalComponentType, setModalComponentType } = useUIContext();
  const { selectedGuest } = useProjectContext();

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
    setSelectOption(null);
    setModalComponentType(null);
  };

  const handleChange = (selectedOption) => {
    setSelectOption(selectedOption.label);
    setSelectionError(null);
  };

  const formTitle = !guest ? "Invite a Guest" : "Update Guest";
  const formPara = !guest
    ? "Invite participants to the project and set their permissions."
    : "Update invited participant's project permissions.";
  let textareaMsg = !guest
    ? "Include an optional message "
    : `Updating current permissions from ${guest.permissions} to ...`;

  return (
    <>
      <form className="form" onSubmit={handleSubmit(handleGuestSubmit)}>
        <h2 className="form-title">{formTitle}</h2>
        <span className="error-msg__form-resp" role="alert">
          {httpError}
        </span>
        <p className="form-p">{formPara}</p>
        <label htmlFor="guest-email">Email</label>
        <input
          id="guest-email"
          type="email"
          defaultValue={guest?.email}
          readOnly={guest?.email}
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
          value={textareaMsg}
          readOnly={guest}
          {...register("msg", { required: false })}
        ></textarea>
        <label htmlFor="guest-permissions">Permissions</label>
        <Select
          id="proj-priority"
          defaultValue={
            modalComponentType !== "UPDATE_GUEST" ||
            modalComponentType != "INVITE_GUEST"
              ? priorityOptions[4]
              : priorityOptions[selectPriorityOption[selectedGuest.permissions]]
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
