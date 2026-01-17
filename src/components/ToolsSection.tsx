import { BarChart3, Type, Image, Search } from "lucide-react";
import ToolCard from "./ToolCard";

const tools = [
  {
    title: "Infographic Generator",
    description: "Create stunning infographics and visual data presentations for your marketing campaigns in seconds.",
    icon: BarChart3,
    path: "/infographic",
    gradient: "bg-gradient-to-br from-violet-500 to-purple-600",
  },
  {
    title: "Text AI",
    description: "Transform and enhance your copy with AI-powered writing tools. Generate, rewrite, and optimize content.",
    icon: Type,
    path: "/text-ai",
    gradient: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
  {
    title: "Image Generator",
    description: "Generate unique marketing visuals, product images, and creative assets with cutting-edge AI.",
    icon: Image,
    path: "/image-generator",
    gradient: "bg-gradient-to-br from-pink-500 to-rose-500",
  },
  {
    title: "Research AI",
    description: "Conduct deep market research, competitor analysis, and trend discovery with intelligent AI search.",
    icon: Search,
    path: "/research",
    gradient: "bg-gradient-to-br from-emerald-500 to-teal-500",
  },
];

const ToolsSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your AI <span className="gradient-text">Toolkit</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four powerful AI tools designed to accelerate your marketing workflow
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.path} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
