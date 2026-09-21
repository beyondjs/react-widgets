# @beyond-js/react-19-widgets

React 19 controllers for Beyond Widgets. The [package manifest](package.json) declares React 19 with its types, the Widgets core, the module directory and the `ts` bundler on the development runtime; [beyond.json](beyond.json) selects this package. It is compiled by Packages and supplied to every workspace by the Beyond toolchain; these declarations do not establish npm availability.

Read the repository-local [architecture](../docs/architecture.md) and [hooks reference](../docs/hooks.md). Import ReactWidgetController from `@beyond-js/react-19-widgets/base`, PageReactWidgetController from `/page`, and the documented hooks from `/hooks`. Platform selection chooses the client or server implementation of base/page; internal source filenames are not additional public modules.

Supply a Widget component getter in the controller. The consuming app must provide registration metadata, matching React/react-dom versions, core Widgets/Kernel contracts and a compiler/loader that resolves these Beyond modules. There is no npm build/test script or standalone app in this directory.

`base` and `page` are one module each, with a client and a server entry selected by platform in their `module.json`; `hooks` names one entry. The command line's web acceptance mounts, updates, moves and hydrates a React 19 widget in a real browser.
