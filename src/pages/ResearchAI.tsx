import { Search, Wand2, ExternalLink } from "lucide-react";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const ResearchAI = () => {
  const [query, setQuery] = useState("");
  const [researchType, setResearchType] = useState("market");

  const researchTypes = [
    { value: "market", label: "Market Research" },
    { value: "competitor", label: "Competitor Analysis" },
    { value: "trends", label: "Trend Discovery" },
    { value: "audience", label: "Audience Insights" },
    { value: "industry", label: "Industry News" },
  ];

  return (
    <ToolLayout
      title="Research AI"
      description="Conduct deep market research and competitor analysis with intelligent AI search"
      icon={Search}
      gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
    >
      <div className="space-y-6">
        {/* Search Input */}
        <div>
          <label className="block text-sm font-medium mb-2">
            What do you want to research?
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="E.g., SaaS marketing trends in 2024, competitor pricing strategies, target audience for fitness apps..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Research Type */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Research Type
          </label>
          <div className="flex flex-wrap gap-2">
            {researchTypes.map((rt) => (
              <button
                key={rt.value}
                onClick={() => setResearchType(rt.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  researchType === rt.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary border border-border hover:border-primary/50"
                }`}
              >
                {rt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Button */}
        <button className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg">
          <Wand2 className="w-5 h-5" />
          Start Research
        </button>

        {/* Results Placeholder */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Research Results</h3>
          <div className="space-y-4">
            {/* Placeholder cards */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-border bg-secondary/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="h-4 w-3/4 bg-border rounded animate-pulse mb-2" />
                    <div className="h-3 w-full bg-border/60 rounded animate-pulse mb-1" />
                    <div className="h-3 w-5/6 bg-border/60 rounded animate-pulse" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-6 text-sm">
            Enter a research query to see AI-powered insights
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ResearchAI;
