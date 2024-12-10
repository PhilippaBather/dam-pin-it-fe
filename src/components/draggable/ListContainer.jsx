import { useUIContext } from "../../context/ui-context";
import { getColName } from "./draggable-utilities";

function ListContainer({ children, colId }) {
  const { setColumnClicked } = useUIContext();

  const getColClicked = () => {
    setColumnClicked(colId);
  };

  return (
    <div className="list-container" onClick={getColClicked}>
      <h1 onClick={getColClicked}>{getColName[colId]}</h1>
      {children}
    </div>
  );
}

export default ListContainer;
