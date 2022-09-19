import * as React from 'react';

export default function ({styles}: { styles: string[] }) {
    const head: React.ReactElement[] = [];
    styles.forEach(href => head.push(<link key={href} href={href} rel='stylesheet'/>));
    return (<>{head}</>);
}
