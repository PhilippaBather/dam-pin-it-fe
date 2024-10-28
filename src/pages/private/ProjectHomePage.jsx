import { useRef } from "react";
import Card from "../../components/Card";
import Modal from "../../components/Modal";

function ProjectHomePage() {
  const dialog = useRef();

  const handleCreateProject = () => {
    dialog.current.open();
  };

  return (
    <>
      <main className={"private-layout"}>
        <h1>Project Home Page</h1>
        <Modal ref={dialog} />
        <buton type="button" onClick={handleCreateProject}>
          <Card>
            <h1>Create a new project</h1>
          </Card>
        </buton>
      </main>
    </>
  );
}

export default ProjectHomePage;
