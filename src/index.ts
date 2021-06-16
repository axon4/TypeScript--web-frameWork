import User from './models/User';
import UserForm from './views/UserForm';

const root = document.getElementById('root');
const user = User.generate({name: 'Sonny', age: 25});

if (root) {
	const userForm = new UserForm(root, user);

	userForm.render();
} else {
	throw new Error('ROOT NOT FOUND');
};