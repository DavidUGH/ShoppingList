import { Money } from '$lib/types/money';
export interface Product{
	id: number,
	name: string,
	price: Money,
	quantity: number, 
}
