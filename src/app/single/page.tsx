"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import FloatingHearts from "@/components/FloatingHearts";
import { encodeData } from "@/lib/utils";

const styles = [
  { id: "funny", label: "Funny 😄", emoji: "😄", color: "bg-orange-100 border-orange-200" },
  { id: "romantic", label: "Romantic 💘", emoji: "💘", color: "bg-pink-100 border-pink-200" },
  { id: "dramatic", label: "Dramatic 🎭", emoji: "🎭", color: "bg-purple-100 border-purple-200" },
];

const funnyLines = [
  "Are you a Wi-Fi signal? Because I'm feeling a connection! 📶",
  "If you were a triangle, you'd be acute one. 📐",
  "I'm not a photographer, but I can definitely picture us together. 📸",
  "Are you French? Because Eiffel for you. 🥖",
  "Do you have a map? I just got lost in your eyes. 🗺️",
];

const romanticLines = [
  "You make my world brighter every single day. ✨",
  "Every moment with you is like a dream come true. 🌙",
  "I never knew what love was until I met you. ❤️",
  "You're the missing piece to my puzzle. 🧩",
];

const dramaticLines = [
  "My heart beats only for you, in the silence of the night. 🌑",
  "I would travel across galaxies just to see your smile. 🌌",
  "Our love is written in the stars, eternal and deep. 🌠",
];

export default function SinglePage() {
  const [name, setName] = useState("");
  const [style, setStyle] = useState("romantic");
  const [message, setMessage] = useState("");
  const [shareLink, setShareLink] = useState("");

  const handleSuggest = () => {
    let suggestions = romanticLines;
    if (style === "funny") suggestions = funnyLines;
    if (style === "dramatic") suggestions = dramaticLines;
    
    const random = suggestions[Math.floor(Math.random() * suggestions.length)];
    setMessage(random);
  };

  const generateLink = () => {
    const data = { n: name, s: style, m: message, t: "p" }; // t: p for proposal
    const encoded = encodeData(data);
    const url = `${window.location.origin}/proposal/${encoded}`;
    setShareLink(url);
  };

  return (
    <main className="min-h-screen py-12 px-4 flex flex-col items-center">
      <FloatingHearts />
      
      <div className="z-10 max-w-4xl w-full flex flex-col md:flex-row gap-8">
        {/* Form Section */}
        <div className="flex-1 glass p-8 rounded-3xl shadow-xl border-2 border-white">
          <Link href="/" className="text-accent-pink font-bold hover:underline mb-4 inline-block">
            ← Back to Start
          </Link>
          <h2 className="text-3xl font-bold text-accent-pink mb-6">Create Your Proposal 💌</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2 ml-1">Your Crush's Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter their name..."
                className="w-full px-4 py-3 rounded-2xl border-2 border-primary-pink/20 focus:border-accent-pink outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold mb-2 ml-1">Proposal Style</label>
              <div className="grid grid-cols-3 gap-3">
                {styles.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStyle(s.id)}
                    className={`py-3 px-2 rounded-2xl border-2 transition-all text-sm font-bold ${
                      style === s.id 
                        ? "border-accent-pink bg-accent-pink text-white shadow-md" 
                        : "border-primary-pink/10 bg-white hover:border-primary-pink/30"
                    }`}
                  >
                    <span className="block text-xl mb-1">{s.emoji}</span>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-end mb-2 ml-1">
                <label className="text-sm font-bold">Your Message</label>
                <button 
                  onClick={handleSuggest}
                  className="text-xs bg-secondary-pink/30 hover:bg-secondary-pink/50 px-2 py-1 rounded-lg transition-all"
                >
                  Suggest a line ✨
                </button>
              </div>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write something sweet or funny..."
                rows={4}
                className="w-full px-4 py-3 rounded-2xl border-2 border-primary-pink/20 focus:border-accent-pink outline-none transition-all resize-none"
              />
            </div>
            
            <button 
              onClick={generateLink}
              disabled={!name || !message}
              className="w-full py-4 bg-accent-pink text-white font-bold rounded-2xl shadow-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Generate Shareable Link 🚀
            </button>
            
            {shareLink && (
              <div className="mt-4 p-4 bg-white/50 rounded-2xl border-2 border-dashed border-accent-pink animate-in fade-in slide-in-from-top-4">
                <p className="text-xs font-bold text-accent-pink mb-2 uppercase">Your Proposal is Ready!</p>
                <div className="flex gap-2">
                  <input 
                    readOnly 
                    value={shareLink} 
                    className="flex-1 bg-white px-3 py-2 rounded-xl text-sm border-none outline-none overflow-hidden text-ellipsis"
                  />
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(shareLink);
                      alert("Link copied to clipboard! 💖");
                    }}
                    className="bg-accent-pink text-white px-4 py-2 rounded-xl text-sm font-bold hover:brightness-110"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Preview Section */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="w-full max-w-sm glass aspect-[4/5] rounded-[3rem] shadow-2xl overflow-hidden border-4 border-white flex flex-col p-8 text-center animate-bounce-subtle">
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-6xl mb-6">
                {style === "funny" ? "🤡" : style === "romantic" ? "💝" : "🌹"}
              </div>
              <h3 className="text-2xl font-bold text-accent-pink mb-4 italic">
                {name ? `Dear ${name},` : "Dear Someone Special,"}
              </h3>
              <p className="text-lg text-foreground/80 leading-relaxed">
                {message || "Your beautiful proposal will appear here..."}
              </p>
            </div>
            <div className="mt-8">
              <div className="h-1 w-20 bg-accent-pink/30 mx-auto rounded-full mb-4" />
              <p className="text-sm font-bold text-accent-pink/60 uppercase tracking-widest">
                Will you be mine?
              </p>
            </div>
          </div>
          
          <div className="absolute top-10 right-10 text-3xl animate-pulse">✨</div>
          <div className="absolute bottom-10 left-10 text-3xl animate-pulse delay-700">💖</div>
          <div className="absolute top-1/2 left-0 text-3xl animate-pulse delay-300 -translate-x-full">🌸</div>
        </div>
      </div>
    </main>
  );
}

