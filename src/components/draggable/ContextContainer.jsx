import { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ColumnContainer from "./ColumnContainer";
import DroppableContainer from "./DroppableContainer";
import { useProjectContext } from "../../context/project-context";
import "../../stylesheets/draggables.css";

function ContextContainer() {
  const { projectTasks, updateDraggedTasksXAxis, updateDraggedTasksYAxis } =
    useProjectContext();

  useEffect(() => {}, [projectTasks]);

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

    let sourceCol = projectTasks[source.droppableId].tasks;
    const destinationCol = projectTasks[destination.droppableId].tasks;

    const draggedTask = sourceCol.filter(
      (task) => task.id.toString() === draggableId
    )[0];

    if (source.droppableId === destination.droppableId) {
      // filter out dragged task
      const modifiedSourceCol = sourceCol.filter(
        (task) => task.id.toString() !== draggableId
      );
      // add dragged task at array index matching modified position
      // destination.index -1: dnd indexing not zero based
      modifiedSourceCol.splice(destination.index - 1, 0, draggedTask);
      // update task position values according to array index
      // index + 1: dnd not zero based
      modifiedSourceCol.forEach((task, index) => (task.position = index + 1));
      // update state
      updateDraggedTasksYAxis(destination.droppableId, modifiedSourceCol);
    } else {
      // filter out dragged task from source column
      const modifiedSourceCol = sourceCol.filter(
        (task) => task.id.toString() !== draggableId
      );
      // add task to destination column at index matching position
      // destination.index -1: dnd indexing not zero based
      destinationCol.splice(destination.index - 1, 0, draggedTask);
      // update task position values according to array index
      // index + 1: dnd not zero based
      destinationCol.forEach((task, index) => (task.position = index + 1));

      // update state
      updateDraggedTasksXAxis(
        source.droppableId,
        destination.droppableId,
        modifiedSourceCol,
        destinationCol
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
