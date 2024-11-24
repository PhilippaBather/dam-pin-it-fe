function FormActions({ btnLabel1, btnLabel2, handleClick }) {
  return (
    <div className="form-btn__container">
      <button className="form-btn" type="submit">
        {btnLabel1}
      </button>
      <button className="form-btn" type="reset" onClick={handleClick}>
        {btnLabel2}
      </button>
    </div>
  );
}

export default FormActions;
