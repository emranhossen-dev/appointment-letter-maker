import type { ChangeEvent } from 'react';
import type { CompanyInfo } from '../../types/appointment';
import { Building2, Upload, Trash2, UserCheck, Phone, Mail, Globe, MapPin } from 'lucide-react';

interface CompanyFormProps {
  company: CompanyInfo;
  onChange: (updated: CompanyInfo) => void;
}

export const CompanyForm: React.FC<CompanyFormProps> = ({ company, onChange }) => {
  const handleChange = (field: keyof CompanyInfo, value: string) => {
    onChange({ ...company, [field]: value });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, field: 'logoUrl' | 'signatureUrl' | 'stampUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...company, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <Building2 className="w-5 h-5 text-blue-500" />
        <h3 className="font-semibold text-slate-200 text-base">Company & Branding Details</h3>
      </div>

      {/* Logo & Signature Uploads */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Company Logo Upload */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Company Logo</label>
          {company.logoUrl ? (
            <div className="relative group bg-white/5 p-3 rounded-lg flex items-center justify-between border border-slate-700">
              <img src={company.logoUrl} alt="Company Logo" className="h-12 object-contain max-w-[140px]" />
              <button
                type="button"
                onClick={() => handleChange('logoUrl', '')}
                className="p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition"
                title="Remove Logo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl cursor-pointer bg-slate-900/40 hover:bg-slate-800/50 transition group">
              <Upload className="w-6 h-6 text-slate-500 group-hover:text-blue-400 mb-1" />
              <span className="text-xs text-slate-400 group-hover:text-slate-200">Upload Company Logo</span>
              <span className="text-[10px] text-slate-500">PNG, JPG, SVG (Max 2MB)</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'logoUrl')} />
            </label>
          )}
        </div>

        {/* Signature Upload */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Authorized Signature Image</label>
          {company.signatureUrl ? (
            <div className="relative group bg-white p-3 rounded-lg flex items-center justify-between border border-slate-700">
              <img src={company.signatureUrl} alt="Signature" className="h-12 object-contain max-w-[140px]" />
              <button
                type="button"
                onClick={() => handleChange('signatureUrl', '')}
                className="p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition"
                title="Remove Signature"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl cursor-pointer bg-slate-900/40 hover:bg-slate-800/50 transition group">
              <Upload className="w-6 h-6 text-slate-500 group-hover:text-blue-400 mb-1" />
              <span className="text-xs text-slate-400 group-hover:text-slate-200">Upload Signature Image</span>
              <span className="text-[10px] text-slate-500">Transparent PNG recommended</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'signatureUrl')} />
            </label>
          )}
        </div>
      </div>

      {/* Main Company Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Company Name *</label>
          <input
            type="text"
            value={company.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="e.g. Acme Tech Solutions Ltd."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Company Tagline / Slogan</label>
          <input
            type="text"
            value={company.tagline || ''}
            onChange={(e) => handleChange('tagline', e.target.value)}
            placeholder="e.g. Empowering Enterprise Success"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-500" /> Street Address & Building
          </label>
          <input
            type="text"
            value={company.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="e.g. Level 12, Innovation Tower, Gulshan-2"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">City & Postal Code</label>
          <input
            type="text"
            value={company.city}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder="e.g. Dhaka - 1212"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Country</label>
          <input
            type="text"
            value={company.country}
            onChange={(e) => handleChange('country', e.target.value)}
            placeholder="e.g. Bangladesh"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-slate-500" /> Phone Number
          </label>
          <input
            type="text"
            value={company.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+880 2-9881234"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-slate-500" /> Company HR Email
          </label>
          <input
            type="email"
            value={company.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="hr@company.com"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-slate-500" /> Website URL
          </label>
          <input
            type="text"
            value={company.website}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="www.company.com"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Company Tax ID / BIN / Reg No</label>
          <input
            type="text"
            value={company.taxId || ''}
            onChange={(e) => handleChange('taxId', e.target.value)}
            placeholder="e.g. BIN: 002948192-01"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* Signatory Info */}
      <div className="pt-4 border-t border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <h4 className="font-semibold text-slate-300 text-xs uppercase tracking-wider">Authorized Signatory Info</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Signatory Full Name</label>
            <input
              type="text"
              value={company.signatoryName}
              onChange={(e) => handleChange('signatoryName', e.target.value)}
              placeholder="e.g. Rafiqul Islam"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Signatory Title / Designation</label>
            <input
              type="text"
              value={company.signatoryTitle}
              onChange={(e) => handleChange('signatoryTitle', e.target.value)}
              placeholder="e.g. Head of Human Resources / Managing Director"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
