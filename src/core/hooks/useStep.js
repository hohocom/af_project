import { useState } from "react";

function useStep() {
  const [step, setStep] = useState(0);
  const changeStep = ({ step = 0 }) => {
    setStep(step);
  };

  return {
    step,
    changeStep,
  };
}

export default useStep;
