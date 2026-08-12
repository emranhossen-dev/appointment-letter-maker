import React from 'react';
import type { AppointmentLetterData } from '../../types/appointment';
import { formatDateDisplay } from '../../utils/formatters';
import { SalaryTable } from './SalaryTable';
import { EditableText } from './EditableText';

interface TemplateProps {
  data: AppointmentLetterData;
  onUpdate?: (updated: AppointmentLetterData) => void;
}

export const YazmartTemplate: React.FC<TemplateProps> = ({ data, onUpdate }) => {
  const { company, employee, compensation, clauses, style, customSubject, customGreeting, customOpeningParagraph, customClosing } = data;
  const primaryColor = style.primaryColor || '#1d4ed8'; // Royal Blue
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
      
      {/* Main Upper Content Area */}
      <div className="p-7 sm:p-9 flex-1 flex flex-col justify-between z-10 relative">
        <div>
          {/* Top Dual Accent Color Bar */}
          <div className="flex -mx-7 -mt-7 sm:-mx-9 sm:-mt-9 mb-4">
            <div className="h-3 w-3/4 bg-blue-600" style={{ backgroundColor: primaryColor }} />
            <div className="h-3 w-1/4 bg-amber-500" />
          </div>

          {/* Header Row */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-3.5 mb-4">
            {/* Left: YazMart Logo */}
            <div className="flex items-center gap-3">
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={company.name} className="h-16 object-contain" />
              ) : (
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <svg className="w-14 h-11 text-amber-500" viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6H10L15.6 27.2C15.8 28.1 16.6 28.8 17.6 28.8H38.4C39.4 28.8 40.2 28.1 40.4 27.2L44 12H13" stroke="#f97316" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="20" cy="34" r="3" fill="#1e293b" />
                      <circle cx="36" cy="34" r="3" fill="#1e293b" />
                      <path d="M2 14H8" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M0 20H6" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center text-3xl font-black tracking-tight leading-none">
                      <span className="text-slate-800">Yaz</span>
                      <span className="text-amber-500">Mart</span>
                    </div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1 border-t border-slate-300 pt-0.5">
                      — SHOP SMART, LIVE BETTER —
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Header Contact Info */}
            <div className="text-right text-xs sm:text-sm text-slate-600 space-y-0.5 font-sans leading-tight">
              <p className="font-bold text-slate-900 text-sm sm:text-base">
                <EditableText value={company.name || 'YazMart'} onChange={(v) => updateCompany('name', v)} />
              </p>
              <p className="text-slate-700">
                <EditableText value={company.address || '85/1, Road-04, Mohammadia Housing Society'} onChange={(v) => updateCompany('address', v)} />
              </p>
              <p className="text-slate-700">
                <EditableText value={company.city || 'Mohammadpur, Dhaka-1207'} onChange={(v) => updateCompany('city', v)} />
              </p>
              <p className="text-slate-600">
                T: <EditableText value={company.phone || '+880 1628756785'} onChange={(v) => updateCompany('phone', v)} />
                {company.email ? <span> | E: <EditableText value={company.email || 'yazmart.bd@gmail.com'} onChange={(v) => updateCompany('email', v)} /></span> : null}
              </p>
              {company.website ? (
                <p className="font-bold text-blue-600">
                  <EditableText value={company.website || 'yazmart.com'} onChange={(v) => updateCompany('website', v)} />
                </p>
              ) : null}
            </div>
          </div>

          {/* Candidate Dark Metadata Banner */}
          <div className="bg-[#0f172a] text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium mb-4 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-slate-400 uppercase tracking-wider text-[10px] sm:text-xs">{isBn ? 'প্রাপক:' : 'APPOINTMENT FOR:'} </span>
              <span className="font-bold text-amber-400 text-xs sm:text-sm"><EditableText value={employee.name} onChange={(v) => updateEmployee('name', v)} /></span>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider text-[10px] sm:text-xs">{isBn ? 'পদবী:' : 'ROLE:'} </span>
              <span className="font-bold text-white text-xs sm:text-sm"><EditableText value={employee.designation} onChange={(v) => updateEmployee('designation', v)} /></span>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider text-[10px] sm:text-xs">{isBn ? 'তারিখ:' : 'DATE:'} </span>
              <span className="font-bold text-white text-xs sm:text-sm">{formatDateDisplay(employee.issueDate, lang)}</span>
            </div>
          </div>

          {/* Subject Line (NO EMP Ref ID on the right!) */}
          <div className="mb-3.5 border-b border-slate-300 pb-2">
            <h2 className="text-base sm:text-lg font-bold uppercase tracking-tight" style={{ color: primaryColor }}>
              <EditableText 
                value={customSubject || (isBn ? 'নিয়োগপত্র প্রদান সংক্রান্ত' : `LETTER OF APPOINTMENT FOR THE POSITION OF ${employee.designation.toUpperCase()}`)} 
                onChange={(v) => onUpdate && onUpdate({ ...data, customSubject: v })} 
              />
            </h2>
          </div>

          {/* Recipient Greeting & Opening */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-800 leading-relaxed">
            <p className="font-bold text-slate-900 text-sm sm:text-base">
              <EditableText 
                value={customGreeting || (isBn ? `প্রিয় ${employee.name},` : `Dear ${employee.name},`)} 
                onChange={(v) => onUpdate && onUpdate({ ...data, customGreeting: v })} 
              />
            </p>

            <p className="text-slate-700">
              <EditableText 
                multiline
                value={customOpeningParagraph || (isBn 
                  ? `ইয়াজমার্ট (YazMart)-এর নির্বাহী নেতৃত্বের পক্ষ থেকে আপনাকে ${employee.department ? employee.department + ' বিভাগে ' : ''}${employee.designation} পদে নিয়োগপত্র প্রদান করতে পেরে আমরা আনন্দিত। ইয়াজমার্ট একটি মাল্টি-ভেন্ডর ই-কমার্স প্ল্যাটফর্ম যেখানে বিক্রেতারা শপ খুলে ব্যবসা করেন। উক্ত প্ল্যাটফর্মের উন্নয়ন ও পরিচালনায় আপনার মূল শর্তাবলী ও আর্থিক সুবিধাসমূহ নিম্নে তুলে ধরা হলো:`
                  : `On behalf of the executive leadership of YazMart (Multi-Vendor E-Commerce Platform), it is our privilege to formalize your appointment as ${employee.designation}${employee.department ? ' in the ' + employee.department + ' department' : ''}. As key talent in our marketplace ecosystem, your employment terms, obligations, and financial compensation plan are outlined below:`)} 
                onChange={(v) => onUpdate && onUpdate({ ...data, customOpeningParagraph: v })} 
              />
            </p>

            {/* Terms / Clauses */}
            {clauses && clauses.length > 0 && (
              <div className="space-y-2.5 my-3">
                {clauses.map((clause) => (
                  <div key={clause.id} className="text-xs sm:text-sm border-l-2 pl-3 py-0.5" style={{ borderColor: primaryColor }}>
                    <h4 className="font-bold text-slate-900 mb-0.5 text-xs sm:text-sm">
                      <EditableText value={clause.title} onChange={(v) => updateClause(clause.id, 'title', v)} />
                    </h4>
                    <p className="text-slate-700 leading-relaxed">
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

            {/* Closing Paragraphs Below Salary Table */}
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed mt-4">
              <p>
                <EditableText 
                  multiline 
                  value="You are required to adhere strictly to quality operational standards and maintain confidentiality regarding company platform designs, merchant algorithms, and trade strategies." 
                  onChange={() => {}}
                />
              </p>
              <p>
                <EditableText 
                  multiline 
                  value={customClosing || "We welcome you to YazMart and wish you a rewarding and successful journey with our team."} 
                  onChange={(v) => onUpdate && onUpdate({ ...data, customClosing: v })} 
                />
              </p>
              <p className="font-bold text-slate-900 pt-1 text-sm sm:text-base">
                Thank you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pinned Bottom Footer Banner (Company Name, Address, Website, Phone, Email) */}
      <div 
        className="w-full text-white px-7 py-3.5 mt-auto flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm gap-2 shrink-0 font-sans print:bg-[#1d4ed8] print:text-white z-20"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="text-center sm:text-left leading-tight">
          <p className="font-bold text-amber-300 text-sm">
            <EditableText value={company.name || 'YazMart'} onChange={(v) => updateCompany('name', v)} />
            <span className="font-normal text-white ml-1.5 opacity-90 text-xs">— Multi-Vendor E-Commerce Platform</span>
          </p>
          <p className="text-xs opacity-90">
            <EditableText value={company.address || '85/1, Road-04, Mohammadia Housing Society, Mohammadpur, Dhaka-1207'} onChange={(v) => updateCompany('address', v)} />
          </p>
        </div>

        <div className="text-center sm:text-right leading-tight">
          <p className="text-xs opacity-95 font-medium">
            <span>T: <EditableText value={company.phone || '+880 1628756785'} onChange={(v) => updateCompany('phone', v)} /></span>
            <span> | E: <EditableText value={company.email || 'yazmart.bd@gmail.com'} onChange={(v) => updateCompany('email', v)} /></span>
          </p>
          <p className="font-bold text-amber-300 text-xs sm:text-sm">
            <EditableText value={company.website || 'yazmart.com'} onChange={(v) => updateCompany('website', v)} />
          </p>
        </div>
      </div>

    </div>
  );
};
