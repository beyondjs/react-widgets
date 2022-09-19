import * as React from "react";
import {createRoot, Root, hydrateRoot} from 'react-dom/client';
import {WidgetClientController} from '@beyond-js/widgets/controller';
import Widget from './widget';
import {Wrapper} from "./wrapper";

export /*bundle*/
abstract class ReactWidgetController extends WidgetClientController {
    #wrapper: Wrapper;
    #root: Root;

    // This property must be overwritten
    get Widget(): React.JSXElementConstructor<any> {
        return null;
    }

    mount(props?: Record<string, any>) {
        if (!this.Widget) {
            return {errors: [`Widget "${this.element}" does not export a Widget class`]};
        }

        props = Object.assign({
            widget: this.widget,
            attributes: this.attributes,
            component: this.widget, // Deprecated, use property .widget instead
            store: this.store
        }, props ? props : {});

        const holder: HTMLSpanElement = (<any>this.widget).holder;
        const hydrate = !!holder.children.length;

        // Render the widget
        try {
            const wrapper = this.#wrapper = new Wrapper(this);
            const p = {wrapper, props, styles: this.styles, holder: (<any>this.widget).holder};
            const element = React.createElement(Widget, p);

            if (hydrate) {
                this.#root = hydrateRoot(holder, element);
            } else {
                const root = this.#root = createRoot(holder);
                root.render(element);
            }
        } catch (exc) {
            console.log(`Error rendering widget "${this.widget.localName}":`);
            console.log(exc.stack);
        }
    }

    unmount() {
        this.#root.unmount();
    }

    refresh() {
        this.#wrapper.changed();
    }
}
