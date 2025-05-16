<script lang="ts">
	import ItemForm from "./ItemForm.svelte";
	let { product, editItem} = $props();
	let expand = $state(false);
	let edit = $state(false);

	function editItemAndReset(){
		editItem(product);
		edit = false;
	}
</script>

<div class="bg-white p-3 rounded-xl shadow-sm">
	<button
		type="button"
		class="flex flex-row justify-between w-full text-left"
		onclick={() => expand = !expand}
	>
		{#if !edit}
			<div class="flex flex-col">
				<p class="font-bold">{product.name}</p>
				<p class="font-extralight">{product.quantity} x {product.price}</p>
			</div>
			<div class="flex min-h-max items-center justify-center">
				<p class="font-bold">{product.price.mult(product.quantity)}$</p>
			</div>
		{/if}
	</button>

	{#if expand}
		{#if edit}
			<ItemForm {product} itemFunction={editItemAndReset} />
		{:else}
			<div class="flex flex-row grow gap-2 justify-center">
				<button 
			onclick={() => edit = !edit}
				aria-label="Edit"
			class="border-3 border-black text-white bg-yellow-400 rounded-xl hover:bg-yellow-500 active:bg-yellow-600 focus:outline-none text-xl p-3 shadow-md"
	 >
	 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
				</button>
				<button 
				aria-label="Delete"
			class="border-3 border-black text-white bg-red-400 rounded-xl hover:bg-red-500 active:bg-red-600 focus:outline-none text-xl p-3 shadow-md"
	 >
	 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
				</button>
			</div>
		{/if}
	{/if}
</div>
