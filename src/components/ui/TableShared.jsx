import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import { useProjectContext } from "../../context/project-context";
import { getAuthToken } from "../../auth/auth-functions";
import "../../stylesheets/table.css";

function TableShared() {
  const { id } = useParams();
  const { sharedProjects, setSharedProjects } = useProjectContext();
  const handleLeaveSharedProject = (projectId) => {
    console.log(projectId);
  };

  useEffect(() => {
    const token = getAuthToken();
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
        console.log(data);
        setSharedProjects(data);
      } catch (e) {
        console.error(e);
      }
    };
    getSharedProjects();
  }, [id, setSharedProjects]);

  return (
    <section className="table-shared">
      <Card isTable>
        <h1 className="table-title">Shared Projects</h1>
        <div className="table-container__head">
          <div className="table-row__head">Project</div>
          <div className="table-row__head">Permissions</div>
          <div className="table-row__head">Deadline</div>
          <div className="table-row__head">Owner</div>
          <div className="table-row__head">Email</div>
          <div className="table-row__head">Remove Project</div>
        </div>
        <div className="table-container__body">
          {sharedProjects &&
            sharedProjects?.map((project) => (
              <>
                <div className="table-row__body">{project.projectTitle}</div>
                <div className="table-row__body">
                  {project.permissions.toLowerCase()}
                </div>
                <div className="table-row__body">{project.deadline}</div>
                <div className="table-row__body">{`${project.ownerName} ${project.ownerSurname}`}</div>
                <div className="table-row__body">{project.ownerEmail}</div>
                <div className="table-row__body">
                  {" "}
                  <button
                    className="card-btn table-btn"
                    type="button"
                    onClick={() => handleLeaveSharedProject(project.projectId)}
                  >
                    Remove
                  </button>
                </div>
              </>
            ))}
        </div>
      </Card>
    </section>
  );
}

export default TableShared;
