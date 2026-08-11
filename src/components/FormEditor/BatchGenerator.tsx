import React, { useState } from 'react';
import type { AppointmentLetterData, BatchEmployeeInput } from '../../types/appointment';
import { Users, Plus, Trash2, Printer, FileSpreadsheet, CheckCircle2, ChevronRight } from 'lucide-react';

interface BatchGeneratorProps {
  data: AppointmentLetterData;
  onChange: (updated: AppointmentLetterData) => void;
}

export const BatchGenerator: React.FC<BatchGeneratorProps> = ({ data, onChange }) => {
  const [employees, setEmployees] = useState<BatchEmployeeInput[]>([
    {
      id: '1',
      name: 'Fatema Begum',
      designation: 'Senior Hand Stitcher',
      department: 'Hand Stitch',
      baseSalary: 15000,
      issueDate: '2026-08-15',
      joiningDate: '2026-08-15',
    },
    {
      id: '2',
      name: 'Rahima Khatun',
      designation: 'Embroidery Artisan',
      department: 'Hand Stitch',
      baseSalary: 12500,
      issueDate: '2026-08-15',
      joiningDate: '2026-08-15',
    },
    {
      id: '3',
      name: 'Nasrin Sultana',
      designation: 'Quality Inspection Officer',
      department: 'Hand Stitch',
      baseSalary: 18000,
      issueDate: '2026-08-15',
      joiningDate: '2026-08-15',
    },
  ]);

  const [activeEmployeeId, setActiveEmployeeId] = useState<string>('1');
  const [showCsvImporter, setShowCsvImporter] = useState(false);
  const [csvText, setCsvText] = useState('');

  React.useEffect(() => {
    if (!data.batchEmployees || data.batchEmployees.length === 0) {
      applyEmployeeToLetter(employees[0], employees);
    }
  }, []);

  const handleAddEmployee = () => {
    const newEmp: BatchEmployeeInput = {
      id: Date.now().toString(),
      name: `Employee ${employees.length + 1}`,
      designation: data.employee.designation || 'Hand Stitcher',
      department: data.employee.department || 'Production',
      baseSalary: data.compensation.baseSalary || 12000,
      issueDate: data.employee.issueDate || new Date().toISOString().split('T')[0],
      joiningDate: data.employee.joiningDate || new Date().toISOString().split('T')[0],
    };

    const updatedList = [...employees, newEmp];
    setEmployees(updatedList);
    applyEmployeeToLetter(newEmp, updatedList);
  };

  const handleUpdateEmployee = (id: string, field: keyof BatchEmployeeInput, value: any) => {
    const updated = employees.map((emp) => (emp.id === id ? { ...emp, [field]: value } : emp));
    setEmployees(updated);

    const active = updated.find((e) => e.id === (id === activeEmployeeId ? id : activeEmployeeId)) || updated[0];
    applyEmployeeToLetter(active, updated);
  };

  const handleDeleteEmployee = (id: string) => {
    if (employees.length <= 1) {
      alert('You must keep at least one employee in the batch.');
      return;
    }
    const filtered = employees.filter((e) => e.id !== id);
    setEmployees(filtered);
    const nextActive = filtered.find(e => e.id === activeEmployeeId) || filtered[0];
    setActiveEmployeeId(nextActive.id);
    applyEmployeeToLetter(nextActive, filtered);
  };

  const applyEmployeeToLetter = (emp: BatchEmployeeInput, currentList: BatchEmployeeInput[] = employees) => {
    setActiveEmployeeId(emp.id);
    onChange({
      ...data,
      batchEmployees: currentList,
      employee: {
        ...data.employee,
        name: emp.name,
        designation: emp.designation,
        department: emp.department || data.employee.department,
        issueDate: emp.issueDate,
        joiningDate: emp.joiningDate,
      },
      compensation: {
        ...data.compensation,
        baseSalary: emp.baseSalary,
      },
    });
  };

  const handleParseCsv = () => {
    if (!csvText.trim()) return;

    const lines = csvText.trim().split('\n');
    const parsed: BatchEmployeeInput[] = [];

    lines.forEach((line, index) => {
      const parts = line.split(',').map((p) => p.trim());
      if (parts.length >= 2) {
        parsed.push({
          id: `${Date.now()}-${index}`,
          name: parts[0] || `Employee ${index + 1}`,
          designation: parts[1] || 'Hand Stitcher',
          baseSalary: parseInt(parts[2]) || 12000,
          issueDate: parts[3] || data.employee.issueDate || '2026-08-15',
          joiningDate: parts[3] || data.employee.joiningDate || '2026-08-15',
          department: data.employee.department || 'Production',
        });
      }
    });

    if (parsed.length > 0) {
      setEmployees(parsed);
      setActiveEmployeeId(parsed[0].id);
      applyEmployeeToLetter(parsed[0], parsed);
      setShowCsvImporter(false);
      setCsvText('');
    } else {
      alert('Invalid text format. Format line as: Name, Designation, Salary, Date');
    }
  };

  const handleBatchPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Badge */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="font-semibold text-slate-200 text-base">Bulk Employee Batch Generator</h3>
            <p className="text-[11px] text-slate-400">Generate appointment letters for all employees at once</p>
          </div>
        </div>
        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] px-2.5 py-1 rounded-full font-mono uppercase font-bold">
          {employees.length} Employees
        </span>
      </div>

      {/* CSV / Multi-Line Import Collapsible */}
      <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
        <button
          type="button"
          onClick={() => setShowCsvImporter(!showCsvImporter)}
          className="w-full flex items-center justify-between text-xs font-semibold text-amber-400 hover:text-amber-300 transition cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Paste Bulk List / CSV (Quick Auto-Fill)</span>
          </div>
          <ChevronRight className={`w-4 h-4 transition-transform ${showCsvImporter ? 'rotate-90' : ''}`} />
        </button>

        {showCsvImporter && (
          <div className="pt-2 space-y-2">
            <p className="text-[11px] text-slate-400 leading-snug">
              Paste employee records line-by-line format: <br />
              <code className="text-amber-300 font-mono">Name, Designation, Salary, Date</code>
            </p>
            <textarea
              rows={3}
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder="Fatema Begum, Senior Hand Stitcher, 15000, 2026-08-15&#10;Rahima Khatun, Artisan, 12500, 2026-08-15"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-amber-500"
            />
            <button
              type="button"
              onClick={handleParseCsv}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition cursor-pointer"
            >
              Parse & Generate All
            </button>
          </div>
        )}
      </div>

      {/* Active Employee Switcher Pills */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Select Employee to Preview
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {employees.map((emp, index) => {
            const isActive = emp.id === activeEmployeeId;
            return (
              <button
                key={emp.id}
                type="button"
                onClick={() => applyEmployeeToLetter(emp)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer border ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>#{index + 1} {emp.name || 'Unnamed'}</span>
                {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Employee List Edit Table */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Batch Employee Table
          </label>
          <button
            type="button"
            onClick={handleAddEmployee}
            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Row</span>
          </button>
        </div>

        <div className="space-y-3">
          {employees.map((emp, index) => (
            <div
              key={emp.id}
              className={`p-3 rounded-xl border transition ${
                emp.id === activeEmployeeId
                  ? 'bg-slate-900 border-amber-500 ring-1 ring-amber-500/30'
                  : 'bg-slate-900/40 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-400">Employee #{index + 1}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => applyEmployeeToLetter(emp)}
                    className="text-[11px] text-blue-400 hover:underline cursor-pointer"
                  >
                    View Letter
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteEmployee(emp.id)}
                    className="text-slate-500 hover:text-red-400 transition cursor-pointer"
                    title="Remove Employee"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Form Input Grid for Employee */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Name</label>
                  <input
                    type="text"
                    value={emp.name}
                    onChange={(e) => handleUpdateEmployee(emp.id, 'name', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-amber-500"
                    placeholder="e.g. Fatema Begum"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Designation</label>
                  <input
                    type="text"
                    value={emp.designation}
                    onChange={(e) => handleUpdateEmployee(emp.id, 'designation', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-amber-500"
                    placeholder="e.g. Senior Hand Stitcher"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Salary (Monthly BDT)</label>
                  <input
                    type="number"
                    value={emp.baseSalary}
                    onChange={(e) => handleUpdateEmployee(emp.id, 'baseSalary', parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-amber-500"
                    placeholder="15000"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Appointment Date</label>
                  <input
                    type="date"
                    value={emp.issueDate}
                    onChange={(e) => {
                      handleUpdateEmployee(emp.id, 'issueDate', e.target.value);
                      handleUpdateEmployee(emp.id, 'joiningDate', e.target.value);
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Print All Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleBatchPrint}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print All {employees.length} Appointment Letters</span>
        </button>
      </div>
    </div>
  );
};
