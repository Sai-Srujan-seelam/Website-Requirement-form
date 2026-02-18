import type { StepProps } from '../../types';
import { FieldGroup, TextArea, RadioGroup } from '../FormFields';

const BUDGET_OPTIONS = [
  'Under $1K',
  '$1K \u2013 $3K',
  '$3K \u2013 $5K',
  '$5K \u2013 $10K',
  '$10K+',
];

const FLEXIBILITY_OPTIONS = [
  'Must stay in range',
  'Slightly flexible',
  'Very flexible',
];

const PAYMENT_OPTIONS = [
  'Yes, payment plan',
  'Maybe, explore options',
  'No, one-time payment',
];

export default function StepBudget({ data, onChange, errors, onAutoAdvance }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Budget and investment</h2>
      <p className="text-sm text-gray-500 mb-6">
        Understanding your budget helps us recommend the right scope.
      </p>

      <FieldGroup label="Budget range" required error={errors.budgetRange}>
        <RadioGroup
          name="budgetRange"
          options={BUDGET_OPTIONS}
          value={data.budgetRange}
          onChange={(v) => onChange({ budgetRange: v })}
          layout="pills"
          onAutoAdvance={onAutoAdvance}
        />
      </FieldGroup>

      <FieldGroup label="Budget flexibility" required error={errors.budgetFlexibility}>
        <RadioGroup
          name="budgetFlexibility"
          options={FLEXIBILITY_OPTIONS}
          value={data.budgetFlexibility}
          onChange={(v) => onChange({ budgetFlexibility: v })}
          layout="pills"
          onAutoAdvance={onAutoAdvance}
        />
      </FieldGroup>

      <FieldGroup label="Interested in a payment plan?" required error={errors.paymentPlan}>
        <RadioGroup
          name="paymentPlan"
          options={PAYMENT_OPTIONS}
          value={data.paymentPlan}
          onChange={(v) => onChange({ paymentPlan: v })}
          layout="pills"
          onAutoAdvance={onAutoAdvance}
        />
      </FieldGroup>

      <FieldGroup label="Anything else about your budget?" helpText="Optional">
        <TextArea
          value={data.budgetNotes}
          onChange={(v) => onChange({ budgetNotes: v })}
          rows={2}
          placeholder="Any additional context..."
        />
      </FieldGroup>
    </div>
  );
}
