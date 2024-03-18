import * as React from 'react';
import {renderToString} from 'react-dom/server';
import {WidgetServerController, IWidgetRendered} from '@beyond-js/widgets/controller';
import Widget from './widget';

export /*bundle*/
abstract class ReactWidgetController extends WidgetServerController {
    render(props: Record<string, any>): IWidgetRendered {
        if (!this.Widget) {
            return {errors: [`Widget "${this.element}" does not export a Widget class`]};
        }

        try {
            const p = {Widget: this.Widget, styles: this.styles, props};
            const element = React.createElement(Widget, p);
            const html = renderToString(element);
            return {html};
        } catch (exc) {
            console.error(exc.stack);
            return {errors: [exc.message]};
        }
    }
}
