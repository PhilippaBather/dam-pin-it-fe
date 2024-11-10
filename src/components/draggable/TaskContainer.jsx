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
  console.log(task.id);
  const viewTaskDetails = (task) => {
    console.log(task);
    //setCurrentTask(id);
    //setModal("SELECTED_TASK");
  };

  return (
    <Draggable draggableId={task.id} index={task.id}>
      {(provided, snapshot) => (
        <li className={"list-item"} key={task.id}>
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
            <p className={"task-title"}>{task.title}</p>
            <p className={"task-deadline-formatted"}>{task.deadline}</p>

            <span className={"task-priority"}>{task.priority}</span>
          </div>
        </li>
      )}
    </Draggable>
  );
}

export default TaskContainer;
