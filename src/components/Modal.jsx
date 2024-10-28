import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Card from "./Card";
import CreateProject from "./CreateProject";

const Modal = forwardRef(function Modal(props, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="modal">
      <Card>
        <CreateProject />
      </Card>
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
