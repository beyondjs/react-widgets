import type { URI } from '@beyond-js/kernel/routing';
import type { PageURI } from '@beyond-js/widgets/routing';
import type { IPageWidgetController } from '@beyond-js/widgets/controller';
import { ReactWidgetController } from '@beyond-js/react-17-widgets/base';
import { manager } from '@beyond-js/widgets/routing';

export /*bundle*/
abstract class PageReactWidgetController extends ReactWidgetController implements IPageWidgetController {
	#uri: PageURI;
	get uri() {
		return this.#uri;
	}

	mount() {
		return super.mount({ uri: this.#uri });
	}

	onQueryString(qs: URI['qs']) {
		void qs;
	}

	async initialise() {
		const { widget } = this;
		const uri = manager.pages.obtain({ widget });
		uri.on('change', this.onQueryString.bind(this));
		this.#uri = uri;

		await super.initialise();
	}
}
