import { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import {
  colourStyles,
  priorityOptions,
} from "../tasks/task-priority-dropdown-settings";
import { useProjectContext } from "../../context/project-context.jsx";
import { useUIContext } from "../../context/ui-context.jsx";
import { selectPriorityOption } from "../tasks/task-priority-dropdown-settings.js";
import {
  errorDeadlineRequired as deadlineReq,
  errorTitleRequired as titleReq,
} from "../../constants/error-messages";

function FormTask({ btnLabels, handleTaskSubmit, setSelectOption }) {
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
    console.log(selectedOption);
    setSelectOption(selectedOption.label);
  };

  const handleClose = () => {
    clearErrors();
    reset({ title: "", description: "", deadline: "", priorityLevel: "" });
    setIsCreated(false);
    setModalComponentType(null);
  };

  return (
    <>
      <div className="form-btn__container-close">
        <button className="form-btn" type="button" onClick={handleClose}>
          Close
        </button>
      </div>
      <form className="form" onSubmit={handleSubmit(handleTaskSubmit)}>
        <h2 className="form-title">Task Details</h2>
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
        <label htmlFor="proj-priority">Priority Level</label>
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
        {!isCreated && (
          <div className="form-btn__container">
            <button className="form-btn" type="submit">
              {btnLabel1}
            </button>
            <button className="form-btn" type="reset">
              {btnLabel2}
            </button>
          </div>
        )}
      </form>
    </>
  );
}

export default FormTask;
