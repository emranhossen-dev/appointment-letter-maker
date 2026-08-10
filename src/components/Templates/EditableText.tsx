import React from 'react';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  multiline?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  className = '',
  style = {},
  placeholder = 'Click to edit...',
  multiline = false,
}) => {
  const handleBlur = (e: React.FocusEvent<HTMLSpanElement>) => {
    const text = e.currentTarget.innerText.trim();
    onChange(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  return (
    <span
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`hover:bg-blue-50/80 focus:bg-blue-100/90 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-0.5 transition cursor-text hover:border-b hover:border-blue-400 border-dashed ${className}`}
      style={style}
      title="Click directly to edit text on letter"
    >
      {value || placeholder}
    </span>
  );
};
