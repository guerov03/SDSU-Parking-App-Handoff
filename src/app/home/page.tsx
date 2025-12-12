"use client";

// Home page with sign-in form and Google sign-in button
// !the page that auto populates when loading localhost!

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, type ButtonVariant } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input";
import type { ReactNode } from "react";
import { validateEmail, validatePassword } from "@/lib/validation";
import { signin } from "../../../actions/auth/auth";
import {
  CONTENT_CONTAINER_CLASSES,
  TEXT_SECTION_CLASSES,
  HEADING_CLASSES,
  DESCRIPTION_CLASSES,
  LOGO_CONTAINER_CLASSES,
  LOGO_IMAGE_CLASSES,
} from "@/lib/page-styles";

// SVG Icons
const GoogleIcon = (): ReactNode => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.8334 12.2728C24.8334 11.4219 24.7555 10.6037 24.6107 9.81826H13.0783V14.4601H19.6683C19.3844 15.9601 18.5217 17.231 17.2248 18.0819V21.0928H21.1822C23.4976 19.0037 24.8334 15.9274 24.8334 12.2728Z"
      fill="#4285F4"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.0783 24C16.3844 24 19.1562 22.9255 21.1822 21.0928L17.2248 18.0819C16.1284 18.8019 14.7258 19.2273 13.0783 19.2273C9.88904 19.2273 7.1896 17.1164 6.2267 14.28H2.13579V17.3891C4.15064 21.3109 8.29164 24 13.0783 24Z"
      fill="#34A853"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.2267 14.28C5.98181 13.56 5.84265 12.791 5.84265 12.0001C5.84265 11.2092 5.9818 10.4401 6.2267 9.72007V6.61097H2.13579C1.30647 8.23098 0.833374 10.0637 0.833374 12.0001C0.833374 13.9364 1.30648 15.7691 2.13579 17.3891L6.2267 14.28Z"
      fill="#FBBC05"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.0783 4.77273C14.8761 4.77273 16.4902 5.37818 17.7592 6.56728L21.2712 3.12546C19.1506 1.18909 16.3788 0 13.0783 0C8.29164 0 4.15063 2.68915 2.13579 6.61097L6.2267 9.72007C7.18959 6.8837 9.88904 4.77273 13.0783 4.77273Z"
      fill="#EA4335"
    />
  </svg>
);

const CarClipArt = ({ variant = 1 }: { variant?: number }): ReactNode => (
  <Image
    src={`/car-clipart-${variant}.png`}
    alt="Car"
    width={80}
    height={120}
  />
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

// Divider container styles
const DIVIDER_CONTAINER_CLASSES = [
  "flex",
  "min-w-full",
  "justify-center",
  "items-center",
  "gap-[var(--component-page-gap-default)]",
].join(" ");

const DIVIDER_LINE_CLASSES = ["flex-1", "h-[0.5px]", "bg-[#666666]"].join(" ");

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
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault?.();
    setEmailError(null);
    setPasswordError(null);
    setFormError(null);

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    const pwdCheck = validatePassword(password);
    if (!pwdCheck.valid) {
      setPasswordError(pwdCheck.message ?? "Invalid password.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await signin({ email, password });
      if (res.status !== 200) {
        setFormError(res.error ?? "Unable to sign in.");
        return;
      }
      router.push("/parkinglot-data");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to sign in.";
      setFormError(message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      {/* Farthest left lane */}
      <div className="hidden md:block fixed left-48 top-0 h-full pointer-events-none z-0 overflow-hidden">
        <div
          style={{
            animation: "slideUp 18s linear infinite 0s",
            animationFillMode: "forwards",
            transform: "translateY(100vh)",
          }}
          className="opacity-40 will-change-transform"
        >
          <CarClipArt variant={5} />
        </div>
        <div
          style={{
            animation: "slideUp 18s linear infinite 6s",
            animationFillMode: "forwards",
            transform: "translateY(100vh)",
          }}
          className="opacity-40 will-change-transform"
        >
          <CarClipArt variant={6} />
        </div>
      </div>

      {/* Far left lane */}
      <div className="hidden md:block fixed left-32 top-0 h-full pointer-events-none z-0 overflow-hidden">
        <div
          style={{
            animation: "slideUp 10s linear infinite 1s",
            animationFillMode: "forwards",
            transform: "translateY(100vh)",
          }}
          className="opacity-40 will-change-transform"
        >
          <CarClipArt variant={1} />
        </div>
        <div
          style={{
            animation: "slideUp 10s linear infinite 5s",
            animationFillMode: "forwards",
            transform: "translateY(100vh)",
          }}
          className="opacity-40 will-change-transform"
        >
          <CarClipArt variant={2} />
        </div>
      </div>

      {/* Middle left lane */}
      <div className="hidden md:block fixed left-16 top-0 h-full pointer-events-none z-0 overflow-hidden">
        <div
          style={{
            animation: "slideUp 8s linear infinite 0s",
            animationFillMode: "forwards",
            transform: "translateY(100vh)",
          }}
          className="opacity-40 will-change-transform"
        >
          <CarClipArt variant={3} />
        </div>
        <div
          style={{
            animation: "slideUp 8s linear infinite 4s",
            animationFillMode: "forwards",
            transform: "translateY(100vh)",
          }}
          className="opacity-40 will-change-transform"
        >
          <CarClipArt variant={4} />
        </div>
      </div>

      {/* Left side animated cars */}
      <div className="hidden md:block fixed left-2 top-0 h-full pointer-events-none z-0 overflow-hidden">
        <div
          style={{
            animation: "slideUp 14s linear infinite 2s",
            animationFillMode: "forwards",
            transform: "translateY(100vh)",
          }}
          className="opacity-40 will-change-transform"
        >
          <CarClipArt variant={5} />
        </div>
        <div
          style={{
            animation: "slideUp 14s linear infinite 7s",
            animationFillMode: "forwards",
            transform: "translateY(100vh)",
          }}
          className="opacity-40 will-change-transform"
        >
          <CarClipArt variant={6} />
        </div>
      </div>

      {/* Right side animated cars */}
      <div className="hidden md:block fixed right-2 top-0 h-full pointer-events-none z-0 overflow-hidden">
        <div
          style={{
            animation: "slideUp 12s linear infinite 1s",
            animationFillMode: "forwards",
            transform: "translateY(100vh)",
          }}
          className="opacity-40 will-change-transform"
        >
          <CarClipArt variant={1} />
        </div>
        <div
          style={{
            animation: "slideUp 12s linear infinite 5s",
            animationFillMode: "forwards",
            transform: "translateY(100vh)",
          }}
          className="opacity-40 will-change-transform"
        >
          <CarClipArt variant={2} />
        </div>
      </div>

      {/* Middle right lane */}
      <div className="hidden md:block fixed right-16 top-0 h-full pointer-events-none z-0 overflow-hidden">
        <div
          style={{
            animation: "slideUp 9s linear infinite 2s",
            animationFillMode: "forwards",
            transform: "translateY(100vh)",
          }}
          className="opacity-40 will-change-transform"
        >
          <CarClipArt variant={3} />
        </div>
        <div
          style={{
            animation: "slideUp 9s linear infinite 5s",
            animationFillMode: "forwards",
            transform: "translateY(100vh)",
          }}
          className="opacity-40 will-change-transform"
        >
          <CarClipArt variant={4} />
        </div>
      </div>

      {/* Far right lane */}
      <div className="hidden md:block fixed right-32 top-0 h-full pointer-events-none z-0 overflow-hidden">
        <div
          style={{
            animation: "slideUp 15s linear infinite 3s",
            animationFillMode: "forwards",
            transform: "translateY(100vh)",
          }}
          className="opacity-40 will-change-transform"
        >
          <CarClipArt variant={5} />
        </div>
        <div
          style={{
            animation: "slideUp 15s linear infinite 7s",
            animationFillMode: "forwards",
            transform: "translateY(100vh)",
          }}
          className="opacity-40 will-change-transform"
        >
          <CarClipArt variant={6} />
        </div>
      </div>

      {/* Farthest right lane */}
      <div className="hidden md:block fixed right-48 top-0 h-full pointer-events-none z-0 overflow-hidden">
        <div
          style={{
            animation: "slideUp 7s linear infinite 0s",
            animationFillMode: "forwards",
            transform: "translateY(100vh)",
          }}
          className="opacity-40 will-change-transform"
        >
          <CarClipArt variant={1} />
        </div>
        <div
          style={{
            animation: "slideUp 7s linear infinite 3s",
            animationFillMode: "forwards",
            transform: "translateY(100vh)",
          }}
          className="opacity-40 will-change-transform"
        >
          <CarClipArt variant={2} />
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100vh);
          }
          to {
            transform: translateY(-200px);
          }
        }
      `}</style>

      <div className={CONTENT_CONTAINER_CLASSES}>
        <div className={LOGO_CONTAINER_CLASSES}>
          <Image
            className={LOGO_IMAGE_CLASSES}
            src="/sdsu-logo1.png"
            alt="SDSU Logo"
            width={368}
            height={56}
            priority
          />
        </div>

        <div className="flex flex-col items-center gap-2 mb-4 px-8 py-6 bg-white rounded-3xl shadow-lg border-2 border-[var(--semantic-brand-primary-default)] cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:border-[var(--semantic-brand-primary-hover)]">
          <h1 className="text-5xl font-bold text-[var(--semantic-brand-primary-default)] tracking-tight select-none">
            SDSU Parking
          </h1>
          <p className="text-sm text-[var(--semantic-text-secondary)] text-center max-w-sm">
            Find parking spots on campus in real-time
          </p>
        </div>

        <div className={TEXT_SECTION_CLASSES}>
          <h2 className="text-xl font-semibold text-center">
            {METADATA.title}
          </h2>
          <p className={DESCRIPTION_CLASSES}>{METADATA.description}</p>
        </div>

        <Link className="w-full" href="/parkinglot-data">
          <Button variant={BUTTON_VARIANT_GOOGLE} leadingIcon={<GoogleIcon />}>
            {BUTTON_LABEL_GOOGLE}
          </Button>
        </Link>

        <div className={DIVIDER_CONTAINER_CLASSES}>
          <div className={DIVIDER_LINE_CLASSES} />
          <span className={DIVIDER_TEXT_CLASSES}>or</span>
          <div className={DIVIDER_LINE_CLASSES} />
        </div>

        <form className={FORM_CONTAINER_CLASSES} onSubmit={handleSubmit}>
          <div className={INPUT_GROUP_CLASSES}>
            <label className={LABEL_CLASSES}>Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
            />
            {emailError && (
              <p className="text-[var(--semantic-error)] text-sm mt-1">
                {emailError}
              </p>
            )}
          </div>

          <div className={INPUT_GROUP_CLASSES}>
            <label className={LABEL_CLASSES}>Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
            />
            {passwordError && (
              <p className="text-[var(--semantic-error)] text-sm mt-1">
                {passwordError}
              </p>
            )}
          </div>

          <div className="w-full">
            <Button
              variant={BUTTON_VARIANT}
              type="submit"
              isLoading={submitting}
              disabled={submitting}
            >
              {BUTTON_LABEL}
            </Button>
          </div>

          {formError && (
            <p className="text-[var(--semantic-error)] text-sm">{formError}</p>
          )}

          <p className={CAPTION_CLASSES}>
            <Link href="/parkinglot-data">Reset password</Link>
          </p>

          <p className={CAPTION_CLASSES}>
            No account? <Link href="/signup">Register</Link>
          </p>
        </form>
      </div>
    </>
  );
}
