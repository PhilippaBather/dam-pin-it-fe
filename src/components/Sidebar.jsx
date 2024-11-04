import { Link, useParams } from "react-router-dom";
import { useProjectContext } from "../context/project-context";
import "../stylesheets/sidebar.css";

function Sidebar() {
  const { projects } = useProjectContext();
  let { id } = useParams();
  const route = `/projects-home/user/${id}/project/`;

  return (
    <aside className="sidebar_container">
      <h1>
        <span className={"sidebar-icon"}>&#128204;</span>Projects Menu
      </h1>
      <div>
        {!projects && <p>Looks like you&apos;ve got no projects.</p>}
        <ul className={"menu-items"}>
          {projects &&
            projects?.map((project) => (
              <li key={project.projectId} className="menu-items_item">
                <Link
                  to={route + project.projectId}
                  className="menu-items_item-link"
                >
                  {project.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
