import { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import ListContainer from "./ListContainer";
import TaskContainer from "./TaskContainer";

function DroppableContainer({ column, tasks }) {
  const [droppableEnabled, setDroppableEnabled] = useState(false);

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
    </ListContainer>
  );
}

export default DroppableContainer;
