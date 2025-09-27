export type IKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface IBreaks {
	xs: number;
	sm: number;
	md: number;
	lg: number;
	xl: number;
	xxl: number;
}

export interface IScreenState {
	width: number;
	height: number;
	key: IKey;
	xs: boolean;
	sm: boolean;
	md: boolean;
	lg: boolean;
	xl: boolean;
	xxl: boolean;
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
}

export type IBinderEvents = string | string[];

export type ICallbackFunction = () => void;

export type IEventHandler = (...args: any[]) => void;

export interface IReactiveModel {
	on(event: string, handler: ICallbackFunction): void;
	off(event: string, handler: ICallbackFunction): void;
}

export interface IReactiveStore {
	on(event: string, handler: IEventHandler): void;
	off(event: string, handler: IEventHandler): void;
}
