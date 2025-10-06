# NextPlot - Real Estate Platform PRD

NextPlot is a comprehensive real estate platform that presents properties as products with card listings, detail pages, search/filtering system, multi-platform sharing (Line/Facebook/Email/WeChat), customer forms (with PDPA consent), and mock admin UI for user rights management (RBAC) and publishing controls.

**Experience Qualities**:
1. **Professional** - Clean, trustworthy interface that instills confidence in high-value real estate transactions
2. **Accessible** - Multi-language support (TH/EN/ZH) with WCAG 2.2 AA compliance for all users
3. **Secure** - PDPA-compliant data handling with sensitive document protection and proper consent flows

**Complexity Level**: Light Application (multiple features with basic state)
- Handles property listings, filtering, sharing, and lead forms while maintaining simplicity and performance

## Essential Features

### Property Listing & Display
- **Functionality**: Display properties in card format with cover images, pricing, area, status, and zoning information
- **Purpose**: Allow users to quickly browse and evaluate available properties
- **Trigger**: Landing on homepage or applying search filters
- **Progression**: View grid → Apply filters → Browse cards → Click for details → View full property
- **Success criteria**: Properties load within 2s, filters work correctly, images display properly

### Multi-Platform Sharing
- **Functionality**: Share property listings to Line, Facebook, Email, WeChat with UTM tracking
- **Purpose**: Enable viral marketing and track conversion sources
- **Trigger**: Clicking share button on property details
- **Progression**: Click share → Choose platform → Generate UTM link → Share externally → Track engagement
- **Success criteria**: All platforms work, UTM parameters attached, WeChat shows QR code

### Lead Generation Form
- **Functionality**: Capture customer information with PDPA consent and anti-spam protection
- **Purpose**: Convert interested visitors into qualified leads
- **Trigger**: Clicking contact button or requesting sensitive documents
- **Progression**: Click contact → Fill form → Accept PDPA → Submit → Receive confirmation
- **Success criteria**: Form validates properly, PDPA consent required, honeypot prevents spam

### Document Security (Soft Gate)
- **Functionality**: Protect sensitive documents behind consent forms with watermarked previews
- **Purpose**: Comply with PDPA while providing necessary property information
- **Trigger**: Attempting to access sensitive property documents
- **Progression**: Request document → Complete form → Accept terms → Receive time-limited access
- **Success criteria**: Sensitive docs hidden, previews watermarked, access logged

### Multilingual Support
- **Functionality**: Full Thai, English, and Chinese language support with locale persistence
- **Purpose**: Serve diverse customer base and international investors
- **Trigger**: Selecting language from dropdown menu
- **Progression**: Select language → Interface updates → Preference saved → Consistent experience
- **Success criteria**: All text translates, locale saves to localStorage, HTML lang updates

## Edge Case Handling
- **Network Failures**: Retry mechanisms and offline-friendly cached content
- **Large Images**: Progressive loading with WebP/AVIF fallbacks and skeleton placeholders
- **Mobile Sharing**: Web Share API with platform-specific fallbacks for unsupported devices
- **Form Validation**: Real-time validation with clear error messages and accessibility announcements
- **Document Access**: Graceful degradation when signed URLs expire with re-request options

## Design Direction
The design should feel luxurious and trustworthy like premium real estate marketing materials, with a sophisticated gray-gold color scheme that conveys stability and value. Minimal interface better serves the core purpose by focusing attention on property content rather than UI chrome.

## Color Selection
Custom palette with luxury gray-gold theme for high-end real estate market positioning.

- **Primary Color**: Deep Charcoal (#2E2E2E) - conveys sophistication and stability for real estate
- **Secondary Colors**: Medium Gray (#3A3A3A) for content blocks, Light Gray (#E5E5E5) for secondary text
- **Accent Color**: Luxury Gold (#C9A14A) for CTAs, highlights, and brand elements that demand attention
- **Foreground/Background Pairings**:
  - Background (#2E2E2E): White text (#FFFFFF) - Ratio 12.6:1 ✓
  - Card (#3A3A3A): White text (#FFFFFF) - Ratio 9.8:1 ✓  
  - Primary (#2E2E2E): White text (#FFFFFF) - Ratio 12.6:1 ✓
  - Gold (#C9A14A): Black text (#111111) - Ratio 7.2:1 ✓
  - Muted (#E5E5E5): Dark text (#2E2E2E) - Ratio 12.6:1 ✓

## Font Selection
System font stack prioritizing Thai language support and cross-platform consistency without external dependencies.

- **Typographic Hierarchy**:
  - H1 (Hero Title): System-ui Bold/32px/tight letter spacing
  - H2 (Section Headers): System-ui Bold/24px/normal spacing  
  - H3 (Property Titles): System-ui Semibold/20px/normal spacing
  - Body Text: System-ui Regular/16px/relaxed line-height
  - Property Price: System-ui Bold/18px/tight spacing
  - Form Labels: System-ui Medium/14px/normal spacing

## Animations
Subtle and purposeful animations that enhance usability without feeling flashy, appropriate for professional real estate context.

- **Purposeful Meaning**: Smooth transitions communicate state changes and guide user attention to important actions like form submission or property sharing
- **Hierarchy of Movement**: Property cards get hover animations, modals slide in smoothly, form validation shows gentle feedback, loading states use skeleton placeholders

## Component Selection
- **Components**: Card components for properties, Modal for details, Form components with validation, Button variants (primary gold, secondary gray), Badge for property status, Tooltip for area calculations
- **Customizations**: Property status badges with color coding, zoning color swatches with accessibility labels, multi-platform share button groups
- **States**: Buttons have hover/focus/disabled states, form inputs show validation states, property cards indicate favorite status
- **Icon Selection**: Phosphor icons for sharing (share, heart, map), form icons (user, phone, email), navigation (chevron, close)
- **Spacing**: Consistent 8px grid system using Tailwind spacing scale (gap-2, p-4, m-6)
- **Mobile**: Property cards stack vertically, modal becomes full-screen, form fields expand to full width, touch targets minimum 44px