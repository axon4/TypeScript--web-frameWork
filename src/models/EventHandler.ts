type CallBack = () => void;

class EventHandler {
	events: {[key: string]: CallBack[]} = {};

	on = (event: string, callback: CallBack): void => {
		const handlers = this.events[event] || [];
		handlers.push(callback);
		this.events[event] = handlers;
	};

	trigger = (event: string): void => {
		// debugger;
		const handlers = this.events[event];

		if (!handlers || handlers.length === 0) {
			return;
		};

		handlers.forEach(callback => {
			callback();
		});
	};
};

export default EventHandler;