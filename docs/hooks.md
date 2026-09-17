# React hooks

Import hooks from the selected version-specific `/hooks` public module. They subscribe to event-capable models; they do not load a widget runtime or independently preserve application state during HMR. Hooks manifests include SSR, but useEffect subscriptions do not run during server rendering.


The hooks public module marks useBinder, useStore and useTexts as bundle exports. React 18 additionally contains a source-exported useScreen, but it lacks the bundle marker; do not infer a stable public Beyond export merely from the TypeScript export or its readme. Internal hook types likewise do not automatically become bundle exports.

| Hook | Behavior and limits |
| --- | --- |
| `useBinder(objects, onBinder, events = 'change')` | Subscribes on mount and unregisters on cleanup. Empty effect dependencies retain initial objects/events/callback, so later argument changes do not rebind. |
| `useStore(store, events = ['change'])` | Returns the same store and increments local state on each event. Validates that events is an array; effect dependencies are store/events. React 18 also accepts onListen, whose changing identity is not an effect dependency. React 19 lacks that argument. |
| `useTexts(specifier, key?)` | Creates Kernel CurrentTexts, returns readiness/texts and updates on change. Empty dependencies retain the initial specifier/key. Cleanup calls on again instead of off and does not destroy the model, so subscription lifetime is defective. |
| React 18 source `useScreen(breaks?)` | Tracks window dimensions and breakpoint flags, defaults to zero without a window and removes resize listeners on cleanup. It reconstructs its breakpoint object each render; its effect depends on that object. It has no serialized server/client initial-state contract. |

Stable event-array identities avoid unnecessary useStore unsubscribe/resubscribe cycles. Hooks do not independently establish server data loading, compiler invalidation or HMR acceptance.

## React 17 differences

React 17 exports useBinder and useTexts, not useStore or useScreen. Its useBinder accepts arbitrary objects and skips null/undefined entries with optional chaining; React 18/19 typed variants access object methods directly and require valid objects. All useBinder variants use empty effect dependencies, bind each requested event to the same callback and unbind that callback on cleanup. Do not replace the model/event/callback expecting automatic rebinding.

## Usage

```ts
import { useStore } from '@beyond-js/react-18-widgets/hooks';
const events = ['change']; // Stable module-level identity.

function Counter({ store }) {
    const current = useStore(store, events);
    return <span>{current.count}</span>;
}
```

The supplied store implements on/off and emits change; the hook returns the same object. The example is React 18 source usage inside a compiled TSX module, not a standalone Node entrypoint. React 18's optional onListen receives emitted parameters; retain a stable callback or account for the effect's omitted onListen dependency. Default inline events arrays trigger rebinding after renders.

useTexts returns `[ready, texts]`; before its effect runs, it returns false and an empty object. A key selects one field after model readiness and warns when absent. No fetch is explicitly invoked by the hook. The dependency's CurrentTexts behavior determines loading. Its cleanup bug must be fixed before describing the hook as leak-free.

## Screen source semantics

useScreen accepts partial thresholds for xs/sm/md/lg/xl/xxl. Defaults are 0/576/768/992/1200/1400 pixels. It chooses the greatest matching minimum and returns width, height, key, exact-key boolean flags plus isMobile (width < md), isTablet (md <= width < lg), and isDesktop (width >= lg). It does not validate threshold ordering or provide a debounce. Initial dimensions are read during state construction; effect setup updates once and subscribes to resize. State changes only when width, height or key changes, so changing thresholds alone can leave semantic flags stale when the key is unchanged. Browser initial dimensions can differ from the server's zero dimensions. These source behaviors do not repair its missing Beyond public-export marker.

## Source references

- [React 17 binder](../react-17/modules/hooks/index.ts) and [texts](../react-17/modules/hooks/use-texts.ts).
- [React 18 binder](../react-18/modules/client/hooks/use-binder.ts), [store](../react-18/modules/client/hooks/use-store.ts), [texts](../react-18/modules/client/hooks/use-texts.ts), [screen](../react-18/modules/client/hooks/use-screen.ts) and [internal types](../react-18/modules/client/hooks/types.ts).
- [React 19 binder](../react-19/modules/client/hooks/index.ts), [store](../react-19/modules/client/hooks/use-store.ts), [texts](../react-19/modules/client/hooks/use-texts.ts) and [internal types](../react-19/modules/client/hooks/types.ts).
