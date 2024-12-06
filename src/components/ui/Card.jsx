import "../../stylesheets/ui-components.css";

function Card({ children, isAlert = false }) {
  return <div className={isAlert ? "alert-card" : "card"}>{children}</div>;
}

export default Card;
