import { useRef } from 'react';
import type { AppointmentLetterData } from '../types/appointment';
import { ENGLISH_SAMPLE_DATA, BANGLA_SAMPLE_DATA, FOOD_FOR_HEALTH_SAMPLE_DATA, CREATIVE_DECORE_SAMPLE_DATA } from '../constants/initialData';
import { FileText, Sparkles, RefreshCw, Upload, Download, Globe2 } from 'lucide-react';

interface HeaderProps {
  data: AppointmentLetterData;
  onUpdate: (updated: AppointmentLetterData) => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ data, onUpdate, onReset }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadSampleData = (type: 'en' | 'bn' | 'ffh' | 'cd') => {
    if (type === 'en') {
      onUpdate(ENGLISH_SAMPLE_DATA);
    } else if (type === 'bn') {
      onUpdate(BANGLA_SAMPLE_DATA);
    } else if (type === 'ffh') {
      onUpdate(FOOD_FOR_HEALTH_SAMPLE_DATA);
    } else if (type === 'cd') {
      onUpdate(CREATIVE_DECORE_SAMPLE_DATA);
    }
  };

  const handleExportJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `${data.company.name || 'Company'}_Appointment_Template.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.company && parsed.employee) {
            onUpdate(parsed);
          } else {
            alert('Invalid configuration file structure.');
          }
        } catch (err) {
          alert('Failed to parse JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <header className="no-print shrink-0 h-16 bg-slate-950 border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between z-40 w-full">
      
      {/* Brand Logo & Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-white text-base sm:text-lg tracking-tight">LetterCraft</h1>
            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full">
              Pro Builder
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden md:block">
            Appointment Letter Generator for Employers & HR Teams
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        {/* Sample Data Quick Loader Dropdown */}
        <div className="relative group">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-medium transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Demo Sample</span>
          </button>
          <div className="absolute right-0 top-full mt-1 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 hidden group-hover:block z-50">
            <button
              onClick={() => loadSampleData('en')}
              className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center justify-between transition"
            >
              <span>English Corporate</span>
              <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-mono">EN</span>
            </button>
            <button
              onClick={() => loadSampleData('bn')}
              className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center justify-between transition mt-1"
            >
              <span>বাংলা ডেমো টেমপ্লেট</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono">BN</span>
            </button>
            <button
              onClick={() => loadSampleData('ffh')}
              className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center justify-between transition mt-1"
            >
              <span>Food For Health</span>
              <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded font-mono">FFH</span>
            </button>
            <button
              onClick={() => loadSampleData('cd')}
              className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center justify-between transition mt-1"
            >
              <span>Creative Decore</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-mono">CD</span>
            </button>
          </div>
        </div>

        {/* JSON Export/Import Backup */}
        <button
          onClick={handleExportJson}
          className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-medium transition flex items-center gap-1.5 cursor-pointer"
          title="Export Template Data JSON"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Export</span>
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-medium transition flex items-center gap-1.5 cursor-pointer"
          title="Import Template Data JSON"
        >
          <Upload className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Import</span>
        </button>
        <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImportJson} />

        {/* Language Toggle Badge */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs text-slate-300">
          <Globe2 className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
          <span className="font-mono text-[11px] font-bold text-blue-400 uppercase pr-1.5">
            {data.style.language}
          </span>
        </div>

        {/* Reset */}
        <button
          onClick={onReset}
          className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-red-400 text-xs font-medium transition flex items-center gap-1.5 cursor-pointer"
          title="Reset All Data"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">Clear</span>
        </button>
      </div>
    </header>
  );
};
