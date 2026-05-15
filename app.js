// TIER 1 — PRESENTATION LAYER (app.js)
// Main App Component - handles UI and orchestrates the application flow
const { useState, useEffect, useCallback } = React;

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Load employees from data tier
  useEffect(() => {
    const loadEmployees = async () => {
      setLoading(true);
      const data = await EmployeeService.getEmployees();
      setEmployees(data);
      setFilteredEmployees(data);
      setLoading(false);
    };
    loadEmployees();
  }, []);

  // Filter employees based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredEmployees(employees);
    } else {
      const filtered = EmployeeService.searchEmployees(searchQuery);
      setFilteredEmployees(filtered);
    }
  }, [searchQuery, employees]);

  // Business logic handlers
  const handleAddEmployee = async (employeeData) => {
    const newEmployee = await EmployeeService.addEmployee(employeeData);
    setEmployees(prev => [...prev, newEmployee]);
    setShowForm(false);
  };

  const handleUpdateEmployee = async (updatedData) => {
    const success = await EmployeeService.updateEmployee(updatedData);
    if (success) {
      setEmployees(prev => prev.map(emp => 
        emp.id === updatedData.id ? { ...updatedData, updatedAt: new Date().toISOString() } : emp
      ));
      setEditingEmployee(null);
      setShowForm(false);
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee? This action cannot be undone.')) {
      const success = await EmployeeService.deleteEmployee(id);
      if (success) {
        setEmployees(prev => prev.filter(emp => emp.id !== id));
        if (editingEmployee?.id === id) {
          setEditingEmployee(null);
          setShowForm(false);
        }
      }
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setEditingEmployee(null);
    setShowForm(false);
  };

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    const data = await EmployeeService.getEmployees();
    setEmployees(data);
    setLoading(false);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>✨ Employee Management System</h1>
        <p>3-Tier Architecture • React • Modern Dark Theme</p>
      </header>

      <main className="app-container">
        <div className="panel top-panel">
          <div className="search-row">
            <SearchBar onSearch={handleSearch} />
            <button 
              className="btn-primary" 
              onClick={() => setShowForm(true)}
              disabled={showForm}
            >
              ＋ Add New Employee
            </button>
            <button 
              className="btn-primary" 
              onClick={handleRefresh}
              style={{ background: 'linear-gradient(135deg, #475569, #334155)' }}
            >
              ⟳ Refresh
            </button>
          </div>
          <p className="status-line">
            {filteredEmployees.length} employee{filteredEmployees.length !== 1 ? 's' : ''} • 
            {employees.length} total in system
            {searchQuery && ` • searching: "${searchQuery}"`}
          </p>
        </div>

        <div className="content-panel">
          {showForm && (
            <div className="form-card">
              <h3 style={{ marginBottom: '1.5rem', color: '#e2e8f0' }}>
                {editingEmployee ? '✏️ Edit Employee' : '➕ Add New Employee'}
              </h3>
              <EmployeeForm
                employee={editingEmployee}
                onSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
                onCancel={handleCancelForm}
              />
            </div>
          )}

          <div className="table-card">
            {loading ? (
              <div className="empty-state">
                <p>Loading employee data...</p>
              </div>
            ) : (
              <EmployeeTable
                employees={filteredEmployees}
                onEdit={handleEdit}
                onDelete={handleDeleteEmployee}
              />
            )}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Data persists in localStorage • Tier 1: UI Components • Tier 2: Business Logic • Tier 3: Data Service</p>
      </footer>
    </div>
  );
};

// Render the App to the DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);