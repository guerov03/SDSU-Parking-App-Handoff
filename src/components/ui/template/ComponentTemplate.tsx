/**
 * COMPONENT TEMPLATE
 *
 * Use this file as a starting point to create new UI components.
 *
 * 1. SETUP
 * -------------
 * 1. Copy this template folder to create a new component
 * 2. Rename the folder and files to match your component name
 * 3. Update the component name throughout this file
 *
 * 2. DEFINE TYPES & VARIANTS
 * --------------------------------
 * 1. Define variant types (e.g., "primary" | "secondary" | "outline")
 * 2. Define size types (e.g., "sm" | "md" | "lg")
 * 3. Create the component props interface extending necessary React types
 *
 * Example:
 * ```tsx
 * export type ComponentVariant = "primary" | "secondary" | "outline";
 * export type ComponentSize = "small" | "default" | "large";
 *
 * export interface ComponentProps extends ComponentPropsWithoutRef<"div"> {
 *   variant?: ComponentVariant;
 *   size?: ComponentSize;
 *   children?: ReactNode;
 * }
 * ```
 *
 * 3. CREATE STYLE CONSTANTS
 * -------------------------------
 * 1. Use array based class organization for maintainability
 * 2. Use design system tokens from globals.css
 * 3. Group classes by category
 *
 * Example:
 * ```tsx
 * const BASE_CLASSES = [
 *   // Layout
 *   "flex",
 *   "items-center",
 *   "gap-[var(--component-button-gap)]",
 *
 *   // Typography
 *   "text-[length:var(--semantic-text-size-body)]",
 *   "font-[var(--semantic-text-weight-regular)]",
 *
 *   // Borders & Radius
 *   "rounded-[var(--semantic-radius-md)]",
 *   "border-[length:var(--semantic-border-width-default)]",
 * ].join(" ");
 *
 * const VARIANT_STYLES: Record<ComponentVariant, string> = {
 *   primary: [
 *     "bg-[var(--component-button-bg-primary-default)]",
 *     "text-[var(--component-button-text-primary-default)]",
 *     "hover:bg-[var(--component-button-bg-primary-hover)]",
 *   ].join(" "),
 *   // ... other variants
 * };
 * ```
 *
 * 4. BUILD THE COMPONENT
 * ----------------------------
 * 1. Use forwardRef if the component needs a ref
 * 2. Use memo for performance optimization
 * 3. Destructure props with defaults
 * 4. Use the cn() utility to combine classes
 *
 * Example:
 * ```tsx
 * export const Component = memo(
 *   forwardRef<HTMLDivElement, ComponentProps>(
 *     function Component(
 *       {
 *         variant = "primary",
 *         size = "default",
 *         className,
 *         children,
 *         ...rest
 *       },
 *       ref
 *     ) {
 *       const componentClasses = cn(
 *         BASE_CLASSES,
 *         VARIANT_STYLES[variant],
 *         SIZE_STYLES[size],
 *         className
 *       );
 *
 *       return (
 *         <div ref={ref} className={componentClasses} {...rest}>
 *           {children}
 *         </div>
 *       );
 *     }
 *   )
 * );
 *
 * Component.displayName = "Component";
 * ```
 *
 * 5. EXPORT
 * --------------
 * Export your component and types for use in other files
 *
 * Example:
 * ```tsx
 * export default Component;
 * ```
 *
 */

import { cn } from "@/lib/cn";
import { forwardRef, memo } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

// Replace with your component name and types
export type YourComponentVariant = "default";
export type YourComponentSize = "default";

export interface YourComponentProps extends ComponentPropsWithoutRef<"div"> {
  variant?: YourComponentVariant;
  size?: YourComponentSize;
  children?: ReactNode;
}

// Define your component styles using design tokens
const BASE_CLASSES = [
  // Add your base classes here
].join(" ");

// Define variant styles
const VARIANT_STYLES: Record<YourComponentVariant, string> = {
  default: "",
};

// Define size styles
const SIZE_STYLES: Record<YourComponentSize, string> = {
  default: "",
};

/**
 * YourComponent - Brief description
 *
 * @example
 * ```tsx
 * <YourComponent variant="default">
 *   Content here
 * </YourComponent>
 * ```
 */
export const YourComponent = memo(
  forwardRef<HTMLDivElement, YourComponentProps>(function YourComponent(
    { variant = "default", size = "default", className, children, ...rest },
    ref,
  ) {
    // Implement your component logic
    const componentClasses = cn(
      BASE_CLASSES,
      VARIANT_STYLES[variant],
      SIZE_STYLES[size],
      className,
    );

    return (
      <div ref={ref} className={componentClasses} {...rest}>
        {children}
      </div>
    );
  }),
);

YourComponent.displayName = "YourComponent";

export default YourComponent;
