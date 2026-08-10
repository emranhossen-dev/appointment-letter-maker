import type { CompensationDetails, CompensationComponent } from '../../types/appointment';
import { DollarSign, Plus, Trash2, CheckSquare, Square } from 'lucide-react';
import { calculateCompensationTotals, formatCurrency } from '../../utils/formatters';

interface CompensationFormProps {
  compensation: CompensationDetails;
  onChange: (updated: CompensationDetails) => void;
}

export const CompensationForm: React.FC<CompensationFormProps> = ({ compensation, onChange }) => {
  const currencies = [
    { code: 'BDT (৳)', symbol: '৳' },
    { code: 'USD ($)', symbol: '$' },
    { code: 'INR (₹)', symbol: '₹' },
    { code: 'EUR (€)', symbol: '€' },
    { code: 'GBP (£)', symbol: '£' },
    { code: 'AED (DH)', symbol: 'DH' },
  ];

  const handleBaseSalaryChange = (value: number) => {
    onChange({ ...compensation, baseSalary: value });
  };

  const handleCurrencyChange = (code: string) => {
    const selected = currencies.find(c => c.code === code);
    onChange({
      ...compensation,
      currency: code,
      currencySymbol: selected?.symbol || '৳',
    });
  };

  const handleAddComponent = (type: 'allowance' | 'deduction') => {
    const newComp: CompensationComponent = {
      id: Date.now().toString(),
      name: type === 'allowance' ? 'House Rent / Allowance' : 'Provident Fund / Tax',
      amount: 5000,
      type,
    };
    onChange({
      ...compensation,
      components: [...compensation.components, newComp],
    });
  };

  const handleUpdateComponent = (id: string, field: keyof CompensationComponent, value: any) => {
    const updated = compensation.components.map(c => c.id === id ? { ...c, [field]: value } : c);
    onChange({ ...compensation, components: updated });
  };

  const handleRemoveComponent = (id: string) => {
    onChange({
      ...compensation,
      components: compensation.components.filter(c => c.id !== id),
    });
  };

  const totals = calculateCompensationTotals(compensation);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-500" />
          <h3 className="font-semibold text-slate-200 text-base">Compensation & Salary Structure</h3>
        </div>

        <button
          type="button"
          onClick={() => onChange({ ...compensation, showTable: !compensation.showTable })}
          className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition"
        >
          {compensation.showTable ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4 text-slate-500" />}
          <span>Include Salary Table in Letter</span>
        </button>
      </div>

      {/* Currency & Frequency Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Currency</label>
          <select
            value={compensation.currency}
            onChange={(e) => handleCurrencyChange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
          >
            {currencies.map(c => (
              <option key={c.code} value={c.code}>{c.code}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Payment Frequency</label>
          <select
            value={compensation.salaryFrequency}
            onChange={(e) => onChange({ ...compensation, salaryFrequency: e.target.value as 'monthly' | 'annually' })}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
          >
            <option value="monthly">Monthly Basis</option>
            <option value="annually">Annual Basis</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Base Salary *</label>
          <input
            type="number"
            value={compensation.baseSalary}
            onChange={(e) => handleBaseSalaryChange(parseFloat(e.target.value) || 0)}
            placeholder="0"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:outline-none focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* Salary Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs">
        <div>
          <span className="text-slate-500">Base Salary</span>
          <p className="font-bold text-slate-200 text-sm">{formatCurrency(totals.base, compensation.currencySymbol)}</p>
        </div>
        <div>
          <span className="text-slate-500">Total Allowances</span>
          <p className="font-bold text-emerald-400 text-sm">+{formatCurrency(totals.totalAllowances, compensation.currencySymbol)}</p>
        </div>
        <div>
          <span className="text-slate-500">Total Deductions</span>
          <p className="font-bold text-red-400 text-sm">-{formatCurrency(totals.totalDeductions, compensation.currencySymbol)}</p>
        </div>
        <div>
          <span className="text-slate-500">Net Take-Home</span>
          <p className="font-bold text-blue-400 text-base">{formatCurrency(totals.netSalary, compensation.currencySymbol)}</p>
        </div>
      </div>

      {/* Allowances & Deductions Editor */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Salary Components Breakdown</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleAddComponent('allowance')}
              className="flex items-center gap-1 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 px-2.5 py-1 rounded-lg transition"
            >
              <Plus className="w-3.5 h-3.5" /> Allowance
            </button>
            <button
              type="button"
              onClick={() => handleAddComponent('deduction')}
              className="flex items-center gap-1 text-xs bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 px-2.5 py-1 rounded-lg transition"
            >
              <Plus className="w-3.5 h-3.5" /> Deduction
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {compensation.components.map((comp) => (
            <div
              key={comp.id}
              className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs ${
                comp.type === 'allowance' ? 'bg-slate-900/60 border-slate-800' : 'bg-red-950/20 border-red-900/30'
              }`}
            >
              <span className={`px-2 py-0.5 rounded font-semibold text-[10px] uppercase ${
                comp.type === 'allowance' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {comp.type}
              </span>

              <input
                type="text"
                value={comp.name}
                onChange={(e) => handleUpdateComponent(comp.id, 'name', e.target.value)}
                placeholder="Component Name"
                className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-blue-500"
              />

              <div className="relative w-32">
                <span className="absolute left-2.5 top-1.5 text-slate-500">{compensation.currencySymbol}</span>
                <input
                  type="number"
                  value={comp.amount}
                  onChange={(e) => handleUpdateComponent(comp.id, 'amount', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded pl-7 pr-2 py-1.5 text-right font-mono text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="button"
                onClick={() => handleRemoveComponent(comp.id)}
                className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
