import type { StepProps } from '../../types';
import { FieldGroup, TextArea, RadioGroup } from '../FormFields';

const DEMO_URL = 'https://kingsololevitated.netlify.app';

const CONFIRM_OPTIONS = [
  'Yes, I approve \u2014 let\u2019s move forward',
  'Mostly good, but I have some changes (see below)',
  'I need significant changes before I can approve',
];

export default function StepDemoReview({ data, onChange, errors, onAutoAdvance }: StepProps) {
  if (!data.demoLink) {
    onChange({ demoLink: DEMO_URL });
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Phase 1 demo review</h2>
      <p className="text-sm text-gray-500 mb-6">
        We've completed the initial design demo. Please review it and let us know if you're happy to proceed.
      </p>

      <div className="mb-6 p-4 bg-accent/5 border border-accent/15 rounded-xl">
        <p className="text-sm text-gray-700 mb-3">
          Your demo is ready for review:
        </p>
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-all shadow-sm cursor-pointer"
        >
          Open demo site
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5-4.5h6m0 0v6m0-6L9.75 14.25" />
          </svg>
        </a>
        <p className="text-xs text-gray-400 mt-2">{DEMO_URL}</p>
      </div>

      <FieldGroup label="Do you approve this demo?" required error={errors.demoConfirmed}>
        <RadioGroup
          name="demoConfirmed"
          options={CONFIRM_OPTIONS}
          value={data.demoConfirmed}
          onChange={(v) => onChange({ demoConfirmed: v })}
          layout="stack"
          onAutoAdvance={onAutoAdvance}
        />
      </FieldGroup>

      {data.demoConfirmed && data.demoConfirmed !== 'Yes, I approve \u2014 let\u2019s move forward' && (
        <FieldGroup label="What changes would you like?" helpText="Be as specific as you can \u2014 this helps us get it right faster.">
          <TextArea
            value={data.demoFeedback}
            onChange={(v) => onChange({ demoFeedback: v })}
            rows={3}
            placeholder="e.g., change the header color, move the contact form higher, update the hero text..."
          />
        </FieldGroup>
      )}
    </div>
  );
}
