import { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../ui/Card";
import CloseForm from "../forms/CloseForm";
import FormGuest from "../forms/FormGuest";
import {
  processData,
  handleUpdateRequest,
  processUpdatedPermissions,
} from "./guest-utilities";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";

function UpdateGuest() {
  const { id } = useParams();
  const [selectionError, setSelectionError] = useState(false);
  const { selectedGuest, currProject, ownedProjects, setOwnedProjects } =
    useProjectContext();
  const { selectOption, setSelectOption, setModalComponentType } =
    useUIContext();

  const handleGuestUpdate = async (data) => {
    console.log(data);
    console.log(selectOption);

    if (selectOption !== null) {
      const processedData = processData(
        data,
        selectOption,
        id,
        currProject.projectId
      );
      console.log(processedData);
      const resp = await handleUpdateRequest(processedData);
      setModalComponentType(null);
      const updatedProjects = processUpdatedPermissions(
        resp,
        ownedProjects,
        currProject.projectId
      );
      setOwnedProjects(updatedProjects);
      reset();
      // TODO: handle guest not found
    } else {
      setSelectionError(true);
    }
  };

  const reset = () => {
    setSelectionError(false);
    setSelectOption(null);
  };

  const handleCancel = () => {
    setModalComponentType(null);
  };

  return (
    <Card>
      <CloseForm handleClose={handleCancel} />
      <FormGuest
        guest={selectedGuest}
        handleGuestSubmit={handleGuestUpdate}
        setSelectionError={setSelectionError}
        selectionError={selectionError}
      />
    </Card>
  );
}

export default UpdateGuest;
