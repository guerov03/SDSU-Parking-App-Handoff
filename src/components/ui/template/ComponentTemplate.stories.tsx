/**
 * STORYBOOK TEMPLATE
 *
 * Use this file to create Storybook stories for your component
 * Stories allow you to:
 * - Preview component variants in isolation
 * - Test different prop combinations
 * - Document component usage for other developers
 * - Perform visual regression testing
 *
 * 1. SETUP META
 * ------------------
 * Configure the component metadata for Storybook
 *
 * - title: Navigation path in Storybook sidebar
 * - component: The component being documented
 * - parameters: Storybook specific settings
 * - tags: Optional tags like 'autodocs' for automatic documentation
 * - argTypes: Control types for interactive props
 *
 * 2. CREATE STORIES
 * ----------------------
 * Each story represents a specific use case or variant of your component
 *
 * Common story patterns:
 * - Default: Basic usage with default props
 * - Variants: One story per variant
 * - Sizes: Different size options
 * - States: Loading, disabled, error states
 * - With Icons: Components with leading/trailing icons
 * - Complex: Real-world usage scenarios
 *
 * 3. DEFINE ARGS
 * -------------------
 * Args are the props passed to your component in each story
 * They appear as interactive controls in Storybook
 *
 */

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { YourComponent } from "./ComponentTemplate";

// Update this configuration for your component
const meta = {
  // Title appears in Storybook sidebar
  title: "UI/YourComponent",

  // The component being documented
  component: YourComponent,

  // Storybook layout: 'centered', 'fullscreen', or 'padded'
  parameters: {
    layout: "centered",
  },

  // Optional: Enable automatic documentation
  // tags: ["autodocs"],

  // Optional: Control types for interactive props
  // argTypes: {
  //   variant: {
  //     control: "select",
  //     options: ["primary", "secondary", "outline"],
  //     description: "Visual style variant",
  //   },
  //   size: {
  //     control: "radio",
  //     options: ["small", "default", "large"],
  //   },
  //   disabled: {
  //     control: "boolean",
  //   },
  // },
} satisfies Meta<typeof YourComponent>;

export default meta;

type Story = StoryObj<typeof YourComponent>;

/**
 * STORY EXAMPLES
 * --------------
 */

// Default story - Basic usage
export const Default: Story = {
  args: {
    children: "Your component content here",
  },
};

// Add more stories for different variants
/*
export const PrimaryVariant: Story = {
  args: {
    variant: "primary",
    children: "Primary variant example",
  },
};

export const SecondaryVariant: Story = {
  args: {
    variant: "secondary",
    children: "Secondary variant example",
  },
};

export const SmallSize: Story = {
  args: {
    size: "small",
    children: "Small size example",
  },
};

export const LargeSize: Story = {
  args: {
    size: "large",
    children: "Large size example",
  },
};

export const WithIcon: Story = {
  args: {
    leadingIcon: <YourIconComponent />,
    children: "With leading icon",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled state",
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: "Loading state",
  },
};

// Complex example with multiple props
export const Complex: Story = {
  args: {
    variant: "primary",
    size: "large",
    leadingIcon: <YourIconComponent />,
    children: "Complex example with multiple props",
  },
};

// Example showing component in a real-world context
export const InContext: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <YourComponent variant="primary">First item</YourComponent>
      <YourComponent variant="secondary">Second item</YourComponent>
      <YourComponent variant="outline">Third item</YourComponent>
    </div>
  ),
};
*/

/**
 * PLAYGROUND
 * ----------------------
 * Modify all props through Storybook controls
 */
export const Playground: Story = {
  args: {
    // Set initial values for all props
    variant: "default",
    size: "default",
    children: "Edit props in the controls panel →",
  },
};
