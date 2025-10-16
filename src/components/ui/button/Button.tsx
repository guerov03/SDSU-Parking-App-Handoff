import { cn } from "@/lib/cn";
import { forwardRef, memo, type ComponentPropsWithoutRef, type ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "destructive" | "google";
export type ButtonSize = "default";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

// Base button styles using component tokens
const BASE_CLASSES = [
  // Layout
  "inline-flex items-center justify-center",
  "gap-[var(--component-button-gap)]",
  
  // Shape & Border
  "rounded-[var(--component-button-radius)]",
  "border-[length:var(--component-button-border-width)]",
  
  // Typography
  "text-[length:var(--component-button-font-size)]",
  "font-[var(--component-button-font-weight)]",
  "leading-none",
  
  // Transitions
  "transition-colors duration-150",
  
  // Focus States
  "focus-visible:outline",
  "focus-visible:outline-2",
  "focus-visible:outline-[var(--semantic-border-focus)]",
  "focus-visible:outline-offset-2",
  
  // Disabled States
  "disabled:pointer-events-none",
  "disabled:opacity-40",
].join(" ");

// Icon wrapper styles
const ICON_WRAPPER_CLASSES = [
  // Layout
  "inline-flex shrink-0 items-center justify-center",
  
  // Sizing using component tokens
  "h-[var(--component-button-icon-size)]",
  "w-[var(--component-button-icon-size)]",
  
  // SVG child sizing
  "[&>svg]:h-full [&>svg]:w-full",
].join(" ");

// Size variants
const SIZE_STYLES: Record<ButtonSize, string> = {
  default: "min-h-[var(--component-button-height-default)] px-[var(--component-button-padding-inline)] py-[var(--component-button-padding-block)]",
};

// Variant styles using component tokens
const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: [
    // Default State
    "border-transparent",
    "bg-[var(--component-button-bg-primary-default)]",
    "text-[var(--component-button-text-primary-default)]",
    // Hover State
    "hover:bg-[var(--component-button-bg-primary-hover)]",
    // Active State
    "active:bg-[var(--component-button-bg-primary-active)]",
  ].join(" "),

  secondary: [
    // Default State
    "border-transparent",
    "bg-[var(--component-button-bg-secondary-default)]",
    "text-[var(--component-button-text-secondary-default)]",
    // Hover State
    "hover:bg-[var(--component-button-bg-secondary-hover)]",
    "hover:text-[var(--component-button-text-secondary-hover)]",
    // Active State
    "active:bg-[var(--component-button-bg-secondary-active)]",
  ].join(" "),

  outline: [
    // Default State
    "border-[var(--component-button-border-outline-default)]",
    "bg-[var(--component-button-bg-outline-default)]",
    "text-[var(--component-button-text-outline-default)]",
    // Hover State
    "hover:bg-[var(--component-button-bg-outline-hover)]",
    "hover:text-[var(--component-button-text-outline-hover)]",
    "hover:border-[var(--component-button-border-outline-hover)]",
    // Active State
    "active:bg-[var(--component-button-bg-outline-active)]",
    "active:text-[var(--component-button-text-outline-active)]",
    "active:border-[var(--component-button-border-outline-active)]",
  ].join(" "),

  destructive: [
    // Default State
    "border-[var(--component-button-border-destructive-default)]",
    "bg-[var(--component-button-bg-destructive-default)]",
    "text-[var(--component-button-text-destructive-default)]",
    // Hover State
    "hover:bg-[var(--component-button-bg-destructive-hover)]",
    "hover:text-[var(--component-button-text-destructive-hover)]",
    "hover:border-[var(--component-button-border-destructive-hover)]",
    // Disabled State
    "disabled:bg-[var(--component-button-bg-destructive-disabled)]",
    "disabled:text-[var(--component-button-text-destructive-disabled)]",
    "disabled:border-[var(--component-button-border-destructive-disabled)]",
  ].join(" "),

  google: [
    // Default State
    "border-[var(--component-button-border-google-default)]",
    "bg-[var(--component-button-bg-google-default)]",
    "text-[var(--component-button-text-google-default)]",
    // Hover State
    "hover:bg-[var(--component-button-bg-google-hover)]",
    "hover:border-[var(--component-button-border-google-hover)]",
    // Active State
    "active:bg-[var(--component-button-bg-google-active)]",
    "active:border-[var(--component-button-border-google-active)]",
  ].join(" "),
};

// Memoized spinner component
const Spinner = memo(() => (
  <span className={cn(ICON_WRAPPER_CLASSES, "animate-spin")} aria-hidden="true">
    <span className="h-full w-full rounded-full border-2 border-current border-t-transparent" />
  </span>
));
Spinner.displayName = "Spinner";

// Memoized icon wrapper component
const IconWrapper = memo(({ icon }: { icon: ReactNode }) => (
  <span className={ICON_WRAPPER_CLASSES} aria-hidden="true">
    {icon}
  </span>
));
IconWrapper.displayName = "IconWrapper";

/**
 * 
 * ```tsx
 * <Button variant="primary">Click me</Button>
 * <Button variant="outline" leadingIcon={<Icon />}>With Icon</Button>
 * <Button variant="destructive" isLoading>Loading...</Button>
 * ```
 */
export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    {
      variant = "primary",
      size = "default",
      type = "button",
      isLoading = false,
      disabled,
      leadingIcon,
      trailingIcon,
      className,
      children,
      ...rest
    },
    ref
  ) {
    const isDisabled = disabled || isLoading;

    // Compute button classes
    const buttonClasses = cn(
      BASE_CLASSES,
      SIZE_STYLES[size],
      VARIANT_STYLES[variant],
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        data-variant={variant}
        data-size={size}
        data-loading={isLoading || undefined}
        className={cn(buttonClasses, isLoading && "relative")}
        {...rest}
      >
        {/* Centered loading spinner */}
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Spinner />
          </span>
        )}

        {/* Leading icon */}
        {!isLoading && leadingIcon && <IconWrapper icon={leadingIcon} />}

        {/* Button content */}
        {children && (
          <span
            className={cn(
              "inline-flex items-center justify-center",
              isLoading && "opacity-0"
            )}
          >
            {children}
          </span>
        )}

        {/* Trailing icon */}
        {!isLoading && trailingIcon && <IconWrapper icon={trailingIcon} />}
      </button>
    );
  })
);

Button.displayName = "Button";

export default Button;
