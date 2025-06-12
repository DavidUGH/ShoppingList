import { initDatabase } from "./database";
import { type Product } from "$lib/types/product";

export async function getProduct(arg: string | number){
	let name = "";
	let id = 0;
	if(typeof arg == "string"){name = arg}
	else if (typeof arg == "number"){id = arg}
	else{throw new Error("getList: Invalid argument type")}
	try{
		const db = await initDatabase();
		const product = await db.query(`SELECT * FROM products WHERE product_name = ? OR product_id = ?`, [name, id]);
		return product.values;
	}catch(error){
		console.error("DB Initialization error: ", error);
		throw error;
	}
}

export async function productExists(name?: string){
	try{
		const db = await initDatabase();
		const product = await db.query(`SELECT 1 FROM products WHERE product_name = ? LIMIT 1`, [name]);
		return product.values;
	}catch(error){
		console.error("DB Initialization error: ", error);
		throw error;
	}
}

export async function updateProduct(id: number, product: Product){
	try{
		const db = await initDatabase();
		const result = await db.run(`UPDATE products SET product_name = ?, price = ? WHERE product_id = ?`, [product.name, product.price.toString(), id]);
		return result.changes;
	}catch(error){
		console.error("Product update error: ", error);
		throw error;
	}
}

export async function newProduct(product: Product){
	const db = await initDatabase();
	const result = await db.run(`INSERT INTO products (product_name, price) VALUES (?, ?)`, [product.name, product.price.toString()])
	return result.changes;
}

export async function newList(name = Date()){
	const db = await initDatabase();
	const result = await db.run(`INSERT INTO shopping_lists (list_name) VALUES (?)`, [name]);
	return result.changes;
}

export async function newListItem(list_id: number, product: Product){
	const db = await initDatabase();
	console.log("nli LOG: ", list_id);
	console.log("nli LOG: ", product.id);
	const result = await db.run(`INSERT INTO list_items (list_id, product_id, quantity) VALUES (?, ?, ?)`, [list_id, product.id, product.quantity]);
	return result.changes;
}

export async function listproducts(): Promise<Product[]>{
	const db = await initDatabase();
	const products = await db.query(`SELECT * FROM products;`);
	return products.values?.map(row => ({
		id: row.product_id,
		name: row.product_name,
		price: row.price,
		quantity: 1,
	})) ?? [];
}

export async function getList(arg: string | number){
	let name = "";
	let id = 0;
	if(typeof arg == "string"){name = arg}
	else if (typeof arg == "number"){id = arg}
	else{throw new Error("getList: Invalid argument type")}
	const db = await initDatabase();
	const lists = await db.query(`SELECT * FROM shopping_lists WHERE list_name = ? OR list_id = ?`, [name, id]);
	return lists.values;
}
