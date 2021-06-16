import axios, { AxiosResponse } from 'axios';
import User, { UserData } from './User';
import EventHandler from './EventHandler';

class Collection<T, K> {
	constructor(
		public rootURL: string,
		public deSerialise: (JSON: K) => T
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
					this.models.push(this.deSerialise(value));
				});

				this.trigger('change');
			});
	};
};

export default Collection;