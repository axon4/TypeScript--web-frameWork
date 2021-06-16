import axios, { AxiosPromise } from 'axios';

interface HasID {
	ID?: number;
};

class Synchroniser<T extends HasID> {
	constructor(public rootURL: string) {};

	fetch(ID: number): AxiosPromise {
		return axios.get(`${this.rootURL}/${ID}`);
	};

	save(data: T): AxiosPromise {
		const { ID } = data;

		if (ID) {
			return axios.put(`${this.rootURL}/${ID}`, data);
		} else {
			return axios.post(this.rootURL, data);
		};
	};
};

export default Synchroniser;