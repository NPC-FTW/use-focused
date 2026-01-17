import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InfographicGenerator from "./pages/InfographicGenerator";
import TextAI from "./pages/TextAI";
import ImageGenerator from "./pages/ImageGenerator";
import ResearchAI from "./pages/ResearchAI";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/infographic" element={<InfographicGenerator />} />
          <Route path="/text-ai" element={<TextAI />} />
          <Route path="/image-generator" element={<ImageGenerator />} />
          <Route path="/research" element={<ResearchAI />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
