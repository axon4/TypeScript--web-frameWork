import User, { UserData } from './User';
import EventHandler from './EventHandler';
import axios, { AxiosResponse } from 'axios';

class Collection<T, K> {
	constructor(
		public rootURL: string,
		public deserialise: (json: K) => T
	) {};

	models: T[] = [];
	events: EventHandler = new EventHandler();

	get on() {
		return this.events.on;
	};

	get trigger() {
		return this.events.trigger;
	};

	fetch(): void {
		axios.get(this.rootURL)
			.then((response: AxiosResponse) => {
				response.data.forEach((value: K) => {
					this.models.push(this.deserialise(value));
				});

				this.trigger('change');
			});
	};
};

export default Collection;