# Climate Action Pledge Microsite - Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from impactful environmental and social impact platforms (Charity: Water, WWF, Kickstarter) combined with modern SaaS clarity. The design should feel hopeful, empowering, and community-driven rather than corporate or preachy.

**Core Principles**:
- Inspire action through optimism, not fear
- Make impact visible and tangible
- Build trust through transparency
- Celebrate community participation
- Remove friction from pledge-taking

---

## Typography System

**Font Families**:
- **Primary (Headings)**: Inter Bold/ExtraBold for headlines and impact statements
- **Secondary (Body)**: Inter Regular/Medium for all body text, form labels, and descriptions
- **Accent (Numbers/Stats)**: Inter SemiBold for KPI displays

**Type Scale**:
- Hero Headline: text-5xl md:text-6xl lg:text-7xl font-extrabold
- Section Headlines: text-3xl md:text-4xl font-bold
- Subsections: text-xl md:text-2xl font-semibold
- Body Large: text-lg md:text-xl
- Body Standard: text-base
- Captions/Labels: text-sm
- Small Print: text-xs

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32 for consistency
- Component padding: p-6 md:p-8
- Section spacing: py-16 md:py-24 lg:py-32
- Element gaps: gap-4, gap-6, gap-8
- Container margins: mx-4 md:mx-8 lg:mx-auto

**Container Strategy**:
- Full-width sections: w-full with inner max-w-7xl mx-auto px-4 md:px-8
- Content sections: max-w-6xl mx-auto
- Form containers: max-w-2xl mx-auto
- Text-heavy content: max-w-3xl

---

## Section-by-Section Design

### 1. Hero Section
**Layout**: Full-width with image background, centered content overlay
- Height: min-h-[85vh] for strong first impression
- Content: Vertically and horizontally centered
- Headline positioning: Large, bold text with breathing room (mb-6)
- Subheadline: Concise impact statement (max-w-2xl, text-lg md:text-xl, mb-8)
- CTA Button: Large, prominent with blur backdrop (px-8 py-4, text-lg font-semibold, backdrop-blur-md)
- Visual treatment: Gradient overlay on image for text legibility

**Image**: Large hero image showing diverse group of young people engaged in climate action (community garden, beach cleanup, or tree planting) - authentic, hopeful, not stock photo feeling

### 2. Live KPIs Section
**Layout**: Grid display immediately below hero
- Desktop: 4-column grid (grid-cols-2 lg:grid-cols-4)
- Each KPI card: Rounded container with generous padding (p-8)
- Vertical stack: Large number on top, label below
- Number styling: text-4xl md:text-5xl font-bold with animated counter
- Label styling: text-sm md:text-base uppercase tracking-wide
- Spacing: gap-6 between cards
- Visual separator: Subtle border or shadow on cards

### 3. Why Take Climate Action
**Layout**: Centered content block
- Container: max-w-4xl mx-auto
- Headline: Centered, mb-8
- Content: 2-column grid on desktop (grid-cols-1 md:grid-cols-2, gap-12)
- Left column: Key impact statistics or facts (larger text-lg)
- Right column: Personal responsibility narrative
- Include small iconography or illustrations (3-4 simple icons representing impact areas)

### 4. Pledge Form Section
**Layout**: Clean, welcoming form design
- Container: max-w-2xl mx-auto with ample padding
- Headline: text-3xl font-bold mb-4, centered
- Subtext: Encouraging message (mb-12)
- Field spacing: space-y-6 for breathing room
- Input styling: Full-width with comfortable height (h-12), rounded corners (rounded-lg), clear labels above each field
- Label hierarchy: font-medium mb-2
- Privacy note: Small text with lock icon, positioned near mobile/email fields

**Commitment Themes Structure**:
- 3 distinct theme sections with visual separation (border-t pt-8 mt-8)
- Each theme: Bold heading (text-lg font-semibold mb-4)
- Checkbox grid: 3 commitments per theme in vertical stack
- Checkbox design: Custom large clickable area with label spacing (gap-3)
- Visual feedback: Clear selected state

**Submit Button**: 
- Full-width or large centered button (w-full md:w-auto px-12 py-4)
- Positioned with top margin (mt-12)
- Clear success state after submission

### 5. Certificate Generator
**Layout**: Modal or full-screen overlay after form submission
- Certificate container: max-w-2xl mx-auto with decorative border
- Certificate design: Formal yet modern feel with generous padding (p-12 md:p-16)
- Name display: Very large, centered (text-4xl md:text-5xl font-bold)
- Statement: "Cool Enough to Care!" as tagline (text-2xl)
- Hearts/Stars rating: Large, prominent display using repeated star/heart symbols based on commitment count
- Date: Bottom right corner
- Download button: Clear, prominent below certificate (mt-8)
- Close/Continue button: Secondary style

### 6. Public Pledge Wall
**Layout**: Full-width table/card hybrid
- Headline: text-3xl font-bold mb-12, centered
- Desktop: Table format with clean rows and columns
- Mobile: Card stack with all information per pledge
- Columns: Pledge ID (small), Name (emphasized), Date, State, Profile Type, Love Rating (hearts/stars)
- Row styling: Alternating subtle backgrounds for readability, comfortable padding (py-4 px-6)
- Recent pledges at top with subtle highlight
- Pagination or "Load More" if many entries
- Empty state: Encouraging message when no pledges yet

### 7. Footer
**Layout**: Multi-column on desktop, stacked on mobile
- Container: Full-width with max-w-7xl mx-auto
- Left section: Privacy statement in readable format (max-w-prose)
- Right section: Contact info or social links
- Clear visual hierarchy between sections
- Modest padding (py-16)

---

## Component Library

### Buttons
- **Primary CTA**: Large touch target (min-h-[48px]), rounded-lg, font-semibold, backdrop-blur when on images
- **Secondary**: Outlined variant with same sizing
- **Icon buttons**: Square (w-12 h-12) for close/download actions

### Form Inputs
- **Text inputs**: h-12, rounded-lg, border, px-4, focus state with ring
- **Checkboxes**: Large custom design (w-5 h-5) with label spacing
- **Dropdowns**: Matching input height with clear arrow indicator

### Cards
- **KPI Cards**: Rounded-xl, p-8, shadow or border for depth
- **Pledge Cards** (mobile): Rounded-lg, p-6, clear information hierarchy

### Badges/Tags
- Profile type indicators: Rounded-full px-4 py-1 text-sm
- Hearts/Stars rating: Inline display with consistent sizing

---

## Images

1. **Hero Image**: Full-width background image showing diverse young people engaged in positive climate action (community garden, renewable energy installation, or nature restoration). Should feel authentic, hopeful, and action-oriented. Position: Background of hero section with gradient overlay.

2. **Why Take Action Icons** (optional): 3-4 simple line icons representing climate impact areas (energy, transportation, consumption, nature). Position: Within the Why Take Action section content.

---

## Animations

**Minimal and Purposeful**:
- KPI counters: Animated count-up on initial view (smooth, takes 2-3 seconds)
- Form submission: Smooth transition to certificate reveal
- Pledge wall: Subtle fade-in for new entries
- No scroll-triggered animations, parallax, or excessive motion

---

## Accessibility

- All form inputs with proper labels and ARIA attributes
- Keyboard navigation fully supported throughout
- Focus states clearly visible on all interactive elements
- Certificate generator accessible via keyboard
- Table headers properly marked for screen readers
- Sufficient contrast ratios for all text
- Touch targets minimum 48x48px for mobile users