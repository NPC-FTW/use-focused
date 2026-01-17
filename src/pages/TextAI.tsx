import { Type, Wand2, Copy, RotateCcw } from "lucide-react";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const TextAI = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [action, setAction] = useState("rewrite");

  const actions = [
    { value: "rewrite", label: "Rewrite" },
    { value: "expand", label: "Expand" },
    { value: "summarize", label: "Summarize" },
    { value: "tone", label: "Change Tone" },
    { value: "headlines", label: "Generate Headlines" },
    { value: "cta", label: "Create CTAs" },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
  };

  return (
    <ToolLayout
      title="Text AI"
      description="Transform, enhance, and generate marketing copy with AI-powered writing tools"
      icon={Type}
      gradient="bg-gradient-to-br from-blue-500 to-cyan-500"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Side */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Your Text
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste or type your marketing copy here..."
              className="w-full h-64 px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
            />
          </div>

          {/* Action Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">
              What would you like to do?
            </label>
            <div className="flex flex-wrap gap-2">
              {actions.map((a) => (
                <button
                  key={a.value}
                  onClick={() => setAction(a.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    action === a.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary border border-border hover:border-primary/50"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg">
            <Wand2 className="w-5 h-5" />
            Transform Text
          </button>
        </div>

        {/* Output Side */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">
              Result
            </label>
            {outputText && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setOutputText("")}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  title="Clear"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          
          <div className="h-64 px-4 py-3 rounded-xl bg-secondary/50 border border-border overflow-auto">
            {outputText ? (
              <p className="whitespace-pre-wrap">{outputText}</p>
            ) : (
              <p className="text-muted-foreground italic">
                Transformed text will appear here...
              </p>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default TextAI;
