import { useDispatch, useSelector } from "react-redux";
import { setActiveStep } from "../app/flowSlice";

export default function StepCard({ step }) {
  const dispatch = useDispatch();
  const activeStepId = useSelector(state => state.flow.activeStepId);

  const isActive = step.id === activeStepId;

  return (
    <div
    onClick={() => dispatch(setActiveStep(step.id))}
    className={`
      p-4 rounded-xl cursor-pointer
      transition-all duration-300
      flex items-center gap-3
      ${
        isActive
          ? "bg-indigo-600/15 border border-indigo-500 text-white scale-[1.05]"
          : "bg-[#111118] border border-white/5 text-gray-400 hover:border-indigo-500/40"
      }
    `}
  >
    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600/20 text-indigo-400 font-semibold">
      {step.id}
    </span>
  
    <h3 className="font-semibold">{step.title}</h3>
  </div>
  )  
}
