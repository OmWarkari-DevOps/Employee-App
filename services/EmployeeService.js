// TIER 3 — DATA LAYER (services/EmployeeService.js)
// Handles persistence and data operations via localStorage

const STORAGE_KEY = 'employee_management_system';

const EmployeeService = (() => {
  const getEmployees = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
          const sampleData = [
            {
              id: 1700000000001,
              name: 'Emma Watson',
              email: 'emma.watson@company.com',
              department: 'Engineering',
              position: 'Senior Frontend Developer',
              createdAt: '2024-01-15T10:30:00.000Z'
            },
            {
              id: 1700000000002,
              name: 'James Chen',
              email: 'james.chen@company.com',
              department: 'Product',
              position: 'Product Manager',
              createdAt: '2024-02-20T14:15:00.000Z'
            },
            {
              id: 1700000000003,
              name: 'Sofia Rodriguez',
              email: 'sofia.r@company.com',
              department: 'Marketing',
              position: 'Growth Lead',
              createdAt: '2024-03-10T09:45:00.000Z'
            },
            {
              id: 1700000000004,
              name: 'Michael Okafor',
              email: 'michael.o@company.com',
              department: 'Engineering',
              position: 'Backend Engineer',
              createdAt: '2024-01-28T11:20:00.000Z'
            }
          ];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
          resolve(sampleData);
        } else {
          resolve(JSON.parse(stored));
        }
      }, 300);
    });
  };

  const saveEmployees = async (employees) => {
    return new Promise((resolve) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
      resolve(true);
    });
  };

  const addEmployee = async (employee) => {
    const employees = await getEmployees();
    const newEmployee = {
      ...employee,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    employees.push(newEmployee);
    await saveEmployees(employees);
    return newEmployee;
  };

  const updateEmployee = async (updatedEmployee) => {
    const employees = await getEmployees();
    const index = employees.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
      employees[index] = {
        ...updatedEmployee,
        updatedAt: new Date().toISOString()
      };
      await saveEmployees(employees);
      return true;
    }
    return false;
  };

  const deleteEmployee = async (id) => {
    const employees = await getEmployees();
    const filtered = employees.filter(emp => emp.id !== id);
    await saveEmployees(filtered);
    return true;
  };

  const searchEmployees = async (query) => {
    const employees = await getEmployees();
    const lowerQuery = query.toLowerCase();
    return employees.filter(emp => 
      emp.name.toLowerCase().includes(lowerQuery) ||
      emp.email.toLowerCase().includes(lowerQuery) ||
      emp.department.toLowerCase().includes(lowerQuery) ||
      emp.position.toLowerCase().includes(lowerQuery)
    );
  };

  return { 
    getEmployees, 
    saveEmployees, 
    addEmployee, 
    updateEmployee, 
    deleteEmployee, 
    searchEmployees 
  };
})();