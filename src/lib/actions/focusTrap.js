import { createFocusTrap } from 'focus-trap';

export function focusTrap(node, options = {}) {
	let trap = createFocusTrap(node, {
		escapeDeactivates: true,
		clickOutsideDeactivates: true,
		returnFocusOnDeactivate: true,
		...options
	});

	// activate when mounted
	trap.activate();

	return {
		destroy() {
			trap.deactivate();
		}
	};
}
