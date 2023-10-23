# Kanvas Phoenix


## Description

Kanvas Phoenix is a powerful library of pre-built components and features designed to simplify and expedite the development. These components are based on the Atomic Design concept that uses tailwind and seamlessly integrate with Kanvas Nicho. Kanvas Phoenix streamlines the creation of attractive and functional user interfaces, allowing frontend developers to focus on business logic rather than reinventing the wheel in each project.

## Key Features

-   **Reusable Components:** Kanvas Phoenix offers a wide range of ready-to-use components such as navigation bars, tables, charts, forms,inputs and more, following best design and usability practices.
    
-   **Integration with Kanvas Nicho:** Kanvas Phoenix components are designed to work seamlessly with Kanvas Nicho, ensuring a consistent development experience.
    
-   **Atomic Design:** The library follows the Atomic Design approach, allowing easy composition and customization of UI elements.
    
-   **Enhanced Productivity:** By using Kanvas Phoenix, developers can significantly speed up the development of dashboard administrators, saving time and resources.
    
-   **Easy Customization:** While components are highly customizable, they also include sensible default settings. [see tailwind default config](), making them easy to use in projects without extensive customization.
    

## Installation

To start using Kanvas Phoenix in your project, follow these simple steps:

1.  Ensure you have installed [Kanvas Core JS](https://github.com/bakaphp/kanvas-core-js#kanvas-core-js)
    
2.  Install Kanvas Phoenix using npm or yarn:
    
   ```bash
    npm install @kanvas/phoenix
    # or
    yarn add @kanvas/phoenix
   ```
3.  Import the necessary components into your project and start using them.
    

```javascript

import { Atoms, Molecules, Organism } from '@kanvas/phoenix';
```

// Start building your dashboard!` 

## Basic Usage

Kanvas Phoenix integrates seamlessly into your project. Here's a quick example of how to use a button component:

```jsx

import { Atoms} from '@kanvas/phoenix';

function MyPage() {
  return (
    <div>
      <Atoms.Button.Solid onClick={doSomething}>Do something </Atoms.Button.Solid>
    </div>
  );
} 
```

## Detailed Documentation

For more in-depth information on using Kanvas Phoenix components and features, please refer to our documentation at [TBD]().


----------