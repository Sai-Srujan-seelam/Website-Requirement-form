import type { StepProps } from '../../types';
import { FieldGroup, TextInput, RadioGroup } from '../FormFields';

const PREV_COST_OPTIONS = [
  'Never had a website',
  'Under $500',
  '$500 – $1,000',
  '$1,000 – $2,000',
  '$2,000 – $3,000',
  '$3,000+',
  'Not sure / don\'t remember',
];

const PEOPLE_JOINED_OPTIONS = [
  'None / no tracking',
  '1 – 10',
  '10 – 50',
  '50 – 200',
  '200+',
];

export default function StepAboutYou({ data, onChange, errors, onAutoAdvance }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Quick intro</h2>
      <p className="text-sm text-gray-500 mb-6">
        Just the basics so we know who we're working with.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldGroup label="Full name" required error={errors.fullName}>
          <TextInput value={data.fullName} onChange={(v) => onChange({ fullName: v })} placeholder="Jane Smith" />
        </FieldGroup>
        <FieldGroup label="Company / brand" required error={errors.companyName}>
          <TextInput value={data.companyName} onChange={(v) => onChange({ companyName: v })} placeholder="Acme Co." />
        </FieldGroup>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldGroup label="Email" required error={errors.email}>
          <TextInput value={data.email} onChange={(v) => onChange({ email: v })} type="email" placeholder="you@example.com" />
        </FieldGroup>
        <FieldGroup label="Phone" helpText="Optional">
          <TextInput value={data.phone} onChange={(v) => onChange({ phone: v })} type="tel" placeholder="+1 (555) 000-0000" />
        </FieldGroup>
      </div>

      <FieldGroup label="What did your previous website cost?" helpText="If you've had a website built before, roughly how much did it cost?">
        <RadioGroup
          name="prevWebsiteCost"
          options={PREV_COST_OPTIONS}
          value={data.prevWebsiteCost}
          onChange={(v) => onChange({ prevWebsiteCost: v })}
          layout="pills"
          onAutoAdvance={onAutoAdvance}
        />
      </FieldGroup>

      <FieldGroup label="How many people have joined or contacted you through your website?" helpText="Leads, signups, inquiries, purchases — any conversions.">
        <RadioGroup
          name="peopleJoined"
          options={PEOPLE_JOINED_OPTIONS}
          value={data.peopleJoined}
          onChange={(v) => onChange({ peopleJoined: v })}
          layout="pills"
          onAutoAdvance={onAutoAdvance}
        />
      </FieldGroup>
    </div>
  );
}
