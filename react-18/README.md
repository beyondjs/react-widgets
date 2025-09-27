# Welcome to `@beyond-js/react-18-widgets` package

`@beyond-js/react-18-widgets` is a comprehensive package for [BeyondJS](https://beyondjs.com), a platform for creating
web projects as independent microfrontends. This package seamlessly integrates React 18 into BeyondJS projects,
providing developers with powerful hooks and utilities for building responsive, reactive applications.

## Features

-   **Easy React Integration**: Seamlessly use React 18 in BeyondJS microfrontend projects
-   **Built on Solid Foundation**: Extends the robust `@beyond-js/widgets` package architecture
-   **Rich Hook Collection**: Includes powerful custom hooks for common development patterns
-   **TypeScript Support**: Full TypeScript support with comprehensive type definitions
-   **SSR Compatible**: Works perfectly with server-side rendering environments

## Custom Hooks

This package provides a collection of useful React hooks designed specifically for BeyondJS applications:

### Core Hooks

-   **[useBinder](./modules/client/hooks/readme/use-binder.md)** - Listen for changes from Reactive Models using the
    observer pattern
-   **[useTexts](./modules/client/hooks/readme/use-texts.md)** - Load text bundles from modules following npm standard
    specifiers
-   **[useScreen](./modules/client/hooks/readme/use-screen.md)** - Get responsive screen size information with
    configurable breakpoints
-   **[useStore](./modules/client/hooks/readme/use-store.md)** - Subscribe to reactive stores with automatic
    re-rendering

### Hook Categories

**Reactive State Management:**

-   `useBinder` - Bind to reactive model changes
-   `useStore` - Subscribe to reactive stores

**UI & Responsiveness:**

-   `useScreen` - Responsive breakpoint detection

**Internationalization:**

-   `useTexts` - Dynamic text bundle loading

## Getting Started

1. **Install the package** in your BeyondJS project:

```bash
npm install @beyond-js/react-18-widgets
```

2. **Import and use hooks** in your React components:

```typescript
import { useScreen, useStore, useTexts } from '@beyond-js/react-18-widgets/hooks';

function MyComponent() {
	const screen = useScreen();
	const [textsReady, texts] = useTexts(module.specifier);

	return (
		<div>
			{screen.isMobile && <p>Mobile view</p>}
			{textsReady && <h1>{texts.title}</h1>}
		</div>
	);
}
```

3. **Create your TSX files** directly - no additional configuration needed!

## Quick Examples

### Responsive Design with useScreen

```typescript
import { useScreen } from '@beyond-js/react-18-widgets/hooks';

function ResponsiveGrid() {
	const screen = useScreen();

	const columns = screen.isMobile ? 1 : screen.isTablet ? 2 : 3;

	return <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)` }}>{/* Grid items */}</div>;
}
```

### Reactive State with useStore

```typescript
import { useStore } from '@beyond-js/react-18-widgets/hooks';

function DataDisplay({ store }) {
	const reactiveStore = useStore(store, ['change', 'update']);

	return <div>{reactiveStore.data}</div>;
}
```

### Internationalization with useTexts

```typescript
import { useTexts } from '@beyond-js/react-18-widgets/hooks';

function LocalizedComponent() {
	const [ready, texts] = useTexts('my-package/component');

	if (!ready) return <div>Loading...</div>;

	return <h1>{texts.welcome}</h1>;
}
```

## TypeScript Support

All hooks are fully typed with comprehensive TypeScript interfaces:

```typescript
import type { IScreenState, IBreaks, IReactiveStore } from '@beyond-js/react-18-widgets/hooks/types';
```

## Integration with BeyondJS Ecosystem

This package works seamlessly with other BeyondJS packages:

-   **@beyond-js/reactive** - Create reactive models for use with `useStore` and `useBinder`
-   **@beyond-js/widgets** - Core widget functionality
-   **@beyond-js/bundler** - Build and bundle your microfrontends

## Contributing

We welcome contributions to `@beyond-js/react-18-widgets`! If you'd like to contribute:

1. Read our [Contribution Guidelines](https://beyondjs.com/docs/contributing)
2. Check out the existing hook implementations for patterns
3. Add comprehensive documentation for new hooks
4. Include TypeScript types and interfaces

## License

`@beyond-js/react-18-widgets` is [MIT licensed](LICENSE).
