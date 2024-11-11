import { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ColumnContainer from "./ColumnContainer";
import DroppableContainer from "./DroppableContainer";
import { useProjectContext } from "../../context/project-context";
import {
  getModStartColTaskIds,
  getDraggedTaskIndex,
  updateTaskPositionInColumn,
  filterTasksInStartColumn,
  addTaskToEndColumn,
} from "./draggable-utilities";
import "../../stylesheets/draggables.css";

function ContextContainer() {
  const {
    projectTasks,
    setTasks,
    updateDraggedTasksXAxis,
    updateDraggedTasksYAxis,
  } = useProjectContext();

  useEffect(() => {
    setTasks({
      PENDING: {
        tasks: [
          {
            id: 1,
            projectId: "1",
            title: "Task 1",
            description: "taskDescription",
            deadline: "01/01/2025",
            priority: "NORMAL",
            status: "PENDING",
            position: 1,
          },
          {
            id: 2,
            projectId: "1",
            title: "Task 2",
            description: "taskDescription",
            deadline: "01/01/2025",
            priority: "NORMAL",
            status: "PENDING",
            position: 2,
          },
        ],
      },
      IN_PROGRESS: {
        tasks: [
          {
            id: 3,
            projectId: "1",
            title: "Task 3",
            description: "taskDescription",
            deadline: "01/01/2025",
            priority: "NORMAL",
            status: "IN_PROGRESS",
            position: 1,
          },
          {
            id: 4,
            projectId: "1",
            title: "Task 4",
            description: "taskDescription",
            deadline: "01/01/2025",
            priority: "NORMAL",
            status: "IN_PROGRESS",
            position: 2,
          },
        ],
      },
      BLOCKED: {
        tasks: [],
      },
      COMPLETED: {
        tasks: [
          {
            id: 5,
            projectId: "1",
            title: "Task 5",
            description: "taskDescription",
            deadline: "01/01/2025",
            priority: "NORMAL",
            status: "COMPLETED",
            position: 1,
          },
        ],
      },
    });
  }, [setTasks]);

  const onDragEnd = (result) => {
    if (!projectTasks) {
      return;
    }
    const { draggableId, source, destination } = result;
    console.log(result);
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const startCol = projectTasks[source.droppableId];
    const endCol = projectTasks[destination.droppableId];
    let newStartTaskIds = [];
    for (let i = 0; i < startCol.tasks.length; i++) {
      newStartTaskIds.push(startCol.tasks[i].id);
    }
    const [draggedItem] = newStartTaskIds.splice(projectTasks[source.index], 1);
    if (startCol === endCol) {
      const modStartCol = getModStartColTaskIds({
        destination,
        newStartTaskIds,
        draggedItem,
        startCol,
        sameCol: true,
      });
      const updatedTasks = updateTaskPositionInColumn(
        destination.droppableI,
        projectTasks,
        modStartCol
      );
      updateDraggedTasksXAxis(updatedTasks);
    } else {
      const modStartColumn = startCol.tasks
        .map((task) => task.id)
        .filter((id) => id !== parseInt(draggableId));

      // const draggedTaskArrayIndex = getDraggedTaskIndex({
      //   destination,
      //   draggableId,
      //   startCol,
      //   endCol,
      // });

      const updatedTasksStartCol = filterTasksInStartColumn(
        source.droppableId,
        modStartColumn,
        projectTasks
      );

      const updatedTasksEndCol = addTaskToEndColumn(
        draggableId,
        source.droppableId,
        destination.droppableId,
        projectTasks
      );

      updateDraggedTasksYAxis(
        source.droppableId,
        updatedTasksStartCol,
        destination.droppableId,
        updatedTasksEndCol
      );
    }
  };

  return (
    <ColumnContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        {
          // get the key identifying task status
          Object.keys(projectTasks).map((key) => {
            const column = key;
            console.log(projectTasks);

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
