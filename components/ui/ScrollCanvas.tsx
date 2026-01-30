
import React, { useRef, useEffect, useState } from 'react';

interface ScrollCanvasProps {
  frameCount: number;
  width?: number;
  height?: number;
  className?: string;
  imagePath: (index: number) => string;
}

const ScrollCanvas: React.FC<ScrollCanvasProps> = ({ 
  frameCount, 
  width = 1920, 
  height = 1080,
  className = "",
  imagePath 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const requestRef = useRef<number>();

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = imagePath(i);
        img.onload = () => {
            loadedCount++;
            if (loadedCount === frameCount) {
                setImagesLoaded(true);
            }
        };
        imgArray.push(img);
    }
    setImages(imgArray);
  }, [frameCount, imagePath]);

  // Draw frame based on scroll
  const renderFrame = () => {
    if (!canvasRef.current || !imagesLoaded || images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const html = document.documentElement;
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;
    
    // Clamp frame index
    const frameIndex = Math.min(
      frameCount - 1,
      Math.ceil(scrollFraction * frameCount)
    );

    const img = images[frameIndex];
    if (img) {
        // Calculate aspect ratio to cover the canvas
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
            img, 
            0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
    }

    requestRef.current = requestAnimationFrame(renderFrame);
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {}); // Force update? No, rAF handles it.
    
    // Start animation loop
    requestRef.current = requestAnimationFrame(renderFrame);

    // Initial draw when loaded
    if(imagesLoaded) {
       renderFrame();
    }

    return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        window.removeEventListener('scroll', () => {}); 
    };
  }, [imagesLoaded, images]);

  // Resize canvas handler
  useEffect(() => {
    const handleResize = () => {
        if(canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
        }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Init
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed top-0 left-0 w-full h-full -z-10 object-cover ${className}`}
    />
  );
};

export default ScrollCanvas;
