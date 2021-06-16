import User from '../models/User';

class UserForm {
	constructor(public parent: Element, public model: User) {
		this.bindModel();
	};

	bindModel(): void {
		this.model.on('change', () => this.render());
	};

	eventsMap(): {[key: string]: () => void} {
		return {
			'click:.random-age': this.onRandomAgeClick
		};
	};

	onRandomAgeClick = (): void => {
		this.model.setRandomAge();
		console.log('CLICKED');
	};

	template(): string {
		return `
			<div>
				<h1>User Form</h1>
					<p>User Name: ${this.model.get('name')}</p>
					<p>User Age: ${this.model.get('age')}</p>
					<input />
					<button>Click</button>
					<button class='random-age'>Random Age</button>
			</div>
		`;
	};

	bindEvents(fragment: DocumentFragment): void {
		const eventsMap = this.eventsMap();

		for (let eventKey in eventsMap) {
			const [ eventName, selector ] = eventKey.split(':');

			fragment.querySelectorAll(selector).forEach(element => {
				element.addEventListener(eventName, eventsMap[eventKey]);
			});
		};
	};

	render(): void {
		this.parent.innerHTML = '';

		const templateElement = document.createElement('template');
		templateElement.innerHTML = this.template();
		this.bindEvents(templateElement.content);
		this.parent.append(templateElement.content);
	};
};

export default UserForm;