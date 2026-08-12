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

export const ClassicFormalTemplate: React.FC<TemplateProps> = ({ data, onUpdate }) => {
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
    <div className={`a4-sheet text-slate-900 relative bg-white leading-relaxed p-6 border-[4px] border-double border-slate-400 ${style.fontFamily === 'bangla' ? 'font-bangla' : 'font-serif'}`}>
      
      {/* Centered Header */}
      <div className="text-center border-b-2 border-slate-800 pb-4 mb-6">
        {company.logoUrl ? (
          <img src={company.logoUrl} alt={company.name} className="h-16 mx-auto mb-2 object-contain" />
        ) : (
          <h1 className="text-2xl font-bold uppercase tracking-wider text-slate-900" style={{ color: primaryColor }}>
            <EditableText value={company.name} onChange={(v) => updateCompany('name', v)} />
          </h1>
        )}
        <p className="text-xs italic text-slate-600 mb-1">
          <EditableText value={company.tagline || ''} onChange={(v) => updateCompany('tagline', v)} placeholder="Click to add tagline..." />
        </p>
        <p className="text-xs text-slate-700">
          <EditableText value={company.address} onChange={(v) => updateCompany('address', v)} />, <EditableText value={company.city} onChange={(v) => updateCompany('city', v)} />
        </p>
        <p className="text-xs text-slate-600">
          Phone: <EditableText value={company.phone} onChange={(v) => updateCompany('phone', v)} />{company.email ? <span> | Email: <EditableText value={company.email} onChange={(v) => updateCompany('email', v)} /></span> : null}
        </p>
      </div>

      {/* Date & Ref */}
      <div className="flex justify-between items-center text-xs font-serif mb-6 text-slate-800">
        <p><span className="font-bold">{isBn ? 'রেফারেন্স নং:' : 'Ref No:'}</span> <EditableText value={employee.employeeId} onChange={(v) => updateEmployee('employeeId', v)} /></p>
        <p><span className="font-bold">{isBn ? 'তারিখ:' : 'Date:'}</span> <EditableText value={formatDateDisplay(employee.issueDate, lang)} onChange={(v) => updateEmployee('issueDate', v)} /></p>
      </div>

      {/* Recipient */}
      <div className="text-xs text-slate-800 mb-6 space-y-0.5">
        <p className="font-bold text-sm"><EditableText value={employee.name} onChange={(v) => updateEmployee('name', v)} /></p>
        <p><EditableText value={employee.address} onChange={(v) => updateEmployee('address', v)} /></p>
        <p>Email: <EditableText value={employee.email} onChange={(v) => updateEmployee('email', v)} /></p>
      </div>

      {/* Subject Line Centered */}
      <div className="text-center mb-6 font-bold text-xs uppercase tracking-wide underline underline-offset-4" style={{ color: primaryColor }}>
        <EditableText 
          value={customSubject || (isBn ? 'নিয়োগপত্র প্রদান প্রসঙ্গে।' : 'APPOINTMENT LETTER')} 
          onChange={(v) => onUpdate && onUpdate({ ...data, customSubject: v })} 
        />
      </div>

      <p className="text-xs font-bold mb-4">
        <EditableText 
          value={customGreeting || (isBn ? `জনাব/জনাবা ${employee.name},` : `Dear ${employee.name},`)} 
          onChange={(v) => onUpdate && onUpdate({ ...data, customGreeting: v })} 
        />
      </p>

      <p className="text-xs text-slate-800 leading-relaxed mb-4 text-justify">
        <EditableText 
          multiline
          value={customOpeningParagraph || (isBn 
            ? `এতদ্বারা আনন্দের সাথে জানানো যাচ্ছে যে, আমাদের পরিচালনা পর্ষদের সিদ্ধান্ত অনুযায়ী আপনাকে ${company.name}-এ ${employee.designation} পদে নিয়োগ দান করা হইলো। আগামী ${formatDateDisplay(employee.joiningDate, lang)} তারিখে উক্ত বিভাগে আপনার যোগদান কার্যকরের সিদ্ধান্ত গৃহীত হইলো। নিয়োগের শর্তাবলী নিম্নে তুলে ধরা হলো:`
            : `With reference to your application and subsequent interview, management is pleased to offer you the appointment of ${employee.designation} in ${company.name}. Your appointment is effective from your date of reporting for duty on ${formatDateDisplay(employee.joiningDate, lang)}. The terms & conditions of your appointment are as follows:`)} 
          onChange={(v) => onUpdate && onUpdate({ ...data, customOpeningParagraph: v })} 
        />
      </p>

      {/* Clauses */}
      <div className="space-y-3 my-4">
        {clauses.map((clause) => (
          <div key={clause.id} className="text-xs">
            <h4 className="font-bold text-slate-900 mb-0.5">
              <EditableText value={clause.title} onChange={(v) => updateClause(clause.id, 'title', v)} />
            </h4>
            <p className="text-slate-700 leading-relaxed text-justify">
              <EditableText multiline value={clause.content} onChange={(v) => updateClause(clause.id, 'content', v)} />
            </p>
          </div>
        ))}
      </div>

      {/* Salary Annexure */}
      <SalaryTable 
        compensation={compensation} 
        primaryColor={primaryColor} 
        lang={lang} 
        onUpdate={(updatedComp) => onUpdate && onUpdate({ ...data, compensation: updatedComp })}
      />

      <div className="text-xs text-slate-800 italic my-4 text-center border-t border-b border-slate-200 py-2">
        "<EditableText 
          multiline 
          value={customClosing || "We look forward to welcoming you to the company."} 
          onChange={(v) => onUpdate && onUpdate({ ...data, customClosing: v })} 
        />"
      </div>

      {/* Signature */}
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
