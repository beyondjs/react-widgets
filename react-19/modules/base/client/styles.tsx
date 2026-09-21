import * as React from 'react';
import type { StylesManager } from '@beyond-js/widgets/render';

interface Props {
	styles: StylesManager;
	widget: HTMLElement;
}

/**
 * The stylesheet links of a widget, rendered beside its view inside its root. A sheet that loads is
 * reported as loaded; a sheet that fails is reported as failed, so the previous version stays adopted.
 */
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
		const failed = () => (styles.onerror ? styles.onerror(url) : styles.onloaded(url));
		return <link key={url} href={url} rel="stylesheet" onLoad={loaded} onError={failed} />;
	});
	return <>{head}</>;
}
