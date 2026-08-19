import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
  priority?: boolean;
  showText?: boolean;
}

const LOGO_SOURCES = [
  '/Jody_Story_Bailbonds_Logo.jpg',
  '/jody_story_bailbonds_logo.jpg',
  '/logo.jpg',
  '/jody_story_bailbonds.jpg'
];

export default function Logo({ className = "w-12 h-12", size = 48, priority = false, showText = false }: LogoProps) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (sourceIndex < LOGO_SOURCES.length - 1) {
      setSourceIndex(prev => prev + 1);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div 
        className={`${className} flex items-center justify-center bg-brand-surface border border-brand-primary/40 rounded-sm shadow-[0_0_12px_rgba(0,210,255,0.25)] select-none`}
        style={{ width: size, height: size, minWidth: size, minHeight: size }}
        title="Jody Story Bail Bonds"
      >
        <span className="font-serif font-black italic text-gradient-teal text-lg tracking-tight">JS</span>
      </div>
    );
  }

  return (
    <div 
      className="inline-flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
    >
      <img 
        src={LOGO_SOURCES[sourceIndex]} 
        alt="Jody Story Bail Bonds Official Logo" 
        className={`${className} object-contain hover:scale-105 transition-all duration-300 rounded-sm drop-shadow-[0_0_8px_rgba(0,210,255,0.2)]`}
        style={{ width: size, height: size, minWidth: size, minHeight: size }}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        referrerPolicy="no-referrer"
        onError={handleError}
      />
    </div>
  );
}

