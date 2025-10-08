# NextPlot - Real Estate Platform

NextPlot is a comprehensive Thai real estate platform designed to facilitate property buying, selling, renting, and consignment services across Thailand.

**Experience Qualities**:
1. **Professional** - Clean, trustworthy interface that inspires confidence in property transactions
2. **Accessible** - Multi-language support (Thai, English, Chinese) with proper Thai typography
3. **Efficient** - Advanced search and filtering capabilities for quick property discovery

**Complexity Level**: Light Application (multiple features with basic state)
- Multi-language property listings with advanced search
- User authentication and favorites system
- Contact forms with PDPA compliance
- Theme switching and responsive design

## Essential Features

### Property Listings
- **Functionality**: Display comprehensive property information with images, pricing, and details
- **Purpose**: Allow users to browse available properties effectively
- **Trigger**: User visits homepage or searches for properties
- **Progression**: Browse listings → Filter/search → View details → Contact inquiry
- **Success criteria**: Users can easily find and view property information

### Advanced Search & Filtering
- **Functionality**: Filter by location, price range, area, property type, and status
- **Purpose**: Help users narrow down properties to their specific needs
- **Trigger**: User enters search criteria or applies filters
- **Progression**: Enter criteria → Apply filters → View filtered results → Refine search
- **Success criteria**: Search returns relevant, accurate results quickly

### Multi-language Support
- **Functionality**: Full interface translation between Thai, English, and Chinese
- **Purpose**: Serve diverse customer base in Thailand's property market
- **Trigger**: User selects language from dropdown
- **Progression**: Select language → Interface updates → Content translates
- **Success criteria**: All content displays correctly in selected language

### Contact & Lead Generation
- **Functionality**: PDPA-compliant contact forms for property inquiries
- **Purpose**: Generate qualified leads for property agents
- **Trigger**: User clicks contact button on property
- **Progression**: Click contact → Fill form → Submit → Confirmation
- **Success criteria**: Form submissions are captured and validated

### User Authentication
- **Functionality**: Login/register system with password strength validation
- **Purpose**: Enable personalized features like favorites
- **Trigger**: User clicks login/register button
- **Progression**: Click auth → Fill form → Validate → Login/register → Access features
- **Success criteria**: Users can create accounts and sign in reliably

## Edge Case Handling
- **Empty search results**: Display helpful message with option to clear filters
- **Image loading failures**: Show fallback placeholder with property icon
- **Form validation errors**: Clear, contextual error messages in user's language
- **Network connectivity issues**: Graceful degradation with cached data
- **Invalid property data**: Skip corrupted entries, log errors

## Design Direction
The design should feel professional and trustworthy while remaining approachable - balancing the seriousness of real estate transactions with the accessibility needed for diverse users. Clean, minimal interface that focuses attention on property content.

## Color Selection
Complementary (opposite colors) - Using warm gold/amber (#C9A14A) as the primary accent against neutral grays, creating a premium feel that suggests value and trust.

- **Primary Color**: Warm gold (#C9A14A) - communicates value, premium service, and prosperity
- **Secondary Colors**: Neutral grays for backgrounds and supporting elements
- **Accent Color**: Warm gold for CTAs, highlights, and important interactive elements
- **Foreground/Background Pairings**: 
  - Background (Light gray #F8F8F8): Dark text (#262626) - Ratio 15.8:1 ✓
  - Card (Off-white #F5F5F5): Dark text (#262626) - Ratio 14.2:1 ✓
  - Primary (Dark gray #262626): White text (#FFFFFF) - Ratio 15.8:1 ✓
  - Accent (Warm gold #C9A14A): White text (#FFFFFF) - Ratio 4.8:1 ✓

## Font Selection
System fonts with Thai language support to ensure proper rendering of Thai text while maintaining performance and readability across all supported languages.

- **Typographic Hierarchy**: 
  - H1 (Hero Title): System font Bold/48px/tight letter spacing
  - H2 (Section Headers): System font Semibold/32px/normal spacing  
  - H3 (Property Titles): System font Semibold/24px/normal spacing
  - Body Text: System font Regular/16px/relaxed line height
  - Small Text: System font Regular/14px/normal spacing

## Animations
Subtle, functional animations that enhance usability without drawing attention away from content - focusing on smooth transitions and hover states that provide feedback.

- **Purposeful Meaning**: Gentle hover effects communicate interactivity, smooth page transitions maintain context
- **Hierarchy of Movement**: Primary buttons get subtle lift effects, cards have gentle hover transforms, navigation uses smooth slides

## Component Selection
- **Components**: Cards for property listings, Dialogs for details/forms, Select dropdowns for filters, Buttons with consistent styling, Input fields with validation states
- **Customizations**: Property cards with image galleries, multi-language select component, PDPA-compliant contact forms
- **States**: Clear hover/focus states on all interactive elements, loading states for forms, error states with helpful messaging
- **Icon Selection**: Phosphor icons for consistency - house/map pins for properties, search/filter icons, social sharing icons
- **Spacing**: Consistent 4px base unit using Tailwind's spacing scale (4, 8, 12, 16, 24, 32px)
- **Mobile**: Mobile-first responsive design - stacked filters on mobile, collapsible navigation, touch-friendly 44px minimum touch targets