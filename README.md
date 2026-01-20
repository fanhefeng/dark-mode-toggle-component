# Dark Mode Toggle Web Component

A flashlight-style dark mode toggle web component built with Vanilla JS. This component allows users to toggle dark mode on and off by clicking a button that animates like a flashlight. It's designed to be easy to integrate into your web projects as a custom HTML element.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Customizing the Component](#customizing-the-component)
- [License](#license)

## Features

- 🌑 **Dark Mode Toggle**: Switch between dark mode and light mode with a single click.
- 💡 **Flashlight Effect**: Adds a flashlight effect when the toggle button is clicked in dark mode.
- 🚀 **Web Component**: Native web component, can be used in any framework or vanilla JS.
- 🛠 **Customizable**: Easily change primary color and other properties.
- 📦 **Lightweight**: Minimal JavaScript, only adds the functionality you need.
- 🔧 **Vite-powered**: Built using Vite for fast bundling and hot-reloading during development.

## Installation

### 1. Install via npm

You can install the component via npm if you are using a package manager:

```bash
npm install @fanhefeng/dark-mode-toggle-component
```

### 2. Importing and Using the Component

After installing, you can import the component and use it in your HTML.

```html
<dark-mode-toggle primary-color="#6155f5"></dark-mode-toggle>
```

You can optionally customize the primary color using the `primary-color` attribute. If not provided, the default color is `#6155f5`.

## Usage

### Basic Usage

To use the `dark-mode-toggle` component, simply include the following HTML tag in your page:

```html
<dark-mode-toggle></dark-mode-toggle>
```

This will render the toggle button with the default primary color (`#6155f5`). Clicking the button will toggle the dark mode on the page.

### Customizing the Component

You can customize the component by passing different attributes:

- `primary-color`: Change the color of the toggle button.
- `dark-mode`: Pre-set dark mode on page load.

#### Example with Customization:

```html
<dark-mode-toggle
	primary-color="#ff6347"
	dark-mode
></dark-mode-toggle>
```

This will set the toggle button color to tomato (`#ff6347`) and enable dark mode by default.

#### Dynamically Control Dark Mode:

You can also control dark mode using JavaScript by adding or removing the `dark` class on the `body` element:

```js
const darkModeToggle = document.querySelector("dark-mode-toggle");
document.body.classList.toggle("dark"); // Toggles dark mode programmatically
```

## License

MIT
