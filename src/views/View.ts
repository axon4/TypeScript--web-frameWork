import Model from '../models/Model';

abstract class View<T extends Model<K>, K> {
	constructor(public parent: Element, public model: T) {
		this.bindModel();
	};

	bindModel(): void {
		this.model.on('change', () => {this.render()});
	};

	eventsMap(): {[key: string]: () => void} {
		return {};
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

	regions: {[key: string]: Element} = {};

	regionsMap(): {[key: string]: string} {
		return {};
	};

	mapRegions(fragment: DocumentFragment): void {
		const regionsMap = this.regionsMap();

		for (let regionKey in regionsMap) {
			const selector = regionsMap[regionKey];
			const element = fragment.querySelector(selector);

			if (element) {
				this.regions[regionKey] = element;
			};
		};
	};

	abstract temPlate(): string;

	onRender(): void {};

	render(): void {
		this.parent.innerHTML = '';

		const templateElement = document.createElement('template');
		templateElement.innerHTML = this.temPlate();

		this.bindEvents(templateElement.content);
		this.mapRegions(templateElement.content);
		this.onRender();
		this.parent.append(templateElement.content);
	};
};

export default View;