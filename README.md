# dark-mode-toggle-component

A flashlight-style dark mode toggle Web Component. Lightweight and dependency-free at runtime, suitable for static sites or any framework.

## Features

- Native Web Component — works with any framework or vanilla HTML
- Flashlight effect follows cursor in dark mode
- Zero runtime dependencies
- Built with Vite for fast development and optimized production builds
- Supports both ESM and IIFE bundles

## Installation

```bash
npm install dark-mode-toggle-component
```

Or include directly via CDN/local file.

## Quick Start

### Using the built bundle (recommended)

```html
<script type="module" src="/dist/dark-mode-toggle.es.js"></script>
<dark-mode-toggle></dark-mode-toggle>
```

### Using IIFE bundle (for non-module environments)

```html
<script src="/dist/dark-mode-toggle.iife.js"></script>
<dark-mode-toggle></dark-mode-toggle>
```

## Attributes

| Attribute       | Type   | Default   | Description                          |
| --------------- | ------ | --------- | ------------------------------------ |
| `primary-color` | string | `#6155f5` | Accent color for the toggle glow     |
| `dark-mode`     | flag   | —         | If present, starts in dark mode      |

### Example with attributes

```html
<dark-mode-toggle primary-color="#ff6b6b" dark-mode></dark-mode-toggle>
```

## Development

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Setup

```bash
# Install dependencies
npm install

# Start development server with HMR
npm run dev

# Build for production
npm run build
```

### Project Structure

```
├── src/
│   ├── dark-mode-toggle.js   # Main component source
│   └── assets/
│       ├── dark_mode.svg     # Toggle icon
│       └── flashlight.webp   # Flashlight effect image
├── dist/                     # Built output
├── vite.config.js            # Vite configuration
└── package.json
```

## Browser Support

Works in all modern browsers that support Web Components (Custom Elements v1, Shadow DOM).

## License

MIT — see [LICENSE](./LICENSE) for details.

## Contributing

Issues and PRs are welcome. Please include reproduction steps and expected behavior when reporting bugs.
