import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Sidebar from "../../components/projects/Sidebar";
import { useProjectContext } from "../../context/project-context";
import { getAuthToken } from "../../auth/auth-functions";
import "../../stylesheets/titles.css";
import ModalHandler from "../../components/ui/ModalHandler";
import { useUIContext } from "../../context/ui-context";

function ProjectHomePage() {
  let { id } = useParams();
  const { setProjects } = useProjectContext();
  const { modalComponentType, setModalComponentType } = useUIContext();
  const token = getAuthToken();

  const handleCreateProject = () => {
    setModalComponentType("CREATE_PROJECT");
  };

  useEffect(() => {
    async function fetchData() {
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
  }, [id, setProjects, token]);

  return (
    <>
      {modalComponentType && <ModalHandler />}
      <main>
        <Sidebar />
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
