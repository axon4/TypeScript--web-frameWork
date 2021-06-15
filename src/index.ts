import Collection from './models/Collection';
import User, { UserData } from './models/User';

const collection = User.generateCollection();

collection.on('change', () => console.log(collection));

collection.fetch();