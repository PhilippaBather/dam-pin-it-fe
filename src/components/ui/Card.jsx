import "../../stylesheets/ui-components.css";

function Card({
  children,
  isAlert = false,
  isTable = false,
  isCardTask = false,
  isStrong = false,
}) {
  return (
    <div
      className={
        isAlert
          ? "alert-card"
          : isTable
          ? "table-card"
          : isStrong
          ? "card-strong"
          : isCardTask
          ? "card-task"
          : "card"
      }
    >
      {children}
    </div>
  );
}

export default Card;
