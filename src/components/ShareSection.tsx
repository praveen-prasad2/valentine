"use client";
import React, { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

interface ShareSectionProps {
  url: string;
}

const ShareSection: React.FC<ShareSectionProps> = ({ url }) => {
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = 500;
      canvas.height = 500;
      // White background for reliable scanning
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 50, 50, 400, 400);
      
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "valentine-qr.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="mt-8 p-6 bg-secondary-pink/10 rounded-[2rem] border border-primary-pink/20 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-xl font-bold text-accent-pink mb-4 text-center">Share the love 💕</h3>
      
      <div className="flex flex-col items-center gap-6">
        {/* QR Code Container */}
        <div className="relative p-6 bg-white rounded-3xl shadow-md border-4 border-white">
          {/* Decorative Hearts */}
          <div className="absolute -top-2 -left-2 text-xl animate-bounce">💖</div>
          <div className="absolute -bottom-2 -right-2 text-xl animate-bounce delay-300">💝</div>
          
          <div ref={qrRef}>
            <QRCodeSVG 
              value={url} 
              size={180}
              level="H"
              includeMargin={false}
              fgColor="#fb6f92" // accent-pink
            />
          </div>
        </div>

        <p className="text-sm font-medium text-foreground/60 text-center max-w-[250px]">
          Perfect for WhatsApp status or Instagram stories 📸
        </p>

        <div className="flex gap-3 w-full max-w-sm">
          <button
            onClick={handleCopy}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              copied 
                ? "bg-green-100 text-green-600 border-2 border-green-200" 
                : "bg-white text-accent-pink border-2 border-accent-pink/20 hover:border-accent-pink/50 shadow-sm"
            }`}
          >
            {copied ? (
              <><span>✅</span> Copied!</>
            ) : (
              <><span>🔗</span> Copy Link</>
            )}
          </button>
          
          <button
            onClick={downloadQR}
            className="flex-1 py-3 px-4 bg-accent-pink text-white rounded-xl font-bold shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <span>📥</span> Download QR
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareSection;

