# @beyond-js/react-18-widgets

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
