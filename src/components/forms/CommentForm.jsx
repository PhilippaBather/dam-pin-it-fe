import { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../ui/Card";
import LoadingDots from "../ui/spinners/LoadingDots.jsx";
import { useForm } from "react-hook-form";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import { handleTaskHTTPRequest } from "../tasks/task-apis";
import {
  FAILED_FETCH,
  MALFORMED_REQUEST,
  UNDEFINED_PARAM,
  UNEXPECTED_JSON,
} from "../../api/api-constants.js";
import "../../stylesheets/task-comment-form.css";

function TaskComment() {
  const { id, pid } = useParams();
  const { register, reset, handleSubmit } = useForm({
    defaultValues: "Add comments here...",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [httpError, setHttpError] = useState(null);

  const { selectedTask, setTaskComments } = useProjectContext();
  const { setModalComponentType } = useUIContext();

  const errorTxt = "A comment must contain at least one characer.";

  const handleClose = () => {
    setModalComponentType(null);
  };

  const handleSubmitComment = async (data, e) => {
    e.preventDefault();
    console.log(data);

    setInputError(false);
    setHttpError(null);

    const comment = data.comment.trim();
    if (comment.length === 0) {
      setInputError(true);
      return;
    }

    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10);

    const formattedData = {
      comment: data.comment,
      creationDate: formattedDate,
    };

    try {
      setIsLoading(true);
      const comment = await handleTaskHTTPRequest(
        {
          tid: selectedTask.id,
          id,
          pid,
        },
        "POST",
        "POST_COMMENT",
        formattedData
      );

      setTaskComments((prev) => [...prev, comment]);
      reset();
      setInputError(false);
      setIsLoading(false);
      setModalComponentType(null);
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

  return (
    <Card>
      <form onSubmit={handleSubmit(handleSubmitComment)}>
        <h1 className="comment-title">
          Add a comment to reflect developments and keep collaborators informed.
        </h1>
        {isLoading && (
          <LoadingDots dotColor="rgba(251, 5, 173, 0.7)" size="30" />
        )}
        <div className="comment-container">
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            name="comment"
            className="comment-textarea"
            defaultValue="Add a comment here..."
            {...register("comment", { required: false })}
          ></textarea>
        </div>
        {httpError && <span className="error-msg__generic">{httpError}</span>}
        {inputError && <span className="error-msg__generic">{errorTxt}</span>}
        <div className="btn-container">
          <button className="comment-btn" type="submit">
            Save
          </button>
          <button className="comment-btn" type="reset">
            Reset
          </button>
          <button className="comment-btn" type="button" onClick={handleClose}>
            Close
          </button>
        </div>
      </form>
    </Card>
  );
}

export default TaskComment;
