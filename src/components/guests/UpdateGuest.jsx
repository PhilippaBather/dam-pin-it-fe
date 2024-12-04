import { useState } from "react";
import Card from "../ui/Card";
import CloseForm from "../forms/CloseForm";
import { useUIContext } from "../../context/ui-context";
import { getAuthToken } from "../../auth/auth-functions";

function UpdateGuest() {
  const [isUpdated, setIsUpdated] = useState(false);
  const { setModalComponentType } = useUIContext();

  const handleGuestUpdate = async () => {
    const token = getAuthToken();

    try {
      const resp = await fetch(
        `http://localhost:3000/guests/owned-projects/${projectId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Origin: origin,
            Authorizaton: "Bearer " + token,
          },
        }
      );
      setIsUpdated(true);
      console.log(resp);

      if (resp.status === 200) {
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
      <form onSubmit={handleGuestUpdate}>
        <div className={"delete-modal_btn-container"}>
          {!isUpdated && (
            <button
              type="submit"
              className={"delete-modal_btn"}
              disabled={isUpdated}
            >
              Confirm
            </button>
          )}
        </div>
      </form>
    </Card>
  );
}

export default UpdateGuest;
