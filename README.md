# React Widgets

Framework controllers connecting React to Beyond Widgets, with separate packages for React 17, 18 and 19.

Read [architecture and lifecycle](docs/architecture.md) and [hooks](docs/hooks.md). Choose [React 17](react-17/README.md), [React 18](react-18/README.md) or [React 19](react-19/README.md) for package-specific entry points. Public modules are `/base`, `/page` and `/hooks` under the chosen version-specific package name; this repository has no umbrella root package manifest.

The adapters implement per-widget rendering, styles and refresh hooks. They depend on Beyond compilation and the core Widgets/runtime contracts. They do not themselves provide a development server or full-document SSR. React 19 is authored for Packages, supplied by the Beyond toolchain and exercised in a browser by the command line's web acceptance; React 17 and 18 keep the Engine authoring, and their teardown and subscription gaps are documented in the architecture guide.

[Testing](docs/testing.md) says which versions a validation exercises and where; this repository has no tests.
