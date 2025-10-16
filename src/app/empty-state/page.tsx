import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Button, type ButtonVariant } from "@/components/ui/button/Button";

// Constants
const BUTTON_VARIANT: ButtonVariant = "secondary";
const BUTTON_LABEL = "Home";

const METADATA = {
  title: "Under Development",
  description: "We're building this to make parking even easier",
};

// Page container styles
const PAGE_CONTAINER_CLASSES = [
  "flex",
  "max-h-screen",
  "min-h-screen",
  "max-w-screen",
  "min-w-full",
  "px-[var(--component-page-padding-inline)]",
  "py-[var(--component-page-padding-block)]",
  "flex-col",
  "items-center",
  "gap-[var(--component-page-gap-section)]",
].join(" ");

// Content container styles
const CONTENT_CONTAINER_CLASSES = [
  "flex",
  "min-h-full",
  "min-w-full",
  "flex-col",
  "items-center",
  "gap-[var(--component-page-gap-section)]",
  "flex-1",
  "self-stretch",
].join(" ");

// Text section styles
const TEXT_SECTION_CLASSES = [
  "flex",
  "flex-col",
  "items-start",
  "gap-[var(--component-page-gap-default)]",
  "self-stretch",
].join(" ");

// Heading styles
const HEADING_CLASSES = [
  "self-stretch",
  "text-[color:var(--semantic-text-primary)]",
  "text-center",
  "text-[length:var(--semantic-text-size-h1)]",
  "font-[var(--semantic-text-weight-regular)]",
].join(" ");

// Description styles
const DESCRIPTION_CLASSES = [
  "self-stretch",
  "text-[color:var(--semantic-text-secondary)]",
  "text-center",
  "text-[length:var(--semantic-text-size-secondary)]",
  "font-[var(--semantic-text-weight-regular)]",
].join(" ");

// Button wrapper styles
const BUTTON_WRAPPER_CLASSES = [
  "flex",
  "justify-center",
  "items-center",
  "self-stretch",
].join(" ");

// Logo container styles
const LOGO_CONTAINER_CLASSES = [
  "flex",
  "max-h-[24px]",
  "min-h-full",
  "flex-col",
  "justify-center",
  "items-center",
  "self-stretch",
  "shrink-0",
].join(" ");

// Logo image styles
const LOGO_IMAGE_CLASSES = [
  "min-h-[24px]",
  "flex-1",
  "aspect-[157.76/24]",
].join(" ");

export default function EmptyStatePage() {
  return (
    <div className={PAGE_CONTAINER_CLASSES}>
      <div className={CONTENT_CONTAINER_CLASSES}>
        <div className={TEXT_SECTION_CLASSES}>
          <h1 className={HEADING_CLASSES}>{METADATA.title}</h1>
          <p className={DESCRIPTION_CLASSES}>{METADATA.description}</p>
        </div>
        
        <Link href="/" className={BUTTON_WRAPPER_CLASSES}>
          <Button className="w-full" variant={BUTTON_VARIANT}>
            {BUTTON_LABEL}
          </Button>
        </Link>
      </div>
      
      <div className={LOGO_CONTAINER_CLASSES}>
        <img
          className={LOGO_IMAGE_CLASSES}
          src="/sdsu-logo1.png"
          alt="SDSU Logo"
        />
      </div>
    </div>
  );
}
