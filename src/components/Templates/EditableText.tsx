import React, { useRef, useEffect } from 'react';

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
  const spanRef = useRef<HTMLSpanElement>(null);

  // Synchronize DOM text with React value prop when value changes
  useEffect(() => {
    if (spanRef.current && document.activeElement !== spanRef.current) {
      spanRef.current.innerText = value || '';
    }
  }, [value]);

  const handleInput = (e: React.FormEvent<HTMLSpanElement>) => {
    const text = e.currentTarget.innerText;
    onChange(text);
  };

  const handleBlur = (e: React.FocusEvent<HTMLSpanElement>) => {
    const text = e.currentTarget.innerText;
    onChange(text.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  return (
    <span
      ref={spanRef}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      data-placeholder={placeholder}
      className={`hover:bg-blue-50/80 focus:bg-blue-100/90 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-0.5 transition cursor-text hover:border-b hover:border-blue-400 border-dashed relative inline-block min-w-[1ch] ${className}`}
      style={style}
      title="Click directly to edit text on letter"
    >
      {value || ''}
    </span>
  );
};
