"use client";
import React, { useEffect, useState, use } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import Confetti from "@/components/Confetti";
import { decodeData } from "@/lib/utils";
import RevealWrapper from "@/components/RevealWrapper";

export default function ReplyClient({ params }: { params: Promise<{ data: string }> }) {
  const resolvedParams = use(params);
  const [replyData, setReplyData] = useState<{ n: string; m: string } | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      const decoded = decodeData(resolvedParams.data);
      setReplyData(decoded);
    } catch (e) {
      console.error("Failed to decode reply data", e);
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

  if (!replyData) {
    return <div className="min-h-screen bg-pink-50" />;
  }

  return (
    <RevealWrapper>
      <main className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pink-50 to-white overflow-hidden">
        <FloatingHearts />
        <Confetti />
        
        <div className="z-10 w-full max-w-lg glass p-8 md:p-12 rounded-[3rem] shadow-2xl border-4 border-white text-center animate-in zoom-in duration-700">
          <div className="text-7xl mb-8 animate-pulse">💌</div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-accent-pink mb-8 italic">
            Dear {replyData.n},
          </h1>
          
          <div className="mb-12 p-6 bg-white/30 rounded-3xl border border-white/50 shadow-inner">
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-medium italic">
              "{replyData.m}"
            </p>
          </div>
          
          <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-pink/20 to-transparent mb-12" />
          
          <div className="flex flex-col items-center gap-4">
            <div className="text-3xl">💖✨💖</div>
            <p className="text-sm font-bold text-accent-pink/60 uppercase tracking-widest">A special reply just for you</p>
          </div>
        </div>
        
        <p className="mt-12 text-accent-pink/60 font-medium text-center">
          Create your own Valentine's magic 🌸 <br />
          <span className="text-xs">at <span className="underline italic">{typeof window !== 'undefined' ? window.location.origin.replace(/^https?:\/\//, '') : 'our website'}</span></span>
        </p>
      </main>
    </RevealWrapper>
  );
}

