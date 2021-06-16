import View from './View';
import User, { UserData } from '../models/User';

class UserShow extends View<User, UserData> {
	template(): string {
		return `
			<div>
				<h1>User Details</h1>
				<p>User Name: ${this.model.get('name')}</p>
				<p>User Age: ${this.model.get('age')}</p>
			</div>
		`;
	};
};

export default UserShow;