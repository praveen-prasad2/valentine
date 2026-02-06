"use client";
import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import FloatingHearts from "@/components/FloatingHearts";
import { encodeData } from "@/lib/utils";
import ShareSection from "@/components/ShareSection";

const tones = [
  { id: "sweet", label: "Cute & Sweet", emoji: "🍭", color: "bg-pink-100" },
  { id: "funny", label: "Funny & Teasing", emoji: "😜", color: "bg-yellow-100" },
  { id: "deep", label: "Deeply Romantic", emoji: "💎", color: "bg-purple-100" },
];

const messages = {
  sweet: [
    "You are my sunshine on a rainy day. ☀️",
    "I'm so lucky to have you by my side. 🍀",
    "You make every day feel like Valentine's Day. 🌹",
  ],
  funny: [
    "I love you even when I'm hungry. 🍕",
    "You're the only person I'd share my fries with. 🍟",
    "I love you more than coffee, but please don't make me prove it. ☕",
  ],
  deep: [
    "My soul recognized yours the moment we met. ✨",
    "In a world of temporary things, you are my forever. ♾️",
    "Every love story is beautiful, but ours is my favorite. 📖",
  ],
};

function CustomizeForm() {
  const searchParams = useSearchParams();
  const partnerType = searchParams.get("to") || "partner";
  
  const [name, setName] = useState("");
  const [tone, setTone] = useState("sweet");
  const [insideJoke, setInsideJoke] = useState("");
  const [message, setMessage] = useState("");
  const [shareLink, setShareLink] = useState("");

  const handleSuggest = () => {
    const suggestions = messages[tone as keyof typeof messages];
    const random = suggestions[Math.floor(Math.random() * suggestions.length)];
    setMessage(random);
  };

  const generateLink = () => {
    const data = { n: name, t: tone, j: insideJoke, m: message, p: partnerType, type: "w" }; // type: w for wish
    const encoded = encodeData(data);
    const url = `${window.location.origin}/w/${encoded}`;
    setShareLink(url);
  };

  const partnerEmoji = partnerType === "girlfriend" ? "💕" : "💙";

  return (
    <div className="z-10 max-w-5xl w-full flex flex-col lg:flex-row gap-8">
      {/* Form */}
      <div className="flex-1 glass p-8 rounded-[2.5rem] shadow-xl border-2 border-white">
        <Link href="/committed" className="text-accent-pink font-bold hover:underline mb-4 inline-block">
          ← Back
        </Link>
        <h2 className="text-3xl font-bold text-accent-pink mb-6">Customize Your Wish {partnerEmoji}</h2>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold mb-2 ml-1">Your {partnerType === 'girlfriend' ? 'Girlfriend' : 'Boyfriend'}'s Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name..."
              className="w-full px-4 py-3 rounded-2xl border-2 border-primary-pink/20 focus:border-accent-pink outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2 ml-1">Choose Tone</label>
            <div className="grid grid-cols-3 gap-2">
              {tones.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  className={`py-3 px-1 rounded-2xl border-2 transition-all text-xs font-bold ${
                    tone === t.id 
                      ? "border-accent-pink bg-accent-pink text-white" 
                      : "border-primary-pink/10 bg-white hover:border-primary-pink/30"
                  }`}
                >
                  <span className="block text-xl mb-1">{t.emoji}</span>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 ml-1">Inside Joke (Optional)</label>
            <input 
              type="text" 
              value={insideJoke}
              onChange={(e) => setInsideJoke(e.target.value)}
              placeholder="Something only you two get... 😄"
              className="w-full px-4 py-3 rounded-2xl border-2 border-primary-pink/20 focus:border-accent-pink outline-none transition-all"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-end mb-2 ml-1">
              <label className="text-sm font-bold">The Message</label>
              <button 
                onClick={handleSuggest}
                className="text-xs bg-secondary-pink/30 hover:bg-secondary-pink/50 px-2 py-1 rounded-lg transition-all font-bold"
              >
                Spark some magic ✨
              </button>
            </div>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What do you want to say?"
              rows={3}
              className="w-full px-4 py-3 rounded-2xl border-2 border-primary-pink/20 focus:border-accent-pink outline-none transition-all resize-none"
            />
          </div>
          
          <button 
            onClick={generateLink}
            disabled={!name || !message}
            className="w-full py-4 bg-accent-pink text-white font-bold rounded-2xl shadow-lg hover:brightness-110 disabled:opacity-50 transition-all"
          >
            Create Shareable Wish 🎁
          </button>
          
          {shareLink && <ShareSection url={shareLink} />}
        </div>
      </div>
      
      {/* Live Preview */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm glass aspect-square rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white/50 flex flex-col p-8 text-center relative animate-float transition-all duration-500 hover:rotate-2">
          <div className="absolute top-4 left-4 text-2xl">✨</div>
          <div className="absolute bottom-4 right-4 text-2xl">🎈</div>
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-6xl mb-4">
              {tone === "sweet" ? "🍩" : tone === "funny" ? "🍍" : "🕯️"}
            </div>
            <h3 className="text-2xl font-bold text-accent-pink mb-4">
              To my favorite {partnerType}, {name || "..."}
            </h3>
            {insideJoke && (
              <p className="text-sm font-bold text-accent-pink/60 mb-4 bg-accent-pink/5 px-3 py-1 rounded-full">
                "{insideJoke}"
              </p>
            )}
            <p className="text-lg text-foreground/80 font-medium">
              {message || "Choose a tone and get inspired..."}
            </p>
          </div>
          <div className="mt-6">
            <p className="text-xs font-bold text-accent-pink/40 uppercase tracking-widest">
              Forever & Always ❤️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomizePage() {
  return (
    <main className="min-h-screen py-12 px-4 flex flex-col items-center">
      <FloatingHearts />
      <Suspense fallback={<div>Loading...</div>}>
        <CustomizeForm />
      </Suspense>
    </main>
  );
}

