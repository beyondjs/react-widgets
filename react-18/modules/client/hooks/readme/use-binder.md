# useBinder Hook

The `useBinder` hook is a part of the `@beyond-js/react-18-widgets/hooks` package. It is designed to listen for changes from Reactive Models based on the observer pattern.

## Installation

To use the `useBinder` hook in your project, you need to import it as follows:

```javascript
import {useBinder} from '@beyond-js/react-18-widgets/hooks';
```

## Usage

The `useBinder` hook is used to bind an event to multiple objects. When the specified event is fired on any of the objects, the provided callback function is executed.

Here is the function signature:

```typescript
function useBinder(objects: any[], onBinder: () => void, event: string = 'change'): void
```

### Parameters

- `objects` (Array): An array of objects to which the event will be bound.
- `onBinder` (Function): A callback function that will be executed when the event is fired.
- `event` (String, optional): The event to be listened for. By default, this is the 'change' event.

### Example

```typescript
import * as React from 'react';
import {useBinder} from '@beyond-js/react-18-widgets/hooks';

function MyComponent({store}) {
    const [ready, setReady] = React.useState(store.ready);

    useBinder([store], () => setState(store.ready));

    // rest of the component
}
```

In this example, the `useBinder` hook is used to listen for the 'change' event on two `ReactiveModel` instances. When the 'change' event is fired on either `obj1` or `obj2`, the state of `MyComponent` is updated.

## Error Handling

If an invalid object is passed to `useBinder`, it will throw an error:

```javascript
object is not valid in useBinder ${object}
```

## Cleanup

The `useBinder` hook automatically unbinds the event from all objects when the component unmounts, preventing potential memory leaks.

## Note

The `useBinder` hook is designed to be used with Reactive Models that follow the observer pattern and have `on` and `off` methods for event handling. Ensure that the objects passed to `useBinder` meet these criteria.

To create ReactiveModels, you can leverage the power of the "@beyond-js/reactive" library. This library provides a robust and efficient way to create and manage ReactiveModels, making it easier to build dynamic and responsive applications. 

You can find more information and installation instructions for the "@beyond-js/reactive" library on its [NPM page](https://www.npmjs.com/package/@beyond-js/reactive).

