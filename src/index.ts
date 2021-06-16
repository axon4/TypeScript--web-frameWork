import User from './models/User';
import UserForm from './views/UserForm';

const user = User.generate({name: 'Sonny', age: 25});

const root = document.getElementById('root');

if (root) {
	const userForm = new UserForm(root, user);

	userForm.render();
} else {
	throw new Error('ROOT NOT FOUND!');
};