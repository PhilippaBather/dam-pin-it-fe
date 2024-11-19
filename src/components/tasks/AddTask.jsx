import { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/ui/Card.jsx";
import FormTask from "../forms/FormTask.jsx";
import { useProjectContext } from "../../context/project-context.jsx";
import { getAuthToken } from "../../auth/auth-functions.js";
import {
  processTaskData,
  resetTasksOrderInColumn,
  updateContext,
} from "../draggable/draggable-utilities.js";

function AddTask() {
  const [selectOption, setSelectOption] = useState("");
  const { projectTasks, setTasks } = useProjectContext();
  const { id, pid } = useParams();

  const handleTaskSubmit = async (data, event) => {
    event.preventDefault();

    const processedData = processTaskData(data, selectOption, pid);

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
      // add saved task and revise task positions in column
      const savedTask = await resp.json();
      const modifiedTaskList = resetTasksOrderInColumn(savedTask, projectTasks);
      await fetch(
        `http://localhost:3000/tasks-list/user/${id}/project/${pid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Origin: origin,
            Authorizaton: "Bearer " + token,
          },
          body: JSON.stringify(modifiedTaskList),
        }
      );
      updateContext(modifiedTaskList, setTasks);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Card>
        <FormTask
          btnLabels={["Create", "Reset"]}
          handleTaskSubmit={handleTaskSubmit}
          setSelectOption={setSelectOption}
        />
      </Card>
    </>
  );
}

export default AddTask;
