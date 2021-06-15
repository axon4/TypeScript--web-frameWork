import Model from './Model';
import Attributes from './Attributes';
import EventHandler from './EventHandler';
import Syncher from './Syncher';

export interface UserData {
	id?: number;
	name?: string;
	age?: number;
};

const rootURL = 'http://localhost:3000/users';

class User extends Model<UserData> {
	static generate(attrs: UserData): User {
		return new User(
			new Attributes<UserData>(attrs),
			new EventHandler(),
			new Syncher<UserData>(rootURL)
		);
	};
};

export default User;