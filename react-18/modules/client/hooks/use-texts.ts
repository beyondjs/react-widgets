import * as React from 'react';
import { CurrentTexts } from '@beyond-js/kernel/texts';

export /*bundle*/
function useTexts(specifier: string, key?: string): [boolean, object] {
	const [ready, setReady] = React.useState(false);
	const [texts, setTexts] = React.useState({});

	React.useEffect(() => {
		const modelTexts = new CurrentTexts(specifier);
		const triggerEvent = () => {
			let value = modelTexts.value;
			if (modelTexts.ready && key) {
				if (!value.hasOwnProperty(key)) {
					console.warn(
						`the key specified for texts was not found. Key passed: ${key}, module specifier: ${specifier}`
					);
				}
				//@ts-ignore
				value = modelTexts.value[key];
			}
			setTexts(value);
			setReady(modelTexts.ready);
		};
		modelTexts.on('change', triggerEvent);
		triggerEvent();
		return () => {
			modelTexts.on('change', triggerEvent);
		};
	}, []);
	const isReady = ready && !!texts;
	return [isReady, texts];
}
