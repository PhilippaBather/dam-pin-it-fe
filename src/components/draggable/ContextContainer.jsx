import { DragDropContext } from "react-beautiful-dnd";
import ColumnContainer from "./ColumnContainer";
import DroppableContainer from "./DroppableContainer";
import "../../stylesheets/draggables.css";

function ContextContainer() {
  const onDragEnd = () => {};

  const projectTasks = {
    PENDING: {
      tasks: [
        {
          id: "1",
          projectId: "1",
          title: "Task Title",
          description: "taskDescription",
          deadline: "01/01/2025",
          priority: "NORMAL",
          status: "PENDING",
        },
        {
          id: "2",
          projectId: "1",
          title: "Task Title",
          description: "taskDescription",
          deadline: "01/01/2025",
          priority: "NORMAL",
          status: "PENDING",
        },
      ],
    },
    IN_PROGRESS: {
      tasks: [
        {
          id: "3",
          projectId: "1",
          title: "Task Title",
          description: "taskDescription",
          deadline: "01/01/2025",
          priority: "NORMAL",
          status: "IN_PROGRESS",
        },
        {
          id: "4",
          projectId: "1",
          title: "Task Title",
          description: "taskDescription",
          deadline: "01/01/2025",
          priority: "NORMAL",
          status: "IN_PROGRESS",
        },
      ],
    },
    BLOCKED: {
      tasks: [],
    },
    COMPLETED: {
      tasks: [
        {
          id: "5",
          projectId: "1",
          title: "Task Title",
          description: "taskDescription",
          deadline: "01/01/2025",
          priority: "NORMAL",
          status: "COMPLETED",
        },
      ],
    },
  };

  return (
    <ColumnContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        {
          // get the key identifying task status
          Object.keys(projectTasks).map((key) => {
            const column = key;
            // get the task ids pertaining to a task status
            const [...tasks] = projectTasks[key].tasks.map((task) => task);
            return (
              <DroppableContainer
                key={column}
                id={column}
                column={column}
                tasks={tasks}
              />
            );
          })
        }
      </DragDropContext>
    </ColumnContainer>
  );
}

export default ContextContainer;
