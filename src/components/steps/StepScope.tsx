import type { StepProps } from '../../types';
import { FieldGroup, TextInput, RadioGroup, CheckboxGroup } from '../FormFields';

const WEBSITE_TYPES = [
  'Simple informational site',
  'Portfolio / personal brand',
  'Service business with lead forms',
  'Blog / content site',
  'E-commerce store',
  'Web app / custom platform',
];

const CORE_FEATURES = [
  'Contact/lead form',
  'Booking system',
  'Blog or articles',
  'Image/video gallery',
  'Product catalog',
  'Payments/checkout',
  'Membership / login area',
  'Multi-language support',
  'Other',
];

const ADVANCED_FEATURES = [
  'AI chatbot',
  'Email marketing integration',
  'CRM integration',
  'Analytics & tracking',
  'Custom admin panel',
  'Third-party API integrations',
  'Other',
];

export default function StepScope({ data, onChange, errors, onAutoAdvance }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Project scope and features</h2>
      <p className="text-sm text-gray-500 mb-6">
        What kind of site do you need, and which features matter most?
      </p>

      <FieldGroup label="Type of website" required error={errors.websiteType}>
        <RadioGroup
          name="websiteType"
          options={WEBSITE_TYPES}
          value={data.websiteType}
          onChange={(v) => onChange({ websiteType: v })}
          layout="grid"
          onAutoAdvance={onAutoAdvance}
        />
      </FieldGroup>

      <FieldGroup label="Core features you need" required error={errors.coreFeatures} helpText="Select all that apply.">
        <CheckboxGroup
          options={CORE_FEATURES}
          selected={data.coreFeatures}
          onChange={(v) => onChange({ coreFeatures: v })}
          layout="grid"
        />
        {data.coreFeatures.includes('Other') && (
          <div className="mt-2">
            <TextInput
              value={data.coreFeaturesOther}
              onChange={(v) => onChange({ coreFeaturesOther: v })}
              placeholder="Describe the other feature(s)..."
            />
          </div>
        )}
      </FieldGroup>

      <FieldGroup label="Extra / advanced features" helpText="Optional">
        <CheckboxGroup
          options={ADVANCED_FEATURES}
          selected={data.advancedFeatures}
          onChange={(v) => onChange({ advancedFeatures: v })}
          layout="pills"
        />
        {data.advancedFeatures.includes('Other') && (
          <div className="mt-2">
            <TextInput
              value={data.advancedFeaturesOther}
              onChange={(v) => onChange({ advancedFeaturesOther: v })}
              placeholder="Describe the other feature(s)..."
            />
          </div>
        )}
      </FieldGroup>
    </div>
  );
}
