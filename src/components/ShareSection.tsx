"use client";
import React, { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

interface ShareSectionProps {
  url: string;
}

const ShareSection: React.FC<ShareSectionProps> = ({ url }) => {
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const getCanvas = async (): Promise<HTMLCanvasElement | null> => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return null;

    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(null);
        return;
      }

      const svgData = new XMLSerializer().serializeToString(svg);
      const img = new Image();
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const urlBlob = URL.createObjectURL(svgBlob);

      img.onload = () => {
        canvas.width = 600;
        canvas.height = 700;
        
        // Draw background
        ctx.fillStyle = "#fff5f7"; // background pink
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw a white card for QR
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.roundRect(50, 100, 500, 500, 40);
        ctx.fill();
        
        // Draw QR
        ctx.drawImage(img, 100, 150, 400, 400);
        
        // Draw Text
        ctx.fillStyle = "#fb6f92"; // accent-pink
        ctx.font = "bold 40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Scan to open your Valentine!", 300, 60);
        
        ctx.font = "24px Arial";
        ctx.fillStyle = "#4a1d24";
        ctx.fillText("Created with Valentine's Magic 💖", 300, 650);
        
        URL.revokeObjectURL(urlBlob);
        resolve(canvas);
      };
      img.src = urlBlob;
    });
  };

  const shareAsPhoto = async () => {
    setIsSharing(true);
    const canvas = await getCanvas();
    if (!canvas) {
      setIsSharing(false);
      return;
    }

    canvas.toBlob(async (blob) => {
      if (!blob) {
        setIsSharing(false);
        return;
      }

      const file = new File([blob], "valentine-qr.png", { type: "image/png" });
      
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: "My Valentine QR",
            text: "Scan this to see my Valentine surprise! 💖",
          });
        } catch (err) {
          console.error("Error sharing:", err);
        }
      } else {
        // Fallback to download if sharing is not supported
        const downloadLink = document.createElement("a");
        downloadLink.href = canvas.toDataURL("image/png");
        downloadLink.download = "valentine-qr.png";
        downloadLink.click();
        alert("Photo downloaded! You can now upload it to your stories. 📸");
      }
      setIsSharing(false);
    }, "image/png");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const socialLinks = [
    { name: "WhatsApp", icon: "💬", color: "bg-[#25D366]", url: `https://wa.me/?text=${encodeURIComponent("I created a Valentine for you! ❤️ " + url)}` },
    { name: "Twitter", icon: "🐦", color: "bg-[#1DA1F2]", url: `https://twitter.com/intent/tweet?text=${encodeURIComponent("Check out this Valentine I made! 💖 " + url)}` },
    { name: "Facebook", icon: "👥", color: "bg-[#1877F2]", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { name: "Reddit", icon: "🤖", color: "bg-[#FF4500]", url: `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent("I made a Valentine's surprise! 💖")}` },
  ];

  return (
    <div className="mt-8 p-6 bg-secondary-pink/10 rounded-[2rem] border border-primary-pink/20 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-xl font-bold text-accent-pink mb-4 text-center">Share the love 💕</h3>
      
      <div className="flex flex-col items-center gap-6">
        {/* QR Code Container */}
        <div className="relative p-6 bg-white rounded-3xl shadow-md border-4 border-white">
          <div className="absolute -top-2 -left-2 text-xl animate-bounce">💖</div>
          <div className="absolute -bottom-2 -right-2 text-xl animate-bounce delay-300">💝</div>
          
          <div ref={qrRef}>
            <QRCodeSVG 
              value={url} 
              size={180}
              level="H"
              includeMargin={false}
              fgColor="#fb6f92"
            />
          </div>
        </div>

        <button
          onClick={shareAsPhoto}
          disabled={isSharing}
          className="w-full py-4 bg-accent-pink text-white rounded-2xl font-bold shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-3 animate-pulse-gentle"
        >
          <span className="text-2xl">{isSharing ? "⌛" : "📸"}</span>
          {isSharing ? "Preparing Photo..." : "Share QR as Photo"}
        </button>

        <div className="grid grid-cols-4 gap-3 w-full">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center justify-center p-3 rounded-xl ${social.color} text-white hover:scale-110 transition-transform`}
              title={`Share on ${social.name}`}
            >
              <span className="text-2xl">{social.icon}</span>
              <span className="text-[10px] mt-1 font-bold">{social.name}</span>
            </a>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className={`w-full py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border-2 ${
            copied 
              ? "bg-green-100 text-green-600 border-green-200" 
              : "bg-white text-accent-pink border-accent-pink/20 hover:border-accent-pink/50"
          }`}
        >
          {copied ? "✅ Link Copied!" : "🔗 Copy Secret Link"}
        </button>
      </div>
    </div>
  );
};

export default ShareSection;
