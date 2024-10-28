import { useForm } from "react-hook-form";
import { useState } from "react";
import { postProjectData } from "../api/http-requests";
import { projectEndppoint } from "../api/endpoints";
import {
  errorDeadlineRequired as deadlineReq,
  errorTitleRequired as titleReq,
} from "../constants/error-messages";

function CreateProject() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState();

  const handleProjectCreation = async (data, event) => {
    event.preventDefault();

    try {
      await postProjectData(projectEndppoint, data, "PROJECT");
    } catch (e) {
      // set error
      setError(e);
    }

    console.log(error); // TODO: remove
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(handleProjectCreation)}>
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
        <div className="form-btn__container">
          <button className="form-btn" type="submit">
            Create
          </button>
          <form method="dialog" className="dialog-btn__form">
            <button className="form-btn" method="reset">
              Reset
            </button>
            <button className="form-btn" method="dialog">
              Cancel
            </button>
          </form>
        </div>
      </form>
    </>
  );
}

export default CreateProject;
