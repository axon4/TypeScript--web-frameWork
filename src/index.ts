import User from './models/User';

const user = User.generate({id: 1});

user.on('change', () => console.log('change'));
user.fetch();