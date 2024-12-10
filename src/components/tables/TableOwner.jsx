import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import Card from "../ui/Card";
import LoadingDots from "../ui/spinners/LoadingDots";
import { handleManagementHTTPRequest } from "./table-apis";
import {
  FAILED_FETCH,
  MALFORMED_REQUEST,
  UNDEFINED_PARAM,
  UNEXPECTED_JSON,
} from "../../api/api-constants.js";
import "../../stylesheets/table.css";

function TableOwner() {
  const { id } = useParams();
  const {
    ownedProjects,
    setCurrProject,
    setSelectedGuest,
    setSelectedSharedProject,
    setOwnedProjects,
  } = useProjectContext();

  const { setModalComponentType } = useUIContext();
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const route = `/projects-home/user/${id}/project/`;

  const handleClick = (guest = null, project, componentType) => {
    console.log(project);
    setSelectedGuest(guest);
    setSelectedSharedProject(project); // TODO remove and replace w/ currProject state
    setCurrProject(project);
    setModalComponentType(componentType);
  };

  useEffect(() => {
    setHttpError(null);
    const getOwnedProjects = async () => {
      try {
        setIsLoading(true);
        const projects = await handleManagementHTTPRequest(
          id,
          "GET",
          "OWNED_PROJECTS",
          null
        );
        setOwnedProjects(projects);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setHttpError(
          e.message === FAILED_FETCH
            ? "Network error"
            : e.message === UNEXPECTED_JSON ||
              e.message.includes(UNDEFINED_PARAM)
            ? MALFORMED_REQUEST
            : e.message
        );
      }
    };
    getOwnedProjects();
  }, [id, setOwnedProjects, setIsLoading]);

  return (
    <section className="section-table">
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
          {ownedProjects !== null &&
            ownedProjects?.map((project) => (
              <div key={project?.projectId} className="table-row__items">
                <div className="table-row__body item-title">
                  <Link
                    className="table-row__link"
                    to={route + project.projectId}
                  >
                    {project.title}
                  </Link>
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
                        {guest?.permissions?.replace("_", " ").toLowerCase()}
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
          {httpError && <span className="table-msg__error">{httpError}</span>}
          {!httpError && !isLoading && ownedProjects?.length === 0 && (
            <p className="table-msg__not-found">No owned projects found.</p>
          )}
          {isLoading && !httpError && (
            <LoadingDots dotColor="rgba(202, 247, 170, 0.5)" />
          )}
        </div>
      </Card>
    </section>
  );
}

export default TableOwner;
