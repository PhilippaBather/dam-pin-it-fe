import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import ModalHandler from "../../components/ui/ModalHandler";
import Sidebar from "../../components/projects/Sidebar";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import { handleProjectHTTPRequest } from "../../components/projects/project-apis";
import {
  FAILED_FETCH,
  MALFORMED_REQUEST,
  UNDEFINED_PARAM,
  UNEXPECTED_JSON,
} from "../../api/http-requests.js";
import "../../stylesheets/titles.css";

function ProjectHomePage() {
  let { id } = useParams();
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setProjects } = useProjectContext();
  const { modalComponentType, setModalComponentType } = useUIContext();

  const handleCreateProject = () => {
    setModalComponentType("CREATE_PROJECT");
  };

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const data = await handleProjectHTTPRequest(
          { id, pid: null },
          "GET",
          "GET_PROJECTS",
          null
        );

        const sortedProjects = data?.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setProjects(sortedProjects);
        // }
      } catch (e) {
        setIsLoading(false);
        setHttpError(
          e.message === FAILED_FETCH
            ? "Network error"
            : e.message === UNEXPECTED_JSON ||
              e.message.includes(UNDEFINED_PARAM)
            ? MALFORMED_REQUEST
            : e.message
        );
      }
    }

    fetchData();
  }, [id, setProjects, setIsLoading]);

  return (
    <>
      {modalComponentType && <ModalHandler />}
      <main>
        <Sidebar isLoading={isLoading} httpError={httpError} />
        <h1 className="title-homepage">Project Home Page</h1>
        <Card>
          <button
            type="button"
            className={"card-btn"}
            onClick={handleCreateProject}
          >
            <h2 className="title-create_project">Create a new project</h2>
          </button>
        </Card>
      </main>
    </>
  );
}

export default ProjectHomePage;
