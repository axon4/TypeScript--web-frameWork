import axios, { AxiosResponse } from 'axios';

interface UserData {
	id?: number;
	name?: string;
	age?: number;
};

type CallBack = () => void;

class User {
	constructor(private data: UserData) {};

	events: {[key: string]: CallBack[]} = {};

	get(userDatum: string): (number | string) {
		return this.data[userDatum];
	};

	set(userDatum: UserData): void {
		Object.assign(this.data, userDatum);
	};

	on(event: string, callback: CallBack): void {
		const handlers = this.events[event] || [];
		handlers.push(callback);
		this.events[event] = handlers;
	};

	trigger(event: string): void {
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

export default User;