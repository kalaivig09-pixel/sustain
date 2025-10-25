// Minimal local declaration for embla-carousel-react
// This avoids trying to fetch @types/embla-carousel-react from npm (there is no @types package published).
declare module 'embla-carousel-react' {
  // Library provides its own types in recent versions; fall back to 'any' here if needed.
  const value: any;
  export default value;
}
