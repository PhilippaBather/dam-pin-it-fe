import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../ui/Card.jsx";
import LoadingDots from "../ui/spinners/LoadingDots.jsx";
import { useUIContext } from "../../context/ui-context.jsx";
import { handleTaskHTTPRequest } from "./task-apis.js";
import { resetTaskPositionOnTaskDeletion } from "../draggable/draggable-utilities.js";
import {
  FAILED_FETCH,
  MALFORMED_REQUEST,
  UNDEFINED_PARAM,
  UNEXPECTED_JSON,
} from "../../api/api-constants.js";
import "../../stylesheets/task-card.css";
import { useProjectContext } from "../../context/project-context.jsx";

function FormTaskView() {
  const { id, pid } = useParams();
  const {
    projectTasks,
    resetTaskState,
    selectedTask,
    setSelectedTask,
    taskComments,
    setTaskComments,
  } = useProjectContext();
  const { columnClicked, setModalComponentType } = useUIContext();
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      try {
        setHttpError(false);
        setIsLoading(true);
        const data = await handleTaskHTTPRequest(
          { tid: selectedTask.id, id, pid },
          "GET",
          "GET_COMMENTS",
          null
        );
        setTaskComments(data);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setHttpError(
          e.message === FAILED_FETCH
            ? "Network error"
            : e.message === UNEXPECTED_JSON || e.message === UNDEFINED_PARAM
            ? MALFORMED_REQUEST
            : e.message
        );
      }
    };

    getComments();
  }, [setTaskComments, setIsLoading, setHttpError, id, pid, selectedTask.id]);

  const handleClose = () => {
    setModalComponentType(null);
  };

  const handleDelete = async () => {
    setHttpError(null);
    try {
      await handleTaskHTTPRequest(
        { tid: selectedTask.id, id, pid },
        "DELETE",
        "UPDATE",
        null
      );
      // reorder
      const reorderedTasks = resetTaskPositionOnTaskDeletion(
        projectTasks,
        selectedTask,
        parseInt(columnClicked)
      );
      // update task in tasks state and reset ui context
      resetState(reorderedTasks, parseInt(columnClicked));
      resetContext();
    } catch (e) {
      setHttpError(
        e.message === FAILED_FETCH
          ? "Network error"
          : e.message === UNEXPECTED_JSON || e.message === UNDEFINED_PARAM
          ? MALFORMED_REQUEST
          : e.message
      );
    }
  };

  const resetState = (reorderedTasks, col) => {
    resetTaskState(reorderedTasks, parseInt(col));
  };

  const resetContext = () => {
    setModalComponentType(null);
    setSelectedTask(null);
  };

  const handleUpdate = () => {
    setModalComponentType("UPDATE_TASK");
  };

  const handleAddComment = () => {
    setModalComponentType("ADD_COMMENT");
  };

  return (
    <Card isCardTask>
      <div className="task-card__container">
        <div className="btn-container">
          <button className="comment-btn">Comment</button>
          <button className="comment-btn" type="button" onClick={handleUpdate}>
            Update
          </button>
          <button className="comment-btn" type="button" onClick={handleDelete}>
            Delete
          </button>
          <button className="comment-btn" type="button" onClick={handleClose}>
            Close
          </button>
        </div>
        {isLoading && (
          <LoadingDots dotColor="rgba(251, 5, 173, 0.7)" size="30" />
        )}
        <h1 className="task-title">{selectedTask.title}</h1>
        <section className="section-details">
          <div className="info-container">
            <h3 className="task-subheading">Deadline</h3>
            <span className="task-info">{selectedTask.deadline}</span>
          </div>
          <div className="info-container">
            <h3 className="task-subheading">Description</h3>
            <span className="task-info">{selectedTask.description}</span>
          </div>
          <div className="info-container">
            <h3 className="task-subheading">Priority</h3>
            <span className="task-info">{selectedTask.priorityLevel}</span>
          </div>
        </section>
        <section className="section-comments">
          <div className="btn-container__comments">
            <h2 className="task-subtitle">Comments</h2>
            <button
              type="buton"
              onClick={handleAddComment}
              className="comment-btn__add"
            >
              Add Comment
            </button>
          </div>
          {httpError && (
            <span className="error-msg__form-resp">{httpError}</span>
          )}
          {taskComments?.length === 0 && (
            <>
              <p className="comment-msg__p1">
                No comments made as yet. Add a comment to reflect project
                developments.
              </p>
            </>
          )}
          <ul>
            {taskComments.map((comment) => (
              <div key={comment.id} className="comment-card">
                <li key={comment.taskId} className="comment-li">
                  {comment.comment}
                  <p>
                    {comment.author} {comment.creationDate}
                  </p>
                </li>
              </div>
            ))}
          </ul>
        </section>
      </div>
    </Card>
  );
}

export default FormTaskView;
