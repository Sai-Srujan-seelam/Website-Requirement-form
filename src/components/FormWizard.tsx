import { useState, useCallback, useEffect, useRef } from 'react';
import type { FormData } from '../types';
import { initialFormData, STEP_TITLES } from '../types';
import { validateStep } from '../validation';
import ProgressBar from './ProgressBar';
import ReviewScreen from './ReviewScreen';
import Confetti from './Confetti';

import StepAboutYou from './steps/StepAboutYou';
import StepDemoReview from './steps/StepDemoReview';
import StepRevisions from './steps/StepRevisions';
import StepBudgetPhases from './steps/StepBudgetPhases';

const TOTAL_STEPS = STEP_TITLES.length;

type WizardState = 'form' | 'submitting' | 'complete';

export default function FormWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<FormData>({ ...initialFormData });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [wizardState, setWizardState] = useState<WizardState>('form');
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showConfetti, setShowConfetti] = useState(false);

  const dataRef = useRef(data);
  const stepRef = useRef(currentStep);
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout>>(null);
  dataRef.current = data;
  stepRef.current = currentStep;

  const handleChange = useCallback((updates: Partial<FormData>) => {
    setData((prev) => ({ ...prev, ...updates }));
    setErrors((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(updates)) {
        delete next[key];
      }
      return next;
    });
  }, []);

  const goToStep = useCallback((step: number) => {
    setDirection(step > stepRef.current ? 'forward' : 'backward');
    setErrors({});
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const advanceStep = useCallback(() => {
    const step = stepRef.current;
    const d = dataRef.current;
    const stepErrors = validateStep(step, d);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return false;
    }
    setErrors({});
    setCompletedSteps((prev) => new Set(prev).add(step));
    if (step < TOTAL_STEPS - 1) {
      setDirection('forward');
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
    return true;
  }, []);

  const handleNext = advanceStep;

  const handleBack = useCallback(() => {
    if (stepRef.current > 0) {
      setErrors({});
      setDirection('backward');
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const tryAutoAdvance = useCallback(() => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    autoAdvanceTimer.current = setTimeout(() => {
      const step = stepRef.current;
      const d = dataRef.current;
      const stepErrors = validateStep(step, d);
      if (Object.keys(stepErrors).length === 0 && step < TOTAL_STEPS - 1) {
        setCompletedSteps((prev) => new Set(prev).add(step));
        setDirection('forward');
        setCurrentStep((s) => s + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 600);
  }, []);

  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (wizardState !== 'form') return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'TEXTAREA') return;
      if (e.key === 'Enter' && tag !== 'BUTTON') {
        e.preventDefault();
        advanceStep();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [advanceStep, wizardState]);

  const handleSubmit = async () => {
    setWizardState('submitting');
    try {
      const formData = new URLSearchParams();
      formData.append('form-name', 'project-intake');
      formData.append('bot-field', '');
      formData.append('submission', JSON.stringify(dataRef.current));

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
    } catch {
      console.warn('Netlify Forms unavailable — submission saved via JSON download only.');
    }
    setWizardState('complete');
    setShowConfetti(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `project-intake-${data.companyName.replace(/\s+/g, '-').toLowerCase() || 'form'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleStartOver = () => {
    setData({ ...initialFormData });
    setErrors({});
    setCurrentStep(0);
    setCompletedSteps(new Set());
    setWizardState('form');
    setDirection('forward');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stepProps = { data, onChange: handleChange, errors, onAutoAdvance: tryAutoAdvance };

  const steps = [
    <StepAboutYou key="s0" {...stepProps} />,
    <StepDemoReview key="s1" {...stepProps} />,
    <StepRevisions key="s2" {...stepProps} />,
    <StepBudgetPhases key="s3" {...stepProps} />,
  ];

  if (wizardState === 'submitting') {
    return (
      <div className="flex flex-col items-center justify-center py-32 animate-fade-up">
        <div className="relative mb-6">
          <div className="w-12 h-12 border-[3px] border-gray-200 border-t-accent rounded-full animate-spin" />
        </div>
        <p className="text-sm text-gray-600 font-medium">Saving your answers...</p>
        <p className="text-xs text-gray-400 mt-1">This will only take a moment.</p>
      </div>
    );
  }

  if (wizardState === 'complete') {
    return (
      <>
        {showConfetti && <Confetti />}
        <ReviewScreen
          data={data}
          onDownload={handleDownload}
          onStartOver={handleStartOver}
        />
      </>
    );
  }

  const isLastStep = currentStep === TOTAL_STEPS - 1;

  return (
    <div>
      <ProgressBar
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        titles={STEP_TITLES}
        onStepClick={goToStep}
        completedSteps={completedSteps}
      />

      <div
        key={currentStep}
        className={`min-h-[300px] ${direction === 'forward' ? 'animate-slide-right' : 'animate-slide-left'}`}
      >
        {steps[currentStep]}
      </div>

      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="group px-5 py-2.5 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-all disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
        >
          <span className="inline-flex items-center gap-1.5">
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back
          </span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 hidden sm:block">
            Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-mono">Enter</kbd>
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="group px-6 py-2.5 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent-hover transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            <span className="inline-flex items-center gap-1.5">
              {isLastStep ? 'Submit' : 'Next'}
              {!isLastStep && (
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
