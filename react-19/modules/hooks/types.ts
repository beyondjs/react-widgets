export type CallbackFunction = (...args: any[]) => void;
export type ReactiveModel = {
	on: (event: string, callback: CallbackFunction) => void;
	off: (event: string, callback: CallbackFunction) => void;
};
export type BinderEvents = string | string[];
