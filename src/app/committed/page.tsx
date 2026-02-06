"use client";
import Link from "next/link";
import FloatingHearts from "@/components/FloatingHearts";

export default function CommittedPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <FloatingHearts />
      
      <div className="z-10 max-w-2xl w-full glass p-10 rounded-3xl shadow-2xl border-2 border-white/50">
        <Link href="/" className="text-accent-pink font-bold hover:underline mb-6 block text-left">
          ← Back
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-accent-pink">
          Who is this Valentine wish for? 💕
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link 
            href="/committed/customize?to=girlfriend"
            className="group px-8 py-8 bg-white rounded-3xl shadow-lg transition-all duration-300 hover:scale-105 hover:bg-pink-50 border-2 border-primary-pink/20"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💕</div>
            <div className="font-bold text-2xl text-foreground">Girlfriend</div>
          </Link>
          
          <Link 
            href="/committed/customize?to=boyfriend"
            className="group px-8 py-8 bg-white rounded-3xl shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-50 border-2 border-blue-200/20"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💙</div>
            <div className="font-bold text-2xl text-foreground">Boyfriend</div>
          </Link>
        </div>
        
        <div className="mt-8 text-foreground/40 text-sm italic font-medium">
          “A partner in crime is all you need.” 🥂
        </div>
      </div>
    </main>
  );
}

