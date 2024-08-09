import React from 'react';

interface ProgressProps {
  steps: number;
  activeStep: number;
}

const Progress: React.FC<ProgressProps> = ({ steps, activeStep }) => {
  return (
    <div className="grid grid-cols-4 gap-2 mt-2">
      {Array.from({ length: steps }, (_, index) => (
        <div
          key={index}
          className={`rounded-full h-2 ${
            index < activeStep ? 'bg-primary' : 'bg-slate-400'
          }`}
        ></div>
      ))}
    </div>
  );
};

export default Progress;
