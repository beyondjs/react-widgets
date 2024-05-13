import * as React from 'react';
import { BinderEvents, CallbackFunction, ReactiveModel } from './types';
/***
 * Executes a useEffect hook binging the event defined in all
 * objects passed
	@@ -8,13 +7,18 @@ import * as React from 'react';
 * @param {function} onBinder function to be executed when the event is fired
 * @param {string} events the event to be listened, by default is event change
 */
export /*bundle*/
function useBinder(objects: ReactiveModel[], onBinder: CallbackFunction, events: BinderEvents = 'change'): void {
	const bindEvents: string[] = typeof events === 'string' ? [events] : events;

	React.useEffect(() => {
		const callback = (object: ReactiveModel, method: 'on' | 'off') => {
			if (!object[method]) return;
			bindEvents.forEach(event => object.on(event, onBinder));
		};
		objects.forEach(object => callback(object, 'on'));
		return () => objects.forEach(object => callback(object, 'off'));
	}, []);
}
