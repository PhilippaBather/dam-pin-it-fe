import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import FormProject from "../forms/FormProject";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import { validateDeadlineDate } from "./project-utilities";
import { handleProjectHTTPRequest } from "./project-apis";
import {
  FAILED_FETCH,
  MALFORMED_REQUEST,
  UNDEFINED_PARAM,
  UNEXPECTED_JSON,
} from "../../api/api-constants.js";

function CreateProject() {
  let { id } = useParams();

  const [isDeadlineValError, setDeadlineValError] = useState(false);
  const [httpError, setHttpError] = useState(null);
  const { setCurrProject } = useProjectContext();
  const { setModalComponentType } = useUIContext();
  const navigate = useNavigate();

  const handleCreateProject = async (data, event) => {
    event.preventDefault();

    setDeadlineValError(false);
    const isValError = validateDeadlineDate(data.deadline, setDeadlineValError);

    if (isValError) return;

    try {
      const newProject = await handleProjectHTTPRequest(
        { id, pid: null },
        "POST",
        "POST",
        data
      );

      setCurrProject(newProject);
      setModalComponentType(null);

      const route = `/projects-home/user/${id}/project/${newProject.projectId}`;
      navigate(route);
    } catch (e) {
      setHttpError(
        e.message === FAILED_FETCH
          ? "Network error"
          : e.message === UNEXPECTED_JSON || e.message.includes(UNDEFINED_PARAM)
          ? MALFORMED_REQUEST
          : e.message
      );
    }
  };

  return (
    <Card>
      <FormProject
        btnLabels={["Create", "Reset", "reset"]}
        handleSubmitProject={handleCreateProject}
        deadlineValError={isDeadlineValError}
        httpError={httpError}
      />
    </Card>
  );
}

export default CreateProject;
