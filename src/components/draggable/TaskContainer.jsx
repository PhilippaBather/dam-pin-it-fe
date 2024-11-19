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
    console.log(task);
  };

  return (
    <>
      <Draggable draggableId={task.id.toString()} index={task.taskPosition}>
        {(provided, snapshot) => (
          <li className="list-item" key={task.id}>
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
                <p className="task-deadline-formatted"> {task.deadline}</p>
                <p className="task-priority"> {task.priority}</p>
              </div>
            </div>
          </li>
        )}
      </Draggable>
    </>
  );
}

export default TaskContainer;
