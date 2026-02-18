import type { StepProps } from '../../types';
import { FieldGroup, TextArea, CheckboxGroup } from '../FormFields';

const PERSONALITY_OPTIONS = [
  'Friendly & approachable',
  'Serious & professional',
  'Bold & energetic',
  'Calm & reassuring',
  'Innovative & tech-forward',
  'Luxury & exclusive',
];

export default function StepPersonalization({ data, onChange, errors }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Personalization and final notes</h2>
      <p className="text-sm text-gray-500 mb-6">
        Last step! These questions help us understand your vision on a deeper level.
      </p>

      <FieldGroup label="Your brand's personality" required error={errors.brandPersonality} helpText="Select all that fit.">
        <CheckboxGroup
          options={PERSONALITY_OPTIONS}
          selected={data.brandPersonality}
          onChange={(v) => onChange({ brandPersonality: v })}
          layout="pills"
        />
      </FieldGroup>

      <FieldGroup
        label="If your website were a person, how would visitors describe them?"
        required
        error={errors.websitePersona}
        helpText="Think about the feeling or impression you want to leave."
      >
        <TextArea
          value={data.websitePersona}
          onChange={(v) => onChange({ websitePersona: v })}
          rows={2}
          placeholder='"Warm, knowledgeable, and genuinely helpful \u2013 like a trusted friend who knows their stuff."'
        />
      </FieldGroup>

      <FieldGroup
        label="What does success look like 6\u201312 months after launch?"
        required
        error={errors.successVision}
      >
        <TextArea
          value={data.successVision}
          onChange={(v) => onChange({ successVision: v })}
          rows={2}
          placeholder="The outcomes that would make this project a win..."
        />
      </FieldGroup>

      <FieldGroup
        label="Anything you're worried about or want us to pay attention to?"
        helpText="Optional"
      >
        <TextArea
          value={data.concerns}
          onChange={(v) => onChange({ concerns: v })}
          rows={2}
          placeholder="Any concerns, constraints, or special requests..."
        />
      </FieldGroup>

      <div className="mt-4 p-4 bg-accent/5 border border-accent/10 rounded-xl">
        <p className="text-sm text-gray-600 leading-relaxed">
          We'll review your answers carefully and follow up with a tailored plan, so you get a
          website and marketing setup that truly fits your situation.
        </p>
      </div>
    </div>
  );
}
