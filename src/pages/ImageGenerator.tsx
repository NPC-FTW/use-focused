import { Image, Wand2, Download, Loader2, ZoomIn, X } from "lucide-react";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [style, setStyle] = useState("photorealistic");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const { toast } = useToast();

  const aspectRatios = [
    { value: "1:1", label: "Square (1:1)" },
    { value: "16:9", label: "Landscape (16:9)" },
    { value: "9:16", label: "Portrait (9:16)" },
    { value: "4:5", label: "Social (4:5)" },
  ];

  const styles = [
    { value: "photorealistic", label: "Photorealistic" },
    { value: "illustration", label: "Illustration" },
    { value: "3d", label: "3D Render" },
    { value: "abstract", label: "Abstract" },
    { value: "minimalist", label: "Minimalist" },
  ];

  const examplePrompts = [
    "Modern office workspace with laptop and coffee",
    "Abstract colorful marketing banner with geometric shapes",
    "Professional business team meeting in bright office",
    "Creative product showcase with dramatic lighting",
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe what you want to generate",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setImageUrl(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt, style, aspectRatio },
      });

      if (error) throw error;

      if (data?.imageUrl) {
        setImageUrl(data.imageUrl);
        toast({
          title: "Image generated!",
          description: "Your image is ready",
        });
      } else {
        throw new Error("No image received");
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!imageUrl) return;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const timestamp = new Date().toISOString().slice(0, 10);
      link.download = `hoski-image-${timestamp}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      toast({
        title: "Download started",
        description: "Your image is being downloaded",
      });
    } catch (err) {
      toast({
        title: "Download failed",
        description: "Failed to download image",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Image Generator"
      description="Generate stunning marketing visuals and creative assets with AI"
      icon={Image}
      gradient="bg-gradient-to-br from-pink-500 to-rose-500"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          {/* Prompt Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Describe your image
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., A modern office workspace with a laptop, coffee, and plants, soft natural lighting, minimalist aesthetic..."
              className="w-full h-32 px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              disabled={isLoading}
            />
          </div>

          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((examplePrompt, i) => (
              <button
                key={i}
                onClick={() => setPrompt(examplePrompt)}
                disabled={isLoading}
                className="px-3 py-1.5 text-xs rounded-lg bg-secondary border border-border hover:border-primary/50 transition-colors disabled:opacity-50"
              >
                {examplePrompt.slice(0, 35)}...
              </button>
            ))}
          </div>

          {/* Aspect Ratio */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Aspect Ratio
            </label>
            <div className="flex flex-wrap gap-2">
              {aspectRatios.map((ar) => (
                <button
                  key={ar.value}
                  onClick={() => setAspectRatio(ar.value)}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 ${
                    aspectRatio === ar.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary border border-border hover:border-primary/50"
                  }`}
                >
                  {ar.label}
                </button>
              ))}
            </div>
          </div>

          {/* Style */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Style
            </label>
            <div className="flex flex-wrap gap-2">
              {styles.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setStyle(s.value)}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 ${
                    style === s.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary border border-border hover:border-primary/50"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate Image
              </>
            )}
          </button>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">
              Generated Image
            </label>
            <div className="flex items-center gap-2">
              {imageUrl && (
                <button
                  onClick={() => setShowZoom(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-secondary border border-border hover:border-primary/50 transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                  Preview
                </button>
              )}
              <button
                onClick={handleDownload}
                disabled={!imageUrl}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  imageUrl
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "bg-secondary opacity-50 cursor-not-allowed"
                }`}
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
          
          <div className="aspect-square rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center text-center p-4 bg-secondary/30 overflow-hidden">
            {isLoading ? (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-muted-foreground">Creating your image...</p>
              </div>
            ) : imageUrl ? (
              <div className="relative w-full h-full">
                <img
                  src={imageUrl}
                  alt="Generated image"
                  className="w-full h-full object-contain rounded-lg cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                  onClick={() => setShowZoom(true)}
                />
                {/* HOSKI Watermark */}
                <div className="absolute bottom-4 right-4 bg-gradient-to-r from-pink-500/80 to-rose-500/80 backdrop-blur-sm px-3 py-1.5 rounded">
                  <span className="font-bold text-sm text-white tracking-wide">HOSKI</span>
                </div>
              </div>
            ) : (
              <>
                <Image className="w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Your generated image will appear here
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {showZoom && imageUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowZoom(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            onClick={() => setShowZoom(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={imageUrl}
            alt="Generated - Full Size"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </ToolLayout>
  );
};

export default ImageGenerator;
