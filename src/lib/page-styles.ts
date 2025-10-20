//Shared pagelevel style constants

// Content container styles - Main content area
export const CONTENT_CONTAINER_CLASSES = [
  "flex",
  "flex-col",
  "items-center",
  "gap-[var(--component-page-gap-section)]",
  "flex-1",
  "justify-start",
  "min-h-screen",
  "w-full",
  "max-w-md",
].join(" ");

// Text section styles - Grouped heading and description
export const TEXT_SECTION_CLASSES = [
  "flex",
  "flex-col",
  "gap-[var(--component-page-gap-default)]",
  "self-stretch",
].join(" ");

// Heading styles - H1 title
export const HEADING_CLASSES = [
  "self-stretch",
  "text-[color:var(--semantic-text-primary)]",
  "text-center",
  "text-[length:var(--semantic-text-size-h1)]",
  "font-[var(--semantic-text-weight-regular)]",
].join(" ");

// Description styles - Subtitle/description text
export const DESCRIPTION_CLASSES = [
  "self-stretch",
  "text-[color:var(--semantic-text-secondary)]",
  "text-center",
  "text-[length:var(--semantic-text-size-body)]",
  "font-[var(--semantic-text-weight-light)]",
].join(" ");

// Logo container styles - For page logos
export const LOGO_CONTAINER_CLASSES = [
  "flex",
  "max-h-[56px]",
  "min-h-full",
  "flex-col",
  "items-center",
].join(" ");

// Logo image styles - For logo images
export const LOGO_IMAGE_CLASSES = [
  "flex",
  "min-h-full",
  "max-h-[56px]",
  "aspect-[368.11/56.00]",
  "shrink-0",
].join(" ");

// Footer logo container styles - Smaller logo for footer
export const FOOTER_LOGO_CONTAINER_CLASSES = [
  "flex",
  "max-h-[24px]",
  "min-h-full",
  "flex-col",
  "justify-center",
  "items-center",
  "self-stretch",
  "shrink-0",
].join(" ");

// Footer logo image styles
export const FOOTER_LOGO_IMAGE_CLASSES = [
  "min-h-[24px]",
  "flex-1",
  "aspect-[157.76/24]",
].join(" ");
