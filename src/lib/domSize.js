// domSizeStore.js
import { readable } from 'svelte/store';

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * createDOMSizeStore(options)
 * - target: a function that returns the initial element to observe (default: document.documentElement)
 * - box: 'content-box' | 'border-box' (ResizeObserver option)
 * - fallbackToWindowResize: boolean (listen to window resize if ResizeObserver unavailable)
 */
export function createDOMSizeStore({
	target = () => (isBrowser ? document.documentElement : null),
	box = 'content-box',
	fallbackToWindowResize = true,
	debounceMs = 50
} = {}) {
	if (!isBrowser) {
		// On server, return a read-only store with zeros
		return readable({ width: 0, height: 0, scrollWidth: 0, scrollHeight: 0 }, () => {});
	}

	let ro = null;
	let observedEl = null;
	let timeout = null;

	// Helper to normalize size object
	const snapshot = (el) => {
		if (!el) return { width: 0, height: 0, scrollWidth: 0, scrollHeight: 0 };
		const rect = el.getBoundingClientRect();
		return {
			width: Math.round(rect.width),
			height: Math.round(rect.height),
			// include scroll sizes in case user cares about content size (useful for documentElement/body)
			scrollWidth: Math.round(el.scrollWidth ?? 0),
			scrollHeight: Math.round(el.scrollHeight ?? 0)
		};
	};

	// Debounced notifier that calls set()
	let setStore; // assigned inside readable's start
	function notify(el) {
		if (debounceMs <= 0) {
			setStore(snapshot(el));
			return;
		}
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			timeout = null;
			setStore(snapshot(el));
		}, debounceMs);
	}

	// ResizeObserver callback
	function handleRoEntries(entries) {
		// We only observe one element at a time; pick first entry
		// but call notify with observedEl to capture scroll sizes too
		notify(observedEl);
	}

	// Window resize fallback
	function handleWindowResize() {
		notify(observedEl);
	}

	function observeElement(el) {
		if (observedEl === el) return;
		// disconnect previous
		if (ro && observedEl) ro.unobserve(observedEl);
		observedEl = el;
		if (!observedEl) return;
		// immediate update
		notify(observedEl);

		if ('ResizeObserver' in window) {
			if (!ro) {
				ro = new ResizeObserver(handleRoEntries);
			}
			try {
				ro.observe(observedEl, { box });
			} catch (e) {
				// some browsers may not accept box option; fallback
				ro.observe(observedEl);
			}
		} else if (fallbackToWindowResize) {
			window.addEventListener('resize', handleWindowResize, { passive: true });
		}
	}

	function disconnect() {
		if (ro && observedEl) {
			try {
				ro.unobserve(observedEl);
			} catch (e) {}
		}
		if (ro) {
			try {
				ro.disconnect();
			} catch (e) {}
			ro = null;
		}
		observedEl = null;
		if (fallbackToWindowResize) window.removeEventListener('resize', handleWindowResize);
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
	}

	// The readable store start function
	const store = readable(snapshot(target()), (set) => {
		// save setter for notify
		setStore = set;

		// start observing default target
		const initial = target();
		if (initial) observeElement(initial);

		// return stop function (called when last subscriber unsubscribes)
		return () => {
			disconnect();
			setStore = () => {};
		};
	});

	// We need to add methods on top of the readable store.
	// The object returned must implement subscribe plus helpers.
	return {
		subscribe: store.subscribe,
		/**
		 * Observe an element. Accepts:
		 *  - DOM element (HTMLElement or document.documentElement)
		 *  - a function that returns the element (useful when element isn't available immediately)
		 */
		observe(elOrGetter) {
			if (typeof elOrGetter === 'function') {
				// try to get element now, or schedule microtask to try later
				const el = elOrGetter();
				if (el) observeElement(el);
				else {
					// attempt again in next microtask (useful if called from onMount before element is attached)
					queueMicrotask(() => {
						const el2 = elOrGetter();
						if (el2) observeElement(el2);
					});
				}
			} else {
				observeElement(elOrGetter);
			}
		},
		disconnect
	};
}

// Default export: a singleton store bound to document.documentElement
export const domSize = createDOMSizeStore();
