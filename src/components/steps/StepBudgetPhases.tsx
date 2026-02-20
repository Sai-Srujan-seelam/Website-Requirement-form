import type { StepProps } from '../../types';
import { FieldGroup, TextArea, RadioGroup } from '../FormFields';

const BUDGET_OPTIONS = [
  'Under $500',
  '$500 – $1,000',
  '$1,000 – $2,000',
  '$2,000 – $3,000',
  '$3,000+',
];

const PAYMENT_OPTIONS = [
  'Pay per phase',
  'Full upfront',
  'Payment plan (installments)',
];

export default function StepBudgetPhases({ data, onChange, errors, onAutoAdvance }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Budget and project phases</h2>
      <p className="text-sm text-gray-500 mb-6">
        Your project is broken into 3 phases. You can choose to do them all or stop after any phase.
      </p>

      {/* Phase breakdown */}
      <div className="mb-6 space-y-3">
        <div className="p-4 bg-accent/5 border border-accent/15 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">1</span>
            <h3 className="text-sm font-semibold text-gray-800">Website Design</h3>
          </div>
          <p className="text-sm text-gray-500 ml-8">
            Creating the look, layout, and user experience of your site. Includes the demo you just reviewed, plus any revision rounds.
          </p>
        </div>

        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-full bg-gray-400 text-white text-xs font-bold flex items-center justify-center">2</span>
            <h3 className="text-sm font-semibold text-gray-800">SEO & Marketing Setup</h3>
          </div>
          <p className="text-sm text-gray-500 ml-8">
            Search Engine Optimization (SEO) makes your site show up on Google when people search for your services.
            This phase includes keyword research, page optimization, and setting up analytics so you can track visitors and leads.
          </p>
        </div>

        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-full bg-gray-400 text-white text-xs font-bold flex items-center justify-center">3</span>
            <h3 className="text-sm font-semibold text-gray-800">Deployment & Go Live</h3>
          </div>
          <p className="text-sm text-gray-500 ml-8">
            Connecting your domain, setting up hosting, making the site live, and ensuring everything runs smoothly.
            After this, your website is public and ready for visitors.
          </p>
        </div>

        <p className="text-xs text-gray-400 ml-1">
          Additional phases (ongoing maintenance, content updates, ad campaigns) can be discussed separately after launch.
        </p>
      </div>

      <FieldGroup label="Budget for Phase 1 (Website Design)" required error={errors.phase1Budget}>
        <RadioGroup
          name="phase1Budget"
          options={BUDGET_OPTIONS}
          value={data.phase1Budget}
          onChange={(v) => onChange({ phase1Budget: v })}
          layout="pills"
          onAutoAdvance={onAutoAdvance}
        />
      </FieldGroup>

      <FieldGroup label="Budget for Phase 2 (SEO & Marketing)" helpText="Optional — you can decide later.">
        <RadioGroup
          name="phase2Budget"
          options={BUDGET_OPTIONS}
          value={data.phase2Budget}
          onChange={(v) => onChange({ phase2Budget: v })}
          layout="pills"
        />
      </FieldGroup>

      <FieldGroup label="Budget for Phase 3 (Deployment)" helpText="Optional — you can decide later.">
        <RadioGroup
          name="phase3Budget"
          options={BUDGET_OPTIONS}
          value={data.phase3Budget}
          onChange={(v) => onChange({ phase3Budget: v })}
          layout="pills"
        />
      </FieldGroup>

      <FieldGroup label="Payment preference" required error={errors.paymentPreference}>
        <RadioGroup
          name="paymentPreference"
          options={PAYMENT_OPTIONS}
          value={data.paymentPreference}
          onChange={(v) => onChange({ paymentPreference: v })}
          layout="pills"
          onAutoAdvance={onAutoAdvance}
        />
      </FieldGroup>

      <FieldGroup label="Anything else about your budget?" helpText="Optional">
        <TextArea
          value={data.budgetNotes}
          onChange={(v) => onChange({ budgetNotes: v })}
          rows={2}
          placeholder="Any constraints, questions, or preferences..."
        />
      </FieldGroup>
    </div>
  );
}
