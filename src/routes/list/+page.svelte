<script lang="ts">
	import { Money } from '$lib/types/money';
	import ItemForm from '$lib/components/ItemForm.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import { type Product } from '$lib/types/product';

	let products = $state<Product[]>([
		{id: 0, name: "Leche", price: new Money(10.50), quantity: 3},
		{id: 1, name: "Chele", price: new Money(20, 50), quantity: 1},
		{id: 2,name: "Jamon", price: new Money(30), quantity: 2},
	]);
	let total: Money = $derived.by(() => {
		let sum: Money = new Money(0, 0);
		for (let p of products){
			sum = sum.add(p.price.mult(p.quantity));
		}
		return sum;
	})
	let expand = $state(false);

	function addNewItem(product: Product){
		products.push({
			id: products.length,
			name: product.name,
			price: product.price,
			quantity: product.quantity,
		})
	}

	function deleteItem(pId: number){
		products = products.filter(p => p.id != pId);
	}

	$inspect(products);

</script>

<div class="flex flex-col min-h-screen bg-gray-100 p-4 text-center gap-4">
	<p class="text-3xl">Lista</p>
		<div class="flex flex-col gap-3">
			{#each products as _, i}
				<ListItem bind:product={products[i]} onDelete={deleteItem}/>
			{/each}
		</div>
		<button
			onclick={() => expand = !expand}
			class="py-4 min-w-10 text-white bg-orange-400 rounded-xl hover:bg-orange-500 active:bg-orange-600 focus:outline-none text-2xl shadow-md"
		>
		+</button>
	{#if expand}
		<ItemForm itemFunction={addNewItem} onAccept={() => expand=!expand}/>
	{/if}
	<div class="flex fixed flex-col bg-white bottom-0 left-0 w-full text-black p-4 font-bold gap-2">
		<div class="flex justify-between text-xl">
			<p>Total: </p>
			<p>{total}$</p>
		</div>
		<button
			class="py-2 min-w-10 text-white bg-orange-400 rounded-xl hover:bg-orange-500 active:bg-orange-600 focus:outline-none text-2xl font-bold shadow-md"
		>Finalizar</button>
	</div>
</div>
