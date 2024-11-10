import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Select from "react-select";
import {
  colourStyles,
  priorityOptions,
} from "./task-priority-dropdown-settings";
import { taskEndpoint } from "../../api/endpoints.js";
import { handleHttpReq } from "../../api/http-requests.js";
import {
  errorDeadlineRequired as deadlineReq,
  errorTitleRequired as titleReq,
} from "../../constants/error-messages";

function AddTask() {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  const [isCreated, setIsCreated] = useState(false);

  const { pid } = useParams();

  const handleProjectCreation = async (data, event) => {
    event.preventDefault();

    setIsCreated(true);
    if (!data.priorityLevel) {
      data.priorityLevel = "4"; // none by default
      data.status = "PENDING"; // for column ordering
    }

    try {
      const resp = await handleHttpReq(taskEndpoint, data, pid, "POST", "TASK");
      // TODO: update context
      console.log(resp); // TODO: remove
    } catch (e) {
      console.error(e);
    }
    clearErrors();
    reset({ title: "", description: "", deadline: "", priorityLevel: "" });
  };

  const resetIsCreated = () => {
    clearErrors();
    reset({ title: "", description: "", deadline: "", priorityLevel: "" });
    setIsCreated(false);
  };

  return (
    <>
      <form method="dialog" className="dialog-btn__form">
        <div className="form-btn__container-close">
          <button
            className="form-btn"
            method="dialog"
            type="cancel"
            onClick={resetIsCreated}
          >
            Close
          </button>
        </div>
      </form>
      <form className="form" onSubmit={handleSubmit(handleProjectCreation)}>
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
          defaultValue={priorityOptions[4]}
          styles={colourStyles}
          options={priorityOptions}
          isSearchable={true}
          {...register("priorityLevel", { required: false })}
        />
        {!isCreated && (
          <div className="form-btn__container">
            <button className="form-btn" type="submit">
              Create
            </button>
            <button className="form-btn" type="reset">
              Reset
            </button>
          </div>
        )}
      </form>
      {isCreated && (
        <form method="dialog" className="dialog-btn__form">
          <div className="form-btn__container">
            <button
              className="form-btn form-btn_another-project"
              method="dialog"
              type="button"
              onClick={resetIsCreated}
            >
              Create Another Task
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default AddTask;
