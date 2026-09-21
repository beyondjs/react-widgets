import type { BeyondWidget } from '@beyond-js/widgets/render';
import type { IWidgetStore, WidgetAttributes } from '@beyond-js/widgets/controller';
import * as React from 'react';
import { createRoot, Root, hydrateRoot } from 'react-dom/client';
import { WidgetClientController } from '@beyond-js/widgets/controller';
import Widget from './widget';
import { Wrapper } from './wrapper';

export /*bundle*/ interface IWidgetProps {
	widget: BeyondWidget;
	component: BeyondWidget;
	attributes: WidgetAttributes;
	store: IWidgetStore;
}

export /*bundle*/ interface IPageWidgetProps extends IWidgetProps {
	uri: unknown;
}

/**
 * The client controller of a widget whose view is a React 19 component.
 *
 * The component receives the widget, its attributes and its store as props. It is rendered with a root
 * of its own in the holder of the element, or hydrated into the markup a server render left there. An
 * update of the module refreshes the mounted view through the wrapper, which re-renders with the current
 * component; unmounting releases the root synchronously, so an element that is removed and inserted mounts
 * a new root in a holder that is empty.
 */
export /*bundle*/
abstract class ReactWidgetController extends WidgetClientController {
	#wrapper: Wrapper;
	#root: Root;

	#mounted = false;
	get mounted() {
		return this.#mounted;
	}

	// This property must be overwritten
	get Widget(): React.JSXElementConstructor<any> {
		return null;
	}

	mount(props?: Record<string, any>) {
		if (this.#mounted) return;

		if (!this.Widget) {
			console.error(`Widget "${this.element}" does not export a Widget class`);
			return;
		}
		this.#mounted = true;

		props = Object.assign(
			{
				widget: this.widget,
				attributes: this.attributes,
				component: this.widget, // Deprecated, use property .widget instead
				store: this.store
			},
			props ? props : {}
		);

		// Render the widget
		try {
			const wrapper = (this.#wrapper = new Wrapper(this));
			const { styles, widget } = this;
			const { holder } = <any>widget;
			const hydrate = !!holder.children.length;
			const p = { wrapper, props, styles, holder, hydrate };
			const element = React.createElement(Widget, p);

			if (hydrate) {
				this.#root = hydrateRoot(holder, element);
			} else {
				const root = (this.#root = createRoot(holder));
				root.render(element);
			}
		} catch (exc) {
			this.#mounted = false;
			console.log(`Error rendering widget "${this.widget.localName}":`);
			console.log(exc.stack);
		}
	}

	unmount() {
		if (!this.#mounted) return;
		this.#mounted = false;

		const root = this.#root;
		this.#root = void 0;
		this.#wrapper = void 0;
		root?.unmount();
	}

	refresh() {
		this.#wrapper ? this.#wrapper.changed() : this.render();
	}
}
