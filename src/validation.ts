import type { FormData } from './types';

type Errors = Record<string, string>;

const required = (val: string) => val.trim().length > 0;
const isEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

export function validateStep(step: number, data: FormData): Errors {
  const e: Errors = {};

  switch (step) {
    case 0: {
      if (!required(data.fullName)) e.fullName = 'Full name is required.';
      if (!required(data.companyName)) e.companyName = 'Company name is required.';
      if (!required(data.email)) e.email = 'Email is required.';
      else if (!isEmail(data.email)) e.email = 'Please enter a valid email.';
      break;
    }
    case 1: {
      if (!required(data.demoConfirmed)) e.demoConfirmed = 'Please confirm whether you approve the demo.';
      break;
    }
    case 2: {
      if (!required(data.revisionRounds)) e.revisionRounds = 'Please select how many revision rounds you want.';
      if (!required(data.timeline)) e.timeline = 'Please select a timeline.';
      break;
    }
    case 3: {
      if (!required(data.phase1Budget)) e.phase1Budget = 'Please select a Phase 1 budget.';
      if (!required(data.paymentPreference)) e.paymentPreference = 'Please select a payment preference.';
      break;
    }
  }

  return e;
}
