import { useRef } from "react";
import Card from "../../components/Card";
import CreateProject from "../../components/CreateProject";
import Modal from "../../components/Modal";
import "../../stylesheets/titles.css";

function ProjectHomePage() {
  const dialog = useRef();

  const handleCreateProject = () => {
    dialog.current.open();
  };

  return (
    <>
      <Modal ref={dialog}>
        <Card>
          <CreateProject />
        </Card>
      </Modal>
      <main className={"private-layout"}>
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
