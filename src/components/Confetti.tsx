"use client";
import React, { useEffect, useState } from "react";

const Confetti = () => {
  const [particles, setParticles] = useState<{ id: number; left: string; color: string; delay: string; duration: string; size: string }[]>([]);

  useEffect(() => {
    const colors = ["bg-pink-400", "bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-purple-400", "bg-green-400"];
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: `${Math.random() * 2}s`,
      duration: `${Math.random() * (4 - 2) + 2}s`,
      size: `${Math.random() * (12 - 6) + 6}px`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute top-[-20px] ${p.color} rounded-sm opacity-80 animate-confetti`}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Confetti;

