import 'tippy.js/dist/tippy.css';

let tippyFn = null;
let createSingletonFn = null;
let singleton = null;
const instances = [];

const normalize = (x) => (Array.isArray(x) ? x : [x]);

export function tooltip(node, options = {}) {
	if (typeof window === 'undefined') {
		return { update() {}, destroy() {} };
	}

	let created = null;
	let aborted = false;

	(async () => {
		if (!tippyFn) {
			const mod = await import('tippy.js');
			tippyFn = mod.default ?? mod;
			createSingletonFn = mod.createSingleton ?? (tippyFn && tippyFn.createSingleton);
			if (!tippyFn) {
				console.error('[tooltip] failed to import tippy.js');
				return;
			}
		}

		if (aborted) return;

		created = tippyFn(node, {
			content: options.content ?? '',
			animation: options.animation ?? 'shift-away',
			duration: options.duration ?? [200, 150],
			trigger: options.trigger ?? 'mouseenter focus',
			...options
		});

		const createdArr = normalize(created);
		instances.push(...createdArr);

		if (!singleton && createSingletonFn) {
			singleton = createSingletonFn(instances, {
				moveTransition: 'transform 100ms ease-in-out'
			});
		} else if (singleton && typeof singleton.setInstances === 'function') {
			singleton.setInstances(instances);
		}
	})();

	return {
		update(newOptions) {
			options = newOptions;
			if (!created) return;
			normalize(created).forEach((inst) => inst.setProps(newOptions));
		},

		destroy() {
			aborted = true;
			if (!created) return;

			normalize(created).forEach((inst) => {
				const idx = instances.indexOf(inst);
				if (idx !== -1) instances.splice(idx, 1);
				try {
					inst.destroy();
				} catch (e) {}
			});

			if (singleton && typeof singleton.setInstances === 'function') {
				if (instances.length === 0) {
					try {
						singleton.destroy();
					} catch (e) {}
					singleton = null;
				} else {
					singleton.setInstances(instances);
				}
			}
		}
	};
}
