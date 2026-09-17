# React Widgets architecture

React Widgets supplies framework controllers for Beyond custom-element widgets. Core Widgets owns registration, holder/shadow-root creation, attributes, stores, routing and style resources; this adapter owns React mount, refresh and unmount. Compiler, loader, HMR transport and full-document SSR are separate components.

## Packages and public modules

| Directory/package | Manifest dependencies | Web/SSR bundle ports |
| --- | --- | --- |
| react-17 / @beyond-js/react-17-widgets 1.1.1 | React/react-dom ^17.0.2; Widgets ~1.1.0; Kernel ~0.1.11 | 9110 / 9111 |
| react-18 / @beyond-js/react-18-widgets 1.1.7 | React/react-dom ^18.2.0; Widgets ~1.1.1; Kernel ~0.1.14 | 9112 / 9113 |
| react-19 / @beyond-js/react-19-widgets 1.0.0 | React/react-dom ^19.1.1; Widgets ~1.1.1; Kernel ~0.1.14 | 9212 / 9213 |

These are checkout declarations, not npm publication or compatibility guarantees. There is no root umbrella package.json: select a version directory and its beyond.json/package.json. Do not install a guessed umbrella package to select the adapter.

Each package exposes `/base` (ReactWidgetController), `/page` (PageReactWidgetController), and `/hooks`. Client base/page target web/android/ios; server base/page target ssr using the same public import. Hooks target all four platforms. Internal wrapper, widget and styles files are not separate public Beyond modules. React 18/19 client base also marks IWidgetProps and IPageWidgetProps as bundle exports.

React 19 client and server page files import **react-18-widgets/base**, absent from its dependency declarations. React 19 still declares React 18 type packages. Its page inheritance is therefore not isolated to its own base; repair and verify this before claiming React 19 integration.

## Authoring and inherited contract

```ts
import { PageReactWidgetController } from '@beyond-js/react-18-widgets/page';
import { PageView } from './view';

export /*bundle*/ class Controller extends PageReactWidgetController {
    get Widget() { return PageView; }
}
```

PageView is an application-owned internal component. The application still supplies widget metadata and the compiler's controller/registration contract. Client controllers inherit WidgetClientController from `@beyond-js/widgets/controller`; server controllers inherit WidgetServerController. Core must supply widget, attributes, store, styles and initialization. Server render expects the application/framework component through Widget and style URLs through styles.

Client mount defaults to widget, attributes, store and deprecated component (an alias of widget); explicit props overwrite defaults. Models are passed by reference and require subscriptions for reactive changes. On all versions, page initialise obtains a PageURI from routing manager.pages, binds onQueryStringChange to its change event and calls base initialise. Mount passes uri. The default query-string callback is empty. The bound callback is not retained or removed, so disposal/reinitialization can retain page subscriptions. Server pages do not initialize routing or inject request context: React 18/19 declare an unassigned uri getter; React 17 adds no behavior.

## React 17 lifecycle

React 17 chooses ReactDOM.hydrate or ReactDOM.render from whether holder.children is nonempty. It has no mounted guard. Its internal wrapper uses the current Widget getter, waits for styles before fresh rendering and bypasses that gate for hydration; refresh triggers a React state update. Styles subscribes to core changes and cleans up its own subscription; link load and error both mark the URL loaded.

Unmount calls ReactDOM.unmountComponentAtNode on widget.shadowRoot, although mount uses widget.holder. These are different targets in the core holder architecture and must be reconciled before assuming disposal works. Initialise installs retargetEvents only for the exact localName `main-layout`. That helper registers many native event handlers on the shadow root, reads private React instance/handler fields, proxies currentTarget, mimics change/blur/select and follows the composed path. It returns an unsubscribe function, but the controller discards it. Reinitialization can duplicate handlers and there is no adapter cleanup for them. This legacy implementation is version-sensitive and is not a contract for React 18/19.

## React 18 and React 19 rendering

The two base implementations follow the same flow:

1. `mount(props?)` sets a mounted flag before validating Widget. Missing Widget returns an errors array but leaves the flag set.
2. Existing element children in the holder select `hydrateRoot`; an empty holder selects `createRoot` and `root.render`. This is a DOM heuristic, not proof of matching server output.
3. An internal Wrapper reads the controller's current Widget getter. The React wrapper renders stylesheet links first and waits for `styles.ready` before including the component on a fresh mount. Hydration includes the component immediately.
4. `refresh()` calls Wrapper.changed, which the rendered wrapper replaces with a React state update. It rereads Widget. Component identity and React reconciliation determine state survival; this is not a complete React Fast Refresh implementation or a universal state-preservation guarantee.
5. `unmount()` clears mounted and schedules root.unmount with a zero-delay timer.

The style component subscribes to StylesManager change in an effect and unregisters on cleanup. Link load **and error** both call `styles.onloaded(url)`, allowing readiness after a failed stylesheet request; readiness does not prove styles loaded successfully. The wrapper clears holder display during rendering even while component insertion waits for styles.

Mount catches/logs synchronous rendering exceptions without returning structured errors. Asynchronous React errors are outside that catch. Refresh before wrapper creation can throw. Missing/failed root creation leaves delayed unmount unsafe; a rapid remount before the timer runs can cause the timer to access the newly assigned root. These lifecycle limitations require explicit verification before promising reconnect/dispose safety.

### React hooks

The hooks public module marks useBinder, useStore and useTexts as bundle exports. React 18 additionally contains a source-exported useScreen, but it lacks the bundle marker; do not infer a stable public Beyond export merely from the TypeScript export or its readme. Internal hook types likewise do not automatically become bundle exports.

| Hook | Behavior and limits |
| --- | --- |
| `useBinder(objects, onBinder, events = 'change')` | Subscribes on mount and unregisters on cleanup. Empty effect dependencies retain initial objects/events/callback, so later argument changes do not rebind. |
| `useStore(store, events = ['change'])` | Returns the same store and increments local state on each event. Validates that events is an array; effect dependencies are store/events. React 18 also accepts onListen, whose changing identity is not an effect dependency. React 19 lacks that argument. |
| `useTexts(specifier, key?)` | Creates Kernel CurrentTexts, returns readiness/texts and updates on change. Empty dependencies retain the initial specifier/key. Cleanup calls on again instead of off and does not destroy the model, so subscription lifetime is defective. |
| React 18 source `useScreen(breaks?)` | Tracks window dimensions and breakpoint flags, defaults to zero without a window and removes resize listeners on cleanup. It reconstructs its breakpoint object each render; its effect depends on that object. It has no serialized server/client initial-state contract. |

Stable event-array identities avoid unnecessary useStore unsubscribe/resubscribe cycles. Hooks do not independently establish server data loading, compiler invalidation or HMR acceptance.

## Server rendering and hydration

All three server base controllers wrap Widget and stylesheet links in a React tree and call react-dom/server renderToString synchronously. They return `{html}` or `{errors}`; missing Widget is a structured error and caught rendering failures log their stack. Render takes caller-supplied props, not automatically the client's widget/attributes/store defaults. Server wrappers expect an array of stylesheet URLs, whereas client wrappers consume a StylesManager object.

This is per-widget rendering, not a server, streaming renderer, request-scoped loader, nested-widget traversal or state serializer. The orchestrator must select ssr modules, initialize the controller, provide context/store props and assemble the document. On the client, element children only select a hydration API; they do not validate matching framework versions, props, markup, styles or component identity. Verify initial state and CSS timing across the server/client boundary.

## Build and verification

Each version's beyond.json selects its package.json, which defines web and ssr distributions. Modules are TS bundles with ES2017 target, ES2020 modules, react-jsx, Node module resolution and noImplicitAny. A Beyond compiler resolves public module composition and platform variants; running Node directly against these TypeScript directories is not the package loading contract. There are no package npm scripts, dedicated executable test suite or checked-in publishing workflow. Hook examples are documentation, not executed integration evidence.

The repository devcontainer uses Node 18 and Beyond 1.2.0. Per-version containers use Ubuntu focal/Node 18 installation instructions and postCreate npm install. These legacy configurations do not establish compatibility with a newer compiler/runtime. Select the version directory, resolve its declared dependencies and configure a consuming Beyond application/compiler explicitly; no universal dev-server command is supplied here.

Verification needs separate cases for each version: mount, error and CSS failure, routing, script/style refresh, state survival, holder hydration, detach/remount, subscriber disposal, React 17 retargeting and React 18/19 delayed unmount. React 19 must also resolve its erroneous cross-version page dependency and type alignment. Preserve the familiar Controller → Wrapper → Widget/Styles structure while repairing those boundaries.

## Source references

- [React 17 client controller](../react-17/modules/client/base/controller.ts), [event retargeting](../react-17/modules/client/base/retarget-events.ts), [server controller](../react-17/modules/ssr/base/controller.ts).
- [React 18 client controller](../react-18/modules/client/base/controller.ts), [widget wrapper](../react-18/modules/client/base/widget.tsx), [styles](../react-18/modules/client/base/styles.tsx), [page](../react-18/modules/client/page/page.ts), [server controller](../react-18/modules/ssr/base/controller.ts).
- [React 19 page](../react-19/modules/client/page/page.ts), [server page](../react-19/modules/ssr/page/page.ts), [manifest](../react-19/package.json).
- [Hooks reference](hooks.md) covers supported exports, arguments, subscription lifetime and source links.
