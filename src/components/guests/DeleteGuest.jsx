import { useState } from "react";
import Card from "../ui/Card";
import CloseForm from "../forms/CloseForm";
import { getAuthToken } from "../../auth/auth-functions";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";

function DeleteGuest() {
  const [isDeleted, setIsDeleted] = useState(false);
  const { selectedGuest, selectedSharedProject } = useProjectContext();
  const { setModalComponentType } = useUIContext();

  const alertMsg = `Are you sure you want to remove ${selectedGuest.email} from the shared project ${selectedSharedProject.projectTitle}?`;

  const handleDeleteSharedProject = async () => {
    const token = getAuthToken();

    try {
      const resp = await fetch(
        `http://localhost:3000/guests/owned-projects/${selectedGuest.email}/project/${selectedSharedProject.projectId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Origin: origin,
            Authorizaton: "Bearer " + token,
          },
        }
      );

      setIsDeleted(resp.status === 204 ? true : false);

      if (resp.status === 204) {
        setModalComponentType(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {
    setModalComponentType(null);
  };

  return (
    <Card>
      <CloseForm handleClose={handleCancel} />
      <form onSubmit={handleDeleteSharedProject}>
        <h1 className={"delete-modal_title"}>{alertMsg}</h1>
        <div className={"delete-modal_btn-container"}>
          {!isDeleted && (
            <button type="submit" className={"delete-modal_btn"}>
              Confirm
            </button>
          )}
        </div>
      </form>
    </Card>
  );
}

export default DeleteGuest;
