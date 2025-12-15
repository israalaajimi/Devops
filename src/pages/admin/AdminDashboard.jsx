import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminBookTable from '../../components/admin/AdminBookTable'
import './AdminDashboard.css'

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-dashboard-content">
        <div className="admin-dashboard-header">
          <h1>Dashboard</h1>
          <p>Manage your bookstore inventory</p>
        </div>
        <AdminBookTable />
      </div>
    </div>
  )
}

export default AdminDashboard

