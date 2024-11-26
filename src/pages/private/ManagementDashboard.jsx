import TableOwner from "../../components/ui/TableOwner";
import TableShared from "../../components/ui/TableShared";
function ManagementDashboard() {
  return (
    <main>
      <header className="dashboard-header">
        <h1 className="title-page">Project Management Dashboard</h1>
      </header>
      <TableOwner />
      <TableShared />
    </main>
  );
}

export default ManagementDashboard;
