import type { TermsClause } from '../../types/appointment';
import { FileText, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface TermsFormProps {
  clauses: TermsClause[];
  onChange: (updated: TermsClause[]) => void;
}

export const TermsForm: React.FC<TermsFormProps> = ({ clauses, onChange }) => {
  const handleAddClause = () => {
    const newClause: TermsClause = {
      id: Date.now().toString(),
      title: `${clauses.length + 1}. New Policy Clause`,
      content: 'Write the agreement terms, company guidelines or responsibilities here...',
    };
    onChange([...clauses, newClause]);
  };

  const handleUpdateClause = (id: string, field: keyof TermsClause, value: string) => {
    const updated = clauses.map(c => c.id === id ? { ...c, [field]: value } : c);
    onChange(updated);
  };

  const handleRemoveClause = (id: string) => {
    onChange(clauses.filter(c => c.id !== id));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= clauses.length) return;

    const list = [...clauses];
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;
    onChange(list);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-500" />
          <h3 className="font-semibold text-slate-200 text-base">Terms, Conditions & Legal Clauses</h3>
        </div>

        <button
          type="button"
          onClick={handleAddClause}
          className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-1.5 rounded-lg transition shadow"
        >
          <Plus className="w-4 h-4" /> Add Custom Clause
        </button>
      </div>

      <div className="space-y-4">
        {clauses.map((clause, index) => (
          <div
            key={clause.id}
            className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3 relative group"
          >
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={clause.title}
                onChange={(e) => handleUpdateClause(clause.id, 'title', e.target.value)}
                placeholder="Clause Title (e.g. 1. Confidentiality)"
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-100 focus:outline-none focus:border-blue-500"
              />

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleMove(index, 'up')}
                  disabled={index === 0}
                  className="p-1.5 text-slate-400 hover:text-slate-200 disabled:opacity-30 rounded hover:bg-slate-800"
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(index, 'down')}
                  disabled={index === clauses.length - 1}
                  className="p-1.5 text-slate-400 hover:text-slate-200 disabled:opacity-30 rounded hover:bg-slate-800"
                  title="Move Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveClause(clause.id)}
                  className="p-1.5 text-slate-400 hover:text-red-400 rounded hover:bg-slate-800"
                  title="Delete Clause"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <textarea
              rows={3}
              value={clause.content}
              onChange={(e) => handleUpdateClause(clause.id, 'content', e.target.value)}
              placeholder="Detailed terms and obligations..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 leading-relaxed focus:outline-none focus:border-blue-500 resize-y"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
