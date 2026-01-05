import FlowSection from "../components/FlowSection";
import InfoPanel from "../components/InfoPanel";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-gray-200 px-6 py-10">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          How API Requests Flow
        </h1>
        <p className="mt-2 text-gray-400 max-w-2xl">
          Interactive breakdown of how a request travels through a modern web
          application.
        </p>
      </div>

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Flow Steps */}
        <div className="md:col-span-1 bg-[#111118] rounded-2xl border border-white/5 p-4">
          <FlowSection />
        </div>

        {/* Info Panel */}
        <div className="md:col-span-2 bg-[#111118] rounded-2xl border border-white/5 p-6">
          <InfoPanel />
        </div>

      </div>
    </div>
  );
}
