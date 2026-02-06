"use client";
import React, { useState, useEffect } from "react";

interface RevealWrapperProps {
  children: React.ReactNode;
}

const RevealWrapper: React.FC<RevealWrapperProps> = ({ children }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleReveal = () => {
    if (prefersReducedMotion) {
      setIsRevealed(true);
      return;
    }
    
    setIsAnimating(true);
    setShowBurst(true);
    
    // Smooth reveal timing
    setTimeout(() => {
      setIsRevealed(true);
      setIsAnimating(false);
    }, 800);
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRevealed(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Main Content */}
      <div 
        className={`transition-all duration-[800ms] ease-out w-full h-full ${
          !isRevealed ? "blur-xl scale-95 opacity-50" : "blur-0 scale-100 opacity-100"
        }`}
      >
        {children}
      </div>

      {/* Reveal Overlay */}
      {!isRevealed && (
        <div 
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-pink-100/40 backdrop-blur-sm transition-opacity duration-500 ${
            isAnimating ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Burst Animation Container */}
          {showBurst && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-2xl animate-heart-burst"
                  style={{
                    transform: `rotate(${i * 30}deg) translateY(-50px)`,
                  }}
                >
                  ❤️
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleReveal}
            className="group relative px-8 py-4 bg-white rounded-full shadow-xl border-2 border-accent-pink text-accent-pink font-bold text-xl transition-all hover:scale-110 active:scale-95 animate-pulse-gentle overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Tap to open your Valentine 💖
            </span>
            <div className="absolute inset-0 bg-accent-pink/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={handleSkip}
            className="mt-6 text-accent-pink/60 hover:text-accent-pink text-sm font-medium underline transition-colors"
          >
            Skip animation
          </button>
        </div>
      )}
    </div>
  );
};

export default RevealWrapper;

