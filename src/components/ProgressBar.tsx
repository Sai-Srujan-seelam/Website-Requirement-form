interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  titles: string[];
  onStepClick: (step: number) => void;
  completedSteps: Set<number>;
}

const MINUTES_PER_STEP = [1.5, 1, 0.5, 1.5];

export default function ProgressBar({
  currentStep,
  totalSteps,
  titles,
  onStepClick,
  completedSteps,
}: ProgressBarProps) {
  const pct = ((currentStep + 1) / totalSteps) * 100;

  const minutesLeft = MINUTES_PER_STEP.slice(currentStep).reduce((a, b) => a + b, 0);
  const timeLabel = minutesLeft <= 1 ? 'Less than a minute left' : `About ${Math.ceil(minutesLeft)} min remaining`;

  return (
    <div className="mb-8">
      {/* Step dots */}
      <div className="flex items-center justify-between mb-3 px-1">
        {titles.map((title, i) => {
          const isCompleted = completedSteps.has(i);
          const isCurrent = i === currentStep;
          const isClickable = isCompleted || i < currentStep;

          return (
            <button
              key={i}
              type="button"
              onClick={() => isClickable && onStepClick(i)}
              disabled={!isClickable}
              title={title}
              className={`relative flex items-center justify-center transition-all duration-300 ${
                isClickable ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                  isCurrent
                    ? 'bg-accent text-white shadow-md relative dot-pulse'
                    : isCompleted
                    ? 'bg-accent/10 text-accent'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {isCompleted && !isCurrent ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>

              {/* Label on larger screens */}
              <span
                className={`hidden lg:block absolute -bottom-5 text-[10px] whitespace-nowrap transition-colors ${
                  isCurrent ? 'text-accent font-semibold' : isCompleted ? 'text-gray-500' : 'text-gray-300'
                }`}
              >
                {title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Connector bar */}
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1 lg:mt-5">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Meta row */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-400">{timeLabel}</span>
        <span className="text-xs font-medium text-gray-500 lg:hidden">{titles[currentStep]}</span>
      </div>
    </div>
  );
}
