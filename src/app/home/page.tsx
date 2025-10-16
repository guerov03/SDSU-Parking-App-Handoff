import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Button, type ButtonVariant } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input";
import type { ReactNode } from "react";

// SVG Icons
const GoogleIcon = (): ReactNode => (
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M24.8334 12.2728C24.8334 11.4219 24.7555 10.6037 24.6107 9.81826H13.0783V14.4601H19.6683C19.3844 15.9601 18.5217 17.231 17.2248 18.0819V21.0928H21.1822C23.4976 19.0037 24.8334 15.9274 24.8334 12.2728Z" fill="#4285F4"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M13.0783 24C16.3844 24 19.1562 22.9255 21.1822 21.0928L17.2248 18.0819C16.1284 18.8019 14.7258 19.2273 13.0783 19.2273C9.88904 19.2273 7.1896 17.1164 6.2267 14.28H2.13579V17.3891C4.15064 21.3109 8.29164 24 13.0783 24Z" fill="#34A853"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M6.2267 14.28C5.98181 13.56 5.84265 12.791 5.84265 12.0001C5.84265 11.2092 5.9818 10.4401 6.2267 9.72007V6.61097H2.13579C1.30647 8.23098 0.833374 10.0637 0.833374 12.0001C0.833374 13.9364 1.30648 15.7691 2.13579 17.3891L6.2267 14.28Z" fill="#FBBC05"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M13.0783 4.77273C14.8761 4.77273 16.4902 5.37818 17.7592 6.56728L21.2712 3.12546C19.1506 1.18909 16.3788 0 13.0783 0C8.29164 0 4.15063 2.68915 2.13579 6.61097L6.2267 9.72007C7.18959 6.8837 9.88904 4.77273 13.0783 4.77273Z" fill="#EA4335"/>
  </svg>
);

const DividerIcon = (): ReactNode => (
  <svg xmlns="http://www.w3.org/2000/svg" width="166" height="1" viewBox="0 0 166 1" fill="none">
    <line y1="0.75" x2="165.5" y2="0.75" stroke="#666666" strokeWidth="0.5"/>
  </svg>
);

// Constants
const BUTTON_VARIANT: ButtonVariant = "primary";
const BUTTON_VARIANT_GOOGLE: ButtonVariant = "google";

const BUTTON_LABEL_GOOGLE = "Sign in with google";
const BUTTON_LABEL = "Log in";

const METADATA = {
  title: "Sign in or Sign up",
  description: "Track parking, share updates, and save time.",
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

// Logo container styles
const LOGO_CONTAINER_CLASSES = [
  "flex",
  "max-h-[56px]",
  "min-h-full",
  "flex-col",
  "items-center",
].join(" ");

// Logo image styles
const LOGO_IMAGE_CLASSES = [
  "flex",
  "min-h-full",
  "max-h-[56px]",
  "aspect-[368.11/56.00]",
  "shrink-0",
].join(" ");

// Text section styles
const TEXT_SECTION_CLASSES = [
  "flex",
  "min-w-full",
  "flex-col",
  "items-start",
  "gap-[var(--component-page-gap-default)]",
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

// Divider container styles
const DIVIDER_CONTAINER_CLASSES = [
  "flex",
  "min-w-full",
  "justify-center",
  "items-center",
  "gap-[var(--component-page-gap-default)]",
].join(" ");

// Divider text styles
const DIVIDER_TEXT_CLASSES = [
  "text-[color:var(--semantic-text-secondary)]",
  "text-[length:var(--semantic-text-size-secondary)]",
  "font-[var(--semantic-text-weight-regular)]",
].join(" ");

// Form container styles
const FORM_CONTAINER_CLASSES = [
  "flex",
  "min-w-full",
  "flex-col",
  "items-start",
  "gap-[var(--component-page-gap-default)]",
  "self-stretch",
].join(" ");

// Input group styles
const INPUT_GROUP_CLASSES = [
  "flex",
  "min-w-full",
  "flex-col",
  "self-start",
  "gap-[var(--component-input-gap-group)]",
  "self-stretch",
].join(" ");

// Label styles
const LABEL_CLASSES = [
  "self-stretch",
  "text-[color:var(--component-text-caption)]",
  "text-[length:var(--component-text-size-caption)]",
  "font-[var(--component-text-weight-regular)]",
  "text-left",
].join(" ");

// Caption styles
const CAPTION_CLASSES = [
  "self-stretch",
  "text-[length:var(--component-text-size-caption)]",
  "font-[var(--component-text-weight-regular)]",
  "text-center",
].join(" ");

export default function HomePage() {
  return (
    <div className={PAGE_CONTAINER_CLASSES}>
      <div className={CONTENT_CONTAINER_CLASSES}>
        <div className={LOGO_CONTAINER_CLASSES}>
          <img
            className={LOGO_IMAGE_CLASSES}
            src="/sdsu-logo1.png"
            alt="SDSU Logo"
          />
        </div>

        <div className={TEXT_SECTION_CLASSES}>
          <h1 className={HEADING_CLASSES}>{METADATA.title}</h1>
          <p className={DESCRIPTION_CLASSES}>{METADATA.description}</p>
        </div>

        <Button
          className={BUTTON_WRAPPER_CLASSES}
          variant={BUTTON_VARIANT_GOOGLE}
          leadingIcon={<GoogleIcon />}
        >
          {BUTTON_LABEL_GOOGLE}
        </Button>

        <div className={DIVIDER_CONTAINER_CLASSES}>
          <DividerIcon />
          <span className={DIVIDER_TEXT_CLASSES}>or</span>
          <DividerIcon />
        </div>

        <div className={FORM_CONTAINER_CLASSES}>
          <div className={INPUT_GROUP_CLASSES}>
            <label className={LABEL_CLASSES}>Email</label>
            <Input placeholder="" />
          </div>

          <div className={INPUT_GROUP_CLASSES}>
            <label className={LABEL_CLASSES}>Password</label>
            <Input placeholder="" />
          </div>

          <Link href="/empty-state" className={BUTTON_WRAPPER_CLASSES}>
            <Button className="w-full" variant={BUTTON_VARIANT}>
              {BUTTON_LABEL}
            </Button>
          </Link>

          <p className={CAPTION_CLASSES}>
            <Link href="/empty-state">Reset password</Link>
          </p>

          <p className={CAPTION_CLASSES}>
            No account? <Link href="/empty-state">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
