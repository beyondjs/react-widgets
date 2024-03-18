import type * as React from 'react';
import type {ReactWidgetController} from "./controller";

export class Wrapper {
    #Widget: ReactWidgetController;
    get Widget(): React.JSXElementConstructor<any> {
        return this.#Widget.Widget;
    }

    // Property changed should be overwritten to get notified about HMR changes
    changed = (): void => void 0;

    constructor(Widget: ReactWidgetController) {
        this.#Widget = Widget;
    }
}
