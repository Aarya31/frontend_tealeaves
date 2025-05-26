"use client";
import React, { useEffect, useRef } from "react";

export default function NatureSound() {
  const audioRef = useRef(null);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.1;
        audioRef.current.play().catch(() => {});
      }
      // Remove listener after first interaction
      window.removeEventListener("click", handleUserInteraction);
    };

    // Listen for first interaction
    window.addEventListener("click", handleUserInteraction);
    
    return () => window.removeEventListener("click", handleUserInteraction);
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src="/nature-sound.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}
