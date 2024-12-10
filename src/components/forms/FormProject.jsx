import { useForm } from "react-hook-form";
import CloseForm from "./CloseForm";
import FormActions from "./FormActions";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import {
  errorDeadlineRequired as deadlineReq,
  errorTitleRequired as titleReq,
} from "../../constants/error-messages";

function FormProject({
  btnLabels,
  handleSubmitProject,
  deadlineValError,
  httpError,
}) {
  const { currProject } = useProjectContext();
  const deadlineError = "Project deadline cannot be in the past";

  const [btnLabel1, btnLabel2, btnType] = btnLabels;
  const { modalComponentType, setModalComponentType } = useUIContext();

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: modalComponentType === "EDIT_PROJECT" ? currProject.title : "",
      description:
        modalComponentType === "EDIT_PROJECT" ? currProject.description : "",
      deadline:
        modalComponentType === "EDIT_PROJECT" ? currProject.deadline : "",
    },
  });

  const handleClose = () => {
    reset({ title: "", description: "", deadline: "" });
    clearErrors();
    setModalComponentType(null);
  };

  const handleClick = () => {
    if (btnLabel2 === "Reset") {
      clearErrors();
      reset({ title: "", description: "", deadline: "" });
    }
  };

  const title = httpError ? "Something went wrong..." : "Task Details";

  return (
    <>
      <CloseForm handleClose={handleClose} />
      <form className="form" onSubmit={handleSubmit(handleSubmitProject)}>
        <h2 className="form-title">{title}</h2>
        {httpError && (
          <span className="error-msg__form-resp" role="alert">
            {httpError}
          </span>
        )}
        <label hidden={httpError} htmlFor="proj-title">
          Title
        </label>
        <input
          hidden={httpError}
          id="proj-title"
          type="text"
          {...register("title", {
            minLength: { value: 2 },
            required: true,
          })}
        />
        {errors.title && (
          <span className="error-msg__form" role="alert">
            {titleReq}
          </span>
        )}
        <label hidden={httpError} htmlFor="proj-description">
          Description
        </label>
        <input
          hidden={httpError}
          id="proj-description"
          type="text"
          {...register("description", { required: false })}
        />
        <label hidden={httpError} htmlFor="proj-deadline">
          Deadline
        </label>
        <input
          hidden={httpError}
          id="proj-deadline"
          type="date"
          {...register("deadline", {
            required: true,
          })}
        />
        {errors.deadline && (
          <span className="error-msg__form" role="alert">
            {deadlineReq}
          </span>
        )}
        {deadlineValError && (
          <span className="error-msg__form" role="alert">
            {deadlineError}
          </span>
        )}
        <FormActions
          httpError={httpError}
          btnLabel1={btnLabel1}
          btnLabel2={btnLabel2}
          btn2Type={btnType}
          handleClick={handleClick}
        />
      </form>
    </>
  );
}

export default FormProject;
