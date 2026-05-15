// TIER 1 — PRESENTATION LAYER (components/EmployeeTable.js)
// Displays employees in a table format

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <p>📭 No employees found</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Click "Add New Employee" to get started
        </p>
      </div>
    );
  }

  const getDepartmentBadge = (dept) => {
    const colors = {
      'Engineering': '#3b82f6',
      'Product': '#8b5cf6',
      'Marketing': '#ec4899',
      'Sales': '#f59e0b',
      'HR': '#10b981',
      'Finance': '#06b6d4'
    };
    return {
      backgroundColor: colors[dept] || '#64748b',
      padding: '4px 12px',
      borderRadius: '999px',
      fontSize: '0.8rem',
      display: 'inline-block'
    };
  };

  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td style={{ fontFamily: 'monospace', color: '#94a3b8' }}>
              #{employee.id.toString().slice(-6)}
            </td>
            <td>
              <strong>{employee.name}</strong>
              {employee.createdAt && (
                <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '4px' }}>
                  joined {new Date(employee.createdAt).toLocaleDateString()}
                </div>
              )}
            </td>
            <td style={{ color: '#94a3b8' }}>{employee.email}</td>
            <td>
              <span style={getDepartmentBadge(employee.department)}>
                {employee.department}
              </span>
            </td>
            <td>{employee.position}</td>
            <td>
              <div className="action-buttons">
                <button 
                  className="btn-edit" 
                  onClick={() => onEdit(employee)}
                  aria-label="Edit employee"
                >
                  ✏️ Edit
                </button>
                <button 
                  className="btn-delete" 
                  onClick={() => onDelete(employee.id)}
                  aria-label="Delete employee"
                >
                  🗑️ Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};