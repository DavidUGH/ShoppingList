<script lang="ts">
	let { addNewItem } = $props();

	let productName = $state("");
	let productQuantity: number | undefined = $state(1);
	let productPrice: number | undefined = $state();
</script>

<form class="flex flex-col h-10 gap-2" onsubmit={() => {
				addNewItem(productName, productQuantity, productPrice);
				productName = "";
				productQuantity = undefined;
				productPrice = undefined;
			}
			}>
	<label class="flex flex-col text-xl text-left font-bold">Nombre
		<input 
		class="py-2 border border-gray-300 shadow-sm text-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-xl font-light"
		type="text" bind:value={productName}
	placeholder="Leche">
	</label>
	<div class="flex justify-between">
		<label class="flex flex-col text-left text-xl font-bold ">Cantidad
			<input 
		 type="number"
		 class="py-2 border border-gray-300 shadow-sm text-xl font-light focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-left rounded-xl max-w-40"
	 bind:value={productQuantity}
	 placeholder="00">
		</label>
		<label class="flex flex-col text-left text-xl font-bold ">Precio
			<input 
		 type="number"
		 class="py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-xl font-light placeholder:text-right rounded-xl max-w-40"
	 bind:value={productPrice}
	 placeholder="00.00">
		</label>
	</div>
	<button
	 type="submit"
	 class="py-4 min-w-10 text-white bg-indigo-500 rounded-xl hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none text-2xl font-bold"
	>Añadir producto</button>
</form>
