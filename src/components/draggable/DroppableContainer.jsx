import { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import ListContainer from "./ListContainer";
import LoadingDots from "../ui/spinners/LoadingDots";
import TaskContainer from "./TaskContainer";
import { useProjectContext } from "../../context/project-context";

function DroppableContainer({ column, tasks, isLoading, httpError }) {
  const [droppableEnabled, setDroppableEnabled] = useState(false);
  const { currProject } = useProjectContext();

  /**
   * Workaround  to use react-bautiful-dnd with StrictMode in React 18.
   * Credit: GiovanniACamacho
   * See https://github.com/atlassian/react-beautiful-dnd/issues/2399
   */
  useEffect(() => {
    const animation = requestAnimationFrame(() => setDroppableEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setDroppableEnabled(false);
    };
  }, []);

  if (!droppableEnabled) return null;

  return (
    <ListContainer colId={column} className={`list-container column`}>
      {isLoading && !currProject && (
        <LoadingDots dotColor="rgba(251, 5, 173, 0.7)" />
      )}
      {!httpError && (
        <Droppable droppableId={column}>
          {(provided) => (
            <ul className="list-container__list" ref={provided.innerRef}>
              {tasks?.map((task) => (
                <TaskContainer
                  index={task.taskPosition}
                  task={task}
                  key={task.id}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      )}
    </ListContainer>
  );
}

export default DroppableContainer;
