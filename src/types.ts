export interface FormData {
  // Step 1 – About You & Current Site
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  prevWebsiteCost: string;
  peopleJoined: string;

  // Step 2 – Phase 1 Demo Review
  demoLink: string;
  demoConfirmed: string;
  demoFeedback: string;

  // Step 3 – Revisions & Timeline
  revisionRounds: string;
  timeline: string;

  // Step 4 – Budget & Phases
  phase1Budget: string;
  phase2Budget: string;
  phase3Budget: string;
  paymentPreference: string;
  budgetNotes: string;
}

export const initialFormData: FormData = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  prevWebsiteCost: '',
  peopleJoined: '',

  demoLink: '',
  demoConfirmed: '',
  demoFeedback: '',

  revisionRounds: '',
  timeline: '',

  phase1Budget: '',
  phase2Budget: '',
  phase3Budget: '',
  paymentPreference: '',
  budgetNotes: '',
};

export interface StepProps {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
  errors: Record<string, string>;
  onAutoAdvance: () => void;
}

export const STEP_TITLES = [
  'About You',
  'Demo Review',
  'Revisions',
  'Budget & Phases',
];
