export class List {
	constructor(
		public id: number = 0,
		public name: string = "",
	) {}

	static fromName(name: string): List {
		if (!name.trim()) throw new Error("Name cannot be empty.");
		return new List(0, name);
	}

	static from(id: number, name: string): List {
		if (!name.trim()) throw new Error("Name cannot be empty.");
		return new List(id, name);
	}
}

