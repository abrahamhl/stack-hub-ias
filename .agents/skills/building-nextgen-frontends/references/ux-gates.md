# UX gates

## Accessibility

- WCAG 2.2 AA target.
- Complete keyboard path and visible focus.
- `prefers-reduced-motion` removes nonessential movement.
- Pause or stop controls for persistent motion.
- Text and status never depend on color alone.
- Touch targets at least 40 CSS pixels in dense tools.

## Responsive

Test:

- 360 × 800 phone;
- 768 × 1024 tablet;
- 1440 × 900 desktop;
- 1920 × 1080 TV or large display.

TV mode requires D-pad focus order, generous targets and no hover dependency.

## Performance

Target the current Core Web Vitals good thresholds:

- LCP at or below 2.5 seconds;
- INP at or below 200 milliseconds;
- CLS at or below 0.1;
- evaluate at the 75th percentile when field data exists.

## Commercial flows

- State price, billing period, inclusions and renewal clearly.
- Make reject consent as discoverable as accept where applicable.
- Avoid forced urgency, disguised ads and obstructive popups.
- Validate jurisdiction-specific consumer, cookie and adult-content rules
  before launch.
