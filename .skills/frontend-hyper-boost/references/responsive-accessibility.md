# Responsive, accessibility, and trust gates

## Required viewport matrix

| Surface | Baseline | Primary risks |
|---|---:|---|
| Phone | 360 × 800 | coarse pointer, keyboard overlay, narrow reading |
| Tablet | 768 × 1024 | rotation, split layouts, mixed input |
| Desktop | 1440 × 900 | keyboard, pointer, large empty zones |
| TV/large display | 1920 × 1080 | D-pad, distance, overscan, large targets |

Also test content zoom, 200% text, landscape phone, and a short viewport.

## Accessibility gates

- Target WCAG 2.2 AA.
- Semantic landmarks, headings, labels, and native controls.
- Complete keyboard path, visible focus, logical reading order, and skip link.
- Touch targets at least 40 CSS pixels in dense tools and preferably 44.
- Status never depends on color, motion, or sound alone.
- Persistent motion has pause/stop or a quality control.
- `prefers-reduced-motion` removes nonessential translation, rotation, parallax,
  zoom, cursor trails, autoplay, and scrubbed scene choreography.
- Canvas and 3D content have an equivalent description or DOM representation.
- Focus is not trapped by visual takeovers.

## Performance gates

Use field data when available; otherwise test a throttled mid-range device.

- LCP target: 2.5 seconds or less at the 75th percentile.
- INP target: 200 milliseconds or less.
- CLS target: 0.1 or less.
- Keep interaction handlers off the main thread where practical.
- Pause offscreen rendering and cap shader/model quality.
- Do not block the primary content on a visual engine.

## Commerce and consent

- Show total price, currency, billing period, renewal, included scope, taxes or
  exclusions, cancellation, and offer conditions before commitment.
- Reject consent must be as discoverable as accept where applicable.
- Popups and banners must be dismissible, nonobstructive, and keyboard safe.
- Do not use fake urgency, disguised ads, hidden fees, or preselected extras.
- Validate current jurisdiction-specific cookie, consumer, accessibility, and
  adult-content requirements before launch.

## Adult and sensitive experiences

- Separate public portfolio material from restricted content.
- Use age and jurisdiction checks appropriate to the service.
- Provide privacy mode, content warnings, safe exit, and discreet notifications.
- Never expose real identities, account data, private prompts, or filesystem
  paths in demos, analytics, screenshots, or generated examples.
- Do not make consent ambiguous through motion or visual pressure.
