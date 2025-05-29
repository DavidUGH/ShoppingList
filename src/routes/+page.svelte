<script lang="ts">
//Home
	import { Money } from "$lib/types/money";

	import { onMount } from "svelte";
	import { initDatabase, deleteDatabase } from "$lib/db/database";
	import { newProduct, newListItem, listproducts } from "$lib/db/dboperations";

	let products: any[] = [];
	
	onMount(async () => {
		await deleteDatabase();
		await initDatabase();
		await newProduct({id: 0, name: "A Drill", price: new Money(10.50), quantity: 1});
	});

	async function loadProducts(){
		products = await listproducts() ?? [];
	}

</script>

<div>
	<h1>Items from SQLite</h1>
	<button onclick={loadProducts}>CUM</button>
	{#if products.length > 0}
		<ul>
			{#each products as product}
				<li>{JSON.stringify(product)}</li>
			{/each}
		</ul>
	{/if}
</div>
