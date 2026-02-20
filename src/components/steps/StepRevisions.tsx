import type { StepProps } from '../../types';
import { FieldGroup, RadioGroup } from '../FormFields';

const REVISION_OPTIONS = [
  '1 – 2 rounds',
  '3 – 4 rounds',
  '5+ rounds',
];

const TIMELINE_OPTIONS = [
  'ASAP (rush)',
  '1 – 2 weeks',
  '2 – 4 weeks',
  'Flexible',
];

export default function StepRevisions({ data, onChange, errors, onAutoAdvance }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Revisions and timeline</h2>
      <p className="text-sm text-gray-500 mb-6">
        Let us know how many changes you'd like to be able to request, and your preferred pace.
      </p>

      <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
        <h3 className="text-sm font-semibold text-gray-700 mb-1">What are revisions?</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          A revision round is each time you review the work and ask for changes. For example, if
          you see the design and request color and layout tweaks, that counts as one round. More
          rounds means more flexibility to fine-tune, but also extends the project timeline & the price
        </p>
      </div>

      <FieldGroup label="How many revision rounds do you want?" required error={errors.revisionRounds}>
        <RadioGroup
          name="revisionRounds"
          options={REVISION_OPTIONS}
          value={data.revisionRounds}
          onChange={(v) => onChange({ revisionRounds: v })}
          layout="pills"
          onAutoAdvance={onAutoAdvance}
        />
      </FieldGroup>

      <FieldGroup label="What's your preferred timeline?" required error={errors.timeline}>
        <RadioGroup
          name="timeline"
          options={TIMELINE_OPTIONS}
          value={data.timeline}
          onChange={(v) => onChange({ timeline: v })}
          layout="pills"
          onAutoAdvance={onAutoAdvance}
        />
      </FieldGroup>
    </div>
  );
}
