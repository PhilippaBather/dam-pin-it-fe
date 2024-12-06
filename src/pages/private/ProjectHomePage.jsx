import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import ModalHandler from "../../components/ui/ModalHandler";
import Sidebar from "../../components/projects/Sidebar";
import { useProjectContext } from "../../context/project-context";
import { getAuthToken } from "../../auth/auth-functions";
import { useUIContext } from "../../context/ui-context";
import "../../stylesheets/titles.css";

function ProjectHomePage() {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { setProjects } = useProjectContext();
  const { modalComponentType, setModalComponentType } = useUIContext();
  const token = getAuthToken();

  const handleCreateProject = () => {
    setModalComponentType("CREATE_PROJECT");
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const resp = await fetch(
          `http://localhost:3000/projects/${parseInt(id)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Origin: origin,
              Authorizaton: "Bearer " + token,
            },
          }
        );
        if (resp) {
          const data = await resp.json();
          const sortedProjects = data?.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          setProjects(sortedProjects);
        }
      } catch (e) {
        console.error(e);
      }
    }

    fetchData();
  }, [id, setProjects, token, setIsLoading]);

  return (
    <>
      {modalComponentType && <ModalHandler />}
      <main>
        <Sidebar isLoading={isLoading} />
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
