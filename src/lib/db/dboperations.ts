import { initDatabase } from "./database";
import { type Product } from "$lib/types/product";

export async function newProduct(product: Product){
	const db = await initDatabase();
	await db.run("INSERT INTO products (name, price) VALUES (?, ?)", [product.name, product.price.toString()]);
}

export async function newList(name: string){
	const db = await initDatabase();

	await db.run(`INSERT INTO shopping_lists (name) VALUES (?)`, [name]);
}

export async function newListItem(list_id: number, product: Product){
	const db = await initDatabase();
	const productExists = await db.query(`SELECT EXISTS (SELECT 1 FROM products WHERE name = ? AND price = ?)`, [product.name, product.price.toString()]);
	console.log("CONSOLE LOG: ", productExists);
	//await db.execute(`INSERT INTO list_items (list_id, product_id)`);
}

export async function listproducts(){
	const db = await initDatabase();
	const products = await db.query(`SELECT * FROM products;`);
	return products.values;
}
