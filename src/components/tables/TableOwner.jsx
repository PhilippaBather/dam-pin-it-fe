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
    setSelectedGuest,
    setSelectedSharedProject,
    setOwnedProjects,
  } = useProjectContext();
  const { setSelectedOwnedProject, setModalComponentType } = useUIContext();

  // const handleDeleteGuest = (guest, project) => {
  //   setSelectedGuest(guest);
  //   setSelectedSharedProject(project);
  //   setModalComponentType("DELETE_SHARED_PROJECT");
  // };

  const handleClick = (guest = null, project, componentType) => {
    setSelectedGuest(guest);
    setSelectedSharedProject(project);
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
          <div className="table-row__head">Project</div>
          <div className="table-row__head">Deadline</div>
          <div className="table-row__head">Guests</div>
          <div className="table-row__head">Permissions</div>
          <div className="table-row__head">Update Guest</div>
          <div className="table-row__head">Delete Guest</div>
          <div className="table-row__head">Invite Guest</div>
        </div>
        <div>
          {ownedProjects &&
            ownedProjects.map((project) => (
              <div key={project.projectId} className="table-row__items">
                <div className="table-row__body">{project.title}</div>
                <div className="table-row__body">{project.deadline}</div>
                <div className="table-row__body">
                  <ul className="table-row__body-list">
                    {project.guestList.map((guest) => (
                      <li
                        key={guest.guestId}
                        className="table-row__body-guests"
                      >
                        {guest.email}
                      </li>
                    ))}
                    {project.guestList.length === 0 && (
                      <li className="table-row__body-guests">None</li>
                    )}
                  </ul>
                </div>
                <div className="table-row__body">
                  <ul className="table-row__body-list">
                    {project.guestList.map((guest) => (
                      <li
                        key={guest.guestId}
                        className="table-row__body-guests"
                      >
                        {guest.permissions.toLowerCase()}
                      </li>
                    ))}
                    {project.guestList.length === 0 && (
                      <li className="table-row__body-guests">None</li>
                    )}
                  </ul>
                </div>
                <div className="table-row__body">
                  <ul className="table-row__body-list">
                    {project.guestList.map((guest) => (
                      <li key={guest.guestId}>
                        <button
                          className="card-btn table-btn"
                          type="button"
                          onClick={() =>
                            handleClick(
                              guest,
                              project,
                              "UPDATE_GUEST_PERMISSIONS"
                            )
                          }
                        >
                          Update
                        </button>
                      </li>
                    ))}
                    {project.guestList.length === 0 && (
                      <li>
                        <button
                          className="card-btn table-btn"
                          type="button"
                          disabled
                        >
                          Update
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="table-row__body">
                  <ul className="table-row__body-list">
                    {project.guestList.map((guest) => (
                      <li key={guest.guestId}>
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
                    {project.guestList.length === 0 && (
                      <li>
                        <button
                          className="card-btn table-btn"
                          type="button"
                          disabled
                        >
                          Delete
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="table-row__body">
                  <button
                    className="card-btn table-btn"
                    type="button"
                    onClick={() => handleClick(project, "INVITE_GUEST")}
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
