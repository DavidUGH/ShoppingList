export class Money{
	public unit: number;
	public cent: number;

	constructor();
	constructor(arg1: number);
	constructor(arg1: number, arg2: number);
	constructor(arg1?: number, arg2?: number){
		if(!arg1 && !arg2){
			this.unit = 0;
			this.cent = 0;
		}else if(arg1 && !arg2){
			this.unit = Math.floor(arg1);
			this.cent = (arg1 - Math.floor(arg1)) * 100;
		}else if(arg1 && arg2){
			this.unit = arg1;
			this.cent = arg2;
		}else{
			throw new Error("arg1 was undefined, do not do that");
		}
	}
	add(other: Money): Money{
		let newCent = this.cent + other.cent;
		let newUnit = this.unit + other.unit;
		if(newCent > 99){
			newUnit++;
			newCent=newCent-100;
		}else if(newCent < 0){
			newUnit--;
			newCent=100+newCent;
		}
		return new Money(newUnit, newCent);
	}

	sub(other: Money): Money{
		let newCent = this.cent - other.cent;
		let newUnit = this.unit - other.unit;
		if(newCent < 0){
			newUnit--;
			newCent=newCent+100;
		}
		if(newCent > 99){
			newUnit--;
			newCent=newCent-100;
		}
		return new Money(newUnit, newCent)
	}

	mult(other: number): Money{
		//10.50 * 3
		//10.50 + 10.50 = 21.00
		//21.00 + 10.50 = 31.50
		let newCent = this.cent * other;
		let newUnit = this.unit * other;
		if(newCent > 99){
			newUnit++;
			newCent=newCent-100;
		}else if(newCent < 0){
			newUnit--;
			newCent=100+newCent;
		}
		return new Money(newUnit, newCent);
	}

	div(other: number): Money{
		let newUnit = this.unit / other;
		let newCent = this.cent / other;
		if(newCent > 99){
			newUnit++;
			newCent=newCent-100;
		}else if(newCent < 0){
			newUnit--;
			newCent=100+newCent;
		}
		return new Money(newUnit, newCent);
	}

	toString(): string{
		return this.unit + "." + (this.cent<10? "0" + this.cent : this.cent);
	}
}

