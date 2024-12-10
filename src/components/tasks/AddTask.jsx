import { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/ui/Card.jsx";
import FormTask from "../forms/FormTask.jsx";
import { useProjectContext } from "../../context/project-context.jsx";
import { useUIContext } from "../../context/ui-context.jsx";
import { handleTaskHTTPRequest } from "./task-apis.js";
import { resetTaskOrderInColumn } from "../draggable/draggable-utilities.js";
import {
  processNewTaskData,
  validateTaskDeadlineDate,
} from "./task-utilities.js";
import {
  FAILED_FETCH,
  MALFORMED_REQUEST,
  UNDEFINED_PARAM,
  UNEXPECTED_JSON,
} from "../../api/api-constants.js";

function AddTask() {
  const [dateValError, setDateValError] = useState(null);
  const [httpError, setHttpError] = useState(null);
  const [selectOption, setSelectOption] = useState("");
  const { projectTasks, resetTaskState, currProject } = useProjectContext();
  const { setModalComponentType } = useUIContext();
  const { id, pid } = useParams();

  const handleTaskSubmit = async (data, event) => {
    event.preventDefault();

    setDateValError(null); // reset
    setHttpError(null);

    if (currProject.permissions === "VIEWER") {
      setHttpError("Insufficient Permissions");
      return;
    }

    // check date valid, if not valid, error msg
    // if valid processNewTaskData
    const isDateValidationError = validateTaskDeadlineDate(
      data.deadline,
      currProject.deadline,
      setDateValError
    );

    if (isDateValidationError) {
      return;
    }
    const processedData = processNewTaskData(data, selectOption, pid);

    try {
      const savedTask = await handleTaskHTTPRequest(
        { tid: null, id, pid },
        "POST",
        "POST",
        processedData
      );
      // add saved task and revise task positions in column
      const updatedTaskOrderInColumn = resetTaskOrderInColumn(
        savedTask,
        projectTasks,
        1
      );

      // save updated tasks in batch (processed Data)
      await handleTaskHTTPRequest(
        { tid: null, id, pid },
        "POST",
        "POST_BATCH",
        updatedTaskOrderInColumn
      );
      resetContext(updatedTaskOrderInColumn, 1);
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

  const resetContext = (updatedTasks, col) => {
    resetTaskState(updatedTasks, col);
    setModalComponentType(null);
  };

  return (
    <>
      <Card>
        <FormTask
          httpError={httpError}
          btnLabels={["Create", "Reset"]}
          handleTaskSubmit={handleTaskSubmit}
          setSelectOption={setSelectOption}
          dateValError={dateValError}
        />
      </Card>
    </>
  );
}

export default AddTask;
