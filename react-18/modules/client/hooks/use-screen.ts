import { useState, useEffect } from 'react';
import { IKey, IBreaks, IScreenState } from './types';

const baseBreaks: IBreaks = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	xxl: 1400
};

/**
 * useScreen
 *
 * Hook to get current screen size info based on breakpoints.
 *
 * - Returns the current breakpoint key (`xs`, `sm`, `md`, `lg`, `xl`, `xxl`)
 * - Returns boolean flags for each breakpoint (xs, sm, md, ...)
 * - Returns semantic flags:
 *    - isMobile = true when width < md
 *    - isTablet = true when width >= md and < lg
 *    - isDesktop = true when width >= lg
 * - Returns current width and height
 *
 * Example:
 * const s = useScreen();
 * if (s.isMobile) console.log("On mobile");
 * if (s.lg) console.log("Large breakpoint active");
 */
export function useScreen(breaks?: Partial<IBreaks>): IScreenState {
	const vals = { ...baseBreaks, ...breaks };

	const getKey = (w: number): IKey => {
		const list = Object.entries(vals) as [IKey, number][];
		const sorted = list.sort(([, a], [, b]) => b - a);
		for (const [k, min] of sorted) {
			if (w >= min) return k;
		}
		return 'xs';
	};

	const hasWin = typeof globalThis !== 'undefined' && !!globalThis.window;

	const [state, setState] = useState<IScreenState>(() => {
		const w = hasWin ? globalThis.innerWidth : 0;
		const h = hasWin ? globalThis.innerHeight : 0;
		const k = getKey(w);
		const flags = makeFlags(k, vals, w);
		return { width: w, height: h, key: k, ...flags };
	});

	useEffect(() => {
		if (!hasWin) return;

		const update = () => {
			const w = globalThis.innerWidth;
			const h = globalThis.innerHeight;
			const k = getKey(w);
			const flags = makeFlags(k, vals, w);

			setState(prev => {
				if (prev.width !== w || prev.height !== h || prev.key !== k) {
					return { width: w, height: h, key: k, ...flags };
				}
				return prev;
			});
		};

		update();
		globalThis.addEventListener('resize', update);

		return () => {
			globalThis.removeEventListener('resize', update);
		};
	}, [hasWin, vals]);

	return state;
}

function makeFlags(k: IKey, vals: IBreaks, w: number) {
	const xs = k === 'xs';
	const sm = k === 'sm';
	const md = k === 'md';
	const lg = k === 'lg';
	const xl = k === 'xl';
	const xxl = k === 'xxl';

	const isMobile = w < vals.md;
	const isTablet = w >= vals.md && w < vals.lg;
	const isDesktop = w >= vals.lg;

	return { xs, sm, md, lg, xl, xxl, isMobile, isTablet, isDesktop };
}
