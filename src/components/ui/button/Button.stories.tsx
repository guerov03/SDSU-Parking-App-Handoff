import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, type ButtonVariant } from "./Button";

// Icon components for stories
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
      clipRule="evenodd"
    />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 22" fill="none">
    <path
      d="M6.82041 5.61538V4.84615C6.82041 3.82609 7.22563 2.84781 7.94692 2.12651C8.66821 1.40522 9.6465 1 10.6666 1C11.6866 1 12.6649 1.40522 13.3862 2.12651C14.1075 2.84781 14.5127 3.82609 14.5127 4.84615V5.61538M1.43579 5.61538H19.8973M8.16656 9.28402V18.3965M13.1666 9.28402V18.3965M3.74348 5.61538H17.5896V19.4615C17.5896 19.8696 17.4276 20.2609 17.139 20.5494C16.8505 20.8379 16.4592 21 16.0512 21H5.28195C4.87392 21 4.48261 20.8379 4.19409 20.5494C3.90557 20.2609 3.74348 19.8696 3.74348 19.4615V5.61538Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const GoogleIcon = () => (
  <svg
    width="24"
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

const VARIANT_OPTIONS: ButtonVariant[] = [
  "primary",
  "secondary",
  "outline",
  "destructive",
  "google",
];

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A production-ready Button component using design system tokens from `globals.css`. Supports variants, loading states, icons, and is optimized with React.memo for performance.",
      },
    },
  },
  args: {
    children: "Click me",
    variant: "primary",
    size: "default",
  },
  argTypes: {
    variant: {
      control: "select",
      options: VARIANT_OPTIONS,
      description: "Visual style variant of the button",
      table: {
        type: { summary: "ButtonVariant" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "select",
      options: ["default"],
      description: "Size of the button (currently only default size available)",
      table: {
        type: { summary: "ButtonSize" },
        defaultValue: { summary: "default" },
      },
    },
    isLoading: {
      control: "boolean",
      description: "Shows loading spinner and disables button",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    leadingIcon: {
      control: false,
      description: "Icon displayed before button text",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    trailingIcon: {
      control: false,
      description: "Icon displayed after button text",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    onClick: {
      action: "clicked",
      description: "Click event handler",
    },
    children: {
      control: "text",
      description: "Button label text",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

/**
 * Default playground story for interactive testing
 */
export const Playground: Story = {};

/**
 * Primary button variant - main call-to-action
 */
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

/**
 * Secondary button variant - less prominent actions
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

/**
 * Outline button variant - tertiary actions
 */
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

/**
 * Destructive button variant - dangerous actions
 */
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete",
  },
};

/**
 * Google button variant - OAuth sign-in
 */
export const Google: Story = {
  args: {
    variant: "google",
    leadingIcon: <GoogleIcon />,
    children: "Sign in with Google",
  },
};

/**
 * All button variants displayed together
 */
export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-[var(--component-page-gap-tight)]">
      {VARIANT_OPTIONS.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Shows all available button variants side by side.",
      },
    },
  },
};

/**
 * Button in loading state
 */
export const Loading: Story = {
  args: {
    isLoading: true,
    children: "Loading...",
  },
  parameters: {
    docs: {
      description: {
        story: "Loading state displays a spinner and disables interaction.",
      },
    },
  },
};

/**
 * All variants in loading state
 */
export const LoadingStates: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-[var(--component-page-gap-tight)]">
      {VARIANT_OPTIONS.map((variant) => (
        <Button key={variant} {...args} variant={variant} isLoading>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "All button variants in loading state.",
      },
    },
  },
};

/**
 * Disabled button state
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled buttons cannot be interacted with.",
      },
    },
  },
};

/**
 * Button with leading icon
 */
export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: <HomeIcon />,
    children: "Go Home",
  },
  parameters: {
    docs: {
      description: {
        story: "Buttons can display an icon before the text.",
      },
    },
  },
};

/**
 * Button with trailing icon
 */
export const WithTrailingIcon: Story = {
  args: {
    trailingIcon: <ArrowRightIcon />,
    children: "Continue",
  },
  parameters: {
    docs: {
      description: {
        story: "Buttons can display an icon after the text.",
      },
    },
  },
};

/**
 * Button with both leading and trailing icons
 */
export const WithBothIcons: Story = {
  args: {
    leadingIcon: <HomeIcon />,
    trailingIcon: <ArrowRightIcon />,
    children: "Home & Continue",
  },
  parameters: {
    docs: {
      description: {
        story: "Buttons can display icons on both sides.",
      },
    },
  },
};

/**
 * Icon-only button (no text)
 */
export const IconOnly: Story = {
  args: {
    leadingIcon: <TrashIcon />,
    children: undefined,
    "aria-label": "Delete",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Icon-only buttons should include an aria-label for accessibility.",
      },
    },
  },
};

/**
 * Destructive action with icon
 */
export const DestructiveWithIcon: Story = {
  args: {
    variant: "destructive",
    leadingIcon: <TrashIcon />,
    children: "Delete Account",
  },
  parameters: {
    docs: {
      description: {
        story: "Destructive actions with icons for clear visual communication.",
      },
    },
  },
};

/**
 * Complex example with multiple states
 */
export const InteractiveDemo: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--component-page-gap-comfortable)]">
      <div className="flex flex-wrap gap-[var(--component-page-gap-tight)]">
        <Button variant="primary" leadingIcon={<HomeIcon />}>
          Home
        </Button>
        <Button variant="secondary">Cancel</Button>
        <Button variant="outline" trailingIcon={<ArrowRightIcon />}>
          Next
        </Button>
      </div>

      <div className="flex flex-wrap gap-[var(--component-page-gap-tight)]">
        <Button variant="primary" isLoading>
          Saving...
        </Button>
        <Button variant="destructive" leadingIcon={<TrashIcon />}>
          Delete
        </Button>
        <Button variant="outline" disabled>
          Unavailable
        </Button>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Comprehensive example showing various button combinations and states.",
      },
    },
  },
};
