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

export const StartupMinimalTemplate: React.FC<TemplateProps> = ({ data, onUpdate }) => {
  const { company, employee, compensation, clauses, style, customSubject, customGreeting, customOpeningParagraph, customClosing } = data;
  const primaryColor = style.primaryColor || '#0f172a';
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
    <div className={`a4-sheet text-slate-800 relative bg-white leading-relaxed flex flex-col justify-between ${style.fontFamily === 'bangla' ? 'font-bangla' : 'font-sans'}`}>
      
      {/* Minimal Header */}
      <div>
        <div className="flex justify-between items-start mb-8 border-b-2 border-slate-900 pb-4">
          <div>
            <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">OFFICIAL EMPLOYMENT OFFER</span>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 mt-1" style={{ color: primaryColor }}>
              <EditableText value={company.name} onChange={(v) => updateCompany('name', v)} />
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5"><EditableText value={company.website} onChange={(v) => updateCompany('website', v)} /></p>
          </div>

          <div className="text-right text-xs text-slate-500 font-mono space-y-0.5">
            <p className="text-slate-900 font-bold">{formatDateDisplay(employee.issueDate, lang)}</p>
            <p><EditableText value={employee.employeeId} onChange={(v) => updateEmployee('employeeId', v)} /></p>
            <p><EditableText value={company.phone} onChange={(v) => updateCompany('phone', v)} /></p>
          </div>
        </div>

        {/* Minimal Grid Header for Employee */}
        <div className="grid grid-cols-3 gap-4 bg-slate-100 p-4 rounded-md text-xs mb-6 border-l-4" style={{ borderColor: primaryColor }}>
          <div>
            <p className="text-slate-400 font-mono text-[10px] uppercase">EMPLOYEE</p>
            <p className="font-bold text-slate-900 text-sm mt-0.5"><EditableText value={employee.name} onChange={(v) => updateEmployee('name', v)} /></p>
            <p className="text-slate-500 truncate"><EditableText value={employee.email} onChange={(v) => updateEmployee('email', v)} /></p>
          </div>

          <div>
            <p className="text-slate-400 font-mono text-[10px] uppercase">POSITION</p>
            <p className="font-bold text-slate-900 text-sm mt-0.5"><EditableText value={employee.designation} onChange={(v) => updateEmployee('designation', v)} /></p>
            <p className="text-slate-500"><EditableText value={employee.department} onChange={(v) => updateEmployee('department', v)} /></p>
          </div>

          <div>
            <p className="text-slate-400 font-mono text-[10px] uppercase">START DATE</p>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{formatDateDisplay(employee.joiningDate, lang)}</p>
            <p className="text-slate-500">{employee.employmentType}</p>
          </div>
        </div>

        {/* Subject */}
        <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide mb-3">
          <EditableText 
            value={customSubject || (isBn ? 'নিয়োগ পত্র' : 'APPOINTMENT & EMPLOYMENT AGREEMENT')} 
            onChange={(v) => onUpdate && onUpdate({ ...data, customSubject: v })} 
          />
        </h3>

        <p className="text-xs font-semibold text-slate-900 mb-3">
          <EditableText 
            value={customGreeting || (isBn ? `প্রিয় ${employee.name},` : `Hi ${employee.name},`)} 
            onChange={(v) => onUpdate && onUpdate({ ...data, customGreeting: v })} 
          />
        </p>

        <p className="text-xs text-slate-700 leading-relaxed mb-4">
          <EditableText 
            multiline
            value={customOpeningParagraph || (isBn
              ? `আমরা অত্যন্ত আনন্দের সাথে আপনাকে ${company.name} টিম-এ স্বাগত জানাচ্ছি। ${employee.designation} পদে আপনার নিয়োগ চূড়ান্ত করা হয়েছে। আপনার মূল কাজের বিবরণী এবং প্রতিষ্ঠানের নীতিসমূহ নিচে প্রকাশ করা হলো:`
              : `We are thrilled to invite you to join the ${company.name} team as a ${employee.designation}. We were greatly impressed by your skills and experience. Below are the terms of your appointment:`)} 
            onChange={(v) => onUpdate && onUpdate({ ...data, customOpeningParagraph: v })} 
          />
        </p>

        {/* Clauses */}
        <div className="space-y-3 my-4">
          {clauses.map((clause) => (
            <div key={clause.id} className="text-xs">
              <h4 className="font-bold text-slate-900 mb-0.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                <EditableText value={clause.title} onChange={(v) => updateClause(clause.id, 'title', v)} />
              </h4>
              <p className="text-slate-600 leading-relaxed pl-3.5">
                <EditableText multiline value={clause.content} onChange={(v) => updateClause(clause.id, 'content', v)} />
              </p>
            </div>
          ))}
        </div>

        {/* Salary */}
        <SalaryTable 
          compensation={compensation} 
          primaryColor={primaryColor} 
          lang={lang} 
          onUpdate={(updatedComp) => onUpdate && onUpdate({ ...data, compensation: updatedComp })}
        />

        <p className="text-xs text-slate-700 italic my-4 border-l-2 border-slate-400 pl-3">
          "<EditableText 
            multiline 
            value={customClosing || "We look forward to building great products together."} 
            onChange={(v) => onUpdate && onUpdate({ ...data, customClosing: v })} 
          />"
        </p>
      </div>

      <div>
        <SignatureBlock 
          company={company} 
          employee={employee} 
          primaryColor={primaryColor} 
          lang={lang} 
          onUpdateCompany={updateCompany}
          onUpdateEmployee={updateEmployee}
        />
      </div>
    </div>
  );
};
