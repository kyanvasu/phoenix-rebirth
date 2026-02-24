# Kanvas Phoenix Rebirth

<p align="center">
  <img src="https://img.shields.io/npm/v/@kanvas/phoenix-rebirth" alt="npm version" />
  <img src="https://img.shields.io/npm/l/@kanvas/phoenix-rebirth" alt="license" />
  <img src="https://img.shields.io/npm/dm/@kanvas/phoenix-rebirth" alt="downloads" />
</p>

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Configuration](#configuration)
- [Core Components](#core-components)
  - [Base UI Components](#base-ui-components)
  - [Block Components](#block-components)
  - [Control Flow Components](#control-flow-components)
- [Hooks](#hooks)
- [Utilities](#utilities)
- [Advanced Features](#advanced-features)
  - [Slots Pattern](#slots-pattern)
  - [Form Builder](#form-builder)
  - [Tour System](#tour-system)
  - [Threading](#threading)
- [Views](#views)
- [API Reference](#api-reference)
- [Full API Catalog](#full-api-catalog)
- [Best Practices](#best-practices)
- [Migration Guide](#migration-guide)
- [Contributing](#contributing)
- [License](#license)

## Overview

Kanvas Phoenix Rebirth is a comprehensive React component library built on top of shadcn/ui, designed to accelerate enterprise application development. It provides a rich set of pre-built components, hooks, utilities, and patterns that streamline the creation of modern, accessible, and performant user interfaces.

### Key Features

- 40+ customizable UI components based on shadcn/ui
- Advanced React hooks for state management and side effects
- Utility functions for common patterns
- Form builder system with validation
- Slots pattern for flexible component composition
- Web Worker support for heavy computations
- TypeScript-first with full type safety
- Accessible by default following WAI-ARIA standards
- Dark mode support out of the box
- Responsive design with a mobile-first approach
- Tailwind CSS v4 integration with latest features

## Installation

### Prerequisites

- Node.js >= 21.0.0
- React >= 18.3.0
- Next.js >= 15.0.0 (recommended)
- [Kanvas Core JS](https://github.com/bakaphp/kanvas-core-js#kanvas-core-js) installed

For the best editor autocomplete, use TypeScript 5.4+ with `moduleResolution` set to `"node"`, `"node16"`, or `"bundler"`.

### Package Installation

```bash
npm install @kanvas/phoenix-rebirth
# or
pnpm add @kanvas/phoenix-rebirth
# or
yarn add @kanvas/phoenix-rebirth
```

## Configuration

### 1. PostCSS Configuration

Create `postcss.config.mjs`:

```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### 2. Global CSS Setup

In your main CSS file (e.g., `app/globals.css`):

```css
/* Import Tailwind CSS v4 */
@import "tailwindcss";

/* Import Phoenix Rebirth styles */
@import "@kanvas/phoenix-rebirth/global.css";

/* Optional: Import tour styles if using tour functionality */
@import "@kanvas/phoenix-rebirth/tour.css";

/* Import animations */
@import "tw-animate-css";

/* Custom theme overrides (optional) */
@custom-variant dark (&:is(.dark *));

@theme inline {
  /* Add custom theme tokens if needed */
  --color-brand-50: oklch(0.95 0.01 210);
  --color-brand-500: oklch(0.6 0.2 210);
  --color-brand-900: oklch(0.3 0.15 210);
}

/* Custom CSS variables (optional) */
:root {
  /* Override Phoenix Rebirth variables if needed */
  --primary: oklch(0.8009 0.1995 124.29);
  --primary-foreground: oklch(0.985 0 0);
}

.dark {
  --primary: oklch(0.92 0.004 286.32);
  --primary-foreground: oklch(0.21 0.006 285.885);
}
```

### 3. Next.js App Router Setup

For Next.js applications, simply import the CSS in your root layout:

```tsx
// app/layout.tsx
import "@kanvas/phoenix-rebirth/global.css";
import "./globals.css"; // Your custom styles

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

## Core Components

### Base UI Components

All base components are imported from shadcn/ui and are fully customizable:

```tsx
import { Button } from "@kanvas/phoenix-rebirth/ui/button";
import { Input } from "@kanvas/phoenix-rebirth/ui/input";
import { Card, CardContent, CardHeader } from "@kanvas/phoenix-rebirth/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
} from "@kanvas/phoenix-rebirth/ui/select";
```

#### Available Components

<details>
<summary>View all 40+ components</summary>

- **Layout**: Card, Separator, Sheet, Sidebar
- **Forms**: Input, Textarea, Select, Checkbox, Radio, Switch, Slider, Calendar, DatePicker
- **Buttons**: Button, Toggle, ToggleGroup
- **Navigation**: Tabs, NavigationMenu, Breadcrumb, Pagination
- **Data Display**: Table, Badge, Avatar, Progress, Skeleton
- **Feedback**: Alert, Toast, Dialog, AlertDialog, Tooltip, Popover
- **Typography**: Label, Badge
- **Media**: AspectRatio, Avatar
- **Overlays**: Dialog, Drawer, HoverCard, Popover, Sheet, Tooltip
- **Utilities**: Collapsible, ScrollArea, Separator

</details>

### Block Components

Enhanced composite components for complex use cases:

#### DialogAlert

A pre-styled alert dialog with action handlers:

```tsx
import { DialogAlert } from "@kanvas/phoenix-rebirth/blocks/dialog";
import { Show } from "@kanvas/phoenix-rebirth/lib/server";

function DeleteConfirmation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Delete Item</Button>

      <Show when={open} deps={[open]}>
        <DialogAlert
          open={open}
          onOpenChange={setOpen}
          title="Delete Item"
          description="Are you sure you want to delete this item? This action cannot be undone."
          dangerAction={true}
          action={{
            title: "Delete",
            pending: isDeleting,
          }}
          cancel={{
            title: "Cancel",
          }}
          onAction={async () => {
            await deleteItem();
            setOpen(false);
          }}
        />
      </Show>
    </>
  );
}
```

#### ModalDialog

Responsive modal that adapts to mobile (drawer) and desktop (dialog):

```tsx
import { ModalDialog } from "@kanvas/phoenix-rebirth/blocks/modal";
import { Show } from "@kanvas/phoenix-rebirth/lib/server";

function CreateUserModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);

  return (
    <Show when={isOpen} deps={[isOpen]}>
      <ModalDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Create New User"
        action={{
          title: "Create",
          disable: !isValid,
          pending: isCreating,
          type: "submit",
        }}
        onAction={handleCreate}
      >
        <form className="space-y-4">
          <Input name="name" placeholder="Enter name" />
          <Input name="email" type="email" placeholder="Enter email" />
        </form>
      </ModalDialog>
    </Show>
  );
}
```

#### Advanced Table

Data table with built-in sorting, filtering, and pagination:

```tsx
import {
  Table,
  columnsBuilder,
  useTable,
  TableSlot,
} from "@kanvas/phoenix-rebirth/blocks/table";
import { For, Show } from "@kanvas/phoenix-rebirth/lib/server";

function UserTable() {
  const columns = columnsBuilder(
    [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("name")}</div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            variant={
              row.getValue("status") === "active" ? "default" : "secondary"
            }
          >
            {row.getValue("status")}
          </Badge>
        ),
      },
    ],
    []
  );

  const { table } = useTable({
    data: users,
    columns,
  });

  return (
    <Table table={table} isFetching={isLoading}>
      <TableSlot name="top">
        <div className="flex justify-between p-4">
          <Input placeholder="Search users..." />
          <Button>Add User</Button>
        </div>
      </TableSlot>
      <TableSlot name="bottom">
        <Pagination />
      </TableSlot>
    </Table>
  );
}
```

### Control Flow Components

React components for declarative rendering logic - **use these instead of traditional React patterns**:

#### For Component

Iterate over arrays with built-in error boundaries:

```tsx
import { For } from "@kanvas/phoenix-rebirth/lib/server";

function ProductList({ products }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <For
        each={products}
        fallback={<div>No products found</div>}
        error={<div>Error loading product</div>}
      >
        {(product, { index, key }) => (
          <Card key={key}>
            <CardHeader>{product.name}</CardHeader>
            <CardContent>
              <p>Price: ${product.price}</p>
              <p>Position: {index + 1}</p>
            </CardContent>
          </Card>
        )}
      </For>
    </div>
  );
}

// ❌ Don't use traditional map
// products.map(product => ...)
```

#### Show Component

Conditional rendering with dependency tracking:

```tsx
import { Show } from "@kanvas/phoenix-rebirth/lib/server";

function UserProfile({ user, isLoading }) {
  return (
    <Show
      when={!isLoading && user}
      deps={[isLoading, user]}
      fallback={<Skeleton className="h-40 w-full" />}
    >
      <Card>
        <CardHeader>{user.name}</CardHeader>
        <CardContent>{user.bio}</CardContent>
      </Card>
    </Show>
  );
}

// ❌ Don't use ternary operators
// isLoading ? <Skeleton /> : <Card>...</Card>
```

#### Switch/Match Components

Multiple conditional rendering:

```tsx
import { Switch, Match } from "@kanvas/phoenix-rebirth/lib/server";

function StatusIndicator({ status }) {
  return (
    <Switch fallback={<Badge variant="secondary">Unknown</Badge>}>
      <Match when={status === "active"}>
        <Badge variant="default">Active</Badge>
      </Match>
      <Match when={status === "pending"}>
        <Badge variant="warning">Pending</Badge>
      </Match>
      <Match when={status === "inactive"}>
        <Badge variant="destructive">Inactive</Badge>
      </Match>
    </Switch>
  );
}

// ❌ Don't use multiple ternaries or if-else chains
// status === "active" ? ... : status === "pending" ? ... : ...
```

## Hooks

### useToast

Display toast notifications:

```tsx
import { useToast } from "@kanvas/phoenix-rebirth/hooks";
import { Toaster } from "@kanvas/phoenix-rebirth/ui/toaster";
import { Show } from "@kanvas/phoenix-rebirth/lib/server";

function App() {
  const { toast, toasts } = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      toast({
        title: "Success",
        description: "Your changes have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Button onClick={handleSave}>Save</Button>
      <Show when={toasts.length > 0} deps={[toasts]}>
        <Toaster />
      </Show>
    </>
  );
}
```

### useIsMobile

Detect mobile viewport:

```tsx
import { useIsMobile } from "@kanvas/phoenix-rebirth/hooks";
import { Show } from "@kanvas/phoenix-rebirth/lib/server";

function ResponsiveLayout() {
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? "grid-cols-1" : "grid-cols-3"}>
      <Show when={isMobile} deps={[isMobile]} fallback={<DesktopNav />}>
        <MobileNav />
      </Show>
    </div>
  );
}
```

### useEvents

Custom event emitter for cross-component communication:

```tsx
import { useEvents } from "@kanvas/phoenix-rebirth/lib/utils";
import { Show } from "@kanvas/phoenix-rebirth/lib/server";

// Component A - Emitter
function SearchBar() {
  const { emit } = useEvents<string>();

  const handleSearch = (query: string) => {
    emit("search", query);
  };

  return <Input onChange={(e) => handleSearch(e.target.value)} />;
}

// Component B - Listener
function SearchResults() {
  const { on } = useEvents<string>();
  const [query, setQuery] = useState("");

  useEffect(() => {
    return on("search", ({ detail }) => {
      setQuery(detail);
    });
  }, []);

  return (
    <Show when={query} deps={[query]} fallback={<div>No search query</div>}>
      <div>Searching for: {query}</div>
    </Show>
  );
}
```

### useSet

State management for Set data structure:

```tsx
import { useSet } from "@kanvas/phoenix-rebirth/lib/utils";
import { For, Show } from "@kanvas/phoenix-rebirth/lib/server";

function TagSelector() {
  const selectedTags = useSet<string>(["react", "typescript"]);

  return (
    <div>
      <div className="flex gap-2">
        <For each={tags}>
          {(tag, { key }) => (
            <Badge
              key={key}
              variant={selectedTags.has(tag) ? "default" : "outline"}
              onClick={() => {
                <Show when={selectedTags.has(tag)} deps={[selectedTags.value]}>
                  {() => selectedTags.delete(tag)}
                </Show>
                <Show when={!selectedTags.has(tag)} deps={[selectedTags.value]}>
                  {() => selectedTags.add(tag)}
                </Show>
              }}
            >
              {tag}
            </Badge>
          )}
        </For>
      </div>
      <p>Selected: {selectedTags.values().join(", ")}</p>
      <Button onClick={() => selectedTags.clear()}>Clear All</Button>
    </div>
  );
}
```

### useMap

State management for Map data structure:

```tsx
import { useMap } from "@kanvas/phoenix-rebirth/lib/utils";
import { For, Show } from "@kanvas/phoenix-rebirth/lib/server";

function ShoppingCart() {
  const cart = useMap<string, number>();

  const addItem = (id: string) => {
    const current = cart.get(id) || 0;
    cart.set(id, current + 1);
  };

  const removeItem = (id: string) => {
    cart.delete(id);
  };

  return (
    <div>
      <h3>Cart Items: {cart.size()}</h3>
      <For each={cart.entries()}>
        {([id, quantity], { key }) => (
          <div key={key} className="flex justify-between">
            <span>Item {id}</span>
            <span>Qty: {quantity}</span>
            <Button size="sm" onClick={() => removeItem(id)}>
              Remove
            </Button>
          </div>
        )}
      </For>
      <Show when={cart.size() === 0} deps={[cart.value]}>
        <p>Your cart is empty</p>
      </Show>
    </div>
  );
}
```

## Utilities

### Threading Support

Execute heavy computations in Web Workers:

```tsx
import { useThread } from "@kanvas/phoenix-rebirth/lib/utils";
import { Show } from "@kanvas/phoenix-rebirth/lib/server";

function DataProcessor() {
  const { client, server } = useThread();
  const [result, setResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Client-side threading (browser)
  const processInBrowser = async () => {
    setIsProcessing(true);
    const handler = client(async () => {
      // This runs in a Web Worker
      let sum = 0;
      for (let i = 0; i < 1000000000; i++) {
        sum += i;
      }
      return sum;
    });

    const result = await handler();
    setResult(result);
    setIsProcessing(false);
  };

  // Server-side threading (Node.js)
  const processOnServer = async () => {
    setIsProcessing(true);
    const handler = server(
      async (port, data) => {
        // This runs in a Node.js Worker Thread
        const { items } = data;
        const processed = items.map((item) => item * 2);
        return processed;
      },
      { items: [1, 2, 3, 4, 5] }
    );

    const result = await handler();
    setResult(result);
    setIsProcessing(false);
  };

  return (
    <div>
      <Button onClick={processInBrowser} disabled={isProcessing}>
        Process in Browser
      </Button>
      <Button onClick={processOnServer} disabled={isProcessing}>
        Process on Server
      </Button>

      <Show when={isProcessing} deps={[isProcessing]}>
        <div>Processing...</div>
      </Show>

      <Show when={result && !isProcessing} deps={[result, isProcessing]}>
        <div>Result: {JSON.stringify(result)}</div>
      </Show>
    </div>
  );
}
```

**Note:** For server-side threading, create an API route:

```typescript
// app/api/threads/route.ts
import { POST } from "@kanvas/phoenix-rebirth/lib/threads-api";
export { POST };
```

## Advanced Features

### Slots Pattern

Build composable components with named slots:

```tsx
import {
  WithSlots,
  Slot,
  WithSlotsProps,
} from "@kanvas/phoenix-rebirth/lib/server";
import { Show } from "@kanvas/phoenix-rebirth/lib/server";

// 1. Define your slots
const DASHBOARD_SLOTS = ["header", "sidebar", "content", "footer"] as const;
type DashboardSlots = (typeof DASHBOARD_SLOTS)[number];

// 2. Create your component
interface DashboardProps extends WithSlotsProps<DashboardSlots> {
  theme?: "light" | "dark";
  collapsed?: boolean;
}

const Dashboard = ({
  slots,
  theme = "light",
  collapsed = false,
}: DashboardProps) => (
  <div className={`dashboard theme-${theme}`}>
    <header className="h-16 border-b">{slots.header}</header>
    <div className="flex">
      <Show
        when={!collapsed}
        deps={[collapsed]}
        fallback={<aside className="w-16 border-r">{slots.sidebar}</aside>}
      >
        <aside className="w-64 border-r">{slots.sidebar}</aside>
      </Show>
      <main className="flex-1 p-6">{slots.content}</main>
    </div>
    <footer className="h-12 border-t">{slots.footer}</footer>
  </div>
);

// 3. Wrap with slots HOC
const DashboardWithSlots = WithSlots(Dashboard, DASHBOARD_SLOTS);

// 4. Create typed slot component
function DashboardSlot(props: {
  name: DashboardSlots;
  children: React.ReactNode;
}) {
  return <Slot<DashboardSlots> {...props} />;
}

// 5. Use the component
export default function App() {
  return (
    <DashboardWithSlots theme="dark" collapsed={false}>
      <DashboardSlot name="header">
        <nav className="flex items-center px-4">
          <h1>My Application</h1>
        </nav>
      </DashboardSlot>

      <DashboardSlot name="sidebar">
        <Navigation items={menuItems} />
      </DashboardSlot>

      <DashboardSlot name="content">
        <Routes />
      </DashboardSlot>

      <DashboardSlot name="footer">
        <p>© 2025 My Company</p>
      </DashboardSlot>
    </DashboardWithSlots>
  );
}
```

### Form Builder System

Create dynamic forms with validation:

```tsx
import {
  useSimpleFormBuilder,
  SimpleFormBuilder,
  SimpleFormBuilderFieldDefinition,
} from "@kanvas/phoenix-rebirth/blocks/form";
import { Show } from "@kanvas/phoenix-rebirth/lib/server";

function UserForm() {
  const formFields: SimpleFormBuilderFieldDefinition = [
    // Row with multiple fields
    [
      {
        kind: "input",
        name: "firstname",
        label: "First Name",
        placeholder: "Enter first name",
        rules: { required: "First name is required" },
      },
      {
        kind: "input",
        name: "lastname",
        label: "Last Name",
        placeholder: "Enter last name",
        rules: { required: "Last name is required" },
      },
    ],
    // Single field in row
    {
      kind: "input",
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "user@example.com",
      rules: {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address",
        },
      },
    },
    {
      kind: "phone",
      name: "phone",
      label: "Phone Number",
      placeholder: "Enter phone number",
      optional: "true",
      infoText: "Include country code",
    },
    {
      kind: "select",
      name: "role",
      label: "Role",
      placeholder: "Select a role",
      rules: { required: "Role is required" },
      options: [
        { name: "Admin", value: "admin" },
        { name: "User", value: "user" },
        { name: "Moderator", value: "moderator" },
      ],
    },
    {
      kind: "faceted-select",
      name: "permissions",
      label: "Permissions",
      placeholder: "Select permissions",
      truncateAt: 3,
      options: [
        { name: "Read", value: "read" },
        { name: "Write", value: "write" },
        { name: "Delete", value: "delete" },
        { name: "Admin", value: "admin" },
      ],
    },
    {
      kind: "textarea",
      name: "bio",
      label: "Bio",
      placeholder: "Tell us about yourself",
      optional: "true",
    },
    {
      kind: "switch",
      name: "notifications",
      label: "Email Notifications",
    },
    {
      kind: "checkbox",
      name: "terms",
      label: "I agree to the terms and conditions",
      rules: { required: "You must accept the terms" },
    },
    // Custom component
    {
      kind: "custom",
      name: "avatar",
      label: "Profile Picture",
      component: AvatarUploader,
    },
  ];

  const { definitions, hook } = useSimpleFormBuilder(formFields, {
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      role: "",
      permissions: "",
      bio: "",
      notifications: false,
      terms: false,
      avatar: null,
    },
  });

  const handleSubmit = hook.handleSubmit(async (values) => {
    console.log("Form values:", values);
    await saveUser(values);
  });

  return (
    <form onSubmit={handleSubmit}>
      <SimpleFormBuilder definitions={definitions} hook={hook} />

      <div className="flex gap-2 mt-6">
        <Button type="submit" disabled={!hook.formState.isValid}>
          Submit
        </Button>
        <Button type="button" variant="outline" onClick={() => hook.reset()}>
          Reset
        </Button>
      </div>

      <Show when={hook.formState.errors} deps={[hook.formState.errors]}>
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>Please fix the errors above</AlertDescription>
        </Alert>
      </Show>
    </form>
  );
}
```

### Tour System

Create interactive onboarding tours:

```tsx
import { useTourBuilder } from "@kanvas/phoenix-rebirth/lib/tour";
import { Show } from "@kanvas/phoenix-rebirth/lib/server";
import "@kanvas/phoenix-rebirth/tour.css";

function OnboardingTour() {
  const [tourStarted, setTourStarted] = useState(false);

  const { TourComponents, Driver } = useTourBuilder({
    steps: [
      {
        wrappertName: "WelcomeStep",
        title: "Welcome to Our App!",
        description: "Let's take a quick tour of the main features.",
        showButtons: ["next", "skip"],
      },
      {
        wrappertName: "NavigationStep",
        title: "Main Navigation",
        description: "Use this menu to navigate between different sections.",
        showButtons: ["previous", "next"],
      },
      {
        wrappertName: "SearchStep",
        title: "Search Functionality",
        description: "Find anything quickly using our powerful search.",
        showButtons: ["previous", "next"],
      },
      {
        wrappertName: "ProfileStep",
        title: "Your Profile",
        description: "Manage your account settings and preferences here.",
        showButtons: ["previous", "close"],
      },
    ],
    options: {
      animate: true,
      overlayColor: "rgba(0, 0, 0, 0.5)",
      smoothScroll: true,
      allowClose: true,
      progressText: "Step {{current}} of {{total}}",
      nextBtnText: "Next",
      prevBtnText: "Previous",
      doneBtnText: "Finish",
      onDestroyed: () => setTourStarted(false),
    },
  });

  const startTour = () => {
    setTourStarted(true);
    Driver.drive();
  };

  return (
    <div>
      <TourComponents.WelcomeStep>
        <h1>Welcome to MyApp</h1>
      </TourComponents.WelcomeStep>

      <TourComponents.NavigationStep>
        <nav>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/about">About</a>
        </nav>
      </TourComponents.NavigationStep>

      <TourComponents.SearchStep>
        <Input placeholder="Search..." />
      </TourComponents.SearchStep>

      <TourComponents.ProfileStep>
        <Avatar />
      </TourComponents.ProfileStep>

      <Show when={!tourStarted} deps={[tourStarted]}>
        <Button onClick={startTour}>Start Tour</Button>
      </Show>
    </div>
  );
}
```

## Views

### Login View

Pre-built authentication view with Formik validation:

```tsx
import { Login } from "@kanvas/phoenix-rebirth/views/login";
import { Show } from "@kanvas/phoenix-rebirth/lib/server";

function LoginPage() {
  const [error, setError] = useState(null);

  return (
    <>
      <Login
        image={{
          src: "/login-background.jpg",
          alt: "Login Background",
          className: "object-cover",
        }}
        card={{
          logo: {
            src: "/logo.svg",
            alt: "Company Logo",
            width: 150,
            height: 50,
          },
          title: "Welcome Back",
          inputs: {
            email: {
              label: "Email Address",
              placeholder: "john@example.com",
            },
            password: {
              label: "Password",
              placeholder: "Enter your password",
            },
            check: "Keep me signed in",
          },
          forgot: {
            text: "Forgot Password?",
            url: "/auth/forgot-password",
          },
          action: "Sign In",
        }}
        onLogin={async (values) => {
          // values: { email, password, remember }
          const response = await authenticate(values);
          <Show when={response.success} deps={[response]}>
            {() => router.push("/dashboard")}
          </Show>;
        }}
        onError={(error) => {
          setError(error);
          toast({
            title: "Authentication Failed",
            description: error.message,
            variant: "destructive",
          });
        }}
      />

      <Show when={error} deps={[error]}>
        <Alert variant="destructive">
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </Show>
    </>
  );
}
```

## API Reference

### Component Props

<details>
<summary>View detailed component props</summary>

#### DialogAlert Props

| Prop             | Type                                                      | Required | Description                 |
| ---------------- | --------------------------------------------------------- | -------- | --------------------------- |
| `open`           | `boolean`                                                 | Yes      | Control dialog visibility   |
| `onOpenChange`   | `(open: boolean) => void`                                 | No       | Handle open state changes   |
| `title`          | `string`                                                  | Yes      | Dialog title                |
| `description`    | `string`                                                  | Yes      | Dialog description          |
| `dangerAction`   | `boolean`                                                 | Yes      | Style as destructive action |
| `action`         | `{ title: string; disable?: boolean; pending?: boolean }` | Yes      | Action button config        |
| `cancel`         | `{ title: string }`                                       | No       | Cancel button config        |
| `onAction`       | `() => void \| Promise<void>`                             | No       | Action handler              |
| `pendingSpinner` | `() => JSX.Element`                                       | No       | Custom loading spinner      |

#### Table Props

| Prop         | Type                | Required | Description             |
| ------------ | ------------------- | -------- | ----------------------- |
| `table`      | `Table<T>`          | Yes      | TanStack table instance |
| `isFetching` | `boolean`           | Yes      | Loading state           |
| `empty`      | `JSX.Element`       | No       | Custom empty state      |
| `oneElement` | `boolean`           | No       | Single column mode      |
| `spinner`    | `() => JSX.Element` | No       | Custom loading spinner  |

#### Control Flow Component Props

##### For Component

| Prop       | Type                                                              | Required | Description                 |
| ---------- | ----------------------------------------------------------------- | -------- | --------------------------- |
| `each`     | `T[] \| undefined \| null \| false`                               | Yes      | Array to iterate            |
| `fallback` | `JSX.Element`                                                     | No       | Show when array is empty    |
| `error`    | `JSX.Element`                                                     | No       | Show when item render fails |
| `children` | `(item: T, props: { index: number; key: string }) => JSX.Element` | Yes      | Render function             |

##### Show Component

| Prop       | Type                                        | Required | Description                  |
| ---------- | ------------------------------------------- | -------- | ---------------------------- |
| `when`     | `T \| undefined \| null \| false`           | Yes      | Condition to check           |
| `deps`     | `any[]`                                     | Yes      | Dependencies for memoization |
| `fallback` | `JSX.Element`                               | No       | Show when condition is false |
| `children` | `JSX.Element \| ((item: T) => JSX.Element)` | Yes      | Content to show              |

##### Switch/Match Components

| Prop       | Type          | Required    | Description         |
| ---------- | ------------- | ----------- | ------------------- |
| `fallback` | `JSX.Element` | No          | Default case        |
| `when`     | `boolean`     | Yes (Match) | Condition for Match |
| `children` | `JSX.Element` | Yes         | Content to render   |

</details>

### Hook Returns

<details>
<summary>View hook return types</summary>

#### useToast

```typescript
{
  toast: (props: ToastProps) => {
    id: string;
    dismiss: () => void;
    update: (props: ToastProps) => void;
  };
  toasts: ToasterToast[];
  dismiss: (toastId?: string) => void;
}
```

#### useSet

```typescript
{
  add: (value: T) => void;
  delete: (value: T) => void;
  has: (value: T) => boolean;
  clear: () => void;
  size: () => number;
  values: () => T[];
  union: (otherSet: Set<T>) => void;
  intersection: (otherSet: Set<T>) => void;
  difference: (otherSet: Set<T>) => void;
  value: Set<T>;
}
```

#### useMap

```typescript
{
  set: (key: K, value: V) => void;
  get: (key: K) => V | undefined;
  delete: (key: K) => void;
  has: (key: K) => boolean;
  clear: () => void;
  size: () => number;
  keys: () => K[];
  values: () => V[];
  entries: () => [K, V][];
  value: Map<K, V>;
}
```

</details>

## Best Practices

### 1. Always Use Control Flow Components

```tsx
// ✅ Good: Use For, Show, Switch/Match
import { For, Show, Switch, Match } from "@kanvas/phoenix-rebirth/lib/server";

function UserList({ users, loading }) {
  return (
    <Show
      when={!loading}
      deps={[loading]}
      fallback={<Skeleton className="h-40" />}
    >
      <For
        each={users}
        fallback={<div>No users found</div>}
        error={<Alert>Error loading user</Alert>}
      >
        {(user, { key }) => (
          <Card key={key}>
            <CardContent>{user.name}</CardContent>
          </Card>
        )}
      </For>
    </Show>
  );
}

// ❌ Bad: Traditional React patterns
function UserList({ users, loading }) {
  if (loading) return <Skeleton />;

  return users.map((user) => (
    <Card key={user.id}>
      <CardContent>{user.name}</CardContent>
    </Card>
  ));
}
```

### 2. Component Composition with Control Flow

```tsx
// ✅ Good: Compose with control flow components
function UserCard({ user }) {
  return (
    <Card>
      <CardHeader>
        <Avatar src={user.avatar} />
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Switch fallback={<Badge variant="secondary">No Role</Badge>}>
          <Match when={user.role === "admin"}>
            <Badge variant="destructive">Admin</Badge>
          </Match>
          <Match when={user.role === "user"}>
            <Badge variant="default">User</Badge>
          </Match>
        </Switch>

        <Show when={user.bio} deps={[user.bio]}>
          <p className="mt-2">{user.bio}</p>
        </Show>
      </CardContent>
    </Card>
  );
}
```

### 3. Type Safety with Control Flow

```tsx
// ✅ Good: Full type safety with control flow
interface User {
  id: string;
  name: string;
  email: string;
  role?: "admin" | "user" | "moderator";
}

function UserTable({ users }: { users: User[] }) {
  return (
    <Table>
      <TableBody>
        <For<User[]>
          each={users}
          fallback={
            <TableRow>
              <TableCell colSpan={3}>No users</TableCell>
            </TableRow>
          }
        >
          {(user, { key }) => (
            <TableRow key={key}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Show when={user.role} deps={[user.role]}>
                  {(role) => <Badge>{role}</Badge>}
                </Show>
              </TableCell>
            </TableRow>
          )}
        </For>
      </TableBody>
    </Table>
  );
}
```

### 4. Performance with Control Flow

```tsx
// ✅ Good: Optimized with deps and memoization
import { useMemo } from "react";
import { For, Show } from "@kanvas/phoenix-rebirth/lib/server";

function DataTable({ data, filters }) {
  const filteredData = useMemo(() => {
    return data.filter((item) => filters.every((filter) => filter(item)));
  }, [data, filters]);

  const columns = columnsBuilder(
    [
      // column definitions
    ],
    []
  ); // Empty deps for static columns

  return (
    <Show
      when={filteredData.length > 0}
      deps={[filteredData]}
      fallback={<EmptyState />}
    >
      <Table data={filteredData} columns={columns} />
    </Show>
  );
}
```

### 5. Error Handling with Control Flow

```tsx
// ✅ Good: Graceful error handling
import { For, Show } from "@kanvas/phoenix-rebirth/lib/server";

function DataFetcher() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Switch>
      <Match when={loading}>
        <Skeleton className="h-40" />
      </Match>

      <Match when={error}>
        <Alert variant="destructive">
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </Match>

      <Match when={data}>
        <For each={data} error={<div>Failed to render item</div>}>
          {(item, { key }) => <DataItem key={key} item={item} />}
        </For>
      </Match>
    </Switch>
  );
}
```

## Migration Guide

### From v0.x to v1.0

#### Breaking Changes

1. **Import Paths**: All imports now use subpath exports

```tsx
// Old
import { Button } from "@kanvas/phoenix-rebirth/dist/components/ui/button";
import { Input } from "@kanvas/phoenix-rebirth/dist/components/ui/input";
import { Card } from "@kanvas/phoenix-rebirth/dist/components/ui/card";

// New
import { Button } from "@kanvas/phoenix-rebirth/ui/button";
import { Input } from "@kanvas/phoenix-rebirth/ui/input";
import { Card } from "@kanvas/phoenix-rebirth/ui/card";
```

2. **CSS Imports**: Must be explicit in your application

```tsx
// Old - Bundled styles
// Styles were automatically included

// New - Explicit imports
import "@kanvas/phoenix-rebirth/global.css";
```

3. **Control Flow Components**: Replace React patterns

```tsx
// Old - Traditional React
{items.map(item => <Item key={item.id} {...item} />)}
{isLoading ? <Loader /> : <Content />}

// New - Control Flow Components
<For each={items}>
  {(item, { key }) => <Item key={key} {...item} />}
</For>
<Show when={!isLoading} deps={[isLoading]} fallback={<Loader />}>
  <Content />
</Show>
```

### From shadcn/ui

Phoenix Rebirth is built on shadcn/ui, so migration is straightforward:

1. Replace shadcn/ui imports with Phoenix Rebirth equivalents
2. Add Control Flow Components for rendering logic
3. Use Phoenix Rebirth's enhanced components for additional features
4. Update to Tailwind CSS v4 syntax

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/kyanvasu/phoenix-rebirth.git
cd phoenix-rebirth

# Install dependencies
pnpm install

# Build the library
pnpm build

# Run the example app
cd example-app
pnpm dev
```

## License

MIT © [MCTEKK S.R.L.](https://mctekk.com)

---

<p align="center">
  Built by the Kanvas Team
</p>

## Full API Catalog

This catalog documents all public modules in the package: UI components, block components, control-flow components, hooks, utilities, views, icons, and store. It includes import paths, typical usage, main props, and examples.

### Import Conventions

- All modules are imported from subpaths of `@kanvas/phoenix-rebirth`:
  - UI: `@kanvas/phoenix-rebirth/ui/<name>`
  - Blocks: `@kanvas/phoenix-rebirth/blocks/<name>`
  - Control flow and slots: `@kanvas/phoenix-rebirth/lib/server`
  - Utilities: `@kanvas/phoenix-rebirth/lib/utils`
  - Tour: `@kanvas/phoenix-rebirth/lib/tour`
  - Threads API (Next.js): `@kanvas/phoenix-rebirth/lib/threads-api`
  - Hooks: `@kanvas/phoenix-rebirth/hooks`
  - Icons: `@kanvas/phoenix-rebirth/icons`
  - Store: `@kanvas/phoenix-rebirth/store`

---

### UI Components

Components in `src/components/ui` are typed wrappers over Radix UI, Base UI, or native HTML elements. They mirror the source APIs, add sensible styles and `data-slot` attributes, and accept `className` for Tailwind customization.

General notes:
- Props and events generally match their underlying equivalents, with added `className` and sometimes `asChild`.
- See each file for exact exports. For example, [dialog.tsx](/src/components/ui/dialog.tsx) exports `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`, `DialogOverlay`, `DialogPortal`.

Selected minimal examples:

- Accordion

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@kanvas/phoenix-rebirth/ui/accordion";

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Title</AccordionTrigger>
    <AccordionContent>Content</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Another</AccordionTrigger>
    <AccordionContent>More content</AccordionContent>
  </AccordionItem>
</Accordion>
```

- Alert Dialog

```tsx
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@kanvas/phoenix-rebirth/ui/alert-dialog";

<AlertDialog>
  <AlertDialogTrigger>Delete</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Confirm</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogCancel>Cancel</AlertDialogCancel>
    <AlertDialogAction>Delete</AlertDialogAction>
  </AlertDialogContent>
  </AlertDialog>
```

- Alert

```tsx
import { Alert, AlertTitle, AlertDescription } from "@kanvas/phoenix-rebirth/ui/alert";

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>A problem occurred.</AlertDescription>
</Alert>
```

- Aspect Ratio

```tsx
import { AspectRatio } from "@kanvas/phoenix-rebirth/ui/aspect-ratio";

<AspectRatio ratio={16 / 9}>
  <img src="/image.jpg" alt="Demo" className="object-cover w-full h-full" />
</AspectRatio>
```

- Avatar

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@kanvas/phoenix-rebirth/ui/avatar";

<Avatar>
  <AvatarImage src="/user.png" alt="@user" />
  <AvatarFallback>US</AvatarFallback>
</Avatar>
```

- Badge

```tsx
import { Badge } from "@kanvas/phoenix-rebirth/ui/badge";
<Badge variant="secondary">Status</Badge>
```

- Breadcrumb

```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator } from "@kanvas/phoenix-rebirth/ui/breadcrumb";

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>Section</BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

- Button / Button Group

```tsx
import { Button } from "@kanvas/phoenix-rebirth/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@kanvas/phoenix-rebirth/ui/button-group";

<Button onClick={() => doSomething()}>Confirm</Button>
<Button variant="outline">Cancel</Button>

<ButtonGroup>
  <Button>Primary</Button>
  <ButtonGroupSeparator />
  <Button variant="outline">Secondary</Button>
</ButtonGroup>
```

- Calendar

```tsx
import { Calendar } from "@kanvas/phoenix-rebirth/ui/calendar";
<Calendar mode="single" selected={new Date()} onSelect={(d) => setDate(d)} />
```

- Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@kanvas/phoenix-rebirth/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

- Carousel

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@kanvas/phoenix-rebirth/ui/carousel";

<Carousel>
  <CarouselContent>
    <CarouselItem className="p-4">Slide 1</CarouselItem>
    <CarouselItem className="p-4">Slide 2</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

- Chart

```tsx
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@kanvas/phoenix-rebirth/ui/chart";

<ChartContainer config={{}} className="h-64">
  {/* Insert your Recharts chart here */}
  <ChartTooltip content={<ChartTooltipContent />} />
</ChartContainer>
```

- Checkbox

```tsx
import { Checkbox } from "@kanvas/phoenix-rebirth/ui/checkbox";
<Checkbox checked onCheckedChange={(v) => console.log(v)} />
```

- Collapsible

```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@kanvas/phoenix-rebirth/ui/collapsible";

<Collapsible>
  <CollapsibleTrigger>Show</CollapsibleTrigger>
  <CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>
```

- Combobox

```tsx
import {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxItem,
  ComboboxInput,
} from "@kanvas/phoenix-rebirth/ui/combobox";

<Combobox>
  <ComboboxTrigger />
  <ComboboxContent>
    <ComboboxInput placeholder="Search..." />
    <ComboboxItem value="1">One</ComboboxItem>
  </ComboboxContent>
</Combobox>
```

- Command

```tsx
import { Command, CommandList, CommandInput, CommandItem } from "@kanvas/phoenix-rebirth/ui/command";

<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandItem>Option</CommandItem>
  </CommandList>
</Command>
```

- Context Menu

```tsx
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@kanvas/phoenix-rebirth/ui/context-menu";

<ContextMenu>
  <ContextMenuTrigger className="border p-4">Right click</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Action</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

- Dialog

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@kanvas/phoenix-rebirth/ui/dialog";

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Details</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <button className="btn">Confirm</button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

- Direction

```tsx
import { DirectionProvider } from "@kanvas/phoenix-rebirth/ui/direction";

<DirectionProvider dir="ltr">
  <div>Content</div>
</DirectionProvider>
```

- Drawer

```tsx
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@kanvas/phoenix-rebirth/ui/drawer";

<Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Title</DrawerTitle>
    </DrawerHeader>
    <div>Content</div>
  </DrawerContent>
</Drawer>
```

- Dropdown Menu

```tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@kanvas/phoenix-rebirth/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger>Options</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

- Empty

```tsx
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@kanvas/phoenix-rebirth/ui/empty";

<Empty>
  <EmptyHeader>
    <EmptyTitle>No data</EmptyTitle>
    <EmptyDescription>Try adjusting the filters</EmptyDescription>
  </EmptyHeader>
</Empty>
```

- Form helpers (React Hook Form)

```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, useFormField } from "@kanvas/phoenix-rebirth/ui/form";
```

- Hover Card

```tsx
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@kanvas/phoenix-rebirth/ui/hover-card";

<HoverCard>
  <HoverCardTrigger>User</HoverCardTrigger>
  <HoverCardContent>More info</HoverCardContent>
</HoverCard>
```

- Input / Textarea / Input OTP / Input Group

```tsx
import { Input } from "@kanvas/phoenix-rebirth/ui/input";
import { Textarea } from "@kanvas/phoenix-rebirth/ui/textarea";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@kanvas/phoenix-rebirth/ui/input-otp";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@kanvas/phoenix-rebirth/ui/input-group";

<Input placeholder="Text" />
<Textarea rows={4} />
<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
  </InputOTPGroup>
</InputOTP>
```

- Item and Kbd

```tsx
import { Item } from "@kanvas/phoenix-rebirth/ui/item";
import { Kbd } from "@kanvas/phoenix-rebirth/ui/kbd";
```

- Label

```tsx
import { Label } from "@kanvas/phoenix-rebirth/ui/label";
<Label htmlFor="field">Field</Label>
```

- Menubar / Navigation Menu

```tsx
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@kanvas/phoenix-rebirth/ui/menubar";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@kanvas/phoenix-rebirth/ui/navigation-menu";
```

- Native Select / Select

```tsx
import { NativeSelect, NativeSelectOption } from "@kanvas/phoenix-rebirth/ui/native-select";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@kanvas/phoenix-rebirth/ui/select";
```

- Pagination

```tsx
import { Pagination } from "@kanvas/phoenix-rebirth/ui/pagination";
```

- Popover / Tooltip

```tsx
import { Popover, PopoverTrigger, PopoverContent } from "@kanvas/phoenix-rebirth/ui/popover";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@kanvas/phoenix-rebirth/ui/tooltip";
```

- Progress

```tsx
import { Progress } from "@kanvas/phoenix-rebirth/ui/progress";
<Progress value={54} />
```

- Radio Group / Switch / Slider / Toggle / Toggle Group

```tsx
import { RadioGroup, RadioGroupItem } from "@kanvas/phoenix-rebirth/ui/radio-group";
import { Switch } from "@kanvas/phoenix-rebirth/ui/switch";
import { Slider } from "@kanvas/phoenix-rebirth/ui/slider";
import { Toggle } from "@kanvas/phoenix-rebirth/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@kanvas/phoenix-rebirth/ui/toggle-group";
```

- Resizable / Scroll Area / Separator / Skeleton / Spinner

```tsx
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@kanvas/phoenix-rebirth/ui/resizable";
import { ScrollArea } from "@kanvas/phoenix-rebirth/ui/scroll-area";
import { Separator } from "@kanvas/phoenix-rebirth/ui/separator";
import { Skeleton } from "@kanvas/phoenix-rebirth/ui/skeleton";
import { Spinner } from "@kanvas/phoenix-rebirth/ui/spinner";
```

- Sheet / Sidebar

```tsx
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@kanvas/phoenix-rebirth/ui/sheet";
import { Sidebar, SidebarProvider, SidebarContent, SidebarTrigger } from "@kanvas/phoenix-rebirth/ui/sidebar";
```

- Table

```tsx
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@kanvas/phoenix-rebirth/ui/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Jane</TableCell>
      <TableCell>jane@acme.com</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

- Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@kanvas/phoenix-rebirth/ui/tabs";

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="profile">Profile</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account content</TabsContent>
  <TabsContent value="profile">Profile content</TabsContent>
</Tabs>
```

- Toast and Toaster

```tsx
import { Toaster } from "@kanvas/phoenix-rebirth/ui/toaster";
import { useToast } from "@kanvas/phoenix-rebirth/hooks";

function Example() {
  const { toast } = useToast();
  return (
    <>
      <button onClick={() => toast({ title: "Saved", description: "Changes applied" })}>
        Show toast
      </button>
      <Toaster />
    </>
  );
}
```

---

### Blocks

High-level composite components under `src/components/blocks`.

#### DialogAlert

```tsx
import { DialogAlert } from "@kanvas/phoenix-rebirth/blocks/dialog";

<DialogAlert
  open={open}
  onOpenChange={setOpen}
  title="Delete record"
  description="This action cannot be undone"
  dangerAction
  action={{ title: "Delete", disable: isDeleting, pending: isDeleting }}
  cancel={{ title: "Cancel" }}
  onAction={async () => { await remove(); setOpen(false); }}
/>
```

Main props [see implementation](/src/components/blocks/dialog/index.tsx):
- open: boolean
- onOpenChange?: (open: boolean) => void
- title: string
- description: string
- dangerAction: boolean
- action: { title: string; disable?: boolean; pending?: boolean }
- cancel?: { title: string }
- pendingSpinner?: () => JSX.Element
- onAction?: () => void | Promise<void>

#### ModalDialog

Responsive modal that uses Drawer on mobile and Dialog on desktop, switching automatically based on viewport.

```tsx
import { ModalDialog } from "@kanvas/phoenix-rebirth/blocks/modal";

<ModalDialog
  open={open}
  onOpenChange={setOpen}
  title="Create user"
  action={{ title: "Create", type: "submit", pending: isCreating }}
  cancel={{ title: "Cancel" }}
  onAction={handleCreate}
>
  <form className="space-y-4">
    {/* fields */}
  </form>
</ModalDialog>
```

Main props [see implementation](/src/components/blocks/modal/index.tsx):
- open: boolean
- onOpenChange?: (open: boolean) => void
- title: string
- className?: string (content)
- dialog?: { className?: string } (desktop only)
- action: { title: string; disable?: boolean; pending?: boolean; type?: "button" | "submit" | "reset" }
- cancel?: { title: string }
- pendingSpinner?: () => JSX.Element
- onAction?: () => void | Promise<void>

Behavior:
- Uses Drawer below `md` and Dialog at `md` and above.
- Disables the action button when `action.disable` or `action.pending` is true.

#### Advanced Table

Helpers for TanStack Table: `columnsBuilder`, `useTable`, slot components, and the `Table` container.

```tsx
import {
  Table,
  TableSlot,
  columnsBuilder,
  useTable,
} from "@kanvas/phoenix-rebirth/blocks/table";
import { Button } from "@kanvas/phoenix-rebirth/ui/button";
import { Input } from "@kanvas/phoenix-rebirth/ui/input";

const columns = columnsBuilder(
  [
    { accessorKey: "name", header: "Name", cell: ({ row }) => row.getValue("name") },
    { accessorKey: "email", header: "Email" },
  ],
  []
);

const { table } = useTable({ data, columns });

<Table table={table} isFetching={loading}>
  <TableSlot name="top">
    <div className="p-4 flex justify-between">
      <Input placeholder="Search..." />
      <Button>New</Button>
    </div>
  </TableSlot>
</Table>
```

API [see implementation](/src/components/blocks/table/index.tsx):
- columnsBuilder<T>(columns: T[], deps?: DependencyList): memoizes columns
- useTable<T>(options: TableOptions<T>): returns `{ table }` with empty-data fixes
- Table props:
  - table: TanStack `Table<T>`
  - isFetching: boolean
  - empty?: JSX.Element
  - oneElement?: boolean
  - spinner?: () => JSX.Element
- TableSlot: defines `top` and `bottom` slots

#### PhoneInput

Phone number input built on `react-phone-number-input`, with country selector.

```tsx
import { PhoneInput } from "@kanvas/phoenix-rebirth/blocks/phone-input";

<PhoneInput
  placeholder="+1 555 000 0000"
  value={value}
  onChange={setValue}
/>
```

Main props [see implementation](/src/components/blocks/phone-input/index.tsx):
- Inherits standard `<input>` and `react-phone-number-input` props, except `onChange`, `value`, and `ref`
- onChange?: (value: E164Number | string | undefined) => void

#### Form Builder

Form-builder system powered by React Hook Form.

```tsx
import {
  useSimpleFormBuilder,
  SimpleFormBuilder,
} from "@kanvas/phoenix-rebirth/blocks/form";

const definitions = [
  [
    { kind: "input", name: "firstname", label: "First name", rules: { required: "Required" } },
    { kind: "input", name: "lastname", label: "Last name", rules: { required: "Required" } },
  ],
  { kind: "input", name: "email", type: "email", label: "Email", rules: { required: "Required" } },
  { kind: "phone", name: "phone", label: "Phone", optional: "true" },
  { kind: "select", name: "role", label: "Role", rules: { required: "Required" }, options: [{ name: "Admin", value: "admin" }] },
  { kind: "faceted-select", name: "permissions", label: "Permissions", options: [{ name: "Read", value: "read" }] },
  { kind: "textarea", name: "bio", label: "Bio", optional: "true" },
  { kind: "switch", name: "notifications", label: "Notifications" },
  { kind: "checkbox", name: "terms", label: "I accept terms", rules: { required: "Required" } },
];

const { definitions: defs, hook } = useSimpleFormBuilder(definitions, {
  defaultValues: { firstname: "", lastname: "", email: "", phone: "", role: "", permissions: "", bio: "", notifications: false, terms: false },
});

<form onSubmit={hook.handleSubmit((values) => console.log(values))}>
  <SimpleFormBuilder definitions={defs} hook={hook} />
  <button type="submit" disabled={!hook.formState.isValid}>Submit</button>
</form>
```

Field definitions and props [see implementation](/src/components/blocks/form/index.tsx):
- kind: "input" | "textarea" | "select" | "checkbox" | "switch" | "custom" | "faceted-select" | "phone"
- name: string
- label: string
- rules: UseControllerProps["rules"] (unless `optional: "true"`)
- optional?: "true"
- helptext?: string
- infoText?: string
- error?: number
- options?: Array<{ name: string; value: string; disabled?: boolean }>
- component?: (props) => JSX.Element (for kind="custom")
- truncateAt?: number (faceted-select)
- For `phone`: see PhoneInput props

---

### Control Flow and Slots

Location: [lib/server.tsx](/src/lib/server.tsx)

- For
  - Props:
    - each: T[] | undefined | null | false
    - fallback?: JSX.Element
    - error?: JSX.Element (per-item render failure)
    - children: (item, { index, key }) => JSX.Element
  - Example:

```tsx
import { For } from "@kanvas/phoenix-rebirth/lib/server";

<For each={items} fallback={<div>No data</div>} error={<div>Error</div>}>
  {(item, { key }) => <div key={key}>{item.name}</div>}
</For>
```

- Show
  - Props:
    - when: any
    - deps: any[] (memoization)
    - fallback?: JSX.Element
    - keepState?: boolean
    - children: JSX.Element | (value) => JSX.Element
  - Example:

```tsx
import { Show } from "@kanvas/phoenix-rebirth/lib/server";
<Show when={user} deps={[user]} fallback={<div>Loading...</div>}>
  {(u) => <div>{u.name}</div>}
</Show>
```

- Switch and Match
  - Switch orchestrates multiple `Match` components and accepts `fallback`
  - Match: `{ when: boolean }`
  - Example:

```tsx
import { Switch, Match } from "@kanvas/phoenix-rebirth/lib/server";

<Switch fallback={<div>Unknown</div>}>
  <Match when={status === "ok"}><div>OK</div></Match>
  <Match when={status === "error"}><div>Error</div></Match>
</Switch>
```

- WithSlots / Slot
  - WithSlots(Component, expectedSlots): HOC that transforms named children into a `slots` object
  - Slot: typed marker to name content
  - Example:

```tsx
import { WithSlots, Slot } from "@kanvas/phoenix-rebirth/lib/server";

const SLOTS = ["header", "content"] as const;
type MySlots = (typeof SLOTS)[number];

function Panel(props: { slots: Record<MySlots, React.ReactNode> }) {
  return (
    <div>
      <header>{props.slots.header}</header>
      <main>{props.slots.content}</main>
    </div>
  );
}

const PanelWithSlots = WithSlots(Panel, SLOTS);

function PanelSlot(props: { name: MySlots; children: React.ReactNode }) {
  return <Slot<MySlots> {...props} />;
}

<PanelWithSlots>
  <PanelSlot name="header">Header</PanelSlot>
  <PanelSlot name="content">Content</PanelSlot>
</PanelWithSlots>
```

---

### Utilities

Location: [lib/utils.ts](/src/lib/utils.ts)

- cn(...classNames): merges classes using `clsx` and `tailwind-merge`.

```ts
import { cn } from "@kanvas/phoenix-rebirth/lib/utils";
<div className={cn("p-2", active && "bg-primary")} />
```

- useEvents<T>()
  - emit(name: string, data: T): dispatches a CustomEvent
  - on(name: string, listener: (data: { detail: T }) => void): subscribes and returns `unsubscribe()`

```tsx
import { useEvents } from "@kanvas/phoenix-rebirth/lib/utils";
const { emit, on } = useEvents<string>();
on("search", ({ detail }) => console.log(detail));
emit("search", "text");
```

- useThread(name?)
  - client(callback: () => Promise<any>): executes in a browser Web Worker
  - server(callback: (port, data) => Promise<any>, workerData?): requires `/api/threads` route with exported handler

```tsx
import { useThread } from "@kanvas/phoenix-rebirth/lib/utils";
const { client, server } = useThread("task");
const heavyInBrowser = client(async () => {/* ... */ return 42;});
const heavyInServer = server(async (port, data) => {/* ... */ return "ok";}, { x: 1 });
```

- useSet<T>(initial?: T[])
  - add, delete, has, clear, size, values, union, intersection, difference, value (Set)

```tsx
import { useSet } from "@kanvas/phoenix-rebirth/lib/utils";
const tags = useSet<string>(["react"]);
tags.add("ts");
tags.delete("react");
```

- useMap<K, V>(initialEntries?)
  - set, get, delete, has, clear, size, keys, values, entries, value (Map)

```tsx
import { useMap } from "@kanvas/phoenix-rebirth/lib/utils";
const map = useMap<string, number>([["a", 1]]);
map.set("b", 2);
```

- toListValues(values: string): string[] and fromListValues(values: string[]): string
- Leaves<T>: utility type for leaf paths of an object

#### Threads API (Next.js)

API route for executing work in a Node worker. Import and re-export in your app:

```ts
// app/api/threads/route.ts
import { POST } from "@kanvas/phoenix-rebirth/lib/threads-api";
export { POST };
```

Implementation: [threads-api.ts](/src/lib/threads-api.ts)

---

### Tour

Hook that generates step components and a `driver.js` controller.

Location: [tour.tsx](/src/lib/tour.tsx)

```tsx
import { useTourBuilder } from "@kanvas/phoenix-rebirth/lib/tour";

const { TourComponents, Driver } = useTourBuilder({
  steps: [
    { wrappertName: "Welcome", title: "Welcome", description: "Intro", showButtons: ["next"] },
    { wrappertName: "Navigation", title: "Menu", description: "Where to find things", showButtons: ["previous", "next"] },
  ],
  options: { animate: true, allowClose: true },
});

function App() {
  return (
    <div>
      <TourComponents.Welcome><h1>Header</h1></TourComponents.Welcome>
      <TourComponents.Navigation><nav>Menu</nav></TourComponents.Navigation>
      <button onClick={() => Driver.drive()}>Start tour</button>
    </div>
  );
}
```

Notes:
- `wrappertName` must be unique per step; a wrapper component with an auto-assigned id is created.
- `Driver` is the `driver.js` instance configured with the provided `steps` and `options`.

---

### Hooks

Exported from `@kanvas/phoenix-rebirth/hooks`.

- useIsMobile
  - Returns a boolean using a 768px breakpoint.
  - Implementation: [use-mobile.ts](/src/hooks/use-mobile.ts)

```tsx
import { useIsMobile } from "@kanvas/phoenix-rebirth/hooks";
const isMobile = useIsMobile();
```

- useToast / toast
  - In-app toast manager.
  - Returns `{ toasts, toast, dismiss }`.
  - Use with `<Toaster />` UI component.
  - Implementation: [hooks/use-toast.ts](/src/hooks/use-toast.ts) and [ui/toaster.tsx](/src/components/ui/toaster.tsx)

```tsx
import { useToast } from "@kanvas/phoenix-rebirth/hooks";
import { Toaster } from "@kanvas/phoenix-rebirth/ui/toaster";

const { toast } = useToast();
toast({ title: "Action successful", description: "Changes were saved" });
```

- Re-export from `react-use`
  - Via `export * from "react-use"` in [hooks/index.ts](/src/hooks/index.ts). You can import hooks from that library through `@kanvas/phoenix-rebirth/hooks`.

---

### Icons

The `@kanvas/phoenix-rebirth/icons` module re-exports all icons from `lucide-react`.

```tsx
import { Home, Search } from "@kanvas/phoenix-rebirth/icons";
```

Implementation: [icons/index.ts](/src/components/icons/index.ts)

---

### Store

The `@kanvas/phoenix-rebirth/store` module re-exports everything from `react-store-js` for lightweight state management.

```ts
import { createStore } from "@kanvas/phoenix-rebirth/store";
```

Implementation: [store/index.ts](/src/store/index.ts)

---

### Views

#### Login

Ready-to-use view built with Formik and Yup.

```tsx
import { Login } from "@kanvas/phoenix-rebirth/views/login";

<Login
  image={{ src: "/login.jpg", alt: "Background" }}
  card={{
    logo: { src: "/logo.svg", width: 150, height: 50 },
    title: "Welcome",
    inputs: {
      email: { label: "Email", placeholder: "user@acme.com" },
      password: { label: "Password", placeholder: "••••••••" },
      check: "Keep me signed in",
    },
    forgot: { text: "Forgot your password?", url: "/auth/forgot" },
    action: "Sign in",
  }}
  onLogin={async ({ email, password, remember }) => {
    // authenticate
  }}
  onError={(e) => console.error(e)}
/>
```

Main props [see implementation](/src/views/login.tsx):
- image?: { src: string | StaticImport; alt?: string; width?: number | string; height?: number | string; className?: string }
- children?: JSX.Element (replace the default card with custom content)
- card?: {
  - logo?: { src: string | StaticImport; width?: number | string; height?: number | string; alt?: string; className?: string }
  - title?: string
  - inputs?: {
    - email: { label: string; placeholder: string }
    - password: { label: string; placeholder: string }
    - check: string
  }
  - forgot?: { text: string; url: string }
  - action?: string
}
- onLogin?: (values: { email: string; password: string; remember: boolean }) => void | Promise<void>
- onError?: (error: any) => void

---

### Compatibility Notes

- Node >= 21 and Next.js ≥ 15 recommended. See `engines` in package.json.
- Subpath exports in `package.json` resolve to built files in `dist/`. Structure imports as shown in this catalog.
