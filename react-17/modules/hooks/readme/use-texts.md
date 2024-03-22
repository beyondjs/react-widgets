# useTexts Hook

The `useTexts` hook is a part of the `@beyond-js/react-18-widgets/hooks` package. It is designed to load the text bundles of any module, following the npm standard for module specifiers.

## Installation

To use the `useTexts` hook in your project, you need to import it as follows:

```javascript
import {useTexts} from '@beyond-js/react-18-widgets/hooks';
```

## Usage

The `useTexts` hook is used to load the text bundles of a specific module. The module specifier should follow the npm standard. For example, if your package is "foo" and your module is "var", you need to pass "foo/var" as the specifier.

Here is the function signature:

```typescript
function useTexts(specifier: string, key?: string): [boolean, object]
```

### Parameters

- `specifier` (String): The specifier of the module to load the text bundles from.
- `key` (String, optional): A specific key in the text bundle to load. If not provided, the entire text bundle is loaded.

### Example

```typescript
import * as React from 'react';
import {useTexts} from '@beyond-js/react-18-widgets/hooks';
import { module } from 'beyond_context';


function MyComponent() {
    const [textsReady, texts] = useTexts(module.specifier);

    // rest of the component
}
```

In this example, the `useTexts` hook is used to load the text bundle of the current module. The readiness of the text bundle and the text bundle itself are stored in `textsReady` and `texts` respectively.

## Error Handling

If a specific key is provided and it is not found in the text bundle, a warning is logged to the console:

```javascript
the key specified for texts was not found. Key passed: ${key}, module specifier: ${specifier}
```

## Note

The `useTexts` hook is designed to be used with modules that have text bundles. Ensure that the module passed to `useTexts` has a valid text bundle. The readiness of the text bundle and the text bundle itself are returned by the hook.