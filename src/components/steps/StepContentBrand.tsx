import type { StepProps } from '../../types';
import { FieldGroup, TextArea, RadioGroup, CheckboxGroup } from '../FormFields';

const BRAND_OPTIONS = [
  'Yes, established brand',
  'Partially \u2013 logo only',
  'No \u2013 I need branding help',
];

const COPY_OPTIONS = [
  'Yes, most is ready',
  'Some ready, need help finishing',
  'No, I need copywriting support',
];

const VISUAL_STYLES = [
  'Clean & minimal',
  'Modern & bold',
  'Playful & friendly',
  'Elegant & premium',
  'Corporate & professional',
  'Open to suggestions',
];

export default function StepContentBrand({ data, onChange, errors, onAutoAdvance }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Content and brand</h2>
      <p className="text-sm text-gray-500 mb-6">
        Tell us about your branding, content readiness, and visual taste.
      </p>

      <FieldGroup label="Do you have a logo and brand identity?" required error={errors.brandIdentity}>
        <RadioGroup
          name="brandIdentity"
          options={BRAND_OPTIONS}
          value={data.brandIdentity}
          onChange={(v) => onChange({ brandIdentity: v })}
          layout="pills"
          onAutoAdvance={onAutoAdvance}
        />
      </FieldGroup>

      <FieldGroup label="Is your website copy (text) ready?" required error={errors.copyStatus}>
        <RadioGroup
          name="copyStatus"
          options={COPY_OPTIONS}
          value={data.copyStatus}
          onChange={(v) => onChange({ copyStatus: v })}
          layout="pills"
          onAutoAdvance={onAutoAdvance}
        />
      </FieldGroup>

      <FieldGroup label="Visual style preferences" required error={errors.visualStyles} helpText="Select all that resonate with you.">
        <CheckboxGroup
          options={VISUAL_STYLES}
          selected={data.visualStyles}
          onChange={(v) => onChange({ visualStyles: v })}
          layout="pills"
        />
      </FieldGroup>

      <FieldGroup
        label="Example websites you like"
        helpText="Paste URLs and note what you like about them."
      >
        <TextArea
          value={data.exampleWebsites}
          onChange={(v) => onChange({ exampleWebsites: v })}
          rows={2}
          placeholder="https://example.com \u2014 I like the clean layout and typography..."
        />
      </FieldGroup>
    </div>
  );
}
