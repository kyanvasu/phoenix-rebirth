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

### 1. Tailwind Configuration

Create or update your `tailwind.config.js`:

```typescript
import { createTailwindConfig } from "@kanvas/phoenix-rebirth/dist/config/tailwind";

module.exports = createTailwindConfig({
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@kanvas/phoenix-rebirth/dist/**/*.{js,mjs}",
  ],
  // Your custom configurations (optional)
  theme: {
    extend: {
      colors: {
        brand: {
          50: "hsl(var(--brand-50))",
          500: "hsl(var(--brand-500))",
          900: "hsl(var(--brand-900))",
        },
      },
    },
  },
});
```

### 2. Global CSS Setup

In your main CSS file (e.g., `app/globals.css`):

```css
/* Required Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import Phoenix Rebirth styles */
@import "@kanvas/phoenix-rebirth/global.css";
/* Optional: Import tour styles if using tour functionality */
@import "@kanvas/phoenix-rebirth/tour.css";

/* Custom theme variables (optional) */
@layer base {
  :root {
    /* Override default theme variables */
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    
    /* Add custom colors */
    --brand-50: 210 40% 96.1%;
    --brand-500: 217 91% 60%;
    --brand-900: 224 71% 20%;
  }

  .dark {
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    
    --brand-50: 224 71% 20%;
    --brand-500: 217 91% 60%;
    --brand-900: 210 40% 96.1%;
  }
}
```

### 3. Next.js App Router Setup

For Next.js applications, create a root layout:

```tsx
// app/layout.tsx
import { ThemeProvider } from "@kanvas/phoenix-rebirth/lib/theme-provider";
import "@kanvas/phoenix-rebirth/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
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
import { Select, SelectContent, SelectItem } from "@kanvas/phoenix-rebirth/ui/select";
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

function DeleteConfirmation() {
  const [open, setOpen] = useState(false);

  return (
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
  );
}
```

#### ModalDialog

Responsive modal that adapts to mobile (drawer) and desktop (dialog):

```tsx
import { ModalDialog } from "@kanvas/phoenix-rebirth/blocks/modal";

function CreateUserModal() {
  return (
    <ModalDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Create New User"
      action={{
        title: "Create",
        disable: !isValid,
        pending: isCreating,
        type: "submit"
      }}
      onAction={handleCreate}
    >
      <form className="space-y-4">
        <Input name="name" placeholder="Enter name" />
        <Input name="email" type="email" placeholder="Enter email" />
      </form>
    </ModalDialog>
  );
}
```

#### PhoneInput

International phone number input with country selection:

```tsx
import { PhoneInput } from "@kanvas/phoenix-rebirth/blocks/phone-input";

function ContactForm() {
  const [phone, setPhone] = useState("");

  return (
    <PhoneInput
      value={phone}
      onChange={setPhone}
      addInternationalOption
      placeholder="Enter phone number"
    />
  );
}
```

#### Advanced Table

Data table with built-in sorting, filtering, and pagination:

```tsx
import { Table, columnsBuilder, useTable, TableSlot } from "@kanvas/phoenix-rebirth/blocks/table";

function UserTable() {
  const columns = columnsBuilder([
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.getValue("status") === "active" ? "default" : "secondary"}>
          {row.getValue("status")}
        </Badge>
      ),
    },
  ], []);

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

React components for declarative rendering logic:

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
```

## Hooks

### useToast

Display toast notifications:

```tsx
import { useToast } from "@kanvas/phoenix-rebirth/hooks";
import { Toaster } from "@kanvas/phoenix-rebirth/ui/toaster";

function App() {
  const { toast } = useToast();

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
      <Toaster />
    </>
  );
}
```

### useIsMobile

Detect mobile viewport:

```tsx
import { useIsMobile } from "@kanvas/phoenix-rebirth/hooks";

function ResponsiveLayout() {
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? "grid-cols-1" : "grid-cols-3"}>
      {isMobile ? <MobileNav /> : <DesktopNav />}
    </div>
  );
}
```

### useEvents

Custom event emitter for cross-component communication:

```tsx
import { useEvents } from "@kanvas/phoenix-rebirth/lib/utils";

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

  return <div>Searching for: {query}</div>;
}
```

### useSet

State management for Set data structure:

```tsx
import { useSet } from "@kanvas/phoenix-rebirth/lib/utils";

function TagSelector() {
  const selectedTags = useSet<string>(["react", "typescript"]);

  return (
    <div>
      <div className="flex gap-2">
        {tags.map(tag => (
          <Badge
            key={tag}
            variant={selectedTags.has(tag) ? "default" : "outline"}
            onClick={() => {
              if (selectedTags.has(tag)) {
                selectedTags.delete(tag);
              } else {
                selectedTags.add(tag);
              }
            }}
          >
            {tag}
          </Badge>
        ))}
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
      {cart.entries().map(([id, quantity]) => (
        <div key={id} className="flex justify-between">
          <span>Item {id}</span>
          <span>Qty: {quantity}</span>
          <Button size="sm" onClick={() => removeItem(id)}>
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}
```

## Utilities

### Threading Support

Execute heavy computations in Web Workers:

```tsx
import { useThread } from "@kanvas/phoenix-rebirth/lib/utils";

function DataProcessor() {
  const { client, server } = useThread();
  const [result, setResult] = useState(null);

  // Client-side threading (browser)
  const processInBrowser = async () => {
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
  };

  // Server-side threading (Node.js)
  const processOnServer = async () => {
    const handler = server(
      async (port, data) => {
        // This runs in a Node.js Worker Thread
        const { items } = data;
        const processed = items.map(item => item * 2);
        return processed;
      },
      { items: [1, 2, 3, 4, 5] }
    );

    const result = await handler();
    setResult(result);
  };

  return (
    <div>
      <Button onClick={processInBrowser}>Process in Browser</Button>
      <Button onClick={processOnServer}>Process on Server</Button>
      {result && <div>Result: {JSON.stringify(result)}</div>}
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

### List Value Helpers

Convert between strings and arrays:

```typescript
import { toListValues, fromListValues } from "@kanvas/phoenix-rebirth/lib/utils";

// String to array
const tags = toListValues("react, vue, angular");
// Result: ["react", "vue", "angular"]

// Array to string
const tagString = fromListValues(["react", "vue", "angular"]);
// Result: "react, vue, angular"
```

## Advanced Features

### Slots Pattern

Build composable components with named slots:

```tsx
import { WithSlots, Slot, WithSlotsProps } from "@kanvas/phoenix-rebirth/lib/server";

// 1. Define your slots
const DASHBOARD_SLOTS = ["header", "sidebar", "content", "footer"] as const;
type DashboardSlots = (typeof DASHBOARD_SLOTS)[number];

// 2. Create your component
interface DashboardProps extends WithSlotsProps<DashboardSlots> {
  theme?: "light" | "dark";
}

const Dashboard = ({ slots, theme = "light" }: DashboardProps) => (
  <div className={`dashboard theme-${theme}`}>
    <header className="h-16 border-b">{slots.header}</header>
    <div className="flex">
      <aside className="w-64 border-r">{slots.sidebar}</aside>
      <main className="flex-1 p-6">{slots.content}</main>
    </div>
    <footer className="h-12 border-t">{slots.footer}</footer>
  </div>
);

// 3. Wrap with slots HOC
const DashboardWithSlots = WithSlots(Dashboard, DASHBOARD_SLOTS);

// 4. Create typed slot component
function DashboardSlot(props: { name: DashboardSlots; children: React.ReactNode }) {
  return <Slot<DashboardSlots> {...props} />;
}

// 5. Use the component
export default function App() {
  return (
    <DashboardWithSlots theme="dark">
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
  SimpleFormBuilderFieldDefinition 
} from "@kanvas/phoenix-rebirth/blocks/form";

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
    </form>
  );
}
```

### Tour System

Create interactive onboarding tours:

```tsx
import { useTourBuilder } from "@kanvas/phoenix-rebirth/lib/tour";
import "@kanvas/phoenix-rebirth/tour.css";

function OnboardingTour() {
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
    },
  });

  const startTour = () => {
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

      <Button onClick={startTour}>Start Tour</Button>
    </div>
  );
}
```

## Views

### Login View

Pre-built authentication view with Formik validation:

```tsx
import { Login } from "@kanvas/phoenix-rebirth/views/login";

function LoginPage() {
  return (
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
        if (response.success) {
          router.push("/dashboard");
        }
      }}
      onError={(error) => {
        toast({
          title: "Authentication Failed",
          description: error.message,
          variant: "destructive",
        });
      }}
    />
  );
}
```

Or use a custom form:

```tsx
<Login>
  <CustomLoginForm />
</Login>
```

## API Reference

### Component Props

<details>
<summary>View detailed component props</summary>

#### DialogAlert Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `open` | `boolean` | Yes | Control dialog visibility |
| `onOpenChange` | `(open: boolean) => void` | No | Handle open state changes |
| `title` | `string` | Yes | Dialog title |
| `description` | `string` | Yes | Dialog description |
| `dangerAction` | `boolean` | Yes | Style as destructive action |
| `action` | `{ title: string; disable?: boolean; pending?: boolean }` | Yes | Action button config |
| `cancel` | `{ title: string }` | No | Cancel button config |
| `onAction` | `() => void \| Promise<void>` | No | Action handler |
| `pendingSpinner` | `() => JSX.Element` | No | Custom loading spinner |

#### Table Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `table` | `Table<T>` | Yes | TanStack table instance |
| `isFetching` | `boolean` | Yes | Loading state |
| `empty` | `JSX.Element` | No | Custom empty state |
| `oneElement` | `boolean` | No | Single column mode |
| `spinner` | `() => JSX.Element` | No | Custom loading spinner |

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

### 1. Component Composition

```tsx
// ✅ Good: Compose smaller components
function UserCard({ user }) {
  return (
    <Card>
      <CardHeader>
        <Avatar src={user.avatar} />
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge>{user.role}</Badge>
      </CardContent>
    </Card>
  );
}

// ❌ Bad: Monolithic component
function UserCard({ user }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center mb-4">
        <img src={user.avatar} className="w-10 h-10 rounded-full" />
        <h3 className="text-lg font-semibold">{user.name}</h3>
      </div>
      <div>
        <span className="px-2 py-1 bg-gray-100 rounded">{user.role}</span>
      </div>
    </div>
  );
}
```

### 2. Type Safety

```tsx
// ✅ Good: Use TypeScript for props
interface UserListProps {
  users: User[];
  onSelect: (user: User) => void;
  loading?: boolean;
}

function UserList({ users, onSelect, loading = false }: UserListProps) {
  // Component implementation
}

// ❌ Bad: No type definitions
function UserList(props) {
  // Component implementation
}
```

### 3. Performance Optimization

```tsx
// ✅ Good: Memoize expensive computations
import { useMemo } from "react";

function DataTable({ data, filters }) {
  const filteredData = useMemo(() => {
    return data.filter(item => 
      filters.every(filter => filter(item))
    );
  }, [data, filters]);

  const columns = columnsBuilder([
    // column definitions
  ], []); // Empty deps for static columns

  return <Table data={filteredData} columns={columns} />;
}

// ❌ Bad: Recalculate on every render
function DataTable({ data, filters }) {
  const filteredData = data.filter(item => 
    filters.every(filter => filter(item))
  );

  const columns = [ // Recreated on every render
    // column definitions
  ];

  return <Table data={filteredData} columns={columns} />;
}
```

### 4. Accessibility

```tsx
// ✅ Good: Include accessibility attributes
<Button
  aria-label="Delete user"
  aria-describedby="delete-description"
  onClick={handleDelete}
>
  <TrashIcon />
</Button>
<span id="delete-description" className="sr-only">
  This will permanently delete the user
</span>

// ❌ Bad: Missing accessibility context
<Button onClick={handleDelete}>
  <TrashIcon />
</Button>
```

### 5. Error Handling

```tsx
// ✅ Good: Handle errors gracefully
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
    <Show
      when={!loading && !error}
      deps={[loading, error]}
      fallback={
        error ? (
          <Alert variant="destructive">
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        ) : (
          <Skeleton className="h-40" />
        )
      }
    >
      <DataDisplay data={data} />
    </Show>
  );
}
```

## Migration Guide

### From v0.x to v1.0

#### Breaking Changes

1. **Import Paths**: All imports now use subpath exports

```tsx
// Old
import { Button, Input, Card } from "@kanvas/phoenix-rebirth";

// New
import { Button } from "@kanvas/phoenix-rebirth/ui/button";
import { Input } from "@kanvas/phoenix-rebirth/ui/input";
import { Card } from "@kanvas/phoenix-rebirth/ui/card";
```

2. **CSS Import**: Global styles must be imported explicitly

```tsx
// Old - Automatic
// Styles were bundled

// New - Explicit
import "@kanvas/phoenix-rebirth/global.css";
```

3. **Form Builder API**: Simplified field definitions

```tsx
// Old
const fields = {
  firstname: {
    type: "input",
    validation: Yup.string().required(),
  }
};

// New
const fields: SimpleFormBuilderFieldDefinition = [
  {
    kind: "input",
    name: "firstname",
    label: "First Name",
    rules: { required: "First name is required" },
  }
];
```

### From shadcn/ui

Phoenix Rebirth is built on shadcn/ui, so migration is straightforward:

1. Replace shadcn/ui imports with Phoenix Rebirth equivalents
2. Update theme variables to match Phoenix Rebirth's structure
3. Use Phoenix Rebirth's enhanced components for additional features

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

### Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run linting
pnpm lint

# Type checking
pnpm type-check
```

## Support

- 📚 [Documentation](https://docs.kanvas.dev/phoenix-rebirth)
- 💬 [Discord Community](https://discord.gg/kanvas)
- 🐛 [Issue Tracker](https://github.com/kyanvasu/phoenix-rebirth/issues)
- 📧 [Email Support](mailto:support@kanvas.dev)

## License

MIT © [MCTEKK S.R.L.](https://mctekk.com)

---

<p align="center">
  Built with ❤️ by the Kanvas Team
</p>