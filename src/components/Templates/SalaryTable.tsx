import React from 'react';
import type { CompensationDetails } from '../../types/appointment';
import { calculateCompensationTotals, formatCurrency } from '../../utils/formatters';
import { EditableText } from './EditableText';

interface SalaryTableProps {
  compensation: CompensationDetails;
  primaryColor: string;
  lang: 'en' | 'bn';
  onUpdate?: (updated: CompensationDetails) => void;
}

export const SalaryTable: React.FC<SalaryTableProps> = ({ compensation, primaryColor, lang, onUpdate }) => {
  const totals = calculateCompensationTotals(compensation);
  const symbol = compensation.currencySymbol || '৳';
  const isBn = lang === 'bn';

  const updateBaseSalary = (valStr: string) => {
    const num = parseFloat(valStr.replace(/[^0-9.]/g, '')) || 0;
    if (onUpdate) onUpdate({ ...compensation, baseSalary: num });
  };

  const updateComponentName = (id: string, name: string) => {
    if (onUpdate) {
      const updatedComps = compensation.components.map(c => c.id === id ? { ...c, name } : c);
      onUpdate({ ...compensation, components: updatedComps });
    }
  };

  const updateComponentAmount = (id: string, amountStr: string) => {
    const num = parseFloat(amountStr.replace(/[^0-9.]/g, '')) || 0;
    if (onUpdate) {
      const updatedComps = compensation.components.map(c => c.id === id ? { ...c, amount: num } : c);
      onUpdate({ ...compensation, components: updatedComps });
    }
  };

  // If showTable is false, render an elegant single-line salary box instead of hiding salary completely
  if (!compensation.showTable) {
    return (
      <div className="my-3 text-xs sm:text-sm font-medium text-slate-900 border-l-4 pl-3 py-1.5 bg-slate-50 rounded-r page-break-inside-avoid flex items-center justify-between" style={{ borderColor: primaryColor }}>
        <div>
          <span className="font-bold text-slate-900">{isBn ? 'মাসিক প্রদেয় বেতন (Monthly Basic Salary):' : 'Monthly Basic Salary:'} </span>
          <span className="font-bold text-slate-900 ml-1">
            {symbol} <EditableText value={compensation.baseSalary.toString()} onChange={updateBaseSalary} />/-
          </span>
        </div>
        <span className="text-[10px] text-slate-500 font-sans">
          ({isBn ? 'মাসিক ভিত্তিতে' : 'Monthly Basis'})
        </span>
      </div>
    );
  }

  const allowances = compensation.components.filter(c => c.type === 'allowance');
  const deductions = compensation.components.filter(c => c.type === 'deduction');

  return (
    <div className="my-4 text-xs sm:text-sm font-sans page-break-inside-avoid">
      <div className="font-semibold text-slate-800 mb-1.5 border-b pb-1 flex justify-between items-center" style={{ borderColor: primaryColor }}>
        <span>{isBn ? 'বেতন ও ভাতাদির বিবরণী (Salary & Compensation Breakdown)' : 'ANNEXURE A: COMPENSATION & BENEFITS BREAKDOWN'}</span>
        <span className="text-[10px] font-normal text-slate-500">
          ({compensation.salaryFrequency === 'monthly' ? (isBn ? 'মাসিক' : 'Monthly Basis') : (isBn ? 'বার্ষিক' : 'Annual Basis')})
        </span>
      </div>

      <table className="w-full border-collapse border border-slate-300 text-left text-xs">
        <thead>
          <tr className="bg-slate-100 text-slate-700 font-medium text-[11px]">
            <th className="border border-slate-300 p-1.5">{isBn ? 'উপাদান / বিবরণ' : 'Salary Component'}</th>
            <th className="border border-slate-300 p-1.5 text-right">{isBn ? 'পরিমাণ (মাসিক)' : 'Monthly Amount'}</th>
            <th className="border border-slate-300 p-1.5 text-right">{isBn ? 'পরিমাণ (বার্ষিক)' : 'Annualized Amount'}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-slate-800">
          {/* Base Salary */}
          <tr>
            <td className="border border-slate-300 p-1.5 font-medium">
              {isBn ? 'মূল বেতন (Basic Salary)' : 'Basic Salary'}
            </td>
            <td className="border border-slate-300 p-1.5 text-right">
              {symbol} <EditableText value={totals.base.toString()} onChange={updateBaseSalary} />
            </td>
            <td className="border border-slate-300 p-1.5 text-right font-mono text-[11px]">
              {formatCurrency(totals.base * 12, symbol)}
            </td>
          </tr>

          {/* Allowances */}
          {allowances.map((comp) => (
            <tr key={comp.id}>
              <td className="border border-slate-300 p-1.5 text-slate-700 pl-3">
                + <EditableText value={comp.name} onChange={(v) => updateComponentName(comp.id, v)} />
              </td>
              <td className="border border-slate-300 p-1.5 text-right">
                {symbol} <EditableText value={comp.amount.toString()} onChange={(v) => updateComponentAmount(comp.id, v)} />
              </td>
              <td className="border border-slate-300 p-1.5 text-right font-mono text-[11px]">
                {formatCurrency(comp.amount * 12, symbol)}
              </td>
            </tr>
          ))}

          {/* Gross Salary Row */}
          <tr className="bg-slate-50 font-semibold text-slate-900">
            <td className="border border-slate-300 p-1.5">{isBn ? 'মোট গ্রস বেতন (Gross Earnings)' : 'Gross Salary (Base + Allowances)'}</td>
            <td className="border border-slate-300 p-1.5 text-right text-blue-700">{formatCurrency(totals.grossSalary, symbol)}</td>
            <td className="border border-slate-300 p-1.5 text-right text-blue-700">{formatCurrency(totals.grossSalary * 12, symbol)}</td>
          </tr>

          {/* Deductions */}
          {deductions.map((comp) => (
            <tr key={comp.id} className="text-slate-600 bg-red-50/30">
              <td className="border border-slate-300 p-1.5 pl-3 text-red-700">
                - <EditableText value={comp.name} onChange={(v) => updateComponentName(comp.id, v)} />
              </td>
              <td className="border border-slate-300 p-1.5 text-right text-red-700">
                ({symbol} <EditableText value={comp.amount.toString()} onChange={(v) => updateComponentAmount(comp.id, v)} />)
              </td>
              <td className="border border-slate-300 p-1.5 text-right text-red-700 font-mono text-[11px]">
                ({formatCurrency(comp.amount * 12, symbol)})
              </td>
            </tr>
          ))}

          {/* Net Salary Row */}
          <tr className="bg-slate-200/80 font-bold text-slate-900 border-t-2 border-slate-400">
            <td className="border border-slate-300 p-2" style={{ color: primaryColor }}>
              {isBn ? 'প্রদেয় নিট বেতন (Net Payable / Take-Home)' : 'Net Payable Salary (Take Home)'}
            </td>
            <td className="border border-slate-300 p-2 text-right font-bold text-sm" style={{ color: primaryColor }}>
              {formatCurrency(totals.netSalary, symbol)}
            </td>
            <td className="border border-slate-300 p-2 text-right font-bold text-sm" style={{ color: primaryColor }}>
              {formatCurrency(totals.netSalary * 12, symbol)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
