import { AxiosPromise, AxiosResponse } from 'axios';

interface ModelAttributes<T> {
	get<K extends keyof T>(key: K): T[K];
	getAll(): T;
	set(data: T): void;
};

interface Sync<T> {
	fetch(id: number): AxiosPromise;
	save(data: T): AxiosPromise;
};

interface Events {
	on(event: string, callback: () => void): void;
	trigger(event: string): void;
};

interface HasID {
	id?: number;
};

class Model<T extends HasID> {
	constructor(
		private attributes: ModelAttributes<T>,
		private events: Events,
		private sync: Sync<T>
	) {};

	get get() {
		return this.attributes.get;
	};

	set(userDatum: T): void {
		this.attributes.set(userDatum);
		this.events.trigger('change');
	};

	get on() {
		return this.events.on;
	};

	get trigger() {
		return this.events.trigger;
	};

	fetch(): void {
		const id = this.get('id');

		if (typeof id !== 'number') {
			throw new Error('USER DOES NOT EXIST!');
		};

		this.sync.fetch(id)
			.then((response: AxiosResponse): void => {
				this.set(response.data);
			});
	};

	save(): void {
		this.sync.save(this.attributes.getAll())
			.then((response: AxiosResponse): void => {
				this.trigger('save');
			})
			.catch(() => this.trigger('error'));
	};
};

export default Model;