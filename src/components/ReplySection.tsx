"use client";
import React, { useState } from "react";
import { encodeData } from "@/lib/utils";
import ShareSection from "./ShareSection";

interface ReplySectionProps {
  originalSender: string;
}

const ReplySection: React.FC<ReplySectionProps> = ({ originalSender }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [replyLink, setReplyLink] = useState("");

  const handleSendReply = () => {
    const data = { 
      n: originalSender, 
      m: replyMessage, 
      t: "romantic", // default for replies
      type: "r" // type r for reply
    };
    const encoded = encodeData(data);
    const url = `${window.location.origin}/r/${encoded}`;
    setReplyLink(url);
  };

  if (replyLink) {
    return (
      <div className="mt-8 animate-in zoom-in duration-500">
        <div className="p-6 bg-green-50 rounded-3xl border-2 border-green-200 text-center">
          <h3 className="text-xl font-bold text-green-700 mb-2">Reply Created! 💌</h3>
          <p className="text-sm text-green-600 mb-4">Send this link back to {originalSender}</p>
          <ShareSection url={replyLink} />
          <button 
            onClick={() => setReplyLink("")}
            className="mt-4 text-sm text-green-700 underline font-medium"
          >
            Create another reply
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 text-center">
      {!isReplying ? (
        <button
          onClick={() => setIsReplying(true)}
          className="px-8 py-4 bg-accent-pink text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition-all flex items-center gap-2 mx-auto"
        >
          <span>💌</span> Reply to {originalSender}
        </button>
      ) : (
        <div className="glass p-8 rounded-[2.5rem] border-2 border-white text-left animate-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-2xl font-bold text-accent-pink mb-4">Write your reply ✍️</h3>
          <textarea
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            placeholder={`Say something sweet back to ${originalSender}...`}
            rows={4}
            className="w-full px-4 py-3 rounded-2xl border-2 border-primary-pink/20 focus:border-accent-pink outline-none transition-all resize-none mb-4"
          />
          <div className="flex gap-3">
            <button
              onClick={handleSendReply}
              disabled={!replyMessage}
              className="flex-1 py-4 bg-accent-pink text-white font-bold rounded-2xl shadow-lg hover:brightness-110 disabled:opacity-50 transition-all"
            >
              Generate Reply Link 🚀
            </button>
            <button
              onClick={() => setIsReplying(false)}
              className="px-6 py-4 bg-white text-foreground/60 font-bold rounded-2xl border-2 border-primary-pink/10 hover:bg-pink-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReplySection;

