import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input, type InputSize } from "./input";

// Example icon components for stories (using inline SVG)
const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 3h14c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 5l-9 6-9-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="9"
      width="14"
      height="10"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M6 9V6a4 4 0 0 1 8 0v3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 6L7.5 14.5L4 11"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AlertIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 6a1 1 0 112 0v4a1 1 0 11-2 0V6zm1 9a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
  </svg>
);

const SIZE_OPTIONS: InputSize[] = ["default"];

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A production-ready Input field component using design system tokens from `globals.css`. Simple, clean design with placeholder text. Icons are 20px (h-5 w-5).",
      },
    },
  },
  args: {
    placeholder: "Enter text...",
    size: "default",
  },
  argTypes: {
    size: {
      control: "select",
      options: SIZE_OPTIONS,
      description: "Size of the input field",
      table: {
        type: { summary: "InputSize" },
        defaultValue: { summary: "default" },
      },
    },
    error: {
      control: "boolean",
      description: "Shows error state with red 2px border",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the input field",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    leadingIcon: {
      control: false,
      description: "Icon displayed at the start of the input (20px size)",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    trailingIcon: {
      control: false,
      description: "Icon displayed at the end of the input (20px size)",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
      table: {
        type: { summary: "string" },
      },
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
      description: "HTML input type",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "text" },
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground to test all input props
 */
export const Playground: Story = {
  args: {
    placeholder: "Type something...",
  },
};

/**
 * Basic input without any additional props
 */
export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

/**
 * Input with leading icon (20px)
 */
export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: <SearchIcon />,
    placeholder: "Search...",
  },
};

/**
 * Input with trailing icon (20px)
 */
export const WithTrailingIcon: Story = {
  args: {
    trailingIcon: <CheckIcon />,
    placeholder: "Verified input",
  },
};

/**
 * Input with both leading and trailing icons (20px each)
 */
export const WithBothIcons: Story = {
  args: {
    leadingIcon: <MailIcon />,
    trailingIcon: <CheckIcon />,
    placeholder: "verified@email.com",
  },
};

/**
 * Disabled input state
 */
export const Disabled: Story = {
  args: {
    placeholder: "Cannot edit this",
    disabled: true,
  },
};

/**
 * Error state input with red 2px border
 */
export const Error: Story = {
  args: {
    placeholder: "invalid-email",
    error: true,
  },
};

/**
 * Error state with icons
 */
export const ErrorWithIcon: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
    leadingIcon: <LockIcon />,
    trailingIcon: <AlertIcon />,
    error: true,
  },
};

/**
 * All input states displayed together
 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--component-page-gap-default)] w-full">
      <Input placeholder="Default state" />
      <Input placeholder="With leading icon" leadingIcon={<SearchIcon />} />
      <Input placeholder="With trailing icon" trailingIcon={<CheckIcon />} />
      <Input placeholder="Disabled state" disabled />
      <Input placeholder="Error state" error />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shows all possible states of the input component",
      },
    },
  },
};

/**
 * Login form example
 */
export const LoginForm: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--component-page-gap-default)] w-full">
      <h2 className="text-[length:var(--semantic-text-size-h2)] font-[var(--semantic-text-weight-semibold)]">
        Sign In
      </h2>
      <Input
        type="email"
        placeholder="your.email@sdsu.edu"
        leadingIcon={<MailIcon />}
      />
      <Input
        type="password"
        placeholder="Enter your password"
        leadingIcon={<LockIcon />}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Login form example matching your app's design",
      },
    },
  },
};

/**
 * Error validation example
 */
export const ValidationExample: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--component-page-gap-comfortable)] w-full">
      <Input
        type="email"
        placeholder="invalid-email"
        leadingIcon={<MailIcon />}
        error
      />
      <Input
        type="password"
        placeholder="123"
        leadingIcon={<LockIcon />}
        trailingIcon={<AlertIcon />}
        error
      />
      <Input placeholder="ab" error />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Form validation error states with red 2px borders",
      },
    },
  },
};

/**
 * Different input types
 */
export const InputTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--component-page-gap-default)] w-full">
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="email@example.com" />
      <Input type="password" placeholder="Enter password" />
      <Input type="number" placeholder="123" />
      <Input type="tel" placeholder="(555) 123-4567" />
      <Input type="url" placeholder="https://example.com" />
      <Input type="search" placeholder="Search..." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Various HTML5 input types supported",
      },
    },
  },
};
