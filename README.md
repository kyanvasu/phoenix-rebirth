# Kanvas Phoenix rebirth

## Description

Kanvas Phoenix rebirth is a powerful library of pre-built components and features designed to simplify and expedite the development. These components are based on the Atomic Design concept that uses tailwind and seamlessly integrate with Kanvas Niche. Kanvas Phoenix rebirth streamlines the creation of attractive and functional user interfaces, allowing frontend developers to focus on business logic rather than reinventing the wheel in each project.

## Key Features

- **Reusable Components:** Kanvas Phoenix rebirth offers a wide range of ready-to-use components such as navigation bars, tables, charts, forms,inputs and more, following best design and usability practices.
- **Integration with Kanvas Niche:** Kanvas Phoenix rebirth components are designed to work seamlessly with Kanvas Niche, ensuring a consistent development experience.
- **Atomic Design:** The library follows the Atomic Design approach, allowing easy composition and customization of UI elements.
- **Enhanced Productivity:** By using Kanvas Phoenix rebirth, developers can significantly speed up the development of dashboard administrators, saving time and resources.
- **Easy Customization:** While components are highly customizable, they also include sensible default settings. [see tailwind default config](), making them easy to use in projects without extensive customization.

## Installation

To start using Kanvas Phoenix rebirth in your project, follow these simple steps:

1.  Ensure you have installed [Kanvas Core JS](https://github.com/bakaphp/kanvas-core-js#kanvas-core-js)
2.  Install Kanvas Phoenix rebirth using npm or yarn:

```bash
 npm install @kanvas/phoenix-rebirth
 # or
 yarn add @kanvas/phoenix-rebirth
```

3.  Import the necessary components into your project and start using them.

```javascript
import { Atoms, Molecules, Organism } from "@kanvas/phoenix-rebirth";
```

// Start building your dashboard!`

## Basic Usage

Kanvas Phoenix rebirth integrates seamlessly into your project. Here's a quick example of how to use a button component:

```jsx
import { Atoms } from "@kanvas/phoenix-rebirth";

function MyPage() {
  return (
    <div>
      <Atoms.Button.Solid onClick={doSomething}>
        Do something{" "}
      </Atoms.Button.Solid>
    </div>
  );
}
```

## How to Run the Project

For detailed instructions on how to run this project, please refer to the [Running the Project Guide](USAGE.md).

## Detailed Documentation

For more in-depth information on using Kanvas phoenix-rebirth components and features, please refer to our documentation at [TBD]().

---
