function CloseForm({ handleClose }) {
  return (
    <div className="form-btn__container-close">
      <button className="form-btn" type="button" onClick={handleClose}>
        Close
      </button>
    </div>
  );
}

export default CloseForm;
