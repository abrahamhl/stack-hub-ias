"use client";

import { useState } from "react";
import "./motion-scene.css";

const scenes = [
  { id: "signal", label: "Signal", detail: "Material field with calm fallback." },
  { id: "relief", label: "Relief", detail: "ASCII or pixel depth without hiding content." },
  { id: "path", label: "Path", detail: "A narrative line tied to real progress." },
];

export function MotionScene() {
  const [active, setActive] = useState(scenes[0].id);

  return (
    <section className="motion-scene" data-scene={active} aria-labelledby="motion-scene-title">
      <div className="motion-scene__backdrop" aria-hidden="true" />
      <div className="motion-scene__content">
        <p className="motion-scene__eyebrow">FRONTEND HYPER BOOST</p>
        <h2 id="motion-scene-title">Motion with an exit, a fallback, and a purpose.</h2>
        <div className="motion-scene__choices">
          {scenes.map((scene) => (
            <button
              key={scene.id}
              type="button"
              aria-pressed={active === scene.id}
              onFocus={() => setActive(scene.id)}
              onPointerEnter={() => setActive(scene.id)}
              onClick={() => setActive(scene.id)}
            >
              <strong>{scene.label}</strong>
              <span>{scene.detail}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
