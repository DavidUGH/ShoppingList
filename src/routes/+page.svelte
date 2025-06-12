<script lang="ts">
//Home
	import { Money } from "$lib/types/money";

	import { onMount } from "svelte";
	import { initDatabase, deleteDatabase } from "$lib/db/database";
	import { listproducts } from "$lib/db/dboperations";
	
	onMount(async () => {
		await initDatabase();
		const ps = await listproducts();
		console.log("LOG:", JSON.stringify(ps[0], null, 2));
	});
</script>

<div class="flex flex-col min-h-screen bg-gray-100 p-4 text-center gap-4">
	<p class="text-3xl">Listas</p>
	<a
	 href="/list"
	 class="py-4 min-w-10 text-white bg-orange-400 rounded-xl hover:bg-orange-500 active:bg-orange-600 focus:outline-none text-2xl shadow-md"
	>
	+</a>
</div>
