// TIER 1 — PRESENTATION LAYER (components/EmployeeForm.js)
// Employee form for creating and editing records

const { useState, useEffect } = React;

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    position: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        department: employee.department || 'Engineering',
        position: employee.position || ''
      });
    }
  }, [employee]);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Invalid email format';
        return '';
      case 'position':
        if (!value.trim()) return 'Position is required';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      position: validateField('position', formData.position)
    };
    
    setErrors(newErrors);
    setTouched({ name: true, email: true, position: true });
    
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (!hasErrors) {
      const submitData = employee 
        ? { ...formData, id: employee.id }
        : { ...formData, id: Date.now(), createdAt: new Date().toISOString() };
      onSubmit(submitData);
    }
  };

  const departments = ['Engineering', 'Product', 'Marketing', 'Sales', 'HR', 'Finance'];

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-field">
          <label>Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g., John Doe"
            className={errors.name && touched.name ? 'error' : ''}
          />
          {touched.name && errors.name && (
            <div className="error-box" style={{ marginTop: '0.5rem', padding: '0.5rem' }}>
              ⚠️ {errors.name}
            </div>
          )}
        </div>

        <div className="form-field">
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="john@company.com"
          />
          {touched.email && errors.email && (
            <div className="error-box" style={{ marginTop: '0.5rem', padding: '0.5rem' }}>
              ⚠️ {errors.email}
            </div>
          )}
        </div>

        <div className="form-field">
          <label>Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            style={{
              width: '100%',
              border: '1px solid rgba(148, 163, 184, 0.18)',
              borderRadius: '14px',
              padding: '0.95rem 1rem',
              background: 'rgba(15, 23, 42, 0.95)',
              color: '#e2e8f0'
            }}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label>Job Position *</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g., Senior Developer"
          />
          {touched.position && errors.position && (
            <div className="error-box" style={{ marginTop: '0.5rem', padding: '0.5rem' }}>
              ⚠️ {errors.position}
            </div>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {employee ? '✏️ Update Employee' : '✨ Add Employee'}
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};