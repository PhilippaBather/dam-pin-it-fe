import { useForm } from "react-hook-form";
import CloseForm from "./CloseForm";
import FormActions from "./FormActions";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import {
  errorDeadlineRequired as deadlineReq,
  errorTitleRequired as titleReq,
} from "../../constants/error-messages";

function FormProject({ btnLabels, handleSubmitProject }) {
  const { currProject } = useProjectContext();
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: currProject.title,
      description: currProject.description,
      deadline: currProject.deadline,
    },
  });

  const { setModalComponentType } = useUIContext();

  const [btnLabel1, btnLabel2, btnType] = btnLabels;

  const handleClose = () => {
    clearErrors();
    reset({ title: "", description: "", deadline: "" });
    setModalComponentType(null);
  };

  const handleClick = () => {
    if (btnLabel2 === "Reset") {
      clearErrors();
      reset({ title: "", description: "", deadline: "" });
    }
  };

  return (
    <>
      <CloseForm handleClose={handleClose} />
      <form className="form" onSubmit={handleSubmit(handleSubmitProject)}>
        <h2 className="form-title">Project Details</h2>
        <label htmlFor="proj-title">Title</label>
        <input
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
        <label htmlFor="proj-description">Description</label>
        <input
          id="proj-description"
          type="text"
          {...register("description", { required: false })}
        />
        <label htmlFor="proj-deadline">Deadline</label>
        <input
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
        <FormActions
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
