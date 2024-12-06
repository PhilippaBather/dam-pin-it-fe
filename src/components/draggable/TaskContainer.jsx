import { Draggable } from "react-beautiful-dnd";
//import { getPriorityValue } from "../../utilities/data-utilities";

const getItemDragStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? `rgb(251, 5, 173)` : "white",
  border: `1px solid grey`,
  borderRadius: `5px`,
  color: isDragging ? "white" : "black",

  ...draggableStyle,
});

function TaskContainer({ task }) {
  return (
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
            //onClick={() => viewTaskDetails(task)}
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
  );
}

export default TaskContainer;
