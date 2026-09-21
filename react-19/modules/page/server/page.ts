import { ReactWidgetController } from '@beyond-js/react-19-widgets/base';
import { PageURI } from '@beyond-js/widgets/routing';

export /*bundle*/
abstract class PageReactWidgetController extends ReactWidgetController {
	#uri: PageURI;
	get uri() {
		return this.#uri;
	}
}
