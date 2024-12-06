import { useUIContext } from "../../context/ui-context";
import ModalHandler from "../../components/ui/ModalHandler";
import TableOwner from "../../components/tables/TableOwner";
import TableShared from "../../components/tables/TableShared";
function ManagementDashboard() {
  const { modalComponentType } = useUIContext();
  return (
    <>
      {modalComponentType && <ModalHandler />}
      <main>
        <header className="dashboard-header__management">
          <h1 className="title-page">Project Management Dashboard</h1>
        </header>
        <div>
          <TableOwner />
          <TableShared />
        </div>
      </main>
    </>
  );
}

export default ManagementDashboard;
