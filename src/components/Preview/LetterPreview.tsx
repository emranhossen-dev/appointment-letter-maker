import { useState } from 'react';
import type { AppointmentLetterData } from '../../types/appointment';
import { ModernCorporateTemplate } from '../Templates/ModernCorporateTemplate';
import { ClassicFormalTemplate } from '../Templates/ClassicFormalTemplate';
import { StartupMinimalTemplate } from '../Templates/StartupMinimalTemplate';
import { ExecutiveTemplate } from '../Templates/ExecutiveTemplate';
import { FoodForHealthTemplate } from '../Templates/FoodForHealthTemplate';
import { CreativeDecoreTemplate } from '../Templates/CreativeDecoreTemplate';
import { YazmartTemplate } from '../Templates/YazmartTemplate';
import { Download, Printer, ZoomIn, ZoomOut, RotateCcw, FileText, Edit3 } from 'lucide-react';
import { exportToPdf } from '../../utils/pdfExport';

interface LetterPreviewProps {
  data: AppointmentLetterData;
  onUpdate?: (updated: AppointmentLetterData) => void;
}

export const LetterPreview: React.FC<LetterPreviewProps> = ({ data, onUpdate }) => {
  const [zoom, setZoom] = useState<number>(0.85);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const renderTemplate = (letterData: AppointmentLetterData = data) => {
    switch (letterData.style.templateId) {
      case 'classic':
        return <ClassicFormalTemplate data={letterData} onUpdate={onUpdate} />;
      case 'startup':
        return <StartupMinimalTemplate data={letterData} onUpdate={onUpdate} />;
      case 'executive':
        return <ExecutiveTemplate data={letterData} onUpdate={onUpdate} />;
      case 'food_for_health':
        return <FoodForHealthTemplate data={letterData} onUpdate={onUpdate} />;
      case 'creative_decore':
        return <CreativeDecoreTemplate data={letterData} onUpdate={onUpdate} />;
      case 'yazmart':
        return <YazmartTemplate data={letterData} onUpdate={onUpdate} />;
      case 'corporate':
      default:
        return <ModernCorporateTemplate data={letterData} onUpdate={onUpdate} />;
    }
  };

  const handlePrint = () => {
    // Temporarily reset zoom for crisp 1:1 printing
    const prevZoom = zoom;
    setZoom(1);
    setTimeout(() => {
      window.print();
      setTimeout(() => setZoom(prevZoom), 300);
    }, 100);
  };

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    const filename = `${(data.employee.name || 'Employee').replace(/\s+/g, '_')}_Appointment_Letter.pdf`;
    await exportToPdf('appointment-letter-print-area', filename);
    setIsExporting(false);
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-900 border-l border-slate-800/80 overflow-hidden print:bg-white print:border-none print:h-auto print:overflow-visible">
      
      {/* Top Preview Controls Bar */}
      <div className="no-print shrink-0 h-12 bg-slate-950 border-b border-slate-800 px-4 flex items-center justify-between z-10 w-full">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-500" />
          <h2 className="font-semibold text-slate-200 text-xs hidden sm:inline">A4 Live Document Preview</h2>
          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] px-2 py-0.5 rounded-full font-mono uppercase flex items-center gap-1">
            <Edit3 className="w-3 h-3" /> Click any text to edit directly
          </span>
        </div>

        {/* Zoom & Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 text-slate-400 text-xs">
            <button 
              type="button"
              onClick={() => setZoom(prev => Math.max(0.4, prev - 0.05))} 
              className="p-1 hover:bg-slate-800 hover:text-white rounded transition cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center font-mono text-[11px] text-slate-300">{Math.round(zoom * 100)}%</span>
            <button 
              type="button"
              onClick={() => setZoom(prev => Math.min(1.2, prev + 0.05))} 
              className="p-1 hover:bg-slate-800 hover:text-white rounded transition cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button 
              type="button"
              onClick={() => setZoom(0.85)} 
              className="p-1 hover:bg-slate-800 hover:text-white rounded transition ml-0.5 cursor-pointer"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Direct Print Button */}
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition shadow cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-300" />
            <span>{data.batchEmployees && data.batchEmployees.length > 1 ? `Print All (${data.batchEmployees.length})` : 'Print'}</span>
          </button>

          {/* Download PDF Button */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Generating PDF...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      {/* Main Screen Preview & Unified Print Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 pb-16 flex justify-center items-start bg-slate-900/60 no-scrollbar print:bg-white print:p-0 print:overflow-visible print:block print:h-auto">
        <div 
          className="transition-transform duration-150 ease-out origin-top shadow-2xl my-4 print:shadow-none print:transform-none print:m-0"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
        >
          <div id="appointment-letter-print-area" className="print-area print:w-full">
            {/* Interactive Screen Preview for Current Active Employee */}
            <div className="no-print">
              {renderTemplate(data)}
            </div>

            {/* Print Engine Area: Multi-Page output for Batch Employees or Single Page */}
            <div className="hidden print:block">
              {data.batchEmployees && data.batchEmployees.length > 0 ? (
                data.batchEmployees.map((emp) => {
                  const empData: AppointmentLetterData = {
                    ...data,
                    employee: {
                      ...data.employee,
                      name: emp.name,
                      designation: emp.designation,
                      department: emp.department || data.employee.department,
                      issueDate: emp.issueDate,
                      joiningDate: emp.joiningDate,
                    },
                    customGreeting: '',
                    compensation: {
                      ...data.compensation,
                      baseSalary: emp.baseSalary,
                    },
                  };
                  return (
                    <div key={emp.id} className="print-page-break">
                      {renderTemplate(empData)}
                    </div>
                  );
                })
              ) : (
                renderTemplate(data)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
