import React from 'react';
import type { AppointmentLetterData } from '../../types/appointment';
import { formatDateDisplay } from '../../utils/formatters';
import { EditableText } from './EditableText';

interface TemplateProps {
  data: AppointmentLetterData;
  onUpdate?: (updated: AppointmentLetterData) => void;
}

export const FoodForHealthTemplate: React.FC<TemplateProps> = ({ data, onUpdate }) => {
  const { company, employee, compensation, style, customGreeting } = data;
  const primaryColor = style.primaryColor || '#265217';
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
    <div className="a4-sheet full-bleed text-slate-900 relative bg-white flex flex-col justify-between p-0 shadow-lg font-sans overflow-hidden h-[297mm] min-h-[297mm] max-h-[297mm] box-border">
      
      {/* Upper Content & Signature Wrapper */}
      <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
        
        {/* Top Header Row & Letter Content */}
        <div>
          <div className="flex items-center justify-between pb-4 mb-2">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={company.name} className="h-16 object-contain" />
              ) : null}
            </div>

            {/* Right Header Title & Tagline */}
            <div className="text-right">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: primaryColor }}>
                <EditableText value={company.name || 'FOOD FOR HEALTH'} onChange={(v) => updateCompany('name', v)} />
              </h1>
              <p className="text-xs font-semibold text-slate-700 mt-1 tracking-wide">
                <EditableText value={company.tagline || 'Healthy Food • Healthy Life'} onChange={(v) => updateCompany('tagline', v)} />
              </p>
            </div>
          </div>

          {/* Thick Divider Line */}
          <div className="h-1.5 w-full bg-slate-500 rounded-full mb-6" />

          {/* Letter Title & Date */}
          <div className="space-y-3 mb-6">
            <h2 className="text-center text-xl font-bold tracking-wide text-slate-900 uppercase">
              LETTER OF APPOINTMENT
            </h2>
            <div className="text-right text-xs font-semibold text-slate-800">
              Date: <EditableText value={formatDateDisplay(employee.issueDate, lang)} onChange={(v) => updateEmployee('issueDate', v)} />
            </div>
          </div>

          {/* Recipient Greeting & Opening */}
          <div className="space-y-4 text-xs sm:text-sm text-slate-900 leading-relaxed font-normal">
            <p className="font-bold text-slate-900">
              To: <EditableText value={employee.name} onChange={(v) => updateEmployee('name', v)} />
            </p>

            <p className="font-medium text-slate-800">
              <EditableText value={customGreeting || (lang === 'bn' ? `প্রিয় ${employee.name},` : `Dear ${employee.name},`)} onChange={(v) => onUpdate && onUpdate({ ...data, customGreeting: v })} />
            </p>

            <p>
              We are pleased to appoint you as <strong className="font-extrabold"><EditableText value={employee.designation} onChange={(v) => updateEmployee('designation', v)} /></strong> at <EditableText value={company.name} onChange={(v) => updateCompany('name', v)} />.
            </p>

            <p>
              In this role, you will be responsible for executing all duties and responsibilities related to your position to drive our digital marketing goals.
            </p>

            {/* Terms of Employment Box */}
            <div className="py-2 space-y-2 font-medium">
              <p className="font-semibold text-slate-900">Terms of Employment:</p>
              <div className="pl-2 space-y-1.5 text-xs sm:text-sm">
                <div className="flex gap-2">
                  <span className="font-bold w-28 text-slate-900">Department:</span>
                  <span><EditableText value={employee.department} onChange={(v) => updateEmployee('department', v)} /></span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold w-28 text-slate-900">Position :</span>
                  <span><EditableText value={employee.designation} onChange={(v) => updateEmployee('designation', v)} /></span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold w-28 text-slate-900">Joining Date:</span>
                  <span>{formatDateDisplay(employee.joiningDate, lang)}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold w-28 text-slate-900">Salary:</span>
                  <span>
                    <EditableText 
                      value={`${compensation.baseSalary}/-`} 
                      onChange={(v) => {
                        const num = parseInt(v.replace(/[^0-9]/g, '')) || compensation.baseSalary;
                        updateCompensation(num);
                      }} 
                    />
                  </span>
                </div>
              </div>
            </div>

            <p>
              You are required to maintain full confidentiality regarding all company information and strategies.
            </p>

            <p>
              We welcome you to <EditableText value={company.name} onChange={(v) => updateCompany('name', v)} /> and wish you a successful journey with us.
            </p>

            <p className="pt-1">Thank you.</p>
          </div>
        </div>

        {/* Signature Block (Always Pushed Gracefully Above Bottom Footer) */}
        <div className="mt-8 flex justify-end pb-2">
          <div className="text-right text-xs sm:text-sm space-y-1.5 font-medium text-slate-900">
            <p>Sincerely,</p>
            <p className="font-semibold">For <EditableText value={company.name} onChange={(v) => updateCompany('name', v)} /></p>
            
            {company.signatureUrl && (
              <div className="flex justify-end my-1">
                <img src={company.signatureUrl} alt="Signature" className="h-10 object-contain" />
              </div>
            )}

            <p className="font-extrabold text-slate-900 pt-6">
              <EditableText value={company.signatoryName || 'Aysha'} onChange={(v) => updateCompany('signatoryName', v)} />
            </p>
            <p className="text-slate-800 font-normal">
              <EditableText value={company.signatoryTitle || 'Founder'} onChange={(v) => updateCompany('signatoryTitle', v)} />
            </p>
          </div>
        </div>

      </div>

      {/* Pinned Bottom Footer Banner */}
      <div 
        className="w-full text-white px-6 py-4 mt-auto flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs gap-3 shrink-0 print:bg-[#265217] print:text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="text-center sm:text-left leading-tight">
          <p className="font-medium">
            <EditableText value={company.address} onChange={(v) => updateCompany('address', v)} />
          </p>
        </div>

        <div className="text-center leading-tight">
          {company.phone ? <p><EditableText value={company.phone} onChange={(v) => updateCompany('phone', v)} /></p> : null}
          {company.email ? <p><EditableText value={company.email} onChange={(v) => updateCompany('email', v)} /></p> : null}
        </div>

        <div className="text-center sm:text-right leading-tight font-medium">
          <p><EditableText value={company.website || 'www.foodforhealths.com'} onChange={(v) => updateCompany('website', v)} /></p>
        </div>
      </div>

    </div>
  );
};
