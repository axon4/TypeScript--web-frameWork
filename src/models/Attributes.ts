class Attributes<T> {
	constructor(private data: T) {};

	get = <K extends keyof T>(key: K): T[K] => this.data[key];

	getAll = (): T => this.data;

	set(datum: T): void {
		Object.assign(this.data, datum);
	};
};

export default Attributes;