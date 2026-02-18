import { type ReactNode, useRef, useEffect } from 'react';

/* ------------------------------------------------------------------ */
/* Field wrapper                                                       */
/* ------------------------------------------------------------------ */

interface FieldGroupProps {
  label: string;
  required?: boolean;
  helpText?: string;
  error?: string;
  children: ReactNode;
}

export function FieldGroup({ label, required, helpText, error, children }: FieldGroupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [error]);

  return (
    <div ref={ref} className={`mb-6 ${error ? 'animate-shake' : ''}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {helpText && <p className="text-xs text-gray-400 mb-2 leading-relaxed">{helpText}</p>}
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-500 animate-fade-up">{error}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Text input                                                          */
/* ------------------------------------------------------------------ */

interface TextInputProps {
  value: string;
  onChange: (val: string) => void;
  type?: string;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export function TextInput({ value, onChange, type = 'text', placeholder, onKeyDown }: TextInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-150"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Textarea                                                            */
/* ------------------------------------------------------------------ */

interface TextAreaProps {
  value: string;
  onChange: (val: string) => void;
  rows?: number;
  placeholder?: string;
}

export function TextArea({ value, onChange, rows = 3, placeholder }: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-150 resize-y"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Radio: pills (compact), grid (2-col cards), or stack (full width)   */
/* ------------------------------------------------------------------ */

type RadioLayout = 'pills' | 'grid' | 'stack';

interface RadioGroupProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  name: string;
  layout?: RadioLayout;
  onAutoAdvance?: () => void;
}

export function RadioGroup({ options, value, onChange, name, layout = 'stack', onAutoAdvance }: RadioGroupProps) {
  const handleSelect = (opt: string) => {
    onChange(opt);
    if (onAutoAdvance) {
      setTimeout(onAutoAdvance, 350);
    }
  };

  if (layout === 'pills') {
    return (
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => handleSelect(opt)}
            className={`pill-option px-4 py-2 rounded-full border text-sm font-medium cursor-pointer transition-all duration-150 ${
              value === opt
                ? 'selected border-accent bg-accent text-white shadow-sm'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {opt}
          </button>
        ))}
        <input type="hidden" name={name} value={value} />
      </div>
    );
  }

  if (layout === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => handleSelect(opt)}
            className={`pill-option p-3 rounded-lg border text-left text-sm cursor-pointer transition-all duration-150 ${
              value === opt
                ? 'selected border-accent bg-accent-light text-accent font-medium shadow-sm'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {opt}
          </button>
        ))}
        <input type="hidden" name={name} value={value} />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => handleSelect(opt)}
          className={`pill-option w-full flex items-center gap-3 p-3 rounded-lg border text-left text-sm cursor-pointer transition-all duration-150 ${
            value === opt
              ? 'selected border-accent bg-accent-light text-accent font-medium'
              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
            value === opt ? 'border-accent' : 'border-gray-300'
          }`}>
            {value === opt && <span className="w-2 h-2 rounded-full bg-accent animate-check-pop" />}
          </span>
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Checkbox: pills (wrap) or grid (2-col)                              */
/* ------------------------------------------------------------------ */

type CheckboxLayout = 'pills' | 'grid' | 'stack';

interface CheckboxGroupProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  layout?: CheckboxLayout;
}

export function CheckboxGroup({ options, selected, onChange, layout = 'grid' }: CheckboxGroupProps) {
  const toggle = (opt: string) => {
    onChange(
      selected.includes(opt)
        ? selected.filter((s) => s !== opt)
        : [...selected, opt],
    );
  };

  if (layout === 'pills') {
    return (
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`pill-option px-4 py-2 rounded-full border text-sm font-medium cursor-pointer transition-all duration-150 ${
              selected.includes(opt)
                ? 'selected border-accent bg-accent text-white shadow-sm'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  }

  if (layout === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`pill-option p-3 rounded-lg border text-left text-sm cursor-pointer transition-all duration-150 flex items-center gap-2.5 ${
              selected.includes(opt)
                ? 'selected border-accent bg-accent-light text-accent font-medium'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className={`w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-all ${
              selected.includes(opt) ? 'border-accent bg-accent' : 'border-gray-300'
            }`}>
              {selected.includes(opt) && (
                <svg className="w-2.5 h-2.5 text-white animate-check-pop" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </span>
            {opt}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          className={`pill-option w-full flex items-center gap-3 p-3 rounded-lg border text-left text-sm cursor-pointer transition-all duration-150 ${
            selected.includes(opt)
              ? 'selected border-accent bg-accent-light text-accent font-medium'
              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className={`w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-all ${
            selected.includes(opt) ? 'border-accent bg-accent' : 'border-gray-300'
          }`}>
            {selected.includes(opt) && (
              <svg className="w-2.5 h-2.5 text-white animate-check-pop" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            )}
          </span>
          {opt}
        </button>
      ))}
    </div>
  );
}
