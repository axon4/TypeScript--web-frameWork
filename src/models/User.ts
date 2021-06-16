import Model from './Model';
import Attributes from './Attributes';
import EventHandler from './EventHandler';
import Synchroniser from './Synchroniser';
import Collection from './Collection';

export interface UserData {
	ID?: number;
	name?: string;
	age?: number;
};

const rootURL = 'http://localhost:3000/users';

class User extends Model<UserData> {
	static generate(attributes: UserData): User {
		return new User(
			new Attributes<UserData>(attributes),
			new EventHandler(),
			new Synchroniser<UserData>(rootURL)
		);
	};

	static generateCollection(): Collection<User, UserData> {
		return new Collection<User, UserData>(rootURL, (JSON: UserData) => User.generate(JSON));
	};

	setRandomAge(): void {
		const age = Math.round(Math.random() * 100);

		this.set({ age });
	};
};

export default User;