import * as React from "react";
import * as ReactDOM from "react-dom";
import {retargetEvents} from "./retarget-events";
import {WidgetClientController} from '@beyond-js/widgets/controller';
import Widget from './widget';
import {Wrapper} from "./wrapper";

export /*bundle*/
abstract class ReactWidgetController extends WidgetClientController {
    #wrapper: Wrapper;

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

            ReactDOM[hydrate ? 'hydrate' : 'render'](element, holder);
        } catch (exc) {
            console.log(`Error rendering widget "${this.widget.localName}":`);
            console.log(exc.stack);
        }
    }

    unmount() {
        ReactDOM.unmountComponentAtNode(this.widget.shadowRoot);
    }

    refresh() {
        this.#wrapper.changed();
    }

    async initialise() {
        this.widget.localName === 'main-layout' && retargetEvents(this.widget.shadowRoot);
        await super.initialise();
    }
}
