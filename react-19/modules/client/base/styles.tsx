import * as React from 'react';
import type { StylesManager } from '@beyond-js/widgets/render';

interface Props {
	styles: StylesManager;
	widget: HTMLElement;
}

export default function ({ styles }: Props) {
	const rs = React.useState(0);

	// Listen for .css bundle changes
	React.useEffect(() => {
		const refresh = () => rs[1](prev => prev + 1);
		styles.on('change', refresh);
		return () => styles.off('change', refresh) && void 0;
	}, []);

	const head: React.ReactElement[] = [...styles.resources].map(url => {
		const loaded = () => styles.onloaded(url);
		return <link key={url} href={url} rel="stylesheet" onLoad={loaded} onError={loaded} />;
	});
	return <>{head}</>;
}
