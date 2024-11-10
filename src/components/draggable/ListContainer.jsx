import { useUIContext } from "../../context/ui-context";

function ListContainer({ children, title, colId }) {
  const { setColumnClicked } = useUIContext();

  const parseTasksKey = (title) => {
    const name = Object.values(title);
    const firstLetter = name.slice(0, 1);
    const remainingLetters = name
      .slice(1)
      .toString()
      .toLowerCase()
      .replaceAll(",", "")
      .replaceAll("_", " ");
    return firstLetter.concat(remainingLetters);
  };

  const getColClicked = () => {
    setColumnClicked(colId);
  };

  return (
    <div className="list-container" onClick={getColClicked}>
      <h1 onClick={getColClicked}>{parseTasksKey(title)}</h1>
      {children}
    </div>
  );
}

export default ListContainer;
