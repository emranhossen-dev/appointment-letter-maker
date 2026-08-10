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

export const ModernCorporateTemplate: React.FC<TemplateProps> = ({ data, onUpdate }) => {
  const { company, employee, compensation, clauses, style, customSubject, customGreeting, customOpeningParagraph, customClosing } = data;
  const primaryColor = style.primaryColor || '#1d4ed8';
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
    <div className={`a4-sheet text-slate-800 relative bg-white leading-relaxed ${style.fontFamily === 'bangla' ? 'font-bangla' : style.fontFamily === 'serif' ? 'font-serif' : 'font-sans'}`}>
      
      {/* Top Accent Header Band */}
      <div 
        className="h-2.5 -mx-6 -mt-6 mb-6 rounded-t-sm" 
        style={{ backgroundColor: primaryColor }}
      />

      {/* Header Info */}
      <div className="flex justify-between items-start border-b border-slate-200 pb-5 mb-5">
        <div>
          {company.logoUrl ? (
            <img src={company.logoUrl} alt={company.name} className="h-14 object-contain mb-2" />
          ) : (
            <h1 className="text-2xl font-bold tracking-tight text-slate-900" style={{ color: primaryColor }}>
              <EditableText value={company.name} onChange={(v) => updateCompany('name', v)} />
            </h1>
          )}
          <p className="text-xs text-slate-500 font-medium">
            <EditableText value={company.tagline || ''} onChange={(v) => updateCompany('tagline', v)} placeholder="Click to add tagline..." />
          </p>
        </div>

        <div className="text-right text-xs text-slate-600 space-y-0.5">
          <p className="font-semibold text-slate-900"><EditableText value={company.name} onChange={(v) => updateCompany('name', v)} /></p>
          <p><EditableText value={company.address} onChange={(v) => updateCompany('address', v)} />, <EditableText value={company.city} onChange={(v) => updateCompany('city', v)} /></p>
          <p><EditableText value={company.country} onChange={(v) => updateCompany('country', v)} /></p>
          <p><EditableText value={company.email} onChange={(v) => updateCompany('email', v)} /> | <EditableText value={company.phone} onChange={(v) => updateCompany('phone', v)} /></p>
          {company.website && <p className="text-blue-600 font-medium"><EditableText value={company.website} onChange={(v) => updateCompany('website', v)} /></p>}
          {company.taxId && <p className="text-slate-400 font-mono text-[10px]"><EditableText value={company.taxId} onChange={(v) => updateCompany('taxId', v)} /></p>}
        </div>
      </div>

      {/* Issue Date & Ref No */}
      <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-5">
        <div>
          <span>{isBn ? 'তারিখ:' : 'Date:'} </span>
          <span className="text-slate-900 font-bold">{formatDateDisplay(employee.issueDate, lang)}</span>
        </div>
        <div>
          <span>{isBn ? 'আইডি:' : 'Ref ID:'} </span>
          <span className="text-slate-900 font-mono"><EditableText value={employee.employeeId} onChange={(v) => updateEmployee('employeeId', v)} /></span>
        </div>
      </div>

      {/* Employee Recipient Box */}
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-5 text-xs text-slate-700 grid grid-cols-2 gap-4">
        <div>
          <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-1">{isBn ? 'প্রাপক' : 'To'}</p>
          <p className="font-bold text-sm text-slate-900"><EditableText value={employee.name} onChange={(v) => updateEmployee('name', v)} /></p>
          <p className="text-slate-600 mt-0.5"><EditableText value={employee.address} onChange={(v) => updateEmployee('address', v)} /></p>
          <p className="text-slate-600"><EditableText value={employee.email} onChange={(v) => updateEmployee('email', v)} /> | <EditableText value={employee.phone} onChange={(v) => updateEmployee('phone', v)} /></p>
        </div>

        <div className="border-l border-slate-200 pl-4 space-y-1">
          <p><span className="font-semibold text-slate-900">{isBn ? 'পদবী:' : 'Designation:'}</span> <EditableText value={employee.designation} onChange={(v) => updateEmployee('designation', v)} /></p>
          <p><span className="font-semibold text-slate-900">{isBn ? 'বিভাগ:' : 'Department:'}</span> <EditableText value={employee.department} onChange={(v) => updateEmployee('department', v)} /></p>
          <p><span className="font-semibold text-slate-900">{isBn ? 'যোগদানের তারিখ:' : 'Joining Date:'}</span> {formatDateDisplay(employee.joiningDate, lang)}</p>
          <p><span className="font-semibold text-slate-900">{isBn ? 'কর্মসংস্থানের ধরন:' : 'Employment Type:'}</span> {employee.employmentType}</p>
        </div>
      </div>

      {/* Subject Line */}
      <div className="mb-5 border-l-4 pl-3 py-1 font-bold text-slate-900 text-sm uppercase tracking-wide" style={{ borderColor: primaryColor }}>
        <EditableText 
          value={customSubject || (isBn ? 'নিয়োগপত্র প্রদান প্রসঙ্গে।' : 'SUBJECT: LETTER OF APPOINTMENT')} 
          onChange={(v) => onUpdate && onUpdate({ ...data, customSubject: v })} 
        />
      </div>

      {/* Greeting */}
      <p className="text-sm font-medium mb-3 text-slate-900">
        <EditableText 
          value={customGreeting || (isBn ? `প্রিয় ${employee.name},` : `Dear ${employee.name},`)} 
          onChange={(v) => onUpdate && onUpdate({ ...data, customGreeting: v })} 
        />
      </p>

      {/* Opening Paragraph */}
      <p className="text-xs text-slate-700 leading-relaxed mb-4">
        <EditableText 
          multiline
          value={customOpeningParagraph || (isBn 
            ? `আমরা আনন্দের সাথে জানাচ্ছি যে, ${company.name}-এ আপনাকে ${employee.designation} হিসেবে (${employee.department} বিভাগ) নিয়োগের সিদ্ধান্ত নেওয়া হয়েছে। আগামী ${formatDateDisplay(employee.joiningDate, lang)} তারিখ হতে আপনার এই নিয়োগ কার্যকর হবে। আপনার কর্মসংস্থানের মূল শর্তাবলী নিম্নরূপ:`
            : `We are pleased to offer you employment at ${company.name} for the position of ${employee.designation} in the ${employee.department} department. Your employment will commence on ${formatDateDisplay(employee.joiningDate, lang)}. The terms and conditions governing your employment are detailed below:`)} 
          onChange={(v) => onUpdate && onUpdate({ ...data, customOpeningParagraph: v })} 
        />
      </p>

      {/* Terms & Clauses */}
      <div className="space-y-3 my-4">
        {clauses.map((clause) => (
          <div key={clause.id} className="text-xs page-break-inside-avoid">
            <h4 className="font-bold text-slate-900 mb-0.5">
              <EditableText value={clause.title} onChange={(v) => updateClause(clause.id, 'title', v)} />
            </h4>
            <p className="text-slate-600 leading-relaxed pl-2 border-l border-slate-200">
              <EditableText multiline value={clause.content} onChange={(v) => updateClause(clause.id, 'content', v)} />
            </p>
          </div>
        ))}
      </div>

      {/* Salary Table Annexure */}
      <SalaryTable 
        compensation={compensation} 
        primaryColor={primaryColor} 
        lang={lang} 
        onUpdate={(updatedComp) => onUpdate && onUpdate({ ...data, compensation: updatedComp })}
      />

      {/* Closing Statement */}
      <div className="my-4 bg-slate-50 p-3 border-l-2 rounded-r page-break-inside-avoid" style={{ borderColor: primaryColor }}>
        <p className="text-xs text-slate-700 italic">
          "<EditableText 
            multiline 
            value={customClosing || "We look forward to welcoming you to the team and building great products together."} 
            onChange={(v) => onUpdate && onUpdate({ ...data, customClosing: v })} 
          />"
        </p>
      </div>

      {/* Signature Section */}
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
