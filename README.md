# Kanvas Phoenix rebirth

## Description

Kanvas Phoenix rebirth is a powerful library of pre-built components and
features designed to simplify and expedite the development. Kanvas Phoenix
rebirth streamlines the creation of attractive and functional user interfaces,
allowing frontend developers to focus on business logic rather than reinventing
the wheel in each project.

## Installation

To start using Kanvas Phoenix rebirth in your project, follow these simple
steps:

1. Ensure you have installed
   [Kanvas Core JS](https://github.com/bakaphp/kanvas-core-js#kanvas-core-js)
2. Install Kanvas Phoenix rebirth using npm or yarn:

```bash
npm install @kanvas/phoenix-rebirth
# or
pnpm add @kanvas/phoenix-rebirth
# or
yarn add @kanvas/phoenix-rebirth
```

3. Import the necessary components into your project and start using them.

```javascript
import { Button } from "@kanvas/phoenix-rebirth/dist/components/base/button";
```

> Start building your dashboard!

## Basic Usage

Kanvas Phoenix rebirth integrates seamlessly into your project. Here's a quick
example of how to use a button component:

```jsx
import { PlusIcon } from "@kanvas/phoenix-rebirth/dist/components/base/icons";
import { Button } from "@kanvas/phoenix-rebirth/dist/components/base/button";
import { Input } from "@kanvas/phoenix-rebirth/dist/components/base/input";

function MyPage() {
  return (
    <div>
      <Button onClick={doSomething}>
        Do something <PlusIcon />
      </Button>
      <Input placeholder="Type..." value="some text" />
    </div>
  );
}
```

> _Note_: All components come from
> [shadcn/ui](https://ui.shadcn.com/docs/components/accordion) you can check all
> of then.

## How configure tailwind with phoenix-rebirth

```ts
import { createTailwindConfig } from "@kanvas/phoenix-rebirth/dist/config/tailwind";

module.exports = createTailwindConfig({
  // ... your tailwind config
});
```

in your main css file:

```css
/* dont forget this ;) */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* base ligth theme */
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;

    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;

    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;

    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;

    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;

    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;

    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 10% 3.9%;

    --radius: 0.5rem;
  }

  /* base dark theme */
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;

    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;

    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;

    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;

    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;

    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;

    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;

    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

> _Note_: The variables within the global CSS file are those that control the
> behavior of the components such as their colors and border radius. To avoid
> conflicts between phoenix-rebirth and your tailwind configuration, it is
> recommended that you use other names to name your colors and other
> configurations.

```css
theme: {
  container: {
    center: /* Reserved do not modify in tailwind */,
    padding: /* Reserved do not modify in tailwind */,
    screens: {
      "2xl": /* Reserved do not modify in tailwind */,
    },
  },
  extend: {
    colors: {
      border: "Reserved do not modify in tailwind",
      input: "Reserved do not modify in tailwind",
      ring: "Reserved do not modify in tailwind",
      background: "Reserved do not modify in tailwind",
      foreground: "Reserved do not modify in tailwind",
      primary: {
        DEFAULT: "Reserved do not modify in tailwind",
        foreground: "Reserved do not modify in tailwind",
      },
      secondary: {
        DEFAULT: "Reserved do not modify in tailwind",
        foreground: "Reserved do not modify in tailwind",
      },
      destructive: {
        DEFAULT: "Reserved do not modify in tailwind",
        foreground: "Reserved do not modify in tailwind",
      },
      muted: {
        DEFAULT: "Reserved do not modify in tailwind",
        foreground: "Reserved do not modify in tailwind",
      },
      accent: {
        DEFAULT: "Reserved do not modify in tailwind",
        foreground: "Reserved do not modify in tailwind",
      },
      popover: {
        DEFAULT: "Reserved do not modify in tailwind",
        foreground: "Reserved do not modify in tailwind",
      },
      card: {
        DEFAULT: "Reserved do not modify in tailwind",
        foreground: "Reserved do not modify in tailwind",
      },
    },
    borderRadius: {
      lg: "Reserved do not modify in tailwind",
      md: "Reserved do not modify in tailwind",
      sm: "Reserved do not modify in tailwind",
    },
    keyframes: {
      "accordion-down": {
        // Reserved do not modify in tailwind
      },
      "accordion-up": {
        // Reserved do not modify in tailwind
      },
    },
    animation: {
      "accordion-down": "Reserved do not modify in tailwind",
      "accordion-up": "Reserved do not modify in tailwind",
    },
  },
},
```

If you need to modify any of these parameters you must do so using CSS variables

## How use components and icons

To use the base components you just have to call the component or icon you want
to use.

`example`:

```typescript
import { PlusIcon } from "@kanvas/phoenix-rebirth/dist/components/base/icons";
import { Button } from "@kanvas/phoenix-rebirth/dist/components/base/button";
import { Input } from "@kanvas/phoenix-rebirth/dist/components/base/input";
```

The components are designed to work on client side as server side, with
`nextjs 13^` app router, it is necessary to specify whether the client
component, if nextjs throws you an error using a component for not specifying
that it is client, you only have to change its import:

```typescript
// with out "use client"
import { Select } from "@kanvas/phoenix-rebirth/dist/components/base/input";

// with "use client"
import { Select } from "@kanvas/phoenix-rebirth/dist/components/base/input.mjs";
```

## Utilitie Components

phoenix-rebirth includes utility components to improve the development
experience, these components are:

- For
- Show
- Switch
- Match

`Example` How to use `For` Component:

```html
// with out For
<ul>
  [...].map((item, index) => (<li key="{index}">{item}</li>))
</ul>

// with For
<ul>
  <For
    each={[...]}
    fallback={<> not elements </>}
    error={<> some element throw an error </>}
  >
    {
      (item, { key }) => (<li key={key}>{item}</li>)
    }
  </For>
</ul>
```

With the `For` component, each element within it is rendered individually to the
previous or next one, so if any element throws an error this does not break the
application and an error message can be displayed.

`Example` How to use `Show` Component:

```html
// with out Show
<ul>
  { (counter === 4) ? <li> true </li>  :  <li> false </li>}
</ul>

// with Show
<ul>
  <Show
    when={(counter === 4)}
    deps={[counter]}
    fallback={<li> false </li>}
  >
    <li> true </li>
  </For>
</ul>
```

The `Show` component improves the experience of using conditionals within jsx,
making the code more readable and maintainable when you have nested conditions.

`Example` How to use `Show` Component:

```html
// with out Switch/Match
<ul>
  {(counter === 4) && <li> 4 </li>}
  {(counter === 5) && <li> 5 </li>}
  {(counter === 6) && <li> 6 </li>}
</ul>

// with Switch/Match
<ul>
  <Switch
    fallback={<li> no one </li>}
  >
    <Match when={counter === 4}>
      <li> 4 </li>
    </Match>

    <Match when={counter === 5}>
      <li> 5 </li>
    </Match>

    <Match when={counter === 6}>
      <li> 6 </li>
    </Match>
  </Switch>
</ul>
```

`Switch` and `Match` improve the experience when multiple cases must be
evaluated for a single output, just like Switch in javascript.

## How to make themes

We use a simple `background` and `foreground` convention for colors. The
`background` variable is used for the background color of the component and the
`foreground` variable is used for the text color.

> The background suffix is omitted when the variable is used for the background
> color of the component.

Given the following CSS variables:

```css
--primary: 222.2 47.4% 11.2%;
--primary-foreground: 210 40% 98%;
```

The `background` color of the following component will be `hsl(var(--primary))`
and the `foreground` color will be `hsl(var(--primary-foreground))`.

```html
<div className="bg-primary text-primary-foreground">Hello</div>
```

### List of variables

Default background color of `<body />`...etc

```css
--background: 0 0% 100%;
--foreground: 222.2 47.4% 11.2%;
```

Muted backgrounds such as `<TabsList />, <Skeleton /> and <Switch />`

```css
--muted: 210 40% 96.1%;
--muted-foreground: 215.4 16.3% 46.9%;
```

Background color for `<Card />`

```css
--card: 0 0% 100%;
--card-foreground: 222.2 47.4% 11.2%;
```

Background color for popovers such as
`<DropdownMenu />, <HoverCard />, <Popover />`

```css
--popover: 0 0% 100%;
--popover-foreground: 222.2 47.4% 11.2%;
```

Default border color

```css
--border: 214.3 31.8% 91.4%;
```

Border color for inputs such as `<Input />, <Select />, <Textarea />`

```css
--input: 214.3 31.8% 91.4%;
```

Primary colors for `<Button />`

```css
--primary: 222.2 47.4% 11.2%;
--primary-foreground: 210 40% 98%;
```

Secondary colors for `<Button />`

```css
--secondary: 210 40% 96.1%;
--secondary-foreground: 222.2 47.4% 11.2%;
```

Used for accents such as hover effects on
`<DropdownMenuItem>, <SelectItem>`...etc

```css
--accent: 210 40% 96.1%;
--accent-foreground: 222.2 47.4% 11.2%;
```

Used for destructive actions such as `<Button variant="destructive">`

```css
--destructive: 0 100% 50%;
--destructive-foreground: 210 40% 98%;
```

Used for focus ring

```css
--ring: 215 20.2% 65.1%;
```

Border radius for card, input and buttons

```css
--radius: 0.5rem;
```

> _Note_: for css use HSL color format

### Adding new colors

To add new colors, you need to add them to your CSS file and to your
`tailwind.config.js` file.

`app/globals.css`

```css
:root {
  --warning: 38 92% 50%;
  --warning-foreground: 48 96% 89%;
}

.dark {
  --warning: 48 96% 89%;
  --warning-foreground: 38 92% 50%;
}
```

`tailwind.config.js`

```typescript
module.exports = createTailwindConfig({
  theme: {
    extend: {
      colors: {
        warning: "hsl(var(--warning))",
        "warning-foreground": "hsl(var(--warning-foreground))",
      },
    },
  },
});
```

You can now use the warning utility class in your components.

```html
<div className="bg-warning text-warning-foreground" />
```

## Advance utilities

### useEvents Hook

allows you to emit and listen to client-side events in a simple way, similar to
frameworks like vue or svelte

```jsx
import { useEvents } from "@kanvas/phoenix-rebirth/dist/lib";


export default Home(props) {
  // events can be typed
  const  { emit }  = useEvents<number>()

  return <button onClick={() => emit('random', Math.random())}> random </button>
}


export default Home2(props) {
  const  { on }  = useEvents<number>();

  useEffect(() => {

    return on('random', ({ detail }) => console.log(detail)); // 0.96362
  }, []);

  return <button>...</button>
}
```

### useThreads Hook

allows you to run code in a thread separate from the main one, either on the
server (nodejs) or on the client (browser).

```tsx
"use client";

import { useEvents } from "@kanvas/phoenix-rebirth/dist/lib";

export function Component() {
  const { client, server } = useThread();

  // this use browser threads .....
  const clientHandler = client(async () => {
    // this code will execute on browser new thread

    console.log("hello from browser thread", self); // threads not have access to 'window' context

    return 2 + 2;
  });

  // this use node threads .....
  const serverHandler = server(
    // can pass data
    async (port, data) => {
      // this code will execute on nodejs new thread

      console.log("hello from node thread", data);

      return 2 + 2;
    },
    { hello: "world" }
  );

  return (
    <>
      <button
        onClick={() => clientHandler().then((value) => console.log(value))}
      >
        client
      </button>
      <button
        onClick={() => serverHandler().then((value) => console.log(value))}
      >
        server
      </button>
    </>
  );
}
```

to use `server` need to create a api route:

`src/app/api/threads/route.ts`

```typescript
import { POST } from "@kanvas/phoenix-rebirth/lib/threads-api";

export { POST };
```

## Slots

A type-safe implementation of the slots pattern for React, supporting both Server and Client Components in Next.js.

### Table of Contents

- [Basic Usage](#basic-usage)
- [Type Safety](#type-safety)
- [Server & Client Components](#server--client-components)
- [Advanced Patterns](#advanced-patterns)

### Basic Usage

1. Define Your Slots

```tsx
// Define slots as a const array for both type and runtime usage
const LAYOUT_SLOTS = ["header", "main", "footer"] as const;

// Create type from the const array
type LayoutSlots = (typeof LAYOUT_SLOTS)[number];
```

2. Create Your Component

```tsx
interface Props extends WithSlotsProps<LayoutSlots> {
  app: string; // Additional props
}

const Layout = ({ slots, app }: Props) => (
  <div>
    <header>{slots.header}</header>
    <main>{slots.main}</main>
    <footer>{slots.footer}</footer>
  </div>
);

// Create the wrapped version
const LayoutWithSlots = WithSlots(Layout, LAYOUT_SLOTS);
```

3. Create Type-Safe Slot Component

```tsx
function LayoutSlot(props: { name: LayoutSlots; children: React.ReactNode }) {
  return <Slot<LayoutSlots> {...props} />;
}
```

4. Use The Component

```tsx
export default function App() {
  return (
    <LayoutWithSlots app="myApp">
      <LayoutSlot name="header">
        <h1>Header Content</h1>
      </LayoutSlot>

      <LayoutSlot name="main">
        <div>Main Content</div>
      </LayoutSlot>

      <LayoutSlot name="footer">
        <div>Footer Content</div>
      </LayoutSlot>
    </LayoutWithSlots>
  );
}
```

### Server & Client Components

Server Component Usage

```tsx
// page.tsx
import { WithSlots } from "...";

const ServerLayout = ({ slots }: WithSlotsProps<LayoutSlots>) => (
  <div>
    {slots.header}
    {slots.content}
  </div>
);

const ServerLayoutWithSlots = WithSlots(ServerLayout, LAYOUT_SLOTS);

// This can be a Server Component
export default function Page() {
  return (
    <ServerLayoutWithSlots>
      <LayoutSlot name="header">
        <h1>Server Rendered Header</h1>
      </LayoutSlot>
      <LayoutSlot name="content">
        <div>Server Rendered Content</div>
      </LayoutSlot>
    </ServerLayoutWithSlots>
  );
}
```

Client Component Usage

```tsx
// client-component.tsx
"use client";

import { WithSlotsProps } from "...";

const INTERACTIVE_SLOTS = ["header", "content"] as const;
type InteractiveSlots = (typeof INTERACTIVE_SLOTS)[number];

interface ClientProps extends WithSlotsProps<InteractiveSlots> {
  onClick: () => void;
}

function InteractiveSlot(props: {
  name: InteractiveSlots;
  children: React.ReactNode;
}) {
  return <Slot<InteractiveSlots> {...props} />;
}

export function ClientComponent({ slots, onClick }: ClientProps) {
  return (
    <div onClick={onClick}>
      {slots.header}
      {slots.content}
    </div>
  );
}

const ClientWithSlots = WithSlots(ClientComponent, INTERACTIVE_SLOTS);

// Usage in a Server Component
function Page() {
  return (
    <ClientWithSlots onClick={() => console.log("clicked")}>
      <InteractiveSlot name="header">
        <button>Interactive Header</button>
      </InteractiveSlot>
      <InteractiveSlot name="content">
        <div>Interactive Content</div>
      </InteractiveSlot>
    </ClientWithSlots>
  );
}
```

Mixing Client and Server Components

```tsx
// server-component.tsx
import { ClientComponent } from "./client-component";

export function ServerComponent() {
  return (
    <LayoutWithSlots app="myApp">
      <LayoutSlot name="header">
        <ClientComponent /> {/* Client Component in Server Component slot */}
      </LayoutSlot>
      <LayoutSlot name="main">
        <div>Server Rendered Content</div>
      </LayoutSlot>
    </LayoutWithSlots>
  );
}
```

Advanced Patterns

Optional Slots

```tsx
const CARD_SLOTS = ["title", "content", "footer?"] as const;

type CardSlots = (typeof CARD_SLOTS)[number];
type RequiredCardSlots = Exclude<CardSlots, `${string}?`>;
type OptionalCardSlots = Extract<CardSlots, `${string}?`>;

interface CardProps extends WithSlotsProps<RequiredCardSlots> {
  slots: Record<RequiredCardSlots, ReactNode> &
    Partial<Record<OptionalCardSlots, ReactNode>>;
}
```

Nested Slots

```tsx
const NESTED_SLOTS = [
  "header",
  "header.title",
  "header.subtitle",
  "content",
  "footer",
] as const;

type NestedSlots = (typeof NESTED_SLOTS)[number];

const NestedLayout = ({ slots }: WithSlotsProps<NestedSlots>) => (
  <div>
    <header>
      {slots["header"]}
      <div>
        {slots["header.title"]}
        {slots["header.subtitle"]}
      </div>
    </header>
    {slots.content}
    {slots.footer}
  </div>
);
```

Best Practices

1. **Define Slots Once**: Use a const array to define slots and derive types from it

   ```tsx
   const SLOTS = ["header", "main", "footer"] as const;
   type Slots = (typeof SLOTS)[number];
   ```

2. **Create Typed Slot Components**: Make slot usage type-safe

   ```tsx
   function TypedSlot(props: { name: Slots; children: ReactNode }) {
     return <Slot<Slots> {...props} />;
   }
   ```

3. **Mark Client Components**: Always mark interactive components with "use client"

   ```tsx
   "use client";
   export function Interactive({ slots }: Props) {
     // Interactive component code
   }
   ```

4. **Validate Required Slots**: Use TypeScript to enforce required slots

   ```tsx
   interface Props extends WithSlotsProps<RequiredSlots> {
     // Additional props
   }
   ```

5. **Document Slot Purpose**: Comment what each slot is for
   ```tsx
   const DASHBOARD_SLOTS = [
     "nav", // Navigation area
     "sidebar", // Side configuration panel
     "content", // Main content area
     "footer", // Footer with actions
   ] as const;
   ```
