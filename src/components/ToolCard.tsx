import { ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  gradient: string;
}

const ToolCard = ({ title, description, icon: Icon, path, gradient }: ToolCardProps) => {
  return (
    <Link
      to={path}
      className="group relative p-6 rounded-2xl bg-card border border-border hover-lift overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div 
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${gradient}`}
      />
      
      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-xl ${gradient} flex items-center justify-center mb-5 shadow-lg`}>
          <Icon className="w-7 h-7 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Action */}
        <div className="flex items-center gap-2 text-primary font-medium text-sm">
          <span>Try Now</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;
