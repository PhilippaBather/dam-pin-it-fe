import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useProjectContext } from "../../context/project-context";
import { handleHttpReq } from "../../api/http-requests";
import { projectEndpoint } from "../../api/endpoints";
import {
  errorDeadlineRequired as deadlineReq,
  errorTitleRequired as titleReq,
} from "../../constants/error-messages";

function CreateProject() {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  let { id } = useParams();
  const { currProject, setCurrProject } = useProjectContext();
  const navigate = useNavigate();
  const [isCreated, setIsCreated] = useState(false);

  const handleProjectCreation = async (data, event) => {
    event.preventDefault();
    setIsCreated(true);

    try {
      const resp = await handleHttpReq(
        projectEndpoint,
        data,
        id,
        "POST",
        "PROJECT"
      );
      setCurrProject(resp);
    } catch (e) {
      console.log(e);
    }
    clearErrors();
    reset({ title: "", description: "", deadline: "" });
  };

  const resetIsCreated = () => {
    clearErrors();
    reset({ title: "", description: "", deadline: "" });
    setIsCreated(false);

    const route = `/projects-home/user/${id}/project/${currProject.projectId}`;
    navigate(route);
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
