import User from './models/User';
import UserEdit from './views/UserEdit';

const user = User.generate({name: 'Sonny', age: 25});

const root = document.getElementById('root');

if (root) {
	const userEdit = new UserEdit(root, user);

	userEdit.render();
} else {
	throw new Error('ROOT NOT FOUND!');
};