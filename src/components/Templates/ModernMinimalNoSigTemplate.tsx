import React from 'react';
import type { AppointmentLetterData } from '../../types/appointment';
import { formatDateDisplay } from '../../utils/formatters';
import { SalaryTable } from './SalaryTable';
import { EditableText } from './EditableText';

interface TemplateProps {
  data: AppointmentLetterData;
  onUpdate?: (updated: AppointmentLetterData) => void;
}

export const ModernMinimalNoSigTemplate: React.FC<TemplateProps> = ({ data, onUpdate }) => {
  const { company, employee, compensation, clauses, style, customSubject, customGreeting, customOpeningParagraph, customClosing } = data;
  const primaryColor = style.primaryColor || '#0f172a'; // Dark Slate / Charcoal Navy
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
    <div className="a4-sheet full-bleed text-slate-800 relative bg-white flex flex-col justify-between p-0 shadow-2xl font-sans overflow-hidden h-[297mm] min-h-[297mm] max-h-[297mm] box-border">
      
      {/* Upper Content Area */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between z-10 relative">
        <div>
          {/* Top Thin Brand Accent Line */}
          <div className="h-2 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-4" style={{ backgroundColor: primaryColor }} />

          {/* Clean Header Layout */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-4 mb-4">
            <div>
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={company.name} className="h-12 object-contain" />
              ) : (
                <h1 className="text-2xl font-extrabold tracking-tight uppercase" style={{ color: primaryColor }}>
                  <EditableText value={company.name} onChange={(v) => updateCompany('name', v)} />
                </h1>
              )}
              {company.tagline && (
                <p className="text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                  <EditableText value={company.tagline} onChange={(v) => updateCompany('tagline', v)} />
                </p>
              )}
            </div>

            <div className="text-right text-xs text-slate-600 space-y-0.5 leading-tight">
              <p className="font-bold text-slate-900"><EditableText value={company.address} onChange={(v) => updateCompany('address', v)} /></p>
              <p><EditableText value={company.city} onChange={(v) => updateCompany('city', v)} /></p>
              <p>T: <EditableText value={company.phone} onChange={(v) => updateCompany('phone', v)} />{company.email ? <span> | E: <EditableText value={company.email} onChange={(v) => updateCompany('email', v)} /></span> : null}</p>
              {company.website && <p className="font-bold text-blue-600"><EditableText value={company.website} onChange={(v) => updateCompany('website', v)} /></p>}
            </div>
          </div>

          {/* Candidate Metadata Banner (Signature-Free Style) */}
          <div className="bg-slate-900 text-white px-4 py-2 rounded-md text-xs font-medium mb-4 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-slate-400 uppercase tracking-wider text-[10px]">{isBn ? 'প্রাপক:' : 'TO:'} </span>
              <span className="font-bold text-amber-400 text-xs"><EditableText value={employee.name} onChange={(v) => updateEmployee('name', v)} /></span>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider text-[10px]">{isBn ? 'পদবী:' : 'POSITION:'} </span>
              <span className="font-bold text-white text-xs"><EditableText value={employee.designation} onChange={(v) => updateEmployee('designation', v)} /></span>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider text-[10px]">{isBn ? 'তারিখ:' : 'DATE:'} </span>
              <span className="font-bold text-white text-xs">
                <EditableText value={formatDateDisplay(employee.issueDate, lang)} onChange={(v) => updateEmployee('issueDate', v)} />
              </span>
            </div>
          </div>

          {/* Subject Line (No Ref ID on the right) */}
          <div className="mb-3.5 border-b border-slate-300 pb-1.5">
            <h2 className="text-base font-bold uppercase tracking-tight text-slate-900" style={{ color: primaryColor }}>
              <EditableText 
                value={customSubject || (isBn ? 'অফিসিয়াল নিয়োগপত্র' : 'OFFICIAL APPOINTMENT LETTER')} 
                onChange={(v) => onUpdate && onUpdate({ ...data, customSubject: v })} 
              />
            </h2>
          </div>

          {/* Greeting & Body */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-800 leading-relaxed">
            <p className="font-bold text-slate-900">
              <EditableText 
                value={customGreeting || (isBn ? `প্রিয় ${employee.name},` : `Dear ${employee.name},`)} 
                onChange={(v) => onUpdate && onUpdate({ ...data, customGreeting: v })} 
              />
            </p>

            <p className="text-slate-700">
              <EditableText 
                multiline
                value={customOpeningParagraph || (isBn 
                  ? `আমরা আনন্দের সাথে জানাচ্ছি যে, ${company.name}-এ আপনাকে ${employee.designation} পদে নিয়োগপত্র প্রদান করা হলো। আপনার যোগদানের তারিখ ${formatDateDisplay(employee.joiningDate, lang)} নির্ধারণ করা হয়েছে। নিয়োগের মূল শর্তাবলী নিম্নে তুলে ধরা হলো:`
                  : `We are pleased to formalize your appointment as ${employee.designation} at ${company.name}. Your appointment is effective from ${formatDateDisplay(employee.joiningDate, lang)}. The terms and conditions governing your position are outlined below:`)} 
                onChange={(v) => onUpdate && onUpdate({ ...data, customOpeningParagraph: v })} 
              />
            </p>

            {/* Clauses */}
            {clauses && clauses.length > 0 && (
              <div className="space-y-2 my-2.5">
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
            )}

            {/* Salary Annexure Table */}
            <SalaryTable 
              compensation={compensation} 
              primaryColor={primaryColor} 
              lang={lang} 
              onUpdate={(updatedComp) => onUpdate && onUpdate({ ...data, compensation: updatedComp })}
            />

            {/* Closing Paragraphs (No Signature Blocks) */}
            <div className="space-y-2 text-xs sm:text-sm text-slate-800 leading-relaxed mt-3">
              <p>
                <EditableText 
                  multiline 
                  value="You are required to adhere strictly to company operational standards and maintain full confidentiality regarding corporate systems and trade strategies." 
                  onChange={() => {}}
                />
              </p>
              <p>
                <EditableText 
                  multiline 
                  value={customClosing || "We welcome you to the team and wish you a rewarding journey with us."} 
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

      {/* Pinned Bottom Footer Banner */}
      <div 
        className="w-full text-white px-6 py-3 mt-auto flex flex-col sm:flex-row items-center justify-between text-xs gap-2 shrink-0 font-sans print:bg-slate-900 print:text-white z-20"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="text-center sm:text-left leading-tight">
          <p className="font-bold text-amber-300">
            <EditableText value={company.name} onChange={(v) => updateCompany('name', v)} />
          </p>
          <p className="text-[10px] opacity-90">
            <EditableText value={company.address} onChange={(v) => updateCompany('address', v)} />, <EditableText value={company.city} onChange={(v) => updateCompany('city', v)} />
          </p>
        </div>

        <div className="text-center sm:text-right leading-tight">
          <p className="text-[10px] opacity-95">
            <span>T: <EditableText value={company.phone} onChange={(v) => updateCompany('phone', v)} /></span>
            {company.email ? <span> | E: <EditableText value={company.email} onChange={(v) => updateCompany('email', v)} /></span> : null}
          </p>
          {company.website && (
            <p className="font-bold text-amber-300 text-xs">
              <EditableText value={company.website} onChange={(v) => updateCompany('website', v)} />
            </p>
          )}
        </div>
      </div>

    </div>
  );
};
