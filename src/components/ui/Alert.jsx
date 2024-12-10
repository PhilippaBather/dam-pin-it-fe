import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import Card from "./Card";

function Alert() {
  const { projectNotifications, projects } = useProjectContext();
  const { setModalComponentType } = useUIContext();

  const handleClose = () => {
    setModalComponentType(null);
  };

  return (
    <Card isAlert>
      <form>
        <h1>New Shared Projects</h1>
        <ul className="alert-projects_shared">
          {projects.map(
            (project) =>
              projectNotifications.includes(project.projectId) && (
                <li key={project.projectId}>{project.title}</li>
              )
          )}
        </ul>
        <div className="form-btn__container">
          <button type="button" className="card-btn" onClick={handleClose}>
            Okay
          </button>
        </div>
      </form>
    </Card>
  );
}

export default Alert;
