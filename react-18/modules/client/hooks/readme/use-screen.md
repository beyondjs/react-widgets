# useScreen Hook

The `useScreen` hook is a part of the `@beyond-js/react-18-widgets/hooks` package. It provides responsive screen size
information based on configurable breakpoints, making it easy to create responsive React components.

## Installation

To use the `useScreen` hook in your project, you need to import it as follows:

```javascript
import { useScreen } from '@beyond-js/react-18-widgets/hooks';
```

## Usage

The `useScreen` hook returns comprehensive screen size information including current dimensions, breakpoint key, boolean
flags for each breakpoint, and semantic device type flags.

Here is the function signature:

```typescript
function useScreen(breaks?: Partial<IBreaks>): IScreenState;
```

### Parameters

-   `breaks` (Partial<IBreaks>, optional): Custom breakpoint values to override the default breakpoints.

### Default Breakpoints

The hook uses the following default breakpoints:

```typescript
{
  xs: 0,    // Extra small devices
  sm: 576,  // Small devices
  md: 768,  // Medium devices
  lg: 992,  // Large devices
  xl: 1200, // Extra large devices
  xxl: 1400 // Extra extra large devices
}
```

### Return Value

The hook returns an `IScreenState` object with the following properties:

-   `width` (number): Current window width
-   `height` (number): Current window height
-   `key` (IKey): Current breakpoint key (`'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'`)
-   `xs`, `sm`, `md`, `lg`, `xl`, `xxl` (boolean): Individual breakpoint flags
-   `isMobile` (boolean): `true` when width < md breakpoint
-   `isTablet` (boolean): `true` when width >= md and < lg breakpoint
-   `isDesktop` (boolean): `true` when width >= lg breakpoint

### Examples

#### Basic Usage

```typescript
import * as React from 'react';
import { useScreen } from '@beyond-js/react-18-widgets/hooks';

function MyComponent() {
	const screen = useScreen();

	return (
		<div>
			<p>Current breakpoint: {screen.key}</p>
			<p>
				Screen size: {screen.width} x {screen.height}
			</p>
			{screen.isMobile && <p>You're on mobile!</p>}
			{screen.isTablet && <p>You're on tablet!</p>}
			{screen.isDesktop && <p>You're on desktop!</p>}
		</div>
	);
}
```

#### Custom Breakpoints

```typescript
import * as React from 'react';
import { useScreen } from '@beyond-js/react-18-widgets/hooks';

function MyComponent() {
	const screen = useScreen({
		sm: 600,
		md: 900,
		lg: 1200
	});

	return (
		<div>
			{screen.sm && <p>Small screen or larger</p>}
			{screen.md && <p>Medium screen or larger</p>}
			{screen.lg && <p>Large screen or larger</p>}
		</div>
	);
}
```

#### Responsive Styling

```typescript
import * as React from 'react';
import { useScreen } from '@beyond-js/react-18-widgets/hooks';

function ResponsiveComponent() {
	const screen = useScreen();

	const getColumnCount = () => {
		if (screen.isMobile) return 1;
		if (screen.isTablet) return 2;
		return 3;
	};

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: `repeat(${getColumnCount()}, 1fr)`,
				gap: '1rem'
			}}
		>
			{/* Grid items */}
		</div>
	);
}
```

## Features

-   **Responsive**: Automatically updates when window size changes
-   **Configurable**: Custom breakpoints can be provided
-   **Semantic Flags**: Includes `isMobile`, `isTablet`, and `isDesktop` for easy device type detection
-   **SSR Safe**: Works in server-side rendering environments
-   **Performance Optimized**: Only re-renders when actual dimensions or breakpoint changes

## Browser Support

The hook works in all modern browsers and includes proper cleanup of event listeners to prevent memory leaks.

## TypeScript Support

The hook is fully typed with TypeScript interfaces:

-   `IKey`: Breakpoint key type
-   `IBreaks`: Breakpoints configuration interface
-   `IScreenState`: Return value interface
