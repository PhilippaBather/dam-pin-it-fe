import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Card from "../ui/Card";
import FormProject from "../forms/FormProject";
import { useProjectContext } from "../../context/project-context";
import { handleHttpReq } from "../../api/http-requests";
import { projectEndpoint } from "../../api/endpoints";
import { getAuthToken } from "../../auth/auth-functions";

function EditProject() {
  let { id, pid } = useParams();
  const { clearErrors, reset } = useForm();
  const { setCurrProject, setModalComponentType } = useProjectContext();

  const handleEditProject = async (data, event) => {
    const token = getAuthToken();
    event.preventDefault();

    try {
      await handleHttpReq(projectEndpoint, data, pid, "PUT", "PROJECT");

      const resp = await fetch(
        `http://localhost:3000/project/user/${id}/project/${pid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Origin: origin,
            Authorizaton: "Bearer " + token,
          },
        }
      );

      const respData = await resp.json();
      setCurrProject(respData);
      setModalComponentType(null);
    } catch (e) {
      console.log(e);
    }
    clearErrors();
    reset({ title: "", description: "", deadline: "" });
  };

  return (
    <>
      <Card>
        <FormProject
          btnLabels={["Update", "Reset", "reset"]}
          handleSubmitProject={handleEditProject}
        />
      </Card>
    </>
  );
}

export default EditProject;
