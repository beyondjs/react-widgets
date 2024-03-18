import React from 'react';
/***
 * Executes a useEffect hook binging the event defined in all
 * objects passed
	@@ -8,13 +7,18 @@ import * as React from 'react';
 * @param {function} onBinder function to be executed when the event is fired
 * @param {string} event the event to be listened, by default is event change
 */
export /*bundle*/
function useBinder(objects: any[], onBinder: () => void, events: string | string[] = 'change'): void {
	const bindEvents: string[] = typeof events === 'string' ? [events] : events;
	React.useEffect(() => {
		objects.forEach(object => {
			if (!object?.on) return;
			bindEvents.forEach(event => object.on(event, onBinder));
		});

		return () =>
			objects.forEach(object => {
				if (!object?.off) return;
				bindEvents.forEach(event => object.off(event, onBinder));
			});
	}, []);
}
