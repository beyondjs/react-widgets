import * as React from 'react';
import { IBinderEvents, ICallbackFunction, IReactiveModel } from './types';
/***
 * Executes a useEffect hook binging the event defined in all
 * objects passed
	@@ -8,13 +7,18 @@ import * as React from 'react';
 * @param {function} onBinder function to be executed when the event is fired
 * @param {string} events the event to be listened, by default is event change
 */
export /*bundle*/
function useBinder(objects: IReactiveModel[], onBinder: ICallbackFunction, events: IBinderEvents = 'change'): void {
	const bindEvents: string[] = typeof events === 'string' ? [events] : events;

	React.useEffect(() => {
		const callback = (object: IReactiveModel, method: 'on' | 'off') => {
			if (!object[method]) return;
			bindEvents.forEach(event => {
				object[method](event, onBinder);
			});
		};
		objects.forEach(object => callback(object, 'on'));
		return () => objects.forEach(object => callback(object, 'off'));
	}, []);
}
