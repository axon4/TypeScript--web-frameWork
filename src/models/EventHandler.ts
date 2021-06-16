type CallBack = () => void;

class EventHandler {
	events: {[key: string]: CallBack[]} = {};

	on = (event: string, callBack: CallBack): void => {
		const handlers = this.events[event] || [];

		handlers.push(callBack);

		this.events[event] = handlers;
	};

	trigger = (event: string): void => {
		// debugger;

		const handlers = this.events[event];

		if (!handlers || handlers.length === 0) return;

		handlers.forEach(callBack => {callBack()});
	};
};

export default EventHandler;