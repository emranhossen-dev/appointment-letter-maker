import type { EmployeeInfo, EmploymentType } from '../../types/appointment';
import { User, Briefcase, Calendar, MapPin, BadgeCheck } from 'lucide-react';

interface EmployeeFormProps {
  employee: EmployeeInfo;
  onChange: (updated: EmployeeInfo) => void;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onChange }) => {
  const handleChange = (field: keyof EmployeeInfo, value: string) => {
    onChange({ ...employee, [field]: value });
  };

  const employmentTypes: EmploymentType[] = [
    'Full-Time',
    'Part-Time',
    'Contract',
    'Internship',
    'ফুল-টাইম',
    'পার্ট-টাইম',
    'চুক্তিভিত্তিক',
    'ইন্টার্নশিপ',
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <User className="w-5 h-5 text-blue-500" />
        <h3 className="font-semibold text-slate-200 text-base">Employee & Job Details</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Employee Full Name *</label>
          <input
            type="text"
            value={employee.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="e.g. Tanvir Ahmed / মোঃ শরিফুল ইসলাম"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Employee ID */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
            <BadgeCheck className="w-3.5 h-3.5 text-slate-500" /> Employee ID / Ref Code
          </label>
          <input
            type="text"
            value={employee.employeeId}
            onChange={(e) => handleChange('employeeId', e.target.value)}
            placeholder="e.g. EMP-2026-084"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Address */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-slate-400 mb-1">Residential Address</label>
          <input
            type="text"
            value={employee.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="e.g. House #45, Road #10, Sector #4, Uttara, Dhaka"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Employee Email</label>
          <input
            type="email"
            value={employee.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="employee@example.com"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Phone Number</label>
          <input
            type="text"
            value={employee.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+880 1712-345678"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* Position Details */}
      <div className="pt-4 border-t border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-purple-400" />
          <h4 className="font-semibold text-slate-300 text-xs uppercase tracking-wider">Position & Designation</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Job Designation / Title *</label>
            <input
              type="text"
              value={employee.designation}
              onChange={(e) => handleChange('designation', e.target.value)}
              placeholder="e.g. Senior Full Stack Software Engineer"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Department</label>
            <input
              type="text"
              value={employee.department}
              onChange={(e) => handleChange('department', e.target.value)}
              placeholder="e.g. Engineering & Technology"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" /> Work Location
            </label>
            <input
              type="text"
              value={employee.workLocation}
              onChange={(e) => handleChange('workLocation', e.target.value)}
              placeholder="e.g. Dhaka Office / Remote"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Employment Type</label>
            <select
              value={employee.employmentType}
              onChange={(e) => handleChange('employmentType', e.target.value as EmploymentType)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
            >
              {employmentTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Dates & Terms */}
      <div className="pt-4 border-t border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <h4 className="font-semibold text-slate-300 text-xs uppercase tracking-wider">Important Dates & Periods</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Letter Issue Date</label>
            <input
              type="date"
              value={employee.issueDate}
              onChange={(e) => handleChange('issueDate', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Joining Date *</label>
            <input
              type="date"
              value={employee.joiningDate}
              onChange={(e) => handleChange('joiningDate', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Probation Period</label>
            <input
              type="text"
              value={employee.probationPeriod}
              onChange={(e) => handleChange('probationPeriod', e.target.value)}
              placeholder="e.g. 6 Months / ৬ মাস"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Notice Period</label>
            <input
              type="text"
              value={employee.noticePeriod}
              onChange={(e) => handleChange('noticePeriod', e.target.value)}
              placeholder="e.g. 30 Days / ৩০ দিন"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
