import { createPortal } from "react-dom";
import AddTask from "../../components/tasks/AddTask";
import Alert from "./Alert";
import CreateProject from "../projects/CreateProject";
import DeleteGuest from "../guests/DeleteGuest";
import DeleteProject from "../../components/projects/DeleteProject";
import DeleteSharedProject from "../projects/DeleteSharedProject";
import EditProject from "../../components/projects/EditProject";
import InviteGuest from "../guests/InviteGuest";
import TaskComment from "../forms/CommentForm";
import TaskDetails from "../tasks/TaskDetails";
import TaskViewer from "../../components/tasks/TaskViewer";
import UpdateGuest from "../guests/UpdateGuest";
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
    ADD_COMMENT: <TaskComment />,
    ALERT_PROJECT: <Alert />,
    CREATE_PROJECT: <CreateProject />,
    DELETE_PROJECT: <DeleteProject />,
    DELETE_GUEST: <DeleteGuest />,
    DELETE_SHARED_PROJECT: <DeleteSharedProject />,
    EDIT_PROJECT: <EditProject />,
    INVITE_GUEST: <InviteGuest />,
    UPDATE_GUEST: <UpdateGuest />,
    UPDATE_TASK: <TaskViewer />,
    VIEW_TASK: <TaskDetails />,
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
