import { cn } from "@/lib/cn";
import {
  forwardRef,
  memo,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "neutral"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "alert"
  | "green"
  | "indigo"
  | "navy"
  | "teal"
  | "purple"
  | "pink"
  | "orange"
  | "sand"
  | "yellow"
  | "red"
  // Dismissible variants
  | "primary-dismissible"
  | "secondary-dismissible"
  | "neutral-dismissible"
  | "success-dismissible"
  | "warning-dismissible"
  | "error-dismissible"
  | "info-dismissible"
  | "alert-dismissible"
  | "green-dismissible"
  | "indigo-dismissible"
  | "navy-dismissible"
  | "teal-dismissible"
  | "purple-dismissible"
  | "pink-dismissible"
  | "orange-dismissible"
  | "sand-dismissible"
  | "yellow-dismissible"
  | "red-dismissible";

export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  variant?: BadgeVariant;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
}

// Base badge styles using component tokens
const BASE_CLASSES = [
  // Layout
  "inline-flex items-center",
  "min-h-[var(--component-badge-height)]",
  "gap-[var(--component-badge-gap)]",

  // Shape & Border
  "rounded-[var(--component-badge-radius)]",
  "px-[var(--component-badge-padding-inline)]",
  "py-[var(--component-badge-padding-block)]",

  // Typography
  "text-[length:var(--component-badge-font-size)]",
  "font-[var(--component-badge-font-weight)]",
  "leading-none",
  "whitespace-nowrap",
].join(" ");

// Icon wrapper styles
const ICON_WRAPPER_CLASSES = [
  // Layout
  "inline-flex shrink-0 items-center justify-center",

  // Sizing using component tokens
  "h-[var(--component-badge-icon-size)]",
  "w-[var(--component-badge-icon-size)]",

  // SVG child sizing
  "[&>svg]:h-full [&>svg]:w-full",
].join(" ");

// Close icon component for dismissible variants
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      d="M11.6092 6.39077L6.39077 11.6092M6.39077 6.39077L11.6092 11.6092M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Variant styles using component tokens
const VARIANT_STYLES: Record<BadgeVariant, string> = {
  // Standard variants
  primary: [
    "bg-[var(--component-badge-bg-primary)]",
    "text-[var(--component-badge-text-primary)]",
  ].join(" "),
  secondary: [
    "bg-[var(--component-badge-bg-secondary)]",
    "text-[var(--component-badge-text-secondary)]",
  ].join(" "),
  neutral: [
    "bg-[var(--component-badge-bg-neutral)]",
    "text-[var(--component-badge-text-neutral)]",
  ].join(" "),
  success: [
    "bg-[var(--component-badge-bg-success)]",
    "text-[var(--component-badge-text-success)]",
  ].join(" "),
  warning: [
    "bg-[var(--component-badge-bg-warning)]",
    "text-[var(--component-badge-text-warning)]",
  ].join(" "),
  error: [
    "bg-[var(--component-badge-bg-error)]",
    "text-[var(--component-badge-text-error)]",
  ].join(" "),
  info: [
    "bg-[var(--component-badge-bg-info)]",
    "text-[var(--component-badge-text-info)]",
  ].join(" "),
  alert: [
    "bg-[var(--component-badge-bg-alert)]",
    "text-[var(--component-badge-text-alert)]",
  ].join(" "),
  green: [
    "bg-[var(--component-badge-bg-green)]",
    "text-[var(--component-badge-text-green)]",
  ].join(" "),
  indigo: [
    "bg-[var(--component-badge-bg-indigo)]",
    "text-[var(--component-badge-text-indigo)]",
  ].join(" "),
  navy: [
    "bg-[var(--component-badge-bg-navy)]",
    "text-[var(--component-badge-text-navy)]",
  ].join(" "),
  teal: [
    "bg-[var(--component-badge-bg-teal)]",
    "text-[var(--component-badge-text-teal)]",
  ].join(" "),
  purple: [
    "bg-[var(--component-badge-bg-purple)]",
    "text-[var(--component-badge-text-purple)]",
  ].join(" "),
  pink: [
    "bg-[var(--component-badge-bg-pink)]",
    "text-[var(--component-badge-text-pink)]",
  ].join(" "),
  orange: [
    "bg-[var(--component-badge-bg-orange)]",
    "text-[var(--component-badge-text-orange)]",
  ].join(" "),
  sand: [
    "bg-[var(--component-badge-bg-sand)]",
    "text-[var(--component-badge-text-sand)]",
  ].join(" "),
  yellow: [
    "bg-[var(--component-badge-bg-yellow)]",
    "text-[var(--component-badge-text-yellow)]",
  ].join(" "),
  red: [
    "bg-[var(--component-badge-bg-red)]",
    "text-[var(--component-badge-text-red)]",
  ].join(" "),

  // Dismissible variants (same styling as base variants)
  "primary-dismissible": [
    "bg-[var(--component-badge-bg-primary)]",
    "text-[var(--component-badge-text-primary)]",
  ].join(" "),
  "secondary-dismissible": [
    "bg-[var(--component-badge-bg-secondary)]",
    "text-[var(--component-badge-text-secondary)]",
  ].join(" "),
  "neutral-dismissible": [
    "bg-[var(--component-badge-bg-neutral)]",
    "text-[var(--component-badge-text-neutral)]",
  ].join(" "),
  "success-dismissible": [
    "bg-[var(--component-badge-bg-success)]",
    "text-[var(--component-badge-text-success)]",
  ].join(" "),
  "warning-dismissible": [
    "bg-[var(--component-badge-bg-warning)]",
    "text-[var(--component-badge-text-warning)]",
  ].join(" "),
  "error-dismissible": [
    "bg-[var(--component-badge-bg-error)]",
    "text-[var(--component-badge-text-error)]",
  ].join(" "),
  "info-dismissible": [
    "bg-[var(--component-badge-bg-info)]",
    "text-[var(--component-badge-text-info)]",
  ].join(" "),
  "alert-dismissible": [
    "bg-[var(--component-badge-bg-alert)]",
    "text-[var(--component-badge-text-alert)]",
  ].join(" "),
  "green-dismissible": [
    "bg-[var(--component-badge-bg-green)]",
    "text-[var(--component-badge-text-green)]",
  ].join(" "),
  "indigo-dismissible": [
    "bg-[var(--component-badge-bg-indigo)]",
    "text-[var(--component-badge-text-indigo)]",
  ].join(" "),
  "navy-dismissible": [
    "bg-[var(--component-badge-bg-navy)]",
    "text-[var(--component-badge-text-navy)]",
  ].join(" "),
  "teal-dismissible": [
    "bg-[var(--component-badge-bg-teal)]",
    "text-[var(--component-badge-text-teal)]",
  ].join(" "),
  "purple-dismissible": [
    "bg-[var(--component-badge-bg-purple)]",
    "text-[var(--component-badge-text-purple)]",
  ].join(" "),
  "pink-dismissible": [
    "bg-[var(--component-badge-bg-pink)]",
    "text-[var(--component-badge-text-pink)]",
  ].join(" "),
  "orange-dismissible": [
    "bg-[var(--component-badge-bg-orange)]",
    "text-[var(--component-badge-text-orange)]",
  ].join(" "),
  "sand-dismissible": [
    "bg-[var(--component-badge-bg-sand)]",
    "text-[var(--component-badge-text-sand)]",
  ].join(" "),
  "yellow-dismissible": [
    "bg-[var(--component-badge-bg-yellow)]",
    "text-[var(--component-badge-text-yellow)]",
  ].join(" "),
  "red-dismissible": [
    "bg-[var(--component-badge-bg-red)]",
    "text-[var(--component-badge-text-red)]",
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
 * Badge Component
 *
 * ```tsx
 * // Standard badges
 * <Badge variant="success">Active</Badge>
 * <Badge variant="warning" leadingIcon={<AlertIcon />}>Warning</Badge>
 *
 * // Dismissible badges
 * <Badge variant="primary-dismissible" onDismiss={() => console.log('dismissed')}>
 *   Removable Tag
 * </Badge>
 * <Badge variant="success-dismissible" onDismiss={handleRemove}>
 *   Completed
 * </Badge>
 * ```
 */
export const Badge = memo(
  forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
    {
      children,
      className,
      variant = "neutral",
      leadingIcon,
      trailingIcon,
      onDismiss,
      ...props
    },
    ref,
  ) {
    // Check if this is a dismissible variant
    const isDismissible = variant.endsWith("-dismissible");

    // Compute classes once using the variant styles from CSS custom properties
    const variantClass = VARIANT_STYLES[variant];
    const badgeClasses = cn(
      BASE_CLASSES,
      variantClass,
      isDismissible && "cursor-pointer hover:opacity-80 transition-opacity",
      className,
    );

    // Handle click for dismissible badges
    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
      if (isDismissible && onDismiss) {
        onDismiss();
      }
      // Call original onClick if provided
      if (props.onClick) {
        props.onClick(e);
      }
    };

    return (
      <span
        ref={ref}
        data-variant={variant}
        className={badgeClasses}
        role="status"
        onClick={handleClick}
        {...props}
      >
        {leadingIcon && <IconWrapper icon={leadingIcon} />}
        {children && <span className="truncate">{children}</span>}
        {/* Show trailing icon or close icon for dismissible variants */}
        {isDismissible ? (
          <IconWrapper icon={<CloseIcon />} />
        ) : (
          trailingIcon && <IconWrapper icon={trailingIcon} />
        )}
      </span>
    );
  }),
);

Badge.displayName = "Badge";

export default Badge;
