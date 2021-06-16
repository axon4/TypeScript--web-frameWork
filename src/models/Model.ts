import { AxiosPromise, AxiosResponse } from 'axios';

interface ModelAttributes<T> {
	get<K extends keyof T>(key: K): T[K];
	getAll(): T;
	set(data: T): void;
};

interface Synchronise<T> {
	fetch(ID: number): AxiosPromise;
	save(data: T): AxiosPromise;
};

interface Events {
	on(event: string, callBack: () => void): void;
	trigger(event: string): void;
};

interface HasID {
	ID?: number;
};

class Model<T extends HasID> {
	constructor(
		private attributes: ModelAttributes<T>,
		private events: Events,
		private synchronise: Synchronise<T>
	) {};

	get = this.attributes.get;

	set(userDatum: T): void {
		this.attributes.set(userDatum);
		this.events.trigger('change');
	};

	on = this.events.on;

	trigger = this.events.trigger;

	fetch(): void {
		const ID = this.get('ID');

		if (typeof ID !== 'number') {
			throw new Error('USER DOES NOT EXIST');
		};

		this.synchronise.fetch(ID)
			.then((response: AxiosResponse): void => {
				this.set(response.data);
			});
	};

	save(): void {
		this.synchronise.save(this.attributes.getAll())
			.then((response: AxiosResponse): void => {
				this.trigger('save');
			})
			.catch(() => {this.trigger('error')});
	};
};

export default Model;