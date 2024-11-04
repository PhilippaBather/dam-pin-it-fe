import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card";
import CreateProject from "../../components/CreateProject";
import Modal from "../../components/Modal";
import Sidebar from "../../components/Sidebar";
import { useProjectContext } from "../../context/project-context";
import { getAuthToken } from "../../auth/auth-functions";
import "../../stylesheets/titles.css";

function ProjectHomePage() {
  let { id } = useParams();
  const dialog = useRef();
  const { setProjects } = useProjectContext();
  const token = getAuthToken();

  const handleCreateProject = () => {
    dialog.current.open();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch(`http://localhost:3000/projects/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Origin: origin,
            Authorizaton: "Bearer " + token,
          },
        });
        const data = await resp.json();
        const sortedProjects = data.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setProjects(sortedProjects);
      } catch (e) {
        console.error(e);
      }
    }

    fetchData();
  }, [id, token, setProjects]);

  return (
    <>
      <Modal ref={dialog}>
        <Card>
          <CreateProject />
        </Card>
      </Modal>
      <main>
        <Sidebar />
        <h1 className="title-page">Project Home Page</h1>
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
