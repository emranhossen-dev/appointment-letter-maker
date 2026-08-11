import React, { useState, useEffect } from 'react';
import type { AppointmentLetterData } from '../../types/appointment';
import { FOOD_FOR_HEALTH_SAMPLE_DATA, CREATIVE_DECORE_SAMPLE_DATA, ENGLISH_SAMPLE_DATA } from '../../constants/initialData';
import { BatchGenerator } from './BatchGenerator';
import { Building, Check, Plus, Trash2, ShieldCheck, Scissors, UserCheck } from 'lucide-react';

interface CompanyHubFormProps {
  data: AppointmentLetterData;
  onChange: (updated: AppointmentLetterData) => void;
}

interface SavedCompanyPreset {
  id: string;
  name: string;
  data: AppointmentLetterData;
}

const PRESETS_STORAGE_KEY = 'lettercraft_saved_company_presets_v1';

export const CompanyHubForm: React.FC<CompanyHubFormProps> = ({ data, onChange }) => {
  const [savedPresets, setSavedPresets] = useState<SavedCompanyPreset[]>(() => {
    try {
      const saved = localStorage.getItem(PRESETS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [newPresetName, setNewPresetName] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(savedPresets));
    } catch (e) {
      console.error('Failed to save presets:', e);
    }
  }, [savedPresets]);

  const activeTemplateId = data.style.templateId;

  const handleSelectCreativeDecore = () => {
    onChange({
      ...CREATIVE_DECORE_SAMPLE_DATA,
      employee: {
        ...CREATIVE_DECORE_SAMPLE_DATA.employee,
        name: data.employee.name || CREATIVE_DECORE_SAMPLE_DATA.employee.name,
        designation: data.employee.designation || CREATIVE_DECORE_SAMPLE_DATA.employee.designation,
      },
    });
  };

  const handleSelectFoodForHealth = () => {
    onChange({
      ...FOOD_FOR_HEALTH_SAMPLE_DATA,
      employee: {
        ...FOOD_FOR_HEALTH_SAMPLE_DATA.employee,
        name: data.employee.name || FOOD_FOR_HEALTH_SAMPLE_DATA.employee.name,
        designation: data.employee.designation || FOOD_FOR_HEALTH_SAMPLE_DATA.employee.designation,
      },
    });
  };

  const handleSelectCorporateTech = () => {
    onChange({
      ...ENGLISH_SAMPLE_DATA,
      employee: {
        ...ENGLISH_SAMPLE_DATA.employee,
        name: data.employee.name || ENGLISH_SAMPLE_DATA.employee.name,
      },
    });
  };

  const handleSaveCurrentAsPreset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPresetName.trim()) return;

    const newPreset: SavedCompanyPreset = {
      id: Date.now().toString(),
      name: newPresetName.trim(),
      data: JSON.parse(JSON.stringify(data)),
    };

    setSavedPresets([...savedPresets, newPreset]);
    setNewPresetName('');
  };

  const handleDeletePreset = (id: string) => {
    setSavedPresets(savedPresets.filter(p => p.id !== id));
  };

  const handleLoadPreset = (preset: SavedCompanyPreset) => {
    onChange(preset.data);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building className="w-5 h-5 text-emerald-400" />
          <h3 className="font-semibold text-slate-200 text-base">Company Presets & Templates Hub</h3>
        </div>
        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded-full font-mono uppercase">
          Company System
        </span>
      </div>

      {/* Preset Company Selector */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          1. Select Company Template Layout
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Creative Decore Hand Stitch Card */}
          <button
            type="button"
            onClick={handleSelectCreativeDecore}
            className={`p-4 rounded-xl border text-left transition relative flex flex-col justify-between ${
              activeTemplateId === 'creative_decore'
                ? 'bg-slate-900 border-amber-500 ring-2 ring-amber-500/20'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-700 border border-amber-400" />
                  <span className="font-bold text-sm text-slate-100">Creative Decore</span>
                </div>
                {activeTemplateId === 'creative_decore' && (
                  <Check className="w-4 h-4 text-amber-400" />
                )}
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                Handcrafted stitch aesthetic for textile/craft artisans with embroidery border.
              </p>
            </div>
            <span className="mt-3 text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded self-start border border-amber-500/20 flex items-center gap-1">
              <Scissors className="w-3 h-3" /> Hand Stitch
            </span>
          </button>

          {/* Food For Health Card */}
          <button
            type="button"
            onClick={handleSelectFoodForHealth}
            className={`p-4 rounded-xl border text-left transition relative flex flex-col justify-between ${
              activeTemplateId === 'food_for_health'
                ? 'bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/20'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-700 border border-emerald-400" />
                  <span className="font-bold text-sm text-slate-100">Food For Health</span>
                </div>
                {activeTemplateId === 'food_for_health' && (
                  <Check className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                Official appointment letter with header logo, terms block & dark green footer banner.
              </p>
            </div>
            <span className="mt-3 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded self-start border border-emerald-500/20">
              Verified Layout
            </span>
          </button>

          {/* Standard Corporate Tech Card */}
          <button
            type="button"
            onClick={handleSelectCorporateTech}
            className={`p-4 rounded-xl border text-left transition relative flex flex-col justify-between ${
              activeTemplateId === 'corporate'
                ? 'bg-slate-900 border-blue-500 ring-2 ring-blue-500/20'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-blue-600 border border-blue-400" />
                  <span className="font-bold text-sm text-slate-100">Nexus Innovation Tech</span>
                </div>
                {activeTemplateId === 'corporate' && (
                  <Check className="w-4 h-4 text-blue-400" />
                )}
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                Modern corporate style with top color bar, compensation table & clauses.
              </p>
            </div>
            <span className="mt-3 text-[10px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded self-start border border-blue-500/20">
              Default Template
            </span>
          </button>
        </div>
      </div>

      {/* Embedded Multi-Employee Batch Generator */}
      <BatchGenerator data={data} onChange={onChange} />

      {/* Quick Employee Input Section */}
      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            2. Quick Employee Details (For Active Company Template)
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Employee Name</label>
            <input
              type="text"
              value={data.employee.name}
              onChange={(e) => onChange({ ...data, employee: { ...data.employee, name: e.target.value } })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
              placeholder="e.g. Tasfia Tanjeen"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Position / Role</label>
            <input
              type="text"
              value={data.employee.designation}
              onChange={(e) => onChange({ ...data, employee: { ...data.employee, designation: e.target.value } })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
              placeholder="e.g. Content Writer"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Department</label>
            <input
              type="text"
              value={data.employee.department}
              onChange={(e) => onChange({ ...data, employee: { ...data.employee, department: e.target.value } })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
              placeholder="e.g. Digital Marketing"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Salary Amount (Monthly)</label>
            <input
              type="number"
              value={data.compensation.baseSalary}
              onChange={(e) => onChange({ ...data, compensation: { ...data.compensation, baseSalary: Number(e.target.value) || 0 } })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
              placeholder="e.g. 3000"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Issue Date</label>
            <input
              type="date"
              value={data.employee.issueDate}
              onChange={(e) => onChange({ ...data, employee: { ...data.employee, issueDate: e.target.value } })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Joining Date</label>
            <input
              type="date"
              value={data.employee.joiningDate}
              onChange={(e) => onChange({ ...data, employee: { ...data.employee, joiningDate: e.target.value } })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Save & Manage Custom Presets */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            3. Save & Load Custom Company Presets
          </label>
          <span className="text-[11px] text-slate-400">{savedPresets.length} saved</span>
        </div>

        {/* Save Current State Form */}
        <form onSubmit={handleSaveCurrentAsPreset} className="flex gap-2">
          <input
            type="text"
            value={newPresetName}
            onChange={(e) => setNewPresetName(e.target.value)}
            placeholder="Preset Name (e.g. ABC Corp Template)..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={!newPresetName.trim()}
            className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 transition shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Save Preset</span>
          </button>
        </form>

        {/* Saved Presets List */}
        {savedPresets.length > 0 && (
          <div className="space-y-2 pt-1">
            {savedPresets.map((preset) => (
              <div
                key={preset.id}
                className="flex items-center justify-between bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl text-xs"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="font-semibold text-slate-200">{preset.name}</p>
                    <p className="text-[10px] text-slate-400">{preset.data.company.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleLoadPreset(preset)}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-medium transition cursor-pointer"
                  >
                    Apply
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeletePreset(preset.id)}
                    className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-slate-800 transition cursor-pointer"
                    title="Delete Preset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
