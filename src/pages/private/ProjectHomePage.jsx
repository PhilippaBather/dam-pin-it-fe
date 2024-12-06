import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Alert from "../../components/ui/Alert";
import Card from "../../components/ui/Card";
import CreateProject from "../../components/projects/CreateProject";
import Modal from "../../components/ui/Modal";
import Sidebar from "../../components/projects/Sidebar";
import { useProjectContext } from "../../context/project-context";
import { getAuthToken } from "../../auth/auth-functions";
import "../../stylesheets/titles.css";

function ProjectHomePage() {
  let { id } = useParams();
  const dialog = useRef();
  const { isAlert, setProjects } = useProjectContext();
  const token = getAuthToken();

  // TODO remove: temp
  // const [isAlert, setIsAlert] = useState(false);

  const handleCreateProject = () => {
    // setIsAlert(false);
    dialog.current.open();
  };

  useEffect(() => {
    // if (isAlert) {
    //   dialog.current.open();
    //   setIsAlert(false);
    // }
    async function fetchData() {
      // if (isAlert) return;
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
  }, [id, setProjects, token, isAlert]);

  return (
    <>
      <Modal ref={dialog}>
        <CreateProject />
        {isAlert && <Alert />}
      </Modal>
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
        {/* <button type="button" className={"card-btn"} onClick={openAlert}>
          <h2 className="title-create_project">Alert Test</h2>
        </button> */}
      </main>
    </>
  );
}

export default ProjectHomePage;
