import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SDSU Parking App",
  description: "An app to help SDSU students find parking spots on campus.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false, // Prevent zoom on mobile
  },
};

/**
 * Root Layout Component
 * 
 * This layout provides global styling using the design system tokens from globals.css.
 * All pages automatically inherit typography hierarchy and semantic styling.
 * 
 * // Use semantic HTML elements for automatic styling:
 * 
 * <h1>Page Title</h1>                    // Automatically styled with --semantic-text-size-h1
 * <h2>Section Heading</h2>               // Automatically styled with --semantic-text-size-h2
 * <h3>Subsection</h3>                    // Automatically styled with --semantic-text-size-h3
 * <p>Regular body text here</p>          // Automatically styled with --semantic-text-size-body
 * 
 * <a href="/path">Link text</a>          // Automatically styled as link with underline
 * <small>Caption text</small>            // Automatically styled with --semantic-text-size-caption
 * <span className="caption">Caption</span>  // Alternative caption styling
 * 
 * <p className="error">Error message</p>     // Red error text
 * <p className="secondary">Secondary text</p> // Muted/secondary text
 * <p className="muted">Muted text</p>        // Alternative muted styling
 * 
 * // For custom spacing between sections, use component page gap tokens:
 * <div className="space-y-[var(--component-page-gap-tight)]">...</div>
 * <div className="space-y-[var(--component-page-gap-default)]">...</div>
 * <div className="space-y-[var(--component-page-gap-comfortable)]">...</div>
 * <div className="space-y-[var(--component-page-gap-section)]">...</div>
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Body base styles using component and semantic tokens
  // Optimized for mobile devices with proper viewport constraints
  const bodyClassName = [
    // Font families from Tailwind base stack (system fonts)
    "font-sans",
    "tracking-normal",

    // Mobile layout foundation
    "h-screen",
    "min-w-full",
    "w-screen", // Full screen width
    "max-w-[100vw]", // Prevent horizontal overflow
    "overflow-x-hidden", // Disable horizontal scrolling
    
    // Background
    "bg-[var(--component-page-bg)]",
    
    // Typography defaults using semantic tokens
    "text-[color:var(--semantic-text-primary)]",
    "text-[length:var(--semantic-text-size-body)]",
    "font-[var(--semantic-text-weight-light)]",
    "antialiased",
  ].join(" ");

  // Main layout container using component page tokens
  // Mobile first design: fills entire mobile screen without exceeding viewport
  const layoutClassName = [
    // Layout structure
    "w-full",
    "flex",
    "flex-col",
    "items-center",
    "gap-[var(--component-page-gap-default)]", // Spacing between child elements
    
    // Mobile viewport height (fills screen when no scrolling)
    "min-h-screen",
    "min-h-[100dvh]", // Dynamic viewport height for mobile address bar
    
    // Width constraints for mobile
    "w-full",
    "max-w-[100vw]", // Never exceed viewport width
    "overflow-x-hidden", // Prevent horizontal scroll
    
    // Padding using component tokens
    "px-[var(--component-page-padding-inline)]", // Horizontal padding
    "py-[var(--component-page-padding-block)]", // Vertical padding
    
    // Typography hierarchy - Headings
    "[&_h1]:text-[length:var(--semantic-text-size-h1)]",
    "[&_h1]:font-[var(--semantic-text-weight-bold)]",
    "[&_h1]:text-[color:var(--semantic-text-primary)]",
    
    "[&_h2]:text-[length:var(--semantic-text-size-h2)]",
    "[&_h2]:font-[var(--semantic-text-weight-semibold)]",
    "[&_h2]:text-[color:var(--semantic-text-primary)]",
    
    "[&_h3]:text-[length:var(--semantic-text-size-h3)]",
    "[&_h3]:font-[var(--semantic-text-weight-semibold)]",
    "[&_h3]:text-[color:var(--semantic-text-primary)]",
    
    // Typography hierarchy - Body text
    "[&_p]:text-[length:var(--semantic-text-size-body)]",
    "[&_p]:font-[var(--semantic-text-weight-light)]",
    "[&_p]:text-[color:var(--semantic-text-primary)]",
    
    // Typography hierarchy - Caption/Small text
    "[&_caption]:text-[length:var(--semantic-text-size-caption)]",
    "[&_.caption]:text-[length:var(--semantic-text-size-caption)]",
    "[&_small]:text-[length:var(--semantic-text-size-caption)]",
    
    // Interactive elements - Links
    "[&_a]:text-[color:var(--semantic-text-link)]",
    "[&_a]:font-[var(--semantic-text-weight-regular)]",
    "[&_a:hover]:opacity-80",
    "[&_a]:transition-opacity",
    
    // State-specific text - Error
    "[&_.error]:text-[color:var(--semantic-text-error)]",
    "[&_.error]:font-[var(--semantic-text-weight-regular)]",
    
    // State-specific text - Secondary/Muted
    "[&_.secondary]:text-[color:var(--semantic-text-secondary)]",
    "[&_.muted]:text-[color:var(--semantic-text-secondary)]",
  ].join(" ");

  return (
    <html lang="en">
      <body className={bodyClassName}>
        <div className={layoutClassName}>{children}</div>
      </body>
    </html>
  );
}
