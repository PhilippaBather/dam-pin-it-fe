import { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ColumnContainer from "./ColumnContainer";
import DroppableContainer from "./DroppableContainer";
import { useProjectContext } from "../../context/project-context";
import {
  getModStartCol,
  getModEndCol,
  updatedClonedTasks,
} from "./draggable-utilities";
import "../../stylesheets/draggables.css";

function ContextContainer() {
  const { projectTasks, setTasks, updateDraggedTasksXAxis } =
    useProjectContext();

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
      const modStartCol = getModStartCol({
        destination,
        newStartTaskIds,
        draggedItem,
        startCol,
        sameCol: true,
      });
      const updatedTasks = updatedClonedTasks(
        destination.droppableI,
        projectTasks,
        modStartCol
      );
      updateDraggedTasksXAxis(updatedTasks);
      // handleReorderUpdates(revisedColumn);
    } else {
      const modStartColumn = startCol.tasks.filter(
        (task) => task.id !== parseInt(draggableId)
      );
      const modEndColumn = getModEndCol({
        destination,
        draggableId,
        startCol,
        endCol,
      });
      console.log(modStartColumn);
      console.log(modEndColumn);

      // updatedStartColumn: get clone where clone only contains the ids in modStartColumn
      // updatedEndColumn: get clone where clone inserts task by task ID in the correct status object
      // so, need destination.draggableId: to insrt task according to the correct status
      // source.draggableId: to get task to insert
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
