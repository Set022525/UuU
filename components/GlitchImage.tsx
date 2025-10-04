import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

interface GlitchImageProps {
  src: string;
  alt: string;
  className?: string;
}

interface FaceRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export default function GlitchImage({ src, alt, className }: GlitchImageProps) {
  const [glitchActive, setGlitchActive] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageElementRef = useRef<HTMLImageElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const frameCountRef = useRef<number>(0);

  const imageRef = useCallback((node: HTMLImageElement | null) => {
    if (node) {
      imageElementRef.current = node;
      setImageLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!glitchActive || !canvasRef.current || !imageElementRef.current || !imageLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const img = imageElementRef.current;

    if (!img.complete || img.naturalWidth === 0) {
      return;
    }

    const updateCanvasSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    updateCanvasSize();

    // Face rectangle (adjust these values based on your image)
    const faceRect: FaceRect = {
      x: 500,
      y: 150,
      w: 300,
      h: 300
    };

    // Scale face rect to canvas size
    const scaleX = canvas.width / img.naturalWidth;
    const scaleY = canvas.height / img.naturalHeight;
    const scaledRect: FaceRect = {
      x: faceRect.x * scaleX,
      y: faceRect.y * scaleY,
      w: faceRect.w * scaleX,
      h: faceRect.h * scaleY
    };

    // Perlin-like noise function
    const noise = (x: number): number => {
      const n = Math.sin(x * 12.9898 + 78.233) * 43758.5453123;
      return (n - Math.floor(n));
    };

    const applyGlitch = () => {
      if (!ctx || !img) return;

      // Draw original image first
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const { x: minX, y: minY, w: faceW, h: faceH } = scaledRect;
      const faceScale = Math.max(0.5, Math.min(2.0, faceH / 150));
      const t = frameCountRef.current * 0.01;

      // Color shift noise
      const noiseShiftX = (noise(t + minX * 0.1) - 0.5) * 60 * faceScale;
      const noiseShiftY = (noise(t + minY * 0.1 + 100) - 0.5) * 60 * faceScale;

      // Create temporary canvas for face region
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = faceW;
      tempCanvas.height = faceH;
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      // Extract face region from the scaled image
      const sx = faceRect.x;
      const sy = faceRect.y;
      const sw = faceRect.w;
      const sh = faceRect.h;

      tempCtx.drawImage(img, sx, sy, sw, sh, 0, 0, faceW, faceH);

      // Get face image data for color manipulation
      const faceImageData = tempCtx.getImageData(0, 0, faceW, faceH);
      const faceData = faceImageData.data;

      // Create RGB channel separated canvases
      const redCanvas = document.createElement('canvas');
      const greenCanvas = document.createElement('canvas');
      const blueCanvas = document.createElement('canvas');
      redCanvas.width = greenCanvas.width = blueCanvas.width = faceW;
      redCanvas.height = greenCanvas.height = blueCanvas.height = faceH;

      const redCtx = redCanvas.getContext('2d');
      const greenCtx = greenCanvas.getContext('2d');
      const blueCtx = blueCanvas.getContext('2d');

      if (!redCtx || !greenCtx || !blueCtx) return;

      // Create image data for each channel
      const redImageData = redCtx.createImageData(faceW, faceH);
      const greenImageData = greenCtx.createImageData(faceW, faceH);
      const blueImageData = blueCtx.createImageData(faceW, faceH);

      // Separate RGB channels
      for (let i = 0; i < faceData.length; i += 4) {
        // Red channel only
        redImageData.data[i] = faceData[i];
        redImageData.data[i + 1] = 0;
        redImageData.data[i + 2] = 0;
        redImageData.data[i + 3] = faceData[i + 3];

        // Green channel only
        greenImageData.data[i] = 0;
        greenImageData.data[i + 1] = faceData[i + 1];
        greenImageData.data[i + 2] = 0;
        greenImageData.data[i + 3] = faceData[i + 3];

        // Blue channel only
        blueImageData.data[i] = 0;
        blueImageData.data[i + 1] = 0;
        blueImageData.data[i + 2] = faceData[i + 2];
        blueImageData.data[i + 3] = faceData[i + 3];
      }

      redCtx.putImageData(redImageData, 0, 0);
      greenCtx.putImageData(greenImageData, 0, 0);
      blueCtx.putImageData(blueImageData, 0, 0);

      // Draw color shifted channels with tint effect
      ctx.globalAlpha = 0.6;

      // Red channel shift
      ctx.drawImage(redCanvas, minX + noiseShiftX, minY + noiseShiftY);

      // Green channel shift
      ctx.drawImage(greenCanvas, minX - noiseShiftX * 1.5, minY);

      // Blue channel shift
      ctx.drawImage(blueCanvas, minX, minY - noiseShiftY * 1.5);

      ctx.globalAlpha = 1.0;

      // Glitch slices
      const numSlices = Math.floor(30 * faceScale);
      for (let i = 0; i < numSlices; i++) {
        const offsetX = (noise(frameCountRef.current * 0.05 + i + minX) - 0.5) * 200 * faceScale;
        const offsetY = (noise(frameCountRef.current * 0.05 + i + minY + 200) - 0.5) * 200 * faceScale;
        const sliceY = Math.random() * faceH;
        const sliceH = (Math.random() * 10 + 10) * faceScale;

        ctx.drawImage(
          tempCanvas,
          0, sliceY, faceW, sliceH,
          minX + offsetX, minY + sliceY + offsetY, faceW, sliceH
        );
      }

      frameCountRef.current++;
      animationFrameRef.current = requestAnimationFrame(applyGlitch);
    };

    applyGlitch();

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [glitchActive, imageLoaded]);

  const handleClick = () => {
    setGlitchActive(true);
    frameCountRef.current = 0;
  };

  return (
    <div ref={containerRef} className="relative w-full h-full cursor-pointer" onClick={handleClick}>
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        fill
        className={className}
        onLoadingComplete={() => setImageLoaded(true)}
      />
      {glitchActive && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
        />
      )}
    </div>
  );
}
