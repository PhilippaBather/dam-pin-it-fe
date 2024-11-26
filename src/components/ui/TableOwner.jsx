import Card from "./Card";
import "../../stylesheets/table.css";

function TableOwner() {
  const handleDeleteGuest = () => {};
  const handleUpdateGuest = () => {};
  return (
    <section>
      <Card isTable>
        <h1 className="table-title">Owned Projects</h1>
        <div className="table-container__head">
          <div className="table-row__head">Project</div>
          <div className="table-row__head">Deadline</div>
          <div className="table-row__head">Shared</div>
          <div className="table-row__head">Guests</div>
          <div className="table-row__head">Delete</div>
          <div className="table-row__head">Update</div>
        </div>
        <div className="table-container__body">
          <div className="table-row__body">Christmasdddddddddddddddd</div>
          <div className="table-row__body">01/01/2025</div>
          <div className="table-row__body">Yes</div>
          <div className="table-row__body">
            <ul className="table-row__body-list">
              <li className="table-row__body-guests">test@test.com</li>
              <li className="table-row__body-guests">test@test.com</li>
              <li className="table-row__body-guests">test@test.com</li>
              <li className="table-row__body-guests">test@test.com</li>
            </ul>
          </div>
          <div className="table-row__body">
            <ul className="table-row__body-list">
              <li>
                <button
                  className="card-btn table-btn"
                  type="button"
                  onClick={handleDeleteGuest}
                >
                  Delete
                </button>
              </li>
              <li>
                <button
                  className="card-btn table-btn"
                  type="button"
                  onClick={handleDeleteGuest}
                >
                  Delete
                </button>
              </li>
              <li>
                <button
                  className="card-btn table-btn"
                  type="button"
                  onClick={handleDeleteGuest}
                >
                  Delete
                </button>
              </li>
              <li>
                <button
                  className="card-btn table-btn"
                  type="button"
                  onClick={handleDeleteGuest}
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
          <div className="table-row__body">
            <ul className="table-row__body-list">
              <li>
                <button
                  className="card-btn table-btn"
                  type="button"
                  onClick={handleUpdateGuest}
                >
                  Update
                </button>
              </li>
              <li>
                <button
                  className="card-btn table-btn"
                  type="button"
                  onClick={handleUpdateGuest}
                >
                  Update
                </button>
              </li>
              <li>
                <button
                  className="card-btn table-btn"
                  type="button"
                  onClick={handleUpdateGuest}
                >
                  Update
                </button>
              </li>
              <li>
                <button
                  className="card-btn table-btn"
                  type="button"
                  onClick={handleUpdateGuest}
                >
                  Update
                </button>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </section>
  );
}

export default TableOwner;
