import "../../stylesheets/ui-components.css";

function Card({
  children,
  isAlert = false,
  isTable = false,
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
          : "card"
      }
    >
      {children}
    </div>
  );
}

export default Card;
