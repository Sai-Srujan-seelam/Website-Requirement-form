import type { StepProps } from '../../types';
import { FieldGroup, TextInput, RadioGroup, CheckboxGroup } from '../FormFields';

const SEO_IMPORTANCE = [
  'Critical \u2013 strong foundation from day one',
  'Important, but basics are fine to start',
  'Nice to have, maybe later',
  'Not a priority right now',
];

const SEO_SERVICES = [
  'Keyword research',
  'On-page SEO',
  'Technical SEO',
  'Local SEO',
  'Blog/content strategy',
  'Ongoing monitoring',
];

const MARKETING_SERVICES = [
  'Social media strategy',
  'Email marketing',
  'Landing pages for ads',
  'Paid ads management',
  'Analytics & tracking',
  'Content creation',
];

const EXISTING_CHANNELS = [
  'None yet',
  'Instagram',
  'Facebook',
  'LinkedIn',
  'TikTok',
  'YouTube',
  'Email list',
  'Other',
];

export default function StepSeoMarketing({ data, onChange, errors, onAutoAdvance }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">SEO and marketing</h2>
      <p className="text-sm text-gray-500 mb-6">
        How important is search visibility and marketing for your project?
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">What is SEO?</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Improving your site so it ranks higher in Google when people search for your services.
              Includes content, structure, and technical optimization.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Digital Marketing</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Social media, email campaigns, paid ads, and content marketing to bring your ideal
              customers to your site and convert them into leads or sales.
            </p>
          </div>
        </div>
      </div>

      <FieldGroup label="How important is SEO?" required error={errors.seoImportance}>
        <RadioGroup
          name="seoImportance"
          options={SEO_IMPORTANCE}
          value={data.seoImportance}
          onChange={(v) => onChange({ seoImportance: v })}
          layout="grid"
          onAutoAdvance={onAutoAdvance}
        />
      </FieldGroup>

      <FieldGroup label="SEO services" helpText="Optional">
        <CheckboxGroup
          options={SEO_SERVICES}
          selected={data.seoServices}
          onChange={(v) => onChange({ seoServices: v })}
          layout="pills"
        />
      </FieldGroup>

      <FieldGroup label="Marketing services" helpText="Optional">
        <CheckboxGroup
          options={MARKETING_SERVICES}
          selected={data.marketingServices}
          onChange={(v) => onChange({ marketingServices: v })}
          layout="pills"
        />
      </FieldGroup>

      <FieldGroup label="Existing marketing channels" helpText="Select all that apply.">
        <CheckboxGroup
          options={EXISTING_CHANNELS}
          selected={data.existingChannels}
          onChange={(v) => onChange({ existingChannels: v })}
          layout="pills"
        />
        {data.existingChannels.includes('Other') && (
          <div className="mt-2">
            <TextInput
              value={data.existingChannelsOther}
              onChange={(v) => onChange({ existingChannelsOther: v })}
              placeholder="Which other channels?"
            />
          </div>
        )}
      </FieldGroup>
    </div>
  );
}
