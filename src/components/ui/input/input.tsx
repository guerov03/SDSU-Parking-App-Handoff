import { cn } from "@/lib/cn";
import {
  forwardRef,
  memo,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

export type InputSize = "default";

export interface InputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
  size?: InputSize;
  error?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

// Base input container styles using component tokens
const BASE_CLASSES = [
  // Layout
  "flex items-center",
  "w-full",
  "gap-[var(--component-input-gap-default)]",

  // Shape & Border - Using solid border style
  "rounded-[var(--component-input-radius)]",
  "border",
  "border-solid",

  // Typography
  "text-[length:var(--component-input-font-size)]",
  "font-[var(--component-input-font-weight)]",
  "leading-none",

  // Transitions
  "transition-all duration-150",

  // Default State - Background & Border Colors
  "bg-[var(--component-input-bg-default)]",
  "text-[var(--component-input-text-default)]",
  "border-[var(--component-input-border-default)]",

  // Hover State
  "hover:bg-[var(--component-input-bg-hover)]",
  "hover:border-[var(--component-input-border-hover)]",

  // Focus Within State
  "focus-within:border-2",
  "focus-within:border-[var(--component-input-border-focus)]",

  // Disabled State
  "has-[:disabled]:bg-[var(--component-input-bg-disabled)]",
  "has-[:disabled]:cursor-not-allowed",
  "has-[:disabled]:pointer-events-none",
].join(" ");

// Error state classes
const ERROR_CLASSES = [
  "!border-2",
  "!border-[var(--component-input-border-error)]",
  "focus-within:!border-[var(--component-input-border-error)]",
].join(" ");

// Input field styles (the actual input element inside the container)
const INPUT_FIELD_CLASSES = [
  // Reset default styles
  "flex-1",
  "w-full",
  "bg-transparent",
  "border-none",
  "outline-none",

  // Typography inheritance
  "text-[length:var(--component-input-font-size)]",
  "font-[var(--component-input-font-weight)]",
  "text-[var(--component-input-text-default)]",
  "leading-none",

  // Placeholder
  "placeholder:text-[var(--component-input-text-disabled)]",

  // Disabled state
  "disabled:cursor-not-allowed",
  "disabled:text-[var(--component-input-text-disabled)]",
].join(" ");

// Icon wrapper style
const ICON_WRAPPER_CLASSES = [
  // Layout
  "inline-flex shrink-0 items-center justify-center",

  // Fixed sizing - 20px icons
  "h-5",
  "w-5",

  // Color
  "text-[var(--component-input-text-default)]",

  // SVG child sizing
  "[&>svg]:h-full [&>svg]:w-full",
].join(" ");

// Size variants
const SIZE_STYLES: Record<InputSize, string> = {
  default: [
    "min-h-[var(--component-input-height-default)]",
    "max-h-[var(--component-input-height-default)]",
    "px-[var(--component-input-padding-inline)]",
    "py-[var(--component-input-padding-block)]",
  ].join(" "),
};

// Memoized icon wrapper component
const IconWrapper = memo(({ icon }: { icon: ReactNode }) => (
  <span className={ICON_WRAPPER_CLASSES} aria-hidden="true">
    {icon}
  </span>
));
IconWrapper.displayName = "IconWrapper";

/**
 * ```tsx
 * <Input placeholder="Enter your email" />
 * <Input error placeholder="Invalid email" />
 * <Input leadingIcon={<SearchIcon />} placeholder="Search..." />
 * <Input trailingIcon={<CheckIcon />} placeholder="Verified" />
 * ```
 */
export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(function Input(
    {
      size = "default",
      error = false,
      disabled,
      leadingIcon,
      trailingIcon,
      className,
      ...rest
    },
    ref,
  ) {
    // Compute container classes
    const containerClasses = cn(
      BASE_CLASSES,
      SIZE_STYLES[size],
      error && ERROR_CLASSES,
      className,
    );

    return (
      <div className={containerClasses}>
        {/* Leading Icon */}
        {leadingIcon && <IconWrapper icon={leadingIcon} />}

        {/* Input Field */}
        <input
          ref={ref}
          disabled={disabled}
          aria-invalid={error || undefined}
          className={INPUT_FIELD_CLASSES}
          {...rest}
        />

        {/* Trailing Icon */}
        {trailingIcon && <IconWrapper icon={trailingIcon} />}
      </div>
    );
  }),
);

Input.displayName = "Input";

export default Input;
