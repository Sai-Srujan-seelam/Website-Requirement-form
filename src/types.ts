export interface FormData {
  // Step 1 – About You
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  websiteStatus: string;
  businessDescription: string;
  projectGoal: string;

  // Step 2 – Project Scope
  websiteType: string;
  coreFeatures: string[];
  coreFeaturesOther: string;
  advancedFeatures: string[];
  advancedFeaturesOther: string;

  // Step 3 – Content & Brand
  brandIdentity: string;
  copyStatus: string;
  visualStyles: string[];
  exampleWebsites: string;

  // Step 4 – Timeline
  startDate: string;
  launchTimeframe: string;
  projectPhases: string;
  revisionRounds: string;
  involvement: string;

  // Step 5 – Budget
  budgetRange: string;
  budgetFlexibility: string;
  paymentPlan: string;
  budgetNotes: string;

  // Step 6 – SEO & Marketing
  seoImportance: string;
  seoServices: string[];
  marketingServices: string[];
  existingChannels: string[];
  existingChannelsOther: string;

  // Step 7 – Technical
  hasDomain: string;
  hasHosting: string;
  technicalPrefs: string[];
  postLaunchSupport: string[];

  // Step 8 – Personalization
  brandPersonality: string[];
  websitePersona: string;
  successVision: string;
  concerns: string;
}

export const initialFormData: FormData = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  websiteStatus: '',
  businessDescription: '',
  projectGoal: '',

  websiteType: '',
  coreFeatures: [],
  coreFeaturesOther: '',
  advancedFeatures: [],
  advancedFeaturesOther: '',

  brandIdentity: '',
  copyStatus: '',
  visualStyles: [],
  exampleWebsites: '',

  startDate: '',
  launchTimeframe: '',
  projectPhases: '',
  revisionRounds: '',
  involvement: '',

  budgetRange: '',
  budgetFlexibility: '',
  paymentPlan: '',
  budgetNotes: '',

  seoImportance: '',
  seoServices: [],
  marketingServices: [],
  existingChannels: [],
  existingChannelsOther: '',

  hasDomain: '',
  hasHosting: '',
  technicalPrefs: [],
  postLaunchSupport: [],

  brandPersonality: [],
  websitePersona: '',
  successVision: '',
  concerns: '',
};

export interface StepProps {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
  errors: Record<string, string>;
  onAutoAdvance: () => void;
}

export const STEP_TITLES = [
  'About You',
  'Project Scope',
  'Content & Brand',
  'Timeline',
  'Budget',
  'SEO & Marketing',
  'Technical Details',
  'Final Notes',
];
