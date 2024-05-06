# @beyond-js/react-18-widgets

### v1.1.3 --- pending

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
