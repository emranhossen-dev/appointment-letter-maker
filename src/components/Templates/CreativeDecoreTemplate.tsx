import React from 'react';
import type { AppointmentLetterData } from '../../types/appointment';
import { formatDateDisplay, formatDynamicOpening, formatDynamicSubject } from '../../utils/formatters';
import { EditableText } from './EditableText';

interface TemplateProps {
  data: AppointmentLetterData;
  onUpdate?: (updated: AppointmentLetterData) => void;
}

export const CreativeDecoreTemplate: React.FC<TemplateProps> = ({ data, onUpdate }) => {
  const { company, employee, compensation, style, customGreeting, customSubject, customOpeningParagraph } = data;
  const primaryColor = style.primaryColor || '#854d0e';
  const lang = style.language || 'en';

  const updateCompany = (field: string, val: string) => {
    if (onUpdate) onUpdate({ ...data, company: { ...company, [field]: val } });
  };

  const updateEmployee = (field: string, val: string) => {
    if (onUpdate) onUpdate({ ...data, employee: { ...employee, [field]: val } });
  };

  const updateCompensation = (val: number) => {
    if (onUpdate) onUpdate({ ...data, compensation: { ...compensation, baseSalary: val } });
  };

  return (
    <div className="a4-sheet full-bleed text-slate-800 relative bg-white flex flex-col justify-between p-0 shadow-xl font-serif overflow-hidden h-[297mm] min-h-[297mm] max-h-[297mm] box-border">
      
      {/* Upper Content & Signature Wrapper */}
      <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
        
        {/* Top Header & Letter Content Block */}
        <div>
          {/* Top Primary Color Accent Band */}
          <div 
            className="h-2.5 -mx-8 -mt-8 mb-5" 
            style={{ backgroundColor: primaryColor }}
          />

          {/* Clean Default-Style Header Layout */}
          <div className="flex justify-between items-start border-b border-amber-900/20 pb-4 mb-4">
            {/* Left: Logo & Company Name */}
            <div>
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={company.name} className="h-14 object-contain mb-2" />
              ) : (
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: primaryColor }}>
                    <EditableText value={company.name} onChange={(v) => updateCompany('name', v)} />
                  </h1>
                  {company.tagline?.trim() ? (
                    <p className="text-xs text-amber-900/80 font-medium italic mt-0.5">
                      <EditableText value={company.tagline} onChange={(v) => updateCompany('tagline', v)} />
                    </p>
                  ) : null}
                </div>
              )}
            </div>

            {/* Right: Company Address & Contact Information */}
            <div className="text-right text-xs text-slate-600 space-y-0.5 font-sans">
              <p className="font-bold text-slate-900">
                <EditableText value={company.name} onChange={(v) => updateCompany('name', v)} />
              </p>
              {company.address?.trim() ? (
                <p>
                  <EditableText value={company.address} onChange={(v) => updateCompany('address', v)} />
                </p>
              ) : null}
              {(company.phone?.trim() || company.email?.trim()) ? (
                <p>
                  {company.phone?.trim() ? <span>T: <EditableText value={company.phone} onChange={(v) => updateCompany('phone', v)} /></span> : null}
                  {company.phone?.trim() && company.email?.trim() ? <span> | </span> : null}
                  {company.email?.trim() ? <span>E: <EditableText value={company.email} onChange={(v) => updateCompany('email', v)} /></span> : null}
                </p>
              ) : null}
              {company.website?.trim() ? (
                <p className="font-semibold" style={{ color: primaryColor }}>
                  <EditableText value={company.website} onChange={(v) => updateCompany('website', v)} />
                </p>
              ) : null}
            </div>
          </div>

          {/* Date Row (No Ref ID) */}
          <div className="flex justify-end items-center text-xs font-semibold text-slate-700 mb-5 font-sans">
            <div>
              <span>Date: </span>
              <span className="text-slate-900 font-bold">
                <EditableText value={formatDateDisplay(employee.issueDate, lang)} onChange={(v) => updateEmployee('issueDate', v)} />
              </span>
            </div>
          </div>

          {/* Centered Document Title */}
          <div className="mb-5 text-center">
            <h2 className="text-lg sm:text-xl font-bold tracking-wide uppercase border-b-2 inline-block pb-1" style={{ color: primaryColor, borderColor: primaryColor }}>
              <EditableText 
                value={formatDynamicSubject(customSubject, data)} 
                onChange={(v) => onUpdate && onUpdate({ ...data, customSubject: v })} 
              />
            </h2>
          </div>

          {/* Recipient Greeting & Letter Body */}
          <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed text-slate-800">
            <p className="font-bold text-slate-900">
              To: <EditableText value={employee.name} onChange={(v) => updateEmployee('name', v)} />
            </p>

            <p className="font-semibold text-slate-900">
              <EditableText value={customGreeting || (lang === 'bn' ? `প্রিয় ${employee.name},` : `Dear ${employee.name},`)} onChange={(v) => onUpdate && onUpdate({ ...data, customGreeting: v })} />
            </p>

            <p>
              <EditableText 
                multiline
                value={formatDynamicOpening(customOpeningParagraph, data)} 
                onChange={(v) => onUpdate && onUpdate({ ...data, customOpeningParagraph: v })} 
              />
            </p>

            {/* Clean Terms of Employment Box */}
            <div className="my-4 bg-amber-50/70 border-l-4 p-4 rounded-r-lg space-y-2 font-sans" style={{ borderColor: primaryColor }}>
              <p className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider">
                Terms of Employment:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm pt-1">
                {employee.department?.trim() ? (
                  <div>
                    <span className="font-bold text-slate-900">Department: </span>
                    <EditableText value={employee.department} onChange={(v) => updateEmployee('department', v)} />
                  </div>
                ) : null}
                {employee.designation?.trim() ? (
                  <div>
                    <span className="font-bold text-slate-900">Position: </span>
                    <EditableText value={employee.designation} onChange={(v) => updateEmployee('designation', v)} />
                  </div>
                ) : null}
                <div>
                  <span className="font-bold text-slate-900">Joining Date: </span>
                  {formatDateDisplay(employee.joiningDate, lang)}
                </div>
                <div>
                  <span className="font-bold text-slate-900">Monthly Salary: </span>
                  <EditableText 
                    value={`${compensation.baseSalary}/-`} 
                    onChange={(v) => {
                      const num = parseInt(v.replace(/[^0-9]/g, '')) || compensation.baseSalary;
                      updateCompensation(num);
                    }} 
                  />
                </div>
              </div>
            </div>

            <p>
              You are required to adhere strictly to quality workmanship standards and maintain confidentiality regarding company design patterns and trade strategies.
            </p>

            <p>
              We welcome you to <EditableText value={company.name} onChange={(v) => updateCompany('name', v)} /> and wish you a rewarding journey with our artisan family.
            </p>

            <p className="pt-1">Thank you.</p>
          </div>
        </div>

        {/* Signature Block (Always Pushed Gracefully Above Bottom Footer) */}
        <div className="mt-8 flex justify-end pb-2">
          <div className="text-right text-xs sm:text-sm space-y-1 font-medium text-slate-900">
            <p className="italic text-slate-700">Sincerely,</p>
            <p className="font-bold">For <EditableText value={company.name} onChange={(v) => updateCompany('name', v)} /></p>

            {company.signatureUrl && (
              <div className="flex justify-end my-1">
                <img src={company.signatureUrl} alt="Signature" className="h-10 object-contain" />
              </div>
            )}

            <p className="font-extrabold text-slate-900 pt-6">
              <EditableText value={company.signatoryName} onChange={(v) => updateCompany('signatoryName', v)} />
            </p>
            <p className="text-slate-600 text-xs italic font-sans">
              <EditableText value={company.signatoryTitle} onChange={(v) => updateCompany('signatoryTitle', v)} />
            </p>
          </div>
        </div>

      </div>

      {/* Pinned Bottom Footer Banner */}
      <div 
        className="w-full text-white px-6 py-3.5 mt-auto flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs gap-2 shrink-0 font-sans print:bg-[#854d0e] print:text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="text-center sm:text-left leading-tight">
          <p className="font-medium">
            <EditableText value={company.address} onChange={(v) => updateCompany('address', v)} />
          </p>
        </div>

        <div className="text-center leading-tight">
          <p>
            {company.phone ? <span><EditableText value={company.phone} onChange={(v) => updateCompany('phone', v)} /></span> : null}
            {company.phone && company.email ? <span> | </span> : null}
            {company.email ? <span><EditableText value={company.email} onChange={(v) => updateCompany('email', v)} /></span> : null}
          </p>
        </div>

        <div className="text-center sm:text-right leading-tight font-medium text-[11px] text-amber-200">
          {company.website ? (
            <EditableText value={company.website} onChange={(v) => updateCompany('website', v)} />
          ) : (
            <EditableText value={company.name} onChange={(v) => updateCompany('name', v)} />
          )}
        </div>
      </div>

    </div>
  );
};
