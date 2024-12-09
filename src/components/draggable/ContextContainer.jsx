import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import ColumnContainer from "./ColumnContainer";
import DroppableContainer from "./DroppableContainer";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import { getTaskStatus, parseTaskData } from "./draggable-utilities";
import { handleTaskHTTPRequest } from "../tasks/task-apis";
import {
  FAILED_FETCH,
  MALFORMED_REQUEST,
  UNDEFINED_PARAM,
  UNEXPECTED_JSON,
} from "../../api/api-constants.js";
import "../../stylesheets/draggables.css";

function ContextContainer() {
  const { setGlobalError } = useUIContext();
  const {
    currProject,
    projectTasks,
    updateDraggedTasksXAxis,
    updateDraggedTasksYAxis,
    setTasks,
  } = useProjectContext();
  const { id, pid } = useParams();
  const navigate = useNavigate();
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const errorTxt = "Something went wrong: " + httpError;

  useEffect(() => {
    async function fetchTaskData() {
      setHttpError(false);
      try {
        setIsLoading(true);
        const data = await handleTaskHTTPRequest(
          { tid: null, id, pid },
          "GET",
          "GET_TASK",
          null
        );
        const parsedData = parseTaskData(data);
        setTasks(parsedData);
      } catch (e) {
        if (e.message.toLowerCase().includes("user not found")) {
          setGlobalError(e.message);
          navigate("/error-page");
        } else {
          setHttpError(
            e.message === FAILED_FETCH
              ? "Network error"
              : e.message === UNEXPECTED_JSON ||
                e.message.includes(UNDEFINED_PARAM)
              ? MALFORMED_REQUEST
              : e.message
          );
        }
      }
      setIsLoading(false);
    }
    fetchTaskData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate, setIsLoading, setGlobalError, setHttpError]); // render on page load once

  useEffect(() => {
    async function saveTaskUpdates() {
      setHttpError(false);
      setIsLoading(true);
      try {
        for (let i = 1; i < 5; i++) {
          let data = projectTasks[i]?.tasks;
          await handleTaskHTTPRequest(
            { tid: null, id, pid },
            "POST",
            "POST_BATCH",
            data
          );
        }
      } catch (e) {
        if (e.message.toLowerCase().includes("user not found")) {
          setGlobalError(e.message);
          navigate("/error-page");
        } else {
          setHttpError(
            e.message === FAILED_FETCH
              ? "Network error"
              : e.message === UNEXPECTED_JSON ||
                e.message.includes(UNDEFINED_PARAM)
              ? MALFORMED_REQUEST
              : e.message
          );
        }
      }
    }
    setIsLoading(false);
    if (currProject) {
      saveTaskUpdates();
    }
  }, [
    currProject,
    projectTasks,
    id,
    pid,
    setGlobalError,
    setHttpError,
    navigate,
  ]);

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
      modifiedSourceCol.forEach(
        (task, index) => (task.taskPosition = index + 1)
      );
      // update state
      updateDraggedTasksYAxis(destination.droppableId, modifiedSourceCol);
    } else {
      // filter out dragged task from source column
      const modifiedSourceCol = sourceCol.filter(
        (task) => task.id.toString() !== draggableId
      );
      // update source column
      modifiedSourceCol.map((task) => {
        if (task.taskPosition > draggedTask.taskPosition) {
          --task.taskPosition;
        }
      });
      // update task status (column type)
      draggedTask.taskStatus = getTaskStatus(destination.droppableId);
      // add task to destination column at index matching position
      // destination.index -1: dnd indexing not zero based
      destinationCol.splice(destination.index - 1, 0, draggedTask);
      // update task position values according to array index
      // index + 1: dnd not zero based
      destinationCol.forEach((task, index) => (task.taskPosition = index + 1));

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
    <>
      {httpError && <h1 className="title-page dashboard-error">{errorTxt}</h1>}
      <ColumnContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          {projectTasks &&
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
                  isLoading={isLoading}
                  httpError={httpError}
                />
              );
            })}
        </DragDropContext>
      </ColumnContainer>
    </>
  );
}

export default ContextContainer;
