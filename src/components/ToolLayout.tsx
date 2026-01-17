import { ReactNode } from "react";
import { LucideIcon, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  children: ReactNode;
}

const ToolLayout = ({ title, description, icon: Icon, gradient, children }: ToolLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Back link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Tools</span>
          </Link>

          {/* Tool Header */}
          <div className="flex items-start gap-6 mb-10">
            <div className={`w-16 h-16 rounded-2xl ${gradient} flex items-center justify-center shadow-lg shrink-0`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
              <p className="text-lg text-muted-foreground">{description}</p>
            </div>
          </div>

          {/* Tool Content */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ToolLayout;
