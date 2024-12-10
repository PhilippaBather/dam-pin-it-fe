import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import Card from "../../components/ui/Card";
import FormTask from "../forms/FormTask";
import { handleTaskHTTPRequest } from "./task-apis.js";
import {
  resetTaskPositionOnTaskDeletion,
  updateColumnOnTaskUpdate,
} from "../draggable/draggable-utilities.js";
import { processUpdatedTaskData } from "./task-utilities.js";
import {
  FAILED_FETCH,
  MALFORMED_REQUEST,
  UNDEFINED_PARAM,
  UNEXPECTED_JSON,
} from "../../api/api-constants.js";

function TaskViewer() {
  const { id, pid } = useParams();
  const [httpError, setHttpError] = useState(null);
  const [selectOption, setSelectOption] = useState("");
  const { projectTasks, resetTaskState, selectedTask, setSelectedTask } =
    useProjectContext();
  const { columnClicked, setModalComponentType } = useUIContext();

  const handleSubmit = async (data, event) => {
    event.preventDefault();

    const processedData = processUpdatedTaskData(
      data,
      selectOption,
      selectedTask,
      columnClicked,
      pid
    );

    try {
      setHttpError(null);
      await handleTaskHTTPRequest(
        { tid: selectedTask.id, id, pid },
        "PUT",
        "UPDATE",
        processedData
      );
      const updatedColumn = updateColumnOnTaskUpdate(
        projectTasks,
        selectedTask,
        processedData,
        columnClicked
      );
      // update task in tasks state and reset ui context
      resetState(updatedColumn, columnClicked);
      resetContext();
    } catch (e) {
      setHttpError(
        e.message === FAILED_FETCH
          ? "Network error"
          : e.message === UNEXPECTED_JSON || e.message.includes(UNDEFINED_PARAM)
          ? MALFORMED_REQUEST
          : e.message
      );
    }
  };

  const handleDelete = async () => {
    setHttpError(null);
    try {
      await handleTaskHTTPRequest(
        { tid: selectedTask.id, id, pid },
        "DELETE",
        "UPDATE",
        null
      );
      // reorder
      const reorderedTasks = resetTaskPositionOnTaskDeletion(
        projectTasks,
        selectedTask,
        parseInt(columnClicked)
      );
      // update task in tasks state and reset ui context
      resetState(reorderedTasks, parseInt(columnClicked));
      resetContext();
    } catch (e) {
      setHttpError(
        e.message === FAILED_FETCH
          ? "Network error"
          : e.message === UNEXPECTED_JSON
          ? MALFORMED_REQUEST
          : e.message
      );
    }
  };

  const resetState = (reorderedTasks, col) => {
    resetTaskState(reorderedTasks, parseInt(col));
  };

  const resetContext = () => {
    setModalComponentType(null);
    setSelectedTask(null);
  };

  return (
    <Card>
      <FormTask
        httpError={httpError}
        setSelectOption={setSelectOption}
        btnLabels={["Update", "Delete"]}
        handleTaskSubmit={handleSubmit}
        handleTaskDelete={handleDelete}
      />
    </Card>
  );
}

export default TaskViewer;
