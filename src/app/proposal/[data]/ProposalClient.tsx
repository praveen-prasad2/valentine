"use client";
import React, { useEffect, useState, use } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import Confetti from "@/components/Confetti";
import { decodeData } from "@/lib/utils";

export default function ProposalClient({ params }: { params: Promise<{ data: string }> }) {
  const resolvedParams = use(params);
  const [proposalData, setProposalData] = useState<{ n: string; s: string; m: string } | null>(null);
  const [reactions, setReactions] = useState({ love: 0, wow: 0, laugh: 0 });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      const decoded = decodeData(resolvedParams.data);
      setProposalData(decoded);
    } catch (e) {
      console.error("Failed to decode proposal data", e);
      setHasError(true);
    }
  }, [resolvedParams.data]);

  if (hasError) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-pink-50">
        <div className="glass p-10 rounded-3xl text-center max-w-md">
          <h1 className="text-4xl mb-4">🙊</h1>
          <p className="text-xl font-bold text-accent-pink">Oops! This link seems to be broken or invalid.</p>
        </div>
      </main>
    );
  }

  if (!proposalData) {
    return <div className="min-h-screen bg-pink-50" />;
  }

  const getStyleEmoji = () => {
    switch (proposalData.s) {
      case "funny": return "😄";
      case "dramatic": return "🎭";
      default: return "💘";
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pink-50 to-white overflow-hidden">
      <FloatingHearts />
      <Confetti />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-4xl animate-bounce delay-75">🌸</div>
      <div className="absolute top-20 right-20 text-4xl animate-bounce delay-300">💖</div>
      <div className="absolute bottom-20 left-1/4 text-4xl animate-bounce delay-500">✨</div>
      <div className="absolute bottom-10 right-10 text-4xl animate-bounce delay-150">💌</div>

      <div className="z-10 w-full max-w-lg glass p-8 md:p-12 rounded-[3rem] shadow-2xl border-4 border-white text-center animate-in zoom-in duration-700">
        <div className="text-7xl mb-8 animate-pulse">{getStyleEmoji()}</div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-accent-pink mb-8 italic">
          Dear {proposalData.n},
        </h1>
        
        <div className="mb-12">
          <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-medium">
            "{proposalData.m}"
          </p>
        </div>
        
        <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-pink/20 to-transparent mb-12" />
        
        <h2 className="text-2xl md:text-3xl font-bold text-accent-pink uppercase tracking-widest mb-10">
          Will you be my Valentine? 💍
        </h2>

        {/* Reactions Section */}
        <div className="space-y-4">
          <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest">How do you feel about this?</p>
          <div className="flex justify-center gap-6">
            <button 
              onClick={() => setReactions(prev => ({ ...prev, love: prev.love + 1 }))}
              className="flex flex-col items-center transition-transform hover:scale-125 active:scale-95"
            >
              <span className="text-4xl mb-1">❤️</span>
              <span className="text-xs font-bold text-foreground/60">{reactions.love}</span>
            </button>
            <button 
              onClick={() => setReactions(prev => ({ ...prev, wow: prev.wow + 1 }))}
              className="flex flex-col items-center transition-transform hover:scale-125 active:scale-95"
            >
              <span className="text-4xl mb-1">😳</span>
              <span className="text-xs font-bold text-foreground/60">{reactions.wow}</span>
            </button>
            <button 
              onClick={() => setReactions(prev => ({ ...prev, laugh: prev.laugh + 1 }))}
              className="flex flex-col items-center transition-transform hover:scale-125 active:scale-95"
            >
              <span className="text-4xl mb-1">😂</span>
              <span className="text-xs font-bold text-foreground/60">{reactions.laugh}</span>
            </button>
          </div>
        </div>
      </div>
      
      <p className="mt-12 text-accent-pink/60 font-medium">
        Create your own proposal at <span className="underline italic">valentine-magic.com</span> 🌸
      </p>
    </main>
  );
}

