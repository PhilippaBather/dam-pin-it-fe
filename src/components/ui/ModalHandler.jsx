import { createPortal } from "react-dom";
import AddTask from "../../components/tasks/AddTask";
import DeleteProject from "../../components/projects/DeleteProject";
import EditProject from "../../components/projects/EditProject";
import TaskViewer from "../../components/tasks/TaskViewer";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import "../../stylesheets/modal.css";

const Backdrop = () => {
  const { setSelectedTask } = useProjectContext();
  const { setModalComponentType } = useUIContext();

  const onConfirm = () => {
    setModalComponentType(null);
    setSelectedTask(null);
  };

  return <div className={"backdrop"} onClick={onConfirm} />;
};

const Overlay = () => {
  const { modalComponentType } = useUIContext();
  const modalComponents = {
    ADD_TASK: <AddTask />,
    DELETE_PROJECT: <DeleteProject />,
    EDIT_PROJECT: <EditProject />,
    VIEW_TASK: <TaskViewer />,
  };

  if (!modalComponentType) return null;

  return <>{modalComponents[modalComponentType]}</>;
};

const ModalHandler = () => {
  const backdropEl = document.getElementById("backdrop-root");
  const overlayEl = document.getElementById("overlay-root");

  return (
    <>
      {createPortal(<Backdrop />, backdropEl)},
      {createPortal(<Overlay />, overlayEl)}
    </>
  );
};

export default ModalHandler;