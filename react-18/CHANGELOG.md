# @beyond-js/react-18-widgets

### v1.1.7

### Features

-   **useScreen Hook (feat)**: Added a new `useScreen` hook that provides responsive screen size information with
    configurable breakpoints. The hook returns current dimensions, breakpoint key, boolean flags for each breakpoint,
    and semantic device type flags (isMobile, isTablet, isDesktop).

### Updates

-   **Type System Enhancement (update)**: Centralized all types and interfaces in a dedicated `types.ts` file with
    consistent "I" prefix naming convention for better type organization and maintainability.
-   **Documentation Improvements (update)**: Added comprehensive README files for all custom hooks including `useScreen`
    and `useStore` with detailed usage examples, TypeScript support, and integration guides.
-   **Main README Enhancement (update)**: Completely restructured the main README.md with better organization, hook
    categories, quick examples, and comprehensive documentation links.

### Fixed

-   **useBinder Type Fixes (fix)**: Fixed missing type definitions for `useBinder` hook by adding proper TypeScript
    interfaces (`IBinderEvents`, `ICallbackFunction`, `IReactiveModel`) to the centralized types file.

### v1.1.6

### Features

-   **useStore Hook (feat)**: Added a new `useStore` hook that provides a generic React hook for subscribing to reactive
    stores. The hook supports subscribing to multiple events and automatically handles cleanup when the component
    unmounts.

### Updates

-   **Dependencies Updated**: Updated package dependencies to ensure compatibility and security improvements.

### v1.1.5

### Fixed

-   Resolved a race condition issue by deferring the component unmount operation using `setTimeout`. This change ensures
    that the unmount process occurs after the current React render cycle has completed, addressing warnings related to
    synchronous unmount attempts during rendering.

## v1.1.2 - 2024/4/10

### Fixes

-   **Hook Typing (fix)**: Improved the typing for the `useTexts` hook to ensure better type safety and developer
    experience.

## v1.1.1 - 2024/2/29

### Fixes

-   **Packages versions updated**: compatibility with the latest # @beyond-js/widgets package

## v1.1.0 - 2024/2/28

### Fixes

-   **Method and Property Typing Improvement (fix)**: Enhanced the typing of methods and properties for better type
    safety and developer experience.

### Features

-   **URL Query String Change Event (feat)**: Added the `onQueryStringChange` event integration to listen for changes in
    URL modifications, improving the interactivity and responsiveness of widgets.
