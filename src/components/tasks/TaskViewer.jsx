import { useState } from "react";
import Card from "../../components/ui/Card";
import FormTask from "../forms/FormTask";

function TaskViewer() {
  const [selectOption, setSelectOption] = useState("");

  const handleSubmit = () => {
    console.log(selectOption);
  };

  return (
    <Card>
      <FormTask
        btnLabels={["Update", "Delete"]}
        handleTaskSubmit={handleSubmit}
        setSelectOption={setSelectOption}
      />
    </Card>
  );
}

export default TaskViewer;
