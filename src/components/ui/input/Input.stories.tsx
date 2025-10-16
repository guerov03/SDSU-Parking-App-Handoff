import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input, type InputSize } from "./Input";

// Icon components for stories
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
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
      <Input
        placeholder="ab"
        error
      />
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
