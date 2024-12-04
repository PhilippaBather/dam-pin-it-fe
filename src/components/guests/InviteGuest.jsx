import { useState } from "react";
import { useParams } from "react-router-dom";

import Card from "../ui/Card";
import FormGuest from "../forms/FormGuest";
import { useUIContext } from "../../context/ui-context";
import { getAuthToken } from "../../auth/auth-functions";
import { processData, handleInvitationRequest } from "./guest-utilities";
import { convertToPermissionsEnum } from "./guest-permissions-dropdown-settings";
import { useProjectContext } from "../../context/project-context";

function InviteGuest() {
  const { id } = useParams();
  const { selectedSharedProject } = useProjectContext();
  const { selectedOption, setModalComponentType } = useUIContext();
  const [selectionError, setSelectionError] = useState(false);

  const handleSubmit = async (data, event) => {
    event.preventDefault();

    console.log(selectedOption.label === undefined);

    if (!selectionError && selectedOption.label !== undefined) {
      console.log("here");
      const processedData = processData(
        data,
        convertToPermissionsEnum[selectedOption],
        id,
        selectedSharedProject.projectId
      );
      const token = getAuthToken();
      //const resp = await handleInvitationRequest(processedData, token);
      console.log("in method " + processedData);
      setModalComponentType(null);
    } else {
      setSelectionError(true);
    }
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
