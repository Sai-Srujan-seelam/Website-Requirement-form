import type { StepProps } from '../../types';
import { FieldGroup, RadioGroup, CheckboxGroup } from '../FormFields';

const DOMAIN_OPTIONS = ['Yes', 'Not yet'];

const HOSTING_OPTIONS = [
  'Yes, I have hosting',
  'No, I need hosting handled',
  "I'm not sure",
];

const TECH_PREFS = [
  'No-code / low-code (Webflow, Squarespace)',
  'Custom-coded solution',
  'CMS to edit content myself',
  'High traffic / performance needs',
  'Compliance / security (HIPAA, GDPR)',
];

const POST_LAUNCH = [
  'Occasional help only',
  'Monthly maintenance & security',
  'Ongoing SEO & content updates',
  'Regular performance reviews',
];

export default function StepTechnical({ data, onChange, errors, onAutoAdvance }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Technical details and deployment</h2>
      <p className="text-sm text-gray-500 mb-6">
        A few quick technical questions to plan the right setup for your site.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
        <FieldGroup label="Have a domain name?" required error={errors.hasDomain}>
          <RadioGroup
            name="hasDomain"
            options={DOMAIN_OPTIONS}
            value={data.hasDomain}
            onChange={(v) => onChange({ hasDomain: v })}
            layout="pills"
            onAutoAdvance={onAutoAdvance}
          />
        </FieldGroup>

        <FieldGroup label="Have hosting?" required error={errors.hasHosting}>
          <RadioGroup
            name="hasHosting"
            options={HOSTING_OPTIONS}
            value={data.hasHosting}
            onChange={(v) => onChange({ hasHosting: v })}
            layout="pills"
            onAutoAdvance={onAutoAdvance}
          />
        </FieldGroup>
      </div>

      <FieldGroup label="Technical preferences" helpText="Optional">
        <CheckboxGroup
          options={TECH_PREFS}
          selected={data.technicalPrefs}
          onChange={(v) => onChange({ technicalPrefs: v })}
          layout="grid"
        />
      </FieldGroup>

      <FieldGroup label="Post-launch support" required error={errors.postLaunchSupport} helpText="Select at least one.">
        <CheckboxGroup
          options={POST_LAUNCH}
          selected={data.postLaunchSupport}
          onChange={(v) => onChange({ postLaunchSupport: v })}
          layout="pills"
        />
      </FieldGroup>
    </div>
  );
}
