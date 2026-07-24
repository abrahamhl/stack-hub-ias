# Interaction patterns

Use these as original pattern specifications, not component copies.

## 1. Material field

Inspired by liquid and shader-based hero scenes.

- Best for: a single brand object, event hero, product reveal, music visualizer.
- Pointer: the field reacts softly to position and velocity.
- Keyboard/touch: arrow keys or a labeled intensity control alter the field;
  tap toggles a bounded pulse.
- Reduced motion: static rendered frame or slow opacity-only light shift.
- Low power: poster image or CSS gradient; load WebGL after core content.
- Avoid: checkout, forms, long reading, or any page without a canvas fallback.

## 2. ASCII relief

A 3D object is rendered as characters, pixels, halftone, or terminal cells.

- Best for: cyberpunk identity, model viewer, avatar, product artifact.
- Pointer: drag rotates; wheel zoom is optional and bounded.
- Keyboard/touch: arrow-key rotation, plus/minus zoom, drag gesture, reset button.
- TV: D-pad rotates by fixed steps; selected control remains visible.
- Reduced motion: static angle with a meaningful text description.
- Budget: lazy-load the model and renderer; cap pixel ratio and frame rate.

## 3. Narrative path

An SVG stroke or lightweight 3D line reveals progress through a story.

- Best for: roadmaps, case studies, timelines, learning flows, project journeys.
- Scroll: path length maps to real section progress, not arbitrary page height.
- Keyboard: Page Down, Space, headings, and skip links traverse the same story.
- Touch: native scroll; no horizontal lock.
- Reduced motion: complete path is visible, current section uses a static marker.
- Avoid: path crossing body copy or obscuring focus targets.

## 4. Viewport takeover

Hover, focus, or activation of a key object changes the surrounding scene.

- Use one takeover region per viewport.
- Keep the selected item readable before, during, and after the transition.
- `hover` previews; `focus-visible` previews; click/tap pins; Escape unpins.
- Never trigger navigation merely by entering a region.
- Keep global navigation and safe exit available.
- On small screens, convert takeover to an explicit scene selector.

## 5. Layered construction

Cards, panels, cutouts, masks, depth planes, and parallax form a spatial story.

- Use depth to explain hierarchy or sequence, not as decoration everywhere.
- Limit pointer parallax to a few pixels and remove it in reduced-motion mode.
- Keep text on a stable plane with sufficient contrast.
- Collapse layers into a linear reading order on narrow screens.

## 6. Expand-on-intent

Items expand when the user indicates intent.

- Desktop: hover and focus-within.
- Touch: tap selects, second action opens if navigation is involved.
- Keyboard/TV: roving focus only for true composite widgets; otherwise normal
  tab order.
- Expanded size must not push the active control offscreen.

## 7. Cursor or media trail

- Decorative only; never replace the pointer or expose hidden information.
- Disable for coarse pointers, reduced motion, low-power mode, and form fields.
- Cap item count and remove stale nodes.
- Prefer transforms and opacity; avoid layout reads on every pointer event.

## 8. Scene transition

Morph one layout, palette, object, or camera into another.

- Show state and direction before transition.
- Preserve focus or move it intentionally to the new heading.
- Use the View Transitions API only as progressive enhancement.
- Provide a direct route for back/forward navigation.

## Verification card

For every pattern record:

| Gate | Evidence |
|---|---|
| User purpose | What becomes clearer or more memorable |
| Pointer | Hover, drag, cursor, wheel |
| Keyboard | Focus, activation, Escape, arrows |
| Touch | Tap, swipe, native scroll |
| TV | D-pad order and target size |
| Reduced motion | Static or opacity-only result |
| Low power | Poster/CSS fallback |
| Performance | Load boundary and frame budget |
| Safety | No hidden critical action or data |
