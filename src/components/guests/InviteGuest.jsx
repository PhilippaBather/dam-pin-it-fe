import { useParams } from "react-router-dom";
import Card from "../ui/Card";
import FormGuest from "../forms/FormGuest";
import { getAuthToken } from "../../auth/auth-functions";
import { useUIContext } from "../../context/ui-context";

function InviteGuest() {
  const { id, pid } = useParams();
  const { setModaComponentType } = useUIContext();

  const handleSubmit = async (data, event) => {
    event.preventDefault();

    const token = getAuthToken();

    const processedData = {
      email: data.email,
      msg: "",
      permissions: "",
      userId: id,
      projectId: pid,
    };

    try {
      await fetch("http://localhost:3000/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: origin,
          Authorizaton: "Bearer " + token,
        },
        body: JSON.stringify(processedData),
      });
      setModaComponentType(null);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Card>
      <FormGuest handleGuestSubmit={handleSubmit} />
    </Card>
  );
}

export default InviteGuest;
