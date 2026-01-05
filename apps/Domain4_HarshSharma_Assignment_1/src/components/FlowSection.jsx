import StepCard from "./StepCard";
import { flowSteps } from "../data/flowSteps";

export default function FlowSection() {
  return (
    <div className="space-y-4">
      {flowSteps.map(step => (
        <StepCard key={step.id} step={step} />
      ))}
    </div>
  );
}
