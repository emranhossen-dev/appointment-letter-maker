import React from 'react';
import type { CompanyInfo, EmployeeInfo } from '../../types/appointment';
import { EditableText } from './EditableText';

interface SignatureBlockProps {
  company: CompanyInfo;
  employee: EmployeeInfo;
  primaryColor: string;
  lang: 'en' | 'bn';
  onUpdateCompany?: (field: string, val: string) => void;
  onUpdateEmployee?: (field: string, val: string) => void;
}

export const SignatureBlock: React.FC<SignatureBlockProps> = ({
  company,
  employee,
  primaryColor,
  lang,
  onUpdateCompany,
  onUpdateEmployee,
}) => {
  const isBn = lang === 'bn';

  return (
    <div className="mt-10 pt-4 font-sans text-sm text-slate-800 page-break-inside-avoid">
      <div className="mb-4">
        <p className="font-semibold">{isBn ? 'আন্তরিকতার সাথে,' : 'Sincerely,'}</p>
        <p className="font-bold text-base" style={{ color: primaryColor }}>{company.name}</p>
      </div>

      <div className="grid grid-cols-2 gap-8 items-end">
        {/* Employer Signature */}
        <div>
          {company.signatureUrl ? (
            <img 
              src={company.signatureUrl} 
              alt="Authorized Signature" 
              className="h-14 object-contain mb-2"
            />
          ) : (
            <div className="h-12 border-b-2 border-slate-400 border-dashed mb-2 w-48 flex items-end pb-1 text-slate-400 text-xs">
              {isBn ? '[স্বাক্ষর স্থান]' : '[Authorized Signature]'}
            </div>
          )}
          <p className="font-bold text-slate-900">
            {onUpdateCompany ? (
              <EditableText value={company.signatoryName || ''} onChange={(v) => onUpdateCompany('signatoryName', v)} placeholder="Signatory Name" />
            ) : (
              company.signatoryName
            )}
          </p>
          <p className="text-xs text-slate-600 font-medium">
            {onUpdateCompany ? (
              <EditableText value={company.signatoryTitle || ''} onChange={(v) => onUpdateCompany('signatoryTitle', v)} placeholder="Signatory Title" />
            ) : (
              company.signatoryTitle
            )}
          </p>
          <p className="text-xs text-slate-500">{company.name}</p>
        </div>

        {/* Employee Acceptance Signature */}
        <div>
          <div className="border-t border-slate-300 pt-3">
            <p className="font-semibold text-xs text-slate-700 uppercase tracking-wider mb-1">
              {isBn ? 'গ্রহণের সম্মতি (Employee Acceptance)' : 'ACKNOWLEDGEMENT & ACCEPTANCE'}
            </p>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              {isBn 
                ? 'আমি নিম্নস্বাক্ষরকারী এতদ্বারা উক্ত পদে সকল শর্তাবলী মেনে নিয়োগপত্র গ্রহণ করলাম।'
                : 'I hereby accept the terms & conditions of employment mentioned above.'}
            </p>
            
            <div className="h-8 border-b border-slate-400 mb-1 w-full"></div>
            <div className="flex justify-between items-center text-xs text-slate-700 font-medium">
              <span>
                {onUpdateEmployee ? (
                  <EditableText value={employee.name || ''} onChange={(v) => onUpdateEmployee('name', v)} placeholder="Employee Name" />
                ) : (
                  employee.name
                )}
              </span>
              <span>{isBn ? 'তারিখ: _________' : 'Date: _________'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
