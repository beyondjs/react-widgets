const reactEvents = ['onAbort', 'onAnimationCancel', 'onAnimationEnd', 'onAnimationIteration', 'onAuxClick', 'onBlur',
    'onChange', 'onClick', 'onClose', 'onContextMenu', 'onDoubleClick', 'onError', 'onFocus', 'onGotPointerCapture',
    'onInput', 'onKeyDown', 'onKeyPress', 'onKeyUp', 'onLoad', 'onLoadEnd', 'onLoadStart', 'onLostPointerCapture',
    'onMouseDown', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp', 'onPointerCancel', 'onPointerDown',
    'onPointerEnter', 'onPointerLeave', 'onPointerMove', 'onPointerOut', 'onPointerOver', 'onPointerUp', 'onReset',
    'onResize', 'onScroll', 'onSelect', 'onSelectionChange', 'onSelectStart', 'onSubmit', 'onTouchCancel',
    'onTouchMove', 'onTouchStart', 'onTouchEnd', 'onTransitionCancel', 'onTransitionEnd', 'onDrag', 'onDragEnd',
    'onDragEnter', 'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onFocusOut'];

const divergentNativeEvents: any = {onDoubleClick: 'dblclick'};

const mimickedReactEvents: any = {
    onInput: 'onChange',
    onFocusOut: 'onBlur',
    onSelectionChange: 'onSelect'
};
const proxyHandlers = {
    get: function (target: any, prop: any, _receiver: any) {
        if (prop === "currentTarget") {
            return target._reactCurrentTarget;
        }
        const value = target[prop];
        return (value instanceof Function) ? value.bind(target) : value;
    }
};

export function retargetEvents(shadowRoot: any) {
    const removeEventListeners: any[] = [];

    reactEvents.forEach(function (reactEventName) {
        const nativeEventName = getNativeEventName(reactEventName);

        function retargetEvent(event: any) {
            const path = event.path || (event.composedPath && event.composedPath()) ||
                composedPath(event.target);
            const proxy = new Proxy(event, proxyHandlers);

            for (let i = 0; i < path.length; i++) {
                const el = path[i];
                let props = null;
                const reactComponent = findReactComponent(el);
                const eventHandlers = findReactEventHandlers(el);
                event._reactCurrentTarget = el;

                if (!eventHandlers) {
                    props = findReactProps(reactComponent);
                } else {
                    props = eventHandlers;
                }

                if (reactComponent && props) {
                    dispatchEvent(proxy, reactEventName, props);
                }
                if (reactComponent && props && mimickedReactEvents[reactEventName]) {
                    dispatchEvent(proxy, mimickedReactEvents[reactEventName], props);
                }

                if (event.cancelBubble) break;
                if (el === shadowRoot) break;
            }
        }

        shadowRoot.addEventListener(nativeEventName, retargetEvent, false);

        removeEventListeners.push(function () {
            shadowRoot.removeEventListener(nativeEventName, retargetEvent, false);
        })
    });

    return function () {
        removeEventListeners.forEach(function (removeEventListener) {
            removeEventListener();
        });
    };
}

function findReactEventHandlers(item: any) {
    return findReactProperty(item, '__reactEventHandlers');
}

function findReactComponent(item: any) {
    return findReactProperty(item, '_reactInternal');
}

function findReactProperty(item: any, propertyPrefix: any) {
    for (const key in item) {
        if (item.hasOwnProperty(key) && key.indexOf(propertyPrefix) !== -1) {
            return item[key];
        }
    }
}

function findReactProps(component: any) {
    if (!component) return undefined;
    if (component.memoizedProps) return component.memoizedProps; // React 16 Fiber
    if (component._currentElement && component._currentElement.props) return component._currentElement.props; // React <=15
}

function dispatchEvent(event: any, eventType: any, componentProps: any) {
    event.persist = function () {
        event.isPersistent = function () {
            return true
        };
    };

    if (componentProps[eventType]) {
        componentProps[eventType](event);
    }
}

function getNativeEventName(reactEventName: any) {
    if (divergentNativeEvents[reactEventName]) {
        return divergentNativeEvents[reactEventName];
    }
    return reactEventName.replace(/^on/, '').toLowerCase();
}

function composedPath(el: any) {
    const path = [];
    while (el) {
        path.push(el);
        if (el.tagName === 'HTML') {
            path.push(document);
            path.push(window);
            return path;
        }
        el = el.parentElement;
    }
}
