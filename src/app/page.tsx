"use client";
import Link from "next/link";
import FloatingHearts from "@/components/FloatingHearts";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <FloatingHearts />
      
      <div className="z-10 max-w-2xl w-full glass p-10 rounded-3xl shadow-2xl border-2 border-white/50 animate-bounce-subtle">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-accent-pink drop-shadow-sm">
          Happy Valentine! 💖
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 text-foreground/80 font-medium">
          What’s your relationship status this Valentine’s? 💌
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link 
            href="/single"
            className="group relative px-8 py-5 bg-white rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:bg-pink-50 border-2 border-primary-pink/20"
          >
            <div className="text-4xl mb-2 group-hover:animate-bounce">💔</div>
            <div className="font-bold text-xl text-foreground">Single</div>
            <div className="text-sm text-foreground/60 mt-1">Ready to mingle (or create a proposal!)</div>
          </Link>
          
          <Link 
            href="/committed"
            className="group relative px-8 py-5 bg-accent-pink rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:brightness-110 border-2 border-white/30"
          >
            <div className="text-4xl mb-2 group-hover:animate-pulse text-white">💑</div>
            <div className="font-bold text-xl text-white">Committed</div>
            <div className="text-sm text-white/80 mt-1">Found my soulmate!</div>
          </Link>
        </div>
      </div>
      
      <p className="absolute bottom-10 text-accent-pink/60 font-medium animate-pulse">
        Made with love for your special someone 🌸
      </p>
    </main>
  );
}
