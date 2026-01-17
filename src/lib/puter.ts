// Utility functions for image handling

export const addWatermark = (
  imageDataUrl: string,
  watermarkText: string = "HOSKI"
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to create canvas context"));
        return;
      }

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Configure watermark style
      const fontSize = Math.max(16, img.width / 25);
      ctx.font = `bold ${fontSize}px 'Space Grotesk', sans-serif`;
      ctx.textAlign = "right";
      ctx.textBaseline = "bottom";

      // Add shadow for better visibility
      ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      // Draw watermark with gradient-like effect
      const gradient = ctx.createLinearGradient(
        img.width - 150,
        img.height,
        img.width,
        img.height - 50
      );
      gradient.addColorStop(0, "#8b5cf6");
      gradient.addColorStop(0.5, "#a855f7");
      gradient.addColorStop(1, "#ec4899");
      
      ctx.fillStyle = gradient;
      ctx.fillText(watermarkText, img.width - 20, img.height - 20);

      resolve(canvas.toDataURL("image/png"));
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageDataUrl;
  });
};

export const downloadImage = (dataUrl: string, filename: string = "hoski-generated.png") => {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
