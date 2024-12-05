import { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../ui/Card";
import FormGuest from "../forms/FormGuest";
import { useUIContext } from "../../context/ui-context";
import {
  processData,
  handleInvitationRequest,
  processOwnedGuestProjects,
} from "./guest-utilities";
import { useProjectContext } from "../../context/project-context";

function InviteGuest() {
  const { id } = useParams();
  const {
    currProject,
    ownedProjects,
    selectedSharedProject,
    setOwnedProjects,
  } = useProjectContext();
  const { selectOption, setSelectOption, setModalComponentType } =
    useUIContext();
  const [selectionError, setSelectionError] = useState(false);

  const handleSubmit = async (data, event) => {
    event.preventDefault();

    if (selectOption !== null) {
      const processedData = processData(
        data,
        selectOption,
        id,
        currProject.projectId
      );
      const resp = await handleInvitationRequest(processedData);
      setModalComponentType(null);
      const updatedProjects = processOwnedGuestProjects(
        resp,
        ownedProjects,
        selectedSharedProject.projectId
      );
      setOwnedProjects(updatedProjects);
      reset();
      // TODO: handle guest already invited
    } else {
      setSelectionError(true);
    }
  };

  const reset = () => {
    setSelectionError(false);
    setSelectOption(null);
  };

  return (
    <Card>
      <FormGuest
        handleGuestSubmit={handleSubmit}
        selectionError={selectionError}
        setSelectionError={setSelectionError}
      />
    </Card>
  );
}

export default InviteGuest;
