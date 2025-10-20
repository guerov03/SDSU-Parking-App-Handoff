import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Badge, type BadgeVariant } from "./Badge";

// Icon components for stories
const DotIcon = () => (
  <span
    aria-hidden="true"
    className="inline-block h-[var(--component-badge-icon-size)] w-[var(--component-badge-icon-size)] rounded-full bg-current"
  />
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const AlertIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const VARIANT_OPTIONS: BadgeVariant[] = [
  "primary",
  "secondary",
  "neutral",
  "success",
  "warning",
  "error",
  "info",
  "alert",
  "green",
  "indigo",
  "navy",
  "teal",
  "purple",
  "pink",
  "orange",
  "sand",
  "yellow",
  "red",
];

// Dismissible variants (with built-in close icon)
const DISMISSIBLE_VARIANTS: BadgeVariant[] = [
  "primary-dismissible",
  "secondary-dismissible",
  "neutral-dismissible",
  "success-dismissible",
  "warning-dismissible",
  "error-dismissible",
  "info-dismissible",
  "alert-dismissible",
  "green-dismissible",
  "indigo-dismissible",
  "navy-dismissible",
  "teal-dismissible",
  "purple-dismissible",
  "pink-dismissible",
  "orange-dismissible",
  "sand-dismissible",
  "yellow-dismissible",
  "red-dismissible",
];

// Group variants by category for better organization
const SEMANTIC_VARIANTS: BadgeVariant[] = [
  "primary",
  "secondary",
  "neutral",
  "success",
  "warning",
  "error",
  "info",
  "alert",
];
const COLOR_VARIANTS: BadgeVariant[] = [
  "green",
  "indigo",
  "navy",
  "teal",
  "purple",
  "pink",
  "orange",
  "sand",
  "yellow",
  "red",
];

const SEMANTIC_DISMISSIBLE: BadgeVariant[] = [
  "primary-dismissible",
  "secondary-dismissible",
  "neutral-dismissible",
  "success-dismissible",
  "warning-dismissible",
  "error-dismissible",
  "info-dismissible",
  "alert-dismissible",
];

const COLOR_DISMISSIBLE: BadgeVariant[] = [
  "green-dismissible",
  "indigo-dismissible",
  "navy-dismissible",
  "teal-dismissible",
  "purple-dismissible",
  "pink-dismissible",
  "orange-dismissible",
  "sand-dismissible",
  "yellow-dismissible",
  "red-dismissible",
];

const meta = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A production-ready Badge component using design system tokens from `globals.css`. Supports 35+ variants (18 standard + 18 dismissible), icons, and is optimized with React.memo for performance. Perfect for status indicators, labels, tags, and dismissible chips.",
      },
    },
  },
  args: {
    children: "Badge",
    variant: "neutral",
  },
  argTypes: {
    variant: {
      control: "select",
      options: VARIANT_OPTIONS,
      description: "Visual style variant of the badge",
      table: {
        type: { summary: "BadgeVariant" },
        defaultValue: { summary: "neutral" },
        category: "Appearance",
      },
    },
    leadingIcon: {
      control: false,
      description: "Icon displayed before badge text",
      table: {
        type: { summary: "ReactNode" },
        category: "Content",
      },
    },
    trailingIcon: {
      control: false,
      description: "Icon displayed after badge text",
      table: {
        type: { summary: "ReactNode" },
        category: "Content",
      },
    },
    children: {
      control: "text",
      description: "Badge label text",
      table: {
        type: { summary: "ReactNode" },
        category: "Content",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        type: { summary: "string" },
        category: "Styling",
      },
    },
    onDismiss: {
      action: "dismissed",
      description: "Callback fired when dismissible badge is clicked",
      table: {
        type: { summary: "() => void" },
        category: "Events",
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof Badge>;

/**
 * Default playground story for interactive testing
 */
export const Playground: Story = {};

/**
 * All badge variants displayed together
 */
export const AllVariants: Story = {
  render: (args) => (
    <div className="flex max-w-[600px] flex-wrap items-center gap-[var(--component-page-gap-tight)]">
      {VARIANT_OPTIONS.map((variant) => (
        <Badge key={variant} {...args} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Badge>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Shows all 17 available badge variants side by side.",
      },
    },
  },
};

/**
 * Semantic badge variants for status and states
 */
export const SemanticVariants: Story = {
  render: (args) => (
    <div className="flex max-w-[500px] flex-wrap items-center gap-[var(--component-page-gap-tight)]">
      {SEMANTIC_VARIANTS.map((variant) => (
        <Badge key={variant} {...args} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Badge>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Semantic variants for common UI states: primary, secondary, neutral, success, warning, error, info, alert.",
      },
    },
  },
};

/**
 * Color badge variants for categorization
 */
export const ColorVariants: Story = {
  render: (args) => (
    <div className="flex max-w-[500px] flex-wrap items-center gap-[var(--component-page-gap-tight)]">
      {COLOR_VARIANTS.map((variant) => (
        <Badge key={variant} {...args} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Badge>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Color variants for flexible categorization and tagging: green, indigo, navy, teal, purple, pink, orange, sand, yellow, red.",
      },
    },
  },
};

/**
 * Badge with leading icon
 */
export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: <CheckIcon />,
    children: "Verified",
    variant: "success",
  },
  parameters: {
    docs: {
      description: {
        story: "Badges can display an icon before the text.",
      },
    },
  },
};

/**
 * Badge with trailing icon
 */
export const WithTrailingIcon: Story = {
  args: {
    trailingIcon: <CloseIcon />,
    children: "Dismissible",
    variant: "neutral",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Badges can display an icon after the text, useful for dismissible badges.",
      },
    },
  },
};

/**
 * Badge with both icons
 */
export const WithBothIcons: Story = {
  args: {
    leadingIcon: <DotIcon />,
    trailingIcon: <CloseIcon />,
    children: "Active Tag",
    variant: "primary",
  },
  parameters: {
    docs: {
      description: {
        story: "Badges can display icons on both sides.",
      },
    },
  },
};

/**
 * Status indicators with appropriate icons
 */
export const StatusIndicators: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--component-page-gap-tight)]">
      <div className="flex flex-wrap gap-[var(--component-page-gap-tight)]">
        <Badge variant="success" leadingIcon={<CheckIcon />}>
          Completed
        </Badge>
        <Badge variant="warning" leadingIcon={<AlertIcon />}>
          Warning
        </Badge>
        <Badge variant="error" leadingIcon={<AlertIcon />}>
          Error
        </Badge>
        <Badge variant="info" leadingIcon={<InfoIcon />}>
          Information
        </Badge>
      </div>
      <div className="flex flex-wrap gap-[var(--component-page-gap-tight)]">
        <Badge variant="primary" leadingIcon={<DotIcon />}>
          In Progress
        </Badge>
        <Badge variant="neutral" leadingIcon={<DotIcon />}>
          Draft
        </Badge>
        <Badge variant="secondary" leadingIcon={<DotIcon />}>
          Pending
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Common status indicators with appropriate icons and variants.",
      },
    },
  },
};

/**
 * Tag collection example
 */
export const TagCollection: Story = {
  render: () => (
    <div className="flex max-w-[500px] flex-wrap gap-[var(--component-page-gap-tight)]">
      <Badge variant="green">React</Badge>
      <Badge variant="navy">TypeScript</Badge>
      <Badge variant="purple">Next.js</Badge>
      <Badge variant="teal">Tailwind CSS</Badge>
      <Badge variant="pink">Storybook</Badge>
      <Badge variant="orange">Vitest</Badge>
      <Badge variant="indigo">Design System</Badge>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Example of using badges as tags with different color variants for categorization.",
      },
    },
  },
};

/**
 * All dismissible variants with built-in close icon
 */
export const AllDismissibleVariants: Story = {
  render: (args) => (
    <div className="flex max-w-[600px] flex-wrap items-center gap-[var(--component-page-gap-tight)]">
      {DISMISSIBLE_VARIANTS.map((variant) => (
        <Badge
          key={variant}
          {...args}
          variant={variant}
          onDismiss={() => console.log(`${variant} dismissed`)}
        >
          {variant.replace("-dismissible", "").charAt(0).toUpperCase() +
            variant.replace("-dismissible", "").slice(1)}
        </Badge>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "All 18 dismissible badge variants with built-in close icons. Click any badge to trigger the dismiss action.",
      },
    },
  },
};

/**
 * Semantic dismissible variants
 */
export const SemanticDismissible: Story = {
  render: () => (
    <div className="flex max-w-[500px] flex-wrap items-center gap-[var(--component-page-gap-tight)]">
      {SEMANTIC_DISMISSIBLE.map((variant) => (
        <Badge
          key={variant}
          variant={variant}
          onDismiss={() => console.log(`${variant} dismissed`)}
        >
          {variant.replace("-dismissible", "").charAt(0).toUpperCase() +
            variant.replace("-dismissible", "").slice(1)}
        </Badge>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Semantic dismissible variants for status-based tags that can be removed by users.",
      },
    },
  },
};

/**
 * Color dismissible variants
 */
export const ColorDismissible: Story = {
  render: () => (
    <div className="flex max-w-[500px] flex-wrap items-center gap-[var(--component-page-gap-tight)]">
      {COLOR_DISMISSIBLE.map((variant) => (
        <Badge
          key={variant}
          variant={variant}
          onDismiss={() => console.log(`${variant} dismissed`)}
        >
          {variant.replace("-dismissible", "").charAt(0).toUpperCase() +
            variant.replace("-dismissible", "").slice(1)}
        </Badge>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Color dismissible variants for category tags that can be removed by users.",
      },
    },
  },
};

/**
 * Interactive dismissible demo
 */
export const DismissibleDemo: Story = {
  render: function DismissibleDemoComponent() {
    const [tags, setTags] = React.useState([
      { id: 1, label: "React", variant: "green-dismissible" as BadgeVariant },
      {
        id: 2,
        label: "TypeScript",
        variant: "navy-dismissible" as BadgeVariant,
      },
      {
        id: 3,
        label: "Next.js",
        variant: "purple-dismissible" as BadgeVariant,
      },
      { id: 4, label: "Tailwind", variant: "teal-dismissible" as BadgeVariant },
      {
        id: 5,
        label: "Active",
        variant: "success-dismissible" as BadgeVariant,
      },
      {
        id: 6,
        label: "Warning",
        variant: "warning-dismissible" as BadgeVariant,
      },
    ]);

    const removeTag = (id: number) => {
      setTags(tags.filter((tag) => tag.id !== id));
    };

    return (
      <div className="flex flex-col gap-[var(--component-page-gap-default)] max-w-[500px]">
        <p className="text-[length:var(--semantic-text-size-body-sm)] text-[color:var(--semantic-text-secondary)]">
          Click on any badge to remove it:
        </p>
        <div className="flex flex-wrap gap-[var(--component-page-gap-tight)]">
          {tags.map((tag) => (
            <Badge
              key={tag.id}
              variant={tag.variant}
              onDismiss={() => removeTag(tag.id)}
            >
              {tag.label}
            </Badge>
          ))}
        </div>
        {tags.length === 0 && (
          <p className="text-[length:var(--semantic-text-size-body-sm)] text-[color:var(--semantic-text-secondary)] italic">
            All tags removed! Refresh to reset.
          </p>
        )}
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Interactive example showing dismissible badges being removed from the UI when clicked.",
      },
    },
  },
};

/**
 * Icon-only badges (no text)
 */
export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-wrap gap-[var(--component-page-gap-tight)]">
      <Badge
        variant="success"
        leadingIcon={<CheckIcon />}
        aria-label="Success"
      />
      <Badge
        variant="warning"
        leadingIcon={<AlertIcon />}
        aria-label="Warning"
      />
      <Badge variant="error" leadingIcon={<AlertIcon />} aria-label="Error" />
      <Badge variant="info" leadingIcon={<InfoIcon />} aria-label="Info" />
      <Badge variant="primary" leadingIcon={<DotIcon />} aria-label="Active" />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Icon-only badges should include an aria-label for accessibility.",
      },
    },
  },
};

/**
 * Real-world usage examples
 */
export const RealWorldExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--component-page-gap-comfortable)] max-w-[600px]">
      {/* Parking lot status */}
      <div className="flex flex-col gap-[var(--component-page-gap-tight)]">
        <span className="text-[length:var(--semantic-text-size-body-sm)] font-[var(--semantic-text-weight-semibold)]">
          Parking Lot Status:
        </span>
        <div className="flex flex-wrap gap-[var(--component-page-gap-tight)]">
          <Badge variant="success" leadingIcon={<CheckIcon />}>
            Available
          </Badge>
          <Badge variant="warning" leadingIcon={<DotIcon />}>
            Limited
          </Badge>
          <Badge variant="error" leadingIcon={<AlertIcon />}>
            Full
          </Badge>
          <Badge variant="neutral" leadingIcon={<DotIcon />}>
            Closed
          </Badge>
        </div>
      </div>

      {/* User roles */}
      <div className="flex flex-col gap-[var(--component-page-gap-tight)]">
        <span className="text-[length:var(--semantic-text-size-body-sm)] font-[var(--semantic-text-weight-semibold)]">
          User Roles:
        </span>
        <div className="flex flex-wrap gap-[var(--component-page-gap-tight)]">
          <Badge variant="purple">Admin</Badge>
          <Badge variant="indigo">Moderator</Badge>
          <Badge variant="navy">Student</Badge>
          <Badge variant="teal">Faculty</Badge>
        </div>
      </div>

      {/* Categories - Using dismissible variants */}
      <div className="flex flex-col gap-[var(--component-page-gap-tight)]">
        <span className="text-[length:var(--semantic-text-size-body-sm)] font-[var(--semantic-text-weight-semibold)]">
          Selected Parking Structures (Dismissible):
        </span>
        <div className="flex flex-wrap gap-[var(--component-page-gap-tight)]">
          <Badge
            variant="green-dismissible"
            onDismiss={() => console.log("Removed Structure 1")}
          >
            Structure 1
          </Badge>
          <Badge
            variant="orange-dismissible"
            onDismiss={() => console.log("Removed Structure 7")}
          >
            Structure 7
          </Badge>
          <Badge
            variant="pink-dismissible"
            onDismiss={() => console.log("Removed Lot 5")}
          >
            Lot 5
          </Badge>
          <Badge
            variant="teal-dismissible"
            onDismiss={() => console.log("Removed Lot 12")}
          >
            Lot 12
          </Badge>
        </div>
      </div>

      {/* Filter tags - Using dismissible variants */}
      <div className="flex flex-col gap-[var(--component-page-gap-tight)]">
        <span className="text-[length:var(--semantic-text-size-body-sm)] font-[var(--semantic-text-weight-semibold)]">
          Active Filters (Click to Remove):
        </span>
        <div className="flex flex-wrap gap-[var(--component-page-gap-tight)]">
          <Badge
            variant="primary-dismissible"
            onDismiss={() => console.log("Removed Available filter")}
          >
            Available
          </Badge>
          <Badge
            variant="secondary-dismissible"
            onDismiss={() => console.log("Removed Near Me filter")}
          >
            Near Me
          </Badge>
          <Badge
            variant="info-dismissible"
            onDismiss={() => console.log("Removed Covered filter")}
          >
            Covered
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Real-world examples showing how badges can be used in a parking app context, including dismissible variants for removable tags and filters.",
      },
    },
  },
};
