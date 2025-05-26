"use client";

import React from "react";


export default function LeafAnimations() {
  return (
    <div className="leaf-container">
      {[...Array(10)].map((_, i) => (
        <img
          key={i}
          src="/leaf.svg"
          alt="Leaf"
          className={`leaf leaf-${i + 1}`}
          draggable="false"
        />
      ))}
    </div>
  );
}
