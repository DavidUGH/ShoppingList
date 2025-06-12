export class Money {
	constructor(
		public unit: number = 0,
		public cent: number = 0
	) {}

	static fromNumber(value: number): Money {
		const unit = Math.floor(value);
		const cent = Math.round((value - unit) * 100);
		return new Money(unit, cent);
	}

	static normalized(unit: number, cent: number): Money {
		const totalCents = unit * 100 + cent;
		const normUnit = Math.floor(totalCents / 100);
		const normCent = totalCents % 100;
		return new Money(normUnit, normCent);
	}

	add(other: Money): Money {
		return Money.normalized(this.unit + other.unit, this.cent + other.cent);
	}

	sub(other: Money): Money {
		return Money.normalized(this.unit - other.unit, this.cent - other.cent);
	}

	mult(factor: number): Money {
		const total = (this.unit * 100 + this.cent) * factor;
		const unit = Math.floor(total / 100);
		const cent = Math.round(total % 100);
		return new Money(unit, cent);
	}

	div(divisor: number): Money {
		if (divisor === 0) throw new Error("Division by zero");
		const total = (this.unit * 100 + this.cent) / divisor;
		const unit = Math.floor(total / 100);
		const cent = Math.round(total % 100);
		return new Money(unit, cent);
	}

	toString(): string {
		const padded = this.cent.toString().padStart(2, "0");
		return `${this.unit}.${padded}`;
	}
}

