import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import ColumnContainer from "./ColumnContainer";
import DroppableContainer from "./DroppableContainer";
import { useProjectContext } from "../../context/project-context";
import { getAuthToken } from "../../auth/auth-functions";
import { parseTaskData } from "./draggable-utilities";
import "../../stylesheets/draggables.css";

function ContextContainer() {
  const {
    projectTasks,
    updateDraggedTasksXAxis,
    updateDraggedTasksYAxis,
    setTasks,
  } = useProjectContext();
  const { id, pid } = useParams();

  useEffect(() => {
    async function fetchTaskData() {
      try {
        const token = getAuthToken();

        const resp = await fetch(
          `http://localhost:3000/tasks/user/${id}/project/${pid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Origin: origin,
              Authorizaton: "Bearer " + token,
            },
          }
        );
        const data = await resp.json();
        const parsedData = parseTaskData(data);
        setTasks(parsedData);
      } catch (e) {
        console.error(e);
      }
    }

    fetchTaskData();
  }, [id, pid, setTasks, projectTasks]);

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
