import type { AppointmentLetterData } from '../../types/appointment';
import { Type, MessageSquare, Quote } from 'lucide-react';

interface LetterTextFormProps {
  data: AppointmentLetterData;
  onChange: (updated: AppointmentLetterData) => void;
}

export const LetterTextForm: React.FC<LetterTextFormProps> = ({ data, onChange }) => {
  const isBn = data.style.language === 'bn';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <Type className="w-5 h-5 text-blue-500" />
        <h3 className="font-semibold text-slate-200 text-base">Letter Subject, Greetings & Body Text</h3>
      </div>

      {/* Subject Line */}
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Subject Line (বিষয়)
        </label>
        <input
          type="text"
          value={data.customSubject || ''}
          onChange={(e) => onChange({ ...data, customSubject: e.target.value })}
          placeholder={isBn ? 'নিয়োগপত্র প্রদান প্রসঙ্গে।' : 'LETTER OF APPOINTMENT FOR THE POSITION OF...'}
          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-100 focus:outline-none focus:border-blue-500 transition"
        />
      </div>

      {/* Salutation Greeting */}
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1">
          <MessageSquare className="w-3.5 h-3.5 text-amber-400" /> Greeting & Salutation (সম্বোধন)
        </label>
        <input
          type="text"
          value={data.customGreeting || ''}
          onChange={(e) => onChange({ ...data, customGreeting: e.target.value })}
          placeholder={isBn ? 'প্রিয় মোঃ শরিফুল ইসলাম,' : 'Dear Tanvir Ahmed,'}
          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition"
        />
      </div>

      {/* Opening Paragraph Body */}
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Opening Paragraph (প্রারম্ভিক বিবরণী)
        </label>
        <textarea
          rows={4}
          value={data.customOpeningParagraph || ''}
          onChange={(e) => onChange({ ...data, customOpeningParagraph: e.target.value })}
          placeholder={
            isBn
              ? 'আমরা অত্যন্ত আনন্দের সাথে জানাচ্ছি যে, প্রগতি কনসালটিং ও টেকনোলজিস লিঃ-এ আপনাকে নিয়োগের সিদ্ধান্ত নেওয়া হয়েছে...'
              : 'We are pleased to offer you employment at Nexus Innovation Technologies Ltd for the position of...'
          }
          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 leading-relaxed focus:outline-none focus:border-blue-500 transition resize-y"
        />
      </div>

      {/* Closing Statement */}
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1">
          <Quote className="w-3.5 h-3.5 text-purple-400" /> Closing Statement / Welcome Note (উপসংহার)
        </label>
        <textarea
          rows={3}
          value={data.customClosing || ''}
          onChange={(e) => onChange({ ...data, customClosing: e.target.value })}
          placeholder="We look forward to welcoming you to the company and building great products together."
          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 leading-relaxed focus:outline-none focus:border-blue-500 transition resize-y"
        />
      </div>
    </div>
  );
};
