import React from 'react';
import type { AppointmentLetterData } from '../../types/appointment';
import { formatDateDisplay } from '../../utils/formatters';
import { SalaryTable } from './SalaryTable';
import { EditableText } from './EditableText';

interface TemplateProps {
  data: AppointmentLetterData;
  onUpdate?: (updated: AppointmentLetterData) => void;
}

export const ElegantFrameNoSigTemplate: React.FC<TemplateProps> = ({ data, onUpdate }) => {
  const { company, employee, compensation, clauses, style, customSubject, customGreeting, customOpeningParagraph, customClosing } = data;
  const primaryColor = style.primaryColor || '#92400e'; // Warm Amber / Bronze
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
    <div className="a4-sheet full-bleed text-slate-900 relative bg-white flex flex-col justify-between p-0 shadow-2xl font-serif overflow-hidden h-[297mm] min-h-[297mm] max-h-[297mm] box-border">
      
      {/* Outer Decorative Double Frame Padding Wrapper */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between z-10 relative">
        <div className="border-2 border-double p-5 sm:p-6 rounded flex-1 flex flex-col justify-between" style={{ borderColor: primaryColor }}>
          
          <div>
            {/* Header: Centered Company Name & Logo */}
            <div className="text-center border-b border-amber-900/20 pb-4 mb-4 font-sans">
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={company.name} className="h-14 mx-auto mb-2 object-contain" />
              ) : (
                <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide" style={{ color: primaryColor }}>
                  <EditableText value={company.name} onChange={(v) => updateCompany('name', v)} />
                </h1>
              )}
              {company.tagline && (
                <p className="text-xs text-amber-900/80 italic mt-0.5">
                  <EditableText value={company.tagline} onChange={(v) => updateCompany('tagline', v)} />
                </p>
              )}
              <p className="text-xs text-slate-600 mt-1">
                <EditableText value={company.address} onChange={(v) => updateCompany('address', v)} />, <EditableText value={company.city} onChange={(v) => updateCompany('city', v)} />
              </p>
            </div>

            {/* Date & Candidate Info */}
            <div className="flex justify-between items-center text-xs text-slate-700 mb-4 font-sans font-medium">
              <div>
                <span>To: </span>
                <span className="font-bold text-slate-900"><EditableText value={employee.name} onChange={(v) => updateEmployee('name', v)} /></span>
                <span className="text-slate-500 font-normal"> (<EditableText value={employee.designation} onChange={(v) => updateEmployee('designation', v)} />)</span>
              </div>
              <div>
                <span>Date: </span>
                <span className="font-bold text-slate-900">
                  <EditableText value={formatDateDisplay(employee.issueDate, lang)} onChange={(v) => updateEmployee('issueDate', v)} />
                </span>
              </div>
            </div>

            {/* Centered Document Title */}
            <div className="mb-4 text-center">
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider border-b-2 inline-block pb-1" style={{ color: primaryColor, borderColor: primaryColor }}>
                <EditableText 
                  value={customSubject || (isBn ? 'নিয়োগপত্র প্রদান সংক্রান্ত' : 'APPOINTMENT LETTER')} 
                  onChange={(v) => onUpdate && onUpdate({ ...data, customSubject: v })} 
                />
              </h2>
            </div>

            {/* Recipient Greeting & Opening */}
            <div className="space-y-3 text-xs sm:text-sm text-slate-800 leading-relaxed">
              <p className="font-bold text-slate-900">
                <EditableText 
                  value={customGreeting || (isBn ? `প্রিয় ${employee.name},` : `Dear ${employee.name},`)} 
                  onChange={(v) => onUpdate && onUpdate({ ...data, customGreeting: v })} 
                />
              </p>

              <p>
                <EditableText 
                  multiline
                  value={customOpeningParagraph || (isBn 
                    ? `আমরা আনন্দের সাথে জানাচ্ছি যে, ${company.name}-এ আপনাকে ${employee.designation} পদে নিয়োগ প্রদান করা হলো। আগামী ${formatDateDisplay(employee.joiningDate, lang)} তারিখে আপনার যোগদান কার্যকর হবে। নিয়োগের শর্তাবলী নিম্নে বর্ণিত হলো:`
                    : `Management is pleased to formalize your appointment as ${employee.designation} at ${company.name}, effective from ${formatDateDisplay(employee.joiningDate, lang)}. The terms and conditions governing your employment are detailed below:`)} 
                  onChange={(v) => onUpdate && onUpdate({ ...data, customOpeningParagraph: v })} 
                />
              </p>

              {/* Clauses */}
              {clauses && clauses.length > 0 && (
                <div className="space-y-2.5 my-3 font-sans">
                  {clauses.map((clause) => (
                    <div key={clause.id} className="text-xs border-l-2 pl-3 py-0.5" style={{ borderColor: primaryColor }}>
                      <h4 className="font-bold text-slate-900 mb-0.5">
                        <EditableText value={clause.title} onChange={(v) => updateClause(clause.id, 'title', v)} />
                      </h4>
                      <p className="text-slate-700 leading-relaxed">
                        <EditableText multiline value={clause.content} onChange={(v) => updateClause(clause.id, 'content', v)} />
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Salary Table */}
              <SalaryTable 
                compensation={compensation} 
                primaryColor={primaryColor} 
                lang={lang} 
                onUpdate={(updatedComp) => onUpdate && onUpdate({ ...data, compensation: updatedComp })}
              />

              {/* Closing Paragraphs (Signature-Free) */}
              <div className="space-y-2 text-xs sm:text-sm text-slate-800 leading-relaxed mt-3">
                <p className="italic">
                  <EditableText 
                    multiline 
                    value="You are required to adhere strictly to corporate quality standards and maintain full confidentiality regarding trade secrets and business strategies." 
                    onChange={() => {}}
                  />
                </p>
                <p>
                  <EditableText 
                    multiline 
                    value={customClosing || "We welcome you to our company and wish you a successful journey with us."} 
                    onChange={(v) => onUpdate && onUpdate({ ...data, customClosing: v })} 
                  />
                </p>
                <p className="font-bold text-slate-900 pt-1">
                  Thank you.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Elegant Bottom Footer Banner */}
      <div 
        className="w-full text-white px-6 py-3 mt-auto flex flex-col sm:flex-row items-center justify-between text-xs gap-2 shrink-0 font-sans print:bg-amber-900 print:text-white z-20"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="text-center sm:text-left leading-tight">
          <p className="font-bold">
            <EditableText value={company.name} onChange={(v) => updateCompany('name', v)} />
          </p>
          <p className="text-[10px] opacity-90">
            <EditableText value={company.address} onChange={(v) => updateCompany('address', v)} />
          </p>
        </div>

        <div className="text-center sm:text-right leading-tight">
          {(company.phone || company.email) && (
            <p className="text-[10px] opacity-95">
              {company.phone ? <span>T: <EditableText value={company.phone} onChange={(v) => updateCompany('phone', v)} /></span> : null}
              {company.phone && company.email ? <span> | </span> : null}
              {company.email ? <span>E: <EditableText value={company.email} onChange={(v) => updateCompany('email', v)} /></span> : null}
            </p>
          )}
          {company.website && (
            <p className="font-bold text-amber-200 text-xs">
              <EditableText value={company.website} onChange={(v) => updateCompany('website', v)} />
            </p>
          )}
        </div>
      </div>

    </div>
  );
};
