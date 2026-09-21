import * as React from 'react';
import Styles from './styles';

/**
 * The root component of a widget: its stylesheet links and, once the sheets are loaded, its view. The
 * wrapper's `changed` re-renders the view with the current component after an update of the module.
 */
export default function ({ wrapper, props, styles, holder, hydrate }: any) {
	const elements: React.ReactElement[] = [];
	elements.push(<Styles key="styles" styles={styles} widget={props.widget} />);

	const rs = React.useState(0);
	const refresh = () => rs[1](value => value + 1);

	// Listen for .js bundle changes
	wrapper.changed = refresh;

	// Check for styles to be loaded
	const loaded: boolean = (() => {
		!styles.loaded && styles.ready.then(refresh);
		holder.style.display = '';
		return styles.loaded;
	})();

	const { Widget } = wrapper;
	const widget = <Widget key="widget" {...props} />;
	(hydrate || loaded) && elements.push(widget);

	return <>{elements}</>;
}
