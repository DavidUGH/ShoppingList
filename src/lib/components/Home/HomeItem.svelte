<script>
	//HomeItem.svelte
	let { listName } = $props();
</script>
<div class="flex flex-row bg-white p-3 rounded-xl shadow-sm">
	<strong>{listName}</strong>
	<p></p>
</div>
