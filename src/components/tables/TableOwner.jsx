import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import { getAuthToken } from "../../auth/auth-functions";
import Card from "../ui/Card";
import "../../stylesheets/table.css";

function TableOwner() {
  const { id } = useParams();
  const token = getAuthToken();
  const {
    ownedProjects,
    setCurrProject,
    setSelectedGuest,
    setSelectedSharedProject,
    setOwnedProjects,
  } = useProjectContext();

  const { setModalComponentType } = useUIContext();

  const handleClick = (guest = null, project, componentType) => {
    setSelectedGuest(guest);
    setSelectedSharedProject(project); // TODO remove and replace w/ currProject state
    setCurrProject(project);
    setModalComponentType(componentType);
  };

  useEffect(() => {
    const getOwnedProjects = async () => {
      try {
        const resp = await fetch(
          `http://localhost:3000/guests/owned-projects/${id}`,
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
        setOwnedProjects(data);
      } catch (e) {
        console.error(e);
      }
    };
    getOwnedProjects();
  }, [id, setOwnedProjects, token]);
  return (
    <section className="table-owned">
      <Card isTable>
        <h1 className="table-title">Owned Projects</h1>
        <div className="table-container__head">
          <div className="table-row__head head-title">Project</div>
          <div className="table-row__head">Deadline</div>
          <div className="table-row__head ">Delete</div>
          <div className="table-row__head head-guests">Guests</div>
          <div className="table-row__head">Permissions</div>
          <div className="table-row__head">Edit</div>
          <div className="table-row__head">Delete</div>
          <div className="table-row__head">Invite</div>
        </div>
        <div>
          {ownedProjects &&
            ownedProjects?.map((project) => (
              <div key={project.projectId} className="table-row__items">
                <div className="table-row__body item-title">
                  {project.title}
                </div>
                <div className="table-row__body item-deadline">
                  {project.deadline}
                </div>
                <div className="table-row__body body-guests item-btn">
                  <button
                    className="card-btn table-btn"
                    type="button"
                    onClick={() => handleClick(null, project, "DELETE_PROJECT")}
                  >
                    Delete
                  </button>
                </div>
                <div className="table-row__body item-email">
                  <ul className="table-row__body-list">
                    {project?.guestList.map((guest) => (
                      <li
                        key={guest?.guestId}
                        className="table-row__body-guests"
                      >
                        {guest?.email}
                      </li>
                    ))}
                    {project.guestList.length === 0 && (
                      <li className="table-row__body-guests">None</li>
                    )}
                  </ul>
                </div>
                <div className="table-row__body item-permissions">
                  <ul className="table-row__body-list">
                    {project?.guestList.map((guest) => (
                      <li
                        key={guest?.guestId}
                        className="table-row__body-guests"
                      >
                        {guest?.permissions.replace("_", " ").toLowerCase()}
                      </li>
                    ))}
                    {project.guestList.length === 0 && (
                      <li className="table-row__body-guests">None</li>
                    )}
                  </ul>
                </div>
                <div className="table-row__body item-btn">
                  <ul className="table-row__body-list">
                    {project?.guestList.map((guest) => (
                      <li key={guest?.guestId}>
                        <button
                          className="card-btn table-btn"
                          type="button"
                          onClick={() =>
                            handleClick(guest, project, "UPDATE_GUEST")
                          }
                        >
                          Edit
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="table-row__body item-btn">
                  <ul className="table-row__body-list">
                    {project.guestList.map((guest) => (
                      <li key={guest?.guestId}>
                        <button
                          className="card-btn table-btn"
                          type="button"
                          onClick={() =>
                            handleClick(guest, project, "DELETE_GUEST")
                          }
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="table-row__body item-btn">
                  <button
                    className="card-btn table-btn"
                    type="button"
                    onClick={() => handleClick(null, project, "INVITE_GUEST")}
                  >
                    Invite
                  </button>
                </div>
              </div>
            ))}
          {ownedProjects.length == 0 && (
            <p className="table-msg__not-found">No owned projects found.</p>
          )}
        </div>
      </Card>
    </section>
  );
}

export default TableOwner;
