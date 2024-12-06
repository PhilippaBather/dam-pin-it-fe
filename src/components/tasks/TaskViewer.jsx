import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import Card from "../../components/ui/Card";
import FormTask from "../forms/FormTask";
import { getAuthToken } from "../../auth/auth-functions";
import {
  resetTaskPositionOnTaskDeletion,
  updateColumnOnTaskUpdate,
} from "../draggable/draggable-utilities.js";
import { processUpdatedTaskData } from "../draggable/draggable-utilities";

function TaskViewer() {
  const [selectOption, setSelectOption] = useState("");
  const { id, pid } = useParams();
  const { projectTasks, resetTaskState, selectedTask, setSelectedTask } =
    useProjectContext();
  const { columnClicked, setModalComponentType } = useUIContext();
  const token = getAuthToken();

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
      await fetch(
        `http://localhost:3000/task/${selectedTask.id}/user/${id}/project/${pid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Origin: origin,
            Authorizaton: "Bearer " + token,
          },
          body: JSON.stringify(processedData),
        }
      );
      const updatedColumn = updateColumnOnTaskUpdate(
        projectTasks,
        selectedTask,
        processedData,
        columnClicked
      );
      // update task in tasks state and reset ui context
      reset(updatedColumn, columnClicked);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(
        `http://localhost:3000/task/${selectedTask.id}/user/${id}/project/${pid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Origin: origin,
            Authorizaton: "Bearer " + token,
          },
        }
      );
      // reorder
      const reorderedTasks = resetTaskPositionOnTaskDeletion(
        projectTasks,
        selectedTask,
        parseInt(columnClicked)
      );
      // update task in tasks state and reset ui context
      reset(reorderedTasks, parseInt(columnClicked));
    } catch (e) {
      console.error(e);
    }
  };

  const reset = (reorderedTasks, col) => {
    resetTaskState(reorderedTasks, parseInt(col));
    setModalComponentType(null);
    setSelectedTask(null);
  };

  return (
    <Card>
      <FormTask
        setSelectOption={setSelectOption}
        btnLabels={["Update", "Delete"]}
        handleTaskSubmit={handleSubmit}
        handleTaskDelete={handleDelete}
      />
    </Card>
  );
}

export default TaskViewer;
