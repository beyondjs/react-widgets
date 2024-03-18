import * as React from 'react';
import Styles from './styles';

export default function ({Widget, props, styles}: any) {
    const elements: React.ReactElement[] = [];
    elements.push(<Styles key="styles" styles={styles}/>);

    const widget = <Widget key="widget" {...props}/>;
    elements.push(widget);

    return (<>{elements}</>);
}
