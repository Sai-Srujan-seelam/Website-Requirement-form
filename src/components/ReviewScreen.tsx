import { useState } from 'react';
import type { FormData } from '../types';
import { STEP_TITLES } from '../types';

interface ReviewScreenProps {
  data: FormData;
  onDownload: () => void;
  onStartOver: () => void;
}

function Section({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-left cursor-pointer group"
      >
        <h3 className="text-sm font-semibold text-gray-700 group-hover:text-accent transition-colors">{title}</h3>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100 pb-4' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-1">{children}</div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4 py-1.5">
      <span className="text-xs text-gray-400 sm:w-44 shrink-0">{label}</span>
      <span className="text-sm text-gray-800 whitespace-pre-line">{value}</span>
    </div>
  );
}

export default function ReviewScreen({ data, onDownload, onStartOver }: ReviewScreenProps) {
  return (
    <div className="animate-fade-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-4">
          <svg className="w-8 h-8 text-green-500 animate-check-pop" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">You're all set!</h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          We've received your responses. Here's a summary of everything you shared.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl px-5 py-2 shadow-sm">
        <Section title={STEP_TITLES[0]} defaultOpen>
          <Row label="Full name" value={data.fullName} />
          <Row label="Company" value={data.companyName} />
          <Row label="Email" value={data.email} />
          <Row label="Phone" value={data.phone} />
          <Row label="Previous site cost" value={data.prevWebsiteCost} />
          <Row label="People joined via site" value={data.peopleJoined} />
        </Section>

        <Section title={STEP_TITLES[1]}>
          <Row label="Demo link" value={data.demoLink} />
          <Row label="Demo approval" value={data.demoConfirmed} />
          <Row label="Feedback" value={data.demoFeedback} />
        </Section>

        <Section title={STEP_TITLES[2]}>
          <Row label="Revision rounds" value={data.revisionRounds} />
          <Row label="Timeline" value={data.timeline} />
        </Section>

        <Section title={STEP_TITLES[3]}>
          <Row label="Phase 1 budget" value={data.phase1Budget} />
          <Row label="Phase 2 budget" value={data.phase2Budget} />
          <Row label="Phase 3 budget" value={data.phase3Budget} />
          <Row label="Payment preference" value={data.paymentPreference} />
          <Row label="Budget notes" value={data.budgetNotes} />
        </Section>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
        <button
          onClick={onDownload}
          className="group px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-all shadow-sm hover:shadow-md cursor-pointer inline-flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download summary (JSON)
        </button>
        <button
          onClick={onStartOver}
          className="px-5 py-2.5 bg-white text-gray-600 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 hover:text-gray-800 transition-all cursor-pointer"
        >
          Start over
        </button>
      </div>
    </div>
  );
}
