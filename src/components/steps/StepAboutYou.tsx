import type { StepProps } from '../../types';
import { FieldGroup, TextInput, TextArea, RadioGroup } from '../FormFields';

const WEBSITE_STATUS_OPTIONS = [
  "I don't have a website yet",
  'I have a website and want a redesign',
  'I need help with ongoing improvements',
];

export default function StepAboutYou({ data, onChange, errors }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">About you and your business</h2>
      <p className="text-sm text-gray-500 mb-6">
        Let's start with the basics so we can understand who you are and what you need.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldGroup label="Full name" required error={errors.fullName}>
          <TextInput value={data.fullName} onChange={(v) => onChange({ fullName: v })} placeholder="Jane Smith" />
        </FieldGroup>
        <FieldGroup label="Company / brand name" required error={errors.companyName}>
          <TextInput value={data.companyName} onChange={(v) => onChange({ companyName: v })} placeholder="Acme Co." />
        </FieldGroup>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FieldGroup label="Email" required error={errors.email}>
          <TextInput value={data.email} onChange={(v) => onChange({ email: v })} type="email" placeholder="you@example.com" />
        </FieldGroup>
        <FieldGroup label="Phone number" helpText="Optional">
          <TextInput value={data.phone} onChange={(v) => onChange({ phone: v })} type="tel" placeholder="+1 (555) 000-0000" />
        </FieldGroup>
      </div>

      <FieldGroup label="Current website status" required error={errors.websiteStatus}>
        <RadioGroup
          name="websiteStatus"
          options={WEBSITE_STATUS_OPTIONS}
          value={data.websiteStatus}
          onChange={(v) => onChange({ websiteStatus: v })}
          layout="pills"
        />
      </FieldGroup>

      <FieldGroup label="Brief description of your business" required error={errors.businessDescription}>
        <TextArea
          value={data.businessDescription}
          onChange={(v) => onChange({ businessDescription: v })}
          placeholder="What does your business do? Who are your customers?"
          rows={2}
        />
      </FieldGroup>

      <FieldGroup
        label="Main goal for this project"
        required
        error={errors.projectGoal}
        helpText="e.g., generate more leads, increase online sales, improve brand image, streamline bookings..."
      >
        <TextArea
          value={data.projectGoal}
          onChange={(v) => onChange({ projectGoal: v })}
          placeholder="What do you hope to achieve with this website?"
          rows={2}
        />
      </FieldGroup>
    </div>
  );
}
