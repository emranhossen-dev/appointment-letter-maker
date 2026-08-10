import React from 'react';
import type { AppointmentLetterData } from '../../types/appointment';
import { formatDateDisplay } from '../../utils/formatters';
import { SalaryTable } from './SalaryTable';
import { SignatureBlock } from './SignatureBlock';
import { EditableText } from './EditableText';

interface TemplateProps {
  data: AppointmentLetterData;
  onUpdate?: (updated: AppointmentLetterData) => void;
}

export const ExecutiveTemplate: React.FC<TemplateProps> = ({ data, onUpdate }) => {
  const { company, employee, compensation, clauses, style, customSubject, customGreeting, customOpeningParagraph, customClosing } = data;
  const primaryColor = style.primaryColor || '#1e3a8a';
  const lang = style.language || 'en';
  const isBn = lang === 'bn';

  const updateCompany = (field: string, val: string) => {
    if (onUpdate) onUpdate({ ...data, company: { ...company, [field]: val } });
  };

  const updateEmployee = (field: string, val: string) => {
    if (onUpdate) onUpdate({ ...data, employee: { ...employee, [field]: val } });
  };

  const updateClause = (id: string, field: 'title' | 'content', val: string) => {
    if (onUpdate) {
      const updatedClauses = clauses.map(c => c.id === id ? { ...c, [field]: val } : c);
      onUpdate({ ...data, clauses: updatedClauses });
    }
  };

  return (
    <div className={`a4-sheet text-slate-900 relative bg-white leading-relaxed ${style.fontFamily === 'bangla' ? 'font-bangla' : 'font-sans'}`}>
      
      {/* Background Watermark */}
      {style.showWatermark && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
          <span className="text-8xl font-extrabold uppercase tracking-widest text-slate-900 rotate-45">
            {company.name || 'CONFIDENTIAL'}
          </span>
        </div>
      )}

      {/* Top Dual Accent Bar */}
      <div className="flex -mx-6 -mt-6 mb-6 rounded-t-sm">
        <div className="h-3 w-3/4" style={{ backgroundColor: primaryColor }} />
        <div className="h-3 w-1/4 bg-amber-500" />
      </div>

      {/* Header */}
      <div className="flex justify-between items-end border-b-2 border-slate-200 pb-6 mb-6">
        <div>
          {company.logoUrl ? (
            <img src={company.logoUrl} alt={company.name} className="h-16 object-contain mb-2" />
          ) : (
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight uppercase" style={{ color: primaryColor }}>
                <EditableText value={company.name} onChange={(v) => updateCompany('name', v)} />
              </h1>
              <p className="text-xs text-amber-600 font-semibold tracking-wider uppercase">
                <EditableText value={company.tagline || ''} onChange={(v) => updateCompany('tagline', v)} placeholder="Click to add tagline..." />
              </p>
            </div>
          )}
        </div>

        <div className="text-right text-xs text-slate-600 space-y-0.5 font-medium">
          <p className="font-bold text-slate-900"><EditableText value={company.address} onChange={(v) => updateCompany('address', v)} /></p>
          <p><EditableText value={company.city} onChange={(v) => updateCompany('city', v)} />, <EditableText value={company.country} onChange={(v) => updateCompany('country', v)} /></p>
          <p>T: <EditableText value={company.phone} onChange={(v) => updateCompany('phone', v)} /> | E: <EditableText value={company.email} onChange={(v) => updateCompany('email', v)} /></p>
          <p className="text-blue-600 font-bold"><EditableText value={company.website} onChange={(v) => updateCompany('website', v)} /></p>
        </div>
      </div>

      {/* Metadata Pill Banner */}
      <div className="flex justify-between items-center bg-slate-900 text-white px-4 py-2 rounded text-xs font-medium mb-6">
        <div>
          <span className="text-slate-400 font-normal">{isBn ? 'প্রাপক:' : 'APPOINTMENT FOR:'} </span>
          <span className="font-bold text-amber-400"><EditableText value={employee.name} onChange={(v) => updateEmployee('name', v)} /></span>
        </div>
        <div>
          <span className="text-slate-400 font-normal">{isBn ? 'পদবী:' : 'ROLE:'} </span>
          <span className="font-bold text-white"><EditableText value={employee.designation} onChange={(v) => updateEmployee('designation', v)} /></span>
        </div>
        <div>
          <span className="text-slate-400 font-normal">{isBn ? 'তারিখ:' : 'DATE:'} </span>
          <span className="font-bold text-white">{formatDateDisplay(employee.issueDate, lang)}</span>
        </div>
      </div>

      {/* Subject */}
      <div className="mb-6 font-bold text-slate-900 text-sm border-b pb-2 uppercase tracking-wide flex justify-between items-center">
        <span style={{ color: primaryColor }}>
          <EditableText 
            value={customSubject || (isBn ? 'অফিসিয়াল নিয়োগপত্র' : 'OFFICIAL LETTER OF APPOINTMENT')} 
            onChange={(v) => onUpdate && onUpdate({ ...data, customSubject: v })} 
          />
        </span>
        <span className="text-xs font-mono font-normal text-slate-500"><EditableText value={employee.employeeId} onChange={(v) => updateEmployee('employeeId', v)} /></span>
      </div>

      <p className="text-xs font-bold text-slate-900 mb-3">
        <EditableText 
          value={customGreeting || (isBn ? `প্রিয় ${employee.name},` : `Dear ${employee.name},`)} 
          onChange={(v) => onUpdate && onUpdate({ ...data, customGreeting: v })} 
        />
      </p>

      <p className="text-xs text-slate-700 leading-relaxed mb-4">
        <EditableText 
          multiline
          value={customOpeningParagraph || (isBn 
            ? `কোম্পানির পরিচালনা পর্ষদের পক্ষ থেকে আপনাকে ${company.name}-এর গুরুত্বপূর্ণ দায়িত্ব ${employee.designation} হিসেবে যোগদানের আমন্ত্রণ জানাতে পেরে আমরা অত্যন্ত আনন্দিত। আপনার যোগদানের তারিখ ${formatDateDisplay(employee.joiningDate, lang)} নির্ধারণ করা হয়েছে। চুক্তিভিত্তিক নিয়োগের শর্তাবলী নিম্নে বর্ণিত হলো:`
            : `On behalf of the executive leadership of ${company.name}, it is my privilege to formalize your appointment as ${employee.designation} in the ${employee.department} department. Your key employment terms, obligations, and financial compensation plan are outlined below:`)} 
          onChange={(v) => onUpdate && onUpdate({ ...data, customOpeningParagraph: v })} 
        />
      </p>

      {/* Clauses */}
      <div className="space-y-3 my-4">
        {clauses.map((clause) => (
          <div key={clause.id} className="text-xs border-l-2 pl-3 py-0.5" style={{ borderColor: primaryColor }}>
            <h4 className="font-bold text-slate-900 mb-0.5">
              <EditableText value={clause.title} onChange={(v) => updateClause(clause.id, 'title', v)} />
            </h4>
            <p className="text-slate-600 leading-relaxed">
              <EditableText multiline value={clause.content} onChange={(v) => updateClause(clause.id, 'content', v)} />
            </p>
          </div>
        ))}
      </div>

      {/* Salary Table */}
      <SalaryTable 
        compensation={compensation} 
        primaryColor={primaryColor} 
        lang={lang} 
        onUpdate={(updatedComp) => onUpdate && onUpdate({ ...data, compensation: updatedComp })}
      />

      <div className="my-4 p-3 bg-amber-50 border-l-4 border-amber-500 text-amber-900 rounded-r text-xs italic">
        "<EditableText 
          multiline 
          value={customClosing || "We look forward to welcoming you to the executive leadership team."} 
          onChange={(v) => onUpdate && onUpdate({ ...data, customClosing: v })} 
        />"
      </div>

      {/* Signatures */}
      <SignatureBlock 
        company={company} 
        employee={employee} 
        primaryColor={primaryColor} 
        lang={lang} 
        onUpdateCompany={updateCompany}
        onUpdateEmployee={updateEmployee}
      />
    </div>
  );
};
