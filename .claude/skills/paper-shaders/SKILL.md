---
name: paper-shaders
description: Animated GPU shader backgrounds and textures (mesh gradient, dot orbit, grain, halftone, metal, liquid effects) from Paper Shaders for React or vanilla JS. Use for hero backgrounds, motion textures, masked text/shape fills, or shader layers inside HyperFrames, Remotion or Three.js videos.
---

# Paper Shaders

Zero-dependency canvas shaders by Paper Design (Apache-2.0).
Docs and live examples: https://shaders.paper.design/

## Install (pin exactly; upstream ships breaking changes under 0.0.x)

```bash
npm i @paper-design/shaders-react@0.0.82     # React
npm i @paper-design/shaders@0.0.82           # vanilla JS
```

Version 0.0.82 verified on npm 2026-11-11 (`npm view`), source: npm registry.

## Use

```jsx
import { MeshGradient } from '@paper-design/shaders-react';
<MeshGradient colors={['#5100ff','#00ff80','#ffcc00','#ea00ff']}
  distortion={1} swirl={0.8} speed={0.2} style={{ width: '100%', height: '100%' }} />
```

- Explore the full component list in the docs before inventing a shader; prefer
  an existing one and tune its props.
- `speed={0}` gives a deterministic still; for **video**, drive time from the
  frame clock of the renderer (HyperFrames/Remotion) instead of wall-clock so
  renders are reproducible. Check the component's time/frame prop in the docs.
- Accessibility: respect `prefers-reduced-motion` in web use; shaders are decorative.
- Figma MCP also exposes shader tools (`create_shader`, `get_shader`) when
  authenticated, useful to design a look and export code.
