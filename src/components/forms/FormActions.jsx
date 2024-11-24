import { Link } from "react-router-dom";

function FormActions({
  btnLabel1,
  btnLabel2,
  handleClick,
  isLink = false,
  link = null,
  btn2Type = "button",
}) {
  return (
    <div className="form-btn__container">
      <button className="form-btn" type="submit">
        {btnLabel1}
      </button>
      {!isLink && (
        <button className="form-btn" type={btn2Type} onClick={handleClick}>
          {btnLabel2}
        </button>
      )}
      {isLink && (
        <button className="form-btn" type={btn2Type} onClick={handleClick}>
          <Link to={link} className="form-btn_link">
            {btnLabel2}
          </Link>
        </button>
      )}
    </div>
  );
}

export default FormActions;
