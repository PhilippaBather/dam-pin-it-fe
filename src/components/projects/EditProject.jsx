import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Card from "../ui/Card";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import { handleHttpReq } from "../../api/http-requests";
import { projectEndpoint } from "../../api/endpoints";
import {
  errorDeadlineRequired as deadlineReq,
  errorTitleRequired as titleReq,
} from "../../constants/error-messages";
import { getAuthToken } from "../../auth/auth-functions";

function EditProject() {
  const { currProject, setCurrProject } = useProjectContext();
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

  let { id, pid } = useParams();
  const { setModalComponentType } = useUIContext();
  const [isEdited, setIsEdited] = useState(false);

  const alertMsg = `Project Updated`;

  const handleProjectCreation = async (data, event) => {
    const token = getAuthToken();
    event.preventDefault();
    setIsEdited(true);

    try {
      await handleHttpReq(projectEndpoint, data, pid, "PUT", "PROJECT");

      const resp = await fetch(
        `http://localhost:3000/project/user/${id}/project/${pid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Origin: origin,
            Authorizaton: "Bearer " + token,
          },
        }
      );

      const respData = await resp.json();
      setCurrProject(respData);
    } catch (e) {
      console.log(e);
    }
    clearErrors();
    reset({ title: "", description: "", deadline: "" });
  };

  const handleClose = () => {
    clearErrors();
    reset({ title: "", description: "", deadline: "" });
    setModalComponentType(null);
  };

  return (
    <>
      <Card>
        <div className="form-btn__container-close">
          <button className="form-btn" type="button" onClick={handleClose}>
            Close
          </button>
        </div>
        {!isEdited && (
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
                Update
              </button>
              <button className="form-btn" type="reset">
                Reset
              </button>
            </div>
          </form>
        )}
        {isEdited && <h1 className={"delete-modal_title"}>{alertMsg}</h1>}
      </Card>
    </>
  );
}

export default EditProject;
