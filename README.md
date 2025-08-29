# Kanvas Phoenix Rebirth

<p align="center">
  <img src="https://img.shields.io/npm/v/@kanvas/phoenix-rebirth" alt="npm version" />
  <img src="https://img.shields.io/npm/l/@kanvas/phoenix-rebirth" alt="license" />
  <img src="https://img.shields.io/npm/dm/@kanvas/phoenix-rebirth" alt="downloads" />
</p>

## 📖 Table of Contents

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
- [Best Practices](#best-practices)
- [Migration Guide](#migration-guide)
- [Contributing](#contributing)
- [License](#license)

## Overview

Kanvas Phoenix Rebirth is a comprehensive React component library built on top of shadcn/ui, designed to accelerate enterprise application development. It provides a rich set of pre-built components, hooks, utilities, and patterns that streamline the creation of modern, accessible, and performant user interfaces.

### Key Features

- 🎨 **40+ Customizable UI Components** based on shadcn/ui
- 🪝 **Advanced React Hooks** for state management and side effects
- 🔧 **Utility Functions** for common patterns
- 📝 **Form Builder System** with validation
- 🎭 **Slots Pattern** for flexible component composition
- 🧵 **Web Worker Support** for heavy computations
- 🚀 **TypeScript First** with full type safety
- ♿ **Accessible by Default** following WAI-ARIA standards
- 🌙 **Dark Mode Support** out of the box
- 📱 **Responsive Design** mobile-first approach
- ⚡ **Tailwind CSS v4** with latest features

## Installation

### Prerequisites

- Node.js >= 21.0.0
- React >= 18.3.0
- Next.js >= 15.0.0 (recommended)
- [Kanvas Core JS](https://github.com/bakaphp/kanvas-core-js#kanvas-core-js) installed

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
  Built with ❤️ by the Kanvas Team
</p>
