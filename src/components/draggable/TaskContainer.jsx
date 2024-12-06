import { Draggable } from "react-beautiful-dnd";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import { getItemDragStyle } from "./draggable-utilities";

function TaskContainer({ task }) {
  const { setSelectedTask } = useProjectContext();
  const { setModalComponentType } = useUIContext();

  const viewTaskDetails = (task) => {
    setSelectedTask(task);
    setModalComponentType("VIEW_TASK");
  };

  return (
    <>
      <Draggable draggableId={task.id.toString()} index={task.taskPosition}>
        {(provided, snapshot) => (
          <li
            className={`list-item ${task.priorityLevel.toLowerCase()}-shadow`}
            key={task.id}
          >
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              style={getItemDragStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
              onClick={() => viewTaskDetails(task)}
            >
              <p className="task-title">{task.title}</p>
              <div className="task-info">
                <span className="task-deadline-formatted">
                  {new Date(task.deadline).toLocaleDateString()}
                </span>
                <span
                  className={`dot ${task.priorityLevel.toLowerCase()}`}
                ></span>
              </div>
            </div>
          </li>
        )}
      </Draggable>
    </>
  );
}

export default TaskContainer;
