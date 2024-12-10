import { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../ui/Card";
import FormProject from "../forms/FormProject";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import { handleProjectHTTPRequest } from "./project-apis";
import {
  FAILED_FETCH,
  MALFORMED_REQUEST,
  UNDEFINED_PARAM,
  UNEXPECTED_JSON,
} from "../../api/api-constants.js";

function EditProject() {
  let { id, pid } = useParams();
  const { setCurrProject } = useProjectContext();
  const { setModalComponentType } = useUIContext();
  const [httpError, setHttpError] = useState(null);

  const handleEditProject = async (data, event) => {
    event.preventDefault();
    setHttpError(null);
    if (setCurrProject.permissions === "VIEWER") {
      setHttpError("Insufficient Permissions");
      return;
    }

    try {
      await handleProjectHTTPRequest({ id, pid }, "PUT", "PUT", data);

      const project = await handleProjectHTTPRequest(
        { id, pid },
        "GET",
        "GET_PROJECT",
        null
      );
      setCurrProject(project);
      setModalComponentType(null);
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
    <>
      <Card>
        <FormProject
          btnLabels={["Update", "Reset", "reset"]}
          handleSubmitProject={handleEditProject}
          httpError={httpError}
        />
      </Card>
    </>
  );
}

export default EditProject;
