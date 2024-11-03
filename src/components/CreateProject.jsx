import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postProjectData } from "../api/http-requests";
import { stripQueryParam } from "../utilities/data-parsing";
import { projectEndpoint } from "../api/endpoints";
import {
  errorDeadlineRequired as deadlineReq,
  errorTitleRequired as titleReq,
} from "../constants/error-messages";

function CreateProject() {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  let { id } = useParams();
  const [isCreated, setIsCreated] = useState(false);

  const handleProjectCreation = async (data, event) => {
    event.preventDefault();
    setIsCreated(true);

    try {
      id = stripQueryParam(id, "USER_ID");
      await postProjectData(projectEndpoint, data, id, "PROJECT");
    } catch (e) {
      console.log(e);
    }
    clearErrors();
    reset({ title: "", description: "", deadline: "" });
  };

  const resetIsCreated = () => {
    setIsCreated(false);
    clearErrors();
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
              Create Another Project
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default CreateProject;
