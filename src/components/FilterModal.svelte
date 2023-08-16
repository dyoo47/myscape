<script>
	import Filter from './Filter.svelte';
</script>

<div class="bg-surface-500 py-5 rounded-lg">
	<div class="flex space-x-2 px-5 align-middle items-center">
		<span>seniority:</span>
		<Filter>internship</Filter>
		<Filter>entry level</Filter>
		<Filter>mid level</Filter>
		<Filter>senior level</Filter>
	</div>
	<hr class="my-2 h-0.5 border-0 bg-surface-600" />
	<div class="flex space-x-2 px-5 align-middle items-center">
		<span>pay range:</span>
		<Filter>internship</Filter>
		<Filter>entry level</Filter>
		<Filter>mid level</Filter>
		<Filter>senior level</Filter>
	</div>
</div>
