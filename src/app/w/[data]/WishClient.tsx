"use client";
import React, { useEffect, useState, use } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import Confetti from "@/components/Confetti";
import { decodeData } from "@/lib/utils";
import RevealWrapper from "@/components/RevealWrapper";
import ReplySection from "@/components/ReplySection";

export default function WishClient({ params }: { params: Promise<{ data: string }> }) {
  const resolvedParams = use(params);
  const [wishData, setWishData] = useState<{ n: string; sn: string; t: string; j: string; m: string; p: string } | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      const decoded = decodeData(resolvedParams.data);
      setWishData(decoded);
    } catch (e) {
      console.error("Failed to decode wish data", e);
      setHasError(true);
    }
  }, [resolvedParams.data]);

  if (hasError) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-pink-50 text-center">
        <div className="glass p-10 rounded-3xl max-w-md border-2 border-white/50">
          <h1 className="text-4xl mb-4">🙊</h1>
          <p className="text-xl font-bold text-accent-pink">Oops! This link seems to be broken or invalid.</p>
        </div>
      </main>
    );
  }

  if (!wishData) {
    return <div className="min-h-screen bg-pink-50" />;
  }

  const getToneEmoji = () => {
    switch (wishData.t) {
      case "funny": return "😜";
      case "deep": return "💎";
      default: return "🍭";
    }
  };

  return (
    <RevealWrapper>
      <main className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pink-50 to-white overflow-hidden">
        <FloatingHearts />
        
        <div className="z-10 w-full max-w-lg glass p-8 md:p-12 rounded-[4rem] shadow-2xl border-8 border-white text-center relative">
          <Confetti />
          <div className="absolute -top-10 -right-10 text-6xl animate-bounce">🎈</div>
          <div className="absolute -bottom-10 -left-10 text-6xl animate-bounce delay-300">🎀</div>
          
          <div className="text-7xl mb-6">{getToneEmoji()}</div>
          
          <h2 className="text-sm font-black text-accent-pink uppercase tracking-[0.3em] mb-4">
            Happy Valentine's Day
          </h2>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            To my {wishData.p}, {wishData.n}!
          </h1>
          
          {wishData.j && (
            <div className="mb-8 inline-block bg-white/50 px-6 py-2 rounded-full border border-pink-100 shadow-sm">
              <span className="text-accent-pink font-bold italic">"{wishData.j}"</span>
            </div>
          )}
          
          <div className="mb-10 p-6 bg-white/30 rounded-3xl border border-white/50 shadow-inner">
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-medium italic">
              "{wishData.m}"
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="text-3xl">❤️🧡💛💚💙💜</div>
            <p className="text-sm font-bold text-accent-pink/60">Forever yours</p>
          </div>
        </div>
        
        {wishData.sn && <ReplySection originalSender={wishData.sn} />}
        
        <p className="mt-12 text-accent-pink/60 font-medium animate-pulse text-center">
          Made with love 🌸 <br />
          <span className="text-xs">Create your own at <span className="underline italic">{typeof window !== 'undefined' ? window.location.origin.replace(/^https?:\/\//, '') : 'our website'}</span></span>
        </p>
      </main>
    </RevealWrapper>
  );
}

