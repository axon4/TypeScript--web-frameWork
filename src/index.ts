import User from './models/User';

const user = new User({name: 'Frank', age: 41});

user.get('name');
user.get('age');
user.set({name: 'Frank Walton'});

user.on('change1', () => {
	console.log('1');
});
user.on('change2', () => {
	console.log('2');
});
user.on('change3', () => {
	console.log('3');
});
user.trigger('change3');
user.trigger('change1');
user.trigger('change2');
user.trigger('change');

console.log(user);