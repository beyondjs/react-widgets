import {ReactWidgetController} from '@beyond-js/react-17-widgets/base';
import {PageURI} from '@beyond-js/widgets/routing';

export /*bundle*/
abstract class PageReactWidgetController extends ReactWidgetController {
    #uri: PageURI;
    get uri() {
        return this.#uri;
    }

    mount() {
        return super.mount({uri: this.#uri});
    }

    async initialise() {
        this.#uri = new PageURI({widget: <any>this.widget});
        await super.initialise();
    }
}
