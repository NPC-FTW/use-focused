import { BarChart3, Wand2 } from "lucide-react";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const InfographicGenerator = () => {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("modern");

  const styles = [
    { value: "modern", label: "Modern & Clean" },
    { value: "bold", label: "Bold & Vibrant" },
    { value: "minimal", label: "Minimalist" },
    { value: "corporate", label: "Corporate" },
  ];

  return (
    <ToolLayout
      title="Infographic Generator"
      description="Create stunning data visualizations and infographics for your marketing campaigns"
      icon={BarChart3}
      gradient="bg-gradient-to-br from-violet-500 to-purple-600"
    >
      <div className="space-y-6">
        {/* Topic Input */}
        <div>
          <label className="block text-sm font-medium mb-2">
            What's your infographic about?
          </label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="E.g., Social media marketing statistics for 2024, The customer journey funnel, Email marketing best practices..."
            className="w-full h-32 px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
          />
        </div>

        {/* Style Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Choose a style
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {styles.map((s) => (
              <button
                key={s.value}
                onClick={() => setStyle(s.value)}
                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  style === s.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-secondary hover:border-primary/50"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg">
          <Wand2 className="w-5 h-5" />
          Generate Infographic
        </button>

        {/* Placeholder for results */}
        <div className="mt-8 p-12 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center text-center">
          <BarChart3 className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            Your generated infographic will appear here
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default InfographicGenerator;
