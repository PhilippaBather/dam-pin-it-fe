import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Card from "../ui/Card";
import { useProjectContext } from "../../context/project-context";
import { getAuthToken } from "../../auth/auth-functions";
import { useUIContext } from "../../context/ui-context";
import FormProject from "../forms/FormProject";

function CreateProject() {
  const { clearErrors, reset } = useForm();

  let { id } = useParams();
  const { setCurrProject } = useProjectContext();
  const { setModalComponentType } = useUIContext();
  const navigate = useNavigate();

  const handleCreateProject = async (data, event) => {
    const token = getAuthToken();

    event.preventDefault();
    try {
      const resp = await fetch(`http://localhost:3000/projects/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: origin,
          Authorizaton: "Bearer " + token,
        },
        body: JSON.stringify(data),
      });
      const savedProject = await resp.json();
      setCurrProject(savedProject);
      setModalComponentType(null);
      const route = `/projects-home/user/${id}/project/${savedProject.projectId}`;
      navigate(route);
    } catch (e) {
      console.log(e);
    }
    clearErrors();
    reset({ title: "", description: "", deadline: "" });
  };

  return (
    <Card>
      <FormProject
        btnLabels={["Create", "Reset", "reset"]}
        handleSubmitProject={handleCreateProject}
      />
    </Card>
  );
}

export default CreateProject;
