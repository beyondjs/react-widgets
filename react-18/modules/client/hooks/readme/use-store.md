# useStore Hook

The `useStore` hook is a part of the `@beyond-js/react-18-widgets/hooks` package. It provides a generic way to subscribe
to reactive stores that follow the observer pattern, automatically triggering re-renders when the store emits events.

## Installation

To use the `useStore` hook in your project, you need to import it as follows:

```javascript
import { useStore } from '@beyond-js/react-18-widgets/hooks';
```

## Usage

The `useStore` hook subscribes to a reactive store and returns the store instance. The component will automatically
re-render whenever the store emits any of the subscribed events.

Here is the function signature:

```typescript
function useStore<T extends IReactiveStore>(
	store: T,
	events: string[] = ['change'],
	onListen?: (...args: any[]) => void
): T;
```

### Parameters

-   `store` (T extends IReactiveStore): The reactive store to subscribe to. Must implement `.on(event, handler)` and
    `.off(event, handler)` methods.
-   `events` (string[], optional): Array of event names to subscribe to. Defaults to `['change']`.
-   `onListen` (Function, optional): Callback function that will be executed when any subscribed event is fired.
    Receives any parameters passed by the store events.

### Return Value

Returns the store instance directly, allowing components to read from it.

### Store Interface

The store must implement the `IReactiveStore` interface:

```typescript
interface IReactiveStore {
	on(event: string, handler: (...args: any[]) => void): void;
	off(event: string, handler: (...args: any[]) => void): void;
}
```

### Examples

#### Basic Usage

```typescript
import * as React from 'react';
import { useStore } from '@beyond-js/react-18-widgets/hooks';

function MyComponent({ store }) {
	// Subscribe to 'change' events (default)
	const reactiveStore = useStore(store);

	return (
		<div>
			<p>Store value: {reactiveStore.value}</p>
			<p>Store ready: {reactiveStore.ready ? 'Yes' : 'No'}</p>
		</div>
	);
}
```

#### Custom Events

```typescript
import * as React from 'react';
import { useStore } from '@beyond-js/react-18-widgets/hooks';

function MyComponent({ store }) {
	// Subscribe to multiple events
	const reactiveStore = useStore(store, ['change', 'update', 'refresh']);

	return (
		<div>
			<p>Data: {reactiveStore.data}</p>
			<p>Last updated: {reactiveStore.lastUpdated}</p>
		</div>
	);
}
```

#### With Callback

```typescript
import * as React from 'react';
import { useStore } from '@beyond-js/react-18-widgets/hooks';

function MyComponent({ store }) {
	const [updateCount, setUpdateCount] = React.useState(0);

	const reactiveStore = useStore(store, ['change'], (...args) => {
		setUpdateCount(prev => prev + 1);
		console.log('Store updated!', args);
	});

	return (
		<div>
			<p>Store value: {reactiveStore.value}</p>
			<p>Updates received: {updateCount}</p>
		</div>
	);
}
```

#### Multiple Stores

```typescript
import * as React from 'react';
import { useStore } from '@beyond-js/react-18-widgets/hooks';

function MyComponent({ userStore, settingsStore }) {
	const user = useStore(userStore);
	const settings = useStore(settingsStore, ['change', 'update']);

	return (
		<div>
			<h2>Welcome, {user.name}!</h2>
			<p>Theme: {settings.theme}</p>
			<p>Language: {settings.language}</p>
		</div>
	);
}
```

#### With Event Parameters

```typescript
import * as React from 'react';
import { useStore } from '@beyond-js/react-18-widgets/hooks';

function MyComponent({ store }) {
	const reactiveStore = useStore(store, ['change', 'update'], (eventType, data) => {
		console.log(`Event: ${eventType}`, data);
		// Handle different event types and their data
	});

	return (
		<div>
			<p>Store value: {reactiveStore.value}</p>
		</div>
	);
}
```

## Error Handling

The hook validates the `events` parameter and will throw an error if it's not an array:

```typescript
// This will throw an error
useStore(store, 'change'); // ❌ String instead of array

// This is correct
useStore(store, ['change']); // ✅ Array of strings
```

## Cleanup

The hook automatically unsubscribes from all events when the component unmounts, preventing memory leaks. No manual
cleanup is required.

## Performance Considerations

-   The hook uses a version counter to force re-renders, which is efficient for most use cases
-   Only re-renders when the store emits subscribed events
-   The `onListen` callback is optional and doesn't affect performance if not provided

## Integration with BeyondJS Reactive Models

This hook is designed to work seamlessly with BeyondJS Reactive Models. You can create reactive stores using the
`@beyond-js/reactive` library:

```typescript
import { ReactiveModel } from '@beyond-js/reactive';

class MyStore extends ReactiveModel {
	value = 'initial';

	updateValue(newValue: string) {
		this.value = newValue;
		this.trigger('change', newValue);
	}
}

// Use in component
function MyComponent() {
	const store = useStore(new MyStore());

	return <div>{store.value}</div>;
}
```

## TypeScript Support

The hook is fully typed with TypeScript generics, ensuring type safety when working with your store instances.
