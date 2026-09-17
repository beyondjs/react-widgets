# @beyond-js/react-19-widgets

React 19 controllers for Beyond Widgets. The [package manifest](package.json) defines dependencies and web/ssr distributions; [beyond.json](beyond.json) selects this package. These declarations do not establish npm availability or runtime compatibility.

Read the repository-local [architecture](../docs/architecture.md) and [hooks reference](../docs/hooks.md). Import ReactWidgetController from `@beyond-js/react-19-widgets/base`, PageReactWidgetController from `/page`, and the documented hooks from `/hooks`. Platform selection chooses the client or server implementation of base/page; internal source filenames are not additional public modules.

Supply a Widget component getter in the controller. The consuming app must provide registration metadata, matching React/react-dom versions, core Widgets/Kernel contracts and a compiler/loader that resolves these Beyond modules. There is no npm build/test script or standalone app in this directory.

React 19 page implementations currently import React 18 base and retain React 18 type dependencies; resolve these gaps before claiming an independent React 19 path.
