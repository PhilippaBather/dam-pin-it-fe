import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../ui/Card";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import { getAuthToken } from "../../auth/auth-functions";
import "../../stylesheets/table.css";

function TableShared() {
  const { id } = useParams();
  const token = getAuthToken();
  const { setSelectedSharedProject, sharedProjects, setSharedProjects } =
    useProjectContext();
  const { setModalComponentType } = useUIContext();

  const handleLeaveSharedProject = (project) => {
    setSelectedSharedProject(project);
    setModalComponentType("DELETE_SHARED_PROJECT");
  };

  useEffect(() => {
    const getSharedProjects = async () => {
      try {
        const resp = await fetch(
          `http://localhost:3000/guests/shared-projects/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Origin: origin,
              Authorizaton: "Bearer " + token,
            },
          }
        );
        const data = await resp.json();
        setSharedProjects(data);
      } catch (e) {
        console.error(e);
      }
    };
    getSharedProjects();
  }, [id, setSharedProjects, token]);

  return (
    <section className="table-shared">
      <Card isTableShared>
        <h1 className="table-title">Shared Projects</h1>
        <div className="table-container__head">
          <div className="table-row__head">Project</div>
          <div className="table-row__head">Permissions</div>
          <div className="table-row__head">Deadline</div>
          <div className="table-row__head">Owner</div>
          <div className="table-row__head">Email</div>
          <div className="table-row__head">Remove Project</div>
        </div>
        {sharedProjects &&
          sharedProjects.map((project) => (
            <div key={project.projectId} className="table-row__items">
              <div className="table-row__body">{project.projectTitle}</div>
              <div className="table-row__body">
                {project.permissions.replace("_", " ").toLowerCase()}
              </div>
              <div className="table-row__body">{project.deadline}</div>
              <div className="table-row__body">{`${project.ownerName} ${project.ownerSurname}`}</div>
              <div className="table-row__body">{project.ownerEmail}</div>
              <div className="table-row__body">
                <button
                  className="card-btn table-btn"
                  type="button"
                  onClick={(project) =>
                    handleLeaveSharedProject(project.projectTitle)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        {sharedProjects.length == 0 && (
          <p className="table-msg__not-found">No shared projects found.</p>
        )}
      </Card>
    </section>
  );
}

export default TableShared;
