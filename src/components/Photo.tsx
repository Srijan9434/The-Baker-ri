"use client";
import { useState } from "react";

// Shows the photo if the file exists, otherwise a soft placeholder.
export default function Photo({ src, alt, className = "" }: { src?: string; alt: string; className?: string }) {
  const [bad, setBad] = useState(false);
  if (!src || bad) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-parchment to-gold/50 text-6xl ${className}`}>
        🍰
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={`object-cover ${className}`} onError={() => setBad(true)} />;
}