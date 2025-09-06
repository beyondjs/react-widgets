import type { BeyondWidget } from '@beyond-js/widgets/render';
import type { IWidgetStore, WidgetAttributes } from '@beyond-js/widgets/controller';
import * as React from 'react';
import { createRoot, Root, hydrateRoot } from 'react-dom/client';
import { WidgetClientController } from '@beyond-js/widgets/controller';
import Widget from './widget';
import { Wrapper } from './wrapper';
import { PageURI } from '@beyond-js/widgets/routing';

export /*bundle*/ interface IWidgetProps {
	widget: BeyondWidget;
	component: BeyondWidget;
	attributes: WidgetAttributes;
	store: IWidgetStore;
}

export /*bundle*/ interface IPageWidgetProps extends IWidgetProps {
	uri: PageURI;
}

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
		this.#mounted = true;

		if (!this.Widget) {
			return { errors: [`Widget "${this.element}" does not export a Widget class`] };
		}

		props = Object.assign(
			{
				widget: this.widget,
				attributes: this.attributes,
				component: this.widget, // Deprecated, use property .widget instead
				store: this.store
			},
			props ? props : {}
		);

		const holder: HTMLSpanElement = (<any>this.widget).holder;
		const hydrate = !!holder.children.length;

		// Render the widget
		try {
			const wrapper = (this.#wrapper = new Wrapper(this));
			const { styles, widget } = this;
			const { holder } = <any>widget;
			const p = { wrapper, props, styles, holder, hydrate };
			const element = React.createElement(Widget, p);

			if (hydrate) {
				this.#root = hydrateRoot(holder, element);
			} else {
				const root = (this.#root = createRoot(holder));
				root.render(element);
			}
		} catch (exc) {
			console.log(`Error rendering widget "${this.widget.localName}":`);
			console.log(exc.stack);
		}
	}

	unmount() {
		if (!this.#mounted) return;

		this.#mounted = false;
		globalThis.setTimeout(() => this.#root.unmount(), 0);
	}

	refresh() {
		this.#wrapper.changed();
	}
}
