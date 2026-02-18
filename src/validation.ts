import type { FormData } from './types';

type Errors = Record<string, string>;

const required = (val: string) => val.trim().length > 0;
const isEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
const hasSelection = (arr: string[]) => arr.length > 0;

export function validateStep(step: number, data: FormData): Errors {
  const e: Errors = {};

  switch (step) {
    case 0: {
      if (!required(data.fullName)) e.fullName = 'Full name is required.';
      if (!required(data.companyName)) e.companyName = 'Company or brand name is required.';
      if (!required(data.email)) e.email = 'Email is required.';
      else if (!isEmail(data.email)) e.email = 'Please enter a valid email address.';
      if (!required(data.websiteStatus)) e.websiteStatus = 'Please select your current website status.';
      if (!required(data.businessDescription)) e.businessDescription = 'A brief business description is required.';
      if (!required(data.projectGoal)) e.projectGoal = 'Please describe your main goal for this project.';
      break;
    }
    case 1: {
      if (!required(data.websiteType)) e.websiteType = 'Please select a website type.';
      if (!hasSelection(data.coreFeatures)) e.coreFeatures = 'Please select at least one core feature.';
      break;
    }
    case 2: {
      if (!required(data.brandIdentity)) e.brandIdentity = 'Please select your brand identity status.';
      if (!required(data.copyStatus)) e.copyStatus = 'Please select your content readiness.';
      if (!hasSelection(data.visualStyles)) e.visualStyles = 'Please select at least one visual style.';
      break;
    }
    case 3: {
      if (!required(data.launchTimeframe)) e.launchTimeframe = 'Please select a launch timeframe.';
      if (!required(data.projectPhases)) e.projectPhases = 'Please select your preferred phasing.';
      if (!required(data.revisionRounds)) e.revisionRounds = 'Please select revision rounds.';
      if (!required(data.involvement)) e.involvement = 'Please select your involvement preference.';
      break;
    }
    case 4: {
      if (!required(data.budgetRange)) e.budgetRange = 'Please select a budget range.';
      if (!required(data.budgetFlexibility)) e.budgetFlexibility = 'Please indicate budget flexibility.';
      if (!required(data.paymentPlan)) e.paymentPlan = 'Please select a payment preference.';
      break;
    }
    case 5: {
      if (!required(data.seoImportance)) e.seoImportance = 'Please indicate how important SEO is.';
      break;
    }
    case 6: {
      if (!required(data.hasDomain)) e.hasDomain = 'Please indicate if you have a domain.';
      if (!required(data.hasHosting)) e.hasHosting = 'Please indicate if you have hosting.';
      if (!hasSelection(data.postLaunchSupport)) e.postLaunchSupport = 'Please select at least one post-launch option.';
      break;
    }
    case 7: {
      if (!hasSelection(data.brandPersonality)) e.brandPersonality = 'Please select at least one personality trait.';
      if (!required(data.websitePersona)) e.websitePersona = 'Please describe your ideal website persona.';
      if (!required(data.successVision)) e.successVision = 'Please describe what success looks like for you.';
      break;
    }
  }

  return e;
}
