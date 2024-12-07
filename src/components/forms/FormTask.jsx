import { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import {
  colourStyles,
  priorityOptions,
  selectPriorityOption,
} from "../tasks/task-priority-dropdown-settings";
import { useProjectContext } from "../../context/project-context.jsx";
import { useUIContext } from "../../context/ui-context.jsx";
import CloseForm from "./CloseForm.jsx";
import {
  errorDeadlineRequired as deadlineReq,
  errorTitleRequired as titleReq,
} from "../../constants/error-messages";
import FormActions from "./FormActions.jsx";

function FormTask({
  btnLabels,
  handleTaskSubmit,
  setSelectOption,
  handleTaskDelete,
  dateValError,
  httpError,
}) {
  const [btnLabel1, btnLabel2] = btnLabels;
  const { selectedTask } = useProjectContext();
  const { modalComponentType, setModalComponentType } = useUIContext();

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: modalComponentType === "VIEW_TASK" ? selectedTask.title : "",
      description:
        modalComponentType === "VIEW_TASK" ? selectedTask.description : "",
      deadline: modalComponentType === "VIEW_TASK" ? selectedTask.deadline : "",
    },
  });

  const [isCreated, setIsCreated] = useState(false);

  const handleChange = (selectedOption) => {
    setSelectOption(selectedOption.label);
  };

  const handleClose = () => {
    clearErrors();
    reset({ title: "", description: "", deadline: "", priorityLevel: "" });
    setIsCreated(false);
    setModalComponentType(null);
  };

  const handleClick = () => {
    if (btnLabel2 === "Delete") {
      handleTaskDelete();
    }
    if (btnLabel2 === "Reset") {
      clearErrors();
      reset({ title: "", description: "", deadline: "", priorityLevel: "" });
    }
  };

  const title = httpError ? "Something went wrong..." : "Task Details";

  return (
    <>
      <CloseForm handleClose={handleClose} />
      <form className="form" onSubmit={handleSubmit(handleTaskSubmit)}>
        <h2 className="form-title">{title}</h2>
        {httpError && <span className="error-msg__form-resp">{httpError}</span>}
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
        {dateValError && (
          <span className="error-msg__form" role="alert">
            {dateValError}
          </span>
        )}
        <label hidden={httpError} htmlFor="proj-priority">
          Priority Level
        </label>
        {!httpError && (
          <Select
            id="proj-priority"
            defaultValue={
              modalComponentType !== "VIEW_TASK"
                ? priorityOptions[4]
                : priorityOptions[
                    selectPriorityOption[selectedTask.priorityLevel]
                  ]
            }
            styles={colourStyles}
            options={priorityOptions}
            isSearchable={true}
            onChange={handleChange}
          />
        )}
        {!isCreated && (
          <FormActions
            btnLabel1={btnLabel1}
            btnLabel2={btnLabel2}
            btn2Type={"reset"}
            handleClick={handleClick}
            httpError={httpError}
          />
        )}
      </form>
    </>
  );
}

export default FormTask;
