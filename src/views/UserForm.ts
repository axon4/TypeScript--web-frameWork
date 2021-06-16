import View from './View';
import User, { UserData } from '../models/User';

class UserForm extends View<User, UserData> {
	eventsMap(): {[key: string]: () => void} {
		return {
			'click:.change-name': this.onChangeNameClick,
			'click:.random-age': this.onRandomAgeClick,
			'click:.save': this.onSaveClick
		};
	};

	onChangeNameClick = (): void => {
		const inPut = this.parent.querySelector('input');

		if (inPut) {
			const name = inPut.value;

			this.model.set({ name });
		};
	};

	onRandomAgeClick = (): void => {
		this.model.setRandomAge();
	};

	onSaveClick = (): void => {
		this.model.save();
	};

	temPlate(): string {
		return `
			<div>
				<input placeholder='${this.model.get('name')}' />
				<button class='change-name'>Change Name</button>
				<button class='random-age'>Random Age</button>
				<button class='save'>Save</button>
			</div>
		`;
	};
};

export default UserForm;