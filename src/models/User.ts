import { AxiosResponse } from 'axios';
import Attributes from './Attributes';
import EventHandler from './EventHandler';
import Sync from './Sync';

export interface UserData {
	id?: number;
	name?: string;
	age?: number;
};

const rootURL = 'http://localhost:3000/users';

class User {
	constructor(attrs: UserData) {
		this.attributes = new Attributes<UserData>(attrs);
	};

	attributes: Attributes<UserData>;

	events: EventHandler = new EventHandler();

	sync: Sync<UserData> = new Sync<UserData>(rootURL);

	get get() {
		return this.attributes.get;
	};

	set(userDatum: UserData): void {
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

export default User;