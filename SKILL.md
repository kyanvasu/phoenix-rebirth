---
name: phoenix-rebirth
description: >
  Expert guidance for building UIs with @kanvas/phoenix-rebirth — the Kanvas enterprise React
  component library built on shadcn/ui and Tailwind CSS v4. Use this skill whenever the user
  mentions phoenix-rebirth, PhoenixRebirth, or @kanvas/phoenix-rebirth. Also triggers for any
  task involving the library's control flow components (For, Show, Switch/Match), the slots
  pattern (WithSlots/Slot), the form builder (SimpleFormBuilder), the advanced Table block,
  ModalDialog, DialogAlert, useThread, useEvents, useSet, useMap, useTourBuilder, or the Login
  view. Apply even if the user just says "phoenix" in a Kanvas development context. Trigger
  for questions about migrating from v0.x to v1.0, replacing React map/ternary patterns with
  control flow components, or setting up Tailwind v4 with this library.
---

# Kanvas Phoenix Rebirth

Enterprise React component library on top of shadcn/ui. Node ≥ 21, React ≥ 18.3, Next.js ≥ 15.

```bash
npm install @kanvas/phoenix-rebirth
```

---

## Setup (required steps)

### 1. PostCSS

```js
// postcss.config.mjs
export default { plugins: { "@tailwindcss/postcss": {} } };
```

### 2. Global CSS

```css
@import "tailwindcss";
@import "@kanvas/phoenix-rebirth/global.css";
@import "@kanvas/phoenix-rebirth/tour.css"; /* only if using tours */
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));
```

### 3. Next.js layout

```tsx
// app/layout.tsx
import "@kanvas/phoenix-rebirth/global.css";
import "./globals.css";
```

---

## Import map — everything at a glance

```
UI primitives      @kanvas/phoenix-rebirth/ui/<name>
Block components   @kanvas/phoenix-rebirth/blocks/<name>
Control flow       @kanvas/phoenix-rebirth/lib/server
Utilities          @kanvas/phoenix-rebirth/lib/utils
Tour               @kanvas/phoenix-rebirth/lib/tour
Threads API        @kanvas/phoenix-rebirth/lib/threads-api
Hooks              @kanvas/phoenix-rebirth/hooks
Icons              @kanvas/phoenix-rebirth/icons   (re-exports lucide-react)
Store              @kanvas/phoenix-rebirth/store   (re-exports react-store-js)
```

---

## Control flow components — use these everywhere

This is the most important pattern in the library. Phoenix Rebirth expects you to replace
standard React rendering idioms with its control flow components. This isn't cosmetic — the
components add memoization, per-item error boundaries, and dependency tracking.

### `For` — replaces `.map()`

```tsx
import { For } from "@kanvas/phoenix-rebirth/lib/server";

<For each={products} fallback={<p>No products</p>} error={<p>Render error</p>}>
  {(product, { index, key }) => (
    <Card key={key}>
      <CardHeader>{product.name}</CardHeader>
    </Card>
  )}
</For>

// ❌ never do this
// products.map(p => <Card key={p.id}>...)
```

### `Show` — replaces ternaries

```tsx
import { Show } from "@kanvas/phoenix-rebirth/lib/server";

<Show when={!isLoading && user} deps={[isLoading, user]} fallback={<Skeleton />}>
  <UserCard user={user} />
</Show>

// Access the truthy value via render function
<Show when={user.role} deps={[user.role]}>
  {(role) => <Badge>{role}</Badge>}
</Show>

// ❌ never do this
// isLoading ? <Skeleton /> : <UserCard />
```

**`deps` is required.** Always list the values that the `when` condition depends on.

### `Switch` + `Match` — replaces if-else chains

```tsx
import { Switch, Match } from "@kanvas/phoenix-rebirth/lib/server";

<Switch fallback={<Badge variant="secondary">Unknown</Badge>}>
  <Match when={status === "active"}><Badge variant="default">Active</Badge></Match>
  <Match when={status === "pending"}><Badge variant="warning">Pending</Badge></Match>
  <Match when={status === "inactive"}><Badge variant="destructive">Inactive</Badge></Match>
</Switch>

// ❌ never do this
// status === "active" ? ... : status === "pending" ? ... : ...
```

---

## Block components

### DialogAlert

Confirmation dialog with danger styling.

```tsx
import { DialogAlert } from "@kanvas/phoenix-rebirth/blocks/dialog";

<DialogAlert
  open={open}
  onOpenChange={setOpen}
  title="Delete record"
  description="This action cannot be undone."
  dangerAction
  action={{ title: "Delete", pending: isDeleting }}
  cancel={{ title: "Cancel" }}
  onAction={async () => { await remove(); setOpen(false); }}
/>
```

### ModalDialog

Responsive — Drawer on mobile, Dialog on desktop. Switches automatically.

```tsx
import { ModalDialog } from "@kanvas/phoenix-rebirth/blocks/modal";

<ModalDialog
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Create User"
  action={{ title: "Create", type: "submit", pending: isSaving, disable: !isValid }}
  cancel={{ title: "Cancel" }}
  onAction={handleCreate}
>
  {/* form fields */}
</ModalDialog>
```

### Advanced Table (TanStack)

```tsx
import { Table, TableSlot, columnsBuilder, useTable } from "@kanvas/phoenix-rebirth/blocks/table";

const columns = columnsBuilder([
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
], []);

const { table } = useTable({ data: users, columns });

<Table table={table} isFetching={isLoading}>
  <TableSlot name="top">
    <div className="flex justify-between p-4">
      <Input placeholder="Search…" />
      <Button>New</Button>
    </div>
  </TableSlot>
</Table>
```

---

## Form builder

```tsx
import { useSimpleFormBuilder, SimpleFormBuilder } from "@kanvas/phoenix-rebirth/blocks/form";

const { definitions, hook } = useSimpleFormBuilder([
  [
    { kind: "input", name: "firstname", label: "First Name", rules: { required: "Required" } },
    { kind: "input", name: "lastname",  label: "Last Name",  rules: { required: "Required" } },
  ],
  { kind: "input",  name: "email", type: "email", label: "Email", rules: { required: "Required" } },
  { kind: "phone",  name: "phone", label: "Phone", optional: "true" },
  { kind: "select", name: "role",  label: "Role",  rules: { required: "Required" },
    options: [{ name: "Admin", value: "admin" }, { name: "User", value: "user" }] },
  { kind: "faceted-select", name: "perms", label: "Permissions", truncateAt: 3,
    options: [{ name: "Read", value: "read" }, { name: "Write", value: "write" }] },
  { kind: "textarea", name: "bio",           label: "Bio",           optional: "true" },
  { kind: "switch",   name: "notifications", label: "Notifications" },
  { kind: "checkbox", name: "terms",         label: "I accept terms", rules: { required: "Required" } },
  { kind: "custom",   name: "avatar",        label: "Avatar", component: AvatarUploader },
], { defaultValues: { firstname: "", lastname: "", email: "", /* ... */ } });

<form onSubmit={hook.handleSubmit(handleSave)}>
  <SimpleFormBuilder definitions={definitions} hook={hook} />
  <Button type="submit" disabled={!hook.formState.isValid}>Submit</Button>
</form>
```

Field `kind` values: `input` | `textarea` | `select` | `faceted-select` | `phone` | `checkbox` | `switch` | `custom`

---

## Slots pattern

For building layout components with named content injection:

```tsx
import { WithSlots, Slot } from "@kanvas/phoenix-rebirth/lib/server";

const SLOTS = ["header", "sidebar", "content"] as const;
type PanelSlots = (typeof SLOTS)[number];

const Panel = ({ slots }: { slots: Record<PanelSlots, React.ReactNode> }) => (
  <div>
    <header>{slots.header}</header>
    <aside>{slots.sidebar}</aside>
    <main>{slots.content}</main>
  </div>
);

const PanelWithSlots = WithSlots(Panel, SLOTS);

function PanelSlot(props: { name: PanelSlots; children: React.ReactNode }) {
  return <Slot<PanelSlots> {...props} />;
}

// Usage
<PanelWithSlots>
  <PanelSlot name="header"><h1>Title</h1></PanelSlot>
  <PanelSlot name="sidebar"><Nav /></PanelSlot>
  <PanelSlot name="content"><Routes /></PanelSlot>
</PanelWithSlots>
```

---

## Utility hooks

### `useEvents` — cross-component events

```tsx
import { useEvents } from "@kanvas/phoenix-rebirth/lib/utils";

// Emitter
const { emit } = useEvents<string>();
emit("search", query);

// Listener (different component)
const { on } = useEvents<string>();
useEffect(() => on("search", ({ detail }) => setQuery(detail)), []);
```

### `useSet` and `useMap` — reactive collections

```tsx
import { useSet, useMap } from "@kanvas/phoenix-rebirth/lib/utils";

const tags = useSet<string>(["react", "ts"]);
tags.add("next"); tags.delete("react"); tags.has("ts"); tags.values();

const cart = useMap<string, number>();
cart.set("sku-1", 2); cart.get("sku-1"); cart.entries();
```

### `useThread` — offload heavy work

```tsx
import { useThread } from "@kanvas/phoenix-rebirth/lib/utils";

const { client, server } = useThread();

// Browser Web Worker
const run = client(async () => { /* heavy computation */ return result; });
const out = await run();

// Node.js Worker Thread (requires /api/threads route)
const runServer = server(async (port, data) => data.items.map(x => x * 2), { items: [1,2,3] });
```

API route (required for `server`):
```ts
// app/api/threads/route.ts
import { POST } from "@kanvas/phoenix-rebirth/lib/threads-api";
export { POST };
```

---

## Other hooks

```tsx
import { useIsMobile, useToast } from "@kanvas/phoenix-rebirth/hooks";
import { Toaster } from "@kanvas/phoenix-rebirth/ui/toaster";

const isMobile = useIsMobile(); // 768px breakpoint

const { toast } = useToast();
toast({ title: "Saved", description: "Changes applied." });
// <Toaster /> must be present in the tree
```

Also re-exports all hooks from `react-use` via `@kanvas/phoenix-rebirth/hooks`.

---

## Tour system

```tsx
import { useTourBuilder } from "@kanvas/phoenix-rebirth/lib/tour";

const { TourComponents, Driver } = useTourBuilder({
  steps: [
    { wrappertName: "WelcomeStep", title: "Welcome!", description: "Quick tour.", showButtons: ["next", "skip"] },
    { wrappertName: "SearchStep",  title: "Search",   description: "Find things fast.", showButtons: ["previous", "next"] },
  ],
  options: { animate: true, allowClose: true, progressText: "Step {{current}} of {{total}}" },
});

// Wrap elements — wrappertName must match the step
<TourComponents.WelcomeStep><h1>Home</h1></TourComponents.WelcomeStep>
<TourComponents.SearchStep><Input /></TourComponents.SearchStep>

<Button onClick={() => Driver.drive()}>Start Tour</Button>
```

---

## Login view

```tsx
import { Login } from "@kanvas/phoenix-rebirth/views/login";

<Login
  image={{ src: "/bg.jpg", alt: "Login" }}
  card={{
    logo: { src: "/logo.svg", width: 150, height: 50 },
    title: "Welcome back",
    inputs: {
      email:    { label: "Email",    placeholder: "you@example.com" },
      password: { label: "Password", placeholder: "••••••••" },
      check: "Keep me signed in",
    },
    forgot: { text: "Forgot password?", url: "/auth/forgot" },
    action: "Sign in",
  }}
  onLogin={async ({ email, password, remember }) => { /* authenticate */ }}
  onError={(err) => toast({ title: "Error", description: err.message, variant: "destructive" })}
/>
```

---

## Utilities

```tsx
import { cn } from "@kanvas/phoenix-rebirth/lib/utils";

// Merge Tailwind classes safely (clsx + tailwind-merge)
<div className={cn("p-4 rounded", isActive && "bg-primary", className)} />
```

---

## Reference files (read when needed)

- **`references/ui-components.md`** — Full catalog of all 40+ UI primitive components with import
  paths and minimal usage examples (Accordion, AlertDialog, Badge, Button, Calendar, Card,
  Carousel, Chart, Combobox, Dialog, Drawer, DropdownMenu, Input, Select, Tabs, Table, Toast…).

- **`references/migration.md`** — v0.x → v1.0 breaking changes: import path restructure,
  explicit CSS imports, and replacing `.map()` / ternaries with control flow components.

---

## Quick decision tree

```
Rendering a list?           → For
Conditional render?         → Show (binary) or Switch/Match (multi-case)
Layout with injected content? → WithSlots + Slot
Complex form?               → useSimpleFormBuilder + SimpleFormBuilder
Confirmation dialog?        → DialogAlert
Create/edit modal?          → ModalDialog
Data table?                 → columnsBuilder + useTable + Table + TableSlot
Cross-component events?     → useEvents
Reactive Set/Map state?     → useSet / useMap
Heavy CPU work?             → useThread (client for browser, server for Node)
Onboarding flow?            → useTourBuilder
Auth page?                  → Login view
```
