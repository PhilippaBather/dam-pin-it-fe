import "../../stylesheets/ui-components.css";

function Card({ children, isAlert = false, isTable = false }) {
  return (
    <div className={isAlert ? "alert-card" : isTable ? "table-card" : "card"}>
      {children}
    </div>
  );
}

export default Card;
