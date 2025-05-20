<script lang="ts">
	//ItemForm.svelte
	import { Money } from "$lib/types/money";

	let { itemFunction, product = undefined, onAccept = undefined } = $props();
	let newProduct = $state({
			id: product?.id ?? -1, 
			name: product?.name ?? "",
			price: product?.price ?? new Money(),
			quantity: product?.quantity ?? 1,
		});

	let editablePrice = $state<string>( product?.price.toString() ?? "");
</script>

<form class="flex flex-col gap-2" onsubmit={() => {
			newProduct.price = new Money(parseFloat(editablePrice))
			itemFunction(newProduct);
			onAccept();
			}}>
	<label class="flex flex-col text-xl text-left font-bold">Nombre
		<input 
		class="py-2 border border-gray-300 shadow-sm text-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-xl font-light"
		type="text" bind:value={newProduct.name}
	placeholder="Leche">
	</label>
	<div class="flex justify-between">
		<label class="flex flex-col text-left text-xl font-bold ">Cantidad
			<input 
		 type="number"
		 class="py-2 border border-gray-300 shadow-sm text-xl font-light focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-left rounded-xl max-w-40"
	 bind:value={newProduct.quantity}
	 placeholder="00">
		</label>
		<label class="flex flex-col text-left text-xl font-bold ">Precio
			<input 
		 type="float"
		 class="py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-xl font-light placeholder:text-left rounded-xl max-w-40"
	 bind:value={editablePrice}
	 placeholder="00.00">
		</label>
	</div>
	<button
	 type="submit"
	 class="py-4 min-w-10 text-white bg-indigo-500 rounded-xl hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none text-2xl font-bold"
	>Aceptar</button>
</form>
