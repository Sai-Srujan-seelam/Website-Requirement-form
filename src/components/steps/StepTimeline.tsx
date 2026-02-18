import type { StepProps } from '../../types';
import { FieldGroup, RadioGroup } from '../FormFields';

const LAUNCH_OPTIONS = [
  'ASAP (rush)',
  '4\u20136 weeks',
  '2\u20133 months',
  'Flexible',
];

const PHASE_OPTIONS = [
  '1 phase \u2013 all-in-one delivery',
  '2 phases \u2013 design, then development',
  '3+ phases \u2013 strategy through optimization',
];

const REVISION_OPTIONS = [
  '1\u20132 rounds',
  '3\u20134 rounds',
  '5+ rounds',
];

const INVOLVEMENT_OPTIONS = [
  'Very hands-on',
  'Balanced \u2013 I trust your process',
  'Low touch \u2013 key milestones only',
];

export default function StepTimeline({ data, onChange, errors, onAutoAdvance }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Timeline, phases, and revisions</h2>
      <p className="text-sm text-gray-500 mb-6">
        Let's figure out the right pace and structure for your project.
      </p>

      <FieldGroup label="Desired start date" helpText="Optional \u2013 leave blank if flexible.">
        <input
          type="date"
          value={data.startDate}
          onChange={(e) => onChange({ startDate: e.target.value })}
          className="w-full sm:w-auto px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
        />
      </FieldGroup>

      <FieldGroup label="Launch timeframe" required error={errors.launchTimeframe}>
        <RadioGroup
          name="launchTimeframe"
          options={LAUNCH_OPTIONS}
          value={data.launchTimeframe}
          onChange={(v) => onChange({ launchTimeframe: v })}
          layout="pills"
          onAutoAdvance={onAutoAdvance}
        />
      </FieldGroup>

      <FieldGroup label="Project phasing" required error={errors.projectPhases}>
        <RadioGroup
          name="projectPhases"
          options={PHASE_OPTIONS}
          value={data.projectPhases}
          onChange={(v) => onChange({ projectPhases: v })}
          layout="stack"
          onAutoAdvance={onAutoAdvance}
        />
      </FieldGroup>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
        <FieldGroup label="Revision rounds" required error={errors.revisionRounds}>
          <RadioGroup
            name="revisionRounds"
            options={REVISION_OPTIONS}
            value={data.revisionRounds}
            onChange={(v) => onChange({ revisionRounds: v })}
            layout="pills"
            onAutoAdvance={onAutoAdvance}
          />
        </FieldGroup>

        <FieldGroup label="Your involvement level" required error={errors.involvement}>
          <RadioGroup
            name="involvement"
            options={INVOLVEMENT_OPTIONS}
            value={data.involvement}
            onChange={(v) => onChange({ involvement: v })}
            layout="pills"
            onAutoAdvance={onAutoAdvance}
          />
        </FieldGroup>
      </div>
    </div>
  );
}
