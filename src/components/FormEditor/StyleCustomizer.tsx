import type { TemplateStyle, TemplateId } from '../../types/appointment';
import { Palette, Check } from 'lucide-react';

interface StyleCustomizerProps {
  style: TemplateStyle;
  onChange: (updated: TemplateStyle) => void;
  onLanguageChange: (lang: 'en' | 'bn') => void;
}

export const StyleCustomizer: React.FC<StyleCustomizerProps> = ({ style, onChange, onLanguageChange }) => {
  const templates: { id: TemplateId; name: string; desc: string; previewColor: string }[] = [
    { id: 'corporate', name: 'Corporate Modern', desc: 'Clean header accent band, structured data grid', previewColor: '#1d4ed8' },
    { id: 'classic', name: 'Classic Formal', desc: 'Traditional double border frame, elegant typography', previewColor: '#1e3a8a' },
    { id: 'startup', name: 'Startup Minimal', desc: 'Geometric minimalist tech aesthetic with bold fonts', previewColor: '#0f172a' },
    { id: 'executive', name: 'Executive Luxury', desc: 'Dual accent bar, watermark & pill badge metadata', previewColor: '#047857' },
    { id: 'food_for_health', name: 'Food For Health', desc: 'Official Food For Health template with green banner footer', previewColor: '#265217' },
    { id: 'creative_decore', name: 'Creative Decore', desc: 'Handcrafted embroidery & stitch aesthetic for artisans', previewColor: '#854d0e' },
  ];

  const presetColors = [
    '#1d4ed8', // Royal Blue
    '#047857', // Forest Emerald
    '#7c3aed', // Deep Purple
    '#b91c1c', // Crimson Red
    '#0f172a', // Slate Dark
    '#d97706', // Warm Amber
    '#0284c7', // Cyan Blue
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-amber-400" />
          <h3 className="font-semibold text-slate-200 text-base">Design Template & Styling</h3>
        </div>

        {/* Language Switcher Button */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
          <button
            type="button"
            onClick={() => onLanguageChange('en')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
              style.language === 'en' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange('bn')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
              style.language === 'bn' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            বাংলা (Bengali)
          </button>
        </div>
      </div>

      {/* Template Chooser Cards */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Select Letter Template</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {templates.map((tmpl) => (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => onChange({ ...style, templateId: tmpl.id })}
              className={`p-3.5 rounded-xl border text-left transition flex items-start justify-between relative ${
                style.templateId === tmpl.id
                  ? 'bg-slate-900 border-blue-500 ring-2 ring-blue-500/20'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: tmpl.previewColor }} />
                  <span className="font-bold text-sm text-slate-200">{tmpl.name}</span>
                </div>
                <p className="text-xs text-slate-400 leading-snug">{tmpl.desc}</p>
              </div>
              {style.templateId === tmpl.id && (
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white shrink-0 ml-2">
                  <Check className="w-3 h-3" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Brand Color Picker */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Primary Brand Color</label>
        <div className="flex items-center gap-3 flex-wrap bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          {presetColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onChange({ ...style, primaryColor: color })}
              className="w-8 h-8 rounded-full flex items-center justify-center transition transform hover:scale-110 shadow-md"
              style={{ backgroundColor: color }}
            >
              {style.primaryColor === color && <Check className="w-4 h-4 text-white" />}
            </button>
          ))}

          {/* Custom Color Input */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-slate-400 font-mono">Custom:</span>
            <input
              type="color"
              value={style.primaryColor}
              onChange={(e) => onChange({ ...style, primaryColor: e.target.value })}
              className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
            />
          </div>
        </div>
      </div>

      {/* Typography & Watermark Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Font Style</label>
          <select
            value={style.fontFamily}
            onChange={(e) => onChange({ ...style, fontFamily: e.target.value as any })}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
          >
            <option value="sans">Modern Sans (Inter)</option>
            <option value="serif">Classic Serif (Merriweather)</option>
            <option value="bangla">Bengali Font (Hind Siliguri / Noto)</option>
          </select>
        </div>

        <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <div>
            <span className="font-medium text-slate-200 text-xs block">Background Watermark</span>
            <span className="text-[10px] text-slate-500">Displays faint company watermark</span>
          </div>
          <button
            type="button"
            onClick={() => onChange({ ...style, showWatermark: !style.showWatermark })}
            className={`w-11 h-6 rounded-full transition relative p-0.5 ${
              style.showWatermark ? 'bg-blue-600' : 'bg-slate-700'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition transform ${
              style.showWatermark ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );
};
