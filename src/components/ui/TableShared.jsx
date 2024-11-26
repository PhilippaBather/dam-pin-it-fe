import Card from "./Card";
import "../../stylesheets/table.css";

function TableShared() {
  return (
    <section className="table-shared">
      <Card isTable>
        <h1 className="table-title">Shared Projects</h1>
        <div className="table-container__head">
          <div className="table-row__head">Project</div>
          <div className="table-row__head">Deadline</div>
          <div className="table-row__head">Owner</div>
          <div className="table-row__head">Email</div>
          <div className="table-row__head">Participants</div>
          <div className="table-row__head">Email</div>
        </div>
        <div className="table-container__body">
          <div className="table-row__body">Christmasdddddddddddddddd</div>
          <div className="table-row__body">01/01/2025</div>
          <div className="table-row__body">Molly Chops</div>
          <div className="table-row__body">molly@chops.com</div>
          <div className="table-row__body">
            <ul className="table-row__body-list">
              <li className="table-row__body-guests">Joe Bloggs</li>
              <li className="table-row__body-guests">Snoopy</li>
              <li className="table-row__body-guests">Dennis the Menace</li>
              <li className="table-row__body-guests">Doraemon</li>
            </ul>
          </div>
          <div className="table-row__body">
            <ul className="table-row__body-list">
              <li className="table-row__body-guests">test@test.com</li>
              <li className="table-row__body-guests">test@test.com</li>
              <li className="table-row__body-guests">test@test.com</li>
              <li className="table-row__body-guests">test@test.com</li>
            </ul>
          </div>
        </div>
      </Card>
    </section>
  );
}

export default TableShared;
