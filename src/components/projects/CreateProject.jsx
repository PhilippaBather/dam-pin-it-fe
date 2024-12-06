import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Card from "../ui/Card";
import FormProject from "../forms/FormProject";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import {
  handleCreateProjectRequest,
  validateDeadlineDate,
} from "./project-utilities";

function CreateProject() {
  let { id } = useParams();

  const { clearErrors, reset } = useForm();
  const [isDeadlineValError, setDeadlineValError] = useState(false);
  const [httpReqError, setHttpReqError] = useState(null);
  const { setCurrProject } = useProjectContext();
  const { setModalComponentType } = useUIContext();
  const navigate = useNavigate();

  const handleCreateProject = async (data, event) => {
    event.preventDefault();

    setDeadlineValError(false);
    const isValError = validateDeadlineDate(data.deadline, setDeadlineValError);

    if (isValError) return;

    const savedProject = await handleCreateProjectRequest(
      data,
      id,
      setHttpReqError
    );

    if (httpReqError !== null) return;

    setCurrProject(savedProject);
    clearErrors();
    reset({ title: "", description: "", deadline: "" });

    setModalComponentType(null);

    const route = `/projects-home/user/${id}/project/${savedProject.projectId}`;
    navigate(route);
  };

  return (
    <Card>
      <FormProject
        btnLabels={["Create", "Reset", "reset"]}
        handleSubmitProject={handleCreateProject}
        deadlineValError={isDeadlineValError}
        httpReqError={httpReqError}
        reset={reset}
      />
    </Card>
  );
}

export default CreateProject;
