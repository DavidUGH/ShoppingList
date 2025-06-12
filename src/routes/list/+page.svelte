<script lang="ts">
	//List
	import { Money } from '$lib/types/money';
	import { type Product } from '$lib/types/product';
	import ItemForm from '$lib/components/List/ItemForm.svelte';
	import ListItem from '$lib/components/List/ListItem.svelte';
	import { newProduct, getProduct, updateProduct, newList, newListItem, getList} from '$lib/db/dboperations';

	let { listName = undefined } = $props();

	let expand = $state(false);
	let products = $state<Product[]>([]);
	let total: Money = $derived.by(() => {
		let sum: Money = new Money(0, 0);
		for (let p of products){
			sum = sum.add(p.price.mult(p.quantity));
		}
		return sum;
	})

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

	async function saveList(){
		//Create list
		const listResult = await newList(listName);

		if(!listResult || !listResult.lastId){
			throw new Error("Failed to create list");
		}
		const l = await getList(listResult.lastId);
		console.log("LOG list cuuuuum:", JSON.stringify(l, null, 2));
		//Update products if exist if not new product
		for (const product of products){
			let productId;
			const existingProduct = await getProduct(product.name);
			if(existingProduct && existingProduct.length > 0){
				console.log("here: ", JSON.stringify(existingProduct, null, 2));
				if(existingProduct[0].price == product.price)
					await updateProduct(existingProduct[0].product_id, product);
				productId = existingProduct[0].product_id;
			}else{
				console.log("here2");
				const productResult = await newProduct(product);
				if(!productResult || !productResult.lastId){
					throw new Error("Failed to create product");
				}
				productId = productResult.lastId;
			}
			//Add items to list
			product.id = productId;
			await newListItem(listResult.lastId, product);
		}
	}

</script>

<div class="flex flex-col min-h-screen bg-gray-100 p-4 text-center gap-4 pt-3">
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
		onclick={saveList} class="py-2 min-w-10 text-white bg-orange-400 rounded-xl hover:bg-orange-500 active:bg-orange-600 focus:outline-none text-2xl font-bold shadow-md"
		>Finalizar</button>
	</div>
</div>
