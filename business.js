// TIER 2 — BUSINESS LAYER
// Validation, ID generation, search, and employee operations.
const BusinessLayer = (() => {
  const _generateId = () => `EMP-${Date.now().toString(36).toUpperCase()}`;

  const _validate = ({ name, email, department, position, salary }) => {
    const errors = [];
    if (!name || name.trim().length < 2) errors.push('Name must have at least 2 characters.');
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push('Email must be valid.');
    if (!department || department.trim().length < 2) errors.push('Department is required.');
    if (!position || position.trim().length < 2) errors.push('Position is required.');
    const amount = parseFloat(salary);
    if (Number.isNaN(amount) || amount <= 0) errors.push('Salary must be a positive number.');
    return errors;
  };

  const createEmployee = (data) => {
    const errors = _validate(data);
    if (errors.length) return { success: false, errors };

    const employee = {
      id: _generateId(),
      name: data.name.trim(),
      email: data.email.trim(),
      department: data.department.trim(),
      position: data.position.trim(),
      salary: parseFloat(data.salary),
      createdAt: new Date().toISOString(),
    };

    DataLayer.insert(employee);
    return { success: true, employee };
  };

  const updateEmployee = (data) => {
    const errors = _validate(data);
    if (errors.length) return { success: false, errors };

    const existing = DataLayer.getById(data.id);
    if (!existing) return { success: false, errors: ['Employee not found.'] };

    const updated = {
      ...existing,
      name: data.name.trim(),
      email: data.email.trim(),
      department: data.department.trim(),
      position: data.position.trim(),
      salary: parseFloat(data.salary),
    };

    DataLayer.update(updated);
    return { success: true, employee: updated };
  };

  const deleteEmployee = (id) => {
    const existing = DataLayer.getById(id);
    if (!existing) return { success: false, error: 'Employee not found.' };
    DataLayer.remove(id);
    return { success: true };
  };

  const getAllEmployees = () => DataLayer.getAll();

  const searchEmployees = (query) => {
    if (!query || !query.trim()) return getAllEmployees();
    const normalized = query.trim().toLowerCase();
    return getAllEmployees().filter((item) =>
      item.name.toLowerCase().includes(normalized) ||
      item.email.toLowerCase().includes(normalized) ||
      item.department.toLowerCase().includes(normalized) ||
      item.position.toLowerCase().includes(normalized)
    );
  };

  return { createEmployee, updateEmployee, deleteEmployee, getAllEmployees, searchEmployees };
})();
