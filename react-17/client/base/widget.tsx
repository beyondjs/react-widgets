import * as React from 'react';
import Styles from './styles';

export default function ({wrapper, props, styles, holder}: any) {
    const elements: React.ReactElement[] = [];
    elements.push(<Styles key="styles" styles={styles} widget={props.widget}/>);

    const rs = React.useState(0);
    const refresh = () => rs[1](rs[0] + 1);

    // Listen for .js bundle changes
    wrapper.changed = refresh;

    // Check for styles to be loaded
    const loaded: boolean = (() => {
        !styles.loaded && styles.ready.then(refresh);
        holder.style.display = '';
        return styles.loaded;
    })();

    const {Widget} = wrapper;
    const widget = <Widget key="widgets" {...props}/>;
    loaded && elements.push(widget);

    return (<>{elements}</>);
}
