import { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/ui/Card.jsx";
import FormTask from "../forms/FormTask.jsx";
import { useProjectContext } from "../../context/project-context.jsx";
import { useUIContext } from "../../context/ui-context.jsx";
import { getAuthToken } from "../../auth/auth-functions.js";
import { resetTaskOrderInColumn } from "../draggable/draggable-utilities.js";
import {
  processNewTaskData,
  validateTaskDeadlineDate,
} from "./task-utilities-js";

function AddTask() {
  const [selectOption, setSelectOption] = useState("");
  const [dateValError, setDateValError] = useState(null);
  const { projectTasks, resetTaskState, currProject } = useProjectContext();
  const { setModalComponentType } = useUIContext();
  const { id, pid } = useParams();

  const handleTaskSubmit = async (data, event) => {
    event.preventDefault();

    setDateValError(null); // reset

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

    const token = getAuthToken();

    try {
      // save updated tasks in batch
      const resp = await fetch(
        `http://localhost:3000/tasks/user/${id}/project/${pid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Origin: origin,
            Authorizaton: "Bearer " + token,
          },
          body: JSON.stringify(processedData),
        }
      );
      const savedTask = await resp.json();

      // add saved task and revise task positions in column
      const updatedTaskOrderInColumn = resetTaskOrderInColumn(
        savedTask,
        projectTasks,
        1
      );

      await fetch(
        `http://localhost:3000/tasks-list/user/${id}/project/${pid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Origin: origin,
            Authorizaton: "Bearer " + token,
          },
          body: JSON.stringify(updatedTaskOrderInColumn),
        }
      );

      resetContext(updatedTaskOrderInColumn, 1);
    } catch (e) {
      console.error(e);
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
