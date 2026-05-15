// TIER 3 — DATA LAYER
// Local storage persistence for employee records.
const DataLayer = (() => {
  const STORAGE_KEY = 'react_employee_records';

  const _load = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (error) {
      return [];
    }
  };

  const _save = (records) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  };

  const getAll = () => _load();

  const getById = (id) => _load().find((item) => item.id === id) || null;

  const insert = (employee) => {
    const records = _load();
    records.push(employee);
    _save(records);
  };

  const update = (employee) => {
    const records = _load().map((item) => (item.id === employee.id ? employee : item));
    _save(records);
  };

  const remove = (id) => {
    const records = _load().filter((item) => item.id !== id);
    _save(records);
  };

  return { getAll, getById, insert, update, remove };
})();
