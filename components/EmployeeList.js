const EmployeeList = ({ employees, onEdit, onDelete }) => {
  if (!employees.length) {
    return (
      <div className="empty-state">
        <p>No employees found yet. Use the form to add new team members.</p>
      </div>
    );
  }

  return (
    <div className="table-card">
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>₹ {employee.salary.toLocaleString()}</td>
              <td>
                <div className="action-buttons">
                  <button className="btn-edit" onClick={() => onEdit(employee)}>
                    Edit
                  </button>
                  <button className="btn-delete" onClick={() => onDelete(employee.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
