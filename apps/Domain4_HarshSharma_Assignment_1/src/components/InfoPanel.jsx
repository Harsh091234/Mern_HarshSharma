import { useSelector } from "react-redux";
import { flowSteps } from "../data/flowSteps";

export default function InfoPanel() {
  const activeStepId = useSelector(state => state.flow.activeStepId);
  const step = flowSteps.find(s => s.id === activeStepId);

  if (!step) {
    return (
      <div className="animate-[fadeIn_0.4s_ease]">
        <h2 className="text-xl font-semibold text-white">
          Select a step
        </h2>
        <p className="mt-2 text-gray-400">
          Click a step on the left to understand how the API request flows.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-[fadeIn_0.4s_ease] space-y-6">
      
      
      <div className="flex items-center gap-3">
        <span className="w-9 h-9 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-semibold">
          {step.id}
        </span>
        <h2 className="text-2xl font-bold text-white">
          {step.title}
        </h2>
      </div>

      <p className="text-gray-300 leading-relaxed">
        {step.description}
      </p>

      
      {step.details && (
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
            What happens here
          </h3>
          <ul className="mt-3 space-y-2">
            {step.details.map((item, index) => (
              <li key={index} className="flex gap-2 text-gray-300">
                <span className="text-indigo-400">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

    
      {step.code && (
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Example Code
          </h3>
          <pre className="bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-gray-300 overflow-x-auto">
            <code>{step.code}</code>
          </pre>
        </div>
      )}

      
      {step.importance && (
        <div className="border-l-4 border-indigo-500/50 pl-4 text-gray-400 italic">
          Why this matters: {step.importance}
        </div>
      )}
    </div>
  );
}
