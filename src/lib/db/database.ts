import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";

const dbName = 'shoppinglist';
let sqliteConnection: SQLiteConnection | null = null;
let dbConnection: SQLiteDBConnection | null = null;


export async function initDatabase(): Promise<SQLiteDBConnection> {
	if (!sqliteConnection) {
		sqliteConnection = new SQLiteConnection(CapacitorSQLite);
	}

	try{
		const isConn = await sqliteConnection.isConnection(dbName, false);
		if (isConn.result) {
			dbConnection = await sqliteConnection.retrieveConnection(dbName, false);
		} else {
			dbConnection = await sqliteConnection.createConnection(dbName, false, 'no-encryption', 1, false);
			await dbConnection.open();
			await dbConnection.execute(`
											 PRAGMA foreign_keys = ON;

											 CREATE TABLE IF NOT EXISTS shopping_lists (
												 list_id INTEGER PRIMARY KEY,
												 list_name TEXT NOT NULL
											 );

											 CREATE TABLE IF NOT EXISTS products (
												 product_id INTEGER PRIMARY KEY,
												 product_name TEXT NOT NULL,
												 price REAL NOT NULL CHECK (price >= 0)
											 );

											 CREATE TABLE IF NOT EXISTS list_items (
												 list_id INTEGER,
												 product_id INTEGER,
												 quantity INTEGER NOT NULL CHECK (quantity > 0),
												 PRIMARY KEY (list_id, product_id),
												 FOREIGN KEY (list_id) REFERENCES shopping_lists(list_id) ON DELETE CASCADE,
												 FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
											 );
											 `);
		}
	}catch(error){
		console.error("DB Initialization error: ", error);
		throw error;
	}
	return dbConnection;
}

export async function deleteDatabase(): Promise<void> {
  try {
    await CapacitorSQLite.deleteDatabase({
      database: 'shoppinglist'
    });

    console.log('💣 Database deleted successfully');
  } catch (error) {
    console.error('🧨 Error deleting database:', error);
  }
}

