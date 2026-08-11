import { useState, useEffect } from 'react';
import type { AppointmentLetterData } from './types/appointment';
import { ENGLISH_SAMPLE_DATA, BANGLA_SAMPLE_DATA } from './constants/initialData';
import { Header } from './components/Header';
import { CompanyForm } from './components/FormEditor/CompanyForm';
import { EmployeeForm } from './components/FormEditor/EmployeeForm';
import { LetterTextForm } from './components/FormEditor/LetterTextForm';
import { CompensationForm } from './components/FormEditor/CompensationForm';
import { TermsForm } from './components/FormEditor/TermsForm';
import { StyleCustomizer } from './components/FormEditor/StyleCustomizer';
import { CompanyHubForm } from './components/FormEditor/CompanyHubForm';
import { LetterPreview } from './components/Preview/LetterPreview';
import { Building2, User, Type, DollarSign, FileText, Palette, Briefcase } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'lettercraft_appointment_data_v1';

export function App() {
  const [data, setData] = useState<AppointmentLetterData>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return ENGLISH_SAMPLE_DATA;
      }
    }
    return ENGLISH_SAMPLE_DATA;
  });

  const [activeTab, setActiveTab] = useState<'company' | 'employee' | 'letterText' | 'compensation' | 'terms' | 'style' | 'companyHub'>('company');

  // Auto save to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const handleLanguageToggle = (lang: 'en' | 'bn') => {
    if (lang === 'bn') {
      setData({
        ...BANGLA_SAMPLE_DATA,
        company: {
          ...BANGLA_SAMPLE_DATA.company,
          name: data.company.name || BANGLA_SAMPLE_DATA.company.name,
          logoUrl: data.company.logoUrl,
          signatureUrl: data.company.signatureUrl,
        },
        employee: {
          ...BANGLA_SAMPLE_DATA.employee,
          name: data.employee.name || BANGLA_SAMPLE_DATA.employee.name,
        },
      });
    } else {
      setData({
        ...ENGLISH_SAMPLE_DATA,
        company: {
          ...ENGLISH_SAMPLE_DATA.company,
          name: data.company.name || ENGLISH_SAMPLE_DATA.company.name,
          logoUrl: data.company.logoUrl,
          signatureUrl: data.company.signatureUrl,
        },
        employee: {
          ...ENGLISH_SAMPLE_DATA.employee,
          name: data.employee.name || ENGLISH_SAMPLE_DATA.employee.name,
        },
      });
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all letter data to default?')) {
      setData(ENGLISH_SAMPLE_DATA);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  const tabs = [
    { id: 'companyHub', label: 'Company Hub', icon: Briefcase },
    { id: 'company', label: 'Company Info', icon: Building2 },
    { id: 'employee', label: 'Employee Info', icon: User },
    { id: 'letterText', label: 'Letter Text', icon: Type },
    { id: 'compensation', label: 'Compensation', icon: DollarSign },
    { id: 'terms', label: 'Terms & Clauses', icon: FileText },
    { id: 'style', label: 'Templates', icon: Palette },
  ];

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 overflow-hidden font-sans print:h-auto print:w-full print:bg-white print:overflow-visible print:block">
      {/* Top Fixed Header Navbar */}
      <Header data={data} onUpdate={setData} onReset={handleReset} />

      {/* Main Split Screen Container */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 print:block print:h-auto print:overflow-visible">
        
        {/* Left Side: Form Controls Sidebar Panel */}
        <div className="no-print w-full md:w-[480px] lg:w-[520px] xl:w-[560px] shrink-0 flex flex-col border-r border-slate-800 bg-slate-950 h-full overflow-hidden">
          
          {/* Editor Sub-Header Navigation Tabs */}
          <div className="shrink-0 bg-slate-950 border-b border-slate-800 px-3 pt-2 flex items-center gap-1 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-t-xl transition border-b-2 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-blue-400 border-blue-500 shadow-inner'
                      : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 no-scrollbar">
            {activeTab === 'companyHub' && (
              <CompanyHubForm data={data} onChange={setData} />
            )}

            {activeTab === 'company' && (
              <CompanyForm company={data.company} onChange={(updated) => setData({ ...data, company: updated })} />
            )}

            {activeTab === 'employee' && (
              <EmployeeForm employee={data.employee} onChange={(updated) => setData({ ...data, employee: updated })} />
            )}

            {activeTab === 'letterText' && (
              <LetterTextForm data={data} onChange={setData} />
            )}

            {activeTab === 'compensation' && (
              <CompensationForm
                compensation={data.compensation}
                onChange={(updated) => setData({ ...data, compensation: updated })}
              />
            )}

            {activeTab === 'terms' && (
              <TermsForm clauses={data.clauses} onChange={(updated) => setData({ ...data, clauses: updated })} />
            )}

            {activeTab === 'style' && (
              <StyleCustomizer
                style={data.style}
                onChange={(updated) => setData({ ...data, style: updated })}
                onLanguageChange={handleLanguageToggle}
              />
            )}
          </div>
        </div>

        {/* Right Side: A4 Live Letter Preview Panel */}
        <div className="flex-1 h-full overflow-hidden flex flex-col bg-slate-900/60 print:block print:bg-white print:h-auto print:overflow-visible">
          <LetterPreview data={data} onUpdate={setData} />
        </div>
      </div>
    </div>
  );
}

export default App;
