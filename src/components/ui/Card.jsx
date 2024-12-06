import "../../stylesheets/ui-components.css";

function Card({
  children,
  isAlert = false,
  isTable = false,
  isTableShared = false,
  isStrong = false,
}) {
  return (
    <div
      className={
        isAlert
          ? "alert-card"
          : isTable
          ? "table-card"
          : isTableShared
          ? "table-card table-shared-card"
          : isStrong
          ? "card-strong"
          : "card"
      }
    >
      {children}
    </div>
  );
}

export default Card;
